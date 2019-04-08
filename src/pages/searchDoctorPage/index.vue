<template>
  <div class="contant-wrap">
    <!-- 顶部搜索栏start -->
    <div class="top-wrap">
      <div class="find-wrap">
        <div class="find-icon-wrap">
          <icon class="find-icon" type='search' size='32rpx' color='#000'></icon>
        </div>  
        <input class="find-text"  type="text"
          v-model="searchName"
          placeholder='请输入您的症状或医生名称'
          placeholder-style='font-size:32rpx;color:#a9a9a9'
          confirm-type='search'
          @focus="inputFocus"
          @blur="inputBlur"
          @input="inputFun">
        <div v-if="isShow" class="find-icon-wrap" @click="clearClick">
            <icon class="clear-icon" type='clear' size='32rpx' color='#999'></icon>
        </div>
      </div>
    </div>
    <!-- 顶部搜索栏end -->
    <!-- 推荐医生显示start -->
    <div class="doctor-message-wrap">
      <block v-for="(item,index) in docList" :key="index" >
        <div class="message-wrap" @click="navToDocDetail(item)">
          <div class="top-message-wrap">
            <img class="head-image" :src="item.wx_icon" @error="errorfun(index)">
            <div class="right-message-wrap">
              <div class="basic-message-wrap">
                <div class="name-wrap"><span>{{item.NAME}}</span></div>
                <div class="job-wrap"><span>{{item.TITLE}}</span></div>
              </div>
              <div class="city-wrap"><span>{{item.HOSPITAL}}</span></div>
            </div>
          </div>
          <div class="illness-wrap">
            <block v-for="(item1, index1) in item.VLABEL" :key="index1">
              <span class="illness-list-item">{{item1}}</span>
            </block>
          </div>
        </div>
      </block>
    </div>
    <!-- 推荐医生显示end -->
    <!-- 底部上拉加载start -->
    <div class="bottom-wrap">
        <div v-if="hasData">暂时没有相关数据</div>
        <div v-else>
            <div class="isLoading" v-if="loading">正在加载...</div>
            <div class="noMore" v-else>没有的更多数据了</div>
        </div>
    </div>
    <!-- 底部上拉加载end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      docList: [], //返回数据，医生数据
      newdocList: [],
      page: 1, //加载页数
      row: 10, //每页设置的数据数量
      searchName: "", //搜索医生名或症状名
      defaultImg: "/static/images/errorImg.png", //加载失败默认图片
      loading: true, //加载数据，true为加载中
      hasData: false,//判断是否有数据false时有数据
      isShow: false, // 清除图标是否显示，true是显示
    };
  },
  // 获取数据以及初始化页面数据，第二次加载此页面时，数据不会初始化
  onLoad(options) {
    // console.log(options)
    this.searchName = options.searchText
    this.page = 1
    this.getData(options);
    this.docList = [];
  },
  // 上拉加载事件
  onReachBottom() {
    this.page++;
    let data = {
      searchText: this.searchName
    };
    this.getData(data);
  },
  methods: {
    getData(options) {
      // console.log(options);
      this.$net
        .get(`/user/doctor/list/data?cur_page=${this.page}&rows=${this.row}&searchName=${options.searchText}`)
        .then(res => {
          console.log(res);
          // 判断第一页是否有数据  
          if(res.body.docList.length == 0 && res.body.curPage == 1){
              this.hasData = true
          }
          // 判断是否加载完成
          if (res.body.curPage == res.body.totalPage) {
            this.loading = false;
          }
          this.newdocList = res.body.docList.map(item => {
            // 对获取的数据进行处理
            // 1、没有微信头像图片的设置默认图片位置
            // 2、对VLABEL主治症状，进行数据处理
            if (item.wx_icon == null) {
              item.wx_icon = "/static/images/errorImg.png";
            }
            if (item.VLABEL != null) {
              item.VLABEL = item.VLABEL.split(",");
            }
            // 部分数据为null，数据优化
            if (item.TITLE == null) {
              item.TITLE = "";
            }
            if (item.HOSPITAL == null) {
              item.HOSPITAL = "";
            }
            return item;
          });
          this.docList = this.docList.concat(this.newdocList);
        });
    },
    // 如果图片地址为空，是不会触发binderror的，所以就直接对图片地址做判断，如果为空，则替换为默认图片。
    errorfun(index) {
      // console.log(this.docList[index]);
      this.docList[index].wx_icon = "/static/images/errorImg.png";
    },
    // input聚焦事件
    inputFocus(){
        // console.log('focus');
        if(this.searchName == ''){
            this.isShow = false
        } else {
            this.isShow = true
        }
    },
    inputBlur(){
        // console.log('blur');
        // this.isShow = false; 
    },
    // 对输入数据监控，当数据为空时，不显示清除图标
    inputFun(){
        // console.log(this.searchName);
        if(this.searchName == ''){
            this.isShow = false
        } else {
            this.isShow = true
        }
    },
    // 点击清除图标
    clearClick(){
        // console.log('clear');
        this.searchName = ''
        this.isShow = false
    },
    // 跳转至医生详情页
    navToDocDetail(e){
        console.log(e);
        wx.navigateTo({
            url: `/pages/docDetail/main`,
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
  }
};
</script>

<style scoped lang='scss'>
.contant-wrap {
  height: 100vh;
  background-color: #efeff4;
}
.content-wrap {
  height: 100vh;
  background-color: #efeff4;
}
.doctor-message-wrap {
  box-sizing: border-box;
  padding: 10rpx 10rpx 0;
  margin-bottom: 10rpx;
  background-color: #fff;

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
  border-radius: 20rpx;
}

.right-message-wrap {
  .city-wrap span {
    font-size: 28rpx;
    color: #8f8f94;
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
      color: #8f8f94;
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

.bottom-wrap {
  height: 70rpx;
  line-height: 70rpx;
  font-size: 28rpx;
  font-weight: bolder;
  color: #858586;
  text-align: center;
  background-color: #efeff4;
  .isLoading {
  }
  .noMore {
  }
}
.top-wrap{
    box-sizing: border-box;
    padding:10rpx;
    font-weight: normal;
    .find-wrap{
      display: flex;
      background-color: #d8d8dc;
      border-radius: 10rpx;
      height: 60rpx;
      line-height: 60rpx;
      .find-icon-wrap{
         padding:0 12rpx 0
      }
      .find-text{
          flex: 1;
          align-self:center;
      }
      .clear-icon{

      }
    }
}
</style>

