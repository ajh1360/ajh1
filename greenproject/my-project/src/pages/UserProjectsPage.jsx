import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectApi } from "../api/projectApi";
import './UserProjectsPage.css';
import { FaCheck, FaTimes } from 'react-icons/fa'; // 아이콘 import 추가

function UserProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [removingProjectId, setRemovingProjectId] = useState(null); // 삭제 확인 모드 상태

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await projectApi.getUserInfo();
                setUserInfo(data);
            } catch (err) {
                console.error("Failed to fetch user info:", err);
                setError("사용자 정보를 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        }
        const fetchUserProjects = async () => {
            try {
                const data = await projectApi.getUserProjects();
                setProjects(data);
            } catch (err) {
                console.error("Failed to fetch user projects:", err);
                setError("프로젝트 목록을 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
        fetchUserProjects();
    }, []);

    // 삭제 핸들러
    const handleRemove = async (projectId) => {
        console.log(`Removing project with ID: ${projectId}`);
        try {
            const result = await projectApi.removeProject(projectId);
            if (result.code === 200) {
                // 성공 시 상태에서 해당 프로젝트 제거 (화면 갱신)
                setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
            } else {
                console.log(`[${result.code}-${result.status}] ${result.message}`);
                setError(result.message);
            }
        } catch (err) {
            console.error("Failed to remove project:", err);
            setError("프로젝트 삭제 중 오류가 발생했습니다.");
        }

        // 삭제 후 상태 초기화
        setRemovingProjectId(null);
    };

    if (isLoading) {
        return <div className="user-projects-container"><div className="loading">Loading projects...</div></div>;
    }

    if (error) {
        return <div className="user-projects-container"><div className="error">{error}</div></div>;
    }

    return (
        <div className="user-projects-container">
            <div className="page-header">
                <h2>My Projects</h2>
                {userInfo && userInfo.role === "프로젝트 관리자" ? (
                    <Link to="/projects/add" className="add-project-btn">Add New Project</Link>
                ) : null}
            </div>

            {projects.length > 0 ? (
                <div className="projects-table-container">
                    <table className="projects-table">
                        <thead>
                            <tr>
                                <th>Project ID</th>
                                <th>Registry</th>
                                <th>Scope</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td>{project.project_id}</td>
                                    <td>{project.registry}</td>
                                    <td>{project.scope}</td>
                                    <td>
                                        <span className={`status-badge status-${project.status.toLowerCase()}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/projects/${project.id}/detail`} className="view-link">View</Link>
                                        <Link to={`/projects/${project.id}/detail`} className="edit-link">Edit</Link>

                                        {removingProjectId === project.id ? (
                                            <span className="remove-confirm-group">
                                                <button
                                                    className="confirm-remove-btn"
                                                    onClick={() => handleRemove(project.id)}
                                                    title="Confirm Remove"
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    className="cancel-remove-btn"
                                                    onClick={() => setRemovingProjectId(null)}
                                                    title="Cancel"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </span>
                                        ) : (
                                            <button
                                                className="remove-link"
                                                onClick={() => setRemovingProjectId(project.id)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-projects">
                    {userInfo && userInfo.role === "프로젝트 관리자" ? (
                        <>
                            <p>참여 중인 프로젝트가 없습니다.</p>
                            <Link to="/projects/add" className="start-project-link">새 프로젝트 시작하기</Link>
                        </>
                    ) : (
                        <>
                            <p>프로젝트 관리자 권한이 필요합니다.</p>
                            <Link to="/projects/1" className="start-project-link">프로젝트 목록으로 이동</Link>
                        </>

                    )}
                </div>
            )}
        </div>
    );
}

export default UserProjectsPage;