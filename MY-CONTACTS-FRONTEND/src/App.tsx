import { Routes, Route } from 'react-router-dom'
import Login from '@/auth/login/login'
import Signup from '@/auth/signup/signup'
import Home from '@/home/home'

export default function App() {
  return (
    <Routes>
      {/* Page publique de connexion hors Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />

      {/* Toutes les routes nécessitant le layout (header/nav) */}
      {/* <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="contacts/:id" element={<Contact />} />
        <Route path="*" element={<div>404 — Page non trouvée</div>} />
      </Route> */}
    </Routes>
  )
}