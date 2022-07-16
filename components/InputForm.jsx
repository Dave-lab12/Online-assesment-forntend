import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Divider, Typography, Form, Input, Button, Space } from "antd";
import styles from "../styles/Home.module.css";
const InputForm = ({ handleChange, handleSubmit, loading }) => {
  const { Title } = Typography;
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 14,
      span: 18,
    },
  };
  return (
    <div className={styles.inputContainer}>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="Name"
          label="Name"
          placeholder="Enter your name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Email"
          label="Email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ marginLeft: "5px" }}
          >
            Submit
          </Button>
          <Button
            htmlType="button"
            onClick={onReset}
            style={{ marginLeft: "20px" }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputForm;
