import z from "zod";
import { makeApi } from "@zodios/core";

export const user = z.object({
  user_id: z.string().nullable(),
  user_name: z.string().nullable(),
  tenant_id: z.string().nullable(),
  email: z.string().nullable(),
});

export type User = z.infer<typeof user>;

export const userApi = makeApi([
  {
    method: "get",
    path: "/users",
    alias: "getUsers",
    response: z.array(user),
  },
  {
    method: "get",
    path: "/users/:id",
    alias: "getUser",
    response: user,
    errors: [
      {
        status: "default",
        schema: z.object({
          error: z.object({
            code: z.number(),
            message: z.string(),
          }),
        }),
      },
    ],
  },
  {
    method: "post",
    path: "/users",
    alias: "createUser",
    parameters: [
      {
        name: "user",
        type: "Body",
        schema: user.omit({ id: true }),
      },
    ],
    response: user,
  },
]);
