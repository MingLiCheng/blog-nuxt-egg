/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-26 19:12:38
 */
import React from 'react'
import Api from '@/api'
import { Button, Form, Input, message, Select } from 'antd'
import { useHistory } from 'react-router-dom'
import MdEditor from './MdEditor'
import TagsFormItem from './TagsFormItem'
import './index.less'

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 24 },
}
const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
}

const ArticleDetail = props => {
    const [form] = Form.useForm()
    const history = useHistory()
    const getArticleInfoById = async () => {
        const articleId = props.match.params.articleId
        if (articleId && articleId !== 'add') {
            const res = await Api.queryArticleById({ articleId })
            console.log('res', res)
            // articleInfo=res.data
            form.setFieldsValue({
                title: res.data.title,
                articleContent: { content: res.data.content },
                tags: res.data.tags ? res.data.tags.split(',') : ['Tag 1', 'Tag 2'],
                description: res.data.description,
            })
            console.log('form.getFieldsValue', form.getFieldsValue())
        }
    }

    getArticleInfoById()

    const tagsList = ['Tag 1', 'Tag 2', 'Tag 3']

    const onFinish = async values => {
        let params = {
            title: values.title,
            description: values.description,
            tags: values.tags.join(','),
            articleContent: values.articleContent.content,
        }
        // 判断是新增还是修改
        if (!!props.match.params.articleId && props.match.params.articleId !== 'add') {
            // 编辑
            params.id = props.match.params.articleId
            updateArticleInfo(params)
        } else {
            // 增加
            createArticleInfo(params)
        }
    }

    const onFinishFailed = ({ values, errorFields, outOfDate }) => {
        console.log('校验失败', values)
    }
    const updateArticleInfo = async params => {
        try {
            const res = await Api.updateArticleInfoById(params)
            if (res.status === 0) {
                message.success('修改成功')
                history.goBack()
            }
        } catch (error) {
            console.log('err', error)
        }
    }

    const createArticleInfo = async params => {
        try {
            const res = await Api.createArticle(params)
            if (res.status === 0) {
                message.success('新增成功')
                history.goBack()
            }
        } catch (error) {
            console.log('err', error)
        }
    }
    function handleChange(value) {
        console.log(`selected ${value}`)
    }

    return (
        <div className="article-detail-wrapper">
            <Form
                form={form}
                layout="vertical"
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className="form-ibox">
                    <div className="form-left">
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                { required: true, message: "Please input the article's title!" },
                            ]}
                        >
                            <Input
                                autoComplete="off"
                                placeholder="Please input the article's title!"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: `Please input the article's description!`,
                                },
                            ]}
                        >
                            <Input
                                autoComplete="off"
                                placeholder="Please input the article's description!"
                            />
                        </Form.Item>
                        <Form.Item label="标签" name="tags">
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select tags"
                                onChange={handleChange}
                            >
                                {tagsList.map((item, index) => {
                                    return <Select.Option key={index}>{item}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="ArticleContent"
                            name="articleContent"
                            rules={[
                                { required: true, message: 'Please input your articleContent!' },
                            ]}
                        >
                            <MdEditor />
                        </Form.Item>
                    </div>
                    <div className="form-right">
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default ArticleDetail
