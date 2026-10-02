import { ArrowRight, Sprout } from "lucide-react";
import { useState } from "react";

function GetStarted() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    window.location.href = "/verify-otp";
  };

  return (
    <main className="get-started-page">
      <div className="get-started-container">

        <div className="get-started-icon">
          <Sprout size={28} />
        </div>

        <p>
          Enter your details to get started.
        </p>

        <form
          className="get-started-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

export default GetStarted;