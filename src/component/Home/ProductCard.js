import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
    const options = {
        edit: false,
        value: product.ratings,
        readOnly: true,
        size: window.innerWidth > 600 ? 20 : 25,
        isHalf: true
    };
    return (
        <Link to={`/product/${product._id}`} className="productCard">
            <img loading="lazy" src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} />
                <span className="productCardSpan">
                    {" "}
                    ({product.numOfReviews} Reviews)
                </span>
            </div>
            <span>{`₹${product.price}`}</span>
            <div />
        </Link>
    );
};

export default ProductCard;
