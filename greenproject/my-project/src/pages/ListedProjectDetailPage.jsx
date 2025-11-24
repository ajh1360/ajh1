import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectApi } from '../api/projectApi';
import './ListedProjectDetailPage.css';

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

function ListedProjectDetailPage() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userReaction, setUserReaction] = useState(null);

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
        const fetchProjectAndReaction = async () => {
            try {
                setLoading(true);
                setError(null);

                // 프로젝트 정보와 사용자 리액션을 병렬로 가져옴
                const [projectData, reactionData] = await Promise.all([
                    projectApi.getUserProjectDetail(projectId),
                    projectApi.getReaction(projectId).catch(() => ({ reaction: null })) // 에러 시 null 처리
                ]);

                setProject(projectData);
                setUserReaction(reactionData.reaction);
            } catch (err) {
                console.error('Failed to fetch project data:', err);
                setError('Failed to load project data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjectAndReaction();
    }, [projectId]);

    const handleLike = async () => {
        try {
            await projectApi.postReaction(projectId, { reaction: 'like' });
            // 리액션 후 데이터 갱신
            const [projectData, reactionData] = await Promise.all([
                projectApi.getUserProjectDetail(projectId),
                projectApi.getReaction(projectId)
            ]);
            setProject(projectData);
            setUserReaction(reactionData.reaction);
        } catch (error) {
            console.error("Failed to post reaction:", error);
        }
    };

    const handleDislike = async () => {
        try {
            await projectApi.postReaction(projectId, { reaction: 'dislike' });
            // 리액션 후 데이터 갱신
            const [projectData, reactionData] = await Promise.all([
                projectApi.getUserProjectDetail(projectId),
                projectApi.getReaction(projectId)
            ]);
            setProject(projectData);
            setUserReaction(reactionData.reaction);
        } catch (error) {
            console.error("Failed to post reaction:", error);
        }
    };

    if (loading) {
        return (
            <div className="detail-page-container">
                <div className="loading">Loading project details...</div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="detail-page-container not-found">
                <h2>Error</h2>
                <p>{error || 'Project not found.'}</p>
                <button onClick={() => navigate(-1)} className="back-button">Back to List</button>
            </div>
        );
    }

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
                </div>

                <hr className="divider" />

                {/* 주요 정보 */}
                <div className="detail-grid">
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
                        <h4>Country</h4>
                        <p>{project.country}</p>
                    </div>

                    <div className="detail-item">
                        <h4>Project Type</h4>
                        <p>{project.type}</p>
                    </div>

                    <div className="detail-item">
                        <h4>Removal or Reduction</h4>
                        <p>{project.removal_or_reduction}</p>
                    </div>


                    <div className="detail-item full-width">
                        <h4>Description</h4>
                        <p>{project.description}</p>
                    </div>

                    <div className="detail-item full-width">
                        <h4>Methodology</h4>
                        <p>{project.methodology}</p>
                    </div>

                    <div className="detail-item full-width">
                        <h4>Baseline Summary</h4>
                        <p>{project.baseline_summary}</p>
                    </div>

                    <div className="detail-item full-width">
                        <h4>Monitoring Plan</h4>
                        <p>{project.monitoring_plan}</p>
                    </div>

                    <div className="detail-item full-width">
                        <h4>Additionality</h4>
                        <p>{project.additionality}</p>
                    </div>

                </div>

                <div className="vote-section">
                    <button
                        onClick={handleLike}
                        className={`vote-btn like-btn ${userReaction === 'like' ? 'active' : ''}`}
                    >
                        <span className="vote-icon">👍</span>
                        Support this project
                        <span className="vote-count">{project.like_count} votes</span>
                    </button>
                    <button
                        onClick={handleDislike}
                        className={`vote-btn dislike-btn ${userReaction === 'dislike' ? 'active' : ''}`}
                    >
                        <span className="vote-icon">👎</span>
                        Not convinced
                        <span className="vote-count">{project.dislike_count} votes</span>
                    </button>
                </div>

                <hr className="divider" />

                {/* 뒤로가기 */}
                <div className="detail-actions">
                    <button onClick={() => navigate(-1)} className="back-button">
                        Back to List
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ListedProjectDetailPage;
