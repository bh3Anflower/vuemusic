<template>
  <div id="main">
    <div id="NavMenu">
      <el-col :span="24">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#fff"
          text-color="000"
          active-text-color="Skyblue"
          router
        >
          <el-menu-item index="home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="mylove">
            <i class="el-icon-star-off"></i>
            <span slot="title">我喜欢的音乐</span>
          </el-menu-item>
          <el-submenu index="null">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span>我创建的歌单</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="null">选项1</el-menu-item>
              <el-menu-item index="null">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="null">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span>我收藏的歌单</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="null">选项1</el-menu-item>
              <el-menu-item index="null">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="long">
            <i class="el-icon-user"></i>
            <span slot="title">登录</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <div class="show">
      <router-view @play="getSobj"></router-view>
    </div>
    <div class="parts">
      <audio
        :src="audioSrc"
        ref="audio"
        autoplay
        @ended="playnext(audioSrc)"
      ></audio>
      <!-- 音乐卡片 -->
      <el-card
        v-for="item in musiclist"
        :key="item.id"
        class="box-card"
        shadow="hover"
        body-style="padding: 2px ;"
      >
        <div class="cardmusic" @dblclick="playmusic(item.Sid, true)">
          <img :src="item.Scover" :alt="item.Sname" :title="item.Sname" />

          <div class="cardHP">
            <h4>{{ item.Sname }}</h4>
            <p>
              {{ item.ar }}
              <el-button
                icon="el-icon-circle-close"
                style="padding: 10px"
                round
                @click="remove(item.Sid, item.Sname)"
              >
              </el-button>
            </p>
          </div>
          <el-divider v-if="now_play(item.Src)" class="p_playing">
            <marquee style="height: 35px; width: 60px">
              <i class="el-icon-video-pause">正在播放</i>
            </marquee>
          </el-divider>
        </div>
      </el-card>
      <el-button
        class="abs"
        icon="el-icon-delete"
        round
        @click="clear()"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavMenu",

  data() {
    return {
      myTitle: "标题",
      SLid: "",
      musiclist: [],
      audioSrc: "", // 音频Src

      songObj: "",
      songId: "",
    };
  },

  methods: {
    getSobj(songObj, songId) {
      // 遍历列表中，和当前重复的歌曲并移除
      this.remove(songId);

      this.songObj = songObj;
      this.songId = songId;
      this.playmusic(songId, false);
    },

    async playmusic(newid, addstop) {
      let { data: res } = await this.$http("/song/url?id=" + newid);
      this.audioSrc = res.data[0].url; // 音频url

      // 阻止双击播放，添加歌曲
      if (addstop) {
        return;
      }
      // 为 musiclist 添加 歌曲
      this.musiclist.unshift({
        Sid: this.songId,
        Scover: this.songObj.al.picUrl,
        Sname: this.songObj.name,
        ar: this.songObj.ar[0].name,
        Src: this.audioSrc,
      });
    },
    // 自动播放下一首
    playnext(nowSrc) {
      // 遍历列表中，Src 一样的，下一项播放
      this.musiclist.forEach((item, index) => {
        if (item.Src == nowSrc) {
          // 如果下一项 下标 等于数组长度，播放第一项
          if (index + 1 == this.musiclist.length) {
            this.audioSrc = this.musiclist[0].Src;
            this.$refs.audio.play();
            this.$message({
              message: "自动播放 " + this.musiclist[0].Sname,
              type: "success",
            });
          } else {
            this.audioSrc = this.musiclist[index + 1].Src;
            this.$message({
              message: "自动播放 " + this.musiclist[index + 1].Sname,
              type: "success",
            });
          }
        }
      });
    },
    // 单击移除列表歌曲
    remove(Sid, name) {
      this.musiclist.forEach((item, index) => {
        if (item.Sid == Sid) {
          this.musiclist.splice(index, 1);
        }
      });
      // 移除成功提示
      if (name) {
        this.$message({
          message: "移除 " + name + " 成功",
          type: "success",
        });
      }
    },

    // 清空列表
    clear() {
      this.musiclist = [];
      this.$refs.audio.pause();
      this.$notify({
        title: "清空",
        message: "列表以清空",
        offset: 10,
      });
    },
    // 正在播放提示
    now_play(src) {
      return this.audioSrc == src;
    },
  },
};
</script>

<style lang="less" scope>
* {
  margin: 0;
  padding: 0;
}
#main {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  #NavMenu {
    flex: 0.55;
  }

  .show {
    flex: 2;
  }

  .parts {
    flex: 0.8;
    height: 100vh;
    overflow: auto;

    .cardmusic {
      display: flex;
      flex-wrap: wrap;

      img {
        flex: 1;
        width: 100px;
        height: 108px;
        margin-right: 10px;
      }

      .cardHP {
        flex: 3;
        display: flex;
        flex-direction: column;
        h4 {
          flex: 3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          flex: 1;
        }
      }
      .p_playing {
        background-color: #dc9fb4;

        i {
          color: #64363c;
        }
      }
    }
    .abs {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
  }
}
</style>
