import React, { Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Loader from "../layout/Loader/Loader";
import ReactStars from "react-rating-stars-component";
import MetaData from "../layout/MetaData.js";
import ReviewCard from "./ReviewCard.js";
import { toast } from "react-hot-toast"


const ProductDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    useEffect(() => {
        if (error) {
            toast.error(error)
            // return; instead of returning we can use clearError 
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id, error]);
    // console.log(product)
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product?.ratings ? product.ratings : 0,
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true,
    }
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product?.name} -- ECOMMERCE`} />

                    <div className='ProductDetails'>
                        <div>
                            <Carousel>
                                {product?.images && product.images.map((item, i) => (
                                    <img
                                        className='CarouselImages'
                                        key={item?.url ? item.url : i}
                                        src={item?.url ? item.url : "https://res.cloudinary.com/vistaprint/images/w_1024,h_1024,c_fill/f_auto,q_auto/v1675872461/ideas-and-advice-prod/en-us/CMT-1630-TshirtDesign-Tile003_en-us-1/CMT-1630-TshirtDesign-Tile003_en-us-1.png?_i=AA"}
                                        alt={`${i} Slide`}
                                    />
                                ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product?.name}</h2>
                                <p>Product # {product?._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStars {...options} />
                                <span>({product?.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`${product?.price}`}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className="detailsBlock-3-1-1">
                                        <button>-</button>
                                        <input value="1" type="number" />
                                        <button>+</button>
                                    </div>{" "}
                                    <button>Add to cart</button>
                                </div>
                                <p>
                                    Status:{" "}
                                    <b className={product?.stock < 1 ? "redColor" : "greenColor"}>
                                        {product?.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description : <p>{product?.description}</p>
                            </div>

                            <button className='submitReview'>Submit Button</button>
                        </div>
                    </div>

                    {/* reviews */}
                    <h3 className="reviewsHeading">REVIEWS</h3>
                    {product?.reviews && product?.reviews[0] ? (
                        <div className="reviews">
                            {product?.reviews &&
                                product?.reviews.map((review) => (
                                    <ReviewCard key={review?._id} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails