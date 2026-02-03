import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import HotelDetail from './pages/HotelDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Favorites from './pages/Favorites'
import Checkout from './pages/Checkout'
import BookingConfirmation from './pages/BookingConfirmation'
import Bookings from './pages/Bookings'

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0A1628',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontFamily: 'Satoshi, system-ui, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#FF6B5B',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="hotel/:id" element={<HotelDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="booking-confirmation/:bookingId" element={<BookingConfirmation />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
