'use client';

import ProjectFiltre from '@/components/filtering/ProjectFiltre'
import PropertiesList from '@/components/PropertiesList'
import PropertyPriceFiltre from '@/components/filtering/PropertyPriceFiltre'
import PropertyRoomsFiltre from '@/components/filtering/PropertyRoomsFiltre'
import PropertySquareFiltre from '@/components/filtering/PropertySquareFiltre'
import PropertyStatusFiltre from '@/components/filtering/PropertyStatusFiltre'
import PropertyTypeFiltre from '@/components/filtering/PropertyTypeFiltre'
import SearchBar from '@/components/filtering/SearchBar'
import React, { useState } from 'react'
import { quaryType } from '@/components/constant';



export default function SearchPage() {

    const [showFilterTap, setShowFilterTap] = useState<boolean>(false);

    const [quary, setQuary] = useState<quaryType>({
        projectIds: [],
        propertyTypes: [],
        propertyStatus: [],
        numBedRooms: 0,
        numBathRooms: 0,
        priceRange: [1, 100000000],
        squareFeetRange: [50, 1000],
        sortBy: "",
        search: "",
    });

    // if(!window || typeof window === 'undefined') return;

    return <>
        <SearchBar searchProperties={quary} setSearchProperties={setQuary} setShowFilterTap={setShowFilterTap} />
        <div>
            <div className='flex'>
                <h2 className='font-bold text-[30px]'>Properties in Egypt</h2>
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
