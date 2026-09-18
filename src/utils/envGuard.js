export const isDevOrTestEnv = () => {
	const explicitOverride = import.meta.env.VITE_ENABLE_OTP_GATE === "true";
	if (explicitOverride) return true;

	const viteEnv = (import.meta.env.VITE_ENV || "").toLowerCase();
	const mode = (import.meta.env.MODE || "").toLowerCase();
	const nodeEnv = (import.meta.env.NODE_ENV || "").toLowerCase();

	const devValues = ["development", "test", "local", "staging"];
	const isDevMode =
		devValues.includes(viteEnv) ||
		devValues.includes(mode) ||
		devValues.includes(nodeEnv) ||
		import.meta.env.DEV === true;

	return isDevMode;
};
