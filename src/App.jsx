import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route
							index
							element={
								<Navigate
									replace
									to="dashboard"
								/>
							}
						/>
						<Route
							path="dashboard"
							element={<Dashboard />}
						/>
						<Route
							path="bookings"
							element={<Bookings />}
						/>
						<Route
							path="cabins"
							element={<Cabins />}
						/>
						<Route
							path="users"
							element={<NewUsers />}
						/>
						<Route
							path="settings"
							element={<Settings />}
						/>
						<Route
							path="account"
							element={<Account />}
						/>
					</Route>
					<Route
						path="login"
						element={<Login />}
					/>
					<Route
						path="*"
						element={<PageNotFound />}
					/>
				</Routes>
			</BrowserRouter>
			<Toaster
				position="top-center"
				gutter={12}
				toastOptions={{ success: { duration: 3000 } }}
			/>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
