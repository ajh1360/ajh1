import React, { useState, useEffect } from 'react';
import { projectApi } from '../api/projectApi';
import './AccountPage.css';

function AccountPage() {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
        };

        fetchUserInfo();
    }, []);

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // 표시할 필드 정의 (키 -> 라벨)
    const fieldMapping = {
        email: '이메일',
        name: '이름',
        role: '권한',
        created_at: '가입일',
        last_login: '마지막 로그인'
    };

    // Role에 따른 렌더링 처리
    const renderRole = (role) => {
        // API 값이 영어일 경우를 대비해 매핑 (필요 시 수정 가능)
        let displayRole = role;
        let roleClass = 'role-badge';

        if (role === 'admin' || role === 'PROJECT_MANAGER' || role === '프로젝트 관리자') {
            displayRole = '프로젝트 관리자';
            roleClass += ' role-admin';
        } else {
            displayRole = '일반 사용자';
            roleClass += ' role-user';
        }

        return <span className={roleClass}>{displayRole}</span>;
    };

    if (isLoading) {
        return <div className="account-page-container"><div className="loading">정보를 불러오는 중...</div></div>;
    }

    if (error) {
        return <div className="account-page-container"><div className="error">{error}</div></div>;
    }

    return (
        <div className="account-page-container">
            <div className="account-card">
                <h2>내 정보</h2>
                {userInfo ? (
                    <div className="info-list">
                        {Object.entries(fieldMapping).map(([key, label]) => {
                            // userInfo에 해당 키가 없으면 렌더링하지 않음
                            if (userInfo[key] === undefined) return null;

                            let value = userInfo[key];

                            // 특수 처리 (Role, Date)
                            if (key === 'role') {
                                value = renderRole(value);
                            } else if (key === 'created_at' || key === 'last_login') {
                                value = formatDate(value);
                            }

                            return (
                                <div key={key} className="info-item">
                                    <span className="info-label">{label}</span>
                                    <span className="info-value">{value}</span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="no-data">사용자 정보가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default AccountPage;
