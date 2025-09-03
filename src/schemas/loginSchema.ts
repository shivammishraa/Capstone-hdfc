// import { z } from "zod";

// export const loginSchema = z.object({
//   name: z.string()({ message: "Invalid email format" }),

//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters" })
//     .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
//     .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
// });

// export type LoginSchemaType = z.infer<typeof loginSchema>;


import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[!@#%^&*()_+\-=\[\]{};':"\\,.<>\/?]/, {
      message: "Password must contain at least one special character (not $, |)"
    })
    .regex(/^[^$|]*$/, {
      message: "Password cannot contain $ or | characters"
    })
    .regex(/\d/, {
      message: "Password must contain at least one number"
    })

})

export type LoginSchemaType = z.infer<typeof loginSchema>;