import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Row, Input, Form, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./index.css";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const LoginScreen = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const { login } = useAuth();
  const { t } = useTranslation();

  const onSubmit = async () => {
    await login(username, password).then(
      () => {
        navigate("/Home");
      },
      () => {}
    );
  };

  return (
    <>
      <Row style={{ height: "100vh" }}>
        {/* Sol taraf: Görsel */}
        <Col
          xs={0} // Küçük ekranlarda gizler
          sm={0} // Tablet ekranlarında gizler
          md={0} // Orta ekranlarda yarım genişlik
          lg={12} // Büyük ekranlarda yarım genişlik
          style={{
            background: `url(${require("../../assets/login.png")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />

        {/* Sağ taraf: Login Formu */}
        <Col
          xs={24} // Küçük ekranlarda tam genişlik
          sm={24} // Tablet ekranlarda tam genişlik
          md={24} // Orta ekranlarda yarım genişlik
          lg={12} // Büyük ekranlarda yarım genişlik
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            size={200}
            src={require("../../assets/logo.png")}
            style={{ marginBottom: 10 }}
          />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onSubmit}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Kullanıcı Adı Boş Bırakılamaz",
                },
              ]}
            >
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Kullanıcı Adı"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Şifre boş bırakılamaz",
                },
              ]}
            >
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Şifre"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={auth.loading}
              >
                {t("LOGIN")}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default LoginScreen;
