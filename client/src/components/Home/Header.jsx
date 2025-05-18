import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';
import { IoIosLogOut } from 'react-icons/io';
import toast from 'react-hot-toast';
import axios from 'axios';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);   // ▼ new
  const accountRef = useRef(null);                                  // ▼ new

  // Close submenu when you click outside it
  useEffect(() => {
    function handleClickOutside(e) {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const email = localStorage.getItem('email');

  const signOut = async ()=>{
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const res = await axios.get(BACKEND_URL + '/sign-out',{withCredentials:true})    
    toast(res.data.msg)
    if(res.data.success){
      localStorage.clear();
      window.location.reload();
    }else{
      console.log(res.data);
    }

  }

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50 p-3">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          {/* logo */}
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Pure Post</span>
              <img alt="" src="./purepost-logo.png" className="h-12 w-auto" />
            </Link>
          </div>

          {/* hamburger */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* desktop links */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-md font-semibold text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* account / login (desktop) */}
          <div
            className="relative hidden lg:flex lg:flex-1 lg:justify-end"
            ref={accountRef}
          >
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setAccountMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <IoIosLogOut /> Account
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md bg-white p-3 shadow-lg ring-1 ring-black/5 z-50">
                    <p className="break-all text-sm text-gray-700">{email}</p>

                    <button
                      className="mt-3 flex w-full items-center gap-2 text-sm text-red-600 hover:underline"
                      onClick={() => {
                        signOut() 
                      }}
                    >
                      <IoIosLogOut /> Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/signin"
                className="text-md font-semibold text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>

        {/* mobile drawer */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />

          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Pure Post</span>
                <img alt="" src="./purepost-logo.png" className="h-8 w-auto" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="py-6">
                  {isLoggedIn ? (
                    <div className="text-sm font-semibold text-gray-700">
                      {email}
                      <IoIosLogOut className="inline ml-2" />
                    </div>
                  ) : (
                    <Link to="/signin" className="text-md font-semibold text-gray-900">
                      Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
