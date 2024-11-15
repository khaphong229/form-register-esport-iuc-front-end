import axiosInstance from './api'

class TournamentService {
  static async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(
        '/tournament',
        { params },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      return {
        success: true,
        data: response[0]
      }
    } catch (error) {
      return {
        success: false,
        error: {
          status: error?.response?.status,
          message: error?.message
        }
      }
    }
  }

  static async updateScore(data) {
    try {
      const response = await axiosInstance.put('/tournament/update-score', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: {
          status: error?.response?.status,
          message: error?.message
        }
      }
    }
  }
}

export default TournamentService
