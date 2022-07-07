import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Divider, Typography, Button, Input } from "antd";
import styles from "../styles/Home.module.css";
const InputForm = ({ handleChange }) => {
  const { Title } = Typography;
  return (
    <div className={styles.inputContainer}>
      {/* <Title level={5}> Please type in your name and email</Title> */}
      <Divider orientation="left">Name</Divider>
      <Input
        placeholder="Name"
        prefix={<UserOutlined />}
        onChange={(e) => handleChange(e)}
        name="Name"
        size="large"
      />
      <Divider orientation="left">Email</Divider>
      <Input
        placeholder="Email"
        prefix={<UserOutlined />}
        onChange={(e) => handleChange(e)}
        name="Email"
        size="large"
      />
      <Divider orientation="left"></Divider>
      {/* 
      <Button
        type="primary"
        loading={loading}
        size={"large"}
        onClick={handleSubmit}
      >
        Start
      </Button> */}
    </div>
  );
};

export default InputForm;
