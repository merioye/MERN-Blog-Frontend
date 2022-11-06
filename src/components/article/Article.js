import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./article.css";
import { BiCategory } from "react-icons/bi";
import Context from "../../context/Context";

const Article = ({ post, PF }) => {
    const [, , , , filterClicked] = useContext(Context);

    const {
        _id,
        title,
        category,
        desc,
        postImage,
        author,
        authorImage,
        createdAt,
    } = post;

    const history = useHistory();

    return (
        <div className="article-container">
            <div className="article-image">
                <img src={PF ? PF + postImage : postImage} alt="article" />
            </div>
            <div className="article-text">
                <h2 className="article-title"> {title} </h2>
                <div className="author-and-publish">
                    <div className="user-image">
                        <img
                            src={PF ? PF + authorImage : authorImage}
                            alt="author"
                        />
                    </div>
                    <h4 onClick={(e) => filterClicked(e, "author", history)}>
                        {" "}
                        {author}{" "}
                    </h4>
                    <p> {createdAt.slice(0, 10)} </p>
                </div>
                <div className="category">
                    <BiCategory />
                    <p onClick={(e) => filterClicked(e, "category", history)}>
                        {" "}
                        {category}{" "}
                    </p>
                </div>
                <hr className="line-break" />
                <div className="description"> {desc.slice(0, 303)}... </div>
                <NavLink to={`/post/${_id}`} className="read-more">
                    Read More
                </NavLink>
            </div>
        </div>
    );
};

export default Article;
