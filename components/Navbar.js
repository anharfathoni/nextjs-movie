import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Switch, Drawer, Menu } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const Div = styled.div`
  height: 10vh;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: #ffffff;
  background: #0e0e0e;
  box-shadow: 0px 0px 5px lightgray;
  .btn-menu {
    display: block;
  }
  p {
    margin: 0;
  }
  .menu {
    display: none;
  }
  .link {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .active {
    color: #ffa023;
  }

  @media (min-width: 768px) {
    padding: 1rem 5rem;
    .menu {
      display: flex;
      align-items: center;
    }
    .btn-menu {
      display: none;
    }
  }
`;

function Navbar({ children, href }) {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onChangeSwitch = (val) => {
    if (val) {
      changeLanguage("id");
    } else {
      changeLanguage("en");
    }
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      setOpenMenu(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  return (
    <Div>
      <Link href="/">
        <p className="cursor-pointer">Moviepedia</p>
      </Link>
      <div className="menu">
        <Link href="/">
          <p className={`link ${router.pathname === "/" ? "active" : ""}`}>
            Home
          </p>
        </Link>
        <Link href="/favourite">
          <p
            className={`ml-4 mr-4 link ${
              router.pathname === "/favourite" ? "active" : ""
            }`}
          >
            Favourite
          </p>
        </Link>
        <Switch
          checkedChildren="IDN"
          unCheckedChildren="ENG"
          defaultChecked
          onChange={onChangeSwitch}
        />
      </div>
      <MenuOutlined className="btn-menu" onClick={() => setOpenMenu(true)} />
      <Drawer
        placement={"right"}
        width={"100%"}
        closable={false}
        onClose={() => setOpenMenu(false)}
        visible={openMenu}
        key={"right"}
      >
        <div className="">
          <div className="flex items-center justify-between mb-12 p-4">
            <h3 className="text-black">
              <b>Moviepedia</b>
            </h3>
            <CloseOutlined
              onClick={() => setOpenMenu(false)}
              className="cursor-pointer"
              style={{ color: "black" }}
            />
          </div>
          <Menu
            style={{ width: "100%", background: "#fff" }}
            defaultSelectedKeys={[""]}
            defaultOpenKeys={[""]}
            mode="inline"
          >
            <Menu.Item className="mt-4">
              <Link href="/">
                <p className="cursor-pointer">Home</p>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/favourite">
                <p className="cursor-pointer">Favourite</p>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Switch
                checkedChildren="IDN"
                unCheckedChildren="ENG"
                defaultChecked
                onChange={onChangeSwitch}
              />
            </Menu.Item>
          </Menu>
        </div>
      </Drawer>
    </Div>
  );
}

export default Navbar;
