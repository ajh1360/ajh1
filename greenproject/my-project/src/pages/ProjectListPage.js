import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectApi } from '../api/projectApi';
import './ProjectListPage.css';

function ProjectListPage() {
  
  const { pageNo = '1' } = useParams();
  
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    keyword: '',
    registry: [],
    status: [],
    scope: []
  });

  const [searchOptions] = useState({
    registry: ["VCS", "GS", "CAR", "ACR"],
    status: ["Registered", "Listed", "Completed"],
    scope: ["Transportation", "Forestry & Land Use"]
  });
  
  useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    const currentPage = parseInt(pageNo, 10);

    try {
      const response = await projectApi.getProjects(currentPage);

      console.log("API pagination:", response.pagination);

      // 🔥 snake_case → camelCase 변환
      setPagination({
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.total_pages,
        totalItems: response.pagination.total_items,
        limit: response.pagination.limit,
      });

      setProjects(response.data);

    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, [pageNo]);


  const renderPagination = () => {
    if (!pagination) return null;

    const { currentPage, totalPages } = pagination;
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Link
          key={i}
          to={`/projects/${i}`}
          className={`page-number ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </Link>
      );
    }

    return <div className="pagination-controls">{pages}</div>;
  };

  return (
    <div className="project-list-page">
      <div className="list-page-header">
        <h1>Projects Dashboard</h1>
        <p>Explore and filter voluntary market projects from various registries.</p>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          name="keyword"
          placeholder="Search by keyword..."
          className="filter-input"
        />

        <select className="filter-select">
          <option value="">All Registries</option>
          {searchOptions.registry.map(reg => (
            <option key={reg} value={reg}>{reg}</option>
          ))}
        </select>

        <select className="filter-select">
          <option value="">All Statuses</option>
          {searchOptions.status.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button className="filter-button">Apply Filters</button>
      </div>

      <div className="content-container">
        {isLoading ? (
          <div className="loading-spinner">Loading projects...</div>
        ) : (
          <div className="table-container">
            <table className="project-table">
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Registry (Standard)</th>
                  <th>Total Issued (tCO₂e)</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {projects.map(project => (
                  <tr key={project.id}>
                    <td>{project.project_id}</td>
                    <td>{project.standard}</td>
                    <td>{Number(project.total_issued).toLocaleString()}</td>
                    <td>
                      <Link
                        to={`/projects/${project.id}/detail`}
                        className="details-link"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 페이지네이션 UI */}
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectListPage;
