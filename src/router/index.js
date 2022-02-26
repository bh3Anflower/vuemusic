import Vue from "vue";
import VueRouter from "vue-router";
import NavMenu from "@/views/NavMenu/NavMenu.vue";
import Home from "@/views/Home/Home.vue";
import Mylove from "@/views/Mylove/Mylove.vue";
import Songlist from "@/components/Songlist/Songlist.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/navmenu/home" },
    {
      path: "/navmenu",
      redirect: "/navmenu/home",
      component: NavMenu,
      children: [
        { path: "home", component: Home },
        { path: "mylove", component: Mylove },
        { path: "songlist/:SLid", component: Songlist, props: true },
      ],
    },
  ],
});

export default router;
