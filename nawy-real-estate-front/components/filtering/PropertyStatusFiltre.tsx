import { quaryType } from "../constant";

export default function PropertyStatusFiltre({
    quary, 
    setQuary
}: {
    quary:quaryType,
    setQuary:React.Dispatch<React.SetStateAction<quaryType>>,
}) {
    const statusList:string[] = ["available", "sold", "rented"];

    function handleClick(status: string) {
        if (quary.propertyStatus.includes(status)) {
            const newSelectedTypesList = quary.propertyStatus.filter((element: string) => element != status);
            // const newQuary = { ...quary };
            // newQuary.propertyStatus = newSelectedTypesList;
            setQuary(prev => ({ ...prev, propertyStatus: newSelectedTypesList }));
        }
        else {
            // const newQuary = { ...quary };
            // newQuary.propertyStatus = [...quary.propertyStatus, status];
            // setQuary(newQuary);
            setQuary(prev => ({ ...prev, propertyStatus: [...prev.propertyStatus, status] }));
        }
    }


    return (
        <div>
            <div className='flex justify-between mb-2'>
                <p className='font-semibold'>Property Status</p>
                <p className='cursor-pointer font-light text-sm underline text-blue-700' onClick={() => {
                    const newQuary = { ...quary };
                    newQuary.propertyStatus = [];
                    setQuary(newQuary);
                }}>Reset</p>
            </div>
            {statusList.map((status, index) => <label key={index} className="flex items-center gap-2 mb-2 text-start w-fit cursor-pointer capitalize">
                    <input
                        type="checkbox"
                        checked={quary.propertyStatus.includes(status)}
                        onChange={() => handleClick(status)}
                        className="cursor-pointer w-4 h-4 accent-blue-500"
                    />
                    {status}
                </label>)}
        </div>
    )
}
