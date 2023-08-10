import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import { Mailbox } from "./components/pages/Mailbox";
import { Login } from "./components/pages/Login";
import { LoggedArea } from "./components/LoggedArea";
import { Callback } from "./components/pages/Callback";
import { AuthProvider } from "./contexts/auth.context";
import { AccountChoose } from "./components/pages/AccountChoose";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MailboxeChooser } from "./components/pages/MailboxChoose";

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      element: (
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      ),
      children: [
        {
          path: "login",
          Component: Login,
        },
        {
          path: "callback",
          Component: Callback,
        },
        {
          Component: LoggedArea,
          children: [
            {
              path: "",
              Component: AccountChoose,
            },
            {
              path: ":accountId",
              Component: MailboxeChooser,
            },
            {
              path: ":accountId/:mailboxId",
              Component: Mailbox,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
