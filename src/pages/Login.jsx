import { ArrowRight, Sprout } from "lucide-react";
import { useState } from "react";
import { apiPost } from "../services/api";

function Login() {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) return setError("Please enter a valid 10-digit mobile number.");
    setLoading(true);
    setError("");
    try {
      const response = await apiPost("/api/auth/send-otp", { phone: mobile });
      sessionStorage.setItem("agrinovaPendingPhone", mobile);
      sessionStorage.removeItem("agrinovaPendingName");
      sessionStorage.setItem("agrinovaOtpPurpose", response.purpose || "login");
      window.location.href = "/verify-otp";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page"><div className="login-container">
      <div className="login-icon"><Sprout size={28} /></div>
      <h1>Welcome back<br />to AgriNova.</h1><p>Enter your registered mobile number to continue.</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group"><label>Mobile Number</label><input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))} maxLength="10" inputMode="numeric" placeholder="Enter your mobile number" /></div>
        {error && <p className="form-error">{error}</p>}
        <button className="get-started-submit" disabled={loading}>{loading ? "Requesting OTP..." : "Continue"} <ArrowRight size={17} /></button>
      </form>
      <a href="/" className="back-home">← Back to home</a>
    </div></main>
  );
}
export default Login;
