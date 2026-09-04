import { z } from 'zod'

export const getEmailErrorMessage = (email) => {
  if (!email) return "This field is required";
  if (/\\s/.test(email)) return "⚠ Please enter a valid email address - You have entered a blank space";
  if (!email.includes("@")) return "⚠ Please enter a valid email address - You have missed out the @ symbol";
  
  const [username, ...rest] = email.split("@");
  if (!username) return "⚠ Please enter a valid email address - You have missed out the username";
  
  const domainPart = rest.join("@");
  if (!domainPart || rest.length > 1) {
    if (!domainPart) return "⚠ Please enter a valid email address - You have missed out the domain";
    return "⚠ Please enter a valid email address"; // multiple @ fallback
  }

  if (!domainPart.includes(".")) return '⚠ Please enter a valid email address - You have missed out the a "."';
  
  const domainParts = domainPart.split(".");
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2) return "⚠ Please enter a valid email address - You have missed out the Top Leve Domain";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "⚠ Please enter a valid email address";
  }

  return null;
};

export const customEmailSchema = z.string().superRefine((val, ctx) => {
  const errorMsg = getEmailErrorMessage(val);
  if (errorMsg) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: errorMsg,
    });
  }
});

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
  sort_order: z.coerce.number().optional(),
  video_from_url: z.union([z.literal(""), z.string().trim().url()]),
});
export const editOnDemandVideoSchema = z.object({

  video_title: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reach the max character length" }),

  sort_order: z.coerce.number().optional(),
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
  zoom_account_id: z.string().optional(),
});

export const courseInformationSchema = z.object({
  courseTitle: z
    .string()
    .min(5, { message: "Title must be at least 5 character long" })
    .max(160, { message: "Title character must not exceed 160 " }),
  courseIncludes: z
    .string()
    .min(5, { message: "This field must be at least 5 character long" })
    .max(600, { message: "course include character must not exceed 600 " }),
  technologies: z
    .string()
    .min(5, { message: "This field must be at least 5 character long" })
    .max(1200, { message: "Technologies character must not exceed 1200 " }),
  benefits: z
    .string()
    .min(5, { message: "This field must be at least 5 character long" })
    .max(1200, { message: "Benefits character must not exceed 1200 " }),
  overview: z
    .string()
    .min(5, { message: "This field must be at least 5 character long" })
    .max(1200, { message: "Benefits character must not exceed  1200 " }),
  highlight: z
    .string()
    .min(5, { message: "This field must be at least 5 character long" })
    .max(1200, { message: "Highlight  character must not exceed 1200 " }),
  pathway: z.string().optional(),
  url: z.union([z.literal(""), z.string().trim().url()]),
  is_private: z.boolean().default(false),
});

export const instructorInvitationSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: customEmailSchema,
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