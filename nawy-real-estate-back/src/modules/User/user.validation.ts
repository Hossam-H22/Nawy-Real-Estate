import { generalFields } from "../../middleware/validation.middleware";
import { z } from "zod";


export const getUser = z.object({
    id: generalFields.id,
});
