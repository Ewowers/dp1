import { Link } from "react-router-dom";
import { Row, Col, Badge, Avatar, Drawer, Button, InputNumber } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [basketState, setBasketState] = useState(false);
  const state = useSelector((state) => state);

  return (
    <header>
      <Row justify="center" style={{ background: "#3a3a3a", color: "#ffffff" }}>
        <Col md={20}>
          <Row>
            <Col span={12}>
              <span>Пон-Пят:</span> 9:00 AM - 5:30 PM
            </Col>
            <Col span={12} style={{ textAlign: "end" }}>
              <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
                +7(777)777-77-77
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center" align="center">
        <Col md={20}>
          <Row align="middle" gutter={20}>
            <Col md={4}>
              <h1 className="logo">
                <Link to="/" style={{ color: "black" }}>
                  It-store
                </Link>
              </h1>
            </Col>
            <Col md={8 + 8} className="navbar">
              <nav>
                <ul>
                  <li>
                    <a href="/category/videoCard">Видеокарты</a>
                  </li>
                  <li>
                    <a href="/category/processor">Процессоры</a>
                  </li>
                  <li>
                    <a href="/category/motherboard">Материнская платы</a>
                  </li>
                  <li>
                    <a href="/category/powerSupply">Блоки питания</a>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col md={4} style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => setBasketState(true)} style={{ border: "none" }}>
                <Badge count={state.length !== 0 ? state.length : 0}>
                  <Avatar
                    style={{
                      background: "#fff",
                      color: "#000",
                      fontSize: "1.5rem",
                    }}
                  >
                    <ShoppingCartOutlined />
                  </Avatar>
                </Badge>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Basket visible={basketState} setVisible={setBasketState} />
    </header>
  );
};
const Basket = (props) => {
  const { visible, setVisible } = props;
  const close = () => setVisible(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const Item = ({ item }) => {
    const [que, setQue] = useState(isNaN(item.que) ? item.que : 0);
    const ref = useRef(null);

    const handler = useCallback(() => {
      ref.current.style.display = "none";
      dispatch({ type: "destroy", pyaload: { _id: item._id } });
    }, []);
    return (
      <Row ref={ref} align="middle" justify="space-between">
        <Col span={12}>{item.title}</Col>
        <Col span={4}>{item.prise}</Col>
        <Col span={5} style={{ padding: 0 }}>
          <InputNumber value={que} style={{ width: "100%" }} />
        </Col>
        <Col span={3}>
          <Button onClick={handler} style={{ width: "100%" }}>
            <DeleteOutlined />
          </Button>
        </Col>
      </Row>
    );
  };
  return (
    <Drawer visible={visible} onClose={close} title="Ваша корзина" width={500}>
      <Row align="middle" justify="space-between">
        <Col span={12}>Название</Col>
        <Col span={4}>Цена</Col>
        <Col span={6} style={{ textAlign: "start" }}>
          Колличество
        </Col>
        <Col span={2}></Col>
      </Row>
      {state.map((item) => {
        return <Item item={item} key={item._id} />;
      })}
      <Button type="primary" style={{ width: "100%", marginTop: 10 }}>
        <Link to="order" onClick={() => setVisible(false)}>
          Оформить заказ
        </Link>
      </Button>
    </Drawer>
  );
};
export default Header;
