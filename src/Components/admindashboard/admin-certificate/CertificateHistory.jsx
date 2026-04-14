import { useFetchedIssuedCert } from "@/hooks/certificate/use-fetched-issued-certificates";
import { formatDateString } from "@/lib/formatdatestring";
import DashButton from "@/pages/auth/ButtonDash";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GlobalPagination from "@/Components/ui/GlobalPagination";

const CertificateHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { data, isLoading, isError } = useFetchedIssuedCert(id, page, perPage);

  const handleSearch = useCallback(
    _.debounce((query) => {
      setSearchQuery(query);
    }, 500),
    [],
  );

  const handleChange = (event) => {
    handleSearch(event.target.value);
  };

  // Filter courses by title
  const filteredHistories = (data?.data?.data || []).filter((course) =>
    course.course_title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <div className="grid grid-cols-12 py-6">
        <div className="col-span-4 text-[20px] font-[500] text-[#344054]">
          <p>Certificate issue history</p>
        </div>

        <div className="col-span-8 flex items-center justify-between">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full rounded-md border px-1 py-2 pl-10 text-[14px] focus:outline-none"
              placeholder="Search Course"
              onChange={handleChange}
            />
            <div className="absolute left-3 top-1.5 text-gray-400">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
      </div>

      <div>
        {isLoading ? (
          "Loading..."
        ) : isError ? (
          "Network error"
        ) : filteredHistories.length === 0 ? ( 
          <p className="col-span-3 text-center font-medium text-[#CC1747]">
            No courses found
          </p>
        ) : filteredHistories.length < 1 ? (
          <p className="italic text-gray-500">No certificates issued yet...</p>
        ) : (
          <table className="min-w-full border border-gray-300 bg-white text-[13px] text-[#344054]">
            <thead>
              <tr className="min-w-full border-0 border-red-500 bg-[#E4E7EC]">
                <th className="border-b p-4 text-left">S/N</th>
                <th className="border-b p-4 text-left">Course Title</th>
                <th className="border-b p-4 text-left">Course Type</th>
                <th className="border-b p-4 text-left">Issue Date</th>
                <th className="border-b p-4 text-left">Course Cohort</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {filteredHistories.map((cert, index) => (
                <tr key={index}>
                  <td className="border-b p-4">
                    {(index + 1).toString().padStart(1, "0")}
                  </td>
                  <td className="border-b p-4">{cert.course_title}</td>
                  <td className="border-b p-3">
                    <button className="rounded bg-[#FFECE5] p-1 capitalize text-[#AD3307]">
                      {cert.course_type}
                    </button>
                  </td>

                  <td className="border-b p-4">
                    {formatDateString(cert.created_at)}
                  </td>
                  <td className="border-b p-4">{cert.cohort}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!isLoading && !isError && data?.data?.pagination && (
          <GlobalPagination
            pagination={data.data.pagination}
            onPageChange={setPage}
            onLimitChange={(limit) => {
              setPerPage(limit);
              setPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CertificateHistory;
