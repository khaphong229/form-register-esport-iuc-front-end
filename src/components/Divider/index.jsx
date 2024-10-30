import { Divider } from 'antd'
import React from 'react'

function DividerCustom({ content }) {
  return (
    <>
      <Divider style={{ borderColor: '#cccccc' }}>{content}</Divider>
    </>
  )
}

export default DividerCustom
