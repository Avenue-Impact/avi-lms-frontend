export const isDevOrTestEnv = () => {
	const mode = import.meta.env.MODE || import.meta.env.VITE_ENV || import.meta.env.NODE_ENV;
	const isDevMode = mode === "development" || mode === "test" || mode === "local" || mode === "staging" || import.meta.env.DEV === true;
	const explicitOverride = import.meta.env.VITE_ENABLE_OTP_GATE === "true";
	return isDevMode || explicitOverride;
};
