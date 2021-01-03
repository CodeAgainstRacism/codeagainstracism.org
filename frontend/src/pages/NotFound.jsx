import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = (props) => {
    const { currentUser } = props;

    return (
        <div>
            <h1>404</h1>
            <h3>Page Not Found</h3>
            <p>The Page you were looking for doesn't exist or other error occured.</p>
            {/*  if user doesn't have authorization to see this page, redirect them to homepage */}
            <p>Go back to <Link to={!currentUser.isAuthenticated ? "/" : "/yourprojects"}>homepage</Link></p>





        </div >
    )

}
export default NotFoundPage;
