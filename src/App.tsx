import Header from "./components/Header"
import ProductList from "./components/ProductList"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import { useState } from "react"

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false)
  const pageContent = viewCart ? <Cart /> : <ProductList />
  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  )
  return content
}

export default App
