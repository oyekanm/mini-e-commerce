import React, { useState } from "react";
import Button from "../daisyui/Button";
import Rating from "@mui/material/Rating";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { cartInfo } from "../state/CartState";
import { Link } from "react-router-dom";

export default function ProductDetails({ product }) {
  const { category, description, id, image, price, rating, title } = product;
  const [cartItem, setCartItem] = useRecoilState(cartInfo);
  const set = [...new Set(cartItem)];

  const [count, setCount] = useState(0);

  const size = ["xxs", "xs", "s", "m", "l", "xl", "2x", "3x", "4x"];

  const addToCart = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(cart,count);
    for (let i = 0; i < count; i++) {
      cart.push(id);
    }
    // console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCount(0);
    setCartItem(cart);
  };

  // console.log(count)
  return (
    <div className="lg:pr-[10rem]">
      <p className="text-[3.5rem]  font-bold capitalize ">
        <span className="text-[1.8rem]">NGN</span> {price}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-[3rem] font-bold ">{title}</p>
      </div>
      <div className="flex items-center  gap-4">
        <Rating name="half-rating" defaultValue={rating.rate} precision={0.5} />
        <p className="text-[1.6rem] flex items-center gap-4 font-bold capitalize">
          {rating.rate}
        </p>
        <p className="text-[1.5rem]">{rating.count} reviews | 3,000+ sold</p>
      </div>

      <div className="py-[2rem]">
        <p className="text-[1.4rem] font-bold uppercase">size</p>
        <span className="flex flex-wrap justify-start gap-2 pt-4">
          {size.map((size) => {
            return (
              <Button
                variant={"outline"}
                className="rounded-full border-[2px] p-2 w-[40px] h-[40px] uppercase text-[1.2rem] font-bold"
              >
                {size}
              </Button>
            );
          })}
        </span>
      </div>
      <div className="py-[2rem]">
        <p className="text-[1.4rem] font-bold uppercase">quantity</p>
        <div className="flex gap-4 items-center pt-8">
          <Button
            disabled={count === 0}
            variant={"outline"}
            className="h-16"
            onClick={() => setCount((prev) => prev - 1)}
          >
            <AiOutlineMinus className="w-12 h-12" />
          </Button>
          <p className="text-[2rem]">{count}</p>
          <Button
            onClick={() => setCount((prev) => prev + 1)}
            variant={"outline"}
            className="h-16"
          >
            <AiOutlinePlus className="w-12 h-12" />
          </Button>
        </div>
      </div>
      <div className="py-[2rem]">
        <p className="text-[1.4rem] font-bold uppercase">description</p>
        <span className="text-[1.6rem] font-semibold flex flex-wrap justify-start gap-2 pt-4">
          {description}
        </span>
      </div>
      <div className="flex flex-col gap-4 pt-8">
        <Link className="w-full" to={"/cart"}>
          <Button className="text-[1.6rem] uppercase h-16 w-full">
            checkout ({set.length})
          </Button>
        </Link>
        <Button
          onClick={() => addToCart(id)}
          className="text-[1.6rem] uppercase h-16 "
        >
          add to cart
        </Button>
      </div>
    </div>
  );
}
