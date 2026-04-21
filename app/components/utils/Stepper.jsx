export const Stepper = ({ step, setStep }) => {
    return (
        <div className="w-full flex items-start justify-between mb-8 md:mb-12 gap-1 cursor-pointer">
            <div onClick={() => setStep(1)} className="flex flex-col items-center flex-1 max-w-25 text-center">
                <div className={`stepper-circle ${step >= 1 ? "active bg-coil text-white" : "bg-gray-400 text-white"} w-6 h-6 rounded-full flex items-center justify-center text-xs pt-px font-bold mb-2 shrink-0`}>
                    1
                </div>
                <span className={`${step >= 1 ? "text-text-primary" : "text-text-muted"} text-[10px] sm:text-xs font-medium leading-tight`}>
                    Enter your email
                </span>
            </div>

            <div className={`flex-1 h-px mt-3 transition-all duration-600 ${step >= 2 ? "bg-coil" : "bg-text-muted"}`}></div>

            <div onClick={() => setStep(2)} className="flex flex-col items-center flex-1 max-w-25 text-center cursor-pointer">
                <div className={`stepper-circle ${step >= 2 ? "active bg-coil text-white" : "bg-gray-400 text-white"} w-6 h-6 rounded-full flex items-center justify-center text-xs pt-px font-bold mb-2 shrink-0`}>
                    2
                </div>
                <span className={`${step >= 2 ? "text-text-primary" : "text-text-muted"} text-[10px] sm:text-xs font-medium leading-tight`}>
                    Provide basic info
                </span>
            </div>

            <div className={`flex-1 h-px mt-3 transition-all duration-600 ${step >= 3 ? "bg-coil" : "bg-text-muted"}`}></div>

            <div onClick={() => setStep(3)} className="flex flex-col items-center flex-1 max-w-25 text-center cursor-pointer">
                <div className={`stepper-circle ${step >= 3 ? "active bg-coil text-white" : "bg-gray-400 text-white"} w-6 h-6 rounded-full flex items-center justify-center text-xs pt-px font-bold mb-2 shrink-0`}>
                    3
                </div>
                <span className={`${step >= 3 ? "text-text-primary" : "text-text-muted"} text-[10px] sm:text-xs font-medium leading-tight`}>
                    Create password
                </span>
            </div>
        </div>
    )
}
