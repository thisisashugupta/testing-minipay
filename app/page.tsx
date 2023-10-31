"use client"

import React from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import Home from './Home';

export default function App() {
  return (
  <RecoilRoot>
    <Home />
  </RecoilRoot>
  )
}