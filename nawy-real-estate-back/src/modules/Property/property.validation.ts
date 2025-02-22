import { generalFields } from "../../middleware/validation.middleware";
import { z } from "zod";
import { PropertyStatus, PropertyType } from "./property.entity";

export const get = z.object({
    propertyId: generalFields.id,
});

export const create = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(5).max(500),
    price: z.number().positive(),
    type: z.enum([PropertyType.APARTMENT, PropertyType.COMMERCIAL, PropertyType.HOUSE, PropertyType.LAND]),
    status: z.enum([PropertyStatus.AVAILABLE, PropertyStatus.RENTED, PropertyStatus.SOLD]).optional(),
    bedrooms: z.number().positive().min(1),
    bathrooms: z.number().positive().min(1),
    squareFeet: z.number().positive(),
    projectId: generalFields.id,
}).strict();

export const update = z.object({
    propertyId: generalFields.id,
    name: z.string().min(2).max(100).optional(),
    description: z.string().min(5).max(500).optional(),
    price: z.number().positive().optional(),
    type: z.enum([PropertyType.APARTMENT, PropertyType.COMMERCIAL, PropertyType.HOUSE, PropertyType.LAND]).optional(),
    status: z.enum([PropertyStatus.AVAILABLE, PropertyStatus.RENTED, PropertyStatus.SOLD]).optional(),
    bedrooms: z.number().positive().min(1).optional(),
    bathrooms: z.number().positive().min(1).optional(),
    squareFeet: z.number().positive().optional(),
    projectId: generalFields.id.optional(),
}).strict();