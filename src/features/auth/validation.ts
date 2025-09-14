import { parsedEnv } from "@/shared/config";
import z from "zod";
import { GENDER } from "./constants";
import { validate } from "@/shared/utils";

const signUpSchema = z
  .object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    gender: z.enum(GENDER),
    password: z.string().min(8),
    repeatPassword: z.string().min(8),
    username: z.string().min(3),
    email: z.email().refine((e) => {
      return parsedEnv.VITE_ACCEPTED_EMAIL_DOMAINS.includes(e.split("@")[1]);
    }),
    image: z.url().nullable(),
  })
  .refine(
    (schema) => schema.password === schema.repeatPassword,
    `Passwords don't match`
  );

const signInSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
  expiresInMins: z.number(),
});

const userSchema = signUpSchema
  .pick({
    firstName: true,
    lastName: true,
    gender: true,
    username: true,
    email: true,
    image: true,
  })
  .extend({
    id: z.number().int(),
  });

const signInResponseSchema = userSchema.extend({
  accessToken: z.string(),
  refreshToken: z.string(),
});

type SignUpInput = z.infer<typeof signUpSchema>;
type SignInInput = z.infer<typeof signInSchema>;
type User = z.infer<typeof userSchema>;
type SignInResponse = z.infer<typeof signInResponseSchema>;

const validateSignUpInput = (data: unknown) => validate(signUpSchema, data);
const validateSignInInput = (credentials: unknown) =>
  validate(signInSchema, credentials);
const validateUser = (data: unknown) => validate(userSchema, data);
const validateSignInResponse = (data: unknown) =>
  validate(signInResponseSchema, data);

export {
  signUpSchema,
  signInSchema,
  userSchema,
  signInResponseSchema,
  validateSignUpInput,
  validateSignInInput,
  validateUser,
  validateSignInResponse,
};

export type { SignUpInput, SignInInput, User, SignInResponse };
