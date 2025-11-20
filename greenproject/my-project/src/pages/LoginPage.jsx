// src/pages/LoginPage.js

import React, { useState } from 'react';
// 아이콘들을 react-icons 라이브러리에서 가져옵니다.
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './LoginPage.css';

function LoginPage() {
  // 아이디, 비밀번호, 비밀번호 보이기/숨기기 상태를 관리합니다.
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 비밀번호 보이기/숨기기 상태를 토글하는 함수입니다.
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // 폼 제출 이벤트를 처리하는 함수입니다. (지금은 콘솔에 출력만 합니다)
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지가 새로고침되는 것을 방지합니다.
    console.log('ID:', id, 'Password:', password);
    alert(`ID: ${id}\nPassword: ${password}`);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {/* 아이디 입력란 */}
          <div className="form-group">
            <label>아이디</label>
            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input
                type="text"
                placeholder="Enter your ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
          </div>

          {/* 비밀번호 입력란 */}
          <div className="form-group">
            <label>비밀번호</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* 비밀번호 보이기/숨기기 토글 아이콘 */}
              <div className="pw-toggle-icon" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
          </div>
          <button type="submit" className="login-btn" >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;