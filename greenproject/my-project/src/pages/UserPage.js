import React from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
  // 실제로는 API나 Context에서 받아올 데이터입니다. (예시 데이터)
  const userInfo = {
    name: '김개발',
    email: 'dev.kim@example.com',
    joinDate: '2023-11-20',
    role: 'Full Stack Developer'
  };

  const myProjects = [
    { id: 1, title: '리액트 포트폴리오 사이트', status: '진행중' },
    { id: 2, title: '투두 리스트 앱', status: '완료' },
  ];

  return (
    <div className="user-page-container">
      <div className="user-profile-card">
        <div className="profile-header">
            <div className="profile-avatar" />
            <h2>{userInfo.name}</h2>
            <p className="role">{userInfo.role}</p>
        </div>
        
        <div className="profile-details">
          <div className="detail-item">
            <span className="label">이메일</span>
            <span className="value">{userInfo.email}</span>
          </div>
          <div className="detail-item">
            <span className="label">가입일</span>
            <span className="value">{userInfo.joinDate}</span>
          </div>
        </div>

        <div className="profile-actions">
            <button className="edit-btn">정보 수정</button>
            <button className="logout-btn">로그아웃</button>
        </div>
      </div>

      <div className="user-projects-section">
        <h3>내 프로젝트 관리</h3>
        <div className="project-list-mini">
          {myProjects.length > 0 ? (
            myProjects.map((project) => (
              <div key={project.id} className="mini-project-item">
                <span className="project-title">{project.title}</span>
                <span className={`project-status status-${project.status === '완료' ? 'done' : 'ing'}`}>
                  {project.status}
                </span>
                <Link to={`/projects/${project.id}/detail`} className="detail-link">보기</Link>
              </div>
            ))
          ) : (
            <p className="no-projects">등록된 프로젝트가 없습니다.</p>
          )}
        </div>
        <div className="add-project-link-area">
            <Link to="/projects/add" className="add-link">+ 새 프로젝트 등록하기</Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

//http://localhost:3000/mypage <- 주소