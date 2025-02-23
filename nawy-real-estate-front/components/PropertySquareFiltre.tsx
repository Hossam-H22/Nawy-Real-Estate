import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function PropertySquareFiltre({quary, setQuary}: any) {
    const minSquareFeet = 50;
    const maxSquareFeet = 1000;

    const handleSliderChange = (values: number | number[]) => {
        if (Array.isArray(values)) {
            const [min, max] = values as [number, number];

            // Ensure the left handle does not move past the right handle
            if (min <= max) {
                setSquareFeetRange([min, max]);
            }
        }
    };

    const handleInputChange = (index: number, value: string) => {
        const newValue = value.replace(/,/g, ""); // Remove commas
        if (isNaN(Number(newValue))) return;

        const updatedRange = [...quary.squareFeetRange] as [number, number];
        updatedRange[index] = Number(newValue);

        // Ensure left handle is always smaller than right handle
        if (updatedRange[0] <= updatedRange[1]) {
            setSquareFeetRange(updatedRange);
        }
    };

    const setSquareFeetRange = (updatedRange: number[])=>{
        const newQuery = {...quary};
        newQuery.squareFeetRange = updatedRange
        setQuary(newQuery);
    }

    const formatNumber = (num: number) => num.toLocaleString();

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="font-semibold">SquareFeet <span className="font-light text-sm"> - m2</span></label>
                <button
                    onClick={() => setSquareFeetRange([minSquareFeet, maxSquareFeet])}
                    className="text-blue-600 text-sm underline"
                >
                    Reset
                </button>
            </div>

            <div className='px-2'>
                <Slider
                    range
                    min={minSquareFeet}
                    max={maxSquareFeet}
                    step={10}
                    value={quary.squareFeetRange}
                    onChange={handleSliderChange}
                    trackStyle={[{ backgroundColor: "#0056b3" }]}
                    handleStyle={[
                        { backgroundColor: "#0056b3", borderColor: "#0056b3" },
                        { backgroundColor: "#0056b3", borderColor: "#0056b3" },
                    ]}
                />
            </div>

            <div className="flex justify-between mt-4 gap-2">
                <input
                    type="text"
                    value={formatNumber(quary.squareFeetRange[0])}
                    onChange={(e) => handleInputChange(0, e.target.value)}
                    className="border rounded py-2 w-full text-center"
                />
                <input
                    type="text"
                    value={formatNumber(quary.squareFeetRange[1])}
                    onChange={(e) => handleInputChange(1, e.target.value)}
                    className="border rounded py-2 w-full text-center"
                />
            </div>

            <div className='bg-[#0000001e] w-full h-[1px] my-4' />
        </div>
    );
}
