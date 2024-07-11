import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails, newReview, } from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, } from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { Rating } from "@material-ui/lab";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const alert = useAlert();

    let { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity));
        alert.success("Item Added To Cart");
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

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id, error, alert, reviewError, success]);

    const option = {
        showThumbs: false,
        showStatus: false,
        showIndicators: false,
        dynamicHeight: true,
        autoPlay: true,
        infiniteLoop: true,
        interval: 3000,
        transitionTime: 400,
        swipeable: true,
        centerMode: true,
        centerSlidePercentage: 80,
    }

    const options = {
        // size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <Fragment>
            <MetaData title={`${product.name}`} />

            <div className="ProductDetails">

                <div >
                    <Carousel {...option} className="CarouselImage">
                        {
                            // product &&
                            // product.map((pro, i) => (
                            product.images &&
                            // pro.images.map((item, i) => (
                            product.images.map((item, i) => (
                                <img
                                    // className="CarouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))
                            // ))
                        }
                    </Carousel>
                </div>

                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <Rating {...options} name="unique-name" />
                        <span className="detailsBlock-2-span">
                            {" "}
                            ({product.numOfReviews} Reviews)
                        </span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button onClick={decreaseQuantity}>-</button>
                                <span>{quantity}</span>
                                <button onClick={increaseQuantity}>+</button>
                            </div>
                            <button
                                disabled={product.Stock < 1 ? true : false}
                                onClick={addToCartHandler}
                            >
                                Add to Cart
                            </button>
                        </div>

                        <p>
                            Status :{" "}
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description : <p>{product.description}</p>
                    </div>

                    <button onClick={submitReviewToggle} className="submitReview">
                        Submit Review
                    </button>
                </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
            >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                    <Rating
                        onChange={(e) => setRating(Number(e.target.value))}
                        value={rating}
                        size="large"
                        precision={0.5}
                        name="unique-name"
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

            {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                    {product.reviews &&
                        loading ? (
                        <Loader />
                    ) : (
                        product.reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))
                    )}
                </div>
            ) : (
                <p className="noReviews">No Reviews Yet</p>
            )}
        </Fragment >
    );
};

export default ProductDetails;
