<template>
  <div class="warp">
    <!-- 顶部轮播图start -->
    <div class="top-wrap">
      <div class="left-wrap">
        <image class="top-img"  src="/static/homePage/right1.jpg"  alt=""></image>
      </div>
      <swiper class="swiper-wrap"
        :indicator-dots='true'
        indicator-color="rgba(0, 0, 0, .3)"
        indicator-active-color="#ffffff"
        :autoplay="true" 
        :interval='3000'>
        <block  v-for="(item,index) in imgUrls"  :key="index">
          <swiper-item>
            <image class="swiper-image" :src="item"></image>
          </swiper-item>
        </block>
      </swiper>
      <div class="right-wrap">
        <image  class="top-img"  src="/static/homePage/right.png"  alt=""></image>
      </div>
    </div>
    <!-- 顶部轮播图end -->
    <!-- 功能区域start -->
    <div class="second-column">
      <div class="image-wrap">
        <image class="image-list" src='/static/homePage/zzgy.png' alt=''></image>
        <span>制作工艺</span>
      </div>
      <div class="image-wrap">
        <image class="image-list" src='/static/homePage/gyxx.png' alt=''></image>
        <span>关于香雪</span>
      </div>
      <div class="image-wrap">
        <image class="image-list" src='/static/homePage/zxly.png' alt=''></image>
        <span>咨询留言</span>
      </div>
      <div class="image-wrap">
        <image class="image-list" src='/static/homePage/sybz.png' alt=''></image>
        <span>使用指南</span>
      </div>
    </div>
    <!-- 功能区域end -->
    <!-- 滚动通知栏start -->
    <div class="column-swiper">
      <div class="swiper-image-wrap">
        <image class="swiper-image-left" src='/static/homePage/xxldl.png'></image>
      </div>
      <swiper class="column-swiper-wrap"
        vertical='true'
        :autoplay="true" 
        :interval='3000'>
        <block v-for="(item, index) in titleList" :key='index'>
          <swiper-item>
            <p>{{item}}</p>
          </swiper-item>
        </block>
      </swiper>
      <div class="swiper-image-wrap">
        <image class="swiper-image-right" src='/static/homePage/more.png'></image>
      </div>
    </div>
    <!-- 滚动通知栏end -->
    <!-- 搜索栏start -->
    <div class="find-wrap">
      <div class="find-icon-wrap">
        <icon class="find-icon" type='search' size='32rpx' color='#000'></icon>
      </div>
      <input class="find-text" type="text" 
        placeholder='请输入您的症状或医生名称'
        placeholder-style='font-size:32rpx;color:#a9a9a9'
        confirm-type='search'>
      <div class="yuyin-icon-wrap">
        <image src='/static/homePage/yuyinshuru.png'></image>
      </div>
      <div class="sousuo-button">
        <span>搜索</span>
      </div>
    </div>
    <!-- 搜索栏end -->
    <!-- 症状医生提示栏start -->
    <div class="illness-list">
      <block v-for="(item, index) in illnessList" :key="index">
        <span class="illness-list-item">{{item}}</span>
      </block>
    </div>
    <!-- 症状医生提示栏end -->
    <div class="line-wrap">
      <image src='/static/homePage/xxystj.png'></image>
    </div>
    <!-- 推荐医生start -->
    <div class="doctor-message-wrap">
      <block v-for="(item,index) in doucterList" :key="index">
        <div class="message-wrap">
          <div class="top-message-wrap">
            <image class="head-image" :src=item.image></image>
            <div class="right-message-wrap">
              <div class="basic-message-wrap">
                <div class="name-wrap"><span>{{item.name}}</span></div>
                <div class="job-wrap"><span>{{item.zhize}}</span></div>
              </div>
              <div class="city-wrap"><span>{{item.city}}</span></div>
            </div>
          </div>
          <div class="illness-wrap" >
            <block v-for="(item1, index1) in item.illList" :key="index1">
              <span class="illness-list-item">{{item1}}</span>
            </block>
          </div>
        </div>
      </block>
    </div>
    <!-- 推荐医生end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrls: [
        "http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6",
        "http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d",
        "http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870"
      ],
      titleList:　[
        '关于qweqweq',
        '对流感say no qweqweqwe',
        '本周六qwewqeqweqwqw'
      ],
      illnessList: [
        '冠心病','脑心病','颈椎病','风湿病','麻疹','头晕','感冒','肺癌'
      ],
      doucterList: [
        {
          image: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
          name: '李际强',
          zhize: '主任医师',
          city: '广东省中医',
          illList: ['呼吸系统', '感染性疾病'],
        }, {
          image: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
          name: '李际强',
          zhize: '主任医师',
          city: '广东省中医',
          illList: ['呼吸系统', '感染性疾病', '感染性染性疾疾病', '感染性染性疾疾病', '感染性疾病'],
        }
      ]
    };
  }
};
</script>

<style scoped>
.top-wrap {
  display: flex;
}
.swiper-wrap, .swiper-image{
  width: 650rpx;
  height: 350rpx;
}
.top-img {
  width: 100rpx;
  height: 350rpx;
}
.second-column{
    display: flex;
    justify-content: space-around;
    border: 1rpx solid #eeeeee;
    box-sizing: border-box;
    padding: 20rpx;
}
.image-wrap{
  display: flex;
  flex-direction: column;
}
.image-wrap span{
  padding-top: 24rpx;
  font-size: 32rpx;
  color: #481613;
}
.image-list{
    width: 120rpx;
    height: 120rpx;
}
.column-swiper{
  height: 80rpx;
  display: flex;
  justify-content: space-between;
  background-color: #f4e6cc;
  border:1rpx solid #ded6cc;
}
.column-swiper-wrap{
  height: 80rpx;
  line-height: 80rpx; 
  width: 500rpx;
  text-align: center;
}
.column-swiper-wrap p{
  font-size: 24rpx;
}
.swiper-image-wrap{
  display: flex;
  align-items: center
}
.swiper-image-left{
  padding-left: 24rpx;
  height: 48rpx;
  width: 48rpx;
}
.swiper-image-right{
  padding-right: 54rpx;
  height: 48rpx;
  width: 114rpx;
}
.find-wrap{
  box-sizing: border-box;
  padding: 18rpx;
  display: flex;
}
.find-icon-wrap{
  height: 72rpx;
  padding: 0 14rpx;
  background-color: #e5e5e5;
  border-bottom-left-radius: 10rpx;
  border-top-left-radius: 10rpx;
  display: flex;
  justify-items: center;
  align-items: center;
}
.find-text{
  height: 72rpx;
  background-color: #e5e5e5;
  flex-grow: 1;/* flex布局，空间多余时，自适应放大。
    默认为0，即有空间也不放大；若所有元素flex-grow: 1，则等分；若其中一个为2，其他为1，则前者占据剩余空间比后者多一倍。 */
}
.yuyin-icon-wrap{
  display: flex;
  justify-items: center;
  align-items: center;
  background-color: #e5e5e5;
  border-bottom-right-radius: 10rpx;
  border-top-right-radius: 10rpx;
}
.yuyin-icon-wrap image{
  width: 48rpx;
  height: 48rpx;
  line-height: 72rpx;
  padding-right: 10rpx;
}
.sousuo-button{
  height: 72rpx;
  line-height: 72rpx;
  font-size: 32rpx;
  padding: 0 10rpx;
}
.illness-list{
  /* display: inline-block; */
  display: inline-flex;
  flex-wrap: wrap;
}
.illness-list-item{
  height: 40rpx;
  /* width: 100%; */
  background-image: url('../../../static/homePage/xxjbbg_little.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0 40rpx;
  margin-bottom: 20rpx;
  margin-left: 20rpx;
  color: #62421c;
  font-size: 24rpx;
  text-align: center;
}
.line-wrap image{
  width: 100%;
  height: 50rpx;
}
.doctor-message-wrap{
  box-sizing: border-box;
  padding: 10rpx;
}
.message-wrap{
  display: flex;
  flex-direction: column;
  border-bottom: 1rpx solid #e3e2e5;
}
.top-message-wrap{
  display: flex;
  box-sizing: border-box;
  padding: 10rpx;
}
.head-image{
  width: 80rpx;
  height: 80rpx;
  margin: 10rpx 20rpx 10rpx;
  border-radius: 24rpx;
}
.basic-message-wrap{
  display: flex;
}
.name-wrap span{
  font-size: 36rpx;
  color: #862b2a;
}
.job-wrap span{
  font-size: 28rpx;
  padding-left: 20rpx;
  color: #c1926d;
}
.city-wrap span{
  font-size: 28rpx;
  color: #c1926d;
}
.illness-wrap{
  display: inline-flex;
  flex-wrap: wrap;
}
</style>
