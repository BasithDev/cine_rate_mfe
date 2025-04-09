import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
  FaUserPlus,
  FaSignInAlt,
} from "react-icons/fa"
import { FcGoogle } from "react-icons/fc";
import { MdClose, MdEmail } from "react-icons/md"

function AuthModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", escHandler)
    return () => window.removeEventListener("keydown", escHandler)
  }, [onClose])

  if (typeof window === "undefined") return null
  const modalRoot = document.getElementById("modal-root")
  if (!modalRoot) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            layout
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-6 w-full max-w-md relative text-white"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-300 hover:text-white transition"
            >
              <MdClose size={22} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={isRegister ? "register" : "login"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-white">
                  {isRegister ? "Create an Account" : "Welcome Back"}
                </h2>

                <form className="flex flex-col gap-3">
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Username"
                      className="bg-transparent text-white placeholder-gray-400 pl-10 border border-white/30 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {isRegister && (
                    <div className="relative">
                      <MdEmail className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="email"
                        placeholder="Email"
                        className="bg-transparent text-white placeholder-gray-400 pl-10 border border-white/30 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="bg-transparent text-white placeholder-gray-400 pl-10 pr-10 border border-white/30 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-white"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </div>
                  </div>

                  {isRegister && (
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="bg-transparent text-white placeholder-gray-400 pl-10 pr-10 border border-white/30 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {!isRegister && (
                    <div className="text-right text-sm text-blue-400 hover:underline cursor-pointer">
                      Forgot password?
                    </div>
                  )}

                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    {isRegister ? <FaUserPlus size={16} /> : <FaSignInAlt size={16} />}
                    {isRegister ? "Register" : "Login"}
                  </button>
                </form>

                <button
                  className="mt-4 w-full flex items-center justify-center gap-2 border border-white/30 text-white py-2 rounded hover:bg-white/10 transition"
                >
                  <FcGoogle size={18} />
                  <span>
                    {isRegister ? "Sign up with Google" : "Sign in with Google"}
                  </span>
                </button>

                <p className="mt-4 text-center text-sm text-gray-300">
                  {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                  <span
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-blue-400 cursor-pointer hover:underline"
                  >
                    {isRegister ? "Login" : "Register"}
                  </span>
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  )
}

export default AuthModal