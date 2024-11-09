import React, { useEffect } from 'react'
import Header from '../../components/Header'
import './styles.scss'
import list_teams_ok from '../../utils/constant2'
import AOS from 'aos'
import 'aos/dist/aos.css'

function ListTeamCompetition() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })
  }, [])

  return (
    <div className="list-team__container">
      <Header title="Danh sách các đội tham gia thi đấu ngày 10/11/2024" />
      <div className="list-team__group">
        {list_teams_ok.map((team, index) => (
          <div key={team.table} className="team-group" data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="team-group__top">
              <span>{team.table}</span>
            </div>
            <div className="team-group__content">
              {team.teams.map(item => (
                <div key={item.name} className="team-item__wrap">
                  <div className="team-item__info">
                    <div className="item-img">
                      <img src={item.logo} alt={item.name} />
                    </div>
                    <span className="item-name">{item.name}</span>
                  </div>
                  <div className="team-item-score">
                    <span>{item.score}</span>
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
