import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectApi } from "../api/projectApi";
import './UserProjectsPage.css';

function UserProjectsPage() {
    const [userProjects, setUserProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await projectApi.getUserInfo();
                setUser(data);
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
                setUserProjects(data);
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
                {user && user.role === "프로젝트 관리자" ? (
                    <Link to="/projects/add" className="add-project-btn">Add New Project</Link>
                ) : null}
            </div>

            {userProjects.length > 0 ? (
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
                            {userProjects.map((project) => (
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-projects">
                    {user && user.role === "프로젝트 관리자" ? (
                        <>
                            <p>참여 중인 프로젝트가 없습니다.</p>
                            <Link to="/projects/add" className="start-project-link">새 프로젝트 시작하기</Link>
                        </>
                    ) : (
                        <>
                            <p>프로젝트 관리자 권한이 필요합니다.</p>
                            <Link to="/projects" className="start-project-link">프로젝트 목록으로 이동</Link>
                        </>

                    )}
                </div>
            )}
        </div>
    );
}

export default UserProjectsPage;