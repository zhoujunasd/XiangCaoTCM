<template>
  <div class="content-wrap">
    <div class="doctor-message-wrap">
      <block  v-for="(item,index) in doucterList"  :key="index">
        <div class="message-wrap">
          <div class="top-message-wrap">
            <image  class="head-image"  :src=item.image></image>
            <div class="right-message-wrap">
              <div class="basic-message-wrap">
                <div class="name-wrap"><span>{{item.name}}</span></div>
                <div class="job-wrap"><span>{{item.zhize}}</span></div>
              </div>
              <div class="city-wrap"><span>{{item.city}}</span></div>
            </div>
          </div>
          <div class="illness-wrap">
            <block  v-for="(item1, index1) in item.illList"  :key="index1">
              <span class="illness-list-item">{{item1}}</span>
            </block>
          </div>
        </div>
      </block>
    </div>
    <div class="no-more">
      <span>没有更多数据了</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doucterList: [
        {
          image: "http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6",
          name: "李际强",
          zhize: "主任医师",
          city: "广东省中医",
          illList: ["呼吸系统", "感染性疾病", "肾功能系统疾病"]
        },
        {
          image: "http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6",
          name: "黄明",
          zhize: "主任医师",
          city: "广东省中医"
        }
      ]
    };
  },
  methods: {},
  watch: {},
  computed: {},
  created() {}
};
</script>

<style scoped lang='scss'>
.content-wrap{
  height: 100vh;
  background-color: #efeff4;
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
  height: 60rpx;
  line-height: 60rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #858586;
  text-align: center;
}
</style>