import React, { useState, useEffect } from "react";
import "./signup.css";
import { motion } from "framer-motion";
import { NavLink, useHistory } from "react-router-dom";
import AuthHeader from "../../components/authHeader/AuthHeader";
import AuthImage from "../../components/authImage/AuthImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

// Variants for parent container
const signUpVariants = {
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

// Variants for image that will be previewed
const previewVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 0.5,
        },
    },
};

const Signup = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // state will hold whether each input field is blured or not to show error message
    const [blured, setBlured] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        file: false,
    });

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const history = useHistory();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [selectedFile]);

    const onSelectingFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        setBlured({ ...blured, [e.target.name]: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("username", values.username);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("confirmPassword", values.confirmPassword);
            formData.append("file", selectedFile);

            // sending data to backend
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/signup`,
                {
                    credentials: "include",
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) {
                console.log(res);
                throw new Error(res.statusText);
            }

            const data = await res.json();

            setValues({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            setBlured({
                username: false,
                email: false,
                password: false,
                confirmPassword: false,
            });
            setSelectedFile(undefined);

            toast.success(data.message, {
                position: "top-center",
                autoClose: 2000,
            });
            setTimeout(() => {
                history.push("/signin");
            }, 2100);
        } catch (e) {
            toast.error("Registration Failed!", {
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
                className="signup-page"
                variants={signUpVariants}
                initial="hidden"
                animate="visible"
            >
                <AuthHeader text="Signup" />

                <div className="signup-form-and-image">
                    <AuthImage src="images/signup.png" />

                    <motion.div className="signup-form" variants={formVariants}>
                        <form
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                            id="signupForm"
                        >
                            <div className="input-container">
                                <input
                                    type="text"
                                    className="signup-inputBox"
                                    placeholder="Username *"
                                    value={values.username}
                                    onChange={handleChange}
                                    name="username"
                                    required
                                    pattern="^[A-Za-z0-9]{3,16}$"
                                    onBlur={handleBlur}
                                    focused={blured.username.toString()}
                                />
                                <span>
                                    Username should be 3-16 character and
                                    shouldn't include any special character!
                                </span>
                            </div>

                            <div className="input-container">
                                <input
                                    type="email"
                                    className="signup-inputBox"
                                    placeholder="Email *"
                                    value={values.email}
                                    onChange={handleChange}
                                    name="email"
                                    required
                                    onBlur={handleBlur}
                                    focused={blured.email.toString()}
                                />
                                <span>It should be a valid email address!</span>
                            </div>

                            <div
                                className="input-container"
                                style={{ minHeight: "55px" }}
                            >
                                <motion.label
                                    htmlFor="file"
                                    className="upload-file-btn"
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.05, opacity: 0.7 }}
                                >
                                    Upload Image
                                </motion.label>
                                <input
                                    id="file"
                                    type="file"
                                    className="file-input"
                                    style={{ visibility: "hidden" }}
                                    accept="image/*"
                                    onChange={onSelectingFile}
                                    name="file"
                                    required
                                    onClick={handleBlur}
                                />
                                <div className="image-preview">
                                    {selectedFile && (
                                        <motion.img
                                            src={preview}
                                            alt="uploaded file"
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                borderRadius: "50%",
                                            }}
                                            variants={previewVariants}
                                        />
                                    )}
                                </div>
                                {blured.file && (
                                    <span>Please upload any image file</span>
                                )}
                            </div>

                            <div className="input-container">
                                <input
                                    type="password"
                                    className="signup-inputBox"
                                    placeholder="Password *"
                                    value={values.password}
                                    onChange={handleChange}
                                    name="password"
                                    required
                                    pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                                    onBlur={handleBlur}
                                    focused={blured.password.toString()}
                                />
                                <span>
                                    Password should be 8-20 characters and
                                    include at least 1 letter, 1 number and 1
                                    special character!
                                </span>
                            </div>

                            <div className="input-container">
                                <input
                                    type="password"
                                    className="signup-inputBox"
                                    placeholder="Confirm Password *"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    name="confirmPassword"
                                    required
                                    pattern={values.password}
                                    onBlur={handleBlur}
                                    onFocus={() =>
                                        setBlured({
                                            ...blured,
                                            confirmPassword: true,
                                        })
                                    }
                                    focused={blured.confirmPassword.toString()}
                                />
                                <span>
                                    Password & Confirm Password does not match!
                                </span>
                            </div>

                            <div className="register-and-existing-btns">
                                <div className="existing">
                                    <span>Alreay Registered?</span>
                                    <NavLink
                                        to="/signin"
                                        className="existing-user-btn"
                                    >
                                        <motion.span
                                            initial={{ fontSize: "1rem" }}
                                            whileTap={{ fontSize: "0.9rem" }}
                                        >
                                            Sign in
                                        </motion.span>
                                    </NavLink>
                                </div>
                                <div className="register-btn">
                                    <motion.button
                                        style={{ position: "static" }}
                                        type="Submit"
                                        whileTap={{ scale: 0.9 }}
                                        whileHover={{
                                            scale: 1.05,
                                            opacity: 0.7,
                                        }}
                                    >
                                        Sign up
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

export default Signup;
