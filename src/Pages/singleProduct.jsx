import React from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../libs/fetchers/getDatas";
import ProductDetails from "../component/product/productDetails";
import Loading from "../component/daisyui/Loading";
import Toast from "../component/daisyui/Toast";
import ProductCard from "../component/product/productCard";
import BreadCrumbs from "../component/daisyui/BreadCrumbs";

export default function SingleProduct() {
  const { productId } = useParams();
  const { data, error, isLoading } = FetchData(
    `https://fakestoreapi.com/products/${productId}`
  );
  const { data:products,  } = FetchData(
    `https://fakestoreapi.com/products`
  );
  const home =[ {name:"Home", href:"/"},{name:"Products", href:"/products"},{name:productId, href:`/products/${productId}`}]

    console.log(error?.message);

  if (error) {
    return <Toast title={error?.message}/>;
  }

  return (
    <section className="Container pt-4 pb-16">
      <BreadCrumbs crumbs={home}/>
      {isLoading && (
        <div className="text-center">
          <Loading />
        </div>
      )}
      <div className="grid lg:grid-cols-[400px_1fr] pt-8 gap-8">
        <div>
          <img src={data?.image} alt={data?.title} className="h-[400px] w-full " />
        </div>
        <div className="overflow-y-auto">
          {data && <ProductDetails product={data} />}
        </div>
      </div>
      <div className="pt-[5rem]">
        {products && <p className="text-[2.5rem] font-bold ">Related Items</p>}
        <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pt-8'>
          {
            products?.filter(pr=>pr.category === data?.category).slice(0,5).map(product=>{
              return(
              <ProductCard key={product.id} product={product}/>
              )
            })
          }
        </div>
      </div>
    </section>
  );
}
