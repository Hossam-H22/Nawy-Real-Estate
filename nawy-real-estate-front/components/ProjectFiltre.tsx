'use client'
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import Loading from './Loading';
import ErrorDesign from './ErrorDesign';

type projectType = {
    _id: string,
    name: string,
}

export default function ProjectFiltre({quary, setQuary}: any) {

    const fetchData = async () => {
        const selcetedFields = "fields=name"
        const res = await fetch(`http://localhost:5000/api/v1/project?${selcetedFields}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
    };

    // const [projectList, setProjectList] = useState<projectType[]>([
    //     {
    //         _id: "11",
    //         name: "City 1",
    //     },
    //     {
    //         _id: "22",
    //         name: "City 2",
    //     },
    //     {
    //         _id: "33",
    //         name: "City 3",
    //     },
    // ]);

    function handleClick(id: string) {
        if (quary.projectIds.includes(id)) {
            const newSelectedIdList = quary.projectIds.filter((element: string) => element != id);
            const newQuary = { ...quary };
            newQuary.projectIds = newSelectedIdList;
            setQuary(newQuary);
        }
        else {
            const newQuary = { ...quary };
            newQuary.projectIds = [...quary.projectIds, id];
            setQuary(newQuary);
        }
    }

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["data"],
        queryFn: fetchData
    });

    // if(error)
    //     return <ErrorDesign errorMessage={error.message} />;

    return <>
        { (isLoading || error || data.projects.length) && <div>
            <div className='flex justify-between mb-2'>
                <p className='font-semibold'>Projects</p>
                <button
                    onClick={() => {
                        const newQuary = { ...quary };
                        newQuary.projectIds = [];
                        setQuary(newQuary);
                    }}
                    className="text-blue-600 text-sm underline"
                >
                    Reset
                </button>
            </div>
            { isLoading ? <Loading minHeight={0} /> : <div className='max-h-72 overflow-auto'>
                {data.projects.map((element:projectType, index:number) => <label key={element._id} className="flex items-center gap-2 mb-2 text-start w-fit cursor-pointer">
                    <input
                        type="checkbox"
                        checked={quary.projectIds.includes(element._id)}
                        onChange={() => handleClick(element._id)}
                        className="cursor-pointer w-4 h-4 accent-blue-500"
                    />
                    {element.name}
                </label>)}
            </div>}
            <div className='bg-[#0000001e] w-full h-[1px] my-4' />
        </div>}
    </>
}
