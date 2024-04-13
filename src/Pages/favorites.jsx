import React from "react";
import { FetchData } from "../libs/fetchers/getDatas";
import ProductCard from "../component/product/productCard";
import { useRecoilValue } from "recoil";
import { faveInfo } from "../component/state/FavoriteState";
import Loading from "../component/daisyui/Loading";
import Toast from "../component/daisyui/Toast";
import BreadCrumbs from "../component/daisyui/BreadCrumbs";

export default function Favorites() {
  const { data, error, isLoading } = FetchData(
    "https://fakestoreapi.com/products"
  );
  const fave = useRecoilValue(faveInfo);
  const home =[ {name:"Home", href:"/"},{name:"Favorites", href:"/favorites"}]
  // console.log(error)
  if (error) {
    return <Toast />;
  }
  return (
    <div className="Container pb-16">
      <BreadCrumbs crumbs={home}/>
      <section className="pt-12">
        {isLoading && (
          <div className="text-center">
            <Loading />
          </div>
        )}
        {data.length === 0 && (
          <div className="text-center">
            <p className="text-[5rem] font-bold ">
              OOPs!! we do not have this data at the moment!
            </p>
          </div>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data
            ?.filter((pr) => fave.includes(pr.id))
            .map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
      </section>
    </div>
  );
}
