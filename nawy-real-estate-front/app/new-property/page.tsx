"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import CityModal from "@/components/modals/CityModal";
import AreaModal from "@/components/modals/AreaModal";
import ProjectModal from "@/components/modals/ProjectModal";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'
import { authToken, baseAPI } from "@/components/constant";


// Validation Schema
const apartmentSchema = z.object({
    file: z.custom<FileList>()
        .refine((files) => files.length >= 1 && files.length <= 5, "Upload 1-5 images.")
        .refine((files) =>
            [...files].every((file) =>
                ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)
            ), "Invalid image format (jpg, jpeg, png, gif)."
        ),
    name: z.string().min(3, "Name must be at least 3 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    price: z.coerce.number()
        .positive("Price must be a positive number.")
        .min(1000, "Minimum price 1000 EGP.")
        .max(30000000000, "Maximum price 30000000000 EGP."),
    type: z.enum(["house", "apartment", "land", "commercial"]),
    bedrooms: z.coerce.number().min(1, "At least 1 bedroom required."),
    bathrooms: z.coerce.number().min(1, "At least 1 bathroom required."),
    squareFeet: z.coerce.number().min(5, "At least 50 squareFeet required."),
    city: z.string().nonempty("Select a city."),
    area: z.string().nonempty("Select an area."),
    project: z.string().nonempty("Select a project."),
});

// Fetch Cities
const fetchCities = async () => {
    const { data } = await axios.get(`${baseAPI}/city?fields=name`);
    return data.cities;
};

// Fetch Areas
const fetchAreas = async (cityId: string) => {
    const { data } = await axios.get(`${baseAPI}/area?fields=name&cityId[eq]=${cityId}`);
    return data.areas;
};

// Fetch Projects
const fetchProjects = async (areaId: string) => {
    const { data } = await axios.get(`${baseAPI}/project?fields=name&areaId[eq]=${areaId}`);
    return data.projects;
};

