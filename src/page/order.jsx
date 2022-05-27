import { Col, Form, Input, InputNumber, Button, Row, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
export const Order = () => {
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem("basket")) || []);
  const [alert, setAlert] = useState(false);
  const [form] = Form.useForm();
  const destroy = (id) => {
    const array = [...basket];
    const index = array.findIndex((item) => item._id === id);
    array.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(array));
    setBasket(array);
  };
  const changeQue = (id, que) => {
    const array = [...basket];
    const index = array.findIndex((item) => item._id === id);
    array[index].que = que;
    localStorage.setItem("basket", JSON.stringify(array));
    setBasket(array);
  };
  const onFinish = (values) => {
    console.log(values);
    values.basket = basket;
    fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      setBasket([]);
      localStorage.clear("basket");
      setAlert(true);
      form.resetFields();
    });
  };
  return (
    <Row justify="center">
      <Col md={18}>
        <Row gutter={30}>
          <Col md={12}>
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Form.Item label="Ваше имя" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Ваш телефон" name="phone">
                <Input type="tel" />
              </Form.Item>
              <Form.Item label="Ваша почта" name="email">
                <Input type="email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  Заказать
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col md={12} style={{ borderLeft: "1px solid" }}>
            {basket.map((item, i) => {
              const que = (num) => changeQue(item._id, num);
              return (
                <Row style={{ padding: 5 }} align="stretch" justify="space-between" key={i}>
                  <Col span={12} style={{ borderRight: "1px solid", display: "flex", alignItems: "center" }}>
                    <p style={{ margin: 0 }}>{item.title}</p>
                  </Col>
                  <Col span={4} style={{ paddingLeft: 10, display: "flex", alignItems: "center" }}>
                    <p style={{ margin: 0 }}>{item.prise}</p>
                  </Col>
                  <Col span={5} style={{ padding: 0 }}>
                    <InputNumber defaultValue={item.que} style={{ width: "100%" }} onChange={que} />
                  </Col>
                  <Col span={3}>
                    <Button style={{ width: "100%" }} onClick={() => destroy(item._id)} type="primary" danger>
                      <DeleteOutlined />
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      </Col>
      <Modal visible={alert} onCancel={() => setAlert(false)} footer={false} style={{ textAlign: "center" }}>
        <h1>Ваша заявка принята</h1>
        <h2>Наш менеджер свяжется с вами течение 10 минут</h2>
      </Modal>
    </Row>
  );
};
