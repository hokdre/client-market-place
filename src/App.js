import React, { useEffect } from 'react';
import {
  useDispatch, useSelector
} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './features/login/login_page';
import LandingPage from './pages/landing_page';

import {
  checkLogin, selectIsLogin
} from './features/login/login_slice';

import './sass/main.scss';
import AdminRoutes from './routes/admin_route';
import CustomerRoutes from './routes/customer_route';
import AddCustomerPage from './pages/customer/add_customer_page';
import MerchantRoutes from './routes/merchant_route';

import { getMerchantPribadiAsyncThunk } from './features/merchant/merchant_slice';
import { getCartByID } from './features/cart/cart_slice';

import SearchProductPage from './pages/search/search_product_page';
import ProductRoutes from './routes/product_route';
import CartRoutes from './routes/cart_route';
import { getCustomerAsyncThunk } from './features/customer/customer_slice';
import OrderRoutes from './routes/order_route';
import TransactionRoutes from './routes/transaction_route';
import { getAdminAsyncThunk } from './features/admin/admin_slice';

const ValidateLogin = props => {
  let { path, component } = props

  let isLogin = localStorage.getItem("token") ? true : false
  if(!isLogin){
    return (<Redirect to={{pathname : "/login"}}/>)
  }

  return (<Route  path={path} {...props} render={component}/>)
}

function App() {
  const dispatch = useDispatch()
  
  //after login
  let isLogin = useSelector(selectIsLogin)
  useEffect(() => {
    if(isLogin){
      fetchInitialData()
    }
  },[isLogin])

  //refresh page
  useEffect(() => {
      dispatch(checkLogin())
      let isLogin = localStorage.getItem("token")
      if(isLogin){
        fetchInitialData()
      }
  },[])

  const fetchInitialData = () => {
      let loginType = localStorage.getItem("loginType")
      let merchantID = localStorage.getItem("merchantID")
      let cartId = localStorage.getItem("cartID")
      let userID = localStorage.getItem("userID")

      if(loginType === "CUSTOMER" && merchantID){
          dispatch(getCustomerAsyncThunk(userID))
          dispatch(getCartByID(cartId))
          dispatch(getMerchantPribadiAsyncThunk(merchantID))
      }

      if(loginType === "CUSTOMER") {
        dispatch(getCustomerAsyncThunk(userID))
        dispatch(getCartByID(cartId))
      }

      if (loginType === "ADMIN") {
        dispatch(getAdminAsyncThunk(userID))
      }
  }

  
  return (
    <Router>
      <Switch>
        <Route path="/login"><Login/></Route>
        <Route path="/register"><AddCustomerPage/></Route>
        <Route path="/merchants"><MerchantRoutes/></Route>
        <Route path="/products"><ProductRoutes/></Route>
        <ValidateLogin path="/admins" component={AdminRoutes}/>
        <ValidateLogin path="/customers" component={CustomerRoutes}/>
        <ValidateLogin path="/carts" component={CartRoutes}/>
        <ValidateLogin path="/orders" component={OrderRoutes}/>
        <ValidateLogin path="/transactions" component={TransactionRoutes}/>
        <Route exact path="/"><LandingPage/></Route>
        <Route path="/search"><SearchProductPage/></Route>
      </Switch>
    </Router>
  );
}

export default App;
