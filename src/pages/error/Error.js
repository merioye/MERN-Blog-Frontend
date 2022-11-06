import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './error.css';


const Error = ()=>{
    return(
        <>
            <Navbar/>
            <div className='error-page'>
                <div className='error-image'>
                    <img src='images/404.png' alt='' />
                </div>
                <h1>Oops!! Page not Found</h1>
                <NavLink to='/' style={{textDecoration:'none'}}><button className='back-btn'>Homepage</button></NavLink>
            </div>
        </>
    );
}

export default Error;