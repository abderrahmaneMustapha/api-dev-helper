import React from "react";
import { Steps as AntSteps, Button } from "antd";
import Planing from "./planing/planing";
import Design from "./design/design";
import Checks from "./checks/checks";
const steps = [
    {
        title: "Planing",
        content: <Planing />,
    },
    {
        title: "Design",
        content: <Design />,
    },
    {
        title: "Dashboard",
        content: <Checks />,
    },
];

const Steps = () => {
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <div style={{ margin: "2em" }}>
            <AntSteps current={current}>
                {steps.map((item) => (
                    <AntSteps.Step key={item.title} title={item.title} />
                ))}
            </AntSteps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}

                {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Steps;
