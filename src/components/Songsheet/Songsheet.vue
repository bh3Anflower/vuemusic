<template>
  <div style="width: 240px" @click="passSLid(id)">
    <el-skeleton style="width: 240px" :loading="loading" animated>
      <!-- 站位部分 -->
      <template slot="template">
        <!-- 站位图片 -->
        <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
        <!-- 文字部分 -->
        <div style="padding: 10px">
          <!-- 站位文字  标题 -->
          <el-skeleton-item variant="h3" style="width: 100%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <!-- 站位文字  右 -->
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <!-- 站位文字  左 -->
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <!-- 显示部分 -->
      <template>
        <el-card
          shadow="hover"
          :body-style="{ padding: '1px', marginBottom: '1px' }"
        >
          <img :src="imgUrl" :title="Sname" :alt="Sname" class="image" />
          <div style="padding: 8px">
            <span>{{ Sname }}</span>
          </div>
        </el-card>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  name: "SongSheet",
  // 从 Home 组件 传过来的歌单数据
  props: {
    id: {
      typeof: Number,
      default: "",
    },
    imgUrl: {
      typeof: String,
      default: "",
    },
    Sname: {
      typeof: String,
      default: "",
    },
  },
  mounted() {
    // 延迟显示歌单封面信息等
    setTimeout(() => (this.loading = false), 3000);
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    // 点击定义事件，携带对应歌单ID
    passSLid(SLid) {
      // 通过编程式导航，向动态路由传参
      this.$router.push("songlist/" + SLid);
    },
  },
};
</script>
<style lang="less" scope>
a {
  text-decoration: none;
}
</style>
