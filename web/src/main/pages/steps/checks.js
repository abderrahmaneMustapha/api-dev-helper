import React from "react";
import {
    Card,
    Result,
    Tag,
    Button,
    Input,
    message,
    Space,
    Select,
    List,
} from "antd";
import { Bar, Pie } from "@ant-design/charts";
import {
    SearchOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";

const Checks = () => {
    const repoFoundMessage = (repository, owner) => {
        message.success(
            `Connected to repo succesfully, ${repository} owned by  ${owner}`
        );
    };

    /* const repoNotFoundMessage = ()=>{
        message.success("Can not connecte to repo ")
    }*/

    const getRepoBranches = (owner, repository) => {
        fetch(`http://localhost:10000/repos/${owner}/${repository}/branches`)
            .then((response) => response.json())
            .then((result) => {
                setBranches(result);
            })
            .catch((error) => {
                message.error("An error has aquired while fetching branches");
            });
    };

    const getRepoBranchDataProtection = (owner, repository, default_branch) => {
        fetch(
            `http://localhost:10000/repos/${owner}/${repository}/branches/${default_branch}/protection`
        )
            .then((response) => response.json())
            .then((result) => {
                setDefaultBranchProtection(result);
                console.log(
                    " branch protection : " +
                        result.required_pull_request_reviews
                            .require_code_owner_reviews
                );
            })
            .catch((error) => {
                message.error("An error has aquired while fetching branches");
            });
    };

    const countIssues = (result) => {
        var states = result.map((value) => {
            return value.state;
        });

        var unique_states = [...new Set(states)];

        var issues = [];
        var total = 0;
        Array.prototype.forEach.call(result, (element) => {
            Array.prototype.forEach.call(
                unique_states,
                (unique_states_element) => {
                    if (unique_states_element === element.state) {
                        total += 1;
                        if (issues.length > 0) {
                            var index = Array.prototype.findIndex.call(
                                issues,
                                (issues_element) => {
                                    return (
                                        unique_states_element ===
                                        issues_element.state
                                    );
                                }
                            );

                            issues[index].count += 1;
                        } else {
                            issues.push({
                                state: element.state,
                                count: 1,
                            });
                        }
                    }
                }
            );
        });
        setIssuesCount(total);
        return issues;
    };

    const countConributors = (result)=>{
        return result.length
    }
    const getRepoContributors  = (owner, repository)=>{
        fetch(`http://localhost:10000/repos/${owner}/${repository}/contributors`)
        .then((response) => response.json())
        .then(async (result) => {
            var contributors_count = await countConributors(result);
            setContributorsCount(contributors_count)
        })
        .catch((error) => {
            console.log(error);
            message.error("An error has aquired while getting contributors");
        });
    }

    const getMergesCount = (owner, repository)=>{
        fetch(`http://localhost:10000/repos/${owner}/${repository}/merges`)
        .then((response) => response.json())
        .then(async (result) => {
            setMergesCount(result.count)
        })
        .catch((error) => {
            console.log(error);
            message.error("An error has aquired while getting contributors");
        });
    }
    const getRepoBranchIssues = (owner, repository) => {
        fetch(`http://localhost:10000/repos/${owner}/${repository}/issues`)
            .then((response) => response.json())
            .then(async (result) => {
                var issues = await countIssues(result);
                console.log("Issues " + issues);
                setIssuesData(issues);
            })
            .catch((error) => {
                console.log(error);
                message.error("An error has aquired while getting  issues");
            });
    };

    const countPullRequest = (result) => {
        var pullRequests = result.map((value) => {
            return value.state;
        });

        var unique_prs = [...new Set(pullRequests)];

        var prs = [];
        var total = 0;
        Array.prototype.forEach.call(result, (element) => {
            Array.prototype.forEach.call(unique_prs, (unique_prs_element) => {
                if (unique_prs_element === element.state) {
                    total += 1;
                    if (prs.length > 0) {
                        var index = Array.prototype.findIndex.call(
                            prs,
                            (prs_element) => {
                                return unique_prs_element === prs_element.state;
                            }
                        );
                        console.log("index : " + index);
                        prs[index].count += 1;
                    } else {
                        prs.push({
                            state: element.state,
                            count: 1,
                        });
                    }
                }
            });
        });
        setPrsCount(total);
        return prs;
    };

    const getRepoBranchPrs = (owner, repository) => {
        fetch(`http://localhost:10000/repos/${owner}/${repository}/pulls`)
            .then((response) => response.json())
            .then(async (result) => {
                var prs = await countPullRequest(result);

                setPrData(prs);
            })
            .catch((error) => {
                console.log(error);
                message.error("An error has aquired while fetching pr");
            });
    };

    const getCommitsValidation = (owner, repository) => {
        if (commit_standard || commit_standard !== "no-standard") {
            fetch(
                `http://localhost:10000/repos/${owner}/${repository}/commits/validation/${commit_standard}`
            )
                .then((response) => response.json())
                .then(async (result) => {
                    setcommitStandardData(result.commit_standard);
                    setCommitsCount(result.total);
                })
                .catch((error) => {
                    console.log(error);
                    message.error(
                        "An error has aquired while validating commits"
                    );
                });
        }
    };

    const getBranchesValidation = (owner, repository) => {
        if (branch_standard || branch_standard !== "no-standard") {
            fetch(
                `http://localhost:10000/repos/${owner}/${repository}/branches/validation/${branch_standard}`
            )
                .then((response) => response.json())
                .then(async (result) => {
                    setBranchtStandardData(result.branch_standard);
                })
                .catch((error) => {
                    console.log(error);
                    message.error(
                        "An error has aquired while validating branches"
                    );
                });
        }
    };

    const getTagsValidation = (owner, repository) => {
        if (tag_standard || tag_standard !== "no-standard") {
            fetch(
                `http://localhost:10000/repos/${owner}/${repository}/tags/validation/${tag_standard}`
            )
                .then((response) => response.json())
                .then(async (result) => {
                    setTagStandardData(result.tag_standard);
                })
                .catch((error) => {
                    console.log(error);
                    message.error("An error has aquired while validating Tags");
                });
        }
    };

    const SearchForRepo = () => {
        let owner = document.getElementById("owner-name-input").value;
        let repository = document.getElementById("repo-name-input").value;

        setRepoParam({ owner: owner, repository: repository });

        fetch(`http://localhost:10000/repos/${owner}/${repository}`)
            .then((response) => response.json())
            .then(async (result) => {
                message.success("Data has validated successfully");
                await setRepoData(result);
                await getRepoBranches(owner, repository);
                await setDefaultBranch(result.default_branch);
                await getRepoBranchIssues(owner, repository);
                await getRepoBranchPrs(owner, repository);
                await getRepoContributors(owner, repository);
                await getMergesCount(owner, repository)
                await getRepoBranchDataProtection(
                    owner,
                    repository,
                    result.default_branch
                );
                await getCommitsValidation(owner, repository);
                await getBranchesValidation(owner, repository);
                await getTagsValidation(owner, repository);
                setLoading(false);
                console.log(repoData);
            })
            .catch((error) => {
                message.error("An error has aquired while validating the data");
            });

        repoFoundMessage(repository, owner);
    };

    const [repoData, setRepoData] = React.useState([]);
    const [branches, setBranches] = React.useState([]);
    const [default_branch, setDefaultBranch] = React.useState("");
    const [default_branch_protection, setDefaultBranchProtection] =
        React.useState("");
    const [prdata, setPrData] = React.useState([]);
    const [issuesData, setIssuesData] = React.useState([]);
    const [commit_standard, setCommitStandard] = React.useState(
        "conventional-commits"
    );
    const [commitStandardData, setcommitStandardData] = React.useState([]);
    const [branch_standard, setBranchStandard] = React.useState("gitlab");
    const [branchStandardData, setBranchtStandardData] = React.useState([]);
    const [tag_standard, setTagStandard] = React.useState(
        "semantic-versioning"
    );
    const [tagStandardData, setTagStandardData] = React.useState([]);
    const [repo_param, setRepoParam] = React.useState({
        owner: "",
        repository: "",
    });
    const [merges_count, setMergesCount] = React.useState(0)
    const [issues_count, setIssuesCount] = React.useState(0);
    const [prs_count, setPrsCount] = React.useState(0);
    const [commits_count, setCommitsCount] = React.useState(0);
    const [contributors_count, setContributorsCount] = React.useState(0)
    const [loading, setLoading] = React.useState(true);

    var issuesConfig = {
        data: issuesData,
        autoFit: false,
        width: 350,
        xField: "count",
        yField: "count",
        seriesField: "state",
        isPercent: true,
        isStack: true,

        label: {
            position: "middle",
            content: function content(item) {
                return item.value;
            },
            style: { fill: "#fff" },
        },
    };
    var pullRequestConfig = {
        data: prdata,
        autoFit: false,
        width: 350,
        xField: "count",
        yField: "count",
        seriesField: "state",
        isPercent: true,
        isStack: true,

        label: {
            position: "middle",
            content: function content(item) {
                return item.value;
            },
            style: { fill: "#fff" },
        },
    };

    var commitsconfig = {
        autoFit: false,
        width: 350,

        appendPadding: 0,
        data: commitStandardData,
        angleField: "count",
        colorField: "state",
        color: ["#52C41A", "#F55F5B"],
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
        data: branchStandardData,
        angleField: "count",
        colorField: "state",
        color: ["#52C41A", "#F55F5B"],

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

    const handleChange = (value) => {
        console.log(`selected ${value}`);
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
                    <span className="span-tag-text">Commits: </span>{" "}
                    {commits_count}
                </Tag>
                <Tag>
                    <span className="span-tag-text">Pull requests: </span>
                    {prs_count}
                </Tag>
                <Tag>
                    <span className="span-tag-text">Contributors: </span> {contributors_count}
                </Tag>
                <Tag>
                    <span className="span-tag-text">Issues: </span>{" "}
                    {issues_count}
                </Tag>
                <Tag>
                    <span className="span-tag-text">Merges: </span> {merges_count}
                </Tag>

                <Select
                    defaultValue="branches"
                    onChange={handleChange}
                    style={{ width: "120%" }}
                >
                    {branches
                        ? branches.map((value) => {
                              return (
                                  <Select.Option value={value.name}>
                                      {value.name}
                                  </Select.Option>
                              );
                          })
                        : ""}
                </Select>
            </Space>

            {!loading && (
                <>
                    <Space
                        style={{ width: "100%", marginBottom: "2em" }}
                        size={15}
                    >
                        <Card style={{ width: 240, height: "auto" }}>
                            {default_branch_protection &&
                            default_branch_protection.require_code_owner_reviews ===
                                true ? (
                                <Result
                                    status="success"
                                    subTitle="access to main branch is restricted"
                                    extra={[
                                        <Button key="check">
                                            Check again
                                        </Button>,
                                    ]}
                                />
                            ) : (
                                <Result
                                    status="error"
                                    subTitle="access to main branch is not restricted"
                                    extra={[
                                        <Button key="check">
                                            Check again
                                        </Button>,
                                    ]}
                                />
                            )}
                            <Space direction="vertical" align="center">
                                <Tag>
                                    <span className="span-tag-text">
                                        {default_branch}
                                    </span>{" "}
                                    is the default branch name
                                </Tag>
                                <Tag>
                                    <span className="span-tag-text">
                                        {
                                            default_branch_protection.require_code_owner_reviews
                                        }
                                    </span>
                                    reviews is required to merge a pr
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

                    <Space
                        style={{ width: "100%", marginBottom: "6em" }}
                        size={60}
                    >
                        <Space id="tags" direction="vertical">
                            <Select
                                placeholder="Versioning standards"
                                defaultValue="semantic-versioning"
                                style={{ width: 200 }}
                                onChange={(value) => {
                                    setTagStandard(value);
                                    getTagsValidation(
                                        repo_param.owner,
                                        repo_param.repository
                                    );
                                }}
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

                            <List
                                dataSource={tagStandardData}
                                style={{ width: "100%" }}
                                renderItem={(item) => (
                                    <List.Item
                                        style={{ width: "100%" }}
                                        key={item.tag}
                                        extra={
                                            item.state === "no" ? (
                                                <CloseCircleOutlined
                                                    style={{ color: "#f55f5b" }}
                                                />
                                            ) : (
                                                <CheckCircleOutlined
                                                    style={{ color: "#67f45d" }}
                                                />
                                            )
                                        }
                                    >
                                        <List.Item.Meta title={item.tag} />
                                    </List.Item>
                                )}
                            ></List>
                        </Space>

                        <Space direction="vertical" align="center">
                            <Select
                                placeholder="Commits standards"
                                defaultValue="conventional-commits"
                                onChange={(value) => {
                                    setCommitStandard(value);
                                    getCommitsValidation(
                                        repo_param.owner,
                                        repo_param.repository
                                    );
                                }}
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
                                defaultValue="gitlab"
                                onChange={(value) => {
                                    setBranchStandard(value);
                                    getBranchesValidation(
                                        repo_param.owner,
                                        repo_param.repository
                                    );
                                }}
                                style={{ width: 200 }}
                            >
                                <Select.Option value="gitlab">
                                    Gitlab
                                </Select.Option>
                                <Select.Option value="no-standard">
                                    No Standard
                                </Select.Option>
                            </Select>
                            <Pie {...branchconfig} />
                        </Space>
                    </Space>
                </>
            )}
        </>
    );
};

export default Checks;
