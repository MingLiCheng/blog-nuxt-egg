<!--
 * @Description: 网站通用header
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-26 11:24:19
 -->

<template>
    <section class="comment-header-wrapper">
        <header>
            <h1 @click="toHome">MingLiCheng's website</h1>
            <h2 class="title" :class="{ active: isShowTitle }">{{ headerTitle }}</h2>
            <div class="right-box">
                <a href="javaScript:;" @click="test">登录</a>
            </div>
        </header>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            scrollTop: 0,
            isUp: false,
            isShowTitle: false,
            fnScroll: () => {}
        }
    },
    computed: {
        ...mapGetters(['headerTitle'])
    },
    mounted() {
        this.fnScroll = this.$throttle(this.handleScroll, 100)
        window.addEventListener('scroll', this.fnScroll)
        console.log('%c this.srore', 'color:red', this.$store)
    },
    destroyed() {
        window.removeEventListener('scroll', this.fnScroll)
    },
    methods: {
        handleScroll() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            const relust = scrollTop - this.scrollTop // 本次位置 减去上一次的位置
            this.scrollTop = scrollTop // 保存本次位置

            this.isUp = scrollTop > 100 && relust < 0
            console.log('%c this.$router', 'color: red', this.$route.name)

            if (scrollTop >= 100 && this.$route.name === 'article-detail') {
                this.isShowTitle = true
            } else {
                this.isShowTitle = false
            }
        },
        toHome() {
            this.$router.push('/')
        },
        test() {
            console.log('111')
            console.log('env', process.env.NODE_ENV === 'development')
            this.$store.commit('setHeaderTitle', '1111111111111111')
        }
    }
}
</script>

<style lang="less">
.comment-header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 36px;
    background-image: linear-gradient(135deg, rgba(0, 153, 229, 1), #2196f3);
    color: #fff;
    z-index: 666;
    header {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        height: 100%;
        align-items: center;
        padding: 0 6px;
        h1 {
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            width: 200px;
        }
        .title {
            max-width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 0 auto;
            transform: translateX(-50%);
            transition: all 0.8s;
            text-align: center;
            opacity: 0;
            color: #ffffff;
            font-size: 18px;
            font-weight: 400;
            &.active {
                opacity: 1;
            }
        }
        .right-box {
            width: 200px;
            a {
                color: #fff;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        @media screen and (max-width: 1200px) {
        }
        @media screen and (max-width: 900px) {
        }
        @media screen and (max-width: 780px) {
        }
        @media screen and (max-width: 480px) {
            h1 {
                display: none;
            }
            .right-box{
                display: none;
            }
            .title{
                opacity: 1;
                transform: none;
            }
        }
    }
}
</style>