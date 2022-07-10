import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Card, notification } from "antd";
import { useRouter } from "next/router";
import axios from "axios";

const login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const openNotification = (placement, type, content) => {
    notification[type]({
      message: `warning`,
      description: content,
      placement,
    });
  };
  useEffect(() => {
    if (error) {
      openNotification("top", "error", "invalid email or password");
      setError(false);
    }
  }, [error]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("/api/login", {
        email: data.email,
        password: data.password,
      });
      router.push("/profile");
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };
  return (
    <Card
      style={{ width: "30%", maxWidth: "800px", margin: "auto" }}
      title="Login"
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default login;
