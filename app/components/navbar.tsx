"use client"
import React from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'

const navbar = () => {
  return (
    <div className='w-full bg-[#f1f1e5] absolute z-10'>
        <div className='max-w-screen-2xl mx-auto  flex justify-between items-center px-12 py-4'>
            <div className='text-5xl bg-gradient-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent font-pinyon'>Heirloom & Vines</div>
            <div className='flex items-center gap-12'>
                <Link href="/" className='text-[20px] text-black/80 hover:text-black  transition-all duration-200 hover:scale-110'>Home</Link>
                <Link href="tel:0798896946" target="_blank" className='text-[20px] text-white flex items-center gap-4 bg-gradient-to-r from-orange-600 to-orange-400 py-2 px-4 hover:from-orange-700 hover:to-orange-500 rounded-xl transition-colors duration-300'><span><Phone/></span>07988.96.946</Link>
            </div>
        </div>
    </div>
  )
}

export default navbar