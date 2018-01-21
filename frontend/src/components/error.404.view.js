﻿import React from 'react';
import { Link } from 'react-router-dom';
import Img404 from '../img/404.png';

function Error404(props) {
    console.log(props);
    return (
        <div className="center-block">
            <h1>Error 404</h1>
            <img src={Img404} alt="404 Error" /> <br /><br />
            <h2>The page "{props.location.pathname}" doesn't exist!</h2> 
            <h3>Would you like to return <Link to="/">home</Link> instead?</h3>
        </div>
    );
}

export default Error404;