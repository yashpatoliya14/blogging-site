import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid e-mail' }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // submit handler ----------------------------------------------------------
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/signin`,
        data,
        { withCredentials: true }
      );

      toast.success(res.data.msg || 'Signed in!');
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
      reset({ password: '' });     // clear only the password field
    }
  };

  // animation variants ------------------------------------------------------
  const fadeSlide = {
    hidden: { opacity: 0, x: 0 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* ---------- left image ---------- */}
      <div className="relative hidden md:block">
        <img
          src="/login-cover.jpg"               
          alt="Welcome"
          className="h-full w-full object-cover"
        />
        {/* subtle overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* ---------- right form ---------- */}
      <motion.div
        variants={fadeSlide}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-center px-8 py-12 lg:px-24"
      >
        <div className="mx-auto w-full max-w-sm"> 
          <img
            src="/purepost-logo.png"
            alt="PurePost"
            className="mx-auto h-20"
          />
          <h1 className="mt-8 text-center text-2xl font-semibold text-gray-900">
            Sign in to your account
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-6"
            noValidate
          >
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
                type="email"
                autoComplete="email"
                {...register('email')}
                className={`mt-2 block w-full rounded-md border px-3 py-2
                  text-gray-900 shadow-sm outline-none
                  focus:ring-2 focus:ring-indigo-500
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
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
                type="password"
                autoComplete="current-password"
                {...register('password')}
                className={`mt-2 block w-full rounded-md border px-3 py-2
                  text-gray-900 shadow-sm outline-none
                  focus:ring-2 focus:ring-indigo-500
                  ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* -------------- submit -------------- */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600
                px-4 py-2 text-sm font-semibold text-white
                transition focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500 disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </motion.div>

      {/* react-hot-toast container */}
      <Toaster position="top-center" />
    </div>
  );
}
