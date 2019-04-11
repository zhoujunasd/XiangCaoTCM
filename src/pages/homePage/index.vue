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
            <image class="swiper-image" :src="item.PATH"></image>
          </swiper-item>
        </block>
      </swiper>
      <div class="right-wrap">
        <image  class="top-img"  src="/static/homePage/right.png"  alt=""></image>
      </div>
    </div>
    <!-- 顶部轮播图end -->
    <!-- 功能区域start -->
    <div class="second-column" >
      <div class="image-wrap" @click="navigateToHtmlPage(2)">
        <image class="image-list" src='/static/homePage/zzgy.png' alt=''></image>
        <span>制作工艺</span>
      </div>
      <div class="image-wrap" @click="navigateToHtmlPage(1)">
        <image class="image-list" src='/static/homePage/gyxx.png' alt=''></image>
        <span>关于香雪</span>
      </div>
      <div class="image-wrap">
        <image class="image-list" src='/static/homePage/zxly.png' alt=''></image>
        <span>咨询留言</span>
      </div>
      <div class="image-wrap" @click="navigateToHelpList">
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
          <swiper-item @click="navigateToNews(index)">
            <p class="news-title">{{item.name}}</p>
          </swiper-item>
        </block>
      </swiper>
      <div class="swiper-image-wrap" @click="navigateToNewList">
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
        v-model="doctorSearch"
        placeholder='请输入您的症状或医生名称'
        placeholder-style='font-size:32rpx;color:#a9a9a9'
        confirm-type='search'
        @confirm='navigateToSearchPage'>
      <div class="yuyin-icon-wrap">
        <image src='/static/homePage/yuyinshuru.png'></image>
      </div>
      <div class="sousuo-button" @click="navigateToSearchPage">
        <span>搜索</span>
      </div>
    </div>
    <!-- 搜索栏end -->
    <!-- 症状医生提示栏start -->
    <div class="illness-list">
      <block v-for="(item, index) in illnessList" :key="index">
        <span @click="illnessClick(item)" class="illness-list-item">{{item}}</span>
      </block>
    </div>
    <!-- 症状医生提示栏end -->
    <div class="line-wrap">
      <image src='/static/homePage/xxystj.png'></image>
    </div>
    <!-- 推荐医生start -->
    <div class="doctor-message-wrap">
      <block v-for="(item,index) in doucterList" :key="index">
        <div class="message-wrap" @click="navigateToDocDetail(item.ID)">
          <div class="top-message-wrap">
            <image class="head-image" :src=item.wx_icon></image>
            <div class="right-message-wrap">
              <div class="basic-message-wrap">
                <div class="name-wrap"><span>{{item.NAME}}</span></div>
                <div class="job-wrap"><span>{{item.TITLE}}</span></div>
              </div>
              <div class="city-wrap"><span>{{item.HOSPITAL}}</span></div>
            </div>
          </div>
          <div class="illness-wrap" >
            <block v-for="(item1, index1) in item.VLABEL" :key="index1">
              <span class="illness-list-item">{{item1}}</span>
            </block>
          </div>
        </div>
      </block>
    </div>
    <!-- 推荐医生end -->
    <!-- 加载底部提示更多start -->
    <div v-if="isShow" class="bottom-wrap">
      <div class="more-data" v-if="isLoading">上拉加载更多</div>
      <div class="no-more" v-else>没有更多数据了</div>
    </div>
    <!-- 加载底部提示更多end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrls: [ ], // 轮播图列表数据
      titleList:　[ ],
      illnessList: [ ], //病症列表
      doucterList: [ ], //推荐医生列表数据
      cur_page: 1, //页面
      rows: 9, //一次请求数据的行数
      doctorSearch: '',//要搜索的医生名字或者症状
      hasData: true,//判断是否加载更多
      isLoading: true,//加载
      isShow: false,//优化，数据加载慢时，先显示底部提示问题
    };
  },
  onLoad(){ //推荐在此周期内获取数据，
    this.getDatas()
  },  
  methods: {
    // 获取首页数据
    getDatas(){
      this.hasData = true
      this.isLoading = true
      this.$net.post("/user/index").then(res => {
        console.log(res)
        this.imgUrls = res.body.imgs;
        this.illnessList = res.body.virtueList;
        // forEach不能使用break中断循环，不能使用return语句返回到外层函数，map支持return返回值
        // res.body.randomDocList.forEach(item => {
        //   item.VLABEL = item.VLABEL.split(',')
        // })
        // this.doucterList = res.body.randomDocList
        this.doucterList = res.body.randomDocList.map(item => {
          item.VLABEL = item.VLABEL.split(',')
          return item
        })
        this.isShow = true
      })
      this.$net.get(`/doctor/getNewsList?cur_page=1&newsType=1&rows=5`).then(res => {
        console.log(res.body)
        this.titleList = res.body.newsList
        // 将新闻列表数据存储进vuex
        this.$store.commit('GET_NEWS_INFO',this.titleList)
      })
    },
    // 跳转至显示html的页面，制作工艺和关于香雪，页面顶部有一个图片，和其他的不一样，
    navigateToHtmlPage(typeId){
      wx.navigateTo({
        url: `/pages/htmlPage/main?typeId=${typeId}`,
        success: function(res){ },
        fail: function() { },
      })
    },
    // 跳转至使用指南列表页面 
    navigateToHelpList(){
      wx.navigateTo({
        url: `/pages/helpList/main`,
        success: function(res){ },
        fail: function() { },
      })
    },
    // html跳转至新闻页面
    navigateToNews(typeId){
      wx.navigateTo({
        url: `/pages/helpHtmlPage/main?state=1&typeId=${typeId}`,
        success: function(res){ },  
        fail: function() { },
      })
    },
    // 跳转至新闻列表页面
    navigateToNewList(){
      wx.navigateTo({
        url: `/pages/newsListPage/main`,
        success: function(res){ },
        fail: function() { },
      })
    },
    // 跳转至医生搜索页面
    navigateToSearchPage(){
      console.log(this.doctorSearch)
      wx.navigateTo({
        url: `/pages/searchDoctorPage/main?searchText=${this.doctorSearch}`,
        success: function(res){ },
        fail: function() { },
      })

    },
    // 推荐症状，点击搜索功能,跳转至医生推荐页面
    illnessClick(e){
      wx.navigateTo({
        url: `/pages/searchDoctorPage/main?searchText=${e}`,
      })
    },
    // 跳转至医生详情页面
    navigateToDocDetail(e){
      
      wx.navigateTo({
        url: `/pages/docDetail/main?ID=${e}`,
        success: function(res){ },
        fail: function() { },
      })
    },
  },
  onReachBottom(){ //上拉加载更多推荐医生
    if(this.hasData == true){
      this.$net.get(`/user/findRandomDoctorList?cur_page=${this.cur_page}&rows=${this.rows}`)
        .then(res => {
          console.log('reach',res)
          this.doucterList = res.body.randomDoctorList.map(item => {
            item.VLABEL = item.VLABEL.split(',')
            return item
          })
          this.isLoading = false
          this.hasData = false
        })
    } else {
      console.log('已加载完');
    }
  },
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
  padding: 0 30rpx;
  margin-bottom: 20rpx;
  margin-left: 20rpx;
  color: #62421c;
  font-size: 24rpx;
  text-align: center;
}
.line-wrap image{
  width: 100%;
  height: 50rpx;
  background-color: #efeff4;
  padding: 10rpx 0 10rpx;
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
/* 实现单行内多余胜率改为省略号 */
.news-title{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.bottom-wrap{
  height: 70rpx;
  line-height: 70rpx;
  font-size: 28rpx;
  font-weight: bolder;
  color: #858586;
  text-align: center;
  background-color: #efeff4;
  margin-top:-10rpx;
}

</style>
