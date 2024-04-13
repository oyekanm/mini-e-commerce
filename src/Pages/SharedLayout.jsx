import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../component/navbar';

export default function SharedLayout() {
  return (
    <main>
      <Navbar/>
      <Outlet/>
    </main>
  )
}
