"use client"
import React, { useState } from 'react'

type ImageType = {
    public_id: string,
    secure_url: string,
}

export default function ImageSlider({images}:{images: ImageType[]}) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full mx-auto overflow-hidden rounded-lg">
            {/* Images */}
            <div className="flex transition-transform duration-500 ease-in-out max-h-[25rem]  md:max-h-[30rem] lg:max-h-[40rem]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <img 
                        key={index} 
                        src={image.secure_url} 
                        alt={`Slide ${index}`} 
                        className="object-cover w-full" />
                ))}
            </div>

            {/* Previous Button */}
            <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 h-14"
            >
                ❮
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 h-14"
            >
                ❯
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-slate-300" : "bg-gray-500"}`}
                    ></button>
                ))}
            </div>
        </div>
    );
}
