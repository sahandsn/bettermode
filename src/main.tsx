import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import RootLayout from "./routes/RootLayout.tsx";
import ErrorPage from "./error-page.tsx";
import Post from "./routes/Post.tsx";
import PostList from "./routes/PostList.tsx";
import Signin from "./routes/Signin.tsx";
import Main from "./routes/Main.tsx";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/bettermode/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "post-list/",
        element: <PostList />,
        loader: PostList.loader,
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
