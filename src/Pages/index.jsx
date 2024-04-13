import React from "react";
import { FetchData } from "../libs/fetchers/getDatas";
import { Link } from "react-router-dom";
import ProductCard from "../component/product/productCard";

export default function Home() {
  const { data } = FetchData("https://fakestoreapi.com/products");

  return (
    <div className="Container">
      <section className="pt-12">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8">
          <p className="text-[1.8rem] font-semibold">Better services and selected items on Choice</p>
          <Link className="text-[1.5rem] font-semibold underline" to={"/products"}>view more</Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data?.slice(0, 5).map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    </div>
  );
}
