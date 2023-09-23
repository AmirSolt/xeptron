import { z } from 'zod'






export const generateSchema = z.object({
	userPrompt: z.string().min(1),
})
export type GenerateSchemaType = z.infer<typeof generateSchema>



export const donationSchema = z.object({
	email: z.string().email().min(1),
	amount: z.number().or(z.string().regex(/\d+/).transform(Number))
	.refine((n) => n >= 1),
})