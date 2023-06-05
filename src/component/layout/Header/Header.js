import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.webp";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


const options = {
    // burgerColorHover: "#eb4034",
    burgerColor: "green",
    burgerColorHover: "cyan",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
    navBackground: "transparent",

};


const Header = () => {
    // return <ReactNavbar {...options} />;
    return (
        <>
            <header>
                <img src="https://codetheweb.blog/assets/img/icon2.png" />
                <nav>
                    <ul>
                        <li><Link to="#">Home</Link></li>
                        <li><Link to="#">About</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="#">Terms of use</Link></li>
                        <li><Link to="#">Contact</Link></li>
                        <li>
                            <Link to="#">
                                <FaSearch /> {/* Add the search icon here */}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )

};

export default Header;
