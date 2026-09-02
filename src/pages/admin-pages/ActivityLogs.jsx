import React, { useState } from "react";
import AdminNav from "../../Components/admindashboard/AdminNav";
import { useGetActivityLogs } from "../../hooks/admin-global/use-activity-logs";

const ActivityLogs = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 20,
    search: "",
    category: "",
    action: "",
  });

  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, error } = useGetActivityLogs(params);

  const logs = data?.data?.data?.logs || [];
  const pagination = data?.data?.data?.pagination || {};

  const handleSearch = (e) => {
    e.preventDefault();
    setParams({ ...params, search: searchInput, page: 1 });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= (pagination.totalPages || 1)) {
      setParams({ ...params, page: newPage });
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case "success":
        return "text-green-600 bg-green-50";
      case "failed":
        return "text-red-600 bg-red-50";
      case "initiated":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div>
      <AdminNav>
        <div className="flex w-full items-center justify-between pr-6">
          <h1 className="text-2xl font-medium text-[#344054]">Activity Logs</h1>
        </div>
      </AdminNav>
      <main className="mt-3 px-6 py-7">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="flex flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by email or name..."
              className="w-full rounded-l-md border border-gray-300 px-4 py-2 focus:border-[#CC1747] focus:outline-none focus:ring-1 focus:ring-[#CC1747]"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-r-md bg-[#CC1747] px-4 py-2 text-white hover:bg-[#b0133c]"
            >
              Search
            </button>
          </form>

          <div className="flex gap-4">
            <select
              className="rounded-md border border-gray-300 px-4 py-2 focus:border-[#CC1747] focus:outline-none"
              value={params.category}
              onChange={(e) =>
                setParams({ ...params, category: e.target.value, page: 1 })
              }
            >
              <option value="">All Categories</option>
              <option value="auth">Auth</option>
              <option value="payment">Payment</option>
              <option value="course">Course</option>
              <option value="certificate">Certificate</option>
              <option value="contact">Contact</option>
              <option value="support">Support</option>
            </select>

            <select
              className="rounded-md border border-gray-300 px-4 py-2 focus:border-[#CC1747] focus:outline-none"
              value={params.action}
              onChange={(e) =>
                setParams({ ...params, action: e.target.value, page: 1 })
              }
            >
              <option value="">All Actions</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="initiated">Initiated</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Loading logs...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-red-500">
                    Error loading logs.
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No activity logs found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {log.userName}
                      </div>
                      <div className="text-sm text-gray-500">{log.userEmail}</div>
                      {log.role && (
                        <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                          {log.role}
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 capitalize">
                      {log.category}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 capitalize ${getActionColor(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {log.details ? (
                        <pre className="max-w-xs overflow-x-auto text-xs">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing page <span className="font-medium">{pagination.currentPage}</span> of{" "}
              <span className="font-medium">{pagination.totalPages}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(params.page - 1)}
                disabled={params.page === 1}
                className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(params.page + 1)}
                disabled={params.page === pagination.totalPages}
                className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ActivityLogs;
