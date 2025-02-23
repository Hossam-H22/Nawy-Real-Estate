import React from 'react'

export default function Loading({minHeight}:{minHeight: number}) {
    return (
        <div className={`w-full min-h-[${minHeight}px] flex justify-center align-middle items-center`}>
            <span className="loader"></span>
        </div>
    )
}
