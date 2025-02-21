import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Signup, Login, Protected, Loading } from "./components/index.js";
import { AllPosts, EditPost, Home, LoginPage, Post, SignupPage } from "./pages";
import AddPost from "./pages/AddPost.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route
        path="/login"
        element={
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
        }
      />
      <Route
        path="/signup"
        element={
          <Protected authentication={false}>
            <SignupPage />
          </Protected>
        }
      />
      <Route
        path="/all-posts"
        element={
          <Protected authentication={true}>
            <AllPosts />
          </Protected>
        }
      />
      <Route
        path="/add-post"
        element={
          <Protected authentication={true}>
            <AddPost />
          </Protected>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        }
      />
      <Route path="/post/:slug" element={<Post />} />
      <Route path="/loding" element={<Loading />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
