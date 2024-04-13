import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { faveInfo } from "../state/FavoriteState";

export default function ProductCard({ product }) {
  const { category, description, id, image, price, rating, title } = product;
  const [favorite, setFavorite] = useRecoilState(faveInfo);

  const addToCart = (id) => {
    const favorite = JSON.parse(localStorage.getItem("favorite")) || [];
    if (favorite.includes(id)) {
      const index = favorite.filter((fave) => fave !== id);
      localStorage.setItem("favorite", JSON.stringify(index));
      setFavorite(index);
      // console.log(favorite.indexOf(id))
    } else {
      favorite.push(id);
      localStorage.setItem("favorite", JSON.stringify(favorite));
      setFavorite(favorite);
    }
    // console.log(favorite);
  };

  return (
    <div
      key={id}
      className="card w-[90%] bg-base-100 shadow-2xl mx-auto text-center"
    >
      <span
        onClick={() => addToCart(id)}
        className="absolute right-3 cursor-pointer top-0"
      >
        {favorite.includes(id) ? (
          <AiFillHeart color="red" className="w-12 h-12" />
        ) : (
          <AiOutlineHeart className="w-12 h-12" />
        )}
      </span>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className="w-full h-[200px]" />
      </Link>
      {/* <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
      <div className="card-body">
        <Link to={`/products/${id}`}>
          {/* <p className="text-[1.4rem] font-bold uppercase py-4">{title}</p> */}
          <h2 className="card-title text-start">
            {title.substring(0, 30)}
            {title.length > 30 && "..."}
          </h2>
        </Link>
        <p className="text-[1.4rem] flex items-center gap-4 font-semibold capitalize pb-4">
          {rating.rate}
          <Rating
            name="half-rating"
            defaultValue={rating.rate}
            precision={0.5}
          />
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline p-3">{category}</div>
        </div>
        <p className="text-[2rem] text-start font-bold capitalize ">
          <span className="text-[1rem]">NGN</span> {price}
        </p>
        {/* <div className="card w-96 bg-base-100 shadow-xl">
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
