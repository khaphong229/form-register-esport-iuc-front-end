import React, { useEffect } from 'react'
import './styles.scss'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'
import item1 from '../../assets/images/item1.png'
import item2 from '../../assets/images/item2.png'
import item3 from '../../assets/images/item3.PNG'
import Header from '../../components/Header'

const tournamentInfo = [
  {
    category: 'Thông tin giải đấu',
    details: {
      name: 'Giải đấu E-Sport Liên Quân Mobile cho sinh viên',
      registrationPeriod: '31/10/2024 - 06/11/2024',
      fee: '250.000đ/đội',
      feeExemption: 'Miễn phí cho đội có thành viên nữ'
    }
  },
  // {
  //   category: 'Điều kiện tham gia',
  //   requirements: {
  //     university: 'Học viện Công nghệ Bưu chính Viễn thông',
  //     teamSize: 5,
  //     groups: [
  //       {
  //         name: 'Bảng A',
  //         description: 'Dành cho sinh viên chương trình CNTT Định hướng ứng dụng',
  //         maxTeams: 16
  //       },
  //       {
  //         name: 'Bảng B',
  //         description: 'Dành cho sinh viên HVBCVT, yêu cầu tối thiểu 1 thành viên là sinh viên UDU',
  //         maxTeams: 16
  //       }
  //     ]
  //   }
  // },
  {
    category: 'Giải thưởng',
    prizes: [
      {
        rank: 'Giải Nhất',
        reward: '3.000.000 VND + Cúp vô địch + Giấy chứng nhận'
      },
      {
        rank: 'Giải Nhì',
        reward: '2.000.000 VND + Kỷ niệm chương + Giấy chứng nhận'
      },
      {
        rank: 'Giải Ba',
        reward: '1.000.000 VND/giải + Kỷ niệm chương + Giấy chứng nhận',
        quantity: 2
      },
      {
        rank: 'Giải tuyển thủ xuất sắc nhất',
        reward: '500.000 VND + Giấy chứng nhận'
      }
    ]
  },
  // {
  //   category: 'Lịch trình thi đấu',
  //   schedule: [
  //     {
  //       date: '07/11/2024',
  //       event: 'Bốc thăm chia lượt đấu và thu lệ phí'
  //     },
  //     {
  //       date: '10/11/2024',
  //       event: 'Thi đấu vòng bảng và vòng 1/8'
  //     },
  //     {
  //       date: '17/11/2024',
  //       event: 'Thi đấu vòng chung kết và trao giải'
  //     }
  //   ]
  // },
  {
    category: 'Địa điểm thi đấu',
    locations: [
      {
        stage: 'Vòng bảng & vòng 1/8',
        location: 'Hội trường 1 Học viện BCVT'
      },
      {
        stage: 'Vòng chung kết',
        location: 'Hội trường tầng 2 Viện Khoa học Kỹ thuật Bưu điện'
      }
    ]
  },
  // {
  //   category: 'Thông tin ưu tiên',
  //   priorities: [
  //     'Ưu tiên 1: Các đội có thành viên là sinh viên UDU',
  //     'Ưu tiên 2: Các đội có thành viên là nữ',
  //     'Ưu tiên 3: Theo thứ tự thời gian đăng ký'
  //   ]
  // },
  {
    category: 'Yêu cầu về tham dự',
    requirements: [
      'Có mặt trước giờ thi đấu 30 phút để chuẩn bị',
      'Tuân thủ luật thi đấu chuẩn của game Liên Quân',
      'Đảm bảo tinh thần fair play',
      'Không sử dụng phần mềm gian lận'
    ]
  }
]

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  const handlePassRegister = () => {
    navigate('/list-teams')
  }

  return (
    <div className="container info__container">
      <div className="image__group">
        <img data-aos="fade-up" src={item1} alt="img-violet" className="img__item-1" />
        <img data-aos="fade-up" src={item2} alt="img-nak" className="img__item-2" />
        <img data-aos="fade-up" src={item3} alt="img-laville" className="img__item-3" />
      </div>
      <Header
        title="GIẢI ĐẤU E-SPORT CHO SINH VIÊN CHƯƠNG TRÌNH CNTT ĐỊNH HƯỚNG ỨNG DỤNG MỞ RỘNG"
        data-aos="fade-down"
      />
      <button data-aos="zoom-in" className="btn info__btn" onClick={handlePassRegister}>
        Theo dõi giải đấu
      </button>
      <div className="info-wrap">
        {tournamentInfo.map((section, index) => (
          <div className="info__group" key={index} data-aos="fade-up">
            <h3 className="info-item__title">{section.category}</h3>
            {section.details && (
              <>
                <p className="info-item__desc">{section.details.name}</p>
                <p className="info-item__desc">Thời gian đăng ký: {section.details.registrationPeriod}</p>
                <p className="info-item__desc">
                  Lệ phí: {section.details.fee} ({section.details.feeExemption})
                </p>
              </>
            )}
            {section.requirements && !Array.isArray(section.requirements) && (
              <>
                <p className="info-item__desc">Đối tượng: {section.requirements.university}</p>
                <p className="info-item__desc">Số thành viên mỗi đội: {section.requirements.teamSize}</p>
                <ul className="info-item__desc">
                  {section.requirements.groups.map((group, i) => (
                    <li key={i}>
                      {group.name}: {group.description} (Tối đa {group.maxTeams} đội)
                    </li>
                  ))}
                </ul>
              </>
            )}
            {section.prizes && (
              <ul className="info-item__desc">
                {section.prizes.map((prize, i) => (
                  <li key={i}>
                    {prize.rank}: {prize.reward}
                  </li>
                ))}
              </ul>
            )}
            {section.schedule && (
              <ul className="info-item__desc">
                {section.schedule.map((item, i) => (
                  <li key={i}>
                    {item.date}: {item.event}
                  </li>
                ))}
              </ul>
            )}
            {section.locations && (
              <ul className="info-item__desc">
                {section.locations.map((location, i) => (
                  <li key={i}>
                    {location.stage}: {location.location}
                  </li>
                ))}
              </ul>
            )}
            {section.priorities && (
              <ul className="info-item__desc">
                {section.priorities.map((priority, i) => (
                  <li key={i}>{priority}</li>
                ))}
              </ul>
            )}
            {Array.isArray(section.requirements) && (
              <ul className="info-item__desc">
                {section.requirements.map((requirement, i) => (
                  <li key={i}>{requirement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
