import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function PropertyPriceFiltre({quary, setQuary}: any) {
    const minPrice = 1;
    const maxPrice = 100000000;

    const handleSliderChange = (values: number | number[]) => {
        if (Array.isArray(values)) {
            const [min, max] = values as [number, number];

            // Ensure the left handle does not move past the right handle
            if (min <= max) {
                setPriceRange([min, max]);
            }
        }
    };

    const handleInputChange = (index: number, value: string) => {
        const newValue = value.replace(/,/g, ""); // Remove commas
        if (isNaN(Number(newValue))) return;

        const updatedRange = [...quary.priceRange] as [number, number];
        updatedRange[index] = Number(newValue);

        // Ensure left handle is always smaller than right handle
        if (updatedRange[0] <= updatedRange[1]) {
            setPriceRange(updatedRange);
        }
    };

    const setPriceRange = (updatedRange: number[])=>{
        const newQuery = {...quary};
        newQuery.priceRange = updatedRange
        setQuary(newQuery);
    }

    const formatNumber = (num: number) => num.toLocaleString();

    return (
        <div className="">
            <div className="flex justify-between items-center mb-2">
                <label className="font-semibold">Price <span className="font-light text-sm"> - EGP</span></label>
                <button
                    onClick={() => setPriceRange([minPrice, maxPrice])}
                    className="text-blue-600 text-sm underline"
                >
                    Reset
                </button>
            </div>

            <div className='px-2'>
                <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    step={5000}
                    value={quary.priceRange}
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
                    value={formatNumber(quary.priceRange[0])}
                    onChange={(e) => handleInputChange(0, e.target.value)}
                    className="border rounded py-2 w-full text-center"
                />
                <input
                    type="text"
                    value={formatNumber(quary.priceRange[1])}
                    onChange={(e) => handleInputChange(1, e.target.value)}
                    className="border rounded py-2 w-full text-center"
                />
            </div>
            
            <div className='bg-[#0000001e] w-full h-[1px] my-4' />
        </div>
    );
}
