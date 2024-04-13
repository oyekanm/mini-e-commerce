"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition,  } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingCartIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartInfo } from "./state/CartState";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "products", href: "/products" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [cartItem, setCartItem] = useRecoilState(cartInfo);
  const set = [...new Set(cartItem)]
  const pathname = "/";

  // console.log(set)

  return (
    <Disclosure as="nav" className="bg-slate-500  py-4 ">
      {({ open }) => (
        <div className="Container">
          <div className="mx-auto max-w-full">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-12 w-12" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-12 w-12" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <span key={item.name}>
                        <NavLink
                          to={item.href}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending"
                              : classNames(
                                  isActive
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-[1.6rem] font-medium capitalize"
                                )
                          }
                        >
                          {item.name}
                        </NavLink>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link to={"/cart"}>
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-gray-400  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <div className="badge absolute h-8 w-8">
                      <p className="text-[1.5rem] font-bold">{set.length}</p>
                    </div>
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View cart item</span>
                    <ShoppingCartIcon className="w-12 h-12" color="#fff" />
                  </button>
                </Link>
                <Link to={"/favorites"}>
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-gray-400  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View favorite item</span>
                    <HeartIcon className="w-12 h-12" color="#fff" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-[2rem] font-medium"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
