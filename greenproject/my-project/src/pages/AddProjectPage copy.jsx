import React, { useState } from 'react';
import './AddProjectPage.css'; 
function AddProjectPage() {

  const [formData, setFormData] = useState({
    projectName: '',
    region: '',
    status: '',
    type: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    contactPerson: '',
  });

 
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', message: '...' }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['projectName', 'region', 'status', 'type'];
    const isMissingField = requiredFields.some(field => !formData[field]);

    if (isMissingField) {
      setAlert({ type: 'error', message: 'Please fill in all required fields.' });
    } else {
      setAlert({ type: 'success', message: 'Project added successfully.' });
      console.log('Submitted data:', formData);

    }
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
            <label htmlFor="projectName">Project Name*</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              placeholder="프로젝트 이름을 입력하세요"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>

          {/* Region */}
          <div className="form-group">
            <label htmlFor="region">Region*</label>
            <select id="region" name="region" value={formData.region} onChange={handleChange}>
              <option value="">Select Region</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
            </select>
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="status">Status*</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Type (full-width) */}
          <div className="form-group full-width">
            <label htmlFor="type">Type*</label>
            <select id="type" name="type" value={formData.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="type-a">Type A</option>
              <option value="type-b">Type B</option>
            </select>
          </div>

          {/* Description (full-width) */}
          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter a brief project description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          
          {/* Start Date */}
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
          </div>

          {/* End Date */}
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
          </div>
          
          {/* Budget */}
          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <input
              type="text"
              id="budget"
              name="budget"
              placeholder="$ e.g., 50000"
              value={formData.budget}
              onChange={handleChange}
            />
          </div>

          {/* Contact Person */}
          <div className="form-group">
            <label htmlFor="contactPerson">Contact Person</label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              placeholder="Enter contact name"
              value={formData.contactPerson}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 폼 하단 버튼 영역 */}
        <div className="form-actions">
          <button type="button" className="cancel-btn">취소</button>
          <button type="submit" className="submit-btn">프로젝트 추가</button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectPage;