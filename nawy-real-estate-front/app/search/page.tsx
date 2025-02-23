"use client"

import BreadCrumb from '@/components/BreadCrumb'
import ProjectFiltre from '@/components/ProjectFiltre'
import PropertiesList from '@/components/PropertiesList'
import PropertyPriceFiltre from '@/components/PropertyPriceFiltre'
import PropertyRoomsFiltre from '@/components/PropertyRoomsFiltre'
import PropertySquareFiltre from '@/components/PropertySquareFiltre'
import PropertyStatusFiltre from '@/components/PropertyStatusFiltre'
import PropertyTypeFiltre from '@/components/PropertyTypeFiltre'
import SearchBar from '@/components/SearchBar'
import React, { useState } from 'react'

export default function SearchPage() {

    // const [numOfProperties, setNumOfProperties] = useState<number>(0);
    const [showFilterTap, setShowFilterTap] = useState<boolean>(false);

    const [quary, setQuary] = useState<any>({
        projectIds: [],
        propertyTypes: [],
        propertyStatus: [],
        numBedRooms: [],
        numBathRooms: [],
        priceRange: [1, 100000000],
        squareFeetRange: [50, 1000],
        sortBy: "",
        search: "",
    });

    return <>
        {/* <BreadCrumb /> */}
        <SearchBar quary={quary} setQuary={setQuary} setShowFilterTap={setShowFilterTap} />
        <div>
            <div className='flex'>
                <h2 className='font-bold text-[30px]'>Properties in Egypt</h2>
                {/* <p className='font-light text-gray-600 text-[15px] mt-2 ms-3'>{numOfProperties} Properties</p> */}
            </div>
            <section className='mt-6 grid grid-cols-12 gap-4'>
                <aside className={`${showFilterTap? 'block': 'hidden'} md:block col-span-12 md:col-span-3 md:mb-20 mb-5 `}>
                    <ProjectFiltre quary={quary} setQuary={setQuary} />
                    <PropertyTypeFiltre quary={quary} setQuary={setQuary} />
                    <PropertyRoomsFiltre quary={quary} setQuary={setQuary} />
                    <PropertyPriceFiltre quary={quary} setQuary={setQuary} />
                    <PropertySquareFiltre quary={quary} setQuary={setQuary} />
                    <PropertyStatusFiltre quary={quary} setQuary={setQuary} />
                </aside>
                <main className='col-span-12 md:col-span-9 px-3'>
                    <PropertiesList quary={quary}/>
                </main>
            </section>
        </div>
    </>
}
