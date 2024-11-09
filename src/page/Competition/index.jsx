import React, { useEffect, useState } from 'react'
import './styles.scss'
import Header from '../../components/Header'
import solo from '../../assets/images/solo.png'
import competition_teams from '../../utils/default'
import { Link } from 'react-router-dom'
import { DoubleRightOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { formatTime } from '../../utils/helpers'
import { Tooltip } from 'antd'
import item1 from '../../assets/images/item1.png'
import item2 from '../../assets/images/item2.png'
import item3 from '../../assets/images/item3.PNG'

function Competition() {
  const [teams, setTeams] = useState(
    competition_teams.map(team => ({
      ...team,
      isTimerRunning: false,
      time: 0
    }))
  )

  const checkAdmin = () => {
    const adminLocal = localStorage.getItem('admin')
    return adminLocal ? true : false
  }

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
    if (hours === 13 && minutes >= 30) return { start: 48, end: 53 } // 13:30 - 14:00
    if (hours === 14 && minutes >= 0) return { start: 53, end: 58 } // 14:00 - 14:30
    if (hours === 14 && minutes >= 30) return { start: 58, end: 63 } // 14:30 - 15:00
    if (hours === 15 && minutes >= 0) return { start: 63, end: 68 } // 15:00 - 15:30

    return { start: 0, end: 0 }
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
      <div className="image__group">
        <img src={item1} alt="img-violet" className="img__item-1" />
        <img src={item2} alt="img-nak" className="img__item-2" />
        <img src={item3} alt="img-laville" className="img__item-3" />
      </div>
      <Header title="Bảng thi đấu hiện tại" />
      <div className="list-team__navigate">
        <DoubleRightOutlined />
        <Link to="/list-teams" className="text-navigate">
          Xem danh sách các đội thi đấu
        </Link>
      </div>
      {teams.slice(start, end).length === 0 && (
        <h2
          style={{
            textAlign: 'center',
            width: '100%',
            marginTop: '10%'
          }}
        >
          Chưa tới thời gian thi đấu
        </h2>
      )}
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
              </div>
              <div className="icon-solo">
                <img src={solo} alt="" />
              </div>
              <div className="team-item">
                <img src={team.logoTeam2} alt="logo-team-2" />
                <Tooltip title={team.tenTeam2}>
                  <span className="name-team">{team.tenTeam2}</span>
                </Tooltip>
              </div>
            </div>
            {checkAdmin() ? (
              <div className="competition-team__bottom" onClick={() => startTimer(index)}>
                <button className="timer-start">
                  {team.isTimerRunning ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                </button>
                <p className="team-time">{formatTime(team.time)}</p>
              </div>
            ) : (
              <div className="competition-team__bottom">
                <p className="team-time">đang thi đấu...</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Competition
