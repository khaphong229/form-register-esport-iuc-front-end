import { message } from 'antd'

export const displayStatus = (type, mess) => {
  return message[type]({
    content: mess,
    duration: 1
  })
}
