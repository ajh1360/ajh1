import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProjectPage.css';

function AddProjectPage() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    project_name: '',
    registry_to_register: '',
    scope: '',
    type: '',
    removal_or_reduction: '',
    methodology: '',
    country: '',
    project_developer: '',
    estimated_annual_emission_reductions: '',
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      'project_name',
      'registry_to_register',
      'scope',
      'type',
      'removal_or_reduction',
      'methodology',
      'country',
      'project_developer',
      'estimated_annual_emission_reductions'
    ];

    const isMissing = requiredFields.some(field => !formData[field]);

    if (isMissing) {
      setAlert({ type: 'error', message: '필수 항목을 모두 입력해주세요.' });
      return;
    }

    setAlert({ type: 'success', message: '프로젝트가 성공적으로 추가되었습니다.' });
    console.log('Submitted data:', formData);
  };

  return (
    <div className="add-project-page">
      <div className="page-header">
        <p className="breadcrumb">Project List / Add New Project</p>
        <h2>새 프로젝트 추가</h2>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <strong>{alert.type === 'success' ? 'Success' : 'Error'}</strong>
          {alert.message}
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

          <div className="form-group">
            <label htmlFor="registry_to_register">Registry to Register*</label>
            <select
              id="registry_to_register"
              name="registry_to_register"
              value={formData.registry_to_register}
              onChange={handleChange}
            >
              <option value="">Select Registry</option>
              <option value="ACR">ACR</option>
              <option value="VCS">VCS</option>
              <option value="GLD">GLD</option>
              <option value="ART">ART</option>
              <option value="CAR">CAR</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="scope">Scope*</label>
            <select
              id="scope"
              name="scope"
              value={formData.scope}
              onChange={handleChange}
            >
              <option value="">Select Scope</option>
              <option value="Chemical Processes">Chemical Processes</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Forestry & Land Use">Forestry & Land Use</option>
              <option value="Waste Management">Waste Management</option>
              <option value="Industrial & Commercial">Industrial & Commercial</option>
              <option value="Carbon Capture & Storage">Carbon Capture & Storage</option>
              <option value="Engineered Removal">Engineered Removal</option>
              <option value="Household & Community">Household & Community</option>
              <option value="Transportation">Transportation</option>
            </select>
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
            <label htmlFor="removal_or_reduction">Removal or Reduction*</label>
            <select
              id="removal_or_reduction"
              name="removal_or_reduction"
              value={formData.removal_or_reduction}
              onChange={handleChange}
            >
              <option value="">Select Target</option>
              <option value="Removal">Impermanent Removal</option>
              <option value="Reduction">Long Duration Removal</option>
              <option value="Reduction">Reduction</option>
              <option value="Reduction">Mixed</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="methodology">Methodology*</label>
            <textarea
              id="methodology"
              name="methodology"
              rows="4"
              placeholder="등록할 프로젝트의 방법론"
              value={formData.methodology}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="country">Country*</label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="프로젝트 국가"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="estimated_annual_emission_reductions">
              Estimated Annual Emission Reductions (tCO₂e)*
            </label>
            <input
              type="number"
              id="estimated_annual_emission_reductions"
              name="estimated_annual_emission_reductions"
              placeholder="예상 감축량 입력"
              value={formData.estimated_annual_emission_reductions}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/projects')}
          >
            취소
          </button>
          <button type="submit" className="submit-btn">프로젝트 추가</button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectPage;