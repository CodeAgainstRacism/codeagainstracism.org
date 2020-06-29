import React from "react";
import {  Link } from "react-router-dom";

const NotFoundPage = () => (
    <div>
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <p>The Page you were looking for doesn't exist or other error occured.</p>
        <p>Please go back or <Link to="/">go to homepage</Link></p> 
    </div>
)

export default NotFoundPage;