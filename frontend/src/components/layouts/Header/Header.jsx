import React from "react";
import styles from "./Header.module.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { FaSearch } from 'react-icons/fa';
// import {useHistory} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import logo from "./logo.png"



const Header = () => {
  const navigate = useNavigate();
  // function showSidebar (){
  //   const getSidebar = document.querySelector('.navbarHamburger');
  //   console.log("Hello")
  //   getSidebar.styles.display = 'flex'
  // }
  const [sidebar, setSidebar] = useState(false);
  const [keyword, setKeyword] = useState("");
  const showSidebar = () =>{
    setSidebar((prevState) => !prevState);
    // console.log(sidebar)
  }

  const inputChangeHandler =(event) =>{
    setKeyword(event.target.value)
    // console.log(keyword)

  }
  const searchSubmitHandler = (event) =>{
    event.preventDefault();
    // console.log(keyword)
    if(keyword.trim()){
      navigate(`/products/${keyword}`)
    }
  }

  return (
    
    //   <ReactNavbar {...styling}/>
    <div id="navbar" className={styles.outerBox}>
        <nav className={styles.sidebarHam} style={{ right: sidebar ? "0" : "-100%" }}>
            <ul><IoCloseSharp onClick={showSidebar} className={styles.crossIcon}/></ul>
            <ul className={styles.logoNew}> <Link className={styles.sidebarLink} to={'/'}> <img className={styles.sidebarLogo} src={logo} alt="" /></Link> </ul>
            <ul className={styles.navUlNew}>
            <form action="" onSubmit={searchSubmitHandler}>
              <div className={`${styles.searchInputBox} ${styles.searchInputSidebar}`}>
                <input type="text" placeholder="Search a Product" onChange={inputChangeHandler} />
                <button type="submit" className={styles.searchButton}> <FaSearch className={styles.searchIcon} /></button>
              </div>
            </form>
                <li><Link className={styles.sidebarLink} to={'/'}>Home</Link></li>
                <li><Link className={styles.sidebarLink}  to={'/products'} >Products</Link></li>
                <li><Link className={styles.sidebarLink}  to={'/contact-us'}>Contact</Link></li>
                <li><Link className={styles.sidebarLink}  to={'/about-us'}>About</Link></li>
                <li><Link className={styles.sidebarLink}  to={'/my-orders'}>Orders</Link></li>
                <li><Link className={styles.sidebarLink}  to={'/my-cart'}>Cart</Link></li>
                <li className={`${styles.navbarDisplay} ${styles.profileLink}`}><Link className={styles.sidebarLink}  to={'/login'} ><CgProfile className={styles.profileIcon}/></Link></li>

            </ul>
        </nav>
        <nav className={styles.navbar}>
            <ul className={styles.logo}> <Link className={styles.link} to={'/'}> <img className={styles.homeLogo} src={logo} alt="" /> </Link> </ul>
            <form action="" onSubmit={searchSubmitHandler}>
              <div className={styles.searchInputBox}>
                <input type="text" placeholder="Search a Product" onChange={inputChangeHandler} />
                <button type="submit" className={styles.searchButton}> <FaSearch className={styles.searchIcon} /></button>
              </div>
            </form>
            <ul className={`${styles.navUl} `}>
                <li className={`${styles.navbarDisplay}`}><Link className={styles.link} to={'/'}>Home</Link></li>
                <li className={`${styles.navbarDisplay}`}><Link className={styles.link}  to={'/products'} >Products</Link></li>
                <li className={`${styles.navbarDisplay}`}><Link className={styles.link}  to={'/contact-us'}>Contact</Link></li>
                <li className={`${styles.navbarDisplay}`}><Link className={styles.link}  to={'/about-us'}>About</Link></li>
                <li className={`${styles.navbarDisplay}`}><Link className={styles.link}  to={'/my-orders'}>Orders</Link></li>
                <li className={`${styles.navbarDisplay}`}><Link className={styles.link}  to={'/my-cart'}>Cart</Link></li>
                <li className={`${styles.navbarDisplay} ${styles.profileLink}`}><Link className={styles.link}  to={'/login'} ><CgProfile className={styles.profileIcon}/></Link></li>
                <li onClick={showSidebar} className={styles.logoBox}><a style={{cursor: "pointer"}}><GiHamburgerMenu className={styles.hamburgerIcon}/></a></li>
            </ul>
        </nav>
    </div>
  );

};

export default Header;
