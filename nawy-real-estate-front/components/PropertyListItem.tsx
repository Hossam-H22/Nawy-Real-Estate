import Link from 'next/link';
import React from 'react'

export type PropertyItemType = {
    _id: string,
    name: string,
    description: string,
    price: number,
    type: string,
    status: string,
    bedrooms: number,
    bathrooms: number,
    squareFeet: number,
    images: { public_id: string, secure_url: string }[],
}
export default function PropertyListItem({ propertyData }: { propertyData: PropertyItemType }) {

    return <div className='grid grid-cols-12 gap-3 mb-3 p-2 border rounded-xl'>
        <div className='col-span-5 relative'>
            <img
                src={propertyData.images[0].secure_url}
                alt='Nawy Real Estate'
                width={160}
                height={40}
                className="object-cover w-full rounded-lg h-52"
            />
            <div className='flex gap-2 absolute right-[10px] top-[10px]'>
                <p className='bg-white text-gray-700 text-sm rounded-md px-3 py-2 capitalize w-fit'>
                    {propertyData.type}
                </p>
                <p className='bg-white text-gray-700 text-sm rounded-md px-3 py-2 capitalize w-fit'>
                    {propertyData.status}
                </p>
            </div>
        </div>
        <div className='col-span-7 flex flex-col justify-evenly'>
            <Link href={`/property/${propertyData._id}`} className="flex font-bold text-lg mt-2">
                {propertyData.name}
            </Link>
            <p className='font-light'>{propertyData.description}</p>
            <div className='flex gap-5'>
                <div className='flex items-end'>
                    {areaIcon}
                    <p className='font-semibold ml-1'>{propertyData.squareFeet}</p>
                    <span className='font-light text-sm ms-1'>m2</span>
                </div>
                <div className='flex items-end'>
                    {bedIcon}
                    <p className='font-semibold ml-1'>{propertyData.bedrooms}</p>
                    <span className='font-light text-sm ms-1'>Beds</span>
                </div>
                <div className='flex items-end'>
                    {bathIcon}
                    <p className='font-semibold ml-1'>{propertyData.bathrooms}</p>
                    <span className='font-light text-sm ms-1'>Baths</span>
                </div>
            </div>

            <p className='font-bold text-lg mt-2'>{propertyData.price.toLocaleString()} EGP</p>
        </div>
    </div>
}






const areaIcon = <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
<path d="M13.4166 17H18.2083V12H16.2916V15H13.4166V17ZM4.79163 12H6.70829V9H9.58329V7H4.79163V12ZM3.83329 20C3.30621 20 2.85499 19.8042 2.47965 19.4125C2.1043 19.0208 1.91663 18.55 1.91663 18V6C1.91663 5.45 2.1043 4.97917 2.47965 4.5875C2.85499 4.19583 3.30621 4 3.83329 4H19.1666C19.6937 4 20.1449 4.19583 20.5203 4.5875C20.8956 4.97917 21.0833 5.45 21.0833 6V18C21.0833 18.55 20.8956 19.0208 20.5203 19.4125C20.1449 19.8042 19.6937 20 19.1666 20H3.83329ZM3.83329 18H19.1666V6H3.83329V18Z" fill="#828FA1"></path>
</svg>


const bedIcon = <svg width="28" height="19" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 21V11.4545C0 10.8895 0.132741 10.2875 0.398222 9.64855C0.663704 9.00964 1.04948 8.52982 1.55556 8.20909V3.81818C1.55556 2.74145 1.85474 1.83591 2.45311 1.10155C3.05148 0.367182 3.78933 0 4.66667 0H11.6667C12.2028 0 12.6607 0.135545 13.0402 0.406636C13.4187 0.676454 13.7387 1.05 14 1.52727C14.2613 1.05 14.5813 0.676454 14.9598 0.406636C15.3393 0.135545 15.7972 0 16.3333 0H23.3333C24.2107 0 24.9485 0.367182 25.5469 1.10155C26.1453 1.83591 26.4444 2.74145 26.4444 3.81818V8.20909C26.9516 8.52982 27.3373 9.00964 27.6018 9.64855C27.8673 10.2875 28 10.8895 28 11.4545V21H26.4444V17.1818H1.55556V21H0ZM14.7778 7.63636H24.8889V3.81818C24.8889 3.27727 24.7396 2.82418 24.4409 2.45891C24.1422 2.09364 23.773 1.91036 23.3333 1.90909H16.3333C15.8926 1.90909 15.5234 2.09236 15.2258 2.45891C14.9281 2.82545 14.7788 3.27855 14.7778 3.81818V7.63636ZM3.11111 7.63636H13.2222V3.81818C13.2222 3.27727 13.0729 2.82418 12.7742 2.45891C12.4756 2.09364 12.1064 1.91036 11.6667 1.90909H4.66667C4.22593 1.90909 3.85674 2.09236 3.55911 2.45891C3.26148 2.82545 3.11215 3.27855 3.11111 3.81818V7.63636ZM1.55556 15.2727H26.4444V11.4545C26.4444 10.9136 26.2951 10.4605 25.9964 10.0953C25.6978 9.73 25.3286 9.54673 24.8889 9.54545H3.11111C2.67037 9.54545 2.30119 9.72873 2.00356 10.0953C1.70593 10.4618 1.55659 10.9149 1.55556 11.4545V15.2727Z" fill="#828FA1" />
</svg>

const bathIcon = <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.64286 15.8333C3.29881 15.8333 3.01062 15.732 2.77829 15.5293C2.54595 15.3267 2.42938 15.0761 2.42857 14.7778C2.42776 14.4794 2.54433 14.2289 2.77829 14.0262C3.01224 13.8235 3.30043 13.7222 3.64286 13.7222C3.98529 13.7222 4.27388 13.8235 4.50864 14.0262C4.74341 14.2289 4.85957 14.4794 4.85714 14.7778C4.85471 15.0761 4.73814 15.327 4.50743 15.5304C4.27671 15.7337 3.98852 15.8347 3.64286 15.8333ZM8.5 15.8333C8.15595 15.8333 7.86776 15.732 7.63543 15.5293C7.4031 15.3267 7.28652 15.0761 7.28571 14.7778C7.2849 14.4794 7.40148 14.2289 7.63543 14.0262C7.86938 13.8235 8.15757 13.7222 8.5 13.7222C8.84243 13.7222 9.13102 13.8235 9.36579 14.0262C9.60055 14.2289 9.71671 14.4794 9.71429 14.7778C9.71186 15.0761 9.59529 15.327 9.36457 15.5304C9.13386 15.7337 8.84567 15.8347 8.5 15.8333ZM13.3571 15.8333C13.0131 15.8333 12.7249 15.732 12.4926 15.5293C12.2602 15.3267 12.1437 15.0761 12.1429 14.7778C12.142 14.4794 12.2586 14.2289 12.4926 14.0262C12.7265 13.8235 13.0147 13.7222 13.3571 13.7222C13.6996 13.7222 13.9882 13.8235 14.2229 14.0262C14.4577 14.2289 14.5739 14.4794 14.5714 14.7778C14.569 15.0761 14.4524 15.327 14.2217 15.5304C13.991 15.7337 13.7028 15.8347 13.3571 15.8333ZM1.21429 11.6111C0.870238 11.6111 0.582048 11.5098 0.349714 11.3071C0.117381 11.1044 0.000809524 10.8539 0 10.5555V9.49999C0 7.63518 0.688095 6.01666 2.06429 4.64444C3.44048 3.27222 5.18095 2.46296 7.28571 2.21667V1.05556C7.28571 0.756484 7.40229 0.505614 7.63543 0.302948C7.86857 0.100281 8.15676 -0.000700051 8.5 3.65244e-06C8.84324 0.000707355 9.13183 0.102041 9.36579 0.304003C9.59974 0.505966 9.7159 0.756484 9.71429 1.05556V2.21667C11.819 2.46296 13.5595 3.27222 14.9357 4.64444C16.3119 6.01666 17 7.63518 17 9.49999V10.5555C17 10.8546 16.8834 11.1055 16.6503 11.3082C16.4171 11.5108 16.129 11.6118 15.7857 11.6111H1.21429ZM2.42857 9.49999H14.5714C14.5714 8.03981 13.9793 6.79531 12.7949 5.7665C11.6106 4.73768 10.179 4.22293 8.5 4.22222C6.82105 4.22152 5.38941 4.73628 4.20507 5.7665C3.02074 6.79672 2.42857 8.04122 2.42857 9.49999ZM3.64286 19C3.29881 19 3.01062 18.8987 2.77829 18.696C2.54595 18.4933 2.42938 18.2428 2.42857 17.9444C2.42776 17.6461 2.54433 17.3955 2.77829 17.1929C3.01224 16.9902 3.30043 16.8889 3.64286 16.8889C3.98529 16.8889 4.27388 16.9902 4.50864 17.1929C4.74341 17.3955 4.85957 17.6461 4.85714 17.9444C4.85471 18.2428 4.73814 18.4937 4.50743 18.697C4.27671 18.9004 3.98852 19.0014 3.64286 19ZM8.5 19C8.15595 19 7.86776 18.8987 7.63543 18.696C7.4031 18.4933 7.28652 18.2428 7.28571 17.9444C7.2849 17.6461 7.40148 17.3955 7.63543 17.1929C7.86938 16.9902 8.15757 16.8889 8.5 16.8889C8.84243 16.8889 9.13102 16.9902 9.36579 17.1929C9.60055 17.3955 9.71671 17.6461 9.71429 17.9444C9.71186 18.2428 9.59529 18.4937 9.36457 18.697C9.13386 18.9004 8.84567 19.0014 8.5 19ZM13.3571 19C13.0131 19 12.7249 18.8987 12.4926 18.696C12.2602 18.4933 12.1437 18.2428 12.1429 17.9444C12.142 17.6461 12.2586 17.3955 12.4926 17.1929C12.7265 16.9902 13.0147 16.8889 13.3571 16.8889C13.6996 16.8889 13.9882 16.9902 14.2229 17.1929C14.4577 17.3955 14.5739 17.6461 14.5714 17.9444C14.569 18.2428 14.4524 18.4937 14.2217 18.697C13.991 18.9004 13.7028 19.0014 13.3571 19Z" fill="#828FA1" />
</svg>