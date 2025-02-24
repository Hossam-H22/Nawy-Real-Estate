import Image from 'next/image.js'
import Link from 'next/link.js'
import React from 'react'

export default function Navbar() {
    return (
        <nav className=" w-full mb-8 py-3 bg-white shadow-md">
            <div className='container mx-auto flex justify-center relative'>
                <Link href='/' className="flex gap-2 flex-center">
                    <Image
                        src='/assets/icons/nawy-logo.png'
                        alt='Nawy Real Estate'
                        width={160}
                        height={40}
                        className="object-contain"
                    />
                    {/* <p className="logo_text">Nawy</p> */}
                </Link>

                <Link 
                    href='/new-property' 
                    className="absolute right-0 top-0 border px-4 py-2 rounded-lg hover:border-2"
                >
                    Add New Property
                </Link>
            </div>
            
        </nav>
    )
}
