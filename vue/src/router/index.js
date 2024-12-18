import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const routes = [
    {
        path: "/",
        name: "Manager",
        component: () => import("../views/Manager.vue"),
        redirect: "/home", // 重定向到主页
        children: [
            {
                path: "403",
                name: "NoAuth",
                meta: {name: "无权限"},
                component: () => import("../views/manager/403"),
            },
            {
                path: "home",
                name: "Home",
                meta: {name: "系统首页"},
                component: () => import("../views/manager/Home"),
            },
            {
                path: "admin",
                name: "Admin",
                meta: {name: "管理员信息"},
                component: () => import("../views/manager/Admin"),
            },
            {
                path: "adminPerson",
                name: "AdminPerson",
                meta: {name: "个人信息"},
                component: () => import("../views/manager/AdminPerson"),
            },
            {
                path: "password",
                name: "Password",
                meta: {name: "修改密码"},
                component: () => import("../views/manager/Password"),
            },
            {
                path: "notice",
                name: "Notice",
                meta: {name: "公告信息"},
                component: () => import("../views/manager/Notice"),
            },
            {
                path: "user",
                name: "User",
                meta: {name: "用户信息"},
                component: () => import("../views/manager/User"),
            },
            {
                path: "banner",
                name: "Banner",
                meta: {name: "轮播图信息"},
                component: () => import("../views/manager/Banner"),
            },
            {
                path: "category",
                name: "Category",
                meta: {name: "新闻分类信息"},
                component: () => import("../views/manager/Category"),
            },
            {
                path: "news",
                name: "News",
                meta: {name: "新闻信息"},
                component: () => import("../views/manager/News"),
            },
            {
                path: "video",
                name: "Video",
                meta: {name: "新闻视频"},
                component: () => import("../views/manager/Video"),
            },
            {
                path: "question",
                name: "Question",
                meta: {name: "问题信息"},
                component: () => import("../views/manager/Question"),
            }, {
                path: "answer",
                name: "Answer",
                meta: {name: "答题信息"},
                component: () => import("../views/manager/Answer"),
            }, {
                path: "feedback",
                name: "Feedback",
                meta: {name: "用户反馈"},
                component: () => import("../views/manager/Feedback"),
            },
            {
                path: "comment",
                name: "Comment",
                meta: {name: "评论信息"},
                component: () => import("../views/manager/Comment"),
            },
        ],
    },
    {
        path: "/front",
        name: "Front",
        component: () => import("../views/Front.vue"),
        children: [
            {
                path: "home",
                name: "Home",
                meta: {name: "系统首页"},
                component: () => import("../views/front/Home"),
            },
            {
                path: "person",
                name: "Person",
                meta: {name: "个人信息"},
                component: () => import("../views/front/Person"),
            },
            {
                path: "userQuestion",
                name: "UserQuestion",
                meta: {name: "我的回答"},
                component: () => import("../views/front/UserQuestion.vue"),
            },{
                path: "userAnswer",
                name: "UserAnswer",
                meta: {name: "我的回答"},
                component: () => import("../views/front/UserAnswer.vue"),
            },
            {
                path: "newsDetail",
                name: "NewsDetail",
                component: () => import("../views/front/NewsDetail"),
            },
            {
                path: "question",
                name: "Question",
                component: () => import("../views/front/Question"),
            },
            //questiondetial
            {
                path: "questionDetail",
                name: "QuestionDetail",
                component: () => import("../views/front/QuestionDetail"),
            },
        ],
    },
    {
        path: "/login",
        name: "Login",
        meta: {name: "登录"},
        component: () => import("../views/Login.vue"),
    }, {
        path: "/adminLogin",
        name: "AdminLogin",
        meta: {name: "管理员登录"},
        component: () => import("../views/AdminLogin.vue"),
    },
    {
        path: "/register",
        name: "Register",
        meta: {name: "注册"},
        component: () => import("../views/Register.vue"),
    },
    {
        path: "*",
        name: "NotFound",
        meta: {name: "无法访问"},
        component: () => import("../views/404.vue"),
    },
];
// 创建router实例
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// 注：不需要前台的项目，可以注释掉该路由守卫
// 路由守卫
// router.beforeEach((to, from, next) => {
//     let user = JSON.parse(localStorage.getItem("xm-user") || '{}');
//     if (to.path === '/') {
//         if (user.role) {
//             if (user.role === 'USER') {
//                 next('/front/home')
//             } else {
//                 next('/home')
//             }
//         } else {
//             next('/login')
//         }
//     } else {
//         next()
//     }
// })

export default router;
