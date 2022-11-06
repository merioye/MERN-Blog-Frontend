import React from "react";
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';


// Menu link variants
const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};



export const MenuItem = ( {icon, text, link} ) => {
  
  return (
    <motion.li className='menu-list-item'
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <NavLink exact to={link} className='list-item-link' activeClassName='active-menu-li'>
        <div className="icon-placeholder" >
          {icon}
        </div>
        <div className="text-placeholder" >
          {text}
        </div>
      </NavLink>
    </motion.li>
  );
};
