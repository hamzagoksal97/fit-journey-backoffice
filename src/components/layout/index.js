import React, { useEffect, useState } from "react";
import { Layout, Menu, Divider, Avatar } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HomeFilled,
  TeamOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
  LogoutOutlined} from "@ant-design/icons";
import './index.css'; // CSS dosyasını import edin
import { useSelector } from "react-redux";
import { OperationClaims } from "../../constants/operationClaims";

export default function PersistentDrawerLeft() {
  let navigate = useNavigate();
  const [current, setCurrent] = useState("Home");
  const [collapsed, setCollapsed] = useState(false);
  const { Content, Sider } = Layout;
  let location = useLocation();
  const claims = useSelector(state => state.auth.claims);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  const getItem = (label, key, icon, children, options = {}) => {
    return {
      key,
      icon,
      children,
      label,
      ...options,
    };
  };

  const items = [
    getItem('Ana Sayfa', 'Home', <HomeFilled />),
    getItem('Bayiler', 'TenantItems', <TeamOutlined />, [
      getItem('Bayi Listesi', 'Tenants', <UnorderedListOutlined />, null, { requiredClaims: [OperationClaims.TenantAdmin, OperationClaims.GeneralAdmin, OperationClaims.TenantMember.List] }),
      getItem('Bayi Ekle', 'AddTenant', <UsergroupAddOutlined />, null, { requiredClaims: [OperationClaims.TenantAdmin, OperationClaims.GeneralAdmin, OperationClaims.TenantMember.Create] }),
      getItem('Bayi Görüntüle', 'ViewTenant', null, null, { isHidden: true, requiredClaims: [OperationClaims.TenantAdmin, OperationClaims.GeneralAdmin, OperationClaims.TenantMember.View] }),
    ], { requiredClaims: [OperationClaims.TenantAdmin, OperationClaims.GeneralAdmin, OperationClaims.TenantMember.List, OperationClaims.TenantMember.Create] }),
    getItem('Çıkış Yap', 'Logout', <LogoutOutlined />),
  ];



  const filterHiddenItems = (items, userClaims) => {
    return items
      .map(item => {
        // Yetki kontrolü
        const hasPermission = !item.requiredClaims ||
          item.requiredClaims.some(claim => userClaims.includes(claim));
        if (!hasPermission || item.isHidden) {
          return null; // Yetkisi olmayan veya gizli olanları dışarıda bırak
        }

        // Alt öğeleri filtrele
        return {
          ...item,
          children: item.children
            ? filterHiddenItems(item.children, userClaims)
            : undefined
        };
      })
      .filter(Boolean); // Geçersiz öğeleri kaldır
  };
  const visibleItems = filterHiddenItems(items, claims);

  useEffect(() => {
    setCurrent(location.pathname.slice(1));
  }, [location]);

  const getCurrentLabel = () => {
    const currentPath = location.pathname.slice(1);
    const pathSegments = currentPath.split('/');

    // İlk segmenti anahtar olarak kullan
    const mainKey = pathSegments[0];

    // Doğrudan anahtar olarak eşleşen bir parent öğe var mı kontrol et
    const parent = items.find(x => x.key === mainKey);
    if (parent && !parent.children) {
      return parent.label;
    }

    // Alt öğelerde eşleşme olup olmadığını kontrol et
    for (const parent of items) {
      if (parent.children) {
        const child = parent.children.find(x => x.key === mainKey);
        if (child) {
          return child.label;
        }
      }
    }

    // Eğer eşleşme bulunamazsa, boş string döndür
    return '';
  };



  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={250}
        >
          <div
            style={{
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >

            <Avatar
              size={collapsed ? 80 : 200} // Menü kapalıysa küçük, açıkken büyük
              src={require("../../assets/logo.png")}
              style={{
                width: collapsed ? 80 : 200, // Responsive boyutlandırma
                height: collapsed ? 80 : 200, // Responsive boyutlandırma
              }}
            />
          </div>

          <Menu
            theme="light"
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            items={visibleItems}
            style={{ marginTop: 5 }}
          />

        </Sider>

        <Layout className="site-layout">
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Divider>{getCurrentLabel()}</Divider>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
