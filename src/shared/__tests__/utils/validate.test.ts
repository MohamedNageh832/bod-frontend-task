import { describe, it, expect } from "vitest";
import { validate } from "@/shared/utils";
import z from "zod";

const schema = z.object({
  name: z
    .string()
    .min(2)
    .transform((n) => `parsed ${n}`),
  age: z.number().int().min(12),
});

describe("validate", () => {
  it("should return parsed values and no errors if valid", () => {
    const values = { name: "nabil", age: 43 };
    const { isValid, cleanBody, errors } = validate(schema, values);

    expect(isValid).toEqual(true);
    expect(cleanBody).toMatchObject({
      name: "parsed nabil",
      age: 43,
    });
    expect(errors).toEqual(undefined);
  });

  it("should return errors including first level property names with a string error if not valid", () => {
    const values = { name: 12, age: "43" };
    const { isValid, errors } = validate(schema, values);

    expect(isValid).toEqual(false);
    expect(errors).toMatchObject({
      name: expect.any(String),
      age: expect.any(String),
    });
  });

  it("should handle partial errors when only some properties are not valid", () => {
    const values = { name: "nabil", age: "43" };
    const { errors } = validate(schema, values);

    expect(errors).not.toHaveProperty("name");
    expect(errors).toHaveProperty("age");
  });
});
