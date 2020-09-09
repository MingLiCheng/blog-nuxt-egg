<!--
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-07-08 16:29:57
-->
<template>
    <div class="tabloader"></div>
</template>

<style lang="scss" scoped>
.tabloader{
    position: fixed;
    top: 0;
    width: 100%;
    height: 3px;
    z-index: 9999999;
    background-image: linear-gradient(to right, #e4e3e3 0%, #d3d3d3 25%,  #c0c0c0 50%, #a8a8a8 75%, #747273 100%);
    animation: loader 3s linear infinite;
}
@keyframes loader {
    100% {
        background-position: 930px 0
    }
}
</style>