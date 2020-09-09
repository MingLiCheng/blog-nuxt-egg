module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "MingLiCheng's personal website",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "keyword", content: "MingLiCheng's personal website" },
      { name: "baidu-site-verification", content: "8tCrkfkLle" },
      {
        hid: "description",
        name: "description",
        content: "MingLiCheng's personal website"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/blog/favicon.ico" }],
    script: [
      {
        src: "https://hm.baidu.com/hm.js?c01effbace7c1532a44febb5950cb8d0"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: true,
  loading: '~/components/LoadingTab.vue',

  css: [
    "view-design/dist/styles/iview.css",
    "mavon-editor/dist/css/index.css",
    "github-markdown-css/github-markdown.css",
    "@/assets/css/reset.less",
    "@/assets/css/main.less"
  ],

  plugins: [
    { src: '@/plugins/vueCustom.js', ssr: true },
    { src: '@/plugins/routerExt.js', ssr: false },
    { src: '@/plugins/view-design', ssr: true },
    { src: '@/plugins/vue-mavon-editor', ssr: false },
    { src: '@/plugins/request', ssr: true },
  ],

  server: {
    port: 3001,
    host: "0.0.0.0"
  },

  env: {
    baseUrl:
      process.env.NODE_ENV === "production"
        ? "http://test.com"
        : "http://127.0.0.1:8000"
  },

  buildModules: [],

  dev: false,
  router: {
    base: "/blog/"
  },

  build: {
    extend(config, ctx) {}
  }
};
