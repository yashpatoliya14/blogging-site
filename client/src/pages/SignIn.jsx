import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// Zod schema
const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid e-mail' }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Form state
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  // Errors state for validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: null })); // clear error on change
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate formData using Zod manually
    const result = schema.safeParse(formData);

    if (!result.success) {
      // Build errors object from Zod errors
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return; // don't proceed if validation failed
    }

    // Validation passed, submit form
    try {
      setIsSubmitting(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/auth/signin`,
        formData,
        { withCredentials: true }
      );

      toast.success(res.data.msg);

      if (res.data.success) {
        const { user } = res.data;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', user.email);
        localStorage.setItem('name', user.name);
        localStorage.setItem('id', user.id);
        navigate('/');
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Something went wrong. Try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
      setFormData((prev) => ({ ...prev, password: '' })); // clear password field only
    }
  };

  // Animation variants
  const fadeSlide = {
    hidden: { opacity: 0, x: 0 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* ---------- left image ---------- */}
      <div className="relative hidden md:block h-screen bg-black">
  {/* Background Image */}
  <img 
    src="https://source.unsplash.com/1600x900/?blog,writing" 
    alt="Blogging" 
    className="w-full h-full object-cover opacity-70" 
  />

  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>

  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
      Welcome to <span className="text-slate-400">PurePost</span>
    </h1>
    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl drop-shadow-md">
      Discover powerful stories, write your thoughts, and connect with readers from around the world.
    </p>
  </div>
</div>


      {/* ---------- right form ---------- */}
      <motion.div
        variants={fadeSlide}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-center px-8 py-12 lg:px-24"
      >
        <div className="mx-auto w-full max-w-sm">
          <img src="/purepost-logo.png" alt="PurePost" className="mx-auto h-20" />
          <h1 className="mt-8 text-center text-2xl font-semibold text-gray-900">
            Sign in to your account
          </h1>

          <form className="mt-10 space-y-6" noValidate onSubmit={handleSubmit}>
            {/* -------------- email -------------- */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
                  text-gray-900 shadow-sm outline-none
                  focus:ring-2 focus:ring-slate-500
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* -------------- password -------------- */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-md border px-3 py-2
                  text-gray-900 shadow-sm outline-none
                  focus:ring-2 focus:ring-slate-500
                  ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 cursor-pointer"
              >
                <Link to='/signup'>
               Create an account
               </Link>
              </label>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* -------------- submit -------------- */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-black
                px-4 py-2 text-sm font-semibold text-white
                transition focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-black/30 disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
