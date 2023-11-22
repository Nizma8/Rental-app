import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import PropertyDetails from "./Pages/PropertyDetails"
import CheckoutPage from "./Pages/CheckoutPage"
import { Dashboard } from "@mui/icons-material"
import Header from "./Components/Header"

function App() {

  return (
    <>
      <Header home/>

<Routes>
<Route path="/" element={<HomePage />}/>
<Route path="/property" element={<PropertyDetails/>}/>
<Route path="/checkout" element={<CheckoutPage/>}/>
<Route path="/Dashboard" element={<Dashboard/>}/>
<Route/>      
</Routes>
    </>
  )
}

export default App
