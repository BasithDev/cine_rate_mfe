import { useState, useEffect } from "react"
import { FiUser, FiHeart } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import SearchBar from "./components/SearchBar"
import AuthModal from "./components/AuthModal"

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-lg text-white shadow-md ${isScrolled ? "bg-black/80" : "bg-black"}`}>
      <div className="px-4 lg:px-8 py-3 lg:py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div onClick={() => navigate("/")} className="group">
            <h1 className="text-xl md:text-2xl lg:text-3xl cursor-pointer font-bold tracking-wide">
              Cine
              <span className="px-1 rounded transition duration-200 group-hover:text-red-500 group-active:text-red-500">
                Rate
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={() => navigate('/watchlist')} className="flex items-center gap-1 text-white hover:text-red-400 transition">
              <FiHeart className="text-xl" />
            </button>

            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1 bg-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-700 transition">
              <FiUser className="text-xl" />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <SearchBar />
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => navigate('/watchlist')}
            className="flex items-center gap-2 text-white hover:text-red-400 transition"
          >
            <FiHeart className="text-xl" />
            <span>Watchlist</span>
          </button>

          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-700 transition">
            <FiUser className="text-xl" />
            <span>Login</span>
          </button>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  )
}

export default Header