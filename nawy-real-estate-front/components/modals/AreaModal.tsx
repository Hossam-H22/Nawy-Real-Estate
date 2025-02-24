"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const areaSchema = z.object({
    name: z.string().min(2, "Area name is too short"),
    cityId: z.string(),
});

export default function AreaModal({ setIsAreaModalOpen, cityId }: any) {
    const queryClient = useQueryClient();


    // Mutation to Add New City
    const addAreaMutation: any = useMutation({
        mutationFn: async (newArea) => {
            const { data } = await axios.post("http://localhost:5000/api/v1/area", newArea, {
                headers: {
                    "authorization": `DragonH22__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY3YTczMDdmLTM2OWUtNDY1ZS05MWMwLWQzNGE5ZDMwYzQ4MiIsImlzTG9nZ2VkSW4iOnRydWUsInJvbGUiOiJidXllciIsImlhdCI6MTc0MDI5NjQzMiwiZXhwIjoxNzcxODMyNDMyfQ.FP2H05BAZhGW--kExaLR-uoJFpqxcPoKS0-VoViZ9co`
                },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(("areas" as any)); // Refresh the areas list
            toast.success("Area Add successfully", { duration:1500 });
            setIsAreaModalOpen(false);
        },
    });


    // Form for Adding a New City
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(areaSchema),
        defaultValues: {
            name: "",
            cityId: cityId,
        }
    });

    const onSubmit = async (data: any) => {
        // const formData: any = new FormData();
        // formData.append("name", data.name);
        data.cityId = cityId;
        addAreaMutation.mutate(data);
        // reset();
    };


    // console.log("addAreaMutation: ");
    // console.log(addAreaMutation);



    return <div className="modal-overlay">
        <div className="modal-content">
            <h2 className='p-2'>Add New Area</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter area name"
                    className='w-full border p-2 rounded'
                />
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

                <div className='flex gap-1 mt-1'>
                    <button type="submit" disabled={addAreaMutation.status === 'loading'} className='w-full bg-blue-500 text-white py-2 rounded'>
                        {addAreaMutation.status === 'loading' ? "Adding..." : "Add Area"}
                    </button>
                    <button type="button" onClick={() => setIsAreaModalOpen(false)} className='w-full border py-2 rounded'>
                        Cancel
                    </button>
                </div>

            </form>
            {
                addAreaMutation.status !== 'loading' && addAreaMutation.error && addAreaMutation?.error?.response?.data
                && <div className="bg-red-500 text-white p-3 rounded-lg mt-2">{
                    addAreaMutation?.error?.response?.data?.message ||
                    addAreaMutation?.error?.response?.data?.errors
                }</div>
            }
        </div>
    </div>
}
