import React from "react"
import { Card, Row, Col, Button} from "antd";
const  tools = [
    {
        icon  :  "https://ik.imagekit.io/ykyl2djdvw/WebApiHelperTool/kisspng-github-computer-icons-icon-design-github-5ab8a31e5b5395.6758034915220498223741_i0Mru_jNK.png",
        name : "Github"
    },
    {
        icon  :  "https://ik.imagekit.io/ykyl2djdvw/WebApiHelperTool/kisspng-trello-logo-slack-atlassian-trello-5b2bcdc8b0e154.9936644115295973847245_KucFpu-13.png",
        name : "Trello"
    },
    {
        icon  :  "https://ik.imagekit.io/ykyl2djdvw/WebApiHelperTool/kisspng-gitlab-computer-icons-github-issue-tracking-system-star-fox-5ac816894c0439.9141744715230624093114_GKz6H_NhguB.png",
        name : "Gitlab"
    }
]

const TrackerSettings = ()=>{

    return(
        <div className="steps-settings-card-wrapper">
        <header>
            <h2>Tracker settings</h2>
            <div className="description">
            pick a one of the following platform to connect to , and use it in the 
            team task tracker
            </div>
        </header>
        <Row gutter={16}>
            {tools.map((tool) => 

                (
                <Col span={5}>
                    <Card                        
                        bordered={false}
                        cover={<img alt={tool.name} src={tool.icon} />}
                    >
                        <div style={{textAlign:"left"}}>{tool.name}</div>
                        <div style={{display:"flex", flexDirection:"column", padding:"1em"}}>
                            <Button type="primary">Connect</Button>    
                        </div>
                    </Card>
                </Col>
                )
                
            )}
        </Row>
    </div>
    )
}

export default TrackerSettings;