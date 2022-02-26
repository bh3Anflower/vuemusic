<template>
  <div>
    <el-carousel :interval="3000" type="card" height="250px">
      <el-carousel-item v-for="(item, index) in banners.length" :key="item">
        <img
          :src="banners[index].imageUrl"
          :alt="banners[index].typeTitle"
          @click="addsong(banners[index].targetType, banners[index].targetId)"
        />
      </el-carousel-item>
    </el-carousel>
    <h2>热门推荐</h2>
    <!-- Element 组件库 v-infinite-scroll="load" 无限滚动(懒加载) -->
    <div class="Ssheet" v-infinite-scroll="load">
      <!-- 遍历组件，并向 子组件 Songsheet 传歌单数据 -->
      <span v-for="item in Songlist" :key="item.id">
        <Songsheet
          class="Ssheet_margin"
          :id="item.id"
          :imgUrl="item.picUrl"
          :Sname="item.name"
        ></Songsheet>
      </span>
    </div>
  </div>
</template>

<script>
import Songsheet from "@/components/Songsheet/Songsheet.vue";
export default {
  components: { Songsheet },
  name: "Home",
  data() {
    return {
      // 轮播图信息数组对象
      banners: "",
      // 热门推荐歌单信息数组对象
      Songlist: "",
      // 歌单懒加载初始值
      count: 0,
    };
  },
  created() {
    this.getBanners();
    this.getHot();
  },
  methods: {
    // 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
    async getBanners() {
      // type:资源类型,对应以下类型,默认为 0 即 PC  0: pc 1: android 2: iphone 3: ipad
      let { data: res } = await this.$http.get("/banner?type=0");
      this.banners = res.banners;
    },
    // 说明 : 调用此接口 , 可获取推荐歌单(热门歌单)
    // 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
    async getHot() {
      let { data: res } = await this.$http.get(
        "/personalized?limit=" + (12 + this.count)
      );
      this.Songlist = res.result;
    },
    load() {
      this.count += 4;
      this.getHot();
    },
    //  暂时遗弃，无法从API获取到轮播图，某首音乐的名字、封面...
    // addsong(tarType, tarId) {
    //   switch (true) {
    //     case tarType == 1:
    //       this.getSObj(tarId);

    //       break;

    //     default:
    //       break;
    //   }
    //   console.log(tarType, tarId);
    // },
    // async getSObj(tarId) {
    //   // let { data: res } = await this.$http.get("/song/url?id=" + tarId);
    //   // console.log(res);
    //   // console.log(res.data[0].url);
    //   let { data: res } = await this.$http.get("/album?id=" + tarId);
    //   console.log(res);
    // },
  },
};
</script>

<style lang="less" scope>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img {
  max-width: 100%;
  height: 250px;
}
h2 {
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.Ssheet {
  overflow: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: flex-start;
  flex-wrap: wrap;
  height: 1000px;

  .Ssheet_margin {
    margin: 5px 0;
  }
}
</style>
