import z from "zod";

const envSchema = z.object({
  API_BASE_URL: z.url().optional(),
  ENV: z.enum(["development", "production"]).default("development"),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
