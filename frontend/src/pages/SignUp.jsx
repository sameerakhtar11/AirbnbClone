import React, { useContext, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

function SignUp() {
  let [show, setShow] = useState(false)
  let navigate = useNavigate()
  let { serverUrl } = useContext(authDataContext)
  let { userData, setUserData } = useContext(userDataContext)
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { loading, setLoading } = useContext(authDataContext)

  const handleSignUP = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let result = await axios.post(serverUrl + "/api/auth/signup", {
        name,
        email,
        password
      }, { withCredentials: true })
      setLoading(false)
      setUserData(result.data)
      navigate("/")
      toast.success("Signup Successfully")
      console.log(result)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100 flex items-center justify-center p-4 relative overflow-hidden font-sans'>
      {/* Background Decoration */}
      <div className='absolute -top-20 -right-20 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
      <div className='absolute -bottom-20 -left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000'></div>

      {/* Back Button */}
      <div
        className='absolute top-6 left-6 md:top-10 md:left-10 z-20 cursor-pointer p-3 bg-white/50 hover:bg-white rounded-full transition-all shadow-sm group'
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className='w-5 h-5 text-gray-700 group-hover:-translate-x-1 transition-transform' />
      </div>

      {/* Glassmorphism Card */}
      <div className='w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10 relative z-10 animate-fade-in-up'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2 tracking-tight'>Create Account</h1>
          <p className='text-gray-500'>Join us to discover amazing places</p>
        </div>

        <form className='space-y-5' onSubmit={handleSignUP}>
          <div className='group'>
            <label className='block text-sm font-medium text-gray-700 mb-1 ml-1 transition-colors group-focus-within:text-primary-600'>Full Name</label>
            <input
              type="text"
              className='w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all outline-none shadow-sm'
              placeholder='John Doe'
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className='group'>
            <label className='block text-sm font-medium text-gray-700 mb-1 ml-1 transition-colors group-focus-within:text-primary-600'>Email</label>
            <input
              type="email"
              className='w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all outline-none shadow-sm'
              placeholder='name@example.com'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className='group'>
            <label className='block text-sm font-medium text-gray-700 mb-1 ml-1 transition-colors group-focus-within:text-primary-600'>Password</label>
            <div className='relative'>
              <input
                type={show ? "text" : "password"}
                className='w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all outline-none shadow-sm'
                placeholder='••••••••'
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div
                className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition p-1'
                onClick={() => setShow(prev => !prev)}
              >
                {show ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
              </div>
            </div>
          </div>

          <button
            className='w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:scale-[1.02] transition-all transform active:scale-95 mt-2 disabled:opacity-70 disabled:cursor-not-allowed'
            disabled={loading}
          >
            {loading ? (
              <div className='flex items-center justify-center gap-2'>
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                <span>Creating account...</span>
              </div>
            ) : "Sign Up"}
          </button>

          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'><div className='w-full border-t border-gray-200'></div></div>
            <div className='relative flex justify-center text-sm'><span className='px-4 bg-transparent bg-white/0 backdrop-blur-xl text-gray-500 font-medium'>Or sign up with</span></div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <button type="button" className='flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-gray-700 shadow-sm hover:shadow'>
              <FcGoogle size={20} /> <span className='hidden sm:inline'>Google</span>
            </button>
            <button type="button" className='flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-gray-700 shadow-sm hover:shadow'>
              <FaFacebook size={20} className="text-blue-600" /> <span className='hidden sm:inline'>Facebook</span>
            </button>
          </div>

          <p className='text-center text-gray-600 mt-6'>
            Already have an account? <span className='text-primary-600 font-bold hover:underline cursor-pointer transition-colors hover:text-primary-700' onClick={() => navigate("/login")}>Log in</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp