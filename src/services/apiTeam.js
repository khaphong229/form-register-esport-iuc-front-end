import axiosInstance from './api'

const ENDPOINTS = {
  REGISTER: '/register',
  UPLOAD: '/upload'
}

class TeamService {
  static async createTeam(data) {
    try {
      const response = await axiosInstance.post(ENDPOINTS.REGISTER, data)
      return {
        success: true,
        data: response
      }
    } catch (error) {
      return {
        success: false,
        error: {
          status: error.status,
          message: error.message
        }
      }
    }
  }

  static async getTeams(params = {}) {
    try {
      const response = await axiosInstance.get(ENDPOINTS.REGISTER, { params })
      return {
        success: true,
        data: response
      }
    } catch (error) {
      return {
        success: false,
        error: {
          status: error.status,
          message: error.message
        }
      }
    }
  }

  static async uploadFile(formData) {
    try {
      // Override default content type for file upload
      const response = await axiosInstance.post(ENDPOINTS.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return {
        success: true,
        data: response
      }
    } catch (error) {
      return {
        success: false,
        error: {
          status: error.status,
          message: error.message
        }
      }
    }
  }
}

export default TeamService
