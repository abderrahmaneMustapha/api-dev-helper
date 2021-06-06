import { Route, Switch, useHistory } from "react-router-dom";
import Steps from "./pages/steps/steps";
import Tracker from "./pages/tracker/tracker";
import "antd/dist/antd.css";
import {
    PieChartOutlined,
    LineChartOutlined,
    HomeOutlined,
    SettingOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { useState } from "react";
const { Sider } = Layout;

function App() {
    const [active_keys, setItemToActive] = useState(["1"]);
    const [collapsed, onCollapse] = useState(false);
    const history = useHistory()
    return (
        <Layout>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
            >
                <Menu
                    theme="dark"
                    defaultSelectedKeys={active_keys}
                    mode="inline"
                >
                    <Menu.Item
                        onClick={(item) => {
                            item.domEvent.preventDefault();    
                            history.push(`/home`)
                            setItemToActive([item]);
                        }}
                        key="1"
                        icon={<HomeOutlined />}
                    >
                        Home
                    </Menu.Item>
                    <Menu.Item
                        onClick={(item) => {
                            item.domEvent.preventDefault();                                   
                            history.push(`/steps`)
                            setItemToActive([item]);
                        }}
                        key="2"
                        icon={<PieChartOutlined />}
                    >
                        Steps
                    </Menu.Item>
                    <Menu.Item
                        onClick={(item) => {
                            item.domEvent.preventDefault();                               
                            history.push(`/tracker`)
                            setItemToActive([item])
                        }}
                        key="3"
                        icon={<LineChartOutlined />}
                    >
                        Tracker
                    </Menu.Item>
                    <Menu.Item
                        onClick={(item) => {
                            item.domEvent.preventDefault();
                            history.push(`/settings`)
                            setItemToActive([item]);
                        }}
                        key="4"
                        icon={<SettingOutlined />}
                    >
                        Settings
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Switch component={App}>
                    <Route path="/steps" component={Steps} />
                    <Route path="/tracker" component={Tracker} />
                </Switch>
            </Layout>
        </Layout>
    );
}

export default App;
