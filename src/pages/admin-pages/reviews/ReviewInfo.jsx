// import React from 'react'

import AdminNav from "@/Components/admindashboard/AdminNav";
import LinkList from "@/Components/LinkList";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ReviewDetail from "./ReviewDetail";
import DeletedReview from "./RestoredDeletedReview";
import { useFetchReviews } from "@/hooks/review/use-fetch-reviews";
import { useFetchDeletedReviews } from "@/hooks/review/use-fetch-deleted-reviews";

const ReviewDetails = () => {
  const [tab, setTab] = useState("review-detail");
  const [active, setActive] = useState(2);

  const navigate = useNavigate();
  const { id, courseTitle } = useParams();

  const { data } = useFetchReviews(id);
  const { data: deletedData } = useFetchDeletedReviews(id);

  return (
    <div>
      <AdminNav>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2"
            onClick={() => navigate("/admin/reviews")}
          >
            <span className="rounded-sm border border-[#E4E7EC] px-[9px] py-[7.7px]">
              <FaArrowLeft />
            </span>
            <span className="text-[20px] font-medium text-[#344054] truncate">
              {courseTitle}
            </span>
          </button>
          {/* <p className="text-lg font-medium text-[#344054]">
            {queryString?.get("title").length > 40
              ? `${queryString?.get("title").substring(0, 40)}...`
              : queryString?.get("title")}
            | {queryString.get("cohort")}
          </p> */}
        </div>
      </AdminNav>
      <main>
        <ul className="mt-5 flex w-max items-center gap-6 border-b border-b-[#E4E7EC] *:capitalize">
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => setTab("review-detail")}
            active={tab === "review-detail"}
          >
            Reviews({data?.data?.length})
          </LinkList>
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => setTab("deleted-review")}
            active={tab === "deleted-review"}
          >
            Deleted Reviewed({deletedData?.data?.length})
          </LinkList>
        </ul>
        <div>
          {
            <>
              {tab === "review-detail" && (
                <ReviewDetail
                  // data={data}
                  active={active}
                  setActive={setActive}
                />
              )}

              {tab === "deleted-review" && (
                <DeletedReview
                  // data={data}
                  active={active}
                  setActive={setActive}
                />
              )}
            </>
          }
          {/* {isLoading && <p>Loading...</p>}
          {error && (
            <p>{error?.response?.data?.message ?? "Something went wrong"}</p>
          )}
          {data && (
            <>
              {tab === "share-docs" && (
                <CourseWorkShareDocs
                  data={data}
                  active={active}
                  setActive={setActive}
                />
              )}

              {tab === "assignments" && (
                <CourseWorkAssignment
                  data={data}
                  active={active}
                  setActive={setActive}
                />
              )}
            </>
          )} */}
        </div>
      </main>
    </div>
  );
};

export default ReviewDetails;
