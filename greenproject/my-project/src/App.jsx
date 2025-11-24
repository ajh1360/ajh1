import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ProjectListPage from './pages/ProjectListPage';
import ListedProjectListPage from './pages/ListedProjectListPage';
import ListedProjectDetailPage from './pages/ListedProjectDetailPage';
import AddProjectPage from './pages/AddProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectCreditPage from './pages/ProjectCreditPage';
import AccountPage from './pages/AccountPage';
import UserProjectsPage from './pages/UserProjectsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectEditPage from './pages/ProjectEditPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/projects/:pageNo" element={<ProjectListPage />} />
          <Route path="/projects/waiting/:pageNo" element={<ListedProjectListPage />} />
          <Route path="/projects/waiting/detail/:projectId" element={<ListedProjectDetailPage />} />
          <Route path="/projects/add" element={<AddProjectPage />} />
          <Route path="/projects/:projectId/detail" element={<ProjectDetailPage />} />
          <Route path="/projects/:projectId/credit" element={<ProjectCreditPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/user/projects" element={<UserProjectsPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/projects/:projectId/edit" element={<ProjectEditPage />} />
        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;