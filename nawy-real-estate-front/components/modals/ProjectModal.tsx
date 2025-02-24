'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { authToken, baseAPI } from '../constant';

const areaSchema = z.object({
    name: z.string().min(2, "Area name is too short"),
    description: z.string().min(10, "Description must be at least 10 characters."),
    areaId: z.string(),
});

export default function ProjectModal({ 
    setIsProjectModalOpen, 
    areaId 
}: { 
    setIsProjectModalOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    areaId: string
}) {
    const queryClient = useQueryClient();

    // Mutation to Add New City
    const addProjectMutation: any = useMutation({
        mutationFn: async (newProject) => {
            const { data } = await axios.post(`${baseAPI}/project`, newProject, {
                headers: {
                    "authorization": authToken
                },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(("projects" as any)); // Refresh the project list
            toast.success("Project Add successfully", { duration:1500 });
            setIsProjectModalOpen(false);
        },
    });


    // Form for Adding a New City
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(areaSchema),
        defaultValues: {
            name: "",
            areaId: areaId,
        }
    });

    const onSubmit = async (data: any) => {
        // const formData: any = new FormData();
        // formData.append("name", data.name);
        data.areaId = areaId;
        addProjectMutation.mutate(data);
        // reset();
    };


    return <div className="modal-overlay">
        <div className="modal-content">
            <h2 className='p-2'>Add New Project</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter area name"
                    className='w-full border p-2 rounded'
                />
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

                {/* Description */}
                <textarea placeholder="Description" {...register("description")} className="w-full border p-2 rounded"></textarea>
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                <div className='flex gap-1 mt-1'>
                    <button type="submit" disabled={addProjectMutation.status === 'loading'} className='w-full bg-blue-500 text-white py-2 rounded'>
                        {addProjectMutation.status === 'loading' ? "Adding..." : "Add Project"}
                    </button>
                    <button type="button" onClick={() => setIsProjectModalOpen(false)} className='w-full border py-2 rounded'>
                        Cancel
                    </button>
                </div>

            </form>
            {
                addProjectMutation.status !== 'loading' && addProjectMutation.error && addProjectMutation?.error?.response?.data
                && <div className="bg-red-500 text-white p-3 rounded-lg mt-2">{
                    addProjectMutation?.error?.response?.data?.message ||
                    addProjectMutation?.error?.response?.data?.errors
                }</div>
            }
        </div>
    </div>
}
