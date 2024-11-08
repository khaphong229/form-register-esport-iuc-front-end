import React from 'react'
import Header from '../../components/Header'
import './styles.scss'
import list_teams_ok from '../../utils/constant2'
function ListTeamCompetition() {
  return (
    <>
      <div className="list-team__container">
        <Header title="Danh sách các đội tham gia thi đấu ngày 10/11/2024" />
        <div className="list-team__group">
          {list_teams_ok.map((team, index) => (
            <>
              <div className="team-group">
                <div className="team-group__top">
                  <span>{team.table}</span>
                </div>
                <div className="team-group__content">
                  {team.teams.map(item => (
                    <div className="team-item__wrap">
                      <div className="team-item__info">
                        <div className="item-img">
                          <img src={item.logo} alt="" />
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
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default ListTeamCompetition
