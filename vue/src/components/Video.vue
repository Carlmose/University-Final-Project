<script>
export default {
  name: "Video",
  created() {
    this.loadVideos()
  },
  methods: {
    loadVideos() {
      this.$request.get('/video/selectAll').then(res => {
        if (res.code === '200') {
          this.videoList = res.data || []
          this.video = this.videoList[0].file
        }
      })
    },
  },
  data() {
    return {
      videoList: [],
      video: null,
    }
  }
}
</script>

<template>
  <div class="selected-video-container">
    <div class="selection-title">精选视频</div>
    <video controls class="selected-video" :src="video"></video>
    <div class="selection-list">
      <div class="selection-item" v-for="item in videoList" :key="item.id"
           :class="{'selection-item-active':video===item.file}">
        <img class="selection-img" v-if="video===item.file" src="@/assets/imgs/play.svg">
        <div class="selection-item-title line1 line2" @click="video=item.file">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selection-title {
  font-size: 24px;
}

.selected-video-container {
  display: flex;
  gap: 10px;
  flex-direction: column;
  height: 330px;
}

.selected-video {
  flex: 1;
}

.selection-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  bottom: 0;
}

.selection-item {
  display: flex;
  gap: 5px;
  width: 100%;
  font-size: 15px;
  cursor: pointer;
}

.selection-item-active {
  color: #409EFF;
}

.selection-item-title {

}


.selection-img {
  width: 15px;
}
</style>