import React, { useEffect, useState } from 'react'
import './styles.scss'
import Header from '../../components/Header'
import solo from '../../assets/images/solo.png'
import competition_teams from '../../utils/default'
import { Link } from 'react-router-dom'
import { DoubleRightOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { formatTime } from '../../utils/helpers'
import { Tooltip } from 'antd'

function Competition() {
  const [teams, setTeams] = useState(
    competition_teams.map(team => ({
      ...team,
      isTimerRunning: false,
      time: 0
    }))
  )

  const getCurrentTimeSlot = () => {
    const currentTime = new Date()
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()

    if (hours === 9 && minutes < 30) return { start: 0, end: 8 } // 9:00 - 9:30
    if (hours === 9 && minutes >= 30) return { start: 8, end: 16 } // 9:30 - 10:00
    if (hours === 10 && minutes < 30) return { start: 16, end: 24 } // 10:00 - 10:30
    if (hours === 10 && minutes >= 30) return { start: 24, end: 32 } // 10:30 - 11:00
    if (hours === 11 && minutes < 30) return { start: 32, end: 40 } // 11:00 - 11:30
    if (hours === 11 && minutes >= 30) return { start: 40, end: 48 } // 11:30 - 12:00

    return { start: 0, end: 8 }
  }

  const [currentSlot, setCurrentSlot] = useState(getCurrentTimeSlot())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlot(getCurrentTimeSlot())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const intervals = teams.map((team, index) => {
      let interval
      if (team.isTimerRunning) {
        interval = setInterval(() => {
          setTeams(prevTeams => {
            const updatedTeams = [...prevTeams]
            updatedTeams[index] = { ...updatedTeams[index], time: updatedTeams[index].time + 1 }
            return updatedTeams
          })
        }, 1000)
      }
      return interval
    })

    return () => {
      intervals.forEach(interval => interval && clearInterval(interval))
    }
  }, [teams])

  const handleScoreClick = (index, isTeam1) => {
    setTeams(prevTeams => {
      const updatedTeams = [...prevTeams]
      if (isTeam1) {
        updatedTeams[index].soDiemTeam1 += 1
      } else {
        updatedTeams[index].soDiemTeam2 += 1
      }
      localStorage.setItem('teams', JSON.stringify(updatedTeams)) // Store the updated teams in localStorage
      return updatedTeams
    })
  }

  const startTimer = index => {
    setTeams(prevTeams => {
      const updatedTeams = [...prevTeams]
      updatedTeams[index].isTimerRunning = !updatedTeams[index].isTimerRunning
      return updatedTeams
    })
  }

  const { start, end } = currentSlot

  return (
    <div className="container competition__container">
      <Header title="Bảng thi đấu hiện tại" />
      <div className="list-team__navigate">
        <DoubleRightOutlined />
        <Link to="/list-teams" className="text-navigate">
          Xem danh sách các đội thi đấu
        </Link>
      </div>

      {/* Render teams based on the current time slot */}
      <div className="competition-team__group-wrap">
        {teams.slice(start, end).map((team, index) => (
          <div key={index} className="competition-team__item">
            <div className="competition-team__top">
              <span className="table__title">{team.tenBang}</span>
            </div>
            <div className="competition-team__content">
              <div className="team-item">
                <img src={team.logoTeam1} alt="logo-team-1" />
                <Tooltip title={team.tenTeam1}>
                  <span className="name-team">{team.tenTeam1}</span>
                </Tooltip>
                <Tooltip title={'Tăng điểm'}>
                  <div className="team-score">
                    <span onClick={() => handleScoreClick(index, true)} className="score-value">
                      {team.soDiemTeam1}
                    </span>
                  </div>
                </Tooltip>
              </div>
              <div className="icon-solo">
                <img src={solo} alt="" />
              </div>
              <div className="team-item">
                <img src={team.logoTeam2} alt="logo-team-2" />
                <Tooltip title={team.tenTeam2}>
                  <span className="name-team">{team.tenTeam2}</span>
                </Tooltip>
                <Tooltip title={'Tăng điểm'}>
                  <div className="team-score">
                    <span onClick={() => handleScoreClick(index, false)} className="score-value">
                      {team.soDiemTeam2}
                    </span>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="competition-team__bottom" onClick={() => startTimer(index)}>
              <button className="timer-start">
                {team.isTimerRunning ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
              </button>
              <p className="team-time">{formatTime(team.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Competition
