import React from 'react';
import { motion } from 'framer-motion'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import './about.css';
import blogBackground from './blogBackground.jpeg';

const About = ()=>{
    return(
    <>
        <Navbar/>
        <Header/>
        <div className='about-background' style={{backgroundImage:`url(${blogBackground})`}}>
            <div className='about-overlay1'></div>
            <div className='about-overlay2'></div>
            <div className='about-overlay3'></div>
        </div>
        <motion.h1 className='about-main-heading'
            initial={{y:50, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0.3, duration:0.8}}
        >About BlogDude</motion.h1>
        <div className='about-content'>
            <motion.h3
                initial={{y:50, opacity:0}}
                animate={{y:0, opacity:0.8}}
                transition={{delay:0.3, duration:1}}
            ><img src='/images/bloglogo.png' alt='Main' />&nbsp;&nbsp;BlogDude Support</motion.h3>
            <br/><br/>
            <motion.p
                initial={{x:'100vw'}}
                animate={{x:0}}
                transition={{delay:1.5, type:'spring', stiffness:130}}
            >
                <b>BlogDude</b> is a free platform for blogging.
                <br/><br/>
                <b>Features -</b>
                <br/><br/>
                BLOGS
                <br/><br/>
                <ul>
                    <li>
                        <b>Wirte </b>a blog with a rich text editor.
                    </li>
                    <li>
                        <b>Update </b>blog anytime after publishing.
                    </li>
                    <li>
                        <b>Autosave </b>blog while writing.
                    </li>
                </ul>
                <br/>
                USERS
                <ul>
                    <br/>
                    <li>
                        <b>Create </b>and update public profile.
                    </li>
                    <li>
                        <b>View </b>all blogs written by you.
                    </li>
                </ul>
                <br/>
                BROWSING
                <ul>
                <br/>
                    <li>
                        View all <b>latest blogs </b>on the home page.
                    </li>
                    <li>
                        <b>Filter </b>by category from the home page.
                    </li>
                    <li>
                        <b>Related blogs </b>for each blog in the single blog page.
                    </li>
                    <li>
                        <b>Commenting </b>system by Disqus.
                    </li>
                    <li>
                        <b>Search </b>blogs with keywords.
                    </li>
                    <li>
                        <b>Search </b>blogs with keywords.
                    </li>
                </ul>
            </motion.p>


        </div>
    </>
    );
    
}

export default About;