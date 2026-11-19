import { ArrowRight, Sprout } from "lucide-react";
import { useState } from "react";
import { apiPost } from "../services/api";

function GetStarted() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) return setError("Please enter your full name.");
    if (!/^[6-9]\d{9}$/.test(mobile)) return setError("Please enter a valid 10-digit mobile number.");
    setLoading(true);
    setError("");
    try {
      const response = await apiPost("/api/auth/send-otp", { full_name: name.trim(), phone: mobile });
      sessionStorage.setItem("agrinovaPendingPhone", mobile);
      sessionStorage.setItem("agrinovaPendingName", name.trim());
      sessionStorage.setItem("agrinovaOtpPurpose", response.purpose || "register");
      window.location.href = "/verify-otp";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="get-started-page"><div className="get-started-container">
      <div className="get-started-icon"><Sprout size={28} /></div>
      <h1>Create your AgriNova account</h1><p>Enter your name and mobile number. Development OTP will appear in the backend terminal.</p>
      <form className="get-started-form" onSubmit={handleSubmit}>
        <div className="form-group"><label>Full Name</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" /></div>
        <div className="form-group"><label>Mobile Number</label><input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))} maxLength="10" inputMode="numeric" placeholder="10-digit mobile number" /></div>
        {error && <p className="form-error">{error}</p>}
        <button className="get-started-submit" disabled={loading}>{loading ? "Requesting OTP..." : "Continue"} <ArrowRight size={17} /></button>
      </form>
      <a href="/" className="back-home">← Back to home</a>
    </div></main>
  );
}
export default GetStarted;
