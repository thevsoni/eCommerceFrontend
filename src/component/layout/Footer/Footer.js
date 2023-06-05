import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";


const Footer = () => {
    return (
        <footer id='footer'>
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR AP4</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="playStore" />
            </div>
            <div className='midFooter'>
                <h1>eCommerce</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; thevsoni</p>
            </div>
            <div className='rightFooter'>
                <h4>Follow Us</h4>
                <a href="http://instagram.com/thevsoni">Instagram</a>
                <a href="http://instagram.com/thevsoni">Facebook</a>
                <a href="http://instagram.com/thevsoni">LinkedIn</a>
            </div>
        </footer>
    )
}

export default Footer