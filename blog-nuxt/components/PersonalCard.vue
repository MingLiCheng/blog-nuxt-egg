<!--
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-27 15:39:01
 -->
<template>
  <div class="personal-card-wrapper">
    <div class="card">
      <p slot="title"></p>
      <div class="author-introduction">
        <img src="http://www.cdbook.xyz/images/20200411134137.png" />
        <div class="author-info">
          <h3 class="">MingLi Cheng</h3>
          <div>专注于WEB和移动前端开发</div>
        </div>
      </div>
      <div class="author-tags">
        <Tag color="orange">orange</Tag>
        <Tag color="green">green</Tag>
        <Tag color="cyan">cyan</Tag>
        <Tag color="blue">blue</Tag>
        <Tag color="geekblue">geekblue</Tag>
        <Tag color="purple">purple</Tag>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less">
.personal-card-wrapper {
  .author-introduction {
    display: flex;
    justify-content: flex-start;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .author-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px;
      div {
        display: flex;
        align-items: center;
        color: #999;
      }
    }
  }
  .author-tags {
    padding: 5px 0px;
  }
}
</style>
