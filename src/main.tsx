import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createQueryPreloader,
} from "@apollo/client";
import RootLayout from "./routes/RootLayout.tsx";
import ErrorPage from "./error-page.tsx";
import Post from "./routes/Post.tsx";
import PostList from "./routes/PostList.tsx";
import Signin from "./routes/Signin.tsx";
import Home from "./routes/Home.tsx";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  cache: new InMemoryCache(),
});
const preloadQuery = createQueryPreloader(client);
export { preloadQuery };

const router = createBrowserRouter([
  {
    path: "/bettermode/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "post-list/",
        element: <PostList />,
      },
      {
        path: "post-list/:postSlug/",
        element: <Post />,
        loader: Post.loader,
      },
      {
        path: "signin/",
        element: <Signin />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
