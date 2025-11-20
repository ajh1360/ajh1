import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ProjectListPage from './pages/ProjectListPage';
import AddProjectPage from './pages/AddProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectCreditPage from './pages/ProjectCreditPage';
import UserPage from './pages/UserPage'; // 1. import 추가
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<UserPage />} /> 
          <Route path="/projects/:pageNo" element={<ProjectListPage />} />
          <Route path="/projects/add" element={<AddProjectPage />} />
          <Route path="/projects/:projectId/detail" element={<ProjectDetailPage />} />
          <Route path="/projects/:projectId/credit" element={<ProjectCreditPage/>}/>
        </Routes>
      </main>
      
    </BrowserRouter>
  );
}

export default App;