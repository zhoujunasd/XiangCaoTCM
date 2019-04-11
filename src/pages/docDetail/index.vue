<template>
    <div class='contant-wrap' >
         <!-- 顶部标题栏start -->
        <div class="top-wrap" v-bind:style="{ paddingTop: navH + 'px' }">
            <div class="back-wrap" @click="navigateBack">
                <icon class="previous-page"></icon>
            </div>
            <span class="top-page-name">医生详情</span>
            <div class="attention-wrap">
                <div v-if="!isLoading"  @click="attentionClick(doctorMessage.ID)">{{docList.isFollow ? '关注':'取消关注'}}</div>
            </div>
        </div>
        <!-- 顶部标题栏end -->
        <!-- 加载显示 -->
        <div class="loading-wrap" v-if="isLoading">
            <img class="loading-img" src="/static/images/isLoading.svg" alt="">
            <span class="loading-text">加载中...</span>
        </div>
        <!-- 数据加载完成后显示 -->
        <div class="contant" v-else v-bind:style="{ top: navH + 40 +'px' }">
            <!-- 头像start -->
            <div class="top-img-wrap">
                <image class="image-wrap" src='/static/images/user.png'></image>
                <div class="message-wrap">
                    <span class="name-wrap">{{doctorMessage.NAME}}<span class="annotation-wrap">({{doctorMessage.TITLE}})</span></span>
                    <span class="tele-wrap">{{doctorMessage.HOSPITAL}}</span>
                </div>
            </div>
            <!-- 头像end -->     
            <!-- 医生信息start -->
            <div class="number-remind border-wrap">
                <div class="remind-left">
                    <img class="remind-img" src="/static/images/message.png" alt="">
                    <span class="lable-wrap">放号提醒</span>
                </div>
                <switch class="switch-class" @change="switchChang"></switch>
            </div>
            <div class="lable-contant border-wrap" >
                <div class="icon-wrap">
                    <icon class="triangle-wrap"></icon>
                </div>
                <span class="lable-wrap">擅长标签</span>
            </div>
            <div class='font-size-wrap border-wrap'>{{doctorMessage.VLABEL}}</div>
            <div class="lable-contant border-wrap">
                <div class="icon-wrap">
                    <icon class="triangle-wrap"></icon>
                </div>
                <span class="lable-wrap">擅长</span>
            </div>
            <div class='font-size-wrap border-wrap'>{{doctorMessage.VIRTUE}}</div>
            <div class="lable-contant border-wrap">
                <div class="icon-wrap">
                    <icon class="triangle-wrap"></icon>
                </div>
                <span class="lable-wrap">简介</span>
            </div>
            <div class='font-size-wrap border-wrap'>{{doctorMessage.SYNOPSIS}}</div>
            <!-- 医生信息end -->
            <!-- 二维码start -->
            <div class="two-dimension-code">
                <div class="basic-message">
                    <span>{{doctorMessage.NAME}}({{doctorMessage.TITLE}})</span>
                    <span class="hospital-wrap">{{doctorMessage.HOSPITAL}}</span>
                </div>
                <div class="img-wrap">
                    <img class="img-class" :src="docList.doctor_qrcode_url" alt="">
                </div>
                <span class="remind-word">Hi~请长按二维码关注我，并欢迎大家分享我的名片给有需要的请朋好友</span>
                <div class="button-wrap">
                    <button class="button-class">咨询医生</button>
                </div>
            </div>
            <!-- 二维码end -->
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            docList: {}, //获取数据
            navH: 0, //顶部导航栏的高度
            // attention: false,//判断是否关注
            doctorMessage: {},//医生
            isLoading: true,
        }
    },
    onLoad(options){
        this.isLoading = true
        const that = this
        this.getData(options)
        wx.getSystemInfo({
            success: function(res) {
                console.log('系统信息',res);
                that.navH = res.statusBarHeight + 30
            },
            fail: function(err) {
                console.log(err);
            }
        })
    },
    methods: {
        getData(options){
            console.log(options);
            this.$net.get(`/user/doctor/detail?doctor_id=${options.ID}`)
                .then(res => {
                    this.isLoading = false
                    this.docList = res.body
                    this.doctorMessage = res.body.doctor
                    console.log('res',res);
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
        // 开关选择器事件
        switchChang(e){
            console.log(e);
            
        },
        // 关注医生事件 
        attentionClick(e){
            console.log(e);
            
            this.$net.post(`/user/follow`, {doctor_id: e}).then(res => {
                console.log(res);
                
            })            
        }
    },
}
</script>

<style lang="scss" scoped>
.loading-wrap{
    text-align: center;
    position:absolute;
    top:30%;
    right:50%;
    transform:translateX(50%);
}
.contant{
    // margin-top: 80rpx;
    position:absolute;
    // top:90px;
    right: 0;
    left: 0;
}
.contant-wrap{
     background-color:#f7f7f7;

    .top-wrap{
        position: fixed;
        right: 0;
        left: 0;
        z-index:99;
        height: 80rpx;
        display: flex;  
        align-items: center;
        justify-content: space-between;
        background-color: #f7f7f7;

        .attention-wrap{
            width: 140rpx;
            height: 56rpx;
            line-height: 56rpx;
            text-align: center;
            font-size: 30rpx;
            font-weight: lighter;
            padding: 0 10rpx 0;
            margin-right:20rpx;
            background-color:#fff;
            border-radius:10rpx;
            border:1rpx solid #ccc;
        }
        .top-page-name{
            font-size:30rpx;
            margin-left:80rpx;
        }
    }
    .back-wrap{
        padding: 0 20rpx 0;
        margin-left: 20rpx;

        .previous-page{
            width: 24rpx;
            height: 24rpx;
            border-color: #9b1104;
            border-style: solid;
            border-width: 0 5rpx 5rpx 0;
            transform: rotate(135deg);
        }
    }
    
}
// background-image:url(),//限制大小8k,或者使用远程
.top-img-wrap{
  position: relative;
  width: 100%;
  height: 270rpx;
  background-image: url(data:image/png;base64,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);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  
  .image-wrap{
    position: absolute;
    top: 36rpx;
    right: 50%;
    transform: translateX(50%);
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }
  .message-wrap{
    position: absolute;
    bottom: 30rpx;
    right: 50%;
    transform: translateX(50%);
    display: flex;
    flex-direction: column;
    font-size: 32rpx;
    color: #fff;

    .name-wrap{
        text-align: center;
    }
  }
  .tele-wrap{
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
// 标签样式
.lable-wrap{
    font-size: 30rpx;
    padding-left: 6rpx;
}
// 下三角样式
.triangle-wrap{
    width: 20rpx;
    height: 20rpx;
    border-color: #414244;
    border-style: solid;
    border-width: 0 5rpx 5rpx 0;
    transform: rotate(45deg);
    vertical-align:super;
}
.border-wrap{
    border-bottom: 1rpx solid #d5d4d8;    
    background-color: #fff;
}
.font-size-wrap{
    font-size: 26rpx;
    padding:20rpx 10rpx 20rpx 15rpx;
}
.number-remind{
    display: flex;
    justify-content: space-between;
    height: 90rpx;
    line-height: 90rpx;

    .remind-left{
        padding-left: 20rpx;

        .remind-img{
            height: 50rpx;
            width: 50rpx;
            vertical-align: middle;
        }
    }
    .switch-class{
        padding-right: 20rpx;
    }

}
.lable-contant{
    display: flex;
    height: 90rpx;
    line-height: 90rpx;

    .icon-wrap{
        padding:0 10rpx 0 30rpx;
    }
}
.two-dimension-code{
    display: flex;
    flex-direction: column;
    background-color: #efeff4;
    align-items: center;

    .basic-message{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 40rpx;
        .hospital-wrap{
            font-size: 30rpx;
            color: #8f8f94;
        }
    }

    .img-class{
        width: 660rpx;
        height: 660rpx;
    }
    .remind-word{
        padding: 20rpx;
        text-align: center;
        font-size: 30rpx;
        color: #8f8f94;
    }
    .button-wrap{
        width:90vw;
        padding-bottom: 20rpx;

        .button-class{
            color: #fff;
            background-color: #9b1004;
        }
    }
}
</style>




