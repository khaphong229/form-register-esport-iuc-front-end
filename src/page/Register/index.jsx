import React, { useState } from 'react'
import Header from '../../components/Header'
import { Button, Checkbox, Form, Input, message, Modal } from 'antd'
import './styles.scss'
import { Link, useNavigate } from 'react-router-dom'
import { DoubleLeftOutlined, InboxOutlined } from '@ant-design/icons'
import DividerCustom from '../../components/Divider'
import Dragger from 'antd/es/upload/Dragger'
import TeamService from '../../services/apiTeam'
import MemberFormSection from '../../components/FormMember'
import URL_SERVER from '../../utils/constants'
function Register() {
  const [form] = Form.useForm()
  const [uploadedImages, setUploadedImages] = useState([])

  const handleUpload = async file => {
    console.log(URL_SERVER)

    try {
      const formData = new FormData()
      formData.append('images', file)

      const response = await TeamService.uploadFile(formData)

      if (response.success === true) {
        setUploadedImages(prevImages => [...prevImages, ...response.data.data])
        return response.data.data
      }
    } catch (error) {
      console.error('Lỗi tải ảnh', error)
      throw error
    }
  }

  const props = {
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const uploadedPaths = await handleUpload(file)
        if (uploadedPaths) {
          onSuccess('ok')
          message.success(`${file.name} tải lên thành công.`)
        }
      } catch (error) {
        onError(error)
        message.error(`${file.name} tải lên thất bại.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  const transformFormData = values => {
    const {
      code0,
      code1,
      code2,
      code3,
      codeLeader,
      email0,
      email1,
      email2,
      email3,
      emailLeader,
      gender0,
      gender1,
      gender2,
      gender3,
      genderLeader,
      grade0,
      grade1,
      grade2,
      grade3,
      gradeLeader,
      name0,
      name1,
      name2,
      name3,
      nameLeader,
      phone0,
      phone1,
      phone2,
      phone3,
      phoneLeader,
      slogan,
      teamName
    } = values

    return {
      name: teamName,
      slogan: slogan || 'Chơi là chất',
      leader: {
        codeLeader,
        emailLeader,
        genderLeader,
        gradeLeader,
        nameLeader,
        phoneLeader
      },
      members: [
        {
          code1,
          email1,
          gender1,
          grade1,
          name1,
          phone1
        },
        {
          code2,
          email2,
          gender2,
          grade2,
          name2,
          phone2
        },
        {
          code3,
          email3,
          gender3,
          grade3,
          name3,
          phone3
        },
        {
          code4: code0,
          email4: email0,
          gender4: gender0,
          grade4: grade0,
          name4: name0,
          phone4: phone0
        }
      ],
      images: uploadedImages
    }
  }

  const onFinish = async values => {
    console.log(values)

    try {
      if (uploadedImages.length === 0) {
        message.error('Vui lòng tải lên ít nhất một ảnh!')
        return
      }
      const transformedData = transformFormData(values)
      const response = await TeamService.createTeam(transformedData)

      if (response.success === true) {
        // message.success(response.message || 'Đăng ký thành công! Hẹn bạn ở giải đấu ^^')
        Modal.success({
          title: 'Chúc mừng bạn đã đăng ký tham gia thành công!',
          content: (
            <div>
              <p>Bạn hãy để ý thông tin, thể lệ cuộc thi nhé</p>
              <p>Nộp lệ phí đúng hạn nha!</p>
              <p>Hẹn bạn ở giải đấu</p>
            </div>
          )
        })
        form.resetFields()
        setUploadedImages([])
      } else {
        message.error(response.data.data.message || 'Đăng ký thất bại. Vui lòng thử lại!')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại!')
    }
  }
  const navigate = useNavigate()
  return (
    <div className="container form__container">
      <div className="icon__backhome" onClick={() => navigate('/')}>
        <DoubleLeftOutlined />
        <p className="icon__title">Trở về</p>
      </div>
      <Header title="Đăng ký tham gia giải đấu" />
      <div className="form__wrap">
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            prefix: '84'
          }}
          style={{ maxWidth: 800, marginInline: 'auto' }}
        >
          <Form.Item
            name="teamName"
            label="Tên đội"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên đội'
              }
            ]}
          >
            <Input placeholder="Nhập tên đội..." />
          </Form.Item>

          <Form.Item name="slogan" label="Slogan">
            <Input.TextArea placeholder="Nhập slogan..." />
          </Form.Item>

          <DividerCustom content="Đội trưởng" />
          <MemberFormSection isLeader={true} />

          {[...Array(4)].map((_, index) => (
            <React.Fragment key={index}>
              <DividerCustom content={`Thành viên ${index + 2}`} />
              <MemberFormSection memberIndex={index} />
            </React.Fragment>
          ))}

          <DividerCustom content="Tải logo team và thẻ sinh viên các thành viên" />
          <Form.Item
            rules={[
              {
                required: false,
                message: 'Vui lòng tải lên ít nhất một ảnh'
              }
            ]}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
              <p className="ant-upload-hint">
                Hỗ trợ tải lên một lần hoặc hàng loạt. Vui lòng đặt tên ảnh theo cú pháp TenNhom_STT. VD: IUC_1. Cảm ơn!
              </p>
            </Dragger>
          </Form.Item>

          <DividerCustom content="Kết thúc" />
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Vui lòng bấm chấp nhận'))
              }
            ]}
          >
            <Checkbox>
              Xác nhận đồng ý với <Link to="/">quy định</Link> của giải đấu.
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
