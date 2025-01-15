import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import BorderCard from "@/Components/BorderCard";
import { StarRatingHover } from "@/Components/dashboard/StarRatingHover";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddRating } from "@/hooks/students/use-add-review";
import { useParams } from "react-router-dom";
import { CommonButton } from "@/Components/ui/button";

const LeaveRating = ({ setShowModal }) => {
  const [ratings, setRatings] = useState("");
  const { mutate, isPending } = useAddRating();
  const { courseId } = useParams();

  const handleClose = () => {
    setShowModal(false);
  };

  const reviewSchema = z.object({
    review: z
      .string()
      .min(3, { message: "review character must be more than 2" })
      .max(200, { message: "Not to be more than 200 characters" }),
  });

  const handleSubmit = (data) => {
    mutate(
      {
        courseId,
        data: {
          content: data.review,
          rating: ratings,
        },
      },
      {
        onSuccess: () => {
          setShowModal(false);
          form.reset();
        },
      },
    );
  };

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: "",
    },
  });

  return (
    <BorderCard className="relative mx-auto max-w-2xl bg-white p-6 shadow-md">
      <button
        onClick={handleClose}
        className="absolute right-6 top-4 hidden text-gray-500 hover:text-gray-800 focus:outline-none lg:block"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <h3 className="mb-2 text-2xl font-semibold text-gray-800">
        How would you rate this course?
      </h3>
      <p className="mb-4 text-gray-600">Select rating</p>

      <div className="mb-6 flex space-x-1">
        <StarRatingHover
          totalStars={5}
          onRating={(rating) => {
            setRatings(rating);
          }}
        />
      </div>

      <p className="mb-6 text-gray-600">
        Could you share your personal experience with this course? Did it align
        well with your expectations?
      </p>
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormInput
            type="text"
            textarea={true}
            control={form.control}
            name="review"
            id="review"
            className="mb-4 w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-gray-500 focus:outline-none"
          />

          <CommonButton
            className="focus:shadow-outline disabled: rounded bg-[#CC1747] px-4 py-2 font-[300] text-white hover:bg-[#b30e3b] focus:outline-none"
            disabled={isPending}
          >
            Submit
          </CommonButton>
        </form>
      </Form>
    </BorderCard>
  );
};

export default LeaveRating;
