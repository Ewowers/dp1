import { Button } from "antd";

import { ShoppingCartOutlined, CheckCircleFilled } from "@ant-design/icons";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
const Card = ({ item }) => {
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>₸{item.prise}</span>
        <Button onClick={click} style={state ? { background: "green", color: "#fff" } : {}}>
          {state ? <CheckCircleFilled /> : <ShoppingCartOutlined />}
        </Button>
      </div>
    </div>
  );
};

export default Card;
