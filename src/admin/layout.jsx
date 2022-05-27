import { Layout, Menu } from "antd";
import { ProfileOutlined, TagsOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { AdminProduct } from "./product";
const { Content, Sider } = Layout;

function getItem(label, key, icon, link) {
  return {
    key,
    icon,
    label: <Link to={link}>{label}</Link>,
  };
}

const items = [getItem("Товары", "1", <TagsOutlined />, "product"), getItem("Заказы", "2", <ProfileOutlined />, "order")];

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Content>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
                height: "100%",
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
