import { Button, Result } from 'antd';
import React from 'react';
import Router from "next/router";
const App = () => (
    <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary" onClick={() => Router.push("/")}>Back Home</Button>}
    />
);

export default App;