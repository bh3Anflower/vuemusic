<template>
  <div>
    <el-page-header @back="goBack" content="歌单详情"></el-page-header>
    <!-- 歌单信息 -->
    <div class="SLinfo">
      <el-image
        style="max-width: 322px; max-height: 322px; flex: 1"
        :src="coverImg"
        fit="fit"
      ></el-image>
      <div class="info">
        <h3>{{ SLName }}</h3>
        <p class="p_SL">{{ Description }}}</p>
        <span><br />{{ Songcount }}：首歌</span>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <div class="Songlist">
      <div
        v-for="(item, index) in songs"
        :key="item.id"
        @dblclick="playsong(item, item.id)"
      >
        <el-card
          class="box-card"
          shadow="hover"
          body-style="padding: 5px 20px;"
        >
          <el-row :gutter="10">
            <el-col :span="1">
              <span>{{ index + 1 }}</span>
            </el-col>
            <el-col :span="2">
              <el-image
                class="imgAbs"
                :src="item.al.picUrl"
                :title="item.name"
                :alt="item.name"
                fit="fit"
              ></el-image>
            </el-col>
            <el-col :span="5" class="aline">
              <span>{{ item.name }}</span>
            </el-col>
            <el-col :span="5" class="aline">
              <span>{{ item.ar[0].name }}</span>
            </el-col>
            <el-col :span="7" class="aline">
              <span>{{ item.al.name }}</span>
            </el-col>
            <el-col :span="2">
              <el-button
                icon="el-icon-video-play"
                circle
                @click="playsong(item, item.id)"
              >
              </el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                icon="el-icon-video-camera"
                circle
                @click="playMV()"
              ></el-button>
            </el-col>
            <!-- <el-col :span="2">
              <span>音乐时长</span>
            </el-col> -->
          </el-row>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Songlist",
  props: {
    // 动态路由携带过来的id, 来自Songsheet 组件
    SLid: {
      type: String,
      default: "",
    },
  },
  created() {
    this.getSLid();
  },
  data() {
    return {
      coverImg: "", // 歌单封面
      SLName: "", // 歌单名称
      Description: "", // 歌单介绍
      Songcount: "", // 歌曲数目

      songs: "", // 歌曲信息
    };
  },

  methods: {
    // 请求歌单信息
    async getSLid() {
      let { data: res } = await this.$http(
        "/playlist/detail?id=" + this.SLid + "&offset=1"
      );
      this.coverImg = res.playlist.coverImgUrl;
      this.SLName = res.playlist.name;
      this.Description = res.playlist.description;
      this.Songcount = res.playlist.trackCount;
      this.getAllsong();
    },
    // 请求歌单全部音乐信息
    async getAllsong() {
      let { data: res } = await this.$http(
        "/playlist/track/all?id=" + this.SLid + "&limit=" + this.Songcount
      );
      // this.songs = [...res.songs];
      this.songs = res.songs;
      // res.songs.map((item) => this.Sidarr.push(item.id));
    },

    // 播放音乐，播放提示
    playsong(songObj, songId) {
      this.$message({
        message: "开始播放 " + songObj.name,
        type: "success",
      });
      this.$emit("play", songObj, songId);
    },

    // 播放MV，播放提示
    playMV(MVName) {
      this.$message.error("MV 尚未开发");
    },

    // 顶部返回
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scope>
.SLinfo {
  display: flex;
  justify-content: space-between;
  padding: 4px;

  .info {
    flex: 1;
    margin: 10px;
  }

  .p_SL {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 11;
    -webkit-box-orient: vertical;
    text-indent: 2em;
  }
}
.Songlist {
  overflow: auto;
  height: 570px;
}
.box-card {
  margin: 5px 0;
  line-height: 54px;
}
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.imgAbs {
  position: relative !important;
  top: 10px;
  width: 40px;
  height: 40px;
}
.aline {
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
</style>
