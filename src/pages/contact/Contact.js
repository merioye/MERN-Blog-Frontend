import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import CommonHeading from '../../components/commonHeading/CommonHeading';
import './contact.css';
import { FcPhoneAndroid, FcOrganization } from "react-icons/fc";




const phoneVariants = {
    hidden:{
        x:'100vw'
    },
    visible:{
        x:0,
        transition:{
            delay:2.3
        }
    }
}

const addressVariants = {
    hidden:{
        x:'-100vw',
    },
    visible:{
        x:0,
        transition:{
            delay:2
        }
    }
}

const mailVariants = {
    hidden:{
        y:'100vh'
    },
    visible:{
        y:0,
        transition:{
            delay:1,
            type:'spring',
            stiffness:150
        }
    }
}

const Contact = ()=>{
    return(
        <>
            <Navbar/>
            <Header/>
            <CommonHeading title='Contact Us' src='/images/contact1.jpg' alt='forgot-password'/>

            <div className='phone-and-address'>
                <motion.div className='phone'
                    variants={phoneVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <div className='phone-div'>
                        <FcPhoneAndroid className='contact-icon'/>
                        <div className='phone-details'>
                            <h4>Phone</h4>
                            <p>03xx-xxxxxxx</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div className='address'
                    variants={addressVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <div className='address-div'>
                        <FcOrganization className='contact-icon'/>
                        <div className='address-details'>
                            <h4>Address</h4>
                            <p>Okara, Pakistan</p>
                        </div>
                    </div>
                </motion.div>
            </div>
            <motion.div className='mail'
                variants={mailVariants}
                initial='hidden'
                animate='visible'
            >
                <p>OR</p>
                <span>Drop a mail at</span>
                <p>jkl123@asd.com</p>
            </motion.div>
        </>
    );
}

export default Contact;