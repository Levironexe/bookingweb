"use client"
import React from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'

const navbar = () => {
  return (
    <div className='w-full bg-black border-b border-b-zinc-800 z-20'>
    <div className='container flex flex-col sm:flex-row justify-between items-center py-4 mx-auto px-4 sm:px-6 lg:px-8'>            
        <div className='text-5xl bg-gradient-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent font-pinyon'>Heirloom & Vines</div>
            <div className='flex items-center gap-12'>
                <Link href="/" className='text-[20px] text-white/80 hover:text-white  transition-all duration-200 hover:scale-110'>Home</Link>
                <Link href="/" className='text-[20px] text-white/80 hover:text-white  transition-all duration-200 hover:scale-110'>Our Menu</Link>
                
            </div>
        </div>
    </div>
  )
}

export default navbar