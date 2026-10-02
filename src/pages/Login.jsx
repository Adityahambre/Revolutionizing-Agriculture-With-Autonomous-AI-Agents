import { ArrowRight, Sprout } from "lucide-react";
import { useState } from "react";

function Login() {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    window.location.href = "/verify-otp";
  };

  return (
    <main className="login-page">
      <div className="login-container">

        <div className="login-icon">
          <Sprout size={28} />
        </div>

        <h1>
          Welcome back
          <br />
          to AgriNova.
        </h1>

        <p>
          Enter your mobile number to continue.
        </p>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Mobile Number</label>

            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setMobile(value.slice(0, 10));
              }}
              maxLength="10"
              inputMode="numeric"
            />
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
            Continue
            <ArrowRight size={17} />
          </button>

        </form>

        <a href="/" className="back-home">
          ← Back to home
        </a>

      </div>
    </main>
  );
}

export default Login;