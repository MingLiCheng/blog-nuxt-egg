<template>
    <div class="container">
        <Row>
            <i-col :xs="24" :sm="16" :md="17" :lg="18" :xl="18" class="index-main">
                <div>
                    <div class="article-box">
                        <ul>
                            <li class="article-item" v-for="item in articleList" :key="item.id">
                                <div class="datetime-info">
                                    <p>{{ item.createdTime | dateFormat('MM-DD') }}</p>
                                    <p>{{ item.createdTime | dateFormat('YYYY') }}</p>
                                    <p>{{ item.readTime }}</p>
                                </div>
                                <div class="artice-info">
                                    <p class="title" :title="item.title">
                                        <nuxt-link :to="`/article/${item.articleId}`">{{ item.title }}</nuxt-link>
                                    </p>
                                    <p class="tags">
                                        {{ item.tags }}
                                    </p>
                                    <p class="des" :title="item.description">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </i-col>
            <i-col :xs="0" :sm="8" :md="7" :lg="6" :xl="6" class="index-aside">
                <div class="wrapper">
                    <PersonalCard></PersonalCard>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import PersonalCard from '~/components/PersonalCard.vue'

export default {
    name: 'index',
    components: {
        PersonalCard
    },
    async asyncData(context) {
        const res = await context.app.$request.getRequest('/front/article/list')
        return {
            articleList: res.data.list.map(item => {
                item.readTime = '9.2分钟'
                item.tags = '独立作品'
                return item
            }),
            total: res.total
        }
    },
    data() {
        return {}
    },
    mounted() {
        this.$store.commit('isIndex')
    },
    methods: {}
}
</script>

<style lang="less">
.container {
    margin: 0 auto;
    padding-top: 36px;
    min-height: calc(100vh - 110px);
    max-width: 1400px;
    .ivu-row {
        .ivu-col {
            height: 100%;
            // background: rgb(255, 243, 197);
            &:nth-of-type(2) {
                // background-color: rgb(169, 250, 158);
            }
        }
    }
    .index-main {
        .article-box {
            margin: 10px 6px 0;
            background: #fff;
            box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
            border-radius: 3px;
            .article-item {
                display: flex;
                justify-content: center;
                padding: 5px;
                border-bottom: 1px solid #eaeaea;
                .datetime-info {
                    width: 70px;
                    padding-right: 10px;
                    text-align: right;
                }
                .artice-info {
                    flex: 1;
                    .title {
                        font-size: 14px;
                        font-weight: 600;
                        a {
                            color: #1890ff;
                        }
                    }
                }
            }
        }
    }
    .index-aside {
        .wrapper {
            margin: 10px 6px 0;
            background: #fff;
            box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
            border-radius: 3px;
        }
    }
}
</style>
