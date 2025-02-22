import { generalFields } from "../../middleware/validation.middleware";
import { z } from "zod";

export const get = z.object({
    projectId: generalFields.id,
});

export const create = z.object({
    name: z.string().min(2).max(30),
    description: z.string().min(5).max(200),
    areaId: generalFields.id,
}).strict();

export const update = z.object({
    projectId: generalFields.id,
    areaId: generalFields.id.optional(),
    name: z.string().min(2).max(20).optional(),
    description: z.string().min(5).max(200).optional(),
}).strict();