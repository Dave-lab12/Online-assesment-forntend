import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
import InputForm from "../components/InputForm";
import * as EmailValidator from "email-validator";
import Router from "next/router";
import styles from "../styles/Home.module.css";
import { BASE_URL } from "../Api";
import { Divider, List, Typography, Button, notification, Modal } from "antd";
import platform from "platform";
// var platform = require("platform");
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
  const [visible, setVisible] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value.trim() });
  };
  const openNotification = (placement, type, content) => {
    notification[type]({
      message: `warning`,
      description: content,
      placement,
    });
  };
  const handleSubmit = async (userInputData) => {
    if (!userInputData.Name || !userInputData.Email) {
      return openNotification("top", "error", "please fill all forms ");
    }
    if (!EmailValidator.validate(userInputData.Email)) {
      return openNotification("top", "error", "invalid email");
    }
    setLoading(true);

    try {
      const sendUser = await axios.post(BASE_URL + "/interns", {
        data: {
          ...userInputData,
          osType: `${platform.os.family} ${platform.os.version} ${platform.os.architecture}bit`,
          browser: `${platform.name} ${platform.version}`,
        },
      });
      setUserData({
        ...userInputData,
        id: sendUser.data.data.id,
      });

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

  useEffect(() => {
    error &&
      openNotification(
        "top",
        "error",
        "Something went Wrong make sure your email is not registered before and you have a proper internet connection."
      );
  }, [error]);

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

      <Title style={{ textAlign: "center" }}>Internship Assesment</Title>
      <div className={styles.descriptionContainer}>
        <Divider orientation="left">Berfore We begin</Divider>
        <List
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>

      <Button
        onClick={() => setVisible(true)}
        type={"primary"}
        size={"large"}
        style={{ marginTop: "20px" }}
      >
        Next
      </Button>
      {visible && (
        <Modal
          title="Type in Your name and email"
          style={{ top: 20 }}
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={[]}
          // width={1000}
        >
          <InputForm
            handleSubmit={handleSubmit}
            loading={loading}
            handleChange={handleChange}
          />
        </Modal>
      )}
    </div>
  );
};

export default Home;
