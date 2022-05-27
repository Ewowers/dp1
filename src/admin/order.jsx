import { Row, Col, Drawer, Button } from "antd";
import { useEffect, useState } from "react";
export function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [visible, setVisible] = useState(false);
  const show = (item) => {
    setOrder(item);
    setVisible(true);
  };
  const edit = (id) => {
    fetch("/api/order/edit/" + id).then((res) => get());
  };
  const destroy = async (id) => {
    await fetch("/api/order/destroy/" + id, { method: "GET" }).then((res) => get());
  };
  const get = () => {
    fetch("/api/order")
      .then((res) => res.json())
      .then((res) => setOrders(res));
  };

  useEffect(() => {
    get();
  }, []);
  return (
    <>
      {orders.map((item) => (
        <Item item={item} show={show} key={item._id} edit={edit} destroy={destroy} />
      ))}
      <Drawer visible={visible} onClose={() => setVisible(false)} width={1000} title={"Заказ " + order._id}>
        <p>
          <strong>Имя: {order.name}</strong> <br />
          <strong>Телефон: {order.phone}</strong> <br />
          <strong>Почта: {order.email}</strong>
        </p>
        <Row style={{ padding: 10, borderBottom: "1px solid" }}>
          <Col span={12}>Название товара</Col>

          <Col span={12} style={{ textAlign: "end" }}>
            Количество
          </Col>
        </Row>
        {order?.basket?.map((item) => {
          return (
            <Row key={item._id} justify="space-between" style={{ borderBottom: "1px solid", padding: 10, marginBottom: 10 }}>
              <Col span={12}>{item.title}</Col>
              <Col span={4} style={{ textAlign: "end" }}>
                {item.que}
              </Col>
            </Row>
          );
        })}
      </Drawer>
    </>
  );
}
const Item = ({ item, show, edit, destroy }) => {
  const { name, phone, email } = item;
  const onShow = () => show(item);
  const onEdit = () => edit(item._id);
  const onDestroy = () => destroy(item._id);
  return (
    <Row className={item.edit ? "orderItem active" : "orderItem"}>
      <Col md={4}>{name}</Col>
      <Col md={4}>{phone}</Col>
      <Col md={4}>{email}</Col>
      <Col md={4}>
        <span style={{ color: "blue" }} onClick={onShow}>
          Корзина
        </span>
      </Col>
      <Col md={4} onClick={onEdit}>
        <Button onClick={onEdit} type="primary">
          Изменить
        </Button>
      </Col>
      <Col md={4}>
        <Button onClick={onDestroy} type="primary" danger>
          Удалить
        </Button>
      </Col>
    </Row>
  );
};
