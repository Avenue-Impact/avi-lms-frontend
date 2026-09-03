export const isDevOrTestEnv = () => {
	const mode = import.meta.env.MODE || import.meta.env.VITE_ENV || import.meta.env.NODE_ENV;
	return mode === "development" || mode === "test" || mode === "local" || import.meta.env.DEV === true;
};
