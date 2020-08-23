<template>
  <div id="transferInfo">
    <transition :name="transitionName">
      <div class="fh" v-if="show" style="width: 100%;">
        <div style="background: #f2f2f2">
          <div class="fh" style="position: fixed;z-index: 99;top:0;left: 0;width: 100%">
            <van-nav-bar
              title="商铺详情"
              left-arrow
              @click-left="back"
            />
          </div>
          <div class="pt20 mt40 pb15 bgf fh container">
            <van-row class="cr c000  fb ">
              <van-col span="20" >
                <span class="f18"> {{rentoutForm.title}}</span>
              </van-col>
              <!--              <van-col span="4" >-->
              <!--                <van-cell title="" @click="share" style="color: red">-->
              <!--                  <van-icon name="share" />分享-->
              <!--                </van-cell>-->
              <!--                <van-share-sheet-->
              <!--                  v-model="showShare"-->
              <!--                  title=""-->
              <!--                  :options="options"-->
              <!--                  @select="onSelect"-->
              <!--                />-->
              <!--              </van-col>-->
            </van-row>


            <van-row class=" mt5" v-if="rentoutForm.complete==1">
              <van-col span="6" >
                <van-tag type="danger" size="large" plain>已成交</van-tag>
              </van-col>
              <van-col span="8" >
                <van-tag type="warning" size="large" plain>{{rentoutForm.industry}}</van-tag>
              </van-col>
              <van-col span="10" >
                <van-tag type="primary" size="large" plain>{{rentoutForm.industry1}}</van-tag>
              </van-col>
            </van-row>

            <van-row class="mt10 " v-if="rentoutForm.complete==1">
              <van-col style="font-family: 'Arial Black';" span="16" class="t-left ">
                <p >
                  <span > 成交于</span>
                  <span style="font-family: 'Arial Black';"> {{rentoutForm.updateTime}}</span>
                </p>
              </van-col>

              <van-col  span="8" style="font-family: 'Arial Black';" class="t-center cae">
                {{rentoutForm.viewNum+1}}人已浏览
              </van-col>
            </van-row>


            <van-row class="mt10 " v-if="rentoutForm.complete!=1">
              <van-col  span="16" class="t-left ">
                <p >
                  <span > 更新于</span>
                  <span style="font-family: 'Arial Black';"> {{refreshDate}}</span>
                </p>
              </van-col>
              <van-col span="8" style="font-family: 'Arial Black';" class="t-center cae">
                {{rentoutForm.viewNum+1}}人已浏览
              </van-col>
              <van-col style="font-family: 'Arial Black';" span="24" class="t-left ">
                <p class="fb"><span>  {{rentoutForm.contacts}} {{rentoutForm.mobile.substring(0, 3) + '****' + rentoutForm.mobile.substring(7, 11)}}</span></p>
              </van-col>
            </van-row>

            <van-divider/>

            <van-row>
              <van-col span="12">
                <p class="">
                  <span style="font-family: 'Arial Black'" class="f14 cred">{{rentoutForm.monthlyRentStart}}-{{rentoutForm.monthlyRentEnd}}元/月</span>
                </p>
                <p  class=" "> 承受租金</p>
              </van-col>

              <van-col span="12">
                <p> <span style="font-family: 'Arial Black';" class="f18 cred fb">{{rentoutForm.acreageStart}}-{{rentoutForm.acreageEnd}}㎡</span></p>
                <p><span class="f14">意向面积</span></p>
              </van-col>
            </van-row>
          </div>

          <div class="mt10 pb10 bgf fh container">
            <van-row class="d-box fh mt10">
              <van-col span="5"><label>行业</label></van-col>
              <van-col class="c13" span="19">{{rentoutForm.industry}}-{{rentoutForm.industry1}}</van-col>
            </van-row>

            <van-row class="d-box fh mt10">
              <van-col span="5"><label>区域</label></van-col>
              <van-col class="c13" span="19">{{rentoutForm.county}}-{{rentoutForm.street}}</van-col>
            </van-row>
          </div>

          <div class="mt10 pb10 bgf fh container " v-show="phonetags">
            <p class="lh26 c333  mt10 " style="text-indent: 2em;font-size: small">{{rentoutForm.about}}</p>
            <div class=" fh mt10" v-if="rentoutForm.complete!=1">
              <span ><van-icon name="phone" size="18"/>联系电话</span>
              <span class= " fb cred">{{rentoutForm.contacts}}</span>
              <span style="font-family: 'Arial Black';font-size: 14px" class="">{{rentoutForm.mobile.substring(0, 3) + '****' + rentoutForm.mobile.substring(7, 11)}}</span>
            </div>
          </div>

          <div class="mt10 pb10 bgf fh container">
            <div class="pt10 f18 fb cred">相似推荐</div>

            <div class="">


              <van-row class="">
                <van-col :span="24">
                  <div v-for="item in rDateList" :key="item.id" @click="pingUrl(item.id)" class="info-list pr">
                    <van-row>


                      <van-col span="9">
                        <lazy-component >
                          <van-image  src="../../../static/images/background.jpg" fit="cover" width="100%" height="120px" radius="10px"  lazy-load />
                        </lazy-component>
                      </van-col>
                      <van-col span="15">
                        <div class="ml10 " style="font-weight: bolder">
                          <div class="van-ellipsis fb c13 f18 mt5 ">{{item.title}}</div>

                          <van-row class="">
                            <van-col span="9" class="f14 c666" style="font-family: 'Arial Black'">意向面积</van-col>
                            <van-col  span="15" class="f14 t-right fb van-ellipsis" >
                              <span  style="font-family: 'Arial Black';">{{item.acreageStart}}-{{item.acreageEnd}}m²</span>
                            </van-col>
                          </van-row>

                          <van-row class="">
                            <van-col  span="9" class="f14 c666" style="line-height: 24px">承受租金</van-col>
                            <van-col style="font-family: 'Arial Black';" span="15" class="t-right van-ellipsis">{{item.monthlyRentStart}}-{{item.monthlyRentEnd}}元/月</van-col>
                          </van-row>
                          <van-row class="">
                            <van-col  span="9" class="f14 c666" style="line-height: 24px">经营业态</van-col>
                            <van-col  span="15" class="t-right ">
                              <van-tag type="warning" size="large" plain>{{item.industry}}</van-tag>
                            </van-col>
