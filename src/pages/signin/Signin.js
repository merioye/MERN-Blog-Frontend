import React, { useState } from "react";
import "./signin.css";
import { motion } from "framer-motion";
import { NavLink, useHistory } from "react-router-dom";
import AuthHeader from "../../components/authHeader/AuthHeader";
import AuthImage from "../../components/authImage/AuthImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

// Variants for parent container
const signInVariants = {
    hidden: {
        y: 100,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 0.5,
        },
    },
};

// Variants for the form
const formVariants = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.8,
            duration: 0.5,
        },
    },
};

const Signin = () => {
    const [values, setValues] = useState({ email: "", password: "" });

    const history = useHistory();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/signin`,
                {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            const data = await res.json();

            setValues({ email: "", password: "" });
            toast.success(data.message, {
                position: "top-center",
                autoClose: 2000,
            });
            setTimeout(() => {
                history.push("/");
            }, 2100);
        } catch (e) {
            console.log(e);
            toast.error("Invalid Credentials!", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };
    return (
        <>
            <Navbar />
            <Header />

            <motion.div
                className="signin-page"
                variants={signInVariants}
                initial="hidden"
                animate="visible"
            >
                <AuthHeader text="Signin" />
                <div className="signin-form-and-image">
                    <AuthImage src="images/signin.jpeg" />
                    <motion.div className="signin-form" variants={formVariants}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                className="signin-inputBox"
                                placeholder="Email *"
                                value={values.email}
                                onChange={handleChange}
                                name="email"
                                required
                            />
                            <input
                                type="password"
                                className="signin-inputBox"
                                placeholder="Password *"
                                value={values.password}
                                onChange={handleChange}
                                name="password"
                                required
                            />
                            <NavLink
                                to="/forgotpassword"
                                className="forgot-link"
                            >
                                <motion.span
                                    initial={{ fontSize: "0.9rem" }}
                                    whileTap={{ fontSize: "0.8rem" }}
                                >
                                    forgot password ?
                                </motion.span>
                            </NavLink>

                            <div className="login-and-new-btns">
                                <div className="new">
                                    <span>New User?</span>
                                    <NavLink
                                        to="/signup"
                                        className="new-user-btn"
                                    >
                                        <motion.span
                                            initial={{ fontSize: "1rem" }}
                                            whileTap={{ fontSize: "0.9rem" }}
                                        >
                                            Sign up
                                        </motion.span>
                                    </NavLink>
                                </div>
                                <div className="login-btn">
                                    <motion.button
                                        style={{ position: "static" }}
                                        type="Submit"
                                        whileTap={{ scale: 0.9 }}
                                        whileHover={{
                                            scale: 1.05,
                                            opacity: 0.7,
                                        }}
                                    >
                                        Sign in
                                    </motion.button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
            <ToastContainer />
        </>
    );
};

export default Signin;
