import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { projectApi } from '../api/projectApi';
import './ListedProjectListPage.css';

// Scope 이미지 import
import Agriculture from '../img/scope/Agriculture.png';
import CCS from '../img/scope/Carbon_capture_and_storage.png';
import Chemical from '../img/scope/Chemical_processes.png';
import Engineered from '../img/scope/Engineered_removal.png';
import Forestry from '../img/scope/Forestry_and_landuse.png';
import Household from '../img/scope/Household_and_community.png';
import Industrial from '../img/scope/Industrial_and_commercial.png';
import Transportation from '../img/scope/Transportation.png';
import Waste from '../img/scope/Waste_management.png';

function ListedProjectListPage() {
    const { pageNo = '1' } = useParams();
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Scope 이미지 매핑
    const scopeImages = {
        'Agriculture': Agriculture,
        'Carbon Capture & Storage': CCS,
        'Chemical Processes': Chemical,
        'Engineered Removal': Engineered,
        'Forestry & Land Use': Forestry,
        'Household & Community': Household,
        'Industrial & Commercial': Industrial,
        'Transportation': Transportation,
        'Waste Management': Waste,
    };

    // 페이지 변경 시 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const currentPage = parseInt(pageNo, 10);
            try {
                const response = await projectApi.getUserProjectsList(currentPage);
                setProjects(response.data);
                setPagination(response.pagination);
            } catch (error) {
                console.error("Failed to fetch listed projects:", error);
                setProjects([]);
                setPagination(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [pageNo]);



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
                <Link key={i} to={`/projects/waiting/${i}`} className={`page-number ${i === current_page ? 'active' : ''}`}>
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

    return (
        <div className="dashboard-container">
            {/* 왼쪽 사이드바 - 메뉴만 있음 */}
            <aside className="filter-sidebar">
                <div className="filter-section">
                    <h3>Menu</h3>
                    <div className="filter-buttons vertical">
                        <button
                            className="filter-btn"
                            onClick={() => navigate('/projects/1')}
                        >
                            Active Projects
                        </button>
                        <button
                            className="filter-btn active"
                            onClick={() => navigate('/projects/waiting/1')}
                        >
                            Listed Projects
                        </button>
                    </div>
                </div>
                <hr className="sidebar-divider" />
            </aside>

            {/* 오른쪽 메인 콘텐츠 */}
            <main className="dashboard-content">
                <div className="project-list-container">
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

                            {projects.map(project => (
                                <div key={project.id} className="project-list-item">
                                    {/* 왼쪽: 이미지 섹션 */}
                                    <div className="project-image-section">
                                        {scopeImages[project.scope] && (
                                            <img
                                                src={scopeImages[project.scope]}
                                                alt={project.scope}
                                                className="project-scope-img"
                                            />
                                        )}
                                    </div>

                                    {/* 가운데: 정보 섹션 */}
                                    <div className="project-info-section">
                                        <span className="project-scope-badge">{project.scope}</span>
                                        <h3 className="project-name">{project.project_name}</h3>
                                        <div className="project-country">
                                            <span>📍</span> {project.country}
                                        </div>
                                    </div>

                                    {/* 오른쪽: 액션 섹션 */}
                                    <div className="project-action-section">
                                        <div className="list-vote-counts">
                                            <div className="list-vote-item vote-like">
                                                <span className="vote-icon">👍</span> {project.like_count}
                                            </div>
                                            <div className="list-vote-item vote-dislike">
                                                <span className="vote-icon">👎</span> {project.dislike_count}
                                            </div>
                                        </div>
                                        <Link to={`/projects/waiting/detail/${project.id}`} className="view-details-btn">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {renderPagination()}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default ListedProjectListPage;
