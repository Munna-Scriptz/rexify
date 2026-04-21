"use client"
import React, { useState } from 'react';
import Button from '../../../components/ui/Buttons';
import { Stepper } from '../../../components/utils/Stepper';
import SocialButtons from '../../components/SocialButtons';
import { EmailField, InfoField, PasswordField } from '../../components/InputFields';
import OrDivider from '../../components/OrDivider';
import { IsValidEmail } from '../../../components/utils/Validations';
import Header from '../../components/Header';
import BreadCrumbs from '../../../components/utils/BreadCrumbs';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

const page = () => {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        emailError: "",
        fullname: "",
        fullnameError: "",
        phone: "",
        phoneError: "",
        password: "",
        passwordError: "",
        confirmPass: "",
        confirmPassError: ""
    })

    const router = useRouter(); // Initialize router

    // ------------ Form handler 
    const handleForm = async (e) => {
        e.preventDefault()

        if (step == 1) {
            if (!formData.email) return setFormData(prev => ({ ...prev, emailError: "Please enter your email address" }))
            if (!IsValidEmail(formData.email)) return setFormData(prev => ({ ...prev, emailError: "Please enter a valid email address" }))
            setLoading(true)

            // ----------- Email validation ----------
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/check-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            })
            const data = await res.json();
            setLoading(false)
            if (!res.ok) return setFormData(prev => ({ ...prev, emailError: data.message }))

            setTimeout(() => {
                setStep(2)
                setLoading(false)
            }, 800);
        } else if (step == 2) {
            if (!formData.fullname) return setFormData(prev => ({ ...prev, fullnameError: "Please enter your Fullname" }))
            if (!formData.phone) return setFormData(prev => ({ ...prev, phoneError: "Please enter your phone number" }))
            setLoading(true)
            setTimeout(() => {
                setStep(3)
                setLoading(false)
            }, 800);
        } else if (step == 3) {
            if (!formData.password) return setFormData(prev => ({ ...prev, passwordError: "Please enter your password" }))
            if (!formData.confirmPass) return setFormData(prev => ({ ...prev, confirmPassError: "Please enter your password again" }))
            if (formData.password != formData.confirmPass) return setFormData(prev => ({ ...prev, confirmPassError: "Password doesn't match" }))
            setLoading(true)
            // ------------- Fetch ----------------
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, fullname: formData.fullname, phone: formData.phone, password: formData.password, })
            })

            const data = await res.json();
            if (!res.ok) return toast.error(data.message, { theme: "dark", transition: Bounce, });

            toast.success(data.message, {
                theme: "dark",
                transition: Bounce,
            });

            setTimeout(() => {
                setLoading(false)
                router.push(`/auth/verify?email=${formData.email}`) // Changed to router.push and corrected path
            }, 3000)
        }
    }


    return (
        <>
            <ToastContainer />
            <BreadCrumbs to={'/'} name={'Home'} absolute={true} />
            <div className="min-h-screen flex items-center justify-center p-6 overflow-x-hidden">
                <form onSubmit={handleForm} className="w-full max-w-lg lg:max-w-xl flex flex-col items-center animate-slide-in">
                    <Stepper step={step} setStep={setStep} />

                    {/* -------- Header */}
                    <Header header={"Create an account"} text={"Already have an account?"} linkText={"Sign In"} linkPath={"/auth/signin"} />

                    {/* -------- Stepper */}

                    {/* -------- Form input */}
                    {step == 1 && <EmailField error={formData.emailError} onChange={(value) => setFormData(prev => ({ ...prev, email: value, emailError: "" }))} />}
                    {step == 2 && <InfoField fullnameError={formData.fullnameError} phoneError={formData.phoneError} onChangeFullname={(value) => setFormData(prev => ({ ...prev, fullname: value, fullnameError: "" }))} onChangePhone={(value) => setFormData(prev => ({ ...prev, phone: value, phoneError: "" }))} />}
                    {step == 3 && <PasswordField passwordError={formData.passwordError} ConfirmError={formData.confirmPassError} onChangePassword={(value) => setFormData(prev => ({ ...prev, password: value, passwordError: "" }))} onChangConfirmPass={(value) => setFormData(prev => ({ ...prev, confirmPass: value, confirmPassError: "" }))} />}

                    {/* -------- Next button */}
                    <Button variant='authButton' isLoading={loading} type="submit">
                        Next
                    </Button>

                    {/* -------- Or Divider */}
                    <OrDivider />

                    {/* -------- Social button */}
                    <SocialButtons />

                </form>
            </div>
        </>
    );
};

export default page;