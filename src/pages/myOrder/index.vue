<template>
  <div class="pay-wrap">
    <div class="prepaid">
      <div class="non-payment">未付款</div>
      <div class="paied-wrap">已支付</div>
    </div>
    
    <div class="no-more">
      <span>没有更多数据了</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {},
  created() {}
};
</script>

<style scope lang='scss'>
.prepaid{
  display: flex;
  text-align: center;
  font-size: 32rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #efeff4;
  border-bottom: 1rpx solid #c8c7cc;

  .non-payment{
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