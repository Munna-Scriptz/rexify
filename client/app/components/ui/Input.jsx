import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const variants = {
    signup: `
    w-full
    px-4 py-3
    text-sm
    rounded-lg
    bg-white
    text-text-primary
    placeholder:text-gray-400
    transition-colors
    focus:outline-none
    focus:border-coil
    focus:ring-1
  `,
};
const Input = ({ label, error, onChange, variant = "signup", className = "", password = false, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full">

            {/* Label and Password Toggle */}
            <div className="flex justify-between items-center mb-2">
                {label && (
                    <label className={`text-sm ${error ? "text-error" : "text-coil"}`}>
                        {label}
                    </label>
                )}
                {password && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-xl text-coil cursor-pointer hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? <div className="flex items-center gap-2"><IoEyeOffOutline /><p className="text-sm">Hide</p></div> : <div className="flex items-center gap-2"><IoEyeOutline /><p className="text-sm">Show</p></div>}
                    </button>
                )}
            </div>

            {/* Input Wrapper */}
            <div className="relative w-full">
                <input
                    type={password && !showPassword ? "password" : "text"}
                    className={` 
                        ${variants[variant]} 
                        ${error
                            ? "border-error border text-error focus:border-error focus:ring-error"
                            : "focus:border-coil focus:ring-coil border border-gray-300"
                        } 
                        ${className}
                    `}
                    onChange={onChange}
                    {...props}
                />
            </div>

            {/* Error */}
            {error && (
                <p className="text-xs text-error mt-2">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;