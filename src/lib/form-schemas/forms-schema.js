import { z } from 'zod'

export const RecordedSessionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reach the max character length" }),
  video_title: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reach the max character length" }),
  overview: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reach the max character length" }),
  video_from_url: z.union([z.literal(""), z.string().trim().url()]),
});

export const onDemandSessionSchema = z.object({
  title: z.string().optional(),
  video_title: z.string().optional(),
  overview: z.string().optional(),
  description: z.string().optional(),
  video_id: z.string().optional(),
  video_from_url: z.union([z.literal(""), z.string().trim().url()]),
});
export const editOnDemandVideoSchema = z.object({

  video_title: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reach the max character length" }),

  video_from_url: z.union([z.literal(""), z.string().trim().url()]),
});

export const editOnDemandSectionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reach the max character length" }),

  overview: z
    .string()
    .min(1, { message: "This field is required" })
    .max(450, { message: "you've reach the max character length" }),
});

export const liveSessionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 character long" })
    .max(70, { message: "Title character must not exceed 70 " }),
  subtitle: z
    .string()
    .min(5, { message: "Title must be at least 5 character long" })
    .max(450, { message: "Title character must not exceed 500 " }),
  overview: z
    .string()
    .min(5, { message: "Title must be at least 5 character long" })
    .max(450, { message: "Title character must not exceed 450 " }),
  courseContent: z
    .string()
    .min(5, { message: "Title must be at least 5 character long" }),

  time: z.string({ message: "This field is required" }),
  meetingDate: z.string({ message: "This field is required" }),
});

export const editLiveSessionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 character long" })
    .max(70, { message: "Title character must not exceed 70 " }),
  time: z.string({ message: "This field is required" }),
  start_date: z.string({ message: "This field is required" })
});

export const courseTypeSchema = z.object({
  coursePrice: z.coerce.string().min(1, { message: "This field is required" }),
  discountPrice: z.coerce.string().min(1, { message: "this field is required" }),
  duration: z
    .string({ message: "This field is required" })
    .min(1, { message: "this field is required" }),
  time: z.string({ message: "This field is required" }),
  timezone: z.string({ message: "This field is required" }),
  startDate: z.string({ message: "This field is required" }),
  discountType: z.string({ message: "This field is required" }),
  discountValue: z.union([z.string(), z.number()]).optional(),
});

export const courseInformationSchema = z.object({
  courseTitle: z
    .string()
    .min(5, { message: "Title must be at least 5 character long" })
    .max(60, { message: "Title character must not exceed 60 " }),
  courseIncludes: z
    .string()
    .min(5, { message: "This field must be at least 5 character long" })
    .max(100, { message: "course include character must not exceed 100 " }),
  technologies: z
    .string()
    .min(5, { message: "This field must be at least 5 character long" })
    .max(405, { message: "Technologies character must not exceed 405 " }),
  benefits: z
    .string()
    .min(5, { message: "This field must be at least 5 character long" })
    .max(405, { message: "Benefits character must not exceed 405 " }),
  overview: z
    .string()
    .min(5, { message: "This field must be at least 5 character long" })
    .max(405, { message: "Benefits character must not exceed  405 " }),
  highlight: z
    .string()
    .min(5, { message: "This field must be at least 5 character long" })
    .max(405, { message: "Highlight  character must not exceed 405 " }),
  url: z.union([z.literal(""), z.string().trim().url()]),
});

export const instructorInvitationSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.literal("Instructor"),
});

export const instructorRegistrationSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ["password_confirm"],
  });