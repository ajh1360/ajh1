import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ProjectCreditPage.css';

function ProjectCreditPage() {
  const { projectId } = useParams();

  const [creditData, setCreditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreditData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(`/projects/${projectId}/credit`);
        console.log(response.data);
        setCreditData(response.data);
      } catch (err)
{
        console.error('Failed to fetch project credit data:', err);
        setError('Failed to load project credit data.');
      } finally {
        setLoading(false);
      }
    };
    fetchCreditData();
  }, [projectId]);

  // 1. 로딩 상태를 먼저 확인합니다.
  if (loading) {
    return <div className="detail-page-container"><div className="loading">Loading...</div></div>;
  }

  // 2. 에러가 발생했거나, 데이터가 없는 경우를 확인합니다.
  if (error || !creditData) {
    return (
      <div className="detail-page-container not-found">
        <div className="detail-content-card">
          <p className="error-message">{error || 'Project credit data not found.'}</p>
          <div className="detail-actions">
            <Link to="/projects" className="back-button">Back to List</Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. ⭐️ 이 위치로 이동: creditData가 유효한 객체임이 보장된 후 차트 데이터를 구성합니다.
  // const chartData = {
  //    "2023" : {"issued" : creditData['issued_2023'], "retired" : creditData['retired_2023']},
  //    "2024" : {"issued" : creditData['issued_2024'], "retired" : creditData['retired_2024']},
  //    "2025" : {"issued" : creditData['issued_2025'], "retired" : creditData['retired_2025']},
  //   }

  const chartData = [
    {"year" : 2023, "Issued" : creditData['issued_2023'], "Retired" : creditData['retired_2023']},
    {"year" : 2024, "Issued" : creditData['issued_2024'], "Retired" : creditData['retired_2024']},
    {"year" : 2025, "Issued" : creditData['issued_2025'], "Retired" : creditData['retired_2025']}
  ]



  // 4. 모든 검사를 통과했으므로, 정상적으로 페이지를 렌더링합니다.
  return (
    <div className="detail-page-container">
      <div className="detail-content-card">
        {/* --- 헤더 & 탭 네비게이션 --- */}
        <div className="detail-header">
          <h2>{creditData.project_id}</h2>
          <div className="detail-nav">
            <Link to={`/projects/${projectId}/detail`} className="nav-tab">Summary</Link>
            <Link to={`/projects/${projectId}/credit`} className="nav-tab active">Credits & Transactions</Link>
          </div>
        </div>
        <div className="divider"></div>

        {/* --- 크레딧 개요 --- */}
        <div className="credits-overview-grid">
          <div className="overview-item">
            <h4>Total Issued</h4>
            <p>{creditData.total_issued}</p>
          </div>
          <div className="overview-item">
            <h4>Total Retired</h4>
            <p>{creditData.total_retired}</p>
          </div>
          <div className="overview-item">
            <h4>Transactions</h4>
            <p>{creditData.total_transactions_count.toLocaleString()}</p>
          </div>
        </div>
        <div className="divider"></div>

        {/* --- 연도별 크레딧 차트 --- */}
        <div className="chart-section">
          <h3>Credits Breakdown by Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="year" tick={{ fill: '#c0c0c0' }} stroke="rgba(255, 255, 255, 0.2)" />
              <YAxis tick={{ fill: '#c0c0c0' }} stroke="rgba(255, 255, 255, 0.2)" />
              <Tooltip
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                contentStyle={{
                  backgroundColor: '#1a382b',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#fff'
                }}
              />
              <Legend wrapperStyle={{ color: '#c0c0c0' }} />
              <Bar dataKey="Issued" fill="#3ddc84" />
              <Bar dataKey="Retired" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="divider"></div>

        {/* --- 트랜잭션 테이블 --- */}
        <div className="transactions-section">
          <h3>All Transactions</h3>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Type</th>
                <th style={{ textAlign: 'right' }}>Quantity</th>
                <th style={{ textAlign: 'right' }}>Vintage</th>
                <th>Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {creditData.transactions.map((tx) => (
                <tr key={tx.transaction_id}>
                  <td>{tx.transaction_id}</td>
                  <td>
                    <span className={`transaction-pill type-${tx.transaction_type?.toLowerCase()}`}>
                      {tx.transaction_type}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>{tx.quantity.toLocaleString()}</td>
                  <td style={{ textAlign: 'right' }}>{tx.vintage}</td>
                  <td>{new Date(tx.transaction_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- 뒤로가기 버튼 --- */}
        <div className="detail-actions">
          <Link to="/projects/1" className="back-button">Back to Project List</Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCreditPage;