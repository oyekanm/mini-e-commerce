import React from 'react'
import { FetchData } from '../libs/fetchers/getDatas'
import { Link } from 'react-router-dom'
import ProductCard from '../component/product/productCard'
import Loading from '../component/daisyui/Loading'
import Toast from '../component/daisyui/Toast'
import BreadCrumbs from '../component/daisyui/BreadCrumbs'

export default function Products() {
    const { data, error, isLoading } = FetchData('https://fakestoreapi.com/products')
    const home =[ {name:"Home", href:"/"},{name:"Products", href:"/products"}]
    // console.log(error,data)
    if(error){
      return <Toast />
    }
  return (
    <div className='Container'>
      <BreadCrumbs crumbs={home}/>
      <section className='pt-12'>
        {isLoading && <div className='text-center'><Loading /></div> }
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {
            data?.map(product=>{
              return(
              <ProductCard key={product.id} product={product}/>
              )
            })
          }
        </div>
      </section>
    </div>
  )
}
