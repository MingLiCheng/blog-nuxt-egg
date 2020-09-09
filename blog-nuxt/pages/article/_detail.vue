<!--
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-26 14:54:35
 -->
<template>
    <div class="article-detail-wrapper">
        <div class="scrollbar" :style="{ width: postProgress }"></div>

        <Row>
            <i-col :xs="0" :sm="2" :md="2" :lg="2" :xl="2">
                <div>xxx</div>
                <div>xxx</div>
                <div>xxx</div>
                <div>xxx</div>
                <div>xxx</div>
                <div>xxx</div>
                <div>xxx</div>
            </i-col>
            <i-col :xs="24" :sm="14" :md="15" :lg="16" :xl="16" class="article-detail-main">
                <div class="article-header">
                    <h1 class="title">{{ articleInfo.title }}</h1>
                    <div class="stuff">
                        <span>{{ '六' }}月 {{ '15' }}, {{ '2020' }}</span>
                        <span>阅读 {{ 1000 }}</span>
                        <span>字数 {{ 2 }}</span>
                        <span>评论 {{ 2 }}</span>
                        <span>喜欢 {{ 2 }}</span>
                    </div>
                </div>
                <div class="">
                    <div class="article-cover">
                        <img src="@/static/cover.png" alt="" />
                    </div>
                    <div class="markdown-body" v-html="articleContent"></div>
                    <p class="markdown-bottom"></p>
                </div>
            </i-col>
            <i-col :xs="0" :sm="8" :md="7" :lg="6" :xl="6" class="article-detail-aside">
                <div class="layout-card-box">
                    <PersonalCard></PersonalCard>
                </div>
                <Affix :offset-top="36">
                    <div class="layout-card-box">
                        <ArticleNavBar ref="articleNavBar" :navList="navList"></ArticleNavBar>
                    </div>
                </Affix>
            </i-col>
        </Row>

        <!-- <div class="test-box"></div> -->
    </div>
</template>

<script>
import PersonalCard from '~/components/PersonalCard.vue'
import ArticleNavBar from '~/components/ArticleNavBar.vue'
import marked from 'marked'
import hljs from 'highlight.js'
// 引入默认样式
// import 'highlight.js/scss/dark.scss'
// 引入个性化的vs2015样式
import 'highlight.js/styles/xcode.css'
const rendererMD = new marked.Renderer()
export default {
    name: 'ArticleDetail',
    components: { PersonalCard, ArticleNavBar },
    data() {
        return {
            articleContent: '',
            navList: [],
            prop: {
                subfield: false, // 单双栏模式
                defaultOpen: 'preview', //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
                editable: false,
                toolbarsFlag: false,
                scrollStyle: true
            },
            postProgress: 0,
            fnScroll: () => {}
        }
    },
    async asyncData(context) {
        // called every time before loading the component
        const res = await context.app.$request.getRequest('/front/article', { articleId: context.params.detail })
        console.log('/front/article/detail-------res', res)
        return {
            articleInfo: res.data
        }
    },
    created() {},
    mounted() {
        this.fnScroll = this.$throttle(this.handleScroll, 200)
        document.addEventListener('scroll', this.fnScroll)
        this.$store.commit('setHeaderTitle', this.articleInfo.title)
        this.compiledMarkdown()
    },
    beforeDestroy() {
        document.removeEventListener('scroll', this.fnScroll)
    },
    methods: {
        compiledMarkdown: function() {
            let index = 1
            let that = this
            let nav = []
            rendererMD.heading = function(text, level) {
                nav.push({ text: text, level: level })
                // 导航
                // return `<h${level} id="index-${index++}" class="step-jump">${text + '---' + (index - 1)}</h${level}>`
                return `<h${level} id="index-${index++}" class="step-jump">${text}</h${level}>`
            }

            marked.setOptions({
                renderer: rendererMD,
                highlight: function(code) {
                    return hljs.highlightAuto(code).value
                },
                pedantic: false,
                gfm: true,
                tables: true,
                breaks: true,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                xhtml: false
            })
            this.articleContent = marked(this.articleInfo.content)
            this.navList = nav
            console.log('nav', nav)
        },
        handleScroll(e) {
            this.xxx()
            // 根据内容定位菜单

            let findItem,
                flag = false
            let _article = document.querySelectorAll('.step-jump')
            let topInfoList = _article.forEach((item, index) => {
                if (!flag) {
                    if (item.getBoundingClientRect().top >= 120) {
                        findItem = index
                        flag = true
                        console.log('flag', flag)
                    }
                }
            })
            console.log('findItem', findItem)
            if (flag) {
                // 如果存在
                findItem = findItem < 1 ? 1 : findItem
            } else {
                // 不存在的话 赋值未数组的最大值
                findItem = _article.length
            }
            console.log('this.$refs', this.$refs['articleNavBar'])

            this.$refs['articleNavBar'].setCurrentIndex(findItem)
        },
        xxx() {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop

            const h1 = document.getElementsByClassName('article-detail-main')[0]
            const h2 = document.getElementsByClassName('stuff')[0]
            const h3 = document.getElementsByTagName('h1')[0]

            const h = h1.offsetHeight + h2.offsetHeight + h3.offsetHeight - document.documentElement.clientHeight - 100
            const n = (100 * (this.scrollTop / h)).toFixed(4)

            if (n < 110) this.postProgress = n + '%'
        }
    },

    fetch() {
        // The fetch method is used to fill the store before rendering the page
    },
    head() {
        // Set Meta Tags for this Page
        return {
            title: this.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'My custom description'
                }
            ]
        }
    }
}
</script>

<style lang="less">
.article-detail-wrapper {
    margin: 0 auto;
    padding-top: 40px;
    max-width: 1200px;
    min-height: calc(100vh - 110px);
    .scrollbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: #12bc79;
        transition: width 0.5s ease;
        z-index: 999999;
    }

    .article-detail-main {
        padding: 20px;
        background-color: #fff;
        margin-top: 10px;
        .article-header {
            .title {
                font-size: 30px;
                padding: 20px 0 22px;
                color: #333;
            }
            .stuff {
                color: #6a737d;
                position: relative;
                line-height: 22px;
                span {
                    font-size: 13px;
                    margin-right: 10px;
                    display: inline-block;
                }
                &:after {
                    content: '';
                    width: 100px;
                    position: absolute;
                    bottom: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-bottom: 1px solid #eaeaea;
                }
            }
        }
        .article-cover {
            padding: 20px;
            img {
                width: 100%;
                // max-width: 800px;
                display: block;
                margin: 0 auto;
            }
        }
        .markdown-body {
            box-sizing: border-box;
            // min-width: 200px;
            // max-width: 980px;
            // margin: 0 auto;
            padding: 6px;
        }

        @media (max-width: 767px) {
            .markdown-body {
                padding: 4px;
                font-size: 14px;
            }
        }
        .markdown-bottom {
            height: 100vh;
        }
    }
    .article-detail-aside {
    }
    .test-box {
        width: 800px;
        height: 400px;
        border: 1px solid hotpink;
        position: fixed;
        top: 150px;
    }
}
</style>
