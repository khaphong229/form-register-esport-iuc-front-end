import React from 'react'
import { Col, Form, Input, Row, Select } from 'antd'
const { Option } = Select

const FormMember = ({ prefix, memberIndex, isLeader = false, required = true }) => {
  const getFieldName = field => {
    if (isLeader) {
      return `${field}Leader`
    }
    return `${field}${memberIndex}`
  }

  const getLabelText = text => {
    if (isLeader) {
      return `${text} đội trưởng`
    }
    return `${text} thành viên`
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  )

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12}>
        <Form.Item
          name={getFieldName('name')}
          label={getLabelText('Tên')}
          rules={[
            {
              required,
              message: `Vui lòng nhập tên ${isLeader ? 'đội trưởng' : 'thành viên'}`
            }
          ]}
        >
          <Input placeholder="Nhập tên..." />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item
          name={getFieldName('code')}
          label="Mã sinh viên"
          rules={[
            {
              required,
              message: 'Vui lòng nhập mã sinh viên'
            }
          ]}
        >
          <Input placeholder="Nhập mã sinh viên..." />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item
          name={getFieldName('grade')}
          label="Lớp"
          rules={[
            {
              required,
              message: 'Vui lòng nhập lớp'
            }
          ]}
        >
          <Input placeholder="Nhập lớp..." />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item
          name={getFieldName('email')}
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'Email không hợp lệ!'
            },
            {
              required,
              message: 'Vui lòng nhập Email'
            }
          ]}
        >
          <Input placeholder="Nhập email..." />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item
          name={getFieldName('phone')}
          label="Số điện thoại"
          rules={[{ required, message: 'Vui lòng nhập số điện thoại' }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Nhập SĐT (VD: 039..)..." />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item
          name={getFieldName('gender')}
          label="Giới tính"
          rules={[{ required, message: 'Vui lòng nhập giới tính' }]}
        >
          <Select placeholder="Nhập giới tính">
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
            <Option value="other">Khác</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  )
}

export default FormMember
