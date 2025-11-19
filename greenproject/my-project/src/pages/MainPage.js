import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInfo, FiSliders, FiFileText } from 'react-icons/fi';
import './MainPage.css';
import axios from 'axios';


function MainPage() {
  const [topNews, setTopNews] = useState([]);

    useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          "http://ec2-52-78-72-83.ap-northeast-2.compute.amazonaws.com:3001/news"
        );

        const newsArray = res.data['articles'].slice(0,3)
        console.log('시발람', newsArray)

        setTopNews(newsArray);
      } catch (error) {
        console.error("뉴스 가져오기 오류:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="main-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Tracking Global Climate Finance, Transparently.</h1>
          <p>
            Unlock insights into funding flows, project impacts, and the future of sustainable
            investment with our comprehensive data platform.
          </p>
          <Link to="/projects/1" className="cta-button">
            Explore the Dashboard
          </Link>
        </div>
      </section>

      {/* Explore Section */}
     <section className="explore-section">
      <h2>Explore Voluntary Market Flows</h2>
          <iframe
            className="report-container"
            src="https://app.powerbi.com/view?r=eyJrIjoiMTQwMTBkZWEtOWVmZS00Y2I1LWE1OTktMDQ1MzFjMjU2MzVjIiwidCI6IjUzYTRjNzZkLWI2MjUtNGFhNi1hMTAzLWQ0M2MyYzIxYTMxMiIsImMiOjl9"
            frameBorder="0"
            allowFullScreen={true}
            title="climate-report"
          />
      </section>


      {/* 메인페이지 설명 */}
      <section className="features-section">
        <div className="feature-card">
          <FiInfo className="feature-icon" />
          <h3>What is Climate Finance?</h3>
          <p>Understand the fundamentals of local, national, and transnational financing that supports climate change mitigation and adaptation actions.</p>
        </div>
        <div className="feature-card">
          <FiSliders className="feature-icon" />
          <h3>Our Methodology</h3>
          <p>Discover how we collect, verify, and present our data to ensure the highest standards of accuracy and transparency.</p>
        </div>
        <div className="feature-card">
          <FiFileText className="feature-icon" />
          <h3>Featured Projects</h3>
          <p>Explore case studies and detailed reports on impactful projects that are driving sustainable change across the globe.</p>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="latest-updates-section">
        <h2>Latest Voluntary Market Issues</h2>
        <div className="updates-grid">
          {topNews.map((item, index) => (
            <div key={index} className="update-card">
              <img src={item.img} alt={item.title} className="update-image" />
              <div className="update-content">
                <p className="update-category">{item.category}</p>
                <h3>{item.headline}</h3>
                <p className="update-description">{item.snippet}</p>
                <a href={item.url} className="read-more-link">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MainPage;