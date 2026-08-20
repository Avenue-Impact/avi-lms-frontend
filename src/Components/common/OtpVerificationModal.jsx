import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SESSION_STORAGE_KEY = "dev_otp_gate_session";

export const OtpVerificationModal = ({
	isOpen,
	email,
	onSuccess,
	onCancel,
}) => {
	const [otp, setOtp] = useState(["", "", "", "", ""]);
	const [status, setStatus] = useState("awaiting_input"); // awaiting_input, verifying, verification_failed, expired
	const [errorMessage, setErrorMessage] = useState("");
	const [timeLeft, setTimeLeft] = useState(600); // 10 mins in seconds
	const [isSubmitting, setIsSubmitting] = useState(false);
	const modalRef = useRef(null);
	const expiresAtRef = useRef(null);
	const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

	const backendBaseUrl =
		import.meta.env.VITE_AUTH_URL || "http://localhost:3500/api/v1/auth";
	const otpEndpointBase = backendBaseUrl.replace(/\/auth\/?$/, "/otp");

	const resetSessionTimer = (expiresInSeconds = 600) => {
		const newExpiresAt = Date.now() + expiresInSeconds * 1000;
		expiresAtRef.current = newExpiresAt;
		sessionStorage.setItem(
			SESSION_STORAGE_KEY,
			JSON.stringify({ email, expiresAt: newExpiresAt })
		);
		setTimeLeft(expiresInSeconds);
		setStatus("awaiting_input");
	};

	// Real-time wall-clock countdown timer effect
	useEffect(() => {
		if (!isOpen) return;

		const getOrCreateExpiresAt = () => {
			try {
				const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
				if (saved) {
					const parsed = JSON.parse(saved);
					if (
						parsed.email === email &&
						parsed.expiresAt &&
						parsed.expiresAt > Date.now()
					) {
						return parsed.expiresAt;
					}
				}
			} catch (e) {}

			const newExpiresAt = Date.now() + 600 * 1000;
			sessionStorage.setItem(
				SESSION_STORAGE_KEY,
				JSON.stringify({ email, expiresAt: newExpiresAt })
			);
			return newExpiresAt;
		};

		expiresAtRef.current = getOrCreateExpiresAt();

		const syncTimer = () => {
			if (!expiresAtRef.current) return;
			const now = Date.now();
			const remaining = Math.max(0, Math.ceil((expiresAtRef.current - now) / 1000));
			setTimeLeft(remaining);
			if (remaining <= 0) {
				setStatus("expired");
			}
		};

		// Initial sync
		syncTimer();

		// Real-time interval every 1000ms
		const interval = setInterval(syncTimer, 1000);

		// Instantly resync on tab focus or visibility change
		const handleVisibility = () => {
			if (document.visibilityState === "visible") {
				syncTimer();
			}
		};

		window.addEventListener("visibilitychange", handleVisibility);
		window.addEventListener("focus", syncTimer);

		return () => {
			clearInterval(interval);
			window.removeEventListener("visibilitychange", handleVisibility);
			window.removeEventListener("focus", syncTimer);
		};
	}, [isOpen, email]);

	// Focus trap & Escape block
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				e.stopPropagation();
				return;
			}

			if (e.key === "Tab" && modalRef.current) {
				const focusables = modalRef.current.querySelectorAll(
					'button:not([disabled]), input:not([disabled])'
				);
				if (focusables.length === 0) return;
				const firstElement = focusables[0];
				const lastElement = focusables[focusables.length - 1];

				if (e.shiftKey) {
					if (document.activeElement === firstElement) {
						e.preventDefault();
						lastElement.focus();
					}
				} else {
					if (document.activeElement === lastElement) {
						e.preventDefault();
						firstElement.focus();
					}
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown, true);
		// Auto-focus first OTP box
		setTimeout(() => inputRefs[0].current?.focus(), 100);

		return () => window.removeEventListener("keydown", handleKeyDown, true);
	}, [isOpen]);

	if (!isOpen) return null;

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};

	const handleInputChange = (index, value) => {
		const val = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
		if (!val && value !== "") return;

		const newOtp = [...otp];
		newOtp[index] = val.slice(-1);
		setOtp(newOtp);

		// Move focus to next input
		if (val && index < 4) {
			inputRefs[index + 1].current?.focus();
		}
	};

	const handleKeyDownInput = (index, e) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs[index - 1].current?.focus();
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
		if (pastedData) {
			const newOtp = [...otp];
			for (let i = 0; i < 5; i++) {
				newOtp[i] = pastedData[i] || "";
			}
			setOtp(newOtp);
			const focusIndex = Math.min(pastedData.length, 4);
			inputRefs[focusIndex].current?.focus();
		}
	};

	const handleVerifySubmit = async (e) => {
		e.preventDefault();
		const code = otp.join("");
		if (code.length < 5) {
			setErrorMessage("Please enter all 5 characters of the OTP code.");
			return;
		}

		setIsSubmitting(true);
		setStatus("verifying");
		setErrorMessage("");

		try {
			const res = await axios.post(`${otpEndpointBase}/verify`, {
				email,
				otp: code,
			});

			if (res.data?.success) {
				sessionStorage.removeItem(SESSION_STORAGE_KEY);
				setStatus("verified");
				onSuccess();
			}
		} catch (err) {
			const msg = err.response?.data?.message || "Verification failed. Please try again.";
			setErrorMessage(msg);
			setStatus("verification_failed");
			setOtp(["", "", "", "", ""]);
			inputRefs[0].current?.focus();
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResend = async () => {
		setIsSubmitting(true);
		setErrorMessage("");
		try {
			const res = await axios.post(`${otpEndpointBase}/generate`, { email });
			if (res.data?.success) {
				const expiresIn = res.data?.expiresInSeconds || 600;
				resetSessionTimer(expiresIn);
				setOtp(["", "", "", "", ""]);
				setStatus("awaiting_input");
				setTimeout(() => inputRefs[0].current?.focus(), 100);
			} else {
				// Resend tried but a new token was not issued
				setStatus("expired");
				setErrorMessage(res.data?.message || "Failed to resend OTP. A new code was not issued.");
			}
		} catch (err) {
			// Resend tried but failed (a new token was not given)
			const msg = err.response?.data?.message || "Failed to resend OTP. A new code was not issued.";
			setErrorMessage(msg);
			setStatus("expired");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
			onClick={(e) => e.stopPropagation()}
		>
			<div
				ref={modalRef}
				className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-6 sm:p-8"
				role="dialog"
				aria-modal="true"
				aria-labelledby="otp-modal-title"
			>
				{/* Header */}
				<div className="text-center mb-6">
					<div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-[#C41E3A] mb-4">
						<svg
							className="w-7 h-7"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>
					<h2
						id="otp-modal-title"
						className="text-2xl font-bold text-gray-900 tracking-tight font-poppins"
					>
						Developer OTP Gate
					</h2>
					<p className="text-sm text-gray-500 mt-2">
						An OTP verification code was sent to developer mail for:
					</p>
					<p className="text-sm font-semibold text-[#C41E3A] truncate mt-1">
						{email}
					</p>
				</div>

				{/* Timer Badge */}
				<div className="flex justify-center mb-6">
					<span
						className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
							status === "expired"
								? "bg-red-100 text-red-700"
								: "bg-red-50 text-[#C41E3A]"
						}`}
					>
						<svg
							className="w-3.5 h-3.5 mr-1.5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						{status === "expired" ? "OTP Expired" : `Expires in ${formatTime(timeLeft)}`}
					</span>
				</div>

				{/* Error Alert */}
				{errorMessage && (
					<div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 text-center font-medium">
						{errorMessage}
					</div>
				)}

				{/* OTP Inputs */}
				{status !== "expired" ? (
					<form onSubmit={handleVerifySubmit} className="space-y-6">
						<div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
							{otp.map((char, index) => (
								<input
									key={index}
									ref={inputRefs[index]}
									type="text"
									maxLength={1}
									value={char}
									onChange={(e) => handleInputChange(index, e.target.value)}
									onKeyDown={(e) => handleKeyDownInput(index, e)}
									disabled={isSubmitting}
									className="w-12 h-14 text-center text-xl font-bold uppercase rounded-xl border border-gray-300 focus:border-[#C41E3A] focus:ring-2 focus:ring-red-100 outline-none transition duration-150 disabled:bg-gray-50 text-gray-900 shadow-sm"
								/>
							))}
						</div>

						<button
							type="submit"
							disabled={isSubmitting || otp.join("").length < 5}
							className="w-full py-3 px-4 bg-[#C41E3A] hover:bg-[#a8103a] active:bg-[#8f0d30] disabled:opacity-50 text-white font-semibold rounded-xl transition duration-150 shadow-md flex items-center justify-center space-x-2 font-poppins"
						>
							{isSubmitting ? (
								<>
									<svg
										className="animate-spin h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									<span>Verifying Code...</span>
								</>
							) : (
								<span>Verify & Proceed</span>
							)}
						</button>
					</form>
				) : (
					<div className="text-center space-y-4">
						<p className="text-sm text-gray-600">
							Your OTP code has expired after 10 minutes. Please click below to request a new code.
						</p>
						<button
							type="button"
							onClick={handleResend}
							disabled={isSubmitting}
							className="w-full py-3 px-4 bg-[#C41E3A] hover:bg-[#a8103a] active:bg-[#8f0d30] text-white font-semibold rounded-xl transition duration-150 shadow-md flex items-center justify-center space-x-2 font-poppins"
						>
							{isSubmitting ? "Generating New Code..." : "Resend New OTP"}
						</button>
					</div>
				)}

				{/* Footer Info */}
				<div className="mt-6 text-center text-xs text-gray-400">
					Dev/Test Mode Gate &bull; Action is paused until verification
				</div>
			</div>
		</div>
	);
};
