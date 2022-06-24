import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { fetchData, sendCartData } from "./store/cart-actions";
// import { uiActions } from "./store/ui-slice";
function App() {

  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     // Send state as Sending request
  //     dispatch(uiActions.showNotification(
  //       {
  //         open: true,
  //         message: 'Sending request',
  //         type: 'warning',
  //       }
  //     ));
  //     const res = await fetch(
  //       'https://e-commerce-panier-default-rtdb.firebaseio.com/cartItems.json',
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );
  //     const data = await res.json();
  //     // Send state as Request is successful
  //     dispatch(uiActions.showNotification(
  //       {
  //         open: true,
  //         message: 'Sending request to Database Successfully',
  //         type: 'success',
  //       }
  //     ));
  //   };
  //   sendRequest().catch(err => {
  //     // Send state as Request is failed 
  //     dispatch(uiActions.showNotification(
  //       {
  //         open: true,
  //         message: 'Sending request to Database Failed',
  //         type: 'error',
  //       }
  //     ));
  //   })
  // }, [cart,dispatch]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (cart.changed)
      dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  const type = useSelector(state => state.ui.notification.type);

  const message = useSelector(state => state.ui.notification.message);

  const open = useSelector(state => state.ui.notification.open);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div className="App">
      {open && <Notification type={type} message={message}></Notification>}
      {!isLoggedIn ?
        <Auth />
        : <Layout />
      }
    </div>
  );
}

export default App;
