<template>
  <div class="content-wrap">
    <div v-if="isLoading">
      <img class="loading-img" src="/static/images/isLoading.svg" alt="">
      <span>正在加载。。。</span>
    </div>
    <div v-else>
      <div class="doctor-message-wrap">
        <block  v-for="(item,index) in newDoucterList" :key="index">
          <div class="message-wrap" @click="navigateToDocPage(item.ID)">
            <div class="top-message-wrap">
              <image  class="head-image"  :src='item.wx_icon' @error="imgError(index)"></image>
              <div class="right-message-wrap">
                <div class="basic-message-wrap">
                  <div class="name-wrap"><span>{{item.NAME}}</span></div>
                  <div class="job-wrap"><span>{{item.TITLE}}</span></div>
                </div>
                <div class="city-wrap"><span>{{item.HOSPITAL}}</span></div>
              </div>
            </div>
            <div class="illness-wrap">
              <block  v-for="(item1, index1) in item.VLABEL" :key="index1">
                <span class="illness-list-item">{{item1}}</span>
              </block>
            </div>
          </div>
        </block>
      </div>
      <div class="no-more">
        <div v-if="hasData">上拉加载更多</div>
        <div v-else>没有更多数据了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,//判断是否在加载中
      hasData: true,//判断是否还有数据
      curPage: 1,//页数
      rows: 10,//行数
      doucterList: [ ],//获取的数据
      newDoucterList: [ ],//获取的数据
      islock: false, //锁,onLoad加载时，不执行onShow
    };
  },
  // 页面加载
  onLoad(){
    console.log('onLoad');
    this.getData()
  },
  onHide(){
    console.log('hide');
    this.islock = true
  },
  onReady(){
    console.log('ready');
  },
  onShow(){
    if(this.islock){
      // 每次跳转至此页面，刷新数据，初始化数据
      this.doucterList = []
      this.newDoucterList = []
      this.isLoading = true
      this.hasData = true
      this.curPage = 1

      this.getData()
      console.log('onShow');
    }
  },
  methods: {
    // 获取数据
    getData(){
      this.$net.get(`/user/mydoctor/list/data?cur_page=${this.curPage}&rows=${this.rows}`)
        .then(res => {
          console.log(res);
          this.isLoading = false
          if(res.code == 200){
            // this.doucterList = res.body.list
            this.doucterList = res.body.list.map(item => {
              if (item.wx_icon == null) {
                item.wx_icon = "/static/images/errorImg.png";
              }
              if (item.VLABEL != null) {
                item.VLABEL = item.VLABEL.split(",");
              }
              return item
            })
            this.newDoucterList = this.newDoucterList.concat(this.doucterList);
            if(res.body.totalPage <= res.body.curPage){
              this.hasData = false
            }
          }
        })
    },
    // 图片获取失败时执行函数
    imgError(e){
      this.doucterList[e].wx_icon = "/static/images/errorImg.png";
    },
    // 跳转至医生详情页面
    navigateToDocPage(e){
      wx.navigateTo({
        url: `/pages/docDetail/main?ID=${e}`,
        success: function(res){ },
        fail: function() { },
      })
    },
  },

  // 上拉加载事件
  onReachBottom(){
    if(this.hasData){
      this.curPage++
      this.getData()
    }
  },
  watch: {},
  computed: {},
  created() {}
};
</script>

<style scoped lang='scss'>
.content-wrap{
  height: 100vh;
  background-color: #efeff4;
  text-align: center;

  .loading-img{
    width: 80rpx;
    height: 80rpx;
    vertical-align: middle;
  }
}
.doctor-message-wrap {
  box-sizing: border-box;
  padding:10rpx 10rpx 0;
  margin-bottom: 10rpx;
  background-color:#fff;

  .message-wrap {
    display: flex;
    flex-direction: column;
    border-bottom: 1rpx solid #e3e2e5;

    .top-message-wrap {
      display: flex;
      box-sizing: border-box;
      padding: 10rpx;
    }

    .illness-wrap {
      display: inline-flex;
      flex-wrap: wrap;
    }
  }

}

.head-image {
  width: 80rpx;
  height: 80rpx;
  margin: 10rpx 20rpx 10rpx;
  border-radius: 24rpx;
}

.right-message-wrap{

  .city-wrap span {
    font-size: 28rpx;
    color: #a28345;
  }

  .basic-message-wrap {
    display: flex;

    .name-wrap span {
      font-size: 36rpx;
      font-weight: lighter;
      color: #000;
    }

    .job-wrap span {
      font-size: 28rpx;
      padding-left: 20rpx;
      color: #a28345;
    }
  }
}

.illness-list-item {
  height: 40rpx;
  background-image: url("../../../static/homePage/xxjbbg_little.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0 30rpx;
  margin-bottom: 20rpx;
  margin-left: 20rpx;
  color: #62421c;
  font-size: 24rpx;
  text-align: center;
}

.no-more{
  margin-top:-5px;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #858586;
  background-color:#efeff4;
  text-align: center;
}
</style>