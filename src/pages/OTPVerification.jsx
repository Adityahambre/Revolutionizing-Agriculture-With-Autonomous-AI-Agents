import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { apiPost } from "../services/api";

function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const phone = sessionStorage.getItem("agrinovaPendingPhone") || "";
  const name = sessionStorage.getItem("agrinovaPendingName") || "";

  const handleChange = (value, index) => {
    const digits = value.replace(/\D/g, "");
    const next = [...otp];
    next[index] = digits.slice(-1);
    setOtp(next);
    setError("");
    if (digits && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredOtp = otp.join("");
    if (!phone) return setError("Mobile number is missing. Go back and request an OTP.");
    if (enteredOtp.length !== 6) return setError("Please enter the complete 6-digit OTP.");
    setLoading(true);
    setError("");
    try {
      const response = await apiPost("/api/auth/verify-otp", { phone, otp: enteredOtp });
      localStorage.setItem("agrinovaToken", response.access_token);
      localStorage.setItem("agrinovaUser", JSON.stringify(response.user));
      window.location.href = response.next_step === "farm_setup" ? "/farm-setup" : "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await apiPost("/api/auth/send-otp", { phone, ...(name ? { full_name: name } : {}) });
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setError("A new development OTP was printed in the backend terminal.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="otp-page"><div className="otp-container">
      <div className="otp-icon">✓</div>
      <h1>Verify your<br />mobile number.</h1>
      <p>Enter the 6-digit development OTP printed in your backend terminal for {phone || "your mobile number"}.</p>
      <form className="otp-form" onSubmit={handleSubmit}>
        <div className="otp-inputs">{otp.map((digit, index) => <input key={index} ref={(element) => { inputRefs.current[index] = element; }} type="text" inputMode="numeric" maxLength="1" value={digit} onChange={(e) => handleChange(e.target.value, index)} onKeyDown={(e) => { if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus(); }} autoFocus={index === 0} />)}</div>
        {error && <p className="form-error">{error}</p>}
        <button className="get-started-submit" disabled={loading}>{loading ? "Verifying..." : "Verify & Continue"} <ArrowRight size={17} /></button>
      </form>
      <button type="button" className="resend-otp" onClick={handleResend}>Resend OTP</button>
      <a href="/get-started" className="back-home">← Change mobile number</a>
    </div></main>
  );
}
export default OTPVerification;
