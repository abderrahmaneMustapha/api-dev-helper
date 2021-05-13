import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import Steps from "./pages/steps";
import "antd/dist/antd.css";
import { Layout } from "antd";

const history = createBrowserHistory();

const { Sider } = Layout;
function App() {
    return (
        <>
            <Layout>
                <Sider>Sider</Sider>
                <Layout>
                    <Router history={history}>
                        <Switch>
                         
                            <Route path="/steps" component={Steps} />
                        </Switch>
                    </Router>
                </Layout>
            </Layout>
        </>
    );
}

export default App;
