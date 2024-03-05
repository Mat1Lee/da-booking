import React, { useState } from 'react'
import BaseBorderBox from './BaseBorderBox'
import { Col, DatePicker, Form, Input, Row,Button } from 'antd';
import RenderLoading from './RenderLoading';

export default function HighFilter({onCancel}) {
    const [isLoading, setLoading] = useState(false);
    const layoutRow = {
        gutter: 16,
      };
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
    }
  return (
    <Form
    form={form}
    onFinish={onFinish}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    labelAlign="left"
    scrollToFirstError={true}

    initialValues={{
      variants: [
        {
          exchangeValue: 1,
          variantIsDefault: true,
        },
      ],
    }}
  >
    <BaseBorderBox title={"Khoảng ngày"}>
      <Row {...layoutRow}>
        <Col style={{ paddingBottom: 10 }} span={12}>
          <Form.Item
            label="Ngày bắt đầu"
            name={'startDate'}
          >
            <DatePicker  />
          </Form.Item>
        </Col>
        <Col style={{ paddingBottom: 10 }} span={12}>
          <Form.Item
            label="Ngày kết thúc"
            name={'endDate'}
          >
            <DatePicker  />
          </Form.Item>
        </Col>
      </Row>
    </BaseBorderBox>
    <BaseBorderBox >
      <Row {...layoutRow}>
        <Col span={12}>
          <Form.Item
            label="Khu vực"
            name={["location", "city"]}
          >
            {RenderLoading(isLoading, <Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Loại nhà đất"
            name={"type"}
          >
            {RenderLoading(isLoading, <Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row {...layoutRow}>

        <Col span={12}>
          <Form.Item
            label="Giá"
            name={"price"}
          >
            {RenderLoading(isLoading, <Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Số phòng tắm"
            name={"bathRooms"}
          >
            {RenderLoading(isLoading, <Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row {...layoutRow}>

        <Col span={12}>
          <Form.Item
            label="Diện tích"
            name={"area"}
          >
            {RenderLoading(isLoading, <Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Số phòng ngủ"
            name={"bedRooms"}
          >
            {RenderLoading(isLoading, <Input />)}
          </Form.Item>
        </Col>
      </Row>
    </BaseBorderBox>

    <Row justify={"end"} gutter={16}>
      <Col>
        <Button onClick={onCancel}>
          Huỷ
        </Button>
      </Col>
      <Col>
        <Button
        style={{color:'black'}}
        //   loading={isSubmitLoading}
          htmlType="submit"
          type="primary"
        >
          {"Tìm kiếm"}
        </Button>
      </Col>
    </Row>
  </Form>
  )
}
