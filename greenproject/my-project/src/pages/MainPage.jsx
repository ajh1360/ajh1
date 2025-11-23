import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiInfo, FiSliders, FiFileText } from 'react-icons/fi';
import './MainPage.css';
import axios from 'axios';
import Orb from '../components/ui/Orb';
import { projectApi } from '../api/projectApi';

function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });
    const { current } = domRef;
    if (current) observer.observe(current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

function MainPage() {
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await projectApi.getNews();

        const newsArray = res['articles'].slice(0, 3)


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
        <div className="hero-background">
          <Orb
            hue={120}
            hoverIntensity={0.4}
            rotateOnHover={true}
            forceHoverState={false}
          />
        </div>
        <div className="hero-content-wrapper">
          <FadeInSection>
            <div className="hero-content">
              <h1>Explore Every Voluntary Market Projects & Offsets</h1>
              <p>
                Discover the latest updates and insights into the voluntary market, including project
                developments, regulatory changes, and market trends.
              </p>
              <Link to="/projects/1" className="cta-button">
                Explore the Dashboard
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Explore Section */}
      <FadeInSection>
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
      </FadeInSection>

      {/* 메인페이지 설명 */}
      <FadeInSection>
        <section className="features-section">
          <div className="feature-card">
            <FiInfo className="feature-icon" />
            <h3>What is Voluntary Market?</h3>
            <p>Voluntary market is a market where carbon credits are bought and sold voluntarily, without mandatory compliance. It is a key component of the global carbon market and plays a crucial role in supporting climate change mitigation and adaptation actions.</p>
          </div>
          <div className="feature-card">
            <FiSliders className="feature-icon" />
            <h3>Credits And Transactions</h3>
            <p>You can view the credits and transactions of each project on the platform.</p>
          </div>
          <div className="feature-card">
            <FiFileText className="feature-icon" />
            <h3>Data Source</h3>
            <p>Every voluntary market project is registered and listed on the platform, providing a transparent and accessible view of the market.</p>
          </div>
        </section>
      </FadeInSection>

      {/* Latest Updates Section */}
      <FadeInSection>
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
      </FadeInSection>
    </div>
  );
}

export default MainPage;