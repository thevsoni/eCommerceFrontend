import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { toast } from "react-hot-toast";
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const Products = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const keyword = params.keyword;
    const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

    const [price, setPrice] = useState([0, 25000]);
    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }


    const [currentPage, setCurrentPage] = useState(1);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, price));
    }, [dispatch, error, keyword, currentPage, price]);

    let count = filteredProductsCount;
    // console.log(filteredProductsCount, resultPerPage, productsCount)
    return (
        <Fragment>
            {
                loading
                    ?
                    <Loader />
                    :
                    <Fragment>


                        <h2 className="productsHeading" style={{ marginTop: "60px" }}>Products</h2>

                        <div className="products">
                            {products && products.map((product) => (
                                <ProductCard key={product?._id} product={product} />
                            )

                            )}
                        </div>
                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                // onChange={priceHandler}
                                onChangeCommitted={priceHandler} //using this, i can slide my sliderBar
                                valueLabelDisplay="on" //"auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={5000}
                            />
                        </div>

                        {resultPerPage && (resultPerPage < count) && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}
                    </Fragment>
            }
        </Fragment>
    )
}

export default Products