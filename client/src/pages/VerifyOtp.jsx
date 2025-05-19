// VerifyOtp.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function VerifyOtp() {
  const [otp, setOtp]           = useState('');
  const [error, setError]       = useState('');
  const [isSubmitting, setSubmit] = useState(false);

  const { email }  = useParams();             // /verify-otp/:email
  const navigate   = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  //------- handle Resend otp ------------

  const handleResendOtp = async ()=>{
    const res = await axios.post(
        `${BACKEND_URL}/api/auth/send-otp`,
        { email},
        { withCredentials: true }
      );

      toast.success(res.data.msg);
      
  }

  // ----- form submit -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return setError('OTP is required');

    try {
      setSubmit(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );

      toast.success(res.data.msg);
      if (res.data.success) {
        const { user } = res.data;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', user.email);
        localStorage.setItem('name',  user.name);
        localStorage.setItem('id',    user.id);
        navigate('/');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid OTP';
      setError(msg);
    } finally {
      setSubmit(false);
    }
  };

  // --- animation variant -----
  const fadeSlide = {
    hidden: { opacity: 0, x: 40 },
    show  : { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* ---- Left hero image ---- */}
      <div className="relative hidden md:block h-screen bg-black">
        <img
          src="https://source.unsplash.com/1600x900/?blog,writing"
          alt="Blogging"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            Join <span className="text-slate-400">PurePost</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl drop-shadow-md">
            Create, share, and explore inspiring stories with a global community of readers.
          </p>
        </div>
      </div>

      {/* ----- Right OTP form ---- */}
      <motion.div
        variants={fadeSlide}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-center px-8 py-12 lg:px-24"
      >
        <div className="mx-auto w-full max-w-sm">
          <img src="/purepost-logo.png" alt="PurePost" className="mx-auto h-20" />
          <h1 className="mt-8 text-center text-2xl font-semibold text-gray-900">
            Verify your email
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            An OTP has been sent to&nbsp;
            <span className="font-medium text-indigo-600">{email}</span>
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit} noValidate>
            {/* ------ OTP input ------ */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                One-Time Password
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => { setOtp(e.target.value); setError(''); }}
                className="mt-2 block w-full rounded-md border px-3 py-2
                           text-gray-900 shadow-sm outline-none
                           focus:ring-2 focus:ring-slate-500
                           border-gray-300"
                placeholder="Enter 6-digit OTP"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button onClick={handleResendOtp}>
              resend
            </button>
            {/* ------ Submit ------ */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-black
                         px-4 py-2 text-sm font-semibold text-white
                         transition focus:outline-none focus:ring-2 focus:ring-offset-2
                         focus:ring-black/30 disabled:opacity-60"
            >
              {isSubmitting ? 'Verifying…' : 'Verify OTP'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
