<template>
  <div class="contant-wrap">
    <div class="image-wrap">
      <span class="left-wrap">头像</span>
      <div class="right-wrap">
        <image
          class="image-contant-wrap"
          :src='personInfo.WX_ICON'
        ></image>
        <icon class="right-icon-wrap"></icon>
      </div>
    </div>
    <div class="person-info">
        <div class="info-wrap">
            <div class="left-wrap">
                <span>姓名</span>
                <span style="color:red">*</span>
            </div>
            <div class="right-wrap">
                <input class="input-class" type="text" 
                    v-model="personInfo.NAME"
                    confirm-type='next'
                    placeholder='请输入姓名'
                    placeholder-style='font-size:32rpx;color:#a9a9a9'
                    @focus="focusFun(1)"
                    @input="inputFun"
                    @blur="blurFun">
                <div v-if="personInfo.NAME && isShow == 1" class="find-icon-wrap" @click="clearClick(1)">
                    <icon class="clear-icon" type='clear' size='32rpx' color='#999'></icon>
                </div>
            </div>
        </div>
        <div class="info-wrap">
            <div class="left-wrap">
                <span>年龄</span>
                <span style="color:red">*</span>
            </div>
            <div class="right-wrap">
                <input class="input-class" type="text" 
                    v-model="personInfo.AGE"
                    confirm-type='next'
                    placeholder='请输入姓名'
                    placeholder-style='font-size:32rpx;color:#a9a9a9'
                    @focus="focusFun(2)"
                    @blur="blurFun">
                <div v-if="personInfo.AGE >=0 && isShow == 2" class="find-icon-wrap" @click="clearClick(2)">
                    <icon class="clear-icon" type='clear' size='32rpx' color='#999'></icon>
                </div>
            </div>
        </div>
        <div class="info-wrap">
            <div class="left-wrap">
                <span>性别</span>
                <span style="color:red">*</span>
            </div>
            <div class="right-wrap">
                <!-- <input class="input-class" type="text" 
                    v-model="personInfo.AGE"
                    placeholder='请输入姓名'
                    placeholder-style='font-size:32rpx;color:#a9a9a9'>
                <div v-if="isShow" class="find-icon-wrap" @click="clearClick">
                    <icon class="clear-icon" type='clear' size='32rpx' color='#999'></icon>
                </div> -->
                <picker
                 mode='selector'
                 >
                </picker>
            </div>
        </div>
        <div class="info-wrap">
            <div class="left-wrap">
                <span>手机号</span>
                <span style="color:red">*</span>
            </div>
            <div class="right-wrap">
                <input class="input-class" type="text" 
                    v-model="personInfo.TEL"
                    confirm-type='next'
                    placeholder='请输入手机'
                    placeholder-style='font-size:32rpx;color:#a9a9a9'
                    @focus="focusFun(3)"
                    @blur="blurFun">
                <div v-if='personInfo.TEL && isShow == 3' class="find-icon-wrap" @click="clearClick(3)">
                    <icon class="clear-icon" type='clear' size='32rpx' color='#999'></icon>
                </div>
            </div>
        </div>
        <div class="info-wrap">
            <div class="left-wrap">
                <span>地址</span>
            </div>
            <div class="right-wrap">
                <input class="input-class" type="text" 
                    v-model="personInfo.ADDRESS"
                    confirm-type='done'
                    placeholder='请输入地址'
                    placeholder-style='font-size:32rpx;color:#a9a9a9'
                    @focus="focusFun(4)"
                    @blur="blurFun">
                <div v-if="personInfo.ADDRESS && isShow == 4" class="find-icon-wrap" @click="clearClick(4)">
                    <icon class="clear-icon" type='clear' size='32rpx' color='#999'></icon>
                </div>
            </div>
        </div>

    </div>
    <button @click="saveClick">保存</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personInfo: {}, //个人信息
      isShow: 0, //图标显示与否
    };
  },
  onLoad() {
    this.getData();
  },
  methods: {
    getData() {
      this.$net.get(`/user/myinfo`).then(res => {
        console.log("get", res);
        if (res.code == 200) {
          this.personInfo = res.body.cusInfo;
        }
      });
    },
    focusFun(e){
        // console.log(e.mp.detail.value,e);
        // let reg = /^ *$/;
        // switch(e){
        //   case 1: 
        //     console.log(this.personInfo.NAME);
        //     console.log(reg.test(this.personInfo.NAME));
        //     if(this.personInfo.NAME || !reg.test(this.personInfo.NAME)){
        //       this.isShow = true;
        //     };break;
        //   case 2:break;
        // }
        switch (e) {
          case 1:  this.isShow = 1;  break;
          case 2:  this.isShow = 2;  break;
          case 3:  this.isShow = 3;  break;
          case 4:  this.isShow = 4;  break;
          default:  break;
        }
    },
    // 清除功能
    clearClick(e){
        switch (e) {
          case 1:  this.personInfo.NAME = '';  break;
          case 2:  this.personInfo.AGE = '';  break;
          case 3:  this.personInfo.TEL = '';  break;
          case 4:  this.personInfo.ADDRESS = '';  break
          default:  break;
        }
    },
    saveClick(){
        console.log(this.personInfo);
    },
    inputFun(){
      // 判断输入的是否是空字符串，
      // var reg = /^ *$/;  //这里^和*之间有一个空格
      // console.log(reg.test(this.personInfo.NAME))
      
    },
    blurFun(){
      this.isShow = 0;
    },
  }
};
</script>

<style lang="scss" scoped>
.contant-wrap {
  height: 100vh;
  background-color: #efeff4;
  box-sizing: border-box;
  padding-top: 20rpx;

  .image-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120rpx;
    font-size: 32rpx;
    background-color: #fff;
    border: 1px solid #e3e2e5;
    border-style: solid none;

    .left-wrap{
        padding-left: 40rpx;
    }
    .right-wrap {
      display: flex;
      align-items: center;
      padding-right: 40rpx;
    }
    .image-contant-wrap {
      margin-right:40rpx;
      width: 80rpx;
      height: 80rpx;
      border-radius:20%;
    }
    .right-icon-wrap {
      width: 20rpx;
      height: 20rpx;
      border-color: #ccc;
      border-style: solid;
      border-width: 0 5rpx 5rpx 0;
      transform: rotate(-45deg);
    }
  }

  .person-info{
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-left: 40rpx;
      background-color:#fff;
      border:1rpx solid #e3e2e5;
      border-style: solid none;

      .info-wrap{
        height: 80rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid #e3e2e5;
        font-size: 32rpx;

        .find-icon-wrap{
            padding: 10rpx 24rpx 0;
        }
        .right-wrap{
            display: flex;
            width: 580rpx;
         .input-class{
             flex: 1;
         }   
        }
      }
  }
}

</style>
