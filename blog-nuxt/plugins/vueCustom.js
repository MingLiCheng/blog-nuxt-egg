/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-07-08 16:54:18
 */
import Vue from 'vue'
import moment from "moment";
const filters = {
  dateFormat: function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
  }
};

const custom = {
  install(Vue, options) {
    // 过滤器
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key]);
    });
    // 设置滚动条位置
    Vue.prototype.$setScroll = (dom, type) => {
      // 计算滚动距离
      const t = document.querySelector(dom).offsetTop;
      const h = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      const index = type == 'index' ? 200 : 0
      const target = type == 'comment' ? t - 200 : scrollTop + h / 2 - 100 + index

      this.timerScroll = setInterval(() => {
        /**
         * 滚动条顶部距离
         * 浏览器视口高度
         * 文档的总高度
         */
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

        let speed = (target - scrollTop) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (((scrollTop + speed) >= target && type !== 'comment') || (scrollTop + speed) <= target && type == 'comment') {
          clearInterval(this.timerScroll)
          scrollTop = document.body.scrollTop = document.documentElement.scrollTop = target;
        } else {
          scrollTop = document.body.scrollTop = document.documentElement.scrollTop = scrollTop + speed;
        }

        if (scrollTop + windowHeight >= scrollHeight) {
          clearInterval(this.timerScroll)
        }
      }, 25)
    }

    // 加载下一页数据
    let [page, loadingFrom, loadingType] = [1, '', 'more'];
    Vue.prototype.$load = (type, from) => {
      // 离开路由 初始化
      if (type == 'none') {
        loadingFrom = '';
        loadingType = 'more';
        page = 1;
        return;
      }

      // 初始化
      if (type != loadingFrom) {
        loadingFrom = type;
        loadingType = 'more';
        page = 1;
      }

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if (scrollTop + windowHeight >= scrollHeight - 10) {

        if (loadingType == 'nomore' || loadingType == 'loading') return;

        page++;
        loadingType = 'loading';

        const axios = Vue.prototype.$nuxt.$options.$axios;

        const data = {
          page: page,
          from: from ? 'list' : ''
        }
        return new Promise((resolve, reject) => {
          axios.get(type, { params: data }).then(res => {
            setTimeout(() => {
              loadingType = res.data.body.page == res.data.body.totalPage ? 'nomore' : 'more'
              resolve(res.data)
            }, 1000)
          }).catch(err => {
            loadingType = 'more';
            reject()
          })
        })
      }
    }

    /**
     * 首页图片懒加载
     */
    let listenList = []; // 需加载图片

    Vue.directive('lazy', {
      inserted: (el, binding, vnode) => {
        const url = binding.value
        listenList.push({ el, src: url })
        window.addEventListener('scroll', watch)
        // 首屏初始化
        lazyLoad({ el, src: url })
      },
      unbind: (el, binding) => {
        window.removeEventListener('scroll', watch)
      }
    })

    // 使用函数，切换路由，可清除监听事件
    const watch = () => {
      Vue.prototype.$throttle(() => listenList.map(i => lazyLoad(i)), 50)()
    }

    // 加载图片
    const lazyLoad = (item) => {
      const { el, src } = item;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const position = el.getBoundingClientRect().top;
      const show = position <= windowHeight + 500

      // 元素存在，元素可见
      if (src && show) {
        let img = new Image();
        img.src = src;

        // 加载成功后, 删除对象
        img.onload = (e) => {
          el.src = src;
          const index = listenList.indexOf(item);
          index > -1 && listenList.splice(index, 1)
        }
      }
    }

    Vue.prototype.$throttle = (fn, interval = 300) => {
      let flag = true;
      return function (...args) {
        if (flag) {
          flag = false;
          setTimeout(() => {
            fn.apply(this, args);
            flag = true;
          }, interval);
        }
      }
    }

    Vue.prototype.$debounce = (fn, interval = 300) => {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, interval);
      }
    }

    // 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。  最后一次会执行
    // 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。 最后一次 可能无法执行
  }
}

Vue.use(custom)
