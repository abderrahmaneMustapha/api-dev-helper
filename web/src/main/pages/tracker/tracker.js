import React from "react";
import {
    Avatar,
    Tooltip,
    Space,
    List,
    Progress,
    Tag,
    Divider,
    Row,
    Col,
} from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";

const list = [
    {
        name: "AbderrahmaneMustapha",
        progress: 30,
    },
    {
        name: "AbderrahmaneMustapha",
        progress: 30,
    },
    {
        name: "AbderrahmaneMustapha",
        progress: 30,
    },
];

const listLogs = [
    {
        user: "AbderrahmaneMustapha",
        action: "moved",
        from: "backlog",
        to: "design",
        description: "refactor get products controllers ",
    },
    {
        user: "AhmedYacine",
        action: "moved",
        from: "to-do",
        to: "review",
        description: "refactor get products controllers ",
    },
    {
        user: "Mohammed",
        action: "moved",
        from: "review",
        to: "testing",
        description: "refactor get products controllers ",
    },
];

const tagsData = [
    "backlog",
    "to-do",
    "doing",
    "testing",
    "review",
    "done",
    "all tasks",
];
const Tracker = () => {
    const [selectedTags, setSelectedTags] = React.useState(["backlog"]);
    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        console.log("You are interested in: ", nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };
    return (
        <>
            <Row>
                <Col span={15}>
                    <Space>
                        <Avatar.Group
                            maxCount={5}
                            size="large"
                            maxStyle={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                            }}
                        >
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar
                                style={{
                                    backgroundColor: "#f56a00",
                                }}
                            >
                                K
                            </Avatar>

                            <Avatar
                                style={{
                                    backgroundColor: "#f56a00",
                                }}
                            >
                                NA
                            </Avatar>

                            <Avatar
                                style={{
                                    backgroundColor: "#f56a00",
                                }}
                            >
                                DN
                            </Avatar>
                            <Tooltip title="Ant User" placement="top">
                                <Avatar
                                    style={{
                                        backgroundColor: "#87d068",
                                    }}
                                    icon={<UserOutlined />}
                                />
                            </Tooltip>
                            <Avatar
                                style={{
                                    backgroundColor: "#1890ff",
                                }}
                                icon={<AntDesignOutlined />}
                            />
                        </Avatar.Group>
                    </Space>
                    <Space direction="vertical" style={{ minWidth: "100%" }}>
                        <List
                            className="demo-loadmore-list"
                            header={
                                <Space direction="horizontal">
                                    <h3 style={{maxWidth:"fit-content"}}>Tasks</h3>
                                   
                                        {tagsData.map((tag) => (
                                            <Tag.CheckableTag
                                                key={tag}
                                                checked={
                                                    selectedTags.indexOf(tag) >
                                                    -1
                                                }
                                                onChange={(checked) =>
                                                    handleChange(tag, checked)
                                                }
                                            >
                                                {tag}
                                            </Tag.CheckableTag>
                                        ))}
                                    
                                </Space>
                            }
                            itemLayout="horizontal"
                            dataSource={list}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={
                                            <a href="https://ant.design">
                                                {item.name}
                                            </a>
                                        }
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                    <div style={{ width: "20%" }}>
                                        <Progress
                                            percent={item.progress}
                                            size="small"
                                        />
                                    </div>
                                </List.Item>
                            )}
                        />
                        <Divider />
                        <List
                            className="demo-loadmore-list-log"
                            header={<h3>Tasks log</h3>}
                            itemLayout="horizontal"
                            dataSource={listLogs}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta description="05/23/2021  07:44pm" />
                                    <div style={{ width: "80%" }}>
                                        <span style={{ color: "#1890FF" }}>
                                            @{item.user}
                                        </span>{" "}
                                        {item.action} {item.description} from{" "}
                                        {item.from} to {item.to}
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Space>
                </Col>
                <Col span={6}></Col>
            </Row>
        </>
    );
};

export default Tracker;
