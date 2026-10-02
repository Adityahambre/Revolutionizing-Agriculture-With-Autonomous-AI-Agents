import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    const digit = value.replace(/\D/g, "");

    const newOtp = [...otp];
    newOtp[index] = digit.slice(-1);

    setOtp(newOtp);
    setError("");

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    // Demo OTP for testing
    if (enteredOtp !== "123456") {
      setError("Incorrect OTP. Please try again.");
      return;
    }

    setError("");

    // Temporary success destination
    window.location.href = "/farm-setup";
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");

    inputRefs.current[0]?.focus();

    alert("Demo OTP: 123456");
  };

  return (
    <main className="otp-page">
      <div className="otp-container">

        <div className="otp-icon">✓</div>

        <h1>
          Verify your
          <br />
          mobile number.
        </h1>

        <p>
          Enter the 6-digit OTP sent to your mobile number.
        </p>

        <form
          className="otp-form"
          onSubmit={handleSubmit}
        >
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="get-started-submit"
          >
            Verify & Continue
            <ArrowRight size={17} />
          </button>
        </form>

        <button
          type="button"
          className="resend-otp"
          onClick={handleResend}
        >
          Didn't receive the OTP? Resend
        </button>

        <a
          href="/get-started"
          className="back-home"
        >
          ← Change mobile number
        </a>

        <a
          href="/"
          className="back-home"
        >
          ← Back to home
        </a>

      </div>
    </main>
  );
}

export default OTPVerification;