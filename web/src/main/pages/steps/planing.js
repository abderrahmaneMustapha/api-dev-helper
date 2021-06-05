import React from "react";
import { Form, Checkbox, Button, message } from "antd";
const Planing = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        fetch("http://localhost:10000/steps/planing/validation", {
            method: "POST",
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((result) => {
                message.success("Data has validated successfully");
                console.log("Success:", result);
            })
            .catch((error) => {
                message.error("An error has aquired while validating the data");
                console.error("Error:", error);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
             className="styled-form"
            name="planing-form"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="needs"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) => {
                            if (value !== true) {
                                return Promise.reject(
                                    new Error("You must define customer needs")
                                );
                            }
                            Promise.resolve();
                        },
                    },
                ]}
            >
                <Checkbox>Define customer needs</Checkbox>
            </Form.Item>

            <Form.Item
                name="research"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) => {
                            if (value !== true) {
                                return Promise.reject(
                                    new Error("You must do a market research")
                                );
                            }
                            Promise.resolve();
                        },
                    },
                ]}
            >
                <Checkbox>Market research</Checkbox>
            </Form.Item>

            <Form.Item
                name="goal"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) => {
                            if (value !== true) {
                                return Promise.reject(
                                    new Error("You must define goals")
                                );
                            }
                            Promise.resolve();
                        },
                    },
                ]}
            >
                <Checkbox>Define api goals</Checkbox>
            </Form.Item>
            <Form.Item
                name="time"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) => {
                            if (value !== true) {
                                return Promise.reject(
                                    new Error(
                                        "You must define time to achieve your goals"
                                    )
                                );
                            }
                            Promise.resolve();
                        },
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
                        validator: (_, value) => {
                            if (value !== true) {
                                return Promise.reject(
                                    new Error("You must create a task board")
                                );
                            }
                            Promise.resolve();
                        },
                    },
                ]}
            >
                <Checkbox>Create a task board</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button
                    onClick={() => {
                        if (form.isFieldsValidating()) {
                            onFinish(form.getFieldsValue());
                        }
                    }}
                    type="primary"
                    htmlType="submit"
                >
                    Done
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Planing;
