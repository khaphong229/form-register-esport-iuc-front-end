import React from 'react'
import logo from '../../assets/images/logo.png'
import icon from '../../assets/images/icon.png'
import './styles.scss'
function Header({ title }) {
  return (
    <>
      <div className="info__image-group">
        <img src={icon} alt="icon" className="info__icon" />
        <img src={logo} alt="logo" className="info__logo" />
      </div>
      <h1 className="title">{title}</h1>
    </>
  )
}

export default Header
