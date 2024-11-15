import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import './styles.scss'
import AOS from 'aos'
import 'aos/dist/aos.css'
import TournamentService from '../../services/apiTournament'

function ListTeamCompetition() {
  const [listTeams, setListTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [idTournament, setIdTournament] = useState('')
  useEffect(() => {
    const adminStatus = localStorage.getItem('admin')
    setIsAdmin(adminStatus === 'true')

    const getAllTournaments = async () => {
      try {
        const result = await TournamentService.getAll()

        if (result.success && result.data.data) {
          setIdTournament(result.data._id)
          setListTeams(result.data.data)
        } else {
          console.error('Failed to fetch teams:', result.error)
        }
      } catch (error) {
        console.error('Error fetching teams:', error)
      } finally {
        setLoading(false)
      }
    }

    getAllTournaments()
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })
  }, [])

  const handleUpdateScore = async (tableIndex, teamIndex, currentScore) => {
    if (!isAdmin) return

    const newScore = prompt('Nhập điểm mới:', currentScore)

    if (newScore === null || newScore === '') return

    const scoreNumber = parseInt(newScore)
    if (isNaN(scoreNumber)) {
      alert('Vui lòng nhập số hợp lệ!')
      return
    }

    try {
      if (!listTeams[0]?._id) {
        alert('Không tìm thấy thông tin giải đấu!')
        return
      }

      const result = await TournamentService.updateScore({
        tournamentId: idTournament,
        tableIndex,
        teamIndex,
        newScore: scoreNumber
      })

      if (result.success) {
        const newListTeams = [...listTeams]
        newListTeams[tableIndex].teams[teamIndex].score = scoreNumber
        setListTeams(newListTeams)
      } else {
        alert('Cập nhật điểm thất bại: ' + (result.message || 'Lỗi không xác định'))
      }
    } catch (error) {
      console.error('Error updating score:', error)
      alert('Có lỗi xảy ra khi cập nhật điểm!')
    }
  }

  const sortedTeams = listTeams?.length
    ? listTeams.map(group => ({
        ...group,
        teams: [...group.teams].sort((a, b) => b.score - a.score)
      }))
    : []

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="list-team__container">
      <Header title="Danh sách các đội tham gia thi đấu chung kết ngày 17/11/2024" />
      <div className="list-team__group">
        {sortedTeams.map((team, tableIndex) => (
          <div
            key={`${team.table}-${tableIndex}`}
            className="team-group"
            data-aos="fade-up"
            data-aos-delay={tableIndex * 100}
          >
            <div className="team-group__top">
              <span>{team.table}</span>
            </div>
            <div className="team-group__content">
              {team.teams.map((item, teamIndex) => (
                <div key={`${item.name}-${teamIndex}`} className="team-item__wrap">
                  <div className="team-item__info">
                    <div className="item-img">
                      <img
                        src={item.logo}
                        alt={item.name}
                        onError={e => {
                          e.target.onerror = null
                          e.target.src = '/default-team-logo.png'
                        }}
                      />
                    </div>
                    <span className="item-name">{item.name}</span>
                  </div>
                  <div
                    className={`team-item-score ${isAdmin ? 'admin-mode' : ''}`}
                    onClick={() => handleUpdateScore(tableIndex, teamIndex, item.score)}
                  >
                    <span>{item.score}</span>
                    {isAdmin && <div className="edit-hint">Click để sửa</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListTeamCompetition
