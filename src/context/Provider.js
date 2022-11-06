import React, { useState } from "react";
import Context from "./Context";

const Provider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    // state variable that will contain boolean true if the category or author name clicked to show only posts related to that category or author
    // and prevents the home page to send request to backend for all posts
    // otherwise false
    const [isFromSingle, setIsFromSingle] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // handler that will be called when the user clicks on author name or category name on blog post
    const filterClicked = async (e, filter, history) => {
        setIsFromSingle(true);

        const val = e.target.textContent.trim();

        history.push({
            pathname: "/",
            search: `?${filter}=${val}`,
        });

        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/posts/filter/?${filter}=${val}`,
                {
                    credentials: "include",
                }
            );
            if (!res.ok) {
                throw new Error(res.statusText);
            }

            const data = await res.json();
            setPosts(data.posts);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Context.Provider
            value={[
                posts,
                setPosts,
                isFromSingle,
                setIsFromSingle,
                filterClicked,
                isLoggedIn,
                setIsLoggedIn,
            ]}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;
