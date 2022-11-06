import React from 'react';
import { motion } from 'framer-motion';
import './common.css';

const CommonHeading = ( {title, src, alt} )=>{
    return(
        <motion.div className='common-heading'
            initial={{x:'100vw'}}
            animate={{x:0}}
            transition={{type:'spring', delay:'0.5'}}
        >
            <h1> {title} </h1>
            <div className='common-image'>
                <img src={src} alt={alt} />
            </div>
        </motion.div>
    );
}

export default CommonHeading;