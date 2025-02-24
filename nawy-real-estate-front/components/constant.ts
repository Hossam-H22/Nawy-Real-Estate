

export const baseAPI = "http://localhost:5000/api/v1";

export const authToken = "DragonH22__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY3YTczMDdmLTM2OWUtNDY1ZS05MWMwLWQzNGE5ZDMwYzQ4MiIsImlzTG9nZ2VkSW4iOnRydWUsInJvbGUiOiJidXllciIsImlhdCI6MTc0MDI5NjQzMiwiZXhwIjoxNzcxODMyNDMyfQ.FP2H05BAZhGW--kExaLR-uoJFpqxcPoKS0-VoViZ9co";



export type quaryType = {
    projectIds: string[],
    propertyTypes: string[],
    propertyStatus: string[],
    numBedRooms: number,
    numBathRooms: number,
    priceRange: number[],
    squareFeetRange: number[],
    sortBy: string,
    search: string,
}
