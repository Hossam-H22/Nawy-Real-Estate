"use client"
import { useQuery } from '@tanstack/react-query';
import React, { Fragment, useState } from 'react'
import PropertyListItem, { PropertyItemType } from './PropertyListItem';
import ErrorDesign from './ErrorDesign';
import Loading from './Loading';


export default function PropertiesList({quary}: {quary:string}) {

    const createQuery = (queryObject: any)=>{
        let query="";

        if(queryObject.propertyTypes.length>1) query += `&type[in]=${queryObject.propertyTypes.join(",")}`;
        else if(queryObject.propertyTypes.length==1) query += `&type[eq]=${queryObject.propertyTypes[0]}`;
        
        if(queryObject.propertyStatus.length>1) query += `&status[in]=${queryObject.propertyStatus.join(",")}`;
        else if(queryObject.propertyStatus.length==1) query += `&status[eq]=${queryObject.propertyStatus[0]}`;
        
        if(queryObject.projectIds.length>1) query += `&projectId[in]=${queryObject.projectIds.join(",")}`;
        else if(queryObject.projectIds.length==1) query += `&projectId[eq]=${queryObject.projectIds[0]}`;

        if(queryObject.numBedRooms!=0 && queryObject.numBedRooms<5) query += `&bedrooms[eq]=${queryObject.numBedRooms}`;
        else if(queryObject.numBedRooms==5) query += `&bedrooms[gte]=${queryObject.numBedRooms}`;
        
        if(queryObject.numBathRooms!=0 && queryObject.numBathRooms<5) query += `&bathrooms[eq]=${queryObject.numBathRooms}`;
        else if(queryObject.numBathRooms==5) query += `&bathrooms[gte]=${queryObject.numBathRooms}`;

        
        query += `&price[range]=${queryObject.priceRange[0]},${queryObject.priceRange[1]}`;
        query += `&squareFeet[range]=${queryObject.squareFeetRange[0]},${queryObject.squareFeetRange[1]}`;

        if(queryObject.search.length>0) query +=`&search=${String(queryObject.search)}`

        if(queryObject.sortBy.length>0) query +=`&sort=${String(queryObject.sortBy)}`

        return query;
    }

    const fetchData = async ({ queryKey }: { queryKey: [string, string] }) => {
        const [, queryObject] = queryKey;
        // console.log(queryObject);
        const queryString = createQuery(queryObject);
        // console.log(queryString);
        
        const selcetedFields = "fields=name,description,price,type,status,bedrooms,bathrooms,squareFeet,images"
        const res = await fetch(`http://localhost:5000/api/v1/property?${selcetedFields}${queryString}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        // const result: any = await res.json();
        return res.json();
    };

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["data", quary],
        queryFn: fetchData
    });

    if(isLoading)
        return <Loading minHeight={100}/>;

    if(error)
        return <ErrorDesign errorMessage={error.message} />;
    
    // console.log(data);
    

    return (
        <div>
            {/* <div className='w-full flex justify-end text-sm text-gray-700 font-light'>{data.properties?.length || 0} properties</div> */}
            {data.properties?.map((item:PropertyItemType) => <PropertyListItem key={item._id} propertyData={item} /> )}
        </div>
    );
}
