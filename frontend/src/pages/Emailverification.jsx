import React, { useState } from "react";
import "./EmailVerification.css";
import { Link, useNavigate } from "react-router-dom";

function EmailVerification() {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await fetch("http://localhost:5000/auth/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Email verified successfully!");
                alert("Email verified successfully!");
                navigate("/Login");
            } else {
                setMessage(data.message || "Verification failed.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="verify-container">
            <h2>Email Verification</h2>
            <p>Please enter the 6-digit code sent to your email.</p>
            <form className="verify-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    maxLength="6"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <button type="submit">Verify</button>
            </form>
            {message && <p className="verify-message">{message}</p>}
        </div>
    );
}

export default EmailVerification;