export default function NewProperty() {
    // if (!window || (window && typeof window === 'undefined')) return <Loading minHeight={200} />;


    const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(apartmentSchema),
        defaultValues: {
            file: undefined,
            name: "",
            description: "",
            price: undefined,
            type: "house",
            bedrooms: undefined,
            bathrooms: undefined,
            squareFeet: undefined,
            city: "",
            area: "",
            project: "",
        },
    });

    const selectedCity = watch("city");
    const selectedArea = watch("area");

    // Fetch Cities
    const { data: cities = [], isLoading: loadingCities } = useQuery({
        queryKey: ["cities"],
        queryFn: fetchCities,
    });

    // Fetch Areas when City Changes
    const { data: areas = [], isLoading: loadingAreas } = useQuery({
        queryKey: ["areas", selectedCity],
        queryFn: () => fetchAreas(selectedCity),
        enabled: !!selectedCity,
    });

    // Fetch Projects when Area Changes
    const { data: projects = [], isLoading: loadingProjects } = useQuery({
        queryKey: ["projects", selectedArea],
        queryFn: () => fetchProjects(selectedArea),
        enabled: !!selectedArea,
    });

    // Handle Form Submission
    // const mutation = useMutation({
    const {data, mutate, status, error} = useMutation({
        mutationFn: async (formData) => {
            const response = await axios.post(`${baseAPI}/property`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": authToken
                },
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Propert Add successfully", { duration: 2000 });
            router.push('/search');
        }
    });

    const onSubmit = async (data: any) => {
        const formData: any = new FormData();
        [...data.file].forEach((fileData) => formData.append("file", fileData));
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("type", data.type);
        formData.append("bedrooms", data.bedrooms);
        formData.append("bathrooms", data.bathrooms);
        formData.append("squareFeet", data.squareFeet);
        // formData.append("city", data.city);
        // formData.append("area", data.area);
        formData.append("projectId", data.project);

        // mutation.mutate(formData);
        mutate(formData);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-3xl text-[#1e4164] font-bold mb-4 w-fit mx-auto capitalize">Add Property</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Images */}
                <input type="file" {...register("file")} multiple accept="image/*" />
                {errors.file && <p className="text-red-500">{errors.file.message}</p>}

                {/* Name */}
                <input type="text" placeholder="Name" {...register("name")} className="w-full border p-2 rounded" />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                {/* Description */}
                <textarea placeholder="Description" {...register("description")} className="w-full border p-2 rounded"></textarea>
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                {/* Price */}
                <input type="number" placeholder="Price" {...register("price")} className="w-full border p-2 rounded" />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}

                {/* Type */}
                <select {...register("type")} className="w-full border p-2 rounded">
                    {/* <option value="">Select Type</option> */}
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                </select>

                {/* Bedrooms */}
                <input type="number" placeholder="Bedrooms" {...register("bedrooms")} className="w-full border p-2 rounded" />
                {errors.bedrooms && <p className="text-red-500">{errors.bedrooms.message}</p>}

                {/* Bathrooms */}
                <input type="number" placeholder="Bathrooms" {...register("bathrooms")} className="w-full border p-2 rounded" />
                {errors?.bathrooms && <p className="text-red-500">{errors?.bathrooms?.message}</p>}

                {/* SquareFeet */}
                <input type="number" placeholder="SquareFeet m2" {...register("squareFeet")} className="w-full border p-2 rounded" />
                {errors.squareFeet && <p className="text-red-500">{errors.squareFeet.message}</p>}

                {/* City Dropdown */}
                <div className="flex gap-2">
                    <select {...register("city")} className="w-full border p-2 rounded">
                        <option value="">Select City</option>
                        {!loadingCities && cities?.length > 0 && cities.map((city: any) => (
                            <option key={city._id} value={city._id} className="capitalize">{city.name}</option>
                            // <option key={city._id} value={city} className="capitalize">{city.name}</option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => setIsCityModalOpen(true)}
                        className="min-w-fit px-3 border rounded-lg hover:border-2"
                    >
                        Create New City
                    </button>
                </div>



                {/* Area Dropdown */}
                <div className="flex gap-2">
                    <select {...register("area")} className="w-full border p-2 rounded" disabled={!selectedCity}>
                        <option value="">Select Area</option>
                        {!loadingAreas && areas?.length > 0 && areas.map((area: any) => (
                            <option key={area._id} value={area._id} className="capitalize">{area.name}</option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => setIsAreaModalOpen(true)}
                        className={`min-w-fit px-3 border rounded-lg ${selectedCity && "hover:border-2"}`}
                        disabled={!selectedCity}
                    >
                        Create New Area
                    </button>
                </div>

                {/* Project Dropdown */}
                <div className="flex gap-2">
                    <select {...register("project")} className="w-full border p-2 rounded" disabled={!selectedArea}>
                        <option value="">Select Project</option>
                        {!loadingProjects && projects?.length > 0 && projects.map((project: any) => (
                            <option key={project._id} value={project._id} className="capitalize">{project.name}</option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => setIsProjectModalOpen(true)}
                        className={`min-w-fit px-3 border rounded-lg ${selectedCity && "hover:border-2"}`}
                        disabled={!selectedArea}
                    >
                        Create New Project
                    </button>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                    disabled={status === 'pending'}
                >
                    {status === 'pending' ? "Adding property .." : "Submit"}
                </button>
                {
                    // status !== 'loading'
                    // && data?.message === "Done"
                    // && <div className="bg-green-600 text-white p-3">Property Added successfully</div>
                }
                {
                    status !== 'pending' && error && (error as AxiosError)?.response?.data
                    && <div className="bg-red-900 text-white p-3">{
                        ((error as AxiosError)?.response?.data as {message: string}).message
                    }</div>
                }
            </form>
            {/* City Modal */}
            {isCityModalOpen && <CityModal
                setIsCityModalOpen={setIsCityModalOpen}
            />}
            {isAreaModalOpen && <AreaModal
                setIsAreaModalOpen={setIsAreaModalOpen}
                cityId={selectedCity}
            />}
            {isProjectModalOpen && <ProjectModal
                setIsProjectModalOpen={setIsProjectModalOpen}
                areaId={selectedArea}
            />}
        </div>
    );
};


