import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import './ProjectEditPage.css';

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

import { countries } from '../data/countries';
import { projectApi } from '../api/projectApi';

function ProjectEditPage() {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const topRef = useRef(null); // 스크롤 이동을 위한 ref 생성

    const [formData, setFormData] = useState({
        project_name: '',
        project_developer: '',
        registry: '',
        scope: '',
        type: '',
        country: '',
        description: '',
        methodology: '',
        baseline_summary: '',
        monitoring_plan: '',
        additionality: '',
        removal_or_reduction: '',
    });

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        console.log(formData);
    }, [formData])

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await projectApi.getUserProjectDetail(projectId);
                // API 응답 데이터가 formData 키와 일치한다고 가정하고 상태 업데이트
                // 만약 키가 다르다면 여기서 매핑이 필요할 수 있음
                setFormData({
                    project_name: data.project_name || '',
                    project_developer: data.developer_name || '',
                    registry: data.registry || '',
                    scope: data.scope || '',
                    type: data.type || '',
                    country: data.country || '',
                    description: data.description || '',
                    methodology: data.methodology || '',
                    baseline_summary: data.baseline_summary || '',
                    monitoring_plan: data.monitoring_plan || '',
                    additionality: data.additionality || '',
                    removal_or_reduction: data.removal_or_reduction || '',
                });
            } catch (error) {
                console.error("Error fetching project details:", error);
                setAlert({ type: 'error', message: '프로젝트 정보를 불러오는데 실패했습니다.' });
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    // Alert가 발생하면 상단으로 스크롤 이동
    useEffect(() => {
        if (alert && topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [alert]);

    useEffect(() => {
        console.log(formData)
    }, [formData])

    // Registry 목록 데이터
    const registries = [
        { name: 'ACR', image: ACR },
        { name: 'ART', image: ART },
        { name: 'CAR', image: CAR },
        { name: 'GLD', image: GLD },
        { name: 'VCS', image: VCS },
    ];

    // Scope 목록 데이터
    const scopes = [
        { name: 'Agriculture', image: Agriculture },
        { name: 'Carbon Capture & Storage', image: CCS },
        { name: 'Chemical Processes', image: Chemical },
        { name: 'Engineered Removal', image: Engineered },
        { name: 'Forestry & Land Use', image: Forestry },
        { name: 'Household & Community', image: Household },
        { name: 'Industrial & Commercial', image: Industrial },
        { name: 'Transportation', image: Transportation },
        { name: 'Waste Management', image: Waste },
    ];

    // 슬라이더 상태
    const [currentScopeIndex, setCurrentScopeIndex] = useState(0);
    const itemsPerView = 4; // 한 번에 보여줄 아이템 개수 (화면 크기에 따라 조정 가능)
    const maxIndex = Math.max(0, scopes.length - itemsPerView);

    const handlePrevScope = () => {
        setCurrentScopeIndex(prev => Math.max(0, prev - 1));
    };

    const handleNextScope = () => {
        setCurrentScopeIndex(prev => Math.min(maxIndex, prev + 1));
    };


    // Removal or Reduction 옵션 데이터
    const removalOptions = [
        {
            label: 'Impermanent Removal',
            value: 'Impermanent Removal',
            description: 'Short-term carbon storage (e.g., Forestry, Soil)',
            category: 'removal'
        },
        {
            label: 'Long Duration Removal',
            value: 'Long Duration Removal',
            description: 'Permanent storage (e.g., DAC, Mineralization)',
            category: 'removal'
        },
        {
            label: 'Reduction',
            value: 'Reduction',
            description: 'Reducing emissions from existing sources',
            category: 'reduction'
        },
        {
            label: 'Mixed',
            value: 'Mixed',
            description: 'Combination of removal and reduction activities',
            category: 'other'
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Registry 선택 핸들러
    const handleRegistrySelect = (registryName) => {
        setFormData(prev => ({
            ...prev,
            registry: registryName,
        }));
    };

    // Scope 선택 핸들러
    const handleScopeSelect = (scopeName) => {
        setFormData(prev => ({
            ...prev,
            scope: scopeName,
        }));
    };

    // Removal/Reduction 선택 핸들러
    const handleRemovalSelect = (value) => {
        setFormData(prev => ({
            ...prev,
            removal_or_reduction: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = [
            'project_name',
            'registry',
            'scope',
            'type',
            'removal_or_reduction',
            'methodology',
            'country',
            'project_developer',
            'description',
            'baseline_summary',
            'monitoring_plan',
            'additionality'
        ];

        const isMissing = requiredFields.some(field => !formData[field]);

        if (isMissing) {
            setAlert({ type: 'error', message: '필수 항목을 모두 입력해주세요.' });
            return;
        }

        try {
            await projectApi.editUserProject(projectId, formData);
            setAlert({ type: 'success', message: '프로젝트가 성공적으로 수정되었습니다.' });
            console.log('Submitted data:', formData);
            // 성공 후 목록 페이지로 이동하거나 머무를 수 있음. 여기서는 잠시 후 이동하도록 설정 가능
            // setTimeout(() => navigate('/user/projects'), 1500);
        } catch (error) {
            console.error("Failed to update project:", error);
            setAlert({ type: 'error', message: '프로젝트 수정에 실패했습니다.' });
        }
    };

    return (
        <div className="project-edit-page">
            <div className="page-header" ref={topRef}>
                <p className="breadcrumb">프로젝트 수정</p>
            </div>

            {alert && (
                <div className={`alert alert-${alert.type}`}>
                    <strong>{alert.type === 'success' ? 'Success' : 'Error'}</strong>
                    {alert.message}
                    {alert.type === "success" ? <Link to={`/projects/waiting/detail/${projectId}`} className="add-project-btn">프로젝트 상세로 이동</Link> : null}
                </div>
            )}

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-grid">

                    <div className="form-group full-width">
                        <label htmlFor="project_name">Project Name*</label>
                        <input
                            type="text"
                            id="project_name"
                            name="project_name"
                            placeholder="등록할 프로젝트 이름"
                            value={formData.project_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Registry to Register*</label>
                        <div className="registry-selection-grid">
                            {registries.map((reg) => (
                                <div
                                    key={reg.name}
                                    className={`registry-option ${formData.registry === reg.name ? 'selected' : ''}`}
                                    onClick={() => handleRegistrySelect(reg.name)}
                                >
                                    <img src={reg.image} alt={reg.name} />
                                    {/* <span className="registry-name">{reg.name}</span> */}
                                </div>
                            ))}
                        </div>
                        {/* 접근성을 위한 hidden input */}
                        <input
                            type="hidden"
                            name="registry_"
                            value={formData.registry}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Scope*</label>
                        <div className="scope-slider-wrapper">
                            <button
                                type="button"
                                className="slider-btn prev-btn"
                                onClick={handlePrevScope}
                                disabled={currentScopeIndex === 0}
                            >
                                &lt;
                            </button>

                            <div className="scope-slider-container">
                                <div
                                    className="scope-slider-track"
                                    style={{ transform: `translateX(-${currentScopeIndex * (140 + 20)}px)` }} // 아이템 너비 140 + gap 20
                                >
                                    {scopes.map((scope, index) => (
                                        <div
                                            key={`${scope.name}-${index}`}
                                            className={`scope-option ${formData.scope === scope.name ? 'selected' : ''}`}
                                            onClick={() => handleScopeSelect(scope.name)}
                                            title={scope.name}
                                        >
                                            <img src={scope.image} alt={scope.name} />
                                            <span className="scope-name">{scope.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="slider-btn next-btn"
                                onClick={handleNextScope}
                                disabled={currentScopeIndex === maxIndex}
                            >
                                &gt;
                            </button>
                        </div>
                        <input
                            type="hidden"
                            name="scope"
                            value={formData.scope}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="type">Type*</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            placeholder="프로젝트 세부 종류"
                            value={formData.type}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Removal or Reduction*</label>
                        <div className="removal-grid">
                            {removalOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={`removal-option category-${option.category} ${formData.removal_or_reduction === option.value ? 'selected' : ''}`}
                                    onClick={() => handleRemovalSelect(option.value)}
                                >
                                    <span className="removal-label">{option.label}</span>
                                    <span className="removal-desc">{option.description}</span>
                                </div>
                            ))}
                        </div>
                        <input
                            type="hidden"
                            name="removal_or_reduction"
                            value={formData.removal_or_reduction}
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="country">Country*</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            list="country-list"
                            placeholder="국가 검색 또는 입력"
                            value={formData.country}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        <datalist id="country-list">
                            {countries.map((country, index) => (
                                <option key={index} value={country} />
                            ))}
                        </datalist>
                    </div>

                    <br></br>
                    <div className="form-group">
                        <label htmlFor="project_developer">Project Developer*</label>
                        <input
                            type="text"
                            id="project_developer"
                            name="project_developer"
                            placeholder="프로젝트 관리자"
                            value={formData.project_developer}
                            onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group full-width">
                        <label htmlFor="description">description*</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="2"
                            placeholder="등록할 프로젝트에 대한 설명을 입력해주세요"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="methodology">Methodology*</label>
                        <textarea
                            id="methodology"
                            name="methodology"
                            rows="2"
                            placeholder="등록할 프로젝트의 방법론을 입력해주세요"
                            value={formData.methodology}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="baseline_summary">Baseline Summary*</label>
                        <textarea
                            id="baseline_summary"
                            name="baseline_summary"
                            rows="4"
                            placeholder="등록할 프로젝트의 베이스라인을 입력해주세요"
                            value={formData.baseline_summary}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="monitoring_plan">Monitoring Plan*</label>
                        <textarea
                            id="monitoring_plan"
                            name="monitoring_plan"
                            rows="4"
                            placeholder="등록할 프로젝트의 모니터링 방법을 입력해주세요"
                            value={formData.monitoring_plan}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="additionality">Additionality*</label>
                        <textarea
                            id="additionality"
                            name="additionality"
                            rows="4"
                            placeholder="등록할 프로젝트의 추가성을 입력해주세요"
                            value={formData.additionality}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <br></br>

                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate(`/projects/${projectId}/detail`)}
                    >
                        취소
                    </button>
                    <button type="submit" className="submit-btn">수정 사항 저장</button>
                </div>
            </form>
        </div>
    );
}

export default ProjectEditPage;