"use client"

import { atom } from 'recoil';

export const web3State = atom({
    key: 'web3State',
    default: null,
  });
  
  export const contractState = atom({
    key: 'contractState',
    default: null,
  });
