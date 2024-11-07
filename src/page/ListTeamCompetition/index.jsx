import React from 'react'
import Header from '../../components/Header'
import list_teams from '../../utils/default'
import './styles.scss'
function ListTeamCompetition() {
  function xuLyDoi(cacDoi) {
    const mapDoi = new Map()

    cacDoi.forEach(tran => {
      // Xử lý đội 1
      if (!mapDoi.has(tran.tenTeam1)) {
        mapDoi.set(tran.tenTeam1, {
          logo: tran.logoTeam1,
          ten: tran.tenTeam1,
          tongDiem: 0
        })
      }
      mapDoi.get(tran.tenTeam1).tongDiem += tran.soDiemTeam1

      // Xử lý đội 2
      if (!mapDoi.has(tran.tenTeam2)) {
        mapDoi.set(tran.tenTeam2, {
          logo: tran.logoTeam2,
          ten: tran.tenTeam2,
          tongDiem: 0
        })
      }
      mapDoi.get(tran.tenTeam2).tongDiem += tran.soDiemTeam2
    })

    // Chuyển đổi Map thành mảng và giới hạn số lượng đội
    return Array.from(mapDoi.values()).slice(0, 32)
  }

  // Xử lý các đội và in kết quả
  const cacDoiDaXuLy = xuLyDoi(list_teams)
  console.log('Số lượng đội:', cacDoiDaXuLy.length)
  console.log(JSON.stringify(cacDoiDaXuLy, null, 2))
  return (
    <>
      <div className="container list-team__container">
        <Header title="Danh sách các dội tham gia thi đấu ngày 10/11/2024" />
        <div className="list-team__group">
          {list_teams.map((team, index) => (
            <>
              <div className="team-item__group">
                <span className="team-number">{index * 2 + 1}</span>
                <div className="team-item__info">
                  <div className="team-item__detail img-1">
                    <img src={team.logoTeam1} alt="" />
                    <span>{team.tenTeam1}</span>
                  </div>
                  <div className="score-team">Số điểm: {team.soDiemTeam1}</div>
                </div>
              </div>
              <div className="team-item__group">
                <span className="team-number">{index * 2 + 2}</span>
                <div className="team-item__info">
                  <div className="team-item__detail img-2">
                    <img src={team.logoTeam2} alt="" />
                    <span>{team.tenTeam2}</span>
                  </div>
                  <div className="score-team">Số điểm: {team.soDiemTeam2}</div>
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
