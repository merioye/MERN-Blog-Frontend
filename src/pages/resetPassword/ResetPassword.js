import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useHistory } from "react-router-dom";
import "./reset.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import CommonHeading from "../../components/commonHeading/CommonHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
    const [values, setValues] = useState({ password: "", confirmPassword: "" });
    const [blured, setBlured] = useState({
        password: "false",
        conformPassword: "false",
    });

    const { token } = useParams();
    const history = useHistory();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        setBlured({ ...blured, [e.target.name]: "true" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/resetpassword/${token}`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            const data = await res.json();

            setValues({ password: "", confirmPassword: "" });
            setBlured({ password: "false", confirmPassword: "false" });
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
            <Header reset={true} />
            <CommonHeading
                title="Reset Password?"
                src="/images/reset.png"
                alt="reset-password"
            />

            <motion.div
                className="reset-form"
                initial={{ y: "100vh" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", delay: "1", stiffness: 50 }}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Password *"
                        required
                        pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        focused={blured.password}
                    />
                    <span>
                        Password should be 8-20 characters and include at least
                        1 letter, 1 number and 1 special character!
                    </span>
                    <input
                        type="password"
                        placeholder="Confirm Password *"
                        required
                        pattern={values.password}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        focused={blured.confirmPassword}
                        onFocus={() =>
                            setBlured({ ...blured, confirmPassword: "true" })
                        }
                    />
                    <span>Password & Confirm Password does not match!</span>
                    <br></br>
                    <motion.button
                        type="submit"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05, opacity: 0.8 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Reset Password
                    </motion.button>
                </form>
            </motion.div>
            <ToastContainer />
        </>
    );
};

export default ResetPassword;
