<template>
  <div class="contant-wrap">
    <block
      v-for="(item, index) in helpInfoList"
      :key='index'
    >
      <div class="help-list" @click="navigateToHelpPage(index)">
        <span class="help-name">{{item.NAME}}</span>
        <div class="right-icon-wrap"></div>
      </div>
    </block>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      htmlData: "",
      helpInfoList: []
    };
  },
  onLoad() {
    this.getData();
  },
  components: {},
  methods: {
    ...mapMutations({ getHelpInfo :'GET_HELP_INFO_LIST',}),
    getData() {
      this.$net.get(`/user/help_list`).then(res => {
        console.log(res);
        this.helpInfoList = res.body.helpInfoList;
        this.getHelpInfo(this.helpInfoList)
      });
    },
    navigateToHelpPage(typeId){
        wx.navigateTo({
            url: `/pages/helpHtmlPage/main?state=0&typeId=${typeId}`,
            success: function(res){
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped lang='scss'>
.contant-wrap {
  height: 100vh;
  background-color: #efeff4;
//   border-top: 1rpx solid #e3e2e5;
//   border-bottom: 1rpx solid #e3e2e5;
}
.help-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-top: 1rpx solid #e3e2e5;
  box-sizing: border-box;
  padding: 30rpx;

}
.right-icon-wrap {
  width: 18rpx;
  height: 18rpx;
  border-color: #ccc;
  border-style: solid;
  border-width: 0 2rpx 2rpx 0;
  transform: rotate(-45deg);
}
</style>
