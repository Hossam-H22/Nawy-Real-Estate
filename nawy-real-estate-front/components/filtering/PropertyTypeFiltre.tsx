import { quaryType } from "../constant";

export default function PropertyTypeFiltre({
    quary, 
    setQuary
}: {
    quary:quaryType,
    setQuary:React.Dispatch<React.SetStateAction<quaryType>>,
}) {
    const typeList: string[] = ["house", "apartment", "land", "commercial"];

    function handleClick(type: string) {
        if (quary.propertyTypes.includes(type)) {
            const newSelectedTypesList = quary.propertyTypes.filter((element: string) => element != type);
            const newQuary = { ...quary };
            newQuary.propertyTypes = newSelectedTypesList;
            setQuary(newQuary);
        }
        else {
            const newQuary = { ...quary };
            newQuary.propertyTypes = [...quary.propertyTypes, type];
            setQuary(newQuary);
        }
    }


    return (
        <div>
            <div className='flex justify-between mb-2'>
                <p className='font-semibold'>Property Type</p>
                <button
                    onClick={() => {
                        const newQuary = { ...quary };
                        newQuary.propertyTypes = [];
                        setQuary(newQuary);
                    }}
                    className="text-blue-600 text-sm underline"
                >
                    Reset
                </button>
            </div>
            {typeList.map((type, index) => <label key={index} className="flex items-center gap-2 mb-2 text-start w-fit cursor-pointer capitalize">
                <input
                    type="checkbox"
                    checked={quary.propertyTypes.includes(type)}
                    onChange={() => handleClick(type)}
                    className="cursor-pointer w-4 h-4 accent-blue-500"
                />
                {type}
            </label>)}
            <div className='bg-[#0000001e] w-full h-[1px] my-4' />
        </div>
    )
}
