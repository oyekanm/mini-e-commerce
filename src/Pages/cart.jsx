import React from "react";
import { useRecoilState } from "recoil";
import { cartInfo } from "../component/state/CartState";
import Toast from "../component/daisyui/Toast";
import Loading from "../component/daisyui/Loading";
import BreadCrumbs from "../component/daisyui/BreadCrumbs";
import { Link } from "react-router-dom";
import ProductCard from "../component/product/productCard";
import { FetchData } from "../libs/fetchers/getDatas";
import Button from "../component/daisyui/Button";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineDelete,
} from "react-icons/ai";
import { faveInfo } from "../component/state/FavoriteState";
import { TotalAmountState } from "../component/state/TotalAmountState";
import { useEffect } from "react";
import { useState } from "react";
import Flutter from "../component/Flutter";


export default function Cart() {
  const [cartItem, setCartItem] = useRecoilState(cartInfo);
  const [favorite, setFavorite] = useRecoilState(faveInfo);
  const [total, setTotal] = useRecoilState(TotalAmountState);
  const [addTotal, setAddTotal] = useState(0)
  const set = [...new Set(cartItem)];

  const { data, error, isLoading } = FetchData(
    "https://fakestoreapi.com/products"
  );

  const home = [
    { name: "Home", href: "/" },
    { name: "Cart", href: "/cart" },
  ];

  const addToFave = (id) => {
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

  const deleteSingleItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newCart = cart.filter((cart) => cart !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log(newCart);
    setCartItem(newCart);
  };

  const addToCart = async (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartItem(cart);
  };

  const clearCart = () => {
    localStorage.clear("cart");
    setCartItem([]);
  };

  const AddTotal = ()=>{
    const tt = total + 500.62
    setAddTotal(tt?.toFixed(2))
  }

  

  

  useEffect(() => {
    AddTotal()
  }, [total]);
  // console.log(set)

  return (
    <div className="Container pb-16">
      <BreadCrumbs crumbs={home} />
      {error && <Toast title={error?.message} />}
      {isLoading && (
        <div className="text-center">
          <Loading />
        </div>
      )}
      {set.length === 0 && (
        <div className="text-center">
          <p className="text-[3rem] sm:text-[5rem] font-bold ">
            OOPs!! You do not have any item in your Cart!
          </p>
          <Link to={"/products"} className="underline text-[2rem] font-medium">
            {" "}
            Go back to products page to select an item
          </Link>
        </div>
      )}
      {set.length > 0 && (
        <section className="pt-12 pb-24 flex flex-col md:flex-row  gap-8">
          <div className=" ">
            <div className="card mb-4 w-full bg-base-100 rounded-none shadow-[0_0_10px_5px_#a5909057]">
              <div className="card-body flex items-center justify-between flex-row">
                <h2 className="card-title text-[2rem] font-bold">
                  Shopping Cart ({set.length})
                </h2>
                <Button
                  className={
                    "bg-transparent underline text-red-600 text-[1.5rem] font-medium border-none outline-none hover:bg-transparent shadow-none"
                  }
                  onClick={clearCart}
                >
                  Delete all item
                </Button>
              </div>
            </div>
            <div className="card w-full bg-base-100 rounded-none shadow-[0_0_10px_5px_#a5909057]">
              <div className="card-body grid gap-4">
                {data
                  ?.filter((pr) => set.includes(pr.id))
                  ?.map((product) => {
                    const {
                      category,
                      description,
                      id,
                      image,
                      price,
                      rating,
                      title,
                    } = product;

                    const amount = cartItem.filter((cart) => cart === id);
                    // console.log(amount)
                    return (
                      <div
                        key={id}
                        className="grid grid-cols-[100px_1fr] gap-4 p-4"
                      >
                        <img src={image} alt={title} className="h-[100px]" />
                        <div>
                          <span className="flex flex-col sm:flex-row items-center justify-between">
                            <p className="text-[2rem] hidden  sm:block">
                              {title.substring(0, 55)}
                              {title.length > 55 && "..."}
                            </p>
                            <p className="text-[2rem] block  sm:hidden">
                              {title}
                            </p>
                            <span className="flex items-center">
                              <span
                                onClick={() => addToFave(id)}
                                className=" right-3 cursor-pointer top-0"
                              >
                                {favorite.includes(id) ? (
                                  <AiFillHeart
                                    color="red"
                                    className="w-12 h-12"
                                  />
                                ) : (
                                  <AiOutlineHeart className="w-12 h-12" />
                                )}
                              </span>
                              <AiOutlineDelete
                                onClick={() => deleteSingleItem(id)}
                                className="w-12 h-12 cursor-pointer"
                              />
                            </span>
                          </span>
                          <span className="flex items-center justify-between pt-8 ">
                            <p className="text-[1.6rem] font-medium">
                              NGN{price}
                            </p>
                            <div className="flex gap-8 items-center">
                              <Button
                                // disabled={count === 0}
                                variant={"outline"}
                                className="h-8 rounded-full"
                                // onClick={() => setCount((prev) => prev - 1)}
                              >
                                <AiOutlineMinus className="w-4 h-4" />
                              </Button>
                              <p className="text-[2rem]">{amount.length}</p>
                              <Button
                                onClick={() => addToCart(id)}
                                variant={"outline"}
                                className="h-8 rounded-full"
                              >
                                <AiOutlinePlus className="w-4 h-4" />
                              </Button>
                            </div>
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="h-[400px]  sm:sticky w-full sm:w-[400px]">
            <div className="card mb-4  w-full bg-base-100 rounded-none shadow-[0_0_10px_5px_#a5909057]">
              <div className="card-body">
                <h2 className="card-title text-[2rem] font-bold">Summary</h2>
                <div className="grid gap-4 py-8">
                  <span className="flex items-center justify-between text-[1.5rem] font-medium">
                    Subtotal <span>NGN {total?.toFixed(2)}</span>
                  </span>
                  <span className="flex items-center justify-between text-[1.5rem] font-medium">
                    Delivery fee <span>NGN 500.62</span>
                  </span>
                  <span className="flex items-center justify-between text-[1.5rem] font-bold">
                    Total <span className="text-[2rem]">NGN {addTotal}</span>
                  </span>
                </div>
                {/* <Button className="text-[1.8rem] font-semibold capitalize rounded-[1rem] h-16">
                  checkout ({set.length})
                </Button> */}
                <Flutter onClose={clearCart} price={addTotal}/>
              </div>
            </div>
            <div className="card w-full bg-base-100 rounded-none shadow-[0_0_10px_5px_#a5909057]">
              <div className="card-body">
                <div className="pb-4">
                  <h2 className="card-title text-[2rem] font-bold">Pay with</h2>
                  <div className="grid grid-cols-6 gap-3 pt-4">
                    <img
                      src="https://img.alicdn.com/tfs/TB1xcMWdEKF3KVjSZFEXXXExFXa-68-48.png"
                      alt="visa card"
                    />
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9NkGQLcql_p8QCkbADD_UV0mw8FON3znFJ6lHd7FXw&s"
                      alt="master card"
                    />
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTsT9VojMYDl1a35sEilgC3W64KiQfj5cKBrEuobZD6w&s"
                      alt="paypal"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/2052px-American_Express_logo_%282018%29.svg.png"
                      alt="american express"
                    />
                  </div>
                </div>
                <hr className="py-4" />
                <div>
                  <h2 className="card-title text-[2rem] font-bold">
                    Buyer protection
                  </h2>
                  <p className="text-[1.6rem] font-medium pt-4">
                    Get full refund if the item is not as described or if is not
                    delivered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
