import React, { useState } from "react";
import "./forgot.css";
import { NavLink, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import CommonHeading from "../../components/commonHeading/CommonHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState({ email: "" });

    const history = useHistory();

    const handleEmail = (e) => {
        setEmail({ email: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/forgotpassword`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(email),
                }
            );

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            const data = await res.json();

            setEmail({ email: "" });
            toast.success(data.message, {
                position: "top-center",
                autoClose: 2000,
            });
            setTimeout(() => {
                history.push("/signin");
            }, 2100);
        } catch (e) {
            console.log(e);
            toast.error("bad men likhun ga", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };
    return (
        <>
            <Navbar />
            <Header />
            <CommonHeading
                title="Forgot Password?"
                src="/images/forgot.svg"
                alt="forgot-password"
            />

            <motion.div
                className="forgot-form"
                initial={{ y: "100vh" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", delay: "1", stiffness: 50 }}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email *"
                        required
                        value={email.email}
                        onChange={handleEmail}
                    />
                    <span>
                        Provide your registered email id to generate password
                        reset link
                    </span>
                    <div className="login-and-forgot">
                        <div className="forgot-btn-left">
                            <span>OR</span>
                            <NavLink to="/signin" className="forgot-wala-login">
                                <motion.span
                                    initial={{ fontSize: "1rem" }}
                                    whileTap={{ fontSize: "0.9rem" }}
                                >
                                    Sign in
                                </motion.span>
                            </NavLink>
                        </div>
                        <div className="forgot-btn-right">
                            <motion.button
                                type="submit"
                                initial={{ scale: 1 }}
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05, opacity: 0.8 }}
                            >
                                Send
                            </motion.button>
                        </div>
                    </div>
                </form>
            </motion.div>
            <ToastContainer />
        </>
    );
};

export default ForgotPassword;
