import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { BiHomeAlt } from "react-icons/bi";
import { FiEdit3, FiLogIn, FiUserPlus } from "react-icons/fi";
import { CgLogOut, CgDanger} from "react-icons/cg";
import { BsEnvelope } from "react-icons/bs";
import Context from '../../../context/Context';







// menu links container variants
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = ({open}) => {
  const [, , , , , isLoggedIn] = useContext(Context);

  return (
    <motion.ul className='menu-list' variants={variants}>
      {
      open && (
      <>
        <MenuItem icon={<BiHomeAlt/>} text='Home' link='/'/>
        <MenuItem icon={<FiEdit3/>} text='Write Blog' link='/write'/>
        {
          !isLoggedIn
          ?
          <>
            <MenuItem icon={<FiLogIn/>} text='Signin' link='/signin'/>
            <MenuItem icon={<FiUserPlus/>} text='Signup' link='/signup'/>
          </>
          :
          <MenuItem icon={<CgLogOut/>} text='Logout' link='/logout'/>
        }
        <hr className='menu-separator'/>
        <MenuItem icon={<BsEnvelope/>} text='Contact' link='/contact'/>
        <MenuItem icon={<CgDanger/>} text='About' link='/about'/>
      </>
      )
      }
    </motion.ul>
)};

