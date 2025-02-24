"use client"
import ErrorDesign from '@/components/ErrorDesign';
import ImageSlider from '@/components/ImageSlider';
import Loading from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react'

type PropertyItemType = {
    _id: string,
    name: string,
    description: string,
    price: number,
    type: string,
    status: string,
    bedrooms: number,
    bathrooms: number,
    squareFeet: number,
    images: { public_id: string, secure_url: string }[],
    projectId: {
        _id: string,
        name: string,
        description: string
    },
}

export default function PropertyPage() {
    const { id: propertyId } = useParams();
    let property: PropertyItemType;

    const fetchData = async () => {
        const selcetedFields = "fields=name,description,price,type,status,bedrooms,bathrooms,squareFeet,images,projectId"
        const res = await fetch(`http://localhost:5000/api/v1/property/${propertyId}?${selcetedFields}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
    };

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["data", propertyId],
        queryFn: fetchData
    });

    if (isLoading)
        return <Loading minHeight={200} />
    else if (error)
        return <ErrorDesign errorMessage={error.message} />
    else {
        property = data.property;
    }

    return (
        <div className='flex flex-col gap-7 mb-16 relative'>
            <ImageSlider images={property.images} />
            {/* <p>{propertyId}</p> */}
            <div className='flex flex-col gap-4 sticky top-0 bg-white py-3'>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='font-bold text-3xl text-[#1e4164]'>{property.name}</h1>
                        <p className='text-gray-700 text-2xl mt-2'>{property.projectId.name}</p>
                    </div>
                    <div className='hidden md:flex md:gap-3'>
                        <p className='capitalize bg-slate-200 font-medium max-w-fit py-2 px-4 rounded-lg max-h-fit'>{property.type}</p>
                        <p className='capitalize bg-slate-200 font-medium max-w-fit py-2 px-4 rounded-lg max-h-fit'>{property.status}</p>
                    </div>
                </div>
                <div>
                    <p className='font-thin text-sm text-gray-500'>Price</p>
                    <p className='font-bold text-3xl'>{property.price.toLocaleString()} EGP</p>
                </div>

                <div className='absolute bottom-0 right-0 p-3'>
                    <a
                        href={`https://wa.me/+201000000000`}
                        className='text-white bg-green-500 py-2 px-3 rounded-lg text-lg flex items-center gap-2'
                        target='_blank'
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 2.91005C16.0831 1.98416 14.991 1.25002 13.7875 0.750416C12.584 0.250812 11.2931 -0.00426317 9.99 5.38951e-05C4.53 5.38951e-05 0.0800002 4.45005 0.0800002 9.91005C0.0800002 11.6601 0.54 13.3601 1.4 14.8601L0 20.0001L5.25 18.6201C6.7 19.4101 8.33 19.8301 9.99 19.8301C15.45 19.8301 19.9 15.3801 19.9 9.92005C19.9 7.27005 18.87 4.78005 17 2.91005ZM9.99 18.1501C8.51 18.1501 7.06 17.7501 5.79 17.0001L5.49 16.8201L2.37 17.6401L3.2 14.6001L3 14.2901C2.17755 12.9771 1.74092 11.4593 1.74 9.91005C1.74 5.37005 5.44 1.67005 9.98 1.67005C12.18 1.67005 14.25 2.53005 15.8 4.09005C16.5676 4.85392 17.1759 5.7626 17.5896 6.76338C18.0033 7.76417 18.2142 8.83714 18.21 9.92005C18.23 14.4601 14.53 18.1501 9.99 18.1501ZM14.51 11.9901C14.26 11.8701 13.04 11.2701 12.82 11.1801C12.59 11.1001 12.43 11.0601 12.26 11.3001C12.09 11.5501 11.62 12.1101 11.48 12.2701C11.34 12.4401 11.19 12.4601 10.94 12.3301C10.69 12.2101 9.89 11.9401 8.95 11.1001C8.21 10.4401 7.72 9.63005 7.57 9.38005C7.43 9.13005 7.55 9.00005 7.68 8.87005C7.79 8.76005 7.93 8.58005 8.05 8.44005C8.17 8.30005 8.22 8.19005 8.3 8.03005C8.38 7.86005 8.34 7.72005 8.28 7.60005C8.22 7.48005 7.72 6.26005 7.52 5.76005C7.32 5.28005 7.11 5.34005 6.96 5.33005H6.48C6.31 5.33005 6.05 5.39005 5.82 5.64005C5.6 5.89005 4.96 6.49005 4.96 7.71005C4.96 8.93005 5.85 10.1101 5.97 10.2701C6.09 10.4401 7.72 12.9401 10.2 14.0101C10.79 14.2701 11.25 14.4201 11.61 14.5301C12.2 14.7201 12.74 14.6901 13.17 14.6301C13.65 14.5601 14.64 14.0301 14.84 13.4501C15.05 12.8701 15.05 12.3801 14.98 12.2701C14.91 12.1601 14.76 12.1101 14.51 11.9901Z" fill="white" />
                        </svg>
                        Whatsapp
                    </a>
                </div>
            </div>



            <div className="overflow-hidden max-w-2xl">
                <h2 className='font-bold text-2xl px-2 py-3 text-[#1e4164]'>Property Numbers</h2>

                <table className="w-full border-collapse">
                    <tbody>
                        <tr className="border-t-2 border-[#000]">
                            <td className="p-3 font-semibold">Reference No.</td>
                            <td className="p-3">{property._id}</td>
                        </tr>
                        <tr className="border-t bg-gray-100">
                            <td className="p-3 font-semibold">Bedrooms</td>
                            <td className="p-3">{property.bedrooms}</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-3 font-semibold">Bathrooms</td>
                            <td className="p-3">{property.bathrooms}</td>
                        </tr>
                        <tr className="border-t bg-gray-100">
                            <td className="p-3 font-semibold">Square Feet</td>
                            <td className="p-3">{property.squareFeet} <span className='text-sm font-light'>m2</span></td>
                        </tr>
                        <tr className="border-t ">
                            <td className="p-3 font-semibold">Status</td>
                            <td className="p-3 capitalize">{property.status}</td>
                        </tr>
                        <tr className="border-t border-b bg-gray-100">
                            <td className="p-3 font-semibold">Type</td>
                            <td className="p-3 capitalize">{property.type}</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div className='pr-3'>
                <h2 className='font-bold text-2xl py-3 text-[#1e4164]'>About Property</h2>
                <p>{property.description}</p>
            </div>


        </div>
    )
}
