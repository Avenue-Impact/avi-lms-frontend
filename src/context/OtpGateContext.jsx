import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { isDevOrTestEnv } from "../utils/envGuard";
import { OtpVerificationModal } from "../Components/common/OtpVerificationModal";

const OtpGateContext = createContext({
	requestOtpVerification: async (email) => true,
});

export const useOtpGate = () => useContext(OtpGateContext);

export const OtpGateProvider = ({ children }) => {
	const [pendingGate, setPendingGate] = useState(null); // { resolve, reject, email }

	const requestOtpVerification = useCallback(async (email) => {
		// 1. Client-side short circuit for production
		if (!isDevOrTestEnv()) {
			return true;
		}
		console.log("got here")

		const backendBaseUrl =
			import.meta.env.VITE_AUTH_URL || "http://localhost:3500/api/v1/auth";
		const otpEndpoint = backendBaseUrl.replace(/\/auth\/?$/, "/otp/generate");

		try {
			const response = await axios.post(
				otpEndpoint,
				{ email },
				{ validateStatus: (status) => status < 500 }
			);

			// 2. Server-side environment gate returns 404 (production server)
			if (response.status === 404) {
				return true;
			}

			// Handle rate limit or initial generate error
			if (response.status >= 400) {
				console.warn("[OTP Gate] Rate limit or error from /otp/generate:", response.data?.message);
			} else {
				// Store fresh expiration timestamp in sessionStorage
				const expiresIn = response.data?.expiresInSeconds || 600;
				sessionStorage.setItem(
					"dev_otp_gate_session",
					JSON.stringify({ email, expiresAt: Date.now() + expiresIn * 1000 })
				);
			}

			// 3. Mount modal & await verification
			return new Promise((resolve, reject) => {
				setPendingGate({
					resolve,
					reject,
					email,
				});
			});
		} catch (err) {
			if (err.response?.status === 404) {
				console.warn("[OTP Gate] Server returned 404, bypassing gate.");
				return true; // Server gate disabled
			}
			// Don't fail-open anymore, block and show error so we can debug why it's failing
			console.error("[OTP Gate] Error requesting OTP:", err);
			alert("[OTP Gate Error]: " + (err.response?.data?.message || err.message) + "\nCheck console for details.");
			return false;
		}
	}, []);

	const handleSuccess = () => {
		if (pendingGate) {
			pendingGate.resolve(true);
			setPendingGate(null);
		}
	};

	const handleCancel = () => {
		if (pendingGate) {
			pendingGate.resolve(false);
			setPendingGate(null);
		}
	};

	return (
		<OtpGateContext.Provider value={{ requestOtpVerification }}>
			{children}
			{pendingGate && (
				<OtpVerificationModal
					isOpen={Boolean(pendingGate)}
					email={pendingGate.email}
					onSuccess={handleSuccess}
					onCancel={handleCancel}
				/>
			)}
		</OtpGateContext.Provider>
	);
};
