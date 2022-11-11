import { Provider as ReducerProvider } from "react-redux";
import type { AppProps } from "next/app";

import store from "@/store";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ReducerProvider store={store}>
			<Component {...pageProps} />
		</ReducerProvider>
	);
}

export default MyApp;
