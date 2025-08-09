import z from "zod";

const envSchema = z.object({
  API_BASE_URL: z.url().optional(),
  ENV: z.enum(["development", "production"]).default("development"),
});

export const env = {
  API_BASE_URL: "http://192.168.1.13:3000/api",
  ENV: "development",
};
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
