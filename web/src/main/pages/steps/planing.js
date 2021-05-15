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
                rules={
                    [
                        {
                            validator:  (_,value)=>{
                                
                                    if (value !== true){
                                       return Promise.reject(new Error("You must define customer needs")) 
                                    }
                                    Promise.resolve()
                            
                            }
                        }
                    ]
                }
              
            >
                <Checkbox>Define customer needs</Checkbox>
            </Form.Item>

            <Form.Item
                name="research"
                valuePropName="checked"
                
                rules={
                    [
                        {
                            validator:  (_,value)=>{
                                
                                    if (value !== true){
                                       return Promise.reject(new Error("You must do a market research")) 
                                    }
                                    Promise.resolve()
                            
                            }
                        }
                    ]
                }
                
            >
                <Checkbox>Market research</Checkbox>
            </Form.Item>

            <Form.Item
                name="goal"
                valuePropName="checked"
                rules={
                    [
                        {
                            validator:  (_,value)=>{
                                
                                    if (value !== true){
                                       return Promise.reject(new Error("You must define goals")) 
                                    }
                                    Promise.resolve()
                            
                            }
                        }
                    ]
                }
               
            >
                <Checkbox>Define api goals</Checkbox>
            </Form.Item>
            <Form.Item
                name="time"
                valuePropName="checked"
                rules={
                    [
                        {
                            validator:  (_,value)=>{
                                
                                    if (value !== true){
                                       return Promise.reject(new Error("You must define time to achieve your goals")) 
                                    }
                                    Promise.resolve()
                            
                            }
                        }
                    ]
                }
             
            >
                <Checkbox>Define time frame to achieve this goals</Checkbox>
            </Form.Item>

            <Form.Item
                name="board"
                valuePropName="checked"
                rules={
                    [
                        {
                            validator:  (_,value)=>{
                                
                                    if (value !== true){
                                       return Promise.reject(new Error("You must create a task board")) 
                                    }
                                    Promise.resolve()
                            
                            }
                        }
                    ]
                }
                required={true}
              
            >
                <Checkbox>Create a task board</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                   Done
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Planing;
