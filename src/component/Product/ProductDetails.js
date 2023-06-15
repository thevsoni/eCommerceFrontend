import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Loader from "../layout/Loader/Loader";
import ReactStars from "react-rating-stars-component";
import MetaData from "../layout/MetaData.js";
import ReviewCard from "./ReviewCard.js";
import { toast } from "react-hot-toast"
import { addItemsToCart } from "../../actions/cartAction";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
// import { Rating } from "@mui/lab";
import { Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    useEffect(() => {
        if (error) {
            toast.error(error)
            // return; instead of returning we can use clearError 
            dispatch(clearErrors());
        }
        if (reviewError) {
            toast.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id, error, success, reviewError]);
    // console.log(product)

    // const options = {
    //     edit: false,
    //     color: "rgba(20,20,20,0.1)",
    //     activeColor: "tomato",
    //     value: product?.ratings ? product.ratings : 0,
    //     size: window.innerWidth < 600 ? 20 : 25,
    //     isHalf: true,
    // }
    const options = {
        size: "large",
        value: product?.ratings ? product.ratings : 0,
        readOnly: true,
        precision: 0.5,
    }



    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity) {
            toast.error("stock is not available for this quantity")
            return;
        }

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (0 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity));
        toast.success("Item Added To Cart");
    };
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };
    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", params.id);

        dispatch(newReview(myForm));

        setOpen(false);
    };


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
                                {/* <ReactStars {...options} /> */}
                                <Rating {...options} />
                                <span>({product?.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`${product?.price}`}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly value={quantity} type="number" />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{" "}
                                    <button
                                        disabled={product?.stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >
                                        Add to cart
                                    </button>
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

                            <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
                        </div>
                    </div>

                    {/* reviews */}
                    <h3 className="reviewsHeading">REVIEWS</h3>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    // using onClose , if user click on screen in otherside then also it will be closed 
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(+e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

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