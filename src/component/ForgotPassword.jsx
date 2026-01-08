import { useState } from "react";
import "./CommonLogin.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const sendCode = () => {
    // Add logic to send code via email
    setCodeSent(true);
    alert(`Code sent to ${email}`);
  };

  const verifyCode = () => {
    // Add logic to verify code
    alert(`Code verified: ${code}`);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h3 className="login-title">Forgot Password?</h3>

        <label>Enter E-Mail</label>
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn-login" onClick={sendCode}>
          Send Code
        </button>

        {codeSent && (
          <>
            <label>Enter Code</label>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <button className="btn-login" onClick={verifyCode}>
              Verify Code
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
