import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import "./App.css";

import Loader from "./component/layout/Loader/Loader";

import { loadUser } from "./actions/userAction";
import store from "./store";
import axiosInstance from "./utils/axios.js";

const Header = lazy(() => import("./component/layout/Header/Header.js"))
const UserOptions = lazy(() => import("./component/layout/Header/UserOptions"))
const Footer = lazy(() => import("./component/layout/Footer/Footer"));

const Home = lazy(() => import("./component/Home/Home"));
const ProductDetails = lazy(() => import("./component/Product/ProductDetails.js"))
const Products = lazy(() => import("./component/Product/Products.js"))
const Search = lazy(() => import("./component/Product/Search"))
const LoginSignUp = lazy(() => import("./component/User/LoginSignUp"))
const Profile = lazy(() => import("./component/User/Profile"))
const ProtectedRoute = lazy(() => import("./component/Route/ProtectedRoute"))
const UpdateProfile = lazy(() => import("./component/User/UpdateProfile"))
const UpdatePassword = lazy(() => import("./component/User/UpdatePassword"))
const ForgotPassword = lazy(() => import("./component/User/ForgotPassword"))
const ResetPassword = lazy(() => import("./component/User/ResetPassword"))
const Cart = lazy(() => import("./component/Cart/Cart"))
const Shipping = lazy(() => import("./component/Cart/Shipping"))
const ConfirmOrder = lazy(() => import("./component/Cart/ConfirmOrder"))
const Payment = lazy(() => import("./component/Cart/Payment"))
const OrderSuccess = lazy(() => import("./component/Cart/OrderSuccess"))
const Orders = lazy(() => import("./component/Order/MyOrders"))
const OrderDetails = lazy(() => import("./component/Order/OrderDetails"))

const Dashboard = lazy(() => import("./component/Admin/Dashboard.js"))
const ProductList = lazy(() => import("./component/Admin/ProductList.js"))
const NewProduct = lazy(() => import("./component/Admin/NewProduct"))
const UpdateProduct = lazy(() => import("./component/Admin/UpdateProduct"))
const OrderList = lazy(() => import("./component/Admin/OrderList"))
const ProcessOrder = lazy(() => import("./component/Admin/ProcessOrder"))
const UsersList = lazy(() => import("./component/Admin/UsersList"))
const UpdateUser = lazy(() => import("./component/Admin/UpdateUser"))
const ProductReviews = lazy(() => import("./component/Admin/ProductReviews"))

const NotFound = lazy(() => import("./component/layout/Not Found/NotFound"))


// const Contact = lazy(() => import("./component/layout/Contact/Contact"))
// const About = lazy(() => import("./component/layout/About/About"))


export default function App() {
  const { user, isAuthenticated, isNotAuthenticated, } = useSelector((state) => state.user);

  useMemo(() => {
    store.dispatch(loadUser());
  }, []);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axiosInstance.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    }
    catch (error) {
      console.log("Error ", error);
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route exact path="/account" element={<Profile />} />
            <Route exact path="/me/update" element={<UpdateProfile />} />
            <Route exact path="/password/update" element={<UpdatePassword />} />
            <Route exact path="/shipping" element={<Shipping />} />
            <Route exact path="/order/confirm" element={<ConfirmOrder />} />

            {stripeApiKey && (
              <Route exact path="/process/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>} />
            )}

            <Route exact path="/success" element={<OrderSuccess />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/order/:id" element={<OrderDetails />} />

            <Route exact path="/admin/dashboard"
              isAdmin={
                true}
              element={
                <Dashboard />
              }
            />
            <Route exact path="/admin/products"
              isAdmin={true}
              element={
                <ProductList />
              }
            />
            <Route exact path="/admin/product"
              isAdmin={true}
              element={
                <NewProduct />
              }
            />
            <Route exact path="/admin/product/:id"
              isAdmin={true}
              element={
                <UpdateProduct />
              }
            />
            <Route exact path="/admin/orders"
              isAdmin={true}
              element={
                <OrderList />
              }
            />
            <Route exact path="/admin/order/:id"
              isAdmin={true}
              element={
                <ProcessOrder />
              }
            />
            <Route exact path="/admin/users"
              isAdmin={true}
              element={
                <UsersList />
              }
            />
            <Route exact path="/admin/user/:id"
              isAdmin={true}
              element={
                <UpdateUser />
              }
            />
            <Route exact path="/admin/reviews"
              isAdmin={true}
              element={
                <ProductReviews />
              }
            />
          </Route>

          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
          <Route exact path="/cart" element={<Cart />} />

          {/* <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact user={user} />} /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />

      {isAuthenticated &&
        <Suspense fallback={<Loader />}>
          <UserOptions user={user} />
        </Suspense>
      }

      {isNotAuthenticated &&
        <Suspense fallback={<Loader />}>
          <Header />
        </Suspense>
      }

    </Router>
  )
};
