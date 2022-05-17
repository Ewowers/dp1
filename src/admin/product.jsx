import axios from "axios";
import { Button, Drawer, Space, Form, Input, Select, InputNumber, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import categoryes from "../category";
import { useForm } from "antd/lib/form/Form";
const { Option } = Select;
const { Column } = Table;
export const AdminProduct = () => {
  const [product, setProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState({});
  const get = () => {
    axios.get("/api/product").then((res) =>
      setProducts(
        res.data.map((item, i) => {
          return { ...item, key: i };
        })
      )
    );
  };
  const getInfo = (id) => {
    setEdit(true);
    axios.get("/api/product/id=" + id).then((res) => setInfo(res.data));
  };
  const destroy = (id) => {
    axios.delete("/api/product/" + id).then((res) => get());
  };
  useEffect(() => {
    get();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flexGrow: 0 }}>
        <Space>
          <Button type="primary" onClick={() => setProduct(true)}>
            Создать товар
          </Button>
        </Space>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Table dataSource={products}>
          <Column title="Название" dataIndex="title" key="key" />
          <Column title="Цена" dataIndex="prise" key="key" />
          <Column title="Категория" dataIndex="category" key="key" />
          <Column
            title=""
            dataIndex="action"
            key="key"
            render={(nu, action) => (
              <>
                <Button type="primary" onClick={() => getInfo(action._id)}>
                  Информация
                </Button>
                <Button type="primary" danger onClick={() => destroy(action._id)}>
                  Удалить
                </Button>
              </>
            )}
          />
        </Table>
      </div>
      <Product get={get} state={product} setState={setProduct} />
      <Information categoryes={categoryes} state={edit} setState={setEdit} info={info} />
    </div>
  );
};
const Product = ({ state, setState, get }) => {
  const [cat, setCat] = useState(0);
  const [error, setError] = useState(null);
  const image = useRef(null);
  const draw = useRef(null);
  const { information } = categoryes[cat];
  const changeSelect = (value) => setCat(value);
  const onFinish = (values) => {
    let img = [];
    for (let i in image.current.children) {
      if (image.current.children[i].src !== undefined) img.push(image.current.children[i].src);
    }
    let body = {
      title: values.title,
      prise: values.prise,
      category: categoryes[Number(values.category)].name,
      image: img,
    };
    delete values.title;
    delete values.prise;
    delete values.category;
    body.information = values;
    axios.post("/api/product", body).then((res) => {
      if (res.data.status) {
        setState(false);
        setError(null);
        get();
      } else {
        setError(res.data.message);
      }
    });
  };
  return (
    <Drawer ref={draw} title="Создать товар" visible={state} onClose={() => setState(false)} width={800}>
      <Form layout="vertical" onFinish={onFinish}>
        <h1 style={{ color: "red", textAlign: "center" }}>{error}</h1>
        <Images refq={image} />
        <Form.Item label="Название" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Цена" name="prise">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Категория товара" name="category">
          <Select style={{ width: "100%" }} onChange={changeSelect}>
            {categoryes.map((item, i) => {
              return (
                <Option key={i} value={i}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="information">
          {information.map((item, i) => (
            <Form.Item label={item.label} name={item.name} key={i}>
              <Input />
            </Form.Item>
          ))}
        </Form.Item>
        <Form.Item>
          <Button style={{ width: "100%" }} htmlType="submit" type="primary">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const Information = ({ info, state, setState, categoryes }) => {
  const [error, setError] = useState(null);
  const [cat, setCat] = useState(0);
  const images = useRef(null);
  const { information } = categoryes[cat];
  const changeSelect = (value) => setCat(value);
  const onFinish = () => {};
  let [form] = useForm();
  useEffect(() => {
    let body = { title: info?.title, ...info?.information };

    form.setFieldsValue(body);
  }, [state === true]);
  return (
    <Drawer title={info.title} visible={state} onClose={() => setState(false)}>
      <Images refq={images} defaultImage={info.image} />
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <h1 style={{ color: "red", textAlign: "center" }}>{error}</h1>
        <Form.Item label="Название" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Цена" name="prise">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Категория товара" name="category">
          <Select style={{ width: "100%" }} onChange={changeSelect}>
            {categoryes.map((item, i) => (
              <Option key={i} value={i}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {information.map((item, i) => (
          <Form.Item label={item.label} name={item.name} key={i}>
            <Input />
          </Form.Item>
        ))}
        <Form.Item>
          <Button style={{ width: "100%" }} htmlType="submit" type="primary">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const Images = ({ refq, defaultImage = [] }) => {
  const image = useRef(null);
  const resault = refq;
  const upload = (event) => {
    if (window.File && window.FileList && window.FileReader) {
      defaultImage.slice(0, defaultImage.length - 1);
      while (resault.current.firstChild) {
        resault.current.removeChild(resault.current.firstChild);
      }
      let files = event.target.files; //FileList object
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (!file.type.match("image")) continue;
        let picReader = new FileReader();
        picReader.addEventListener("load", function (event) {
          let picFile = event.target;
          let img = document.createElement("img");
          img.src = picFile.result;
          img.width = 48;
          img.height = 48;
          resault.current.append(img);
          resault.current.insertBefore(img, null);
        });
        //Read the image
        picReader.readAsDataURL(file);
      }
    } else {
      console.log("Your browser does not support File API");
    }
  };
  return (
    <>
      <Button icon={<UploadOutlined />} onClick={() => image.current.click()}>
        Картинки
      </Button>
      <div>
        {defaultImage.map((item, i) => (
          <img src={item} key={i} width={48} height={48} />
        ))}
      </div>
      <div ref={resault} style={{ marginTop: 10, marginBottom: 10 }}></div>
      <input
        type="file"
        multiple
        ref={image}
        style={{ display: "none" }}
        onChange={function (e) {
          upload(e);
        }}
      />
    </>
  );
};
