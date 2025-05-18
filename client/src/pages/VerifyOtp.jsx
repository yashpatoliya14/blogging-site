import { useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router'
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux'

export default function VerifyOtp() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {email} = useParams()
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  // Update state on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit to backend
  const onSubmit = async (e) => {
    e.preventDefault();               
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post(
        BACKEND_URL + '/api/auth/verify-otp',            
        { email: email,otp:form.otp },
        { withCredentials: true }     
      );
      console.log(res);
      console.log(res.data.success);
      
      toast(res.data.msg);
      if(res.data.success){
        const user = res.data.user
        localStorage.setItem('isLoggedIn',true)
        localStorage.setItem('email',user.email)
        localStorage.setItem('email',user.name)
        localStorage.setItem('id', user.id);
        
        navigate('/')
      }


    } catch (err) {
      const msg =
        err.response?.data?.message || 'Something went wrong. Try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="otp"
                name="otp"
                type="otp"
                required
                value={form.otp}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 
                           -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                           focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm/6">
              {error}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold 
                         text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 
                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifing...' : 'Verify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
