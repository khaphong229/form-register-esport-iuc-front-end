import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import icon_prize_gold from '../../assets/images/icon-cup-gold.png'
import TournamentService from '../../services/apiTournament'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { DoubleRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default function RankTeam() {
  const [listTeams, setListTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [idTournament, setIdTournament] = useState('')
  const [selectedFinalist, setSelectedFinalist] = useState(null)
  const [selectedTeams, setSelectedTeams] = useState(() => {
    const saved = localStorage.getItem('selectedTeams')
    return saved
      ? JSON.parse(saved)
      : {
          winners: { A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null },
          semis: { 1: null, 2: null, 3: null, 4: null },
          finals: { 1: null, 2: null }
        }
  })

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

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem('selectedTeams', JSON.stringify(selectedTeams))
    }
  }, [selectedTeams, isAdmin])

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
      if (!idTournament) {
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

  const handleSelectTeam = (stage, position, team) => {
    if (!isAdmin) return
    setSelectedTeams(prev => {
      const newSelected = { ...prev }
      newSelected[stage][position] = team
      return newSelected
    })
  }

  const handleFinalistClick = position => {
    if (!isAdmin) return
    const team = selectedTeams.finals[position]
    if (team) {
      setSelectedFinalist(team)
    }
  }

  const TeamBlock = ({ team, logo, score, onScoreUpdate, delay, selectable, onSelect, isSelected }) => (
    <div
      className={`w-40 h-12 bg-[#ffffff0d] border 
        ${isSelected ? 'border-cyan-300' : 'border-[#6b6b6b7e]'} 
        px-4 rounded-lg flex items-center font-medium backdrop-blur-3xl 
        ${selectable && isAdmin ? 'cursor-pointer hover:bg-[#ffffff1a]' : ''}`}
      data-aos="fade-up"
      data-aos-delay={delay}
      onClick={selectable && isAdmin ? onSelect : undefined}
    >
      <div className="flex items-center gap-[8px] flex-1 min-w-0">
        {logo && (
          <img
            src={logo}
            alt="logo-team"
            className="w-[30px] h-[30px] rounded-full shrink-0"
            onError={e => {
              e.target.onerror = null
              e.target.src = '/default-team-logo.png'
            }}
          />
        )}
        <span className="truncate">{team}</span>
      </div>
      {score !== undefined && (
        <div
          className={`bg-[#ffffff0d] w-[30px] text-center rounded-[6px] shrink-0 ml-auto relative group
            ${isAdmin ? 'cursor-pointer hover:bg-[#ffffff1a]' : ''}`}
          onClick={e => {
            e.stopPropagation()
            onScoreUpdate()
          }}
        >
          {score}
          {isAdmin && (
            <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-black px-2 py-1 rounded whitespace-nowrap transition-opacity">
              Click để sửa
            </div>
          )}
        </div>
      )}
    </div>
  )

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="">
      <div className="container">
        <Header title="Chung Kết Esports Champions Liên Quân Mobile" />
        <div className="list-team__navigate">
          <DoubleRightOutlined />
          <Link to="/list-teams" className="text-navigate">
            Xem danh sách các đội thi đấu
          </Link>
        </div>
      </div>
      <div className="flex justify-between gap-8 pb-[50px]">
        {/* Left Bracket */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-16">
            {listTeams.slice(0, 4).map(({ table, teams }, tableIdx) => (
              <div key={table} className="flex items-center gap-4">
                <div className="flex flex-col gap-4">
                  {teams.map((team, teamIdx) => (
                    <TeamBlock
                      key={team.name}
                      team={team.name}
                      logo={team.logo}
                      score={team.score}
                      onScoreUpdate={() => handleUpdateScore(tableIdx, teamIdx, team.score)}
                      delay={tableIdx * 100 + teamIdx * 50}
                      selectable
                      onSelect={() => handleSelectTeam('winners', String.fromCharCode(65 + tableIdx), team)}
                      isSelected={selectedTeams.winners[String.fromCharCode(65 + tableIdx)]?.name === team.name}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quarter Finals - Left */}
        <div className="flex flex-col gap-32 mt-8">
          {['A', 'B', 'C', 'D'].map((winner, idx) => (
            <div key={winner} className="flex items-center gap-4">
              <TeamBlock
                team={selectedTeams.winners[winner]?.name || `Bảng ${winner}`}
                logo={selectedTeams.winners[winner]?.logo}
                delay={(idx + 8) * 100}
                selectable
                onSelect={() => handleSelectTeam('semis', idx < 2 ? 1 : 2, selectedTeams.winners[winner])}
                isSelected={selectedTeams.semis[idx < 2 ? 1 : 2]?.name === selectedTeams.winners[winner]?.name}
              />
            </div>
          ))}
        </div>

        {/* Semi Finals - Left */}
        <div className="flex flex-col gap-64 mt-32">
          {[1, 2].map((semi, idx) => (
            <div key={semi} className="flex items-center gap-4">
              <TeamBlock
                team={selectedTeams.semis[semi]?.name || `Tứ kết ${semi}`}
                logo={selectedTeams.semis[semi]?.logo}
                delay={(idx + 12) * 100}
                selectable
                onSelect={() => handleSelectTeam('finals', 1, selectedTeams.semis[semi])}
                isSelected={selectedTeams.finals[1]?.name === selectedTeams.semis[semi]?.name}
              />
            </div>
          ))}
        </div>

        {/* Finals */}
        <div className="flex flex-col items-center mt-8">
          <div className="flex flex-col items-center" data-aos="fade-down" data-aos-delay="1600">
            <img src={icon_prize_gold} alt="logo-cup" className="w-[160px]" />
            <div className="w-48 h-16 bg-[#ffffff0d] border-2 border-amber-300 rounded-lg flex items-center justify-center font-bold text-lg mb-8">
              {selectedFinalist ? (
                <TeamBlock team={selectedFinalist.name} logo={selectedFinalist.logo} delay={1700} />
              ) : (
                <span>Chung kết</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <TeamBlock
              team={selectedTeams.finals[1]?.name || 'Bán kết 1'}
              logo={selectedTeams.finals[1]?.logo}
              delay={1700}
              selectable
              onSelect={() => handleFinalistClick(1)}
              isSelected={selectedFinalist?.name === selectedTeams.finals[1]?.name}
            />
            <TeamBlock
              team={selectedTeams.finals[2]?.name || 'Bán kết 2'}
              logo={selectedTeams.finals[2]?.logo}
              delay={1800}
              selectable
              onSelect={() => handleFinalistClick(2)}
              isSelected={selectedFinalist?.name === selectedTeams.finals[2]?.name}
            />
          </div>
        </div>

        {/* Semi Finals - Right */}
        <div className="flex flex-col gap-64 mt-32">
          {[3, 4].map((semi, idx) => (
            <div key={semi} className="flex items-center gap-4">
              <TeamBlock
                team={selectedTeams.semis[semi]?.name || `Tứ kết ${semi}`}
                logo={selectedTeams.semis[semi]?.logo}
                delay={(idx + 14) * 100}
                selectable
                onSelect={() => handleSelectTeam('finals', 2, selectedTeams.semis[semi])}
                isSelected={selectedTeams.finals[2]?.name === selectedTeams.semis[semi]?.name}
              />
            </div>
          ))}
        </div>

        {/* Quarter Finals - Right */}
        <div className="flex flex-col gap-32 mt-8">
          {['E', 'F', 'G', 'H'].map((winner, idx) => (
            <div key={winner} className="flex items-center gap-4">
              <TeamBlock
                team={selectedTeams.winners[winner]?.name || `Bảng ${winner}`}
                logo={selectedTeams.winners[winner]?.logo}
                delay={(idx + 16) * 100}
                selectable
                onSelect={() => handleSelectTeam('semis', idx < 2 ? 3 : 4, selectedTeams.winners[winner])}
                isSelected={selectedTeams.semis[idx < 2 ? 3 : 4]?.name === selectedTeams.winners[winner]?.name}
              />
            </div>
          ))}
        </div>

        {/* Right Bracket */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-16">
            {listTeams.slice(4, 8).map(({ table, teams }, tableIdx) => (
              <div key={table} className="flex items-center gap-4">
                <div className="flex flex-col gap-4">
                  {teams.map((team, teamIdx) => (
                    <TeamBlock
                      key={team.name}
                      team={team.name}
                      logo={team.logo}
                      score={team.score}
                      onScoreUpdate={() => handleUpdateScore(tableIdx + 4, teamIdx, team.score)}
                      delay={(tableIdx + 20) * 100 + teamIdx * 50}
                      selectable
                      onSelect={() => handleSelectTeam('winners', String.fromCharCode(69 + tableIdx), team)}
                      isSelected={selectedTeams.winners[String.fromCharCode(69 + tableIdx)]?.name === team.name}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
