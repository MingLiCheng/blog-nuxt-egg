/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-26 19:18:29
 */
import React, { Component } from 'react'
import './index.less'
import { Modal, Button, Table, Tag, Switch, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Api from '@/api'
import moment from 'moment'

const { confirm } = Modal
const dateFormat = function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
}
class ArticleList extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: '序号',
                width: 60,
                align: 'center',
                render: (text, record, index) => `${index + 1}`,
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                width: 200,
                ellipsis: true,
                render: text => (
                    <a
                        href="###"
                        onClick={e => {
                            e.preventDefault()
                        }}
                    >
                        {text}
                    </a>
                ),
            },
            {
                title: 'Description',
                dataIndex: 'description',
                ellipsis: true,
            },

            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                align: 'center',
                width: 180,
                render: tags => (
                    <>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green'
                            if (tag === 'loser') {
                                color = 'volcano'
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            )
                        })}
                    </>
                ),
            },
            {
                title: 'CreateTime',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 187,
                ellipsis: true,
            },
            {
                title: 'UpdateTime',
                dataIndex: 'updateTime',
                width: 187,
                key: 'updateTime',
            },
            {
                title: 'isShow',
                dataIndex: 'isShow',
                key: 'isShow',
                align: 'center',
                width: 100,
                render: (text, record) => (
                    <Switch
                        onClick={() => {
                            this.changeShowState(text,record)
                        }}
                        checked={text === 1}
                    />
                ),
            },
            {
                title: 'Operate',
                align: 'center',
                width: 180,
                render: (text, record) => (
                    <div>
                        <Button type="link" onClick={() => this.editArticleClick(record)}>
                            编辑
                        </Button>
                        <Button type="link" danger onClick={() => this.deleteArticleClick(record)}>
                            删除
                        </Button>
                    </div>
                ),
            },
        ]

        this.state = {
            articleList: [],
            listTotal: 0,
            form: {
                pageSize: 10,
                pageNum: 1,
            },
            pagination: {
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20', '50'],
                total: 0,
                pageSize: 10,
                current: 1,
                showTotal: total => `总${total} 条`,
            },
        }
    }

    UNSAFE_componentWillMount() {
        this.getArticleList()
    }

    changeShowState(showState, record) {
        console.log('showState', showState, 'record', record)
        let tipText = showState === -1 ? '是否确认显示该文章？' : '是否确认隐藏该文章？'
            confirm({
                title: tipText,
                icon: <ExclamationCircleOutlined />,
                okText: 'Yes',
                okType: 'warning',
                cancelText: 'No',
                onOk: async () => {
                    const res = await Api.changeAritcleShowState({
                        articleId: record.articleId,
                        showState: showState === 1 ? -1 : 1,
                    })
                    if (res.status === 0) {
                        message.success('操作成功')
                        this.refreshList()
                    }
                },
                onCancel() {
                    console.log('Cancel')
                },
            })
    }

    async getArticleList(
        params = {
            pageSize: this.state.form.pageSize,
            pageNum: this.state.form.pageNum,
        }
    ) {
        const res = await Api.getArticleList(params)
        if (res.status === 0) {
            this.setState({
                articleList: res.data.list.map(item => {
                    item.tags = item.tags ? item.tags.split(',') : ['nice', 'developer']
                    item.createTime = dateFormat(item.createTime)
                    item.updateTime = dateFormat(item.updateTime)
                    return item
                }),
                listTotal: res.data.total,
            })
        }
    }

    addNewArticleClick() {
        console.log('点击', this.props)
        this.props.history.push({
            pathname: '/app/blog_manage/article_manage/detail/add',
        })
    }

    editArticleClick(articleItem) {
        this.props.history.push({
            pathname: `/app/blog_manage/article_manage/detail/${articleItem.articleId}`,
        })
    }

    refreshList() {
        this.getArticleList()
    }

    deleteArticleClick(articleItem) {
        confirm({
            title: '是否确认删除此文档?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                const res = await Api.delArticle({ articleId: articleItem.articleId })
                if (res.status === 0) {
                    message.success('删除成功')
                    this.refreshList()
                }
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }

    resetList() {
        this.setState(
            {
                form: {
                    pageSize: 10,
                    pageNum: 1,
                },
            },
            () => {
                this.getArticleList()
            }
        )
    }

    onPageNumChange(page, pageSize) {
        console.log('page', page, 'pageSize', pageSize, 'this', this)
        this.setState(
            {
                form: {
                    ...this.state.form,
                    pageNum: page,
                },
            },
            () => {
                this.getArticleList()
            }
        )
    }

    render() {
        return (
            <div className="article-list-wrapper">
                <div className="operate-box">
                    <div className="oper-box">
                        <Button type="primary" onClick={() => this.resetList()}>
                            重置
                        </Button>
                    </div>
                    <Button type="primary" onClick={() => this.addNewArticleClick()}>
                        添加
                    </Button>
                </div>
                <div className="data-info-box">
                    <div className="table-box">
                        <Table
                            dataSource={this.state.articleList}
                            columns={this.columns}
                            rowKey="articleId"
                            pagination={{
                                showSizeChanger: true,
                                showQuickJumper: true,
                                pageSizeOptions: ['5', '10', '20', '50'],
                                total: this.state.listTotal,
                                pageSize: this.state.form.pageSize,
                                current: this.state.form.pageNum,
                                showTotal: total => `总${total} 条`,
                                onChange: (page, pageSize) => this.onPageNumChange(page, pageSize),
                            }}
                        />
                    </div>
                    <div className="table-footer-box"></div>
                </div>
            </div>
        )
    }
}

export default ArticleList
