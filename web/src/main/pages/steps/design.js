import React, { useState } from "react";
import { Form, Button, Radio, Modal, Input, Checkbox, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const ModalContent = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        //props.close();
    };

    return (
        <Form
            name="api-design-phase"
            form={form}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                name="url-design-approach"
                label="Pick the approach you want to use to design the url"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="data">Data oriented </Radio.Button>
                    <Radio.Button value="function">
                        Fucntion oriented
                    </Radio.Button>
                    <Radio.Button value="hybird">Hybird oriented</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="url-design"
                label="Did you design the url"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="not-yet">Not yet</Radio.Button>
                    <Radio.Button value="will-not">I will not</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="define-fields-param"
                label="Did you dfine  the fields and query parameters"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="not-yet">Not yet</Radio.Button>
                    <Radio.Button value="will-not">I will not</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="define-fields-param"
                label="Was the standard http headers enough for you "
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="not-sure">Not sure</Radio.Button>
                    <Radio.Button value="no">No</Radio.Button>
                </Radio.Group>
            </Form.Item>


            <Form.List  initialValue={[""]}  name="custome-http-headers">
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                label= {index === 0 ? "If not specify some Custome http headers you used with a description" :  ""}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={["onChange", "onBlur"]}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message:
                                                "Please input a header name or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input
                                        placeholder="Name"
                                        style={{ width: "20%" }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    {...field}
                                    validateTrigger={["onChange", "onBlur"]}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message:
                                                "Please input a header type or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input
                                        placeholder="Type"
                                        style={{ width: "20%" }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    style={{marginRight:"1em"}}
                                    {...field}
                                    validateTrigger={["onChange", "onBlur"]}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message:
                                                "Please input a http header description or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input
                                        placeholder="Why / Description"
                                        style={{ width: "50%" }}
                                    />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: "60%" }}
                                icon={<PlusOutlined />}
                            >
                                Add field
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
            
            <Form.Item
                name="handle-errors"
                label="Handling errors messages done"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="not-sure">Not yet</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="media-types"
                label="Dominant media types for resource representations"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Checkbox.Group>
                    <Checkbox value="json">Json</Checkbox>
                    <Checkbox value="gzip">Gzip</Checkbox>
                    <Checkbox value="csv">Csv</Checkbox>
                    <Checkbox value="xml">Xml</Checkbox>
                    <Checkbox value="text">Text</Checkbox>
                </Checkbox.Group>
            </Form.Item>

            <Form.Item
                name="api-specification"
                label="Api specification you used or you want to use"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="swagger">Swagger</Radio.Button>
                    <Radio.Button value="raml">Raml</Radio.Button>
                    <Radio.Button value="apiblueprint">ApiBlueprint</Radio.Button>                   
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="documentation-api"
                label="Documentation generated from api specification"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="done">Done</Radio.Button>
                    <Radio.Button value="not-yet">Not yet</Radio.Button>                  
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="mock-server"
                label="Create a mock a server"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="done">Done</Radio.Button>
                    <Radio.Button value="not-yet">Not yet</Radio.Button>                  
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="mock-server"
                label="Get feedbacks from consumer who used your mock server to create apps"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="done">Done</Radio.Button>
                    <Radio.Button value="not-yet">Not yet</Radio.Button>                  
                </Radio.Group>
            </Form.Item>

            <Divider />

            <Form.Item
                name="dev-plan"
                label="Create a developement plan"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="done">Done</Radio.Button>
                    <Radio.Button value="not-yet">Not yet</Radio.Button>                  
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="version-control-system"
                label="Choose a version control system"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="done">Git</Radio.Button>
                    <Radio.Button value="cvs">Cvs</Radio.Button>  
                    <Radio.Button value="svn">Svn</Radio.Button> 
                    <Radio.Button value="mercurial">Mercurial</Radio.Button> 
                    <Radio.Button value="bazaar">Bazaar</Radio.Button>    
                    <Radio.Button value="tfs">Tfs</Radio.Button>
                    <Radio.Button value="vsts">Vsts</Radio.Button>  
                    <Radio.Button value="rcs">Rcs</Radio.Button>    
                    <Radio.Button value="vss">Vss</Radio.Button>         
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="software-collaboration-tools"
                label="Choose a software management and collaboration tool"
            >
                <Radio.Group>
                    <Radio.Button value="github">Github</Radio.Button>
                    <Radio.Button value="gitlab">Gitlab</Radio.Button>  
                    <Radio.Button value="bitbucket">Bitbucket/ jira / atlassian</Radio.Button> 
                    <Radio.Button value="azure">Azure devops</Radio.Button>                     
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="repo-version-control"
                label="Create a repository using a version control system"
                rules={[
                    {
                        required: true,
                        message: "Please pick an item!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio.Button value="done">Done</Radio.Button>
                    <Radio.Button value="not-yet">Not yet</Radio.Button>                       
                </Radio.Group>
            </Form.Item>

            <Form.Item>
                <Button
                    form="api-design-phase"
                    type="primary"
                    htmlType="submit"
                >
                    Done
                </Button>
            </Form.Item>
        </Form>
    );
};
const Design = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Received values of form: ", values);

        showModal();
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Form
                name="api-design-choices"
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="api-available-for"
                    label="You want your api to be available for"
                    rules={[
                        {
                            required: true,
                            message: "Please pick an item!",
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio.Button value="private">
                            Internal use
                        </Radio.Button>
                        <Radio.Button value="partners">Partners</Radio.Button>
                        <Radio.Button value="public">Public</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="api-main-product"
                    label="This api is the main product of your buisiness"
                    rules={[
                        {
                            required: true,
                            message: "Please pick an item!",
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio.Button value="yes">Yes</Radio.Button>
                        <Radio.Button value="not-sure">Not Sure</Radio.Button>
                        <Radio.Button value="no">No</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="api-dx"
                    label="Does developer experience matter for you"
                    rules={[
                        {
                            required: true,
                            message: "Please pick an item!",
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio.Button value="yes">Yes</Radio.Button>
                        <Radio.Button value="not-sure">Not Sure</Radio.Button>
                        <Radio.Button value="no">No</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="communication"
                    label="You want to ensure a good communication between your team members"
                    rules={[
                        {
                            required: true,
                            message: "Please pick an item!",
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio.Button value="yes">Yes</Radio.Button>
                        <Radio.Button value="not-sure">Not Sure</Radio.Button>
                        <Radio.Button value="no">No</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="technology"
                    label="The technology used to create the api"
                    rules={[
                        {
                            required: true,
                            message: "Please pick an item!",
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio.Button value="yes">Graphql</Radio.Button>
                        <Radio.Button value="not-sure">RestfulApi</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Done
                    </Button>
                </Form.Item>
            </Form>
            <>
                <Modal
                    title="Design first steps"
                    onCancel={handleClose}
                    visible={isModalVisible}
                >
                    <ModalContent close={handleClose} />
                </Modal>
            </>
        </>
    );
};

export default Design;
