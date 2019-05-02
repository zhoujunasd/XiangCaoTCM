<template>
  <div class="counter-warp">
    <!-- 顶部标题栏start -->
    <div class="top-contant-wrap" v-bind:style="{ paddingTop: navH + 'px' }">
      <div class="back-wrap" @click="navigateBack">
          <icon class="previous-page"></icon>
      </div>
      <span class="top-page-name">咨询留言</span>
      <div class="consult-wrap" @click="consultClick">我要留言</div>
    </div>
    <!-- 顶部标题栏end -->
    <!-- 信息显示start -->
    <div v-if="isLoading" class="loading-wrap" v-bind:style="{ top: navH + 40 +'px' }">
      <img class="loading-img" src="/static/images/isLoading.svg" alt="">
      <div class="loading-text">加载中...</div>
    </div>
    <div v-else class="message-contant-wrap" v-bind:style="{ top: navH + 40 +'px' }">
      <block v-for="(item, index) in dataList" :key="index">
        <div class="criculation-wrap" @longpress='longClick(item)'>
          <div class="persong-message">
            <img class="img-class" :src="item.wx_icon" alt="">
            <div class="nickname-class">{{item.wx_nickname}}</div>
          </div>
          <div class="time-wrap">{{item.CREATETIME}}</div>
          <div class="message-wrap">{{item.FEEDBACKMESSAGE}}</div>
        </div>
      </block>
      <div class="loading-wrap">
        <div v-if="hasData">上拉加载更多数据</div>
        <div v-else>没有更多数据了</div>
      </div>
    </div>
    <!-- 信息显示end -->
    <!-- 留言功能start -->
    <div class="message-bard"  
      :animation='animation'
      v-if="isShow" v-bind:style="{ paddingTop: navH + 'px', height: aniHeight-navH+'px',}" >
      <!-- 顶部height:calc(100+'vh' - navH+'px') -->
      <div class="message-top-wrap">
        <span class="message-top-title">咨询留言</span>
        <div class="cancel-wrap" @click="cancelClick">
          <icon type="cancel"  color='blue' size="25" style="height: 25px"></icon>
        </div>
      </div>
      <!-- 内容 -->
      <div class="message-contant">
        <textarea class="textarea-class"
          placeholder-style='font-size: 32rpx;color: #a9a9a9;'
          placeholder='请输入您的咨询内容（500字以内）'
          :auto-focus='true'
          :adjust-position='false'
          :maxlength='500'
          v-model="feedbackMessage"
          :show-confirm-bar='false'
          ></textarea>
      </div>
      <!-- 注 -->
      <div class="ej-classs">注：订单问题或紧急问题请拨打020-22206004获得及时的帮助</div>
      <!-- 按钮 -->
      <div class="button-wrap">
        <button class="button-class" @click="subClick">提交</button>
      </div>
    </div>
    <!-- 留言功能end -->
  </div>
</template>

