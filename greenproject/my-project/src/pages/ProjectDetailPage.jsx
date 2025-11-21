import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import './ProjectDetailPage.css';

// Registry 이미지 import
import ACR from '../img/ACR2.jpg';
import ART from '../img/ART2.jpg';
import CAR from '../img/CAR2.jpg';
import GLD from '../img/GLD2.jpg';
import VCS from '../img/VCS2.jpg';

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
import GradientText from '../components/ui/GradientText';


function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Registry 이미지 매핑
  const registryImages = {
    'ACR': ACR,
    'ART': ART,
    'CAR': CAR,
    'GLD': GLD,
    'VCS': VCS,
  };

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

  // 숫자 포맷터 (3자리마다 콤마)
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "N/A";
    return num.toLocaleString();
  };

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
        <button onClick={() => navigate(-1)} className="back-button">Back to Project List</button>
      </div>
    );
  }

  // 정상 렌더링
  return (
    <div className="detail-page-container">
      <div className="detail-content-card">

        {/* 제목 + 상태 */}
        <div className="detail-header">
          <div className="title-status-group">
            <h2>{project.project_name}</h2>
            <span className={`status-pill status-${project.status?.toLowerCase()}`}>
              {project.status}
            </span>
          </div>
          <div className="detail-nav">
            <Link to={`/projects/${projectId}/detail`} className="nav-tab active">Summary</Link>
            <Link to={`/projects/${projectId}/credit`} className="nav-tab">Credits & Transactions</Link>
          </div>
        </div>

        <hr className="divider" />

        {/* 주요 정보 */}
        <div className="detail-grid">

          <div className="project-id-item">
            <h4>Project ID</h4>
            {/* <p className="project-id-text">{project.project_id}</p> */}
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={5}
              showBorder={false}
              className="custom-class"
            >
              {project.project_id}
            </GradientText>
          </div>

          <div className="detail-item">
            <h4>Country</h4>
            <p>{project.country}</p>
          </div>

          <div className="detail-item">
            <h4>Registry</h4>
            {registryImages[project.registry] ? (
              <div className="image-container">
                <img
                  src={registryImages[project.registry]}
                  alt={project.registry}
                  className="registry-image"
                />
              </div>
            ) : (
              <p>{project.registry}</p>
            )}
          </div>


          <div className="detail-item">
            <h4>Scope</h4>
            {scopeImages[project.scope] ? (
              <div className="image-container">
                <span className="scope-label">{project.scope}</span>
                <img
                  src={scopeImages[project.scope]}
                  alt={project.scope}
                  className="scope-image"
                />
              </div>
            ) : (
              <p>{project.scope}</p>
            )}
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
            <p>{project.verifier ?? "N/A"}</p>
          </div>

          <div className="detail-item">
            <h4>Vintage (First Credit Year)</h4>
            <p>{project.vintage ?? "N/A"}</p>
          </div>

          <div className="detail-item">
            <h4>Estimated Annual Emission Reductions</h4>
            <p className="estimated-value">{formatNumber(project.estimated_annual_emission_reductions)} tCO₂e</p>
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
                className="document-link"
              >
                View Registry Document
              </a>
            </p>
          </div>

        </div>

        <hr className="divider" />

        {/* 뒤로가기 */}
        <div className="detail-actions">
          <button onClick={() => navigate(-1)} className="back-button">
            Back to Project List
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProjectDetailPage;
