<template>
  <div class="contant-warp">
    <div class="top-img">
        <image src='/static/images/spage_banner.jpg' alt=''></image>
    </div>
    <div class="html-wrap">
       <rich-text :nodes='htmlData'></rich-text>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlData: "加载中...",
    };
  },
  onLoad(options) {
    this.htmlData = '加载中...';
    // console.log(options);
    this.$net.get(`/user/spage?typeId=${options.typeId}`).then(res => {
        console.log(res)
        this.htmlData = res.body.xxMsgInfo.CONTENT
        this.htmlData =  this.htmlData.replace(/\<img/gi, '<img style="max-width:100%;height:auto;padding-bottom: 20px;" ')
    })
  },
  methods: {},

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped lang='scss'>
.contant-warp {
  width: 100vw;
  height: 100vh;
  
}
.top-img{
    width: 100vw;
    image{
        width: 100%;
        height: 300rpx;
    }
}
.html-wrap{
    box-sizing: border-box;
    padding: 20rpx;
}
</style>
