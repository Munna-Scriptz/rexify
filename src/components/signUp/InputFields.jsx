import Input from "../../components/ui/Input"

export const EmailField = ({ onChange, error, labelTxt }) => {
  return (
    <div className="w-full mb-6 animate-slide-in">
      <Input
        label={labelTxt || "What’s your email?"}
        variant="signup"
        placeholder="Enter your email address"
        error={error}
        id="email"
        name="email"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export const InfoField = ({ onChangeFullname, onChangePhone, fullnameError, phoneError }) => {
  return (
    <div className="w-full mb-6 flex flex-col gap-y-4 animate-slide-in">
      <Input
        label="What’s your Fullname?"
        variant="signup"
        placeholder="Enter your Fullname"
        error={fullnameError}
        type="text"
        id="name"
        name="name"
        onChange={(e) => onChangeFullname(e.target.value)}
      />
      <Input
        label="What’s your Phone number?"
        variant="signup"
        placeholder="Enter your phone number"
        error={phoneError}
        type="number"
        id="phone"
        name="phone"
        onChange={(e) => onChangePhone(e.target.value)}
      />
    </div>
  )
}

export const PasswordField = ({ onChangePassword, onChangConfirmPass, passwordError, ConfirmError }) => {
  return (
    <div className="w-full mb-6 flex flex-col gap-y-4 animate-slide-in">
      <Input
        label="Create a password"
        variant="signup"
        placeholder="Enter your password"
        error={passwordError}
        password={true}
        id="password"
        name="password"
        onChange={(e) => onChangePassword(e.target.value)}
      />
      <Input
        label="Confirm password"
        variant="signup"
        placeholder="Enter your password again"
        error={ConfirmError}
        password={true}
        id="confirm password"
        name="confirm password"
        onChange={(e) => onChangConfirmPass(e.target.value)}
      />
    </div>
  )
}

export const SinglePasswordField = ({ onChange, error, }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 animate-slide-in">
      <Input
        label="Your password"
        variant="signup"
        placeholder="Enter your password"
        error={error}
        password={true}
        id="password"
        name="password"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
