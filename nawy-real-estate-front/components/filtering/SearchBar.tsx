'use client';
import React, { useState } from 'react'
import { quaryType } from '../constant';

export default function SearchBar({ 
    searchProperties, 
    setSearchProperties, 
    setShowFilterTap 
}: {
    searchProperties:quaryType,
    setSearchProperties:React.Dispatch<React.SetStateAction<quaryType>>,
    setShowFilterTap:React.Dispatch<React.SetStateAction<boolean>>,
}) {

    const [openSortOptions, setOpenSortOptions] = useState<boolean>(false);
    const sortOptions = [
        { display: "Minimam Price", value: "price" },
        { display: "Maximam Price", value: "-price" },
        { display: "Minimam Square Feet", value: "squareFeet" },
        { display: "Minimam Square Feet", value: "-squareFeet" },
    ]

    const handleSort = (value: string) => {
        // const newQuery = { ...searchProperties };
        // if (newQuery.sortBy !== value) newQuery.sortBy = value;
        // else newQuery.sortBy = "";
        // setSearchProperties(newQuery);

        // if (searchProperties.sortBy === value) value=""
        setSearchProperties((prevQuery) => ({ ...prevQuery, sortBy: prevQuery.sortBy===value? "": value }))
    }

    return (
        <div className='w-full flex mb-5 gap-2 relative'>
            <input
                type="text"
                value={searchProperties.search}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                    // const newQuery = { ...searchProperties };
                    // newQuery.search = e.target.value;
                    // setSearchProperties(newQuery);
                    setSearchProperties((prevQuery: any) => ({ ...prevQuery, search: e.target.value }))
                }}
                placeholder="Search for property"
                className='w-full py-2.5 px-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'
            />
            <button
                onClick={() => setShowFilterTap((prev: boolean) => !prev)}
                className={`block md:hidden px-4 border border-gray-300 rounded-lg hover:border-gray-400`}
            >
                <svg width="18" height="20" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 2.00245C4.73478 2.00245 4.48043 2.10781 4.29289 2.29534C4.10536 2.48288 4 2.73723 4 3.00245C4 3.26767 4.10536 3.52202 4.29289 3.70956C4.48043 3.89709 4.73478 4.00245 5 4.00245C5.26522 4.00245 5.51957 3.89709 5.70711 3.70956C5.89464 3.52202 6 3.26767 6 3.00245C6 2.73723 5.89464 2.48288 5.70711 2.29534C5.51957 2.10781 5.26522 2.00245 5 2.00245ZM2.17 2.00245C2.3766 1.41692 2.75974 0.909884 3.2666 0.55124C3.77346 0.192596 4.37909 0 5 0C5.62091 0 6.22654 0.192596 6.7334 0.55124C7.24026 0.909884 7.6234 1.41692 7.83 2.00245H15C15.2652 2.00245 15.5196 2.10781 15.7071 2.29534C15.8946 2.48288 16 2.73723 16 3.00245C16 3.26767 15.8946 3.52202 15.7071 3.70956C15.5196 3.89709 15.2652 4.00245 15 4.00245H7.83C7.6234 4.58798 7.24026 5.09502 6.7334 5.45366C6.22654 5.81231 5.62091 6.0049 5 6.0049C4.37909 6.0049 3.77346 5.81231 3.2666 5.45366C2.75974 5.09502 2.3766 4.58798 2.17 4.00245H1C0.734784 4.00245 0.48043 3.89709 0.292893 3.70956C0.105357 3.52202 0 3.26767 0 3.00245C0 2.73723 0.105357 2.48288 0.292893 2.29534C0.48043 2.10781 0.734784 2.00245 1 2.00245H2.17ZM11 8.00245C10.7348 8.00245 10.4804 8.10781 10.2929 8.29534C10.1054 8.48288 10 8.73723 10 9.00245C10 9.26767 10.1054 9.52202 10.2929 9.70956C10.4804 9.89709 10.7348 10.0025 11 10.0025C11.2652 10.0025 11.5196 9.89709 11.7071 9.70956C11.8946 9.52202 12 9.26767 12 9.00245C12 8.73723 11.8946 8.48288 11.7071 8.29534C11.5196 8.10781 11.2652 8.00245 11 8.00245ZM8.17 8.00245C8.3766 7.41692 8.75974 6.90988 9.2666 6.55124C9.77346 6.1926 10.3791 6 11 6C11.6209 6 12.2265 6.1926 12.7334 6.55124C13.2403 6.90988 13.6234 7.41692 13.83 8.00245H15C15.2652 8.00245 15.5196 8.10781 15.7071 8.29534C15.8946 8.48288 16 8.73723 16 9.00245C16 9.26767 15.8946 9.52202 15.7071 9.70956C15.5196 9.89709 15.2652 10.0025 15 10.0025H13.83C13.6234 10.588 13.2403 11.095 12.7334 11.4537C12.2265 11.8123 11.6209 12.0049 11 12.0049C10.3791 12.0049 9.77346 11.8123 9.2666 11.4537C8.75974 11.095 8.3766 10.588 8.17 10.0025H1C0.734784 10.0025 0.48043 9.89709 0.292893 9.70956C0.105357 9.52202 0 9.26767 0 9.00245C0 8.73723 0.105357 8.48288 0.292893 8.29534C0.48043 8.10781 0.734784 8.00245 1 8.00245H8.17ZM5 14.0025C4.73478 14.0025 4.48043 14.1078 4.29289 14.2953C4.10536 14.4829 4 14.7372 4 15.0025C4 15.2677 4.10536 15.522 4.29289 15.7096C4.48043 15.8971 4.73478 16.0025 5 16.0025C5.26522 16.0025 5.51957 15.8971 5.70711 15.7096C5.89464 15.522 6 15.2677 6 15.0025C6 14.7372 5.89464 14.4829 5.70711 14.2953C5.51957 14.1078 5.26522 14.0025 5 14.0025ZM2.17 14.0025C2.3766 13.4169 2.75974 12.9099 3.2666 12.5512C3.77346 12.1926 4.37909 12 5 12C5.62091 12 6.22654 12.1926 6.7334 12.5512C7.24026 12.9099 7.6234 13.4169 7.83 14.0025H15C15.2652 14.0025 15.5196 14.1078 15.7071 14.2953C15.8946 14.4829 16 14.7372 16 15.0025C16 15.2677 15.8946 15.522 15.7071 15.7096C15.5196 15.8971 15.2652 16.0025 15 16.0025H7.83C7.6234 16.588 7.24026 17.095 6.7334 17.4537C6.22654 17.8123 5.62091 18.0049 5 18.0049C4.37909 18.0049 3.77346 17.8123 3.2666 17.4537C2.75974 17.095 2.3766 16.588 2.17 16.0025H1C0.734784 16.0025 0.48043 15.8971 0.292893 15.7096C0.105357 15.522 0 15.2677 0 15.0025C0 14.7372 0.105357 14.4829 0.292893 14.2953C0.48043 14.1078 0.734784 14.0025 1 14.0025H2.17Z" fill="#828FA1" />
                </svg>
            </button>

            <button
                className={`px-4 border border-gray-300 rounded-lg 
                    hover:border-gray-400 min-w-fit flex gap-2 items-center`}
                onClick={() => setOpenSortOptions((prev: boolean) => !prev)}
            >
                Sort By
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 14H0L6 20V0H4V14ZM10 3V20H12V6H16L10 0V3Z" fill="#828FA1" />
                </svg>

            </button>
            {openSortOptions && (
                <div className="absolute top-[45px] right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {sortOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                handleSort(option.value)
                            }}
                            className={`block w-full text-left px-4 py-2 text-gray-700  
                                ${searchProperties.sortBy === option.value ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`
                            }
                        >
                            {option.display}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
