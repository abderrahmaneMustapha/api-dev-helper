import { Router, Route, Switch } from "react-router";
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
import { createBrowserHistory } from "history";
const browserHistory = createBrowserHistory();

const { Sider } = Layout;
function App() {
    const [active_keys, setItemToActive] = useState(["1"]);
    const [collapsed, onCollapse] = useState(false);

    return (
        <>
            <Router history={browserHistory}>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={onCollapse}
                    >
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            defaultSelectedKeys={active_keys}
                            mode="inline"
                        >
                            <Menu.Item
                                onClick={(item) => {
                                    item.domEvent.preventDefault();
                                    setItemToActive([item]);
                                    window.location.replace(`${window.location.origin}/home`)
                                }}
                                key="1"
                                icon={<HomeOutlined />}
                            >
                                Home
                            </Menu.Item>
                            <Menu.Item
                                onClick={(item) => {
                                    item.domEvent.preventDefault();
                                    setItemToActive([item]);
                                    window.location.assign(`${window.location.origin}/steps`)
                                }}
                                key="2"
                                icon={<PieChartOutlined />}
                            >
                                Steps
                            </Menu.Item>
                            <Menu.Item
                                onClick={(item) => {
                                    item.domEvent.preventDefault();
                                    setItemToActive([item])
                                    window.location.assign(`${window.location.origin}/tracker`)
                                }}
                                key="3"
                                icon={<LineChartOutlined />}
                            >
                                Tracker
                            </Menu.Item>

                            <Menu.Item
                                onClick={(item) => {
                                    item.domEvent.preventDefault();
                                    setItemToActive([item]);
                                    window.location.assign(`${window.location.origin}/settings`)
                                    
                                }}
                                key="4"
                                icon={<SettingOutlined />}
                            >
                                Settings
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Switch>
                            <Route path="/steps" component={Steps} />
                            <Route path="/tracker" component={Tracker} />
                        </Switch>
                    </Layout>
                </Layout>
            </Router>
        </>
    );
}

export default App;