<script>
import { setInterval, setTimeout } from 'timers';
export default {
  data() {
    return {
      navH:'', //顶部高度
      isLoading: true,//判断是否加载
      curPage: 1,//页数
      rows: 8,//每页数据数
      dataList: [],//获取到的数据
      hasData: true,//判断是否还有数据
      feedbackMessage: '',//反馈信息
      isShow: false, // 留言板显示与否
      animation:' ',//动画
      aniHeight:'', //手机高度
      isLock: true,//锁,防止在动画移动期间，再次点击
    };
  },
  methods: {
    // 长按删除操作
    longClick(e){
      const that = this
      wx.showActionSheet({
        itemList: ['删除此条留言', ],
        success(res) {
          console.log(res.tapIndex,e)
          if(res.tapIndex == 0){
            that.$net.post(`/user/delFeed`,{feedbackId: e.ID}).then(res => {
              console.log('res',res);
              if(res.code == 200){
                that.curPage = 1;
                that.dataList = []
                that.getData()
              }
            })
          }
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })      
    },
    // 页面初始化获取数据
    getData(){
      this.isLoading = true
      this.$net.get(`/user/feed/list/data?cur_page=${this.curPage}&rows=${this.rows}`)
        .then(res => {
          console.log('get',res);
          this.isLoading = false;
          this.dataList = this.dataList.concat(res.body.list);

          if(res.body.curPage >= res.body.totalPage){
            this.hasData = false
          }
        })
    },
    // 返回上一页
    navigateBack(){
        wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
            success: function(res){  },
            fail: function() { },
            complete: function() {
                // 返回上一页后，设置本页加载中
                this.isLoading = true
              }
        })
    },
    // 显示留言功能
    consultClick(){
      if(this.isLock){
        this.isLock = false
        this.isShow = !this.isShow
        setTimeout(()=>{
          const animation = wx.createAnimation({
            duration: 400,
          });
          animation.translateY(-this.aniHeight).step()
          this.animation = animation.export();
        },100)
      }
    },
    // 取消留言板
    cancelClick(){
      const animation = wx.createAnimation({
        duration: 400,
      });
      animation.translateY(0).step()
      this.animation = animation.export();
      setTimeout(()=>{
        this.isShow = !this.isShow 
        this.isLock = true
      },400)
    },
    // 提交留言
    subClick(){
      if(this.feedbackMessage.length < 10){
        wx.showModal({
          title:'提示',
          content:'反馈意见至少输入十个字',
          showCancel: false,
        })
      } else {
        this.$net.post(`/user/saveFeed`,{feedbackMessage: this.feedbackMessage}).then(res => {
          console.log(res);
          if(res.code == 200){
            this.feedbackMessage = ''
            this.curPage = 1
            this.dataList = []
            this.getData()
            const animation = wx.createAnimation({
              duration: 400,
            });
            animation.translateY(0).step()
            this.animation = animation.export();
            setTimeout(()=>{
              this.isShow = !this.isShow 
              this.isLock = true
            },400)
          }
        })
      }
    },
  },
  // 上拉加载
  onReachBottom(){
    if(this.hasData){
      this.curPage++
      this.getData()
    }
  },
  // 在onload周期内执行数据初始化操作
  onLoad() {
    const that = this;
    this.dataList = []
    this.isLoading = true;
    this.hasData = true

    this.getData();
    wx.getSystemInfo({
        success: function(res) {
            console.log('系统信息',res);
            that.navH = res.statusBarHeight + 35
            that.aniHeight = res.screenHeight
        },
        fail: function(err) {
            console.log(err);
        }
    });
    // this.animation = wx.createAnimation({
    //   duration: 100,//动画持续时间
    //   timingFunction: 'linear',//动画效果
    //   delay: 3000,//动画延迟
    //   transformOrigin:'50% 50% 0',//动画效果点
    // })
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.counter-warp{
  height: 100vh;
}
// 顶部标题栏样式
.top-contant-wrap{
  position: fixed;
  right: 0;
  left: 0;
  z-index:99;
  height: 80rpx;
  display: flex;  
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f7;
  border-bottom: 1rpx solid #e1e1e1;
  box-shadow:0rpx 4rpx 4rpx #e1e1e1;
 
  .back-wrap{
      padding: 0 20rpx 0;
      margin-left: 10rpx;
      width:130rpx;

      .previous-page{
          width: 24rpx;
          height: 24rpx;
          border-color: #9b1104;
          border-style: solid;
          border-width: 0 5rpx 5rpx 0;
          transform: rotate(135deg);
      }
  }

  .top-page-name{
    font-size: 34rpx;
  }

  .consult-wrap{
    margin-right: 24rpx;
    width: 160rpx;
    height: 60rpx;
    font-size: 30rpx;
    line-height: 60rpx;
    text-align: center;
    color: #fff;
    background-color: #dd524d;
    border-radius:10rpx;
  }
  .cancel-wrap{
    width:80rpx;

  }
}
// 加载栏样式
.loading-wrap{
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;

  .loading-img{
    width: 60rpx;
    height: 60rpx;
    vertical-align: middle;
  }
  .loading-text{
    height: 60rpx;
    line-height: 60rpx;
  }
}
// 数据显示样式
.message-contant-wrap{
  position: absolute;
  left: 0;
  right: 0;

  .criculation-wrap{
    box-sizing:border-box;
    padding:30rpx 0 40rpx;
    border-bottom:1rpx dotted #ccc;
    margin:0 20rpx 0;
  }
  .persong-message{
    display: flex;

    .img-class{
      width: 48rpx;
      height: 48rpx;
      border-radius: 50%;
    }
    .nickname-class{
      font-size: 36rpx;
      padding-left: 10rpx;
      // font-weight: 300;
    }
  }
  .time-wrap{
    font-size: 30rpx;
    color: #a9a9a9;
    padding: 10rpx 0 10rpx;
  }
  .message-wrap{
    font-size: 32rpx;
    color: #6e6e6e;
  }

  .loading-wrap{
    font-size: 28rpx;
    font-weight: bold;
    color: #878787;
    height: 100rpx;
    line-height: 100rpx;
  }
}
// 留言板
.message-bard{
  position: absolute;
  top: 100vh;
  left:0;
  bottom:0;
  right:0;
  z-index: 999;
  background-color: #f7f7f7;

  .message-top-wrap{
    position: relative;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    border-bottom: 1rpx solid #e1e1e1;
    box-shadow:0rpx 4rpx 4rpx #e1e1e1;

    .message-top-title{
      font-size: 34rpx;
    }

    .cancel-wrap{
      position: absolute;
      top: 10rpx;
      right: 20rpx;
      width:60rpx;
      height:60rpx;
    }
  }

  .message-contant{
    background-color: #fff;
    box-sizing:border-box;
    padding:24rpx;

    .textarea-class{
      width: auto;
      box-sizing: border-box;
      padding: 20rpx;
      border: 1px solid #cbcbcb;
      border-radius: 20rpx;
    }
  }

  .ej-classs{
    height: 60rpx;
    line-height: 60rpx;
    text-align: start;
    padding: 30rpx;
    font-size: 32rpx;
    color: #8f8f94;
  }

  .button-wrap{
    box-sizing: border-box;
    padding: 30rpx;
    .button-class{
      font-size: 36rpx;
      color: #fff;
      background-color: #9b1004;
    }
  }
}
</style>

