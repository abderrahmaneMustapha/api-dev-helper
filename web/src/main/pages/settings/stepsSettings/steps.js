import React from "react";
import { Card, Row, Col } from "antd";
const tools = [
    {
        icon: "https://ik.imagekit.io/ykyl2djdvw/WebApiHelperTool/kisspng-github-computer-icons-icon-design-github-5ab8a31e5b5395.6758034915220498223741_i0Mru_jNK.png",
        name: "Github",
    },
    {
        icon: "https://ik.imagekit.io/ykyl2djdvw/WebApiHelperTool/kisspng-computer-icons-github-bitbucket-software-repositor-cosmic-vector-5ad9e5c89bbfe0.573379591524229576638_7jQ-ZIf2XZM.png",
        name: "Bitbucket",
    },
    {
        icon: "https://ik.imagekit.io/ykyl2djdvw/WebApiHelperTool/kisspng-gitlab-computer-icons-github-issue-tracking-system-star-fox-5ac816894c0439.9141744715230624093114_GKz6H_NhguB.png",
        name: "Gitlab",
    },
    {
        icon: "https://ik.imagekit.io/ykyl2djdvw/WebApiHelperTool/913-9130351_azure-logo-png_HlrmzSLLu.png",
        name: "AzureDevops",
    }
]
const StepsSettings = () => {
    return (
        <div className="steps-settings-card-wrapper">
          <header>
            <h2>Steps settings</h2>
            <div className="description">
            pick a one of the following platform to connect to ,to use it in the 
            team repository tracker
            </div>
            </header>
            <Row gutter={16}>
                {tools.map((tool) =>                 
                     (<Col span={5}>
                        <Card
                            
                            bordered={false}
                            cover={<img alt={tool.name} src={tool.icon} />}
                        >
                        <div style={{textAlign:"center"}}>{tool.name}</div>
                            
                        </Card>
                    </Col>)
                    )
                }
            </Row>
        </div>
    );
};

export default StepsSettings;
