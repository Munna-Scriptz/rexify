import React, { useState } from 'react';
import Button from '../ui/Button';
import SocialButtons from '../components/signUp/SocialButtons';
import { EmailField, SinglePasswordField } from '../components/signUp/InputFields';
import Header from '../components/signUp/Header';
import { IsValidEmail } from '../utils/Validations';
import { Link } from 'react-router';
import OrDivider from '../components/signUp/OrDivider';
import BackUi from '../utils/BackUi';

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  })

  // ------------ Form handler 
  const handleForm = (e) => {
    e.preventDefault()

    // ------------ Validations 
    if (!formData.email) return setFormData(prev => ({ ...prev, emailError: "Please enter your email address" }))
    if (!IsValidEmail(formData.email)) return setFormData(prev => ({ ...prev, emailError: "Please enter a valid email address" }))
    if (!formData.password) return setFormData(prev => ({ ...prev, passwordError: "Please enter your password" }))
    // if (formData.password != 1234) return setFormData(prev => ({ ...prev, passwordError: "Wrong password" }))

    setLoading(true)
    setTimeout(() => {
      setStep(2)
      setLoading(false)
    }, 800)
  }


  return (
    <>
      <BackUi to={'/'} name={'Home'} absolute={true} />
      <div className="min-h-screen flex items-center justify-center overflow-hidden">
        <form onSubmit={handleForm} className="w-full max-w-140 flex flex-col items-center animate-slide-in">

          {/* -------- Header */}
          <Header header={"Welcome back!"} text={"Don't have an account?"} linkText={"Sign Up"} linkPath={"/auth/signUp"} />

          {/* -------- Form input */}
          <EmailField error={formData.emailError} onChange={(value) => setFormData(prev => ({ ...prev, email: value, emailError: "" }))} labelTxt={'Your email address'} />
          <SinglePasswordField error={formData.passwordError} onChange={(value) => setFormData(prev => ({ ...prev, password: value, passwordError: "" }))} />
          <div className="w-full flex items-center justify-between py-2">

            <div className="flex items-center gap-2 pt-2 pb-6 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
              <button className={` w-4 h-4 rounded-sm border transition-all duration-200 ${rememberMe ? 'bg-coil border-coil' : 'bg-transparent border-zinc-400'}`} aria-label="Keep me signed in" />
              <span className="text-[13px] text-zinc-600 font-medium select-none">
                Keep me signed in until I sign out
              </span>
            </div>

            <Link href="/forgot-password" className="text-[13px] text-coil font-medium underline underline-offset-4 hover:text-coil transition-colors">
              Forget your password
            </Link>

          </div>
          {/* -------- Next button */}
          <Button variant='authButton' loading={loading} type="submit">
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

export default SignIn;