import React from 'react'
import { atom } from 'recoil';

export const TotalAmountState = atom({
    key: "total", // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
  });
