<template>
  <div class="pay-wrap">
    <div class="prepaid">
      <radio-group class="radio-group" @change="handleClickPay">
        <label class="non-payment">
          <radio  :value="1" />未付款
        </label>
        <label class="paied-wrap">
          <radio :value="2" /> 已支付
        </label>
      </radio-group>
    </div>
    <block v-if='isPay'>
      <div class="">
        未付款
      </div>
    </block>
    <block v-if="!isPay">
      <div>
        已付款
      </div>
    </block>
    <div class="no-more">
      <span>没有更多数据了</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPay: true,
    };
  },
  methods: {
    handleClickPay(e){
      if(e.target.value == 1){
        this.isPay = true 
      } else {
        this.isPay = false 
      }
    }
  },
  watch: {},
  computed: {},
  created() {}
};
</script>

<style scope lang='scss'>
.non-payment radio,.paied-wrap radio{
  display: none;
}

.radio-group{
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 32rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #efeff4;
  border-bottom: 1rpx solid #c8c7cc;

  .non-payment{
    color: #007aff;
    flex: 1;
  }
  .paied-wrap{
    flex: 1;
  }
}


.no-more{
  height: 80rpx;
  line-height: 80rpx;
  font-size: 32rpx;
  color: #777;
  background-color: #efeff4;
  text-align: center;
}

</style> 