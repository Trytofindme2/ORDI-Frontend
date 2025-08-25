import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import SearchBar from '../../components/admin/usermanagement/searchBar';
import Pagination from '../../components/admin/usermanagement/pagination';
import adminAPI from '../../helper/adminAPI';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);

const ReportManagement = () => {
  const [search, setSearch] = useState('');
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('reportAt');
  const [ascending, setAscending] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.get('getReports', {
        params: { page, size, sortBy, ascending },
      });
      const data = response.data;
      setReports(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      toast.error('Failed to fetch reports');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [page, sortBy, ascending]);

  // Navigate to review page
  const handleReviewReport = (recipeId) => {
    navigate(`/admin/dashboard/reviewReport/${recipeId}`);
  };

  // Delete report without re-fetching
  const handleDeleteReport = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;

    try {
      await adminAPI.delete(`deleteReport/${reportId}`); // Backend delete API
      toast.success('Report deleted successfully');

      // Remove from local state immediately
      setReports((prevReports) => prevReports.filter((r) => r.id !== reportId));
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete report');
    }
  };

  const filteredReports = search
    ? reports.filter((report) =>
        `${report.recipeTitle} ${report.reportedByName} ${report.postOwnerName} ${report.reportReason}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : reports;

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg text-gray-800 min-h-[80vh]">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* Header + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 flex-shrink-0">
        <h2 className="text-2xl font-semibold">Reported Posts</h2>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-indigo-50">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-indigo-600 uppercase">Post Id</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-indigo-600 uppercase">Reported By</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-indigo-600 uppercase">Post Owner</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-indigo-600 uppercase">Title</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-indigo-600 uppercase">Reason</th>
              <th
                className="py-3 px-6 text-left text-sm font-medium text-indigo-600 uppercase cursor-pointer"
                onClick={() => setAscending(!ascending)}
              >
                Date {ascending ? '↑' : '↓'}
              </th>
              <th className="py-3 px-6 text-center text-sm font-medium text-indigo-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <tr
                  key={report.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-indigo-50'} hover:bg-indigo-100 transition`}
                >
                  <td className="py-4 px-6 text-sm text-gray-700">{report.recipeId}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{report.reportedByName}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{report.postOwnerName}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{report.recipeTitle}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{report.reportReason}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {report.reportAt ? dayjs(report.reportAt).fromNow() : 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleReviewReport(report.recipeId)}
                      className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default ReportManagement;
