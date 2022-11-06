import React from 'react';
import './authImage.css';
import { motion } from 'framer-motion';


const authImageVariants = {
    hidden:{
        opacity:0,
        scale:0
    },
    visible:{
        opacity:1,
        scale:1,
        transition:{
            delay:0.8,
            duration:0.5
        }
    }
}


const AuthImage = ( {src} )=>{
    return(
        <div className='auth-image'>
            <motion.img src={src} alt='auth logo'
                variants={authImageVariants}
            />
        </div>
    );
}

export default AuthImage;