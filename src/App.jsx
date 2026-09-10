import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import Brands from './pages/Brands'
import About from './pages/About'
import WhyUs from './pages/WhyUs'
import Contact from './pages/Contact'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="brands" element={<Brands />} />
            <Route path="why-us" element={<WhyUs />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <div className="container-app py-20 text-center">
                  <h1 className="font-display text-3xl font-bold text-brand-black">Page not found</h1>
                  <p className="mt-2 text-brand-muted">The page you are looking for does not exist.</p>
                  <Link to="/" className="mt-6 inline-block font-semibold text-brand-red hover:underline">
                    Go Home
                  </Link>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
