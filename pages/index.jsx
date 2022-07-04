import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Router from "next/router";
import styles from "../styles/Home.module.css";
import { BASE_URL } from "../Api";
import { Divider, List, Typography, Button, notification } from "antd";
const data = [
  "Make sure you have stable internet connection.",
  "you can not retake the examination again.",
  "make sure the email you add here is similar with your application email.",
  "if you have any problems taking the exam feel free to contact us via our email.",
  "copying and sharing answers is strictly probited.",
];

import Image from "next/image";
const Home = () => {
  const { userData, setUserData, setQuestions } = useContext(UserDataContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const openNotification = (placement, type, content) => {
    notification[type]({
      message: `warning`,
      description: content,
      placement,
    });
  };
  const handleSubmit = async () => {
    if (!userData.Name || !userData.Email) {
      return openNotification("top", "error", "please fill all forms ");
    }
    setLoading(true);
    try {
      const sendUser = await axios.post(BASE_URL + "/interns", {
        data: userData,
      });
      setUserData({ ...userData, id: sendUser.data.data.id });
      const { data } = await axios.get(
        `${BASE_URL}/questions?populate[QuestionType][populate]=isMultiple`
      );
      setQuestions(data.data);
      setLoading(false);
      await Router.push("/question");
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  const { Title } = Typography;

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.homeTitle}>
        <Title>iCog Labs</Title>
        <Image
          src="/static/icog-logo.png"
          alt="logo"
          width="100"
          height="100"
        />
      </div>

      <Title className={styles.subTitle}>Internship Assesment</Title>
      <div className={styles.descriptionContainer}>
        <Divider orientation="left">Berfore We begin</Divider>
        <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text></Typography.Text> {item}
            </List.Item>
          )}
        />
      </div>
      <p> </p>
      <Title level={6}></Title>

      <Title level={5}> Please type in your name and email</Title>
      {error &&
        openNotification(
          "top",
          "error",
          "Something went Wrong make sure your email is not registered before and you have a proper internet connection."
        )}
      <div className={styles.inputContainer}>
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
      </div>

      <Button
        type="primary"
        loading={loading}
        size={"large"}
        onClick={handleSubmit}
      >
        Start
      </Button>
      {/* <button onClick={handleSubmit}>
        Start the assesment {loading && "loading "}
      </button> */}
    </div>
  );
};

export default Home;
