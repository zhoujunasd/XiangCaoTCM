<template>
  <div class="news-wrap">
    <div class="top-wrap">
      <!-- :class="{active: isSwiper}" -->
      <span v-bind:class="isSwiper == 0 ? 'activeClass' : ''">公司新闻</span>
      <span v-bind:class="isSwiper == 1 ? 'activeClass' : ''">行业动态</span>
      <span v-bind:class="isSwiper == 2 ? 'activeClass' : ''">领导视察</span>
    </div>
    <swiper
      class="swiper-wrap"
      :autoplay="false" 
      @change="swiperChange">
      <swiper-item>
        <block v-for="(item,index) in newsList1" :key='index'>
          <div class="new-info-wrap" @click="navigateToNews(index)">
            <div class="left-img-wrap">
              <image class="left-img" :src="item.THUM"></image>
            </div>
            <div class="right-info">
              <div class="first-name">{{item.name}}</div>
              <div class="second-name">{{item.ABSTRACT}}</div>
              <div class="time-wrap">{{item.createtime}}</div>
            </div>
          </div>
        </block>
        <div class="bottom-wrap">
          <div v-if='loading' class="loading-wrap">正在加载中...</div>
          <div v-else>
            <div v-if="toMore" class="touch-more">上拉加载更多</div>
            <div v-else class="no-more">没有更多数据了</div>
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <block v-for="(item,index) in newsList2" :key='index'>
          <div class="new-info-wrap" @click="navigateToNews(index)">
            <div class="left-img-wrap">
              <image class="left-img" :src="item.THUM"></image>
            </div>
            <div class="right-info">
              <div class="first-name">{{item.name}}</div>
              <div class="second-name">{{item.ABSTRACT}}</div>
              <div class="time-wrap">{{item.createtime}}</div>
            </div>
          </div>
        </block>
      </swiper-item>
      <swiper-item>
        <block v-for="(item,index) in newsList3" :key='index'>
          <div class="new-info-wrap" @click="navigateToNews(index)">
            <div class="left-img-wrap">
              <image class="left-img" :src="item.THUM"></image>
            </div>
            <div class="right-info">
              <div class="first-name">{{item.name}}</div>
              <div class="second-name">{{item.ABSTRACT}}</div>
              <div class="time-wrap">{{item.createtime}}</div>
            </div>
          </div>
        </block>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList1: [], //新闻列表页面
      newsList2: [], //新闻列表页面
      newsList3: [], //新闻列表页面
      cur_page: 1, //当前页数
      newsType: 1, //新闻类型 1=公司新闻、2=行业动态、3=领导视察
      rows: 5, //当前记录数
      isSwiper: 0, //swiper判断是否是当前
      loading: true, // 加载中。。。
      toMore: true, //判断是否还有数据
    };
  },
  onLoad() {
    this.getData();
  },
  onReachBottom(){
    //上拉加载事件 
  },
  methods: {
    getData() {
      const that = this
      this.loading = true
      this.$net.get(`/doctor/getNewsList?
        cur_page=${this.cur_page}&
        newsType=1&
        rows=1`).then(res => {
          console.log(1,res.body)
          this.newsList1 = res.body.newsList
          this.loading = false
          if(res.body.total < this.rows || res.body.total == 0){
            this.toMore = false
          }
        });
      this.$net.get(`/doctor/getNewsList?
        cur_page=1&newsType=2&rows=5`).then(resdata => {
          console.log(2,resdata.body)
          this.newsList2 = resdata.body.newsList
        }).then(() => {
           that.$net.get(`/doctor/getNewsList?
            cur_page=1&newsType=3&rows=5`).then(resdata2 => {
              console.log(3,resdata2.body)
              that.newsList3 = resdata2.body.newsList
            })
        })
    },
    swiperChange(event){
      // console.log(event.target)
      this.isSwiper = event.target.current
    },
    navigateToNews(index){
      if(this.isSwiper == 0){
        this.$store.commit('GET_NEWS_LIST',this.newsList1[index].content)
      } else if(this.isSwiper == 1){
        this.$store.commit('GET_NEWS_LIST',this.newsList2[index].content)
      } else if(this.isSwiper == 2){
        this.$store.commit('GET_NEWS_LIST',this.newsList3[index].content)
      }
      wx.navigateTo({
        url: `/pages/helpHtmlPage/main?state=2`,
      })
    }
  },
  watch: {},
  computed: {},
  created() {}
};
</script>

<style scope lang='scss'>
.top-wrap{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height:60rpx;
  font-size:32rpx;
  line-height:60rpx;
  border-bottom: 1rpx solid #eee;
  background-color: #efeff4;
  span{
    padding:0 40rpx 0;
  }
}
.left-img{
  height: 30rpx;
}
.swiper-wrap{
  position: fixed;
  top: 60rpx;
  left: 0;
  right: 0;
  height: 100vh;
  // margin-top: 60rpx;
  background-color: #eee;
}
.new-info-wrap{
  display: flex;
  justify-content: space-around;
  padding:10rpx;
  border-top:1rpx solid #eee;
  background-color: #fff;
  .left-img-wrap{
    box-sizing: border-box;
    padding: 10rpx;

    .left-img{
      height: 120rpx;
      width: 120rpx;
    }
  }
  .right-info{
    width: 560rpx;
    display: flex;
    flex-direction: column;
    font-size: 30rpx;
    color: #333;
    .first-name{

    }
    .second-name{
      width: 550rpx;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .time-wrap{
      align-self: flex-end;
    }
  }
}
.bottom-wrap{
  text-align: center;
  height: 60rpx;
  line-height: 60rpx;
}
.activeClass{
  color: blue;
}
</style> 