import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import './ProjectDetailPage.css';

function ProjectDetailPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(`/projects/${projectId}/detail`);
        setProject(response.data);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError('Failed to load project data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // 로딩 상태
  if (loading) {
    return (
      <div className="detail-page-container">
        <div className="loading">Loading project details...</div>
      </div>
    );
  }

  // 에러 또는 데이터 없음
  if (error || !project) {
    return (
      <div className="detail-page-container not-found">
        <h2>Error</h2>
        <p>{error || 'Project not found.'}</p>
        <Link to="/projects" className="back-button">Back to Project List</Link>
      </div>
    );
  }

  // 정상 렌더링
  return (
    <div className="detail-page-container">
      <div className="detail-content-card">

        {/* 제목 + 상태 */}
        <div className="detail-header">
          <h2>{project.project_name}</h2>
          <span className={`status-pill status-${project.status?.toLowerCase()}`}>
            {project.status}
          </span>
          <div className="detail-nav">
              <Link to={`/projects/${projectId}/detail`} className="nav-tab active">Summary</Link>
              <Link to={`/projects/${projectId}/credit`} className="nav-tab">Credits & Transactions</Link>
          </div>
        </div>

        <hr className="divider" />

        {/* 주요 정보 */}
        <div className="detail-grid">

          <div className="detail-item">
            <h4>Project ID</h4>
            <p>{project.project_id}</p>
          </div>

          <div className="detail-item">
            <h4>Registry</h4>
            <p>{project.registry}</p>
          </div>

          <div className="detail-item">
            <h4>Country</h4>
            <p>{project.country}</p>
          </div>

          <div className="detail-item">
            <h4>Scope</h4>
            <p>{project.scope}</p>
          </div>

          <div className="detail-item">
            <h4>Project Type</h4>
            <p>{project.type}</p>
          </div>

          <div className="detail-item">
            <h4>Removal or Reduction</h4>
            <p>{project.removal_or_reduction}</p>
          </div>

          <div className="detail-item">
            <h4>Developer</h4>
            <p>{project.project_developer}</p>
          </div>

          <div className="detail-item">
            <h4>Verifier</h4>
            <p>{project.verifier}</p>
          </div>

          <div className="detail-item">
            <h4>Vintage (First Credit Year)</h4>
            <p>{project.vintage}</p>
          </div>

          <div className="detail-item">
            <h4>Estimated Annual Emission Reductions</h4>
            <p>{project.estimated_annual_emission_reductions ?? "N/A"}</p>
          </div>

          <div className="detail-item full-width">
            <h4>Methodology</h4>
            <p>{project.methodology}</p>
          </div>

          <div className="detail-item full-width">
            <h4>Registry Document</h4>
            <p>
              <a
                href={project.registry_document} 
                target="_blank"
                rel="noopener noreferrer"
              >
                View Registry Document
              </a>
            </p>
          </div>

        </div>

        <hr className="divider" />

        {/* 뒤로가기 */}
        <div className="detail-actions">
          <Link to="/projects/1" className="back-button">
            Back to Project List
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ProjectDetailPage;
