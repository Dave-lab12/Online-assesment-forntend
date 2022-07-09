import { useRouter } from "next/router";
import axios from "axios";
import nookies from "nookies";
import { BASE_URL } from "../Api";
import { exportXls } from "../utils/exportxls";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
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
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    console.log(selectedKeys, confirm, dataIndex);
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  console.log(internList);
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
      title: "type",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  const {
    user: { email, username },
  } = props;

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getInterns();
  }, []);

  const getInterns = async () => {
    const data = await axios.get(`${BASE_URL}/interns`);
    setInternList(data.data);
  };
  const getInternData = async () => {
    const internsData = await axios.get(
      `${BASE_URL}/interns?populate[answers][populate]=question`
    );
    await exportXls(internsData);
  };
  return (
    <div>
      <div>Username: {username}</div>
      <div>Email: {email}</div>
      <button onClick={getInternData}>Export Excel</button>
      <button onClick={logout}>Logout</button>
      {internList && (
        <Table
          columns={columns}
          dataSource={internList.data}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => {
                console.log(record);
                router.push(`/singleIntern/${record.id}`);
              },
            };
          }}
        />
      )}
      ;
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  let user = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get("http://localhost:1337/api/users/me", {
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