<!--                            <van-col  span="6" class="t-right van-ellipsis ">-->
<!--                              <van-tag type="warning" size="large" plain>{{item.industry1}}</van-tag>-->
<!--                            </van-col>-->
                          </van-row>
                          <van-row class="">
                            <van-col  span="9" class="f14 c666" style="line-height: 24px">意向区域</van-col>
                            <van-col style="font-family: 'Arial Black';" span="15" class="t-right van-ellipsis">{{item.county}}
                              <span  v-if="item.street!=''|| item.street!=null" class="van-ellipsis">-{{item.street}}</span>
                            </van-col>
                          </van-row>
                        </div>
                      </van-col>

                    </van-row>
                  </div>
                </van-col>
              </van-row>


            </div>
          </div>
        </div>

      </div>
    </transition>


  </div>
</template>


<script>
  import { getToken,removeStorage } from '@/utils/auth' // 在cookie中获取用户
  import Vue from 'vue'
  import {Image as VanImage, Tag, Divider, Toast, ShareSheet, Swipe, SwipeItem, NavBar, Lazyload} from 'vant';
  Vue.use(VanImage).use(Tag).use(Divider).use(Toast).use(ShareSheet).use(Swipe).use(SwipeItem).use(NavBar);
  Vue.use(Lazyload, {
    lazyComponent: true,
  });
  import { getWantedInfoById, getWantedListPage, saveViewNum } from '@/api/rentout'
  export default {
    name: 'transferInfo',
    data() {
      return {
        phonetags:true,
        showShare: false,
        options: [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
        ],
        show:false,
        transitionName:'',
        current: 0,
        imgTotal:0,
        rDateList1: [],
        rDateList2: [],
        mating:[],
        rDateList: [],
        rentoutForm: {},
        rentoutId: '',
        input: '',
        refreshDate:'',
        src:'/static/images/np.png',
        imgList:[],
        opacity:0
      }
    },
    created() {
      window.scroll(0,0)
      this.rentoutId = this.$route.query.id
      this.getWantedInfoById()
      this.getWantedListPage();
      this.saveViewNum()
    },
    computed: {

    },
    watch:{

    },
    methods: {
      share() {
        this.showShare = true;
      },
      onSelect(option) {
        Toast(option.name);
        this.showShare = false;
      },
      pingUrl(id) {
        this.rentoutId=id
        this.rentoutForm = []
        this.getWantedInfoById()
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      onChange(index) {
        this.current = index;
      },
      saveViewNum() {
        saveViewNum({ businessId: this.rentoutId, type: 3 }).then(response => {
          console.log(response.data)
        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },
      into(id) {
        window.scroll(0,0)
        this.rentoutId=id
        this.getWantedInfoById()
      },
      getWantedListPage() {
        var data2 = localStorage.getItem('city');//从本地存储取出
        getWantedListPage({ current: 1, size: 8,city:data2
        }).then(response => {
          this.rDateList = response.data.records
        }).catch(function(reason) {
          console.log('catch:', reason)
        })

      },
      getWantedInfoById() {
        var _this = this
        getWantedInfoById({ wantedId: this.rentoutId }).then(response => {
          _this.rentoutForm = response.data
          if( _this.rentoutForm.complete===1){
            _this.phonetags=false
          }

        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },
      cimg:function(e){
        this.src = e.target.dataset.src;
      },

      handleScroll: function () {

        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let a = scrollTop/500;
        if(a>1){a=1}
        this.opacity=a;
      },
      back(){
        this.$router.go(-1);//返回上一层
      },
    },
    destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
    },
    mounted() {
      this.show=true
      this.transitionName =getToken("transitionName")
      window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month<10?("0"+month):month
      var strDate = date.getDate();
      strDate = strDate<10?("0"+strDate):strDate
      this.refreshDate = year+'-'+month+'-'+strDate
    }
  }
</script>

<style lang="scss">
  body{
    background: #f5f5f5;
  }
  #transferInfo{
    .custom-indicator{position: absolute;bottom: 10px;right: 10px;padding: 3px 8px;border-radius: 14px;background: rgba(0,0,0,0.3);z-index: 999;color:#fff}
    .d-box label{font-weight: normal;color:#858585;font-size: 14px;width: 63px;display: block;float: left;}
    .d-box span{padding-left: 20px;color:#333;font-size: 14px;width: calc(100% - 86px);display: block;float: left;}
    .masonry {
      -moz-column-count:2; /* Firefox */
      -webkit-column-count:2; /* Safari 和 Chrome */
      column-count:2;
      -moz-column-gap: 0;
      -webkit-column-gap:0;
      column-gap: 0;
      width: 100%;
      margin:0 auto;
    }
    .item {
      padding: 7px;
      margin:  0;
      -moz-page-break-inside: avoid;
      -webkit-column-break-inside: avoid;
      break-inside: avoid;

    }
    .van-nav-bar .van-icon{color:#fff;}
    .van-nav-bar{ background: linear-gradient(left, #d9d030 20%, #b5f50d 100%);}
    .van-nav-bar__title{color:#fff}
    .info-list {
      display: block;
      overflow: hidden;
      padding: 7px;
      margin-top: 20px;
    }
    .info-time {
      font-size: 12px;
      color: #888;
      position: absolute;
      top: 2px;
      right: 20px;
    }
  }
</style>
