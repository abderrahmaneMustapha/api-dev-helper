import React, { useEffect } from "react";
import {
    Card,
    Result,
    Tag,
    Button,
    Input,
    message,
    Space,
    Select,
    Spin,
    List,
} from "antd";
import { Bar, Pie } from "@ant-design/charts";
import { SearchOutlined, CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";

var data = [
    {
        state: "Open",
        year: "12-12-2020",
        value: 502,
    },
    {
        state: "Open",
        year: "12-10-2020",
        value: 635,
    },
    {
        state: "Open",
        year: "12-15-2020",
        value: 809,
    },
    {
        state: "Open",
        year: "12-10-2020",
        value: 947,
    },
    {
        state: "Open",
        year: "12-12-2020",
        value: 1402,
    },
    {
        state: "Open",
        year: "12-10-2020",
        value: 3634,
    },
    {
        state: "Open",
        year: "12-12-2020",
        value: 5268,
    },
    {
        state: "Solved",
        year: "12-13-2020",
        value: 106,
    },
    {
        state: "Solved",
        year: "12-13-2020",
        value: 107,
    },
    {
        state: "Solved",
        year: "12-12-2020",
        value: 111,
    },
    {
        state: "Solved",
        year: "12-11-2020",
        value: 133,
    },
    {
        state: "Solved",
        year: "12-11-2020",
        value: 221,
    },
    {
        state: "Solved",
        year: "12-12-2020",
        value: 767,
    },
    {
        state: "Solved",
        year: "12-12-2020",
        value: 1766,
    },
    {
        state: "Closed",
        year: "12-12-2020",
        value: 163,
    },
    {
        state: "Closed",
        year: "12-12-2020",
        value: 203,
    },
    {
        state: "Closed",
        year: "12-15-2020",
        value: 276,
    },
    {
        state: "Closed",
        year: "12-15-2020",
        value: 408,
    },
    {
        state: "Closed",
        year: "12-15-2020",
        value: 547,
    },
    {
        state: "Closed",
        year: "12-15-2020",
        value: 729,
    },
    {
        state: "Closed",
        year: "12-15-2020",
        value: 628,
    },
];

var prdata = [
    {
        state: "Merged",
        year: "12-12-2020",
        value: 502,
    },
    {
        state: "Merged",
        year: "12-10-2020",
        value: 635,
    },
    {
        state: "Merged",
        year: "12-15-2020",
        value: 809,
    },
    {
        state: "Merged",
        year: "12-10-2020",
        value: 947,
    },
    {
        state: "Merged",
        year: "12-12-2020",
        value: 1402,
    },
    {
        state: "Merged",
        year: "12-10-2020",
        value: 3634,
    },
    {
        state: "Merged",
        year: "12-12-2020",
        value: 5268,
    },
    {
        state: "Not yet",
        year: "12-13-2020",
        value: 106,
    },
    {
        state: "Not yet",
        year: "12-13-2020",
        value: 107,
    },
    {
        state: "Not yet",
        year: "12-12-2020",
        value: 111,
    },
    {
        state: "Not yet",
        year: "12-11-2020",
        value: 133,
    },
    {
        state: "Not yet",
        year: "12-11-2020",
        value: 221,
    },
    {
        state: "Not yet",
        year: "12-12-2020",
        value: 767,
    },
    {
        state: "Not yet",
        year: "12-12-2020",
        value: 1766,
    },
    {
        state: "Closed",
        year: "12-12-2020",
        value: 163,
    },
    {
        state: "Closed",
        year: "12-12-2020",
        value: 203,
    },
    {
        state: "Closed",
        year: "12-15-2020",
        value: 276,
    },
    {
        state: "Closed",
        year: "12-15-2020",
        value: 408,
    },
    {
        state: "Closed",
        year: "12-15-2020",
        value: 547,
    },
    {
        state: "Closed",
        year: "12-15-2020",
        value: 729,
    },
    {
        state: "Closed",
        year: "12-15-2020",
        value: 628,
    },
];

var piedata = [
    {
        state: "Respecting",
        value: 502,
    },
    {
        state: "Not respecting",
        value: 635,
    },
];

const fakeDataUrl =
    "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";
const faketagsData = [
    {
        id: 3,
        name: "stg-v1.13.4-pr301.3",
        type: "pre-release",
        respect: "no",
        by: "ziban pirate",
    },
    {
        id: 1,
        name: "stg-v1.13.4-pr301.3",
        type: "pre-release",
        respect: "yes",
        by: "ziban pirate",
    },
    {
        id: 2,
        name: "stg-v1.13.4-pr301.3",
        type: "pre-release",
        respect: "yes",
        by: "ziban pirate",
    },
    {
        id: 0,
        name: "stg-v1.13.4-pr301.3",
        type: "pre-release",
        respect: "no",
        by: "ziban pirate",
    },
];
const Checks = () => {
    const repoFoundMessage = (repository, owner) => {
        message.success(
            `Connected to repo succesfully, ${repository} owned by  ${owner}`
        );
    };

    /* const repoNotFoundMessage = ()=>{
        message.success("Can not connecte to repo ")
    }*/

    const SearchForRepo = () => {
        let owner = document.getElementById("owner-name-input").value;
        let repository = document.getElementById("repo-name-input").value;

        repoFoundMessage(repository, owner);
    };

    var issuesConfig = {
        data: data,
        autoFit: false,
        width: 350,
        xField: "value",
        yField: "year",
        seriesField: "state",
        isPercent: true,
        isStack: true,

        label: {
            position: "middle",
            content: function content(item) {
                return item.value.toFixed(2);
            },
            style: { fill: "#fff" },
        },
    };
    var pullRequestConfig = {
        data: prdata,
        autoFit: false,
        width: 350,
        xField: "value",
        yField: "year",
        seriesField: "state",
        isPercent: true,
        isStack: true,

        label: {
            position: "middle",
            content: function content(item) {
                return item.value.toFixed(2);
            },
            style: { fill: "#fff" },
        },
    };

    var commitsconfig = {
        autoFit: false,
        width: 350,

        appendPadding: 0,
        data: piedata,
        angleField: "value",
        colorField: "state",
        color: ["#F55F5B", "#52C41A"],
        radius: 0,
        innerRadius: 0.64,
        legend: {
            layout: "horizontal",
            position: "top",
        },
        meta: {
            state: {
                alias: "aaaa",
                range: [0, 1],
                formatter: function formatter(v) {
                    return v;
                },
            },
            value: {
                formatter: function formatter(v) {
                    return v;
                },
            },
        },
        label: {
            type: "inner",
            offset: "-50%",
            style: { textAlign: "center" },
            autoRotate: false,
            content: "{value}",
        },

        interactions: [
            { type: "element-default" },
            { type: "element-selected" },
            { type: "element-active" },
            { type: "pie-statistic-active" },
        ],
        statistic: {
            title: {
                style: { fontWeight: "2em" },
                formatter: function formatter(item) {
                    return "Number of commits";
                },
            },
        },
    };

    var branchconfig = {
        autoFit: false,
        width: 350,
        appendPadding: 0,
        data: piedata,
        angleField: "value",
        colorField: "state",
        color: ["#F55F5B", "#52C41A"],

        legend: {
            layout: "horizontal",
            position: "top",
        },
        radius: 1,
        innerRadius: 0.64,

        label: {
            type: "inner",
            offset: "50%",
            style: { textAlign: "center" },
            autoRotate: false,
            content: "{value}",
        },
        interactions: [
            { type: "element-selected" },
            { type: "element-active" },
            { type: "pie-statistic-active" },
        ],
        statistic: {
            title: {
                style: { fontWeight: "2em" },
                formatter: function formatter(item) {
                    return "Number of branches";
                },
            },
        },
    };

    const [tagsData, setTagsData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(false);

    useEffect(() => {
        fetchData((res) => {
            setTagsData(res.results);
        });
    }, []);

    const fetchData = (callback) => {
        fetch(fakeDataUrl)
            .then((response) => response.json())
            .then((data) => callback(data));
    };

    const handleInfiniteOnLoad = () => {
        let data = tagsData;
        setLoading(true);
        if (data.length > 14) {
            message.warning("Infinite List loaded all");
            setLoading(false);
            setHasMore(false);
            return;
        }
        this.fetchData((res) => {
            data = data.concat(res.results);
            setTagsData(data);
        });
    };

    return (
        <>
            <Space style={{ width: "100%", marginBottom: "2em" }} size={10}>
                <Input.Group style={{ width: "100%" }} compact>
                    <Input
                        id="owner-name-input"
                        required="true"
                        style={{ width: "40%" }}
                        placeholder="owner"
                    />
                    <Input
                        id="repo-name-input"
                        style={{ width: "50%" }}
                        placeholder="repository"
                    />
                    <Button
                        onClick={SearchForRepo}
                        icon={<SearchOutlined />}
                    ></Button>
                </Input.Group>
                <Tag>
                    <span className="span-tag-text">Commits: </span> 234
                </Tag>
                <Tag>
                    <span className="span-tag-text">Pull requests: </span> 234
                </Tag>
                <Tag>
                    <span className="span-tag-text">Contributors: </span> 2
                </Tag>
                <Tag>
                    <span className="span-tag-text">Issues: </span> 24
                </Tag>
                <Tag>
                    <span className="span-tag-text">Merges: </span> 100
                </Tag>
            </Space>

            <Space style={{ width: "100%", marginBottom: "2em" }} size={15}>
                <Card style={{ width: 240, height: "auto" }}>
                    <Result
                        status="success"
                        subTitle="access to main branch is restricted"
                        extra={[<Button key="buy">Check again</Button>]}
                    />
                    <Space direction="vertical" align="center">
                        <Tag>
                            <span className="span-tag-text"> master </span> is
                            the main branch name
                        </Tag>
                        <Tag>
                            <span className="span-tag-text"> 2 </span> reviewers
                            is required to merge
                        </Tag>
                    </Space>
                </Card>
                <div>
                    <h4>Issues</h4>
                    <Bar {...issuesConfig} />
                </div>

                <div>
                    <h4>Pull Requests</h4>
                    <Bar {...pullRequestConfig} />
                </div>
            </Space>

            <Space style={{ width: "100%", marginBottom: "6em" }} size={60}>
                <Space id="tags" direction="vertical">
                    <Select
                        placeholder="Versioning standards"
                        defaultValue="semantic-versioning"
                        style={{ width: 200 }}
                    >
                        <Select.Option value="semantic-versioning">
                            Semantic versioning
                        </Select.Option>
                        <Select.Option value="eclipse-bundle-versioning">
                            Eclipse bundle versioning
                        </Select.Option>
                        <Select.Option value="date-based-versioning">
                            Date based versioning
                        </Select.Option>
                    </Select>

                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={handleInfiniteOnLoad}
                        hasMore={!loading && hasMore}
                        useWindow={false}
                        style={{ width: "100%" }}
                    >
                        <List
                            dataSource={faketagsData}
                            style={{ width: "100%" }}
                            renderItem={(item) => (
                                <List.Item
                                    style={{ width: "100%" }}
                                    key={item.id}
                                    extra={
                                        item.respect === "no" ? (
                                            <CloseCircleOutlined style= {{color: "#f55f5b"}} />
                                        ) : (
                                            <CheckCircleOutlined style= {{color:"#67f45d"}} />
                                        )
                                    }
                                >
                                    <List.Item.Meta
                                        title={
                                            <a href="https://ant.design">
                                                {item.name}
                                            </a>
                                        }
                                        description={item.by}
                                    />
                                </List.Item>
                            )}
                        >
                            {loading && hasMore && (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </Space>

                <Space direction="vertical" align="center">
                    <Select
                        placeholder="Commits standards"
                        defaultValue="conventional-commits"
                        style={{ width: 200 }}
                    >
                        <Select.Option value="conventional-commits">
                            Conventional commits
                        </Select.Option>
                        <Select.Option value="tbaggery">
                            tbaggery commits
                        </Select.Option>
                        <Select.Option value="no-standard">
                            No Standard
                        </Select.Option>
                    </Select>
                    <Pie {...commitsconfig} />
                </Space>

                <Space direction="vertical" align="center">
                    <Select
                        placeholder="Branch naming standards"
                        defaultValue="no-standard"
                        style={{ width: 200 }}
                    >
                        <Select.Option value="vincent-driessen-notes">
                            Vincent Driessen Notes
                        </Select.Option>
                        <Select.Option value="no-standard">
                            No Standard
                        </Select.Option>
                    </Select>
                    <Pie {...branchconfig} />
                </Space>
            </Space>
        </>
    );
};

export default Checks;
