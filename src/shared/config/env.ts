import z from "zod";

const envSchema = z.object({
  VITE_BACKEND_URL: z.url(),
  VITE_ACCEPTED_EMAIL_DOMAINS: z.preprocess(
    (str: string) => str.split(",").map((d) => d.trim()),
    z.array(z.string())
  ),
});

export const parsedEnv = envSchema.parse(import.meta.env);
