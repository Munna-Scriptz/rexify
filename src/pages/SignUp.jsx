import React, { useState } from 'react';
import Button from '../ui/Button';
import { Stepper } from '../utils/Stepper';
import SocialButtons from '../components/signUp/SocialButtons';
import { EmailField, InfoField, PasswordField } from '../components/signUp/InputFields';
import Header from '../components/signUp/Header';
import OrDivider from '../components/signUp/OrDivider';
import { IsValidEmail } from '../utils/Validations';
import BackUi from '../utils/BackUi';

const SignUp = () => {
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

    // ------------ Form handler 
    const handleForm = (e) => {
        e.preventDefault()

        if (step == 1) {
            if (!formData.email) return setFormData(prev => ({ ...prev, emailError: "Please enter your email address" }))
            if (!IsValidEmail(formData.email)) return setFormData(prev => ({ ...prev, emailError: "Please enter a valid email address" }))

            setLoading(true)
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
        }

    }


    return (
        <>
            <BackUi to={'/'} name={'Home'} absolute={true}  />
            <div className="min-h-screen flex items-center justify-center p-6 overflow-x-hidden">
                <form onSubmit={handleForm} className="w-full max-w-lg lg:max-w-xl flex flex-col items-center animate-slide-in">

                    {/* -------- Header */}
                    <Header header={"Create an account"} text={"Already have an account?"} linkText={"Sign In"} linkPath={"/auth/signIn"} />

                    {/* -------- Stepper */}
                    <Stepper step={step} setStep={setStep} />

                    {/* -------- Form input */}
                    {step == 1 && <EmailField error={formData.emailError} onChange={(value) => setFormData(prev => ({ ...prev, email: value, emailError: "" }))} />}
                    {step == 2 && <InfoField fullnameError={formData.fullnameError} phoneError={formData.phoneError} onChangeFullname={(value) => setFormData(prev => ({ ...prev, fullname: value, fullnameError: "" }))} onChangePhone={(value) => setFormData(prev => ({ ...prev, phone: value, phoneError: "" }))} />}
                    {step == 3 && <PasswordField passwordError={formData.passwordError} ConfirmError={formData.confirmPassError} onChangePassword={(value) => setFormData(prev => ({ ...prev, password: value, passwordError: "" }))} onChangConfirmPass={(value) => setFormData(prev => ({ ...prev, confirmPass: value, confirmPassError: "" }))} />}

                    {/* -------- Next button */}
                    <Button variant='authButton' loading={loading} type="submit">
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

export default SignUp;