import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import PropertyDetails from "./Pages/PropertyDetails"
import CheckoutPage from "./Pages/CheckoutPage"
import { Dashboard } from "@mui/icons-material"
import Header from "./Components/Header"
import ViewComponent from "./Components/ViewComponent"
import WishList from "./Pages/WishList"
import Account from "./Pages/Account"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function App() {
  const initialOptions = {
    clientId: "AUs3uUtAVrOKUID64niKJbeMFyVjqNIfesuvCkyjnrVfHAAVUp-3Rp2BfuVEoKUncIYXVTdCVi3YHn7H",
    currency: "USD",
    intent: "capture",
};
  return (
    <>
<PayPalScriptProvider options={initialOptions}>
  <Header home/>
  <Routes>
  <Route path="/" element={<HomePage />}/>
  <Route path="/property" element={<PropertyDetails/>}/>
  <Route path="/checkout" element={<CheckoutPage/>}/>
  <Route path="/Dashboard" element={<Dashboard/>}/>
  <Route path="/property/:id" element={<ViewComponent/>}/>

  <Route path="/checkout" element={<CheckoutPage /> }/>
  <Route path="/property/wishlist" element={<WishList/>}/>
  <Route path="/account" element={<Account/>}/>
  </Routes>
</PayPalScriptProvider >


    </>
  )
}

export default App
