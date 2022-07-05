import { useRouter } from "next/router";
import axios from "axios";
import nookies from "nookies";
import writeXlsxFile from "write-excel-file";
const Profile = (props) => {
  const router = useRouter();
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
  const handleExport = async () => {
    const HEADER_ROW = [
      {
        value: "Name",
        fontWeight: "bold",
      },
      {
        value: "Date of Birth",
        fontWeight: "bold",
      },
      {
        value: "Cost",
        fontWeight: "bold",
      },
      {
        value: "Paid",
        fontWeight: "bold",
      },
    ];

    const DATA_ROW_1 = [
      // "Name"
      {
        type: String,
        value: "John Smith",
      },

      // "Date of Birth"
      {
        type: Date,
        value: new Date(),
        format: "mm/dd/yyyy",
      },
    ];
    const data = [HEADER_ROW, DATA_ROW_1];
    await writeXlsxFile(data, {
      //
      columns, // (optional) column widths, etc.
      fileName: "file.xlsx",
    });
  };
  return (
    <div>
      <div>Username: {username}</div>
      <div>Email: {email}</div>
      <button onClick={handleExport}>Export Excel</button>
      <button onClick={logout}>Logout</button>
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
