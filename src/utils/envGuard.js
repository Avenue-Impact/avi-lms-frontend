export const isDevOrTestEnv = () => {
	const mode = import.meta.env.MODE || import.meta.env.VITE_ENV;
	return mode === "development" || mode === "test" || import.meta.env.DEV === true;
};
