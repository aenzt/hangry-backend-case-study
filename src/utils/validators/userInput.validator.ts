import { z } from "zod";

const userInputValidator = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  dateOfBirth: z.coerce.date(),
});

export default userInputValidator;
