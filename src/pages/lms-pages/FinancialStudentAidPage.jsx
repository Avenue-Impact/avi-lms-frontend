import React, { useState } from "react";
import DashSelect from "../auth/components/DashSelect";
import DashButton from "../auth/ButtonDash";
import { useFinancialAid } from "@/hooks/students/use-request-financial-aid";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchAllCourses } from "@/hooks/students/use-fetch-all-courses";
import { useViewEnrolledCourse } from "@/hooks/students/use-view-enrolled-course";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";


const financialAidSchema = z.object({
  reason: z.string().min(2, "Reason you applied for aid"),
  course_goal: z.string().min(2, "Bank Name is required"),
});

const FinancialStudentAidPage = () => {

  const [accurateInfo, setAccurateInfo] = useState(false);
  const [commitment, setCommitment] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const { data:fetchdata } = useFetchAllCourses();
  const courses = fetchdata?.data?.data?.courses || [];
  // console.log("Fetch the data", courses)
  

  const { financialAid, isPending } = useFinancialAid();
 

  const form = useForm({
    resolver: zodResolver(financialAidSchema),
    defaultValues: {
      reason: "",
      course_goal: "",
    },
  });


  const onSubmit = async (data) => {
     if (!selectedCourseId) {
       alert("Please select a course");
       return;
    }
    
    financialAid({
      reason_for_application: data.reason,
      how_will_it_help: data.course_goal,
      course_id: selectedCourseId,
      accurate_info: accurateInfo,
      commitment: commitment,
    });
  }



  return (
    <div>
      <div className="border-white-300 my-6 rounded-lg lg:border-2 lg:bg-white lg:p-6 lg:px-24">
        <div className="justify-center rounded-lg lg:flex lg:flex-col lg:p-6">
          <h3 className="mb-2 text-xl font-semibold text-gray-800">
            Make sure the information you provide is correct.
          </h3>

          <div>
            <p className="py-1 text-[14px] font-medium lg:text-[16px]">
              Select Course
            </p>
            <Select onValueChange={(value) => setSelectedCourseId(value)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="All courses" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                <SelectGroup>
                  <SelectLabel>Select Course</SelectLabel>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                      {course.id}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 pt-4 text-[14px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Reason for applying */}
                <div>
                  <FormInput
                    label="Reason you applied for aid"
                    name="reason"
                    control={form.control}
                    textarea={true}
                    id="reason"
                    className="w-full rounded border border-gray-300 p-2 lg:h-[203px]"
                            />
                          </div>

                {/* Course benefits */}
                <div>
                  <FormInput
                    label="How will your selected course help with your goals?"
                    name="course_goal"
                    control={form.control}
                    textarea={true}
                    id="course_goal"
                    className="w-full rounded border border-gray-300 p-2 lg:h-[203px]"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="mt-4 space-y-2">
                  <h2 className="text-xl font-medium">Terms and Conditions</h2>

                  {/* Checkbox 1 */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="accurateInfo"
                      checked={accurateInfo}
                      onChange={(e) => setAccurateInfo(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="accurateInfo" className="text-gray-600">
                      I am sharing accurate information on my application
                    </label>
                  </div>

                  {/* Checkbox 2 */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="commitment"
                      checked={commitment}
                      onChange={(e) => setCommitment(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="commitment" className="text-gray-600">
                      I commit to finishing my Avenue course
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <DashButton
                  type="submit"
                  className="mt-4 w-full bg-[#CC1747] px-32 text-white hover:bg-[#b30e3b] lg:w-2/4"
                  disabled={isPending}
                >
                  {isPending ? "Submitting....." : "Submit"}
                </DashButton>
              </form>
            </Form>

            {/* <div>
              <p className="text-gray-700 lg:font-medium">
                Reason you applied for aid
              </p>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded border border-gray-300 p-2"
                rows="10"
              ></textarea>
            </div> */}
            {/* 
            <div>
              <p className="font-medium text-gray-700">
                How will your selected course help with your goals?
              </p>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded border border-gray-300 p-2"
                rows="10"
              ></textarea>
            </div> */}

            {/* <div className="space-y-2">
              <h2 className="text-xl font-medium">Terms and conditions</h2>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={accurateInfo}
                  onChange={(e) => setAccurateInfo(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-gray-600">
                  I am sharing accurate information on my application
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={commitment}
                  onChange={(e) => setCommitment(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-gray-600">
                  I commit to finishing my Avenue course
                </label>
              </div>
            </div>
            <DashButton className="mt-2 w-full bg-[#CC1747] px-32 text-white hover:bg-[#b30e3b] lg:w-2/4">
              Submit
            </DashButton> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialStudentAidPage;
