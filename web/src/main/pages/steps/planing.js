import React from "react";
import { Form, Checkbox, Button } from "antd";
const Planing = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item
                name="needs"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(new Error("")),
                    },
                ]}
            >
                <Checkbox>Define Customer needs</Checkbox>
            </Form.Item>

            <Form.Item
                name="research"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(new Error("")),
                    },
                ]}
            >
                <Checkbox>Market Research</Checkbox>
            </Form.Item>

            <Form.Item
                name="goal"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(new Error("")),
                    },
                ]}
            >
                <Checkbox>Define Api goals</Checkbox>
            </Form.Item>
            <Form.Item
                name="time"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(new Error("")),
                    },
                ]}
            >
                <Checkbox>Define time frame to achieve this goals</Checkbox>
            </Form.Item>

            <Form.Item
                name="board"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(new Error("")),
                    },
                ]}
            >
                <Checkbox>Create a task board</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Planing;
