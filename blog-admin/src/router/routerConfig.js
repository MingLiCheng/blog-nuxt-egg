/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-20 11:42:46
 */
const routes = {
    menus: [
        {
            path: '/app/blog_manage',
            key: 'blog_manage',
            title: '标题一', // '博客管理',
            icon: '',
            component: 'BlogManage',
            children: [
                {
                    path: '/app/blog_manage/article_manage',
                    key: 'article_manage',
                    title: '标题1.1', // '博客管理',
                    icon: '',
                    component: 'ArticleManage',
                    children: [
                        {
                            path: '/app/blog_manage/article_manage/article_detail',
                            key: 'article_detail',
                            title: '详情',
                            icon: '',
                            component: 'ArticleDetail',
                        },
                    ],
                },
                {
                    path: '/app/blog_manage/blogtype_manage',
                    key: 'blogtype_manage',
                    title: '标题1.2', // '博客管理',
                    icon: '',
                    component: 'BlogType',
                },
            ],
        },
        {
            path: '/app/source_manage/index',
            key: 'source_manage',
            title: '标题二', //'资源管理',
            icon: '',
            component: 'SourceManage',
        },
        {
            path: '/app/system_manage/index',
            key: 'system_manage',
            title: '标题三', //'博客管理',
            icon: '',
            component: 'SystemManage',
        },
    ],
};
export default routes;
