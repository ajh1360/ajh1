import axiosInstance from "./axiosInstance"; 
export const projectApi = {

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
};