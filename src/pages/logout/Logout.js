import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context/Context";

const Logout = () => {
    const [setIsLoggedIn] = useContext(Context);

    const history = useHistory();

    const logoutUser = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/logout`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            history.push("/signin");
            setIsLoggedIn(false);
        } catch (e) {
            console.log(e);
        }
    };

    logoutUser();

    return <></>;
};

export default Logout;
