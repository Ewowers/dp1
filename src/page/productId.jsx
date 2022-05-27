import { Col, Row, Image, Button } from "antd";
import { ShoppingCartOutlined, CheckOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import categorys from "../category";
export const ProductId = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({ image: [] });
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(false);
  useEffect(() => {
    fetch("/api/product/id=" + id)
      .then((res) => res.json())
      .then((res) => setProduct(res));
  }, []);
  let fo = [];
  for (let key in product.information) {
    let i = categorys.find((item) => item.name === product.category);
    let ki = i.information.find((item) => item.name === key);
    fo.push(
      <Row key={key}>
        <Col span={12}>
          <CheckOutlined /> {ki.label}
        </Col>
        <Col span={12}>{product.information[key]}</Col>
      </Row>
    );
  }
  const dispatch = useDispatch();
  const handler = useCallback(() => {
    dispatch({ type: "add", payload: product });
  }, []);
  const click = () => {
    setState(true);
    handler();
    setTimeout(() => setState(false), 1000);
  };
  return (
    <Row justify="center">
      <Col md={20}>
        <Row>
          <Col span={24}>
            <h1>Название товара: {product.title}</h1>
          </Col>
          <Col span={12}>
            <Image preview={{ visible: false }} width="100%" src={product.image[0]} onClick={() => setVisible(true)} />
            <div style={{ display: "none" }}>
              <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
                {product?.image?.map((item, i) => (
                  <Image src={item} key={i} />
                ))}
              </Image.PreviewGroup>
            </div>
          </Col>
          <Col span={12}>
            <h1 style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span>{product.prise}₸</span>
              <Button type="primary" onClick={click}>
                {state ? (
                  <span>
                    Товар добавлен в корзину <CheckCircleOutlined />
                  </span>
                ) : (
                  <span>
                    Купить <ShoppingCartOutlined />
                  </span>
                )}
              </Button>
            </h1>{" "}
            {fo}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
