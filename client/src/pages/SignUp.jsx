import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// -----------------------------------------------------------------------------------------------------------------------───
//  Zod schema
// -----------------------------------------------------------------------------------------------------------------------───
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email({ message: 'Please enter a valid e-mail' }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function SignUp() {
  const navigate  = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // ----------------- form & UI state -----------------
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors,   setErrors]   = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ----------------- handlers -----------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate with Zod
    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/auth/signup`,
        formData,
        { withCredentials: true }
      );

      toast.success(res.data.msg || 'Signed up!');
      if (res.data.success) navigate(`/verify-otp/${formData.email}`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
      setFormData(prev => ({ ...prev, password: '' }));
    }
  };

  // ----------------- motion variants -----------------
  const fadeSlide = {
    hidden: { opacity: 0, x: 0 },
    show  : { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* ----------------- Left hero image ----------------- */}
      <div className="relative hidden md:block h-screen bg-black">
        
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

      {/* ----------------- Right form ----------------- */}
      <motion.div
        variants={fadeSlide}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-center px-8 py-12 lg:px-24"
      >
        <div className="mx-auto w-full max-w-sm">
          <img src="/purepost-logo.png" alt="PurePost" className="mx-auto h-20" />
          <h1 className="mt-8 text-center text-2xl font-semibold text-gray-900">
            Create your account
          </h1>

          <form className="mt-10 space-y-6" noValidate onSubmit={handleSubmit}>
            {/* ─── Name ─── */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-md border px-3 py-2
                  text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-slate-500
                  ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* ─── Email ─── */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-md border px-3 py-2
                  text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-slate-500
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* ─── Password ─── */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-md border px-3 py-2
                  text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-slate-500
                  ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* ─── Link to Sign In ─── */}
            <p className="text-sm">
              Already have an account?&nbsp;
              <Link to="/login" className="font-medium text-black hover:underline">
                Sign in
              </Link>
            </p>

            {/* ─── Submit ─── */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-black px-4 py-2
                text-sm font-semibold text-white transition focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-black/30 disabled:opacity-60"
            >
              {isSubmitting ? 'Signing up…' : 'Sign up'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
