<template>
  <div class="contant-wrap">
    <rich-text :nodes='htmlData'></rich-text>
  </div>
</template>

<script>
export default {
  data() {
    return {
        htmlData: "",
    };
  },
  onLoad(options) {
    console.log(options)
    // state，0是使用指南，1是新闻，2是从新闻列表页进的新闻
    if(options.state == 0){
        this.htmlData = this.$store.state.helpInfoList[options.typeId].CONTENT
    } else if(options.state == 1){
        this.htmlData = this.$store.state.newsList[options.typeId].content
    } else if(options.state == 2){
      this.htmlData = this.$store.state.htmlData
    }
    // 对html数据内的img数据进行处理
      this.htmlData =  this.htmlData.replace(/\<img/gi, '<img style="max-width:100%;height:auto;" ')
  },
  components: {},
  methods: {
    
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped lang='scss'>
.contant-wrap{
    box-sizing: border-box;
    padding: 20rpx;
}
</style>
