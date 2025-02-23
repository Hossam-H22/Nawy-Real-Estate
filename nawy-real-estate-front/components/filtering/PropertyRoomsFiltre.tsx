
export default function PropertyRoomsFiltre({quary, setQuary}: any) {

    const updateRoomNumbers = (type:string, num:number)=>{
        let newNumber = 0;
        if(quary[type] != num) newNumber = num;

        const newQuary = { ...quary };
        newQuary[type] = newNumber;
        setQuary(newQuary);
    }

    return <div>
        <div>
            <div className='flex justify-between mb-2'>
                <p className='font-semibold'>Bedrooms</p>
            </div>
            <ul className='flex gap-2'>
                {Array.from({ length: 5 }).map((item, index) => <li
                    key={index}
                    className={`w-10 h-10 border rounded-full flex justify-center items-center cursor-pointer hover:shadow-md ${quary.numBedRooms == index + 1 ? 'bg-[#015C9A] text-white' : ''}`}
                    onClick={() => {
                        updateRoomNumbers("numBedRooms", index + 1);
                    }}
                >
                    {index < 4 ? index + 1 : `+${index + 1}`}
                </li>)}
            </ul>
        </div>
        <div className='mt-4'>
            <div className='flex justify-between mb-2'>
                <p className='font-semibold'>Bathrooms</p>
                {/* <p className='cursor-pointer' onClick={()=>setnumBathRooms(0)}>Reset</p> */}
            </div>
            <ul className='flex gap-2'>
                {Array.from({ length: 5 }).map((item, index) => <li
                    key={index}
                    className={`w-10 h-10 border rounded-full flex justify-center items-center cursor-pointer hover:shadow-md ${quary.numBathRooms == index + 1 ? 'bg-[#015C9A] text-white' : ''}`}
                    onClick={() => {
                        updateRoomNumbers("numBathRooms", index + 1);
                    }}
                >
                    {index < 4 ? index + 1 : `+${index + 1}`}
                </li>)}
            </ul>
        </div>
        <div className='bg-[#0000001e] w-full h-[1px] my-4' />
    </div>;
}
