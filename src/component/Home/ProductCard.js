import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product?.ratings ? product.ratings : 0,
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true,
    }
    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.images[0]?.url ? product.images[0]?.url : "https://res.cloudinary.com/vistaprint/images/w_1024,h_1024,c_fill/f_auto,q_auto/v1675872461/ideas-and-advice-prod/en-us/CMT-1630-TshirtDesign-Tile003_en-us-1/CMT-1630-TshirtDesign-Tile003_en-us-1.png?_i=AA"} alt={product?.name} />
            <p>{product?.name}</p>
            <div>
                <ReactStars {...options} /> <span>( {product?.numOfReviews ? product?.numOfReviews : 0} Reviews)</span>
            </div>
            <span>{product?.price ? product.price : 0}</span>
        </Link>
    )
}

export default ProductCard