<!--
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-27 15:39:01
 -->
<template>
  <div class="articleNavBar-card-wrapper">
    <div class="card">
      <ul>
        <li :class="{ active: currentIndex === index+1}" v-for="(navItem,index) in navList" :key="index" :style="{'padding-left': (navItem.level * 10) + 'px'}">
          <a href="javaScript:;" @click="goAnchor(`#${'index-' + (index+1)}`)">{{navItem.text + '-' + navItem.level +  '-'+ (index+1)}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    navList: {
      type: Array
    }
  },
  data() {
    return {
      currentIndex: 1
    }
  },
  methods: {
    setCurrentIndex(value){
      if(this.currentIndex !== value){
        this.currentIndex = value
      }
    },
    goAnchor(selector){
      document.querySelector(selector).scrollIntoView();
    }
  },
};
</script>


<style lang="less">
.articleNavBar-card-wrapper {
  .card{
    ul{
      li{
        // list-style:square;
        a{
          color: #333;
          &:hover{
            text-decoration: underline;
          }
        }
      }
      .active{
        color: #1890ff;
        background-color: #f2f2f2;
        font-weight: 600;
        a{
          color: #1890ff;
        }

      }

    }
  }
}
</style>
