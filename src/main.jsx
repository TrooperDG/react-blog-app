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
import { Protected, Loading } from "./components/index.js";
import {
  MyPosts,
  EditPost,
  Home,
  LoginPage,
  Post,
  SignupPage,
  NotFound,
  MyAccountPage,
  EditAccount,
  AboutPage,
  ContactPage,
} from "./pages";
import AddPost from "./pages/AddPost.jsx";
// import UserForm from "./components/user-account/userForm.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
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
          path="/my-posts"
          element={
            <Protected authentication={true}>
              <MyPosts />
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
          path="/my-account"
          element={
            <Protected authentication={true}>
              <MyAccountPage />
            </Protected>
          }
        />
        <Route
          path="/edit-account"
          element={
            <Protected authentication={true}>
              <EditAccount />
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
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/loding" element={<Loading />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
