import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [emailCode, setEmailCode] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, age, gender, email, emailCode, phone, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Signup successful!");
                // navigate("/nextpage"); // Uncomment if needed
            } else {
                setMessage(data.message || "Signup failed.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Failed to create account. Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Age"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="wanna be Male">wanna be male</option>
                    <option value="gmail">gmail</option>
                    <option value="born Male">born male</option>
                    <option value="apache helicopter">apache helicopter</option>
                </select>

                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Email Verification Code"
                    required
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="OTP"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <button type="submit">Sign Up</button>
            </form>
            {message && <p className="signup-message">{message}</p>}
        </div>
    );
}

export default Signup;
