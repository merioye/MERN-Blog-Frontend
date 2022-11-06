import React from 'react';
import './authheader.css';

const AuthHeader = ( {text} )=>{
    return(
        <div className='auth-header'>
            <h1 className='auth-heading'> {text} </h1>
        </div>
    );
}

export default AuthHeader;