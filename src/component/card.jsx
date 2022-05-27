import { Button, Modal, Col, Row } from "antd";
import categorys from "../category";
import { ShoppingCartOutlined, CheckCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Card = ({ item, gor }) => {
  const dispatch = useDispatch();
  const handler = useCallback(() => {
    dispatch({ type: "add", payload: item });
  }, []);
  const [state, setState] = useState(false);

  const click = () => {
    setState(true);
    handler();
    setTimeout(() => setState(false), 1000);
  };

  return (
    <div style={{ width: 280, padding: 10, borderRadius: 10 }}>
      <img src={item.image[0]} alt={item.title} width="100%" height={200} />
      <p style={{ fontSize: 18, margin: 0 }}>
        <strong>{item.title}</strong>
      </p>
      <span style={{ color: "red" }}>
        {gor ? (
          <a href="https://www.youtube.com/results?search_query=%D0%B1%D1%8B%D0%BB%D0%B0+%D1%86%D0%B5%D0%BD%D0%B0+%D0%BA%D1%80%D1%83%D0%B3%D0%BB%D0%B0%D1%8F+%D0%BA%D1%83%D1%81%D1%8C-%D0%BA%D1%83%D1%81%D1%8C+%D0%B8+%D0%B2%D0%B6%D0%B5+%D0%BC%D0%B0%D0%BB%D0%B5%D0%BD%D1%8C%D0%BA%D0%B0">
            Горячо
          </a>
        ) : null}
      </span>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>₸{item.prise}</span>
        <div>
          <Button onClick={click} style={state ? { background: "green", color: "#fff" } : {}}>
            {state ? <CheckCircleFilled /> : <ShoppingCartOutlined />}
          </Button>
          <Button>
            <Link to={"/product/" + item._id}>
              <InfoCircleOutlined />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
