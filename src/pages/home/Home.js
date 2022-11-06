import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import CommonHeading from "../../components/commonHeading/CommonHeading";
import Article from "../../components/article/Article";
import "./home.css";
import { FiFilter } from "react-icons/fi";
import Context from "../../context/Context";
import Loader from "../../components/loader/Loader";

// custom hook that will detect the outside click of categories list and hide the list
const useClickOutside = (handler) => {
    const categories = useRef();
    useEffect(() => {
        const categoriesHandler = (e) => {
            if (!categories.current.contains(e.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", categoriesHandler);

        return () => {
            document.removeEventListener("mousedown", categoriesHandler);
        };
    });
    return categories;
};

const Home = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [categoriesList, setCategoriesList] = useState([]);
    const [posts, setPosts, isFromSingle, , filterClicked] =
        useContext(Context);

    const location = useLocation();

    const history = useHistory();

    useEffect(() => {
        if (!isFromSingle || !location.search) {
            // if the isFromSingle is false(which means user wants all posts not of some particular category or author)
            // or the url dones not contains any query string which means the url is '/'
            // then this request will be made
            const fetchPosts = async () => {
                try {
                    const res = await fetch(
                        `${process.env.REACT_APP_API_BASE_URL}/posts`,
                        {
                            credentials: "include",
                        }
                    );
                    if (!res.ok) {
                        throw new Error(res.statusText);
                    }

                    const data = await res.json();
                    setPosts(data.postList);

                    let arr = data.postList.map((post) => {
                        return post.category;
                    });

                    setCategoriesList([...new Set(arr)]);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchPosts();
        }
    }, [setPosts, isFromSingle, location]);

    // using the custom hook
    const categories = useClickOutside(() => {
        setShowCategories(false);
    });

    const displayCategories = () => {
        setTimeout(() => {
            setShowCategories(true);
        }, 400);
    };

    // handler that will be called when the user clicks on any category from the categories list
    const handleCategoryClick = (e) => {
        filterClicked(e, "category", history);
    };

    return (
        <>
            {posts.length ? (
                <>
                    <Navbar />
                    <Header />
                    <div className="header-image">
                        <h1>Blog</h1>
                        <img src="/images/headerImage.jpeg" alt="main-header" />
                    </div>
                    <CommonHeading
                        title="Today's digest"
                        src="/images/homeHeading.jpg"
                        alt="homeHeading"
                    />
                    <motion.div
                        className="categories-container"
                        onClick={displayCategories}
                        initial={{ width: "210px", scale: 1 }}
                        whileTap={{ width: "190px", scale: 0.9 }}
                    >
                        <ul
                            ref={categories}
                            style={
                                showCategories
                                    ? { display: "block" }
                                    : { display: "none" }
                            }
                        >
                            {categoriesList.map((cat) => {
                                return (
                                    <li key={cat} onClick={handleCategoryClick}>
                                        {" "}
                                        {cat}{" "}
                                    </li>
                                );
                            })}
                        </ul>

                        <FiFilter style={{ fontSize: "1.3rem" }} />
                        <span>filter by category</span>
                    </motion.div>
                    <div className="articles">
                        {posts
                            ? posts.map((post) => {
                                  return (
                                      <Article
                                          key={post._id}
                                          post={post}
                                          PF={`${process.env.REACT_APP_API_BASE_URL}/`}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Home;
