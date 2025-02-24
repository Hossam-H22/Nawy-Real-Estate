"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const citySchema = z.object({
    name: z.string().min(2, "City name is too short"),
});

export default function CityModal({ setIsCityModalOpen }: any) {
    const queryClient = useQueryClient();


    // Mutation to Add New City
    const addCityMutation: any = useMutation({
        mutationFn: async (newCity) => {
            const { data } = await axios.post("http://localhost:5000/api/v1/city", newCity, {
                headers: {
                    "authorization": `DragonH22__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY3YTczMDdmLTM2OWUtNDY1ZS05MWMwLWQzNGE5ZDMwYzQ4MiIsImlzTG9nZ2VkSW4iOnRydWUsInJvbGUiOiJidXllciIsImlhdCI6MTc0MDI5NjQzMiwiZXhwIjoxNzcxODMyNDMyfQ.FP2H05BAZhGW--kExaLR-uoJFpqxcPoKS0-VoViZ9co`
                },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(("cities" as any)); // Refresh the cities list
            toast.success("City Add successfully", { duration:1500 });
            setIsCityModalOpen(false);
        },
    });


    // Form for Adding a New City
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(citySchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = async (data: any) => {
        // const formData: any = new FormData();
        // formData.append("name", data.name);
        addCityMutation.mutate(data);
        // reset();
    };


    // console.log("addCityMutation: ");
    // console.log(addCityMutation);



    return <div className="modal-overlay">
        <div className="modal-content">
            <h2 className='p-2'>Add New City</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter city name"
                    className='w-full border p-2 rounded'
                />
                {errors.name && <p>{errors.name.message}</p>}

                <div className='flex gap-1 mt-1'>
                    <button type="submit" disabled={addCityMutation.status === 'loading'} className='w-full bg-blue-500 text-white py-2 rounded'>
                        {addCityMutation.status === 'loading' ? "Adding..." : "Add City"}
                    </button>
                    <button type="button" onClick={() => setIsCityModalOpen(false)} className='w-full border py-2 rounded'>
                        Cancel
                    </button>
                </div>
            </form>
            {
                addCityMutation.status !== 'loading' && addCityMutation.error && addCityMutation?.error?.response?.data
                && <div className="bg-red-500 text-white p-3 rounded-lg mt-2">{
                    addCityMutation?.error?.response?.data?.message ||
                    addCityMutation?.error?.response?.data?.errors
                }</div>
            }
        </div>
    </div>
}
