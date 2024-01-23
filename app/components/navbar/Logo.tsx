"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logo = () => {

  const router = useRouter()


  return (
 

   <p onClick={()=>router.push('/')}
   className='text-[40px] text-purple-500 font-bold cursor-pointer'
   >AuraInns</p>

  );
}

export default Logo

 {/*  <Image
    onClick={()=>router.push('/')}
    className='hidden md:block cursor-pointer'
    width={100}
    height={100}
    src='/images/logo.png'
  alt='logo'/> */}