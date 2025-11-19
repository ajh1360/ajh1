import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectApi } from '../api/projectApi';
import './ProjectListPage.css';

function ProjectListPage() {
  const { pageNo = '1' } = useParams(); 

  // 컴포넌트 상태들
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({ keyword: '', registry: [], status: [], scope: [] });
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchOptions, setSearchOptions] = useState({ registry: ["VCS", "GS", "CAR", "ACR"], status: ["Registered", "Listed", "Completed"], scope: ["Transportation", "Forestry & Land Use"] });

  // 데이터 로딩을 위한 useEffect
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const currentPage = parseInt(pageNo, 10);
      try {

        const response = await projectApi.getProjects(currentPage);
        
        setProjects(response.data);
        setPagination(response.pagination);

      } catch (error) {
        // API 호출 실패 시 에러 처리
        console.error("Failed to fetch projects:", error);
        setProjects([]); 
        setPagination(null);
      } finally {
        // 로딩 상태를 false로 변경
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageNo]);

  // 페이지네이션 UI를 렌더링하는 함수
  const renderPagination = () => {
    if (!pagination) return null;
    const { currentPage, totalPages } = pagination;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Link key={i} to={`/projects/${i}`} className={`page-number ${i === currentPage ? 'active' : ''}`}>
          {i}
        </Link>
      );
    }
    return <div className="pagination-controls">{pages}</div>;
  };

  // 필터 변경 핸들러 (지금은 UI만 있고 실제 동작은 search API 연동 시 구현)
  const handleFilterChange = (e) => {
    
  };
  
  return (
    <div className="dashboard-container">
      {/* 왼쪽 필터 사이드바 (UI는 그대로 유지) */}
      <aside className="filter-sidebar">
        {/* ... 필터 UI 코드 ... */}
      </aside>

      {/* 오른쪽 메인 콘텐츠 */}
      <main className="main-content">
        <div className="page-header">
          <h2>Projects Dashboard</h2>
          <Link to="/projects/add" className="add-project-button">Add New Project</Link>
        </div>

        <div className="table-container">
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <>
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
                  {/* 3. API 응답 데이터 구조에 맞게 key를 수정합니다. */}
                  {projects.map(project => (
                    <tr key={project.id}>
                      <td>{project.project_id}</td>
                      <td>{project.standard}</td>
                      <td>{Number(project.total_issued).toLocaleString()}</td>
                      {/* 상세 페이지 경로는 나중에 수정이 필요할 수 있습니다. */}
                      <td><Link to={`/projects/${project.id}/detail`} className="details-link">View</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {renderPagination()}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProjectListPage;