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

  removeProject: async (id) => {
    try {
      const response = await axiosInstance.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.log('Error Removing Project', error);
      throw error;
    }
  },

  //사용자 관련
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


};