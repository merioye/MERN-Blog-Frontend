import React, { useState, useEffect } from "react";
import "./profile.css";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import AuthHeader from "../../components/authHeader/AuthHeader";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FaRegUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

// Variants for parent container
const profileVariants = {
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

const Profile = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        file: "",
    });
    const [blured, setBlured] = useState({
        username: "false",
        email: "false",
        password: "false",
    });
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const history = useHistory();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_BASE_URL}/profile`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                const data = await res.json();
                setValues({
                    username: data.username,
                    email: data.email,
                    password: "",
                    file: `${process.env.REACT_APP_API_BASE_URL}/${data.file}`,
                });
            } catch (e) {
                history.push("/signin");
                console.log(e);
            }
        };
        fetchProfileData();
    }, [history]);

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

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        setBlured({ ...blured, [e.target.name]: "true" });
    };

    const onSelectingFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
        setValues({ ...values, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("username", values.username);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("file", values.file);

            const res = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/profile`,
                {
                    method: "PUT",
                    credentials: "include",
                    body: formData,
                }
            );

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            const data = await res.json();

            setValues({ ...values, password: "" });
            setBlured({ username: "false", email: "false", password: "false" });

            toast.success(data.message, {
                position: "top-center",
                autoClose: 2000,
            });
        } catch (e) {
            toast.error("Profile could not be updated!", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    const deleteAccount = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/profile`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            const data = await res.json();
            toast.success(data.message, {
                position: "top-center",
                autoClose: 2000,
            });

            setTimeout(() => {
                history.push("/signup");
            }, 2100);
        } catch (e) {
            toast.error("Account could not be deleted!", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    return (
        <>
            {values.username ? (
                <>
                    <Navbar />
                    <Header />
                    <motion.div
                        className="profile-page"
                        variants={profileVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AuthHeader text="Update Your Account" />
                        <div className="profile-info">
                            <div className="del-ac-btn-container">
                                <motion.div
                                    className="del-ac-btn"
                                    onClick={deleteAccount}
                                    initial={{ scale: 1 }}
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Delete Account
                                </motion.div>
                            </div>
                            <div className="update-form">
                                <form
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                >
                                    <div className="profile-photo-container">
                                        <input
                                            type="file"
                                            className="update-image"
                                            required
                                            name="file"
                                            onChange={onSelectingFile}
                                            accept="image/*"
                                        />
                                        <p>Profile Picture</p>
                                        <div className="profile-photo">
                                            <img
                                                src={
                                                    preview
                                                        ? preview
                                                        : values.file
                                                }
                                                alt="profile"
                                            />
                                            <div
                                                className="profile-image-update"
                                                title="Update Picture"
                                            >
                                                <FaRegUserCircle className="profile-image-update-btn" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="update-input-container">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            required
                                            pattern="^[A-Za-z0-9]{3,16}$"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            focused={blured.username}
                                        />
                                        <span>
                                            Username should be 3-16 character
                                            and shouldn't include any special
                                            character!
                                        </span>
                                    </div>
                                    <div className="update-input-container">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            required
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            focused={blured.email}
                                        />
                                        <span>
                                            It should be a valid email address!
                                        </span>
                                    </div>
                                    <div className="update-input-container">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            required
                                            pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            focused={blured.password}
                                            onFocus={() =>
                                                setBlured({
                                                    ...blured,
                                                    password: "true",
                                                })
                                            }
                                        />
                                        <span>
                                            Password should be 8-20 characters
                                            and include at least 1 letter, 1
                                            number and 1 special character!
                                        </span>
                                    </div>

                                    <div className="update-btn">
                                        <motion.button
                                            type="submit"
                                            initial={{ scale: 1 }}
                                            whileHover={{
                                                scale: 1.05,
                                                opacity: 0.8,
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            Update
                                        </motion.button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                    <ToastContainer />
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Profile;
