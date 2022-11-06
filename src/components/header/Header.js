import React, { useState, useEffect, useContext } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import Context from "../../context/Context";

// Variants

const Variants = {
    hidden: {
        y: "-100px",
    },
    visible: {
        y: 0,
        transition: {
            type: "spring",
            stiffness: 150,
            delay: 0.3,
        },
    },
};

const Header = ({ PF, reset }) => {
    // state variable that will contain the src of profile pic fetched from backend(if logged in)
    const [picSrc, setPicSrc] = useState("");

    const [, , , , , , setIsUserLoggedIn] = useContext(Context);

    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_BASE_URL}/authenticate`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (res.status === 401) {
                    setIsUserLoggedIn(false);
                }

                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                const data = await res.json();
                if (PF) {
                    setPicSrc(data.pic);
                    setIsUserLoggedIn(true);
                } else {
                    setPicSrc(data.pic);
                    setIsUserLoggedIn(true);
                }

                if (reset) {
                    setPicSrc("");
                }
            } catch (e) {
                console.log(e);
                setPicSrc("");
            }
        };
        fetchProfilePic();
    }, [PF, setIsUserLoggedIn, reset]);

    return (
        <header className="header">
            <span className="empty-span"></span>
            <NavLink to="/" style={{ textDecoration: "none" }}>
                <motion.div
                    className="logo"
                    variants={Variants}
                    initial="hidden"
                    animate="visible"
                >
                    <img src="/images/bloglogo.png" alt="logo" />
                    <h3>
                        <span style={{ color: "blue" }}>Blog</span>Dude
                    </h3>
                </motion.div>
            </NavLink>
            <div className="search-and-profile">
                <NavLink to="/profile">
                    <motion.img
                        src={
                            picSrc
                                ? `${process.env.REACT_APP_API_BASE_URL}/${picSrc}`
                                : "/images/placeholderCircle.png"
                        }
                        alt="profile"
                        title="Profile"
                        variants={Variants}
                        initial="hidden"
                        animate="visible"
                        whileTap={{ scale: 0.9 }}
                    />
                </NavLink>
                <NavLink
                    to="/search"
                    className="search-icon-link"
                    title="search"
                >
                    <motion.div
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        transition={{
                            type: "spring",
                            stifness: 20,
                            delay: 0.3,
                        }}
                    >
                        <FiSearch />
                    </motion.div>
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
