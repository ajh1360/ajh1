import axios from "axios";
import axiosInstance from "./axiosInstance";
export const projectApi = {

  // 프로젝트 관련
  getProjects: async (pageNo) => {
    try {
      const response = await axiosInstance.get(`/projects/${pageNo}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  getProjectDetail: async (projectId) => {
    try {
      const response = await axiosInstance.get(`/projects/${projectId}/detail`);
      return response.data;
    } catch (error) {
      console.error("Error fetching project detail:", error);
      throw error;
    }
  },

  searchProjects: async (pageNo, filters) => {
    try {
      const response = await axiosInstance.post(`/projects/search/${pageNo}`, filters);
      return response.data;
    } catch (error) {
      console.error("Error searching projects:", error);
      throw error;
    }
  },

  addNewProject: async (project) => {
    try {
      const response = await axiosInstance.post('/projects/new', project);
      return response.data;
    } catch (error) {
      console.error("Error Adding new Project", error)
      throw error;
    }
  },

  // removeProject: async (id) => {
  //   try {
  //     const response = await axiosInstance.delete(`/projects/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.log('Error Removing Project', error);
  //     throw error;
  //   }
  // },


  updateProject: async (id, project) => {
    try {
      const response = await axiosInstance.patch(`/projects/${id}`, project);
      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  // 등록 대기 중인 프로젝트 관련 API
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  getUserProjectsList: async (pageNo) => {
    try {
      const response = await axiosInstance.get(`/projects/waiting/${pageNo}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user projects:", error);
      throw error;
    }
  },

  // 등록 대기중인 프로젝트 세부 정보 불러오기 
  getUserProjectDetail: async (projectId) => {
    try {
      const response = await axiosInstance.get(`/projects/waiting/detail/${projectId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user project detail:", error);
      throw error;
    }
  },

  // 특정 프로젝트에 기록된 사용자의 리액션 들고오기
  getReaction: async (projectId) => {
    try {
      const response = await axiosInstance.get(`/projects/waiting/${projectId}/reaction`);
      return response.data;
    } catch (error) {
      console.error("Error fetching reaction:", error);
      throw error;
    }
  },

  // 프로젝트에 리액션 남기기
  postReaction: async (projectId, reaction) => {
    try {
      const response = await axiosInstance.post(`/projects/waiting/${projectId}/reaction`, reaction);
      return response.data;
    } catch (error) {
      console.error("Error posting reaction:", error);
      throw error;
    }
  },


  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  //사용자 관련
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  getUserInfo: async () => {
    try {
      const response = await axiosInstance.get(`/user/me`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post(`/auth/logout`);
      return response.data;
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  getUserProjects: async () => {
    try {
      const response = await axiosInstance.get(`/user/projects`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user projects:", error);
      throw error;
    }
  },

  // 뉴스 불러오기
  getNews: async () => {
    try {
      const response = await axiosInstance.get(`/news`);
      return response.data;
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  }

};