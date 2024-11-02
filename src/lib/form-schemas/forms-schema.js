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
    .max(450, { message: "you've reach the max character length" }),
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
  startedFrom: z.string({ message: "This field is required" }),
});

export const courseTypeSchema = z.object({
  coursePrice: z
    .string({ message: "This field is required" })
    .min(1, { message: "This field is required" }),
  discountPrice: z
    .string({ message: "This field is required" })
    .min(1, { message: "this field is required" }),
  duration: z
    .string({ message: "This field is required" })
    .min(1, { message: "this field is required" }),
  time: z.string({ message: "This field is required" }),
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