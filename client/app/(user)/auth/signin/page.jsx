"use client"
import React, { useState } from 'react';
import Button from '../../../components/ui/Buttons';
import SocialButtons from '../../components/SocialButtons';
import { EmailField, SinglePasswordField } from '../../components/InputFields';
import { IsValidEmail } from '../../../components/utils/Validations';
import OrDivider from '../../components/OrDivider';
import BreadCrumbs from '../../../components/utils/BreadCrumbs';
import Link from 'next/link';
import Header from '../../components/Header';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  })

  // ------------ Form handler 
  const handleForm = async (e) => {
    e.preventDefault()

    // ------------ Validations 
    if (!formData.email) return setFormData(prev => ({ ...prev, emailError: "Please enter your email address" }))
    if (!IsValidEmail(formData.email)) return setFormData(prev => ({ ...prev, emailError: "Please enter a valid email address" }))
    if (!formData.password) return setFormData(prev => ({ ...prev, passwordError: "Please enter your password" }))
    setLoading(true)
    // ------------- Fetch ----------------
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password, })
      })

      const data = await res.json();
      if (!res.ok) {
        setLoading(false)
        if (data.message === "Invalid or incorrect password!") return setFormData(prev => ({ ...prev, passwordError: data.message }))
        toast.error(data.message, { theme: "dark", transition: Bounce, });
        return
      }
      setLoading(false)
      toast.success(data.message, {
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => {
        setLoading(false)
        router.push("/")
      }, 2000)

    } catch (error) {
      setLoading(false)
      toast.error("Somethind went wrong!", { theme: "light", transition: Bounce, });
    }
  }


  return (
    <>
      <ToastContainer />
      <BreadCrumbs to={'/'} name={'Home'} absolute={true} />
      <div className="min-h-screen flex items-center justify-center p-6 md:mt-0 mt-8 overflow-x-hidden">
        <form onSubmit={handleForm} className="w-full max-w-md lg:max-w-lg flex flex-col items-center animate-slide-in">

          {/* -------- Header */}
          <Header header={"Welcome back!"} text={"Don't have an account?"} linkText={"Sign Up"} linkPath={"/auth/signup"} />

          {/* -------- Form input */}
          <EmailField error={formData.emailError} onChange={(value) => setFormData(prev => ({ ...prev, email: value, emailError: "" }))} labelTxt={'Your email address'} />
          <SinglePasswordField error={formData.passwordError} onChange={(value) => setFormData(prev => ({ ...prev, password: value, passwordError: "" }))} />
          <div className="w-full flex items-center justify-between py-2">

            <div className="flex items-center gap-2 pt-2 pb-6 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
              <button className={` w-4 h-4 rounded-sm border transition-all duration-200 ${rememberMe ? 'bg-coil border-coil' : 'bg-transparent border-zinc-400'}`} aria-label="Keep me signed in" />
              <span className="text-[13px] text-zinc-600 font-medium select-none hidden md:inline-block">
                Keep me signed in until I sign out
              </span>
              <span className="text-[13px] text-zinc-600 font-medium select-none md:hidden">
                Remember me
              </span>
            </div>

            <Link href="/forgot-password" size="sm" className="text-[13px] text-coil font-medium underline underline-offset-4 hover:text-coil transition-colors whitespace-nowrap">
              Forget your password
            </Link>

          </div>
          {/* -------- Next button */}
          <Button variant='authButton' isLoading={loading} type="submit">
            Next
          </Button>

          {/* -------- Or Divider */}
          <OrDivider text={"Continue with"} />

          {/* -------- Social button */}
          <SocialButtons facebookTxt={"Continue with Facebook"} googleTxt={"Continue with Google"} />

        </form>
      </div>
    </>
  );
};

export default page;