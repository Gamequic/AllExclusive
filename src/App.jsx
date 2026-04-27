import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import About from './components/About'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Footer from './components/Footer'
import { useCart } from './hooks/useCart'

export default function App() {
  const { cart, isOpen: cartOpen, setIsOpen: setCartOpen,
          addToCart, removeFromCart, changeQty, clearCart,
          total, count } = useCart()

  const [checkoutOpen, setCheckoutOpen] = useState(false)

  function handleCheckout() {
    setCartOpen(false)
    setTimeout(() => setCheckoutOpen(true), 350)
  }

  function handleOrderComplete() {
    clearCart()
  }

  return (
    <>
      <Navbar cartCount={count} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero />
        <Catalog onAddToCart={addToCart} />
        <About />
      </main>

      <Footer />

      <Cart
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
        total={total}
        onCheckout={handleCheckout}
      />

      <Checkout
        cart={cart}
        total={total}
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onComplete={handleOrderComplete}
      />
    </>
  )
}
