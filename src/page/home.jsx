import { Tabs, Carousel, Col, Row } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import img from "../image/slider.png";
import img2 from "../image/PROD.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "../component/card";

const { TabPane } = Tabs;

export const Home = () => {
  const [products, setProducts] = useState([]);
  const slider = useRef(null);
  const next = () => slider.current.next();
  const prew = () => slider.current.prew();
  useEffect(() => {
    axios.get("/api/product").then((res) => setProducts(res.data));
  }, []);
  return (
    <>
      <Row justify="center">
        <Col span={20}>
          <Row>
            <Col span={24}>
              <div style={{ position: "relative" }}>
                <div style={{ ...arrow, left: 0 }} onClick={prew}>
                  <LeftOutlined />
                </div>
                <div style={{ ...arrow, right: 0 }} onClick={next}>
                  <RightOutlined />
                </div>
                <Carousel ref={slider}>
                  <div>
                    <img src={img} alt="slide1" width="100%" height="400" />
                  </div>
                  <div>
                    <img src={img2} alt="slide1" width="100%" height="400" />
                  </div>
                </Carousel>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Tabs>
                <TabPane tab="Новое поступление" key="1">
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "space-between" }}>
                    {products.splice(0, 19).map((item) => (
                      <Card item={item} key={item._id} />
                    ))}
                  </div>
                </TabPane>
                <TabPane tab="Горячие товары" key="2">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {products
                      .reverse()
                      .splice(0, 19)
                      .map((item) => (
                        <Card item={item} key={item._id} gor={true} />
                      ))}
                  </div>
                </TabPane>
              </Tabs>
            </Col>
            <Col span={24} style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
              <div style={{ textAlign: "center", margin: 10 }}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, background: "rgba(1, 86, 255, 1)", color: "#fff", padding: 10, borderRadius: 50, marginBottom: 20 }}
                >
                  headset_mic
                </span>
                <p>
                  <strong>Поддержка продукта</strong>
                </p>
                <p>
                  Гарантия с выездом на место до 3 лет <br /> для вашего спокойствия.
                </p>
              </div>

              <div style={{ textAlign: "center", margin: 10 }}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, background: "rgba(1, 86, 255, 1)", color: "#fff", padding: 10, borderRadius: 50, marginBottom: 20 }}
                >
                  account_circle
                </span>
                <p>
                  <strong>Доставка товара</strong>
                </p>
                <p>Любую точку Казахстана</p>
              </div>

              <div style={{ textAlign: "center", margin: 10 }}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, background: "rgba(1, 86, 255, 1)", color: "#fff", padding: 10, borderRadius: 50, marginBottom: 20 }}
                >
                  sell
                </span>
                <p>
                  <strong>Удивительная экономия</strong>
                </p>
                <p>
                  Скидки до 70 % на новые продукты. <br /> Вы можете быть уверены в лучшей цене.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
let arrow = { width: 100, height: "100%", zIndex: 1, position: "absolute", top: 0, color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 24 };
