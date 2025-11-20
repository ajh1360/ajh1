import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "./ProjectListPage.css";

const ProjectListPage = () => {
  const { pageNo } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  // filters
  const [keyword, setKeyword] = useState("");
  const [registryFilter, setRegistryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchProjects = async (page = 1) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(`/projects/${page}`);

      console.log("API full:", response);
      console.log("Projects list:", response.data);
      console.log("Pagination:", response.data.pagination);

      // 실제 리스트
      setProjects(response.data.data);

      // 페이지네이션
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = Number(pageNo) || 1;
    fetchProjects(page);
  }, [pageNo]);


  const goToPage = (page) => {
    navigate(`/projects/${page}`);
  };

  return (
    <div className="project-list-page">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Projects Dashboard</h1>
        <p>Explore and filter voluntary market projects from various registries.</p>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select
          className="filter-select"
          value={registryFilter}
          onChange={(e) => setRegistryFilter(e.target.value)}
        >
          <option value="">All Registries</option>
          <option value="ART">ART</option>
          <option value="Verra">Verra</option>
          <option value="Gold Standard">Gold Standard</option>
        </select>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Registered">Registered</option>
          <option value="Issued">Issued</option>
        </select>

        <button className="apply-btn">Apply Filters</button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>REGISTRY</th>
              <th style={{ width: "15%" }}>PROJECT ID</th>
              <th style={{ width: "50%" }}>PROJECT NAME</th>
              <th style={{ width: "15%" }}>DETAILS</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="loading-text">
                  Loading...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan="4" className="loading-text">
                  No projects found.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.standard || "-"}</td>
                  <td>{project.project_id || "-"}</td>
                  <td>{project.project_name || "-"}</td>
                  <td>
                    <Link to={`/projects/${project.id}/detail`} className="view-link">
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {pagination && (
          <div className="pagination">
            {Array.from(
              { length: pagination.total_pages },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                className={`page-btn ${
                  page === pagination.current_page ? "active" : ""
                }`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectListPage;
