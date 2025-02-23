"use client"
import ErrorDesign from '@/components/ErrorDesign';
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
}

export default function PropertyPage() {
    const { id: propertyId } = useParams();

    const fetchData = async () => {
        const selcetedFields = "fields=name,description,price,type,status,bedrooms,bathrooms,squareFeet,images"
        const res = await fetch(`http://localhost:5000/api/v1/property/${propertyId}?${selcetedFields}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
    };

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["data", propertyId],
        queryFn: fetchData
    });

    if(isLoading)
        return <Loading minHeight={200} />

    if(error)
        return <ErrorDesign errorMessage={error.message} />

    return (
        <div>
            <p>{propertyId}</p>
            <p>{data.property.name}</p>
        </div>
    )
}
