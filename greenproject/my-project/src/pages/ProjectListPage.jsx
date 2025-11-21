import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { projectApi } from '../api/projectApi';
import './ProjectListPage.css';
import ACR from '../img/ACR2.jpg';
import ART from '../img/ART2.jpg';
import CAR from '../img/CAR2.jpg';
import GLD from '../img/GLD2.jpg';
import VCS from '../img/VCS2.jpg';

function ProjectListPage() {
  const { pageNo = '1' } = useParams();
  const navigate = useNavigate();

  // ... (중략) ...

  // Search 버튼 클릭 핸들러
  const handleSearch = async () => {
    setIsLoading(true);
    setIsSearchMode(true);
    setAppliedFilters(filters); // 현재 필터를 적용된 필터로 설정

    // 검색 시 항상 1페이지로 이동
    navigate('/projects/1');

    try {
      const response = await projectApi.searchProjects(1, filters); // 1페이지로 검색
      setProjects(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to search projects:", error);
      setProjects([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 필터 옵션 정의 (먼저 정의해야 초기값에서 사용 가능)
  const filterOptions = {
    registry: ["GLD", "VCS", "ART", "ACR", "CAR"],
    status: ["active", "canceled", "completed", "inactive", "listed", "registered", "unknown"],
    scope: [
      "Chemical Processes",
      "Agriculture",
      "Forestry & Land Use",
      "Waste Management",
      "Industrial & Commercial",
      "Carbon Capture & Storage",
      "Engineered Removal",
      "Household & Community",
      "Transportation"
    ]
  };

  // 컴포넌트 상태들 - 초기값은 모두 비활성화
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({
    keyword: '',
    registry: [],  // 초기에는 비어있음
    status: [],    // 초기에는 비어있음
    scope: []      // 초기에는 비어있음
  });
  const [appliedFilters, setAppliedFilters] = useState(null); // 실제 적용된 필터 (Search 버튼 클릭 시 설정)
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(false); // 검색 모드 여부

  const [searchOptions, setSearchOptions] = useState({ registry: ["VCS", "GLD", "CAR", "ACR"], status: ["Registered", "Listed", "Completed"], scope: ["Transportation", "Forestry & Land Use"] });

  // Registry 이미지 매핑
  const registryImages = {
    ACR,
    ART,
    CAR,
    GLD,
    VCS
  };

  // useEffect(() => {
  //   console.log(filters);
  // }, [filters]);

  // 페이지 변경 시 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const currentPage = parseInt(pageNo, 10);
      try {
        let response;
        if (isSearchMode && appliedFilters) {
          // 검색 모드일 때는 적용된 필터로 검색
          response = await projectApi.searchProjects(currentPage, appliedFilters);
        } else {
          // 일반 모드일 때는 전체 프로젝트
          response = await projectApi.getProjects(currentPage);
        }
        setProjects(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
        setPagination(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageNo, isSearchMode, appliedFilters]);

  // "모든 프로젝트 보기" 버튼 클릭 핸들러
  const handleShowAll = () => {
    setIsSearchMode(false);
    setAppliedFilters(null); // 적용된 필터 초기화
    setFilters({ keyword: '', registry: [], status: [], scope: [] }); // 필터 초기화
  };

  // 페이지 그룹 상태 (10개씩 묶음)
  const [pageGroup, setPageGroup] = useState(0);

  // 페이지네이션 UI를 렌더링하는 함수
  const renderPagination = () => {
    if (!pagination) return null;
    const { current_page, total_pages } = pagination;

    const pagesPerGroup = 10; // 한 번에 보여줄 페이지 수
    const startPage = pageGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, total_pages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link key={i} to={`/projects/${i}`} className={`page-number ${i === current_page ? 'active' : ''}`}>
          {i}
        </Link>
      );
    }

    const canGoPrevGroup = pageGroup > 0;
    const canGoNextGroup = endPage < total_pages;

    return (
      <div className="pagination-controls">
        {/* 이전 그룹 버튼 */}
        {canGoPrevGroup && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setPageGroup(pageGroup - 1);
            }}
            className="page-nav-btn"
          >
            &lt;&lt;
          </button>
        )}

        {pages}

        {/* 다음 그룹 버튼 */}
        {canGoNextGroup && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setPageGroup(pageGroup + 1);
            }}
            className="page-nav-btn"
          >
            &gt;&gt;
          </button>
        )}
      </div>
    );
  };

  // 필터 변경 핸들러
  const handleKeywordChange = (e) => {
    setFilters(prev => ({ ...prev, keyword: e.target.value }));
  };

  const handleFilterToggle = (category, value) => {
    setFilters(prev => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  const handleSelectAll = (category) => {
    setFilters(prev => ({ ...prev, [category]: filterOptions[category] }));
  };

  const handleClearAll = (category) => {
    setFilters(prev => ({ ...prev, [category]: [] }));
  };

  return (
    <div className="dashboard-container">
      {/* 왼쪽 필터 사이드바 */}
      <aside className="filter-sidebar">
        <div className="filter-section">
          <h3>Search</h3>
          <input
            type="text"
            className="filter-input"
            placeholder="Search projects..."
            value={filters.keyword}
            onChange={handleKeywordChange}
          />
        </div>

        <div className="filter-section">
          <div className="filter-header">
            <h3>Registry</h3>
            <div className="header-actions-small">
              <button onClick={() => handleSelectAll('registry')} className="text-btn">All</button>
              <span className="divider-small">|</span>
              <button onClick={() => handleClearAll('registry')} className="text-btn">Clear</button>
            </div>
          </div>
          <div className="filter-buttons">
            {filterOptions.registry.map(option => (
              <button
                key={option}
                className={`filter-btn ${filters.registry.includes(option) ? 'active' : ''}`}
                onClick={() => handleFilterToggle('registry', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-header">
            <h3>Status</h3>
            <div className="header-actions-small">
              <button onClick={() => handleSelectAll('status')} className="text-btn">All</button>
              <span className="divider-small">|</span>
              <button onClick={() => handleClearAll('status')} className="text-btn">Clear</button>
            </div>
          </div>
          <div className="filter-buttons">
            {filterOptions.status.map(option => (
              <button
                key={option}
                className={`filter-btn ${filters.status.includes(option) ? 'active' : ''}`}
                onClick={() => handleFilterToggle('status', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-header">
            <h3>Scope</h3>
            <div className="header-actions-small">
              <button onClick={() => handleSelectAll('scope')} className="text-btn">All</button>
              <span className="divider-small">|</span>
              <button onClick={() => handleClearAll('scope')} className="text-btn">Clear</button>
            </div>
          </div>
          <div className="filter-buttons">
            {filterOptions.scope.map(option => (
              <button
                key={option}
                className={`filter-btn ${filters.scope.includes(option) ? 'active' : ''}`}
                onClick={() => handleFilterToggle('scope', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-actions">
          <button className="search-button" onClick={handleSearch}>Search</button>
          {isSearchMode && (
            <button className="show-all-button" onClick={handleShowAll}>
              ← Go back to see all projects
            </button>
          )}
        </div>
      </aside>

      {/* 오른쪽 메인 콘텐츠 */}
      <main className="dashboard-content">
        {/* <div className="page-header">
          <h2>Projects Dashboard</h2>
          <Link to="/projects/add" className="add-project-button">Add New Project</Link>
        </div> */}

        <div className="table-container">
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <>
              {/* 총 프로젝트 개수 표시 */}
              {pagination && (
                <div className="project-count">
                  Total Projects: <span className="count-number">{pagination.total_items?.toLocaleString() || 0}</span>
                </div>
              )}

              <table className="project-table">
                <thead>
                  <tr>
                    <th>Registry (Standard)</th>
                    <th>Project ID</th>
                    <th>Total Issued</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 3. API 응답 데이터 구조에 맞게 key를 수정합니다. */}
                  {projects.map(project => (
                    <tr key={project.id}>
                      <td>
                        <div className="registry-logo-wrapper">
                          <img
                            src={registryImages[project.registry]}
                            alt={project.registry}
                            className="registry-logo"
                          />
                        </div>
                      </td>
                      <td>{project.project_id}</td>
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