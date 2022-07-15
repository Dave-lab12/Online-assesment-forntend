import { useRouter } from "next/router";
import axios from "axios";
import nookies, { destroyCookie } from "nookies";
import { BASE_URL } from "../Api";
import { exportXls } from "../utils/exportxls";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Descriptions,
  PageHeader,
  Statistic,
  Spin,
  notification,
} from "antd";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
const data = [
  {
    id: 1,
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    id: 2,
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    id: 3,
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    id: 4,
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
const Profile = (props) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [internList, setInternList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    console.log(selectedKeys, confirm, dataIndex);
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const getTotalCountOfPlagarism = (data = []) => {
    let titleCopied = 0;
    let tabsSwitched = 0;
    let answersPasted = 0;

    data.forEach((item) => {
      if (item.attributes.copiedTitle) {
        titleCopied++;
      }
      if (item.attributes.countSwitchedTabs) {
        tabsSwitched++;
      }
      if (item.attributes.pastedAnswers) {
        answersPasted++;
      }
    });
    return { titleCopied, tabsSwitched, answersPasted };
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      ...getColumnSearchProps("id"),
      render: (item) => item,
    },
    {
      title: "Name",
      dataIndex: "attributes",
      key: "Name",
      width: "30%",
      ...getColumnSearchProps("attributes"),
      render: (item) => item.Name,
    },
    {
      title: "Email",
      dataIndex: ["attributes"],
      key: "Email",
      width: "30%",
      ...getColumnSearchProps(["attributes"]),
      render: (item) => item.Email,
    },
    {
      title: "Plagarism detection",
      dataIndex: ["attributes"],
      key: "address",
      ...getColumnSearchProps(["attributes"]),
      render: (item) => {
        const { titleCopied, tabsSwitched, answersPasted } =
          getTotalCountOfPlagarism(item.answers.data);
        if (titleCopied < 2 && tabsSwitched < 2 && answersPasted < 1) {
          return <span style={{ color: "green" }}>Low</span>;
        } else if (titleCopied < 5 && tabsSwitched < 5 && answersPasted < 3) {
          return <span style={{ color: "darkkhaki" }}>Medium</span>;
        } else {
          return <span style={{ color: "red" }}>High</span>;
        }
      },
    },
  ];

  const {
    user: { email, username },
  } = props;

  const logout = async () => {
    try {
      const dat = await axios.get("/api/logout");
      await router.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getInterns();
  }, []);
  const openNotification = (placement, type, content) => {
    notification[type]({
      message: type,
      description: content,
      placement,
    });
  };
  const getInterns = async () => {
    const data = await axios.get(`${BASE_URL}/interns?populate=answers`);
    setInternList(data.data);
    setLoading(false);
  };
  const getInternData = async () => {
    setLoadingExcel(true);
    try {
      const internsData = await axios.get(
        `${BASE_URL}/interns?populate[answers][populate]=question`
      );
      await exportXls(internsData);
      setLoadingExcel(false);
      openNotification("topRight", "success", "Excel exported successfully");
    } catch (error) {
      console.log(error);
      openNotification("topRight", "error", "Something went wrong");
      setLoadingExcel(false);
    }
  };
  const renderContent = (column = 1, name, email) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="Name">{name}</Descriptions.Item>
      <Descriptions.Item label="Email">{email}</Descriptions.Item>
    </Descriptions>
  );
  const extraContent = (
    <div
      style={{
        display: "flex",
        width: "max-content",
        justifyContent: "flex-end",
      }}
    >
      <Statistic
        title="Applicant List"
        style={{ textAlign: "center" }}
        value={internList.data ? internList.data.length : 0}
      />
    </div>
  );

  const Content = ({ children, extra }) => (
    <div className="content" style={{ display: "flex" }}>
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );
  return (
    <div>
      <Spin tip="Loading..." spinning={loading}>
        <PageHeader
          className="site-page-header-responsive"
          title="Home"
          extra={[
            <Button key="2" onClick={getInternData} loading={loadingExcel}>
              Export Excel
            </Button>,
            <Button key="1" type="danger" onClick={logout}>
              Logout
            </Button>,
          ]}
        >
          <Content extra={extraContent}>
            {renderContent(1, username, email)}
          </Content>
        </PageHeader>
        {internList && (
          <Table
            columns={columns}
            dataSource={internList.data}
            onRow={(record, rowIndex) => {
              return {
                onDoubleClick: (event) => {
                  router.push(`/singleIntern/${record.id}`);
                },
              };
            }}
          />
        )}
      </Spin>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  let user = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(BASE_URL + "/users/me", {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default Profile;
