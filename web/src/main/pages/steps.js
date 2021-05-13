import React from "react"
import { Steps as AntSteps,   Button,message} from "antd"
import Planing from "./steps/planing"
import Design from "./steps/design"
import Checks from "./steps/checks"
const steps = [
    {
      title: 'Planing',
      content: <Planing />,
    },
    {
      title: 'Design',
      content: <Design />,
    },
    {
      title: 'Checks',
      content: <Checks />,
    },
  ];


const Steps  = ()=>{


const [current, setCurrent] = React.useState(0);

const next = () => {
  setCurrent(current + 1);
};

const prev = () => {
  setCurrent(current - 1);
};

return (
  <>
    <AntSteps current={current}>
      {steps.map(item => (
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
      {current === steps.length - 1 && (
        <Button type="primary" onClick={() => message.success('Processing complete!')}>
          Done
        </Button>
      )}
      {current > 0 && (
        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
          Previous
        </Button>
      )}
    </div>
  </>

)
}

export default Steps;