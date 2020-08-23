<template>
  <div id="" >
    <van-sticky :offset-top="0">
      <!-- 搜索框 -->
      <div class="">
      <!--餐饮美食-->
        <van-nav-bar
          title=""
          left-text=""
          left-arrow
          @click-left="back">
        </van-nav-bar>
      </div>
      <!-- tab栏 -->
      <van-tabs @click="onClick" class="ceiling-tab">
        <van-tab  v-for="(item,index) in listTabs" :title="item.name" :key="index"></van-tab>
      </van-tabs>
    </van-sticky>

    <div class="" style="background: white;" >
      <van-tabs class="tab-position">
        <van-tab  v-for="(item,index) in listTabs" :title="item.name" :key="index">
          <!--商圈数据列表-->
          <div class="" style="float: none" >
            <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
              <van-list
                v-model="isUpLoading"
                :finished="upFinished"
                :immediate-check="false"
                :offset="10"
                finished-text="我是有底线的"
                @load="onLoadList">
                <van-row class="">
                  <van-col :span="24">
                    <div v-if="businessList.length > 0" v-for="item in businessList" :key="item.id" >
                      <van-row>
                        <router-link  :to="pingVideoUrl(item.id)" class="">
                          <van-col span="24">
                            <van-swipe style="height: 200px" >
                              <van-swipe-item  v-for="items in item.videosList" :key="items.id">
                                <div v-if="items.imgurl!=null">
                                  <van-image  :src="items.imgurl" fit="cover" width="100%"   lazy-load />
                                </div>
                                <div v-else>
                                  <van-image fit="cover"  src="../../../static/images/logo.png" width="100%"   lazy-load />
                                </div>
                              </van-swipe-item>
                              <template #indicator>
                                <div class="custom-indicator cfff ">
                                  <van-icon size="16" name="play-circle-o" />
                                  <span class="f16">{{item.videosList[0].longtime}}</span>
                                </div>
                              </template>
                            </van-swipe>
                          </van-col>
                        </router-link>
                        <van-col span="24"  class="mb10 mt5">
                          <div class="ml10">
                            <div class="">
                              <router-link  :to="pingUrl(item.id)" class="">
                                <van-row>
                                  <van-col span="18">
                                    <p  class="c000 f18 van-ellipsis fb" style="font-family: 新宋体">{{item.title}}</p>
                                  </van-col>
                                  <van-col span="6"> <p  class="van-ellipsis fb t-center cred">{{item.categoryName}}</p></van-col>
                                </van-row>
                              </router-link>
                              <van-row class="mt5">
                                <router-link  :to="pingUrl(item.id)" class="">
                                  <van-col span="8" class="f14 cblue t-left van-ellipsis" >{{item.area}}{{item.addr}}</van-col>
                                  <van-col v-if="item.distance<1" span="8" class="f10 c666 " >距我步行{{item.distance*1000}}m</van-col>
                                  <van-col v-if="item.distance>=1" span="8" class="f10 c666" >距我直线{{item.distance}}km</van-col>
                                </router-link>
                                <van-col  span="4" class="f14 t-right c666">
                                  <div @click="dianzan(item.id)" >
                                    <van-icon  name="good-job-o" />{{item.viewnum}}
                                  </div>
                                </van-col>
                                <van-col  span="4" class="t-center c666">
                                  <van-icon  name="share" @click="share"/>
                                  <van-share-sheet
                                    v-model="showShare"
                                    title=""
                                    :options="options"
                                    @select="onSelect"
                                  />
                                </van-col>
                              </van-row>
                            </div>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                  </van-col>
                </van-row>
              </van-list>
            </van-pull-refresh>
          </div>
          <!--商圈数据列表end-->
        </van-tab>
      </van-tabs>
    </div>
  </div>

</template>
<script>
  import { setToken , getToken } from '@/utils/auth' // 在cookie中获取用户
  import Vue from 'vue'
  import {ShareSheet, Image as VanImage,Divider, Tag,Toast, Tab, Tabs  ,Lazyload, PullRefresh, Tabbar, list,TabbarItem,Search,DropdownMenu, DropdownItem,Swipe, SwipeItem,Popup,Checkbox, CheckboxGroup ,Cell,Sticky} from 'vant';
  Vue.use(ShareSheet).use(VanImage).use(Divider).use(Tag).use(Toast).use(Tab).use(Tabs).use(PullRefresh).use(Tabbar).use(TabbarItem).use(list).use(Search).use(DropdownMenu).use(DropdownItem).use(Swipe).use(SwipeItem).use(Popup).use(Checkbox).use(CheckboxGroup).use(Cell);
  Vue.use(Lazyload, {
    lazyComponent: true,
  }).use(Sticky);
  // import {  } from '@/api/rentout'
  import { getBusiness ,dianzanAd ,getBsInfoById ,getAd ,getCategory} from '@/api/businessCircle'
  export default {
    name: 'businessCircle',
    data() {
      return {
        dianz: true,
        showShare: false,
        options: [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
        ],
        show:false,
        active:2,
        pageSize: 5, // 每页条数
        pageIndex: 1, // 页码
        businessList:[], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100, // 滚动条与底部距离小于 offset 时触发load事件


        rentoutForm: {},
        jd: '',//经度
        wd: '',//纬度
        search:'',
        locationCity:'',
        area:'',
        classificationId:null,
        classificationName:'餐饮',
        categoryName:'',
        listTabs:[ {name:'推荐'}],
      }
    },

    activated() {
      this.locationCity = localStorage.getItem('city');//从本地存储取出
      this.area = localStorage.getItem('area');//从本地存储取出
      // this.getAlListPage()
      if(this.area!=this.locationCity){
        this.pageIndex= 1  // 页码
        this.businessList=[]  // 请求数据
        this.getAlListPage()
      }
    },
    created() {
      this.classificationId=this.$route.query.typeId
      // this.area = localStorage.getItem('area');//从本地存储取出
      // this.locationCity = localStorage.getItem('city');//从本地存储取出
      if(this.classificationId!=null){
        this.getCategory()
        this.getAlListPage()
      }else{
        this.pageIndex= 1  // 页码
        this.businessList = []
        this.getAlListPage()
      }
      // this.getCategory()
      // this.getAlListPage()

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

      onClick(name, title) {
        // Toast(title)
        if(title==='推荐'){
          this.categoryName=''
        }else {
          this.categoryName=title
        }
        this.pageIndex= 1  // 页码
        this.businessList = []
        this.getAlListPage()

      },
      suponSearch() {
        this.businessList = []
        this.getAlListPage()

      },

      getCategory(){
        getCategory({classificationId: this.classificationId,
          classificationName: this.classificationName}).then(response => {
          this.listTabs = this.listTabs.concat(response.data)
          // localStorage.removeItem('restaurantFood')
        }).catch(function (reason) {

        })
      },
      getrentoutInfo(id) {
        var _this = this
        //rentoutId: this.rentoutId
        getAd({adId: id}).then(response => {
          _this.rentoutForm = response.data

        }).catch(function (reason) {
          console.log('catch:', reason)
        })
      },
      dianzan(id){
        var token= localStorage.getItem('token')
        if(token===null){
          Toast.success('请登录')
          return false
        }
        if(token!=null){
          dianzanAd({adId: id,token: token}).then(response => {
            if(response.code===0){
              this.getrentoutInfo(id)
              for (var i = 0; i <  this.businessList.length; i++) {
                if( this.businessList[i].id===id){
                  var viewnum= this.businessList[i].viewnum
                  this.businessList[i].viewnum=this.rentoutForm.viewnum
                  if(viewnum<this.rentoutForm.viewnum){
                    Toast.success('点赞成功')
                  }else if(viewnum>this.rentoutForm.viewnum){
                    Toast.success('取消点赞')
                  }
                  break
                }
              }

            }
          }).catch(function (reason) {
            console.log('catch:', reason)
          })
        }
      },

      getAlListPage() {
        var city=localStorage.getItem('city');
        // localStorage.setItem('longitude', _this.creditLongitude)
        // localStorage.setItem('latitude', _this.creditLatitude)
        this.jd=localStorage.getItem('longitude');
        this.wd=localStorage.getItem('latitude');
        const _self = this
        getBusiness({ current: this.pageIndex, size: this.pageSize, search: this.search,
          classificationName:this.classificationName, categoryName: this.categoryName,
          cityCode: city, areaCode:this.areaCode, jd: this.jd, wd: this.wd,
        }).then(response => {

          this.businessList = this.businessList.concat(response.data.records)

          const rows = response.data.records
          if (rows == null || rows.length === 0) {
            // 加载结束
            _self.upFinished = true
            return
          }
          if (rows.length < this.pageSize) {
            // 最后一页不足10条的情况
            _self.upFinished = true
          }
          // 处理数据
          if (_self.pageIndex === 1) {
            _self.businessList = rows
          } else {
            _self.businessList = _self.businessList.concat(rows)
          }


        }).catch(function (reason) {

        }).finally(() => {
          _self.isDownLoading = false
          _self.isUpLoading = false
        })
      },

      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.getAlListPage() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.getAlListPage()
      },

      pingUrl(id) {
        return '/bsInfo?id=' + id
      },
      pingVideoUrl(id) {
        return '/adVideo?id=' + id
      },

      switchTo(path) {
        // console.log(this.$router)
        this.$router.replace(path)
      },
      back(){
        this.$router.go(-1);//返回上一层
      },
    },

    mounted() {

      let that = this;
      /*定位当前经纬度 start*/
      localStorage.removeItem('longitude');
      localStorage.removeItem('latitude');
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          that.jd = r.point.lng
          that.wd = r.point.lat
          // console.log(r)
          localStorage.setItem('longitude',  r.point.lng)
          localStorage.setItem('latitude', r.point.lat)
          // that.locationCity = r.address.city
          // Toast(that.jd+'===='+that.wd)
        }else {
          Toast.fail('定位失败');
        }
      });
      /*定位当前经纬度 end*/
    }

  }
</script>



<style lang="scss">
  body{
    background: #fff;
  }
  // tab栏的样式
  .tab-position {
    position: absolute;
    top: 3rem;
  }
  .ceiling-tab {
    position: relative;
    z-index: 9;
  }

  #businessCircle{
    padding-bottom: 50px;
    .exam-top{position: fixed;z-index: 999;top:0;left:0;width:100%;font-size: 18px;text-align: center;color:#fff;
      background: linear-gradient(left,  #ffffff 20%, #ffffff 100%);
    }
    .shop-box{overflow: hidden;display: block;transition: all 0.4s ease-in;}
    .shop-box img{display: block;width:100%;}
    .shop-box p{line-height: 20px}
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
    .br-desc{position: absolute;width: 100%;padding:10px;background: rgba(0,0,0,0.5);z-index: 2;bottom: 0;color: #fff;box-sizing: border-box}
    .br-desc *{color: #fff;}
    .br-img {
      width: 100%;
      margin-bottom: 20px;
    }
    .br-img img {
      height: 284px;
      width: 100%;
      display: block;
    }
    .c-bnt {
      display: inline-block;
      padding: 2px 5px;
      margin-right: 5px;
    }
    .cbnt-active {
      background-color: #2683EA !important;
      color: #fff !important;
    }
    .qy-active {
      color: #fff !important;
      border-radius: 14px;
      background: #C81415 !important;
    }
    .need .el-checkbox-group {
      display: inline-block;
    }
    .typeChioce {
      padding: 3px;
      background: #E6E6E6;
      overflow: hidden;
    }
    .typeChioce .el-input__inner {
      border-radius: 0;
      width: 153px;
      border: 0;
      height: 24px;
      line-height: 24px;
    }
    .typeChioce .el-input__icon {
      line-height: 24px
    }
    .text-sbnt {
      padding: 1px 5px;
      background: #DAEAFD;
      margin-right: 6px;
    }
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
    .br-img {
      width: 100%;
      margin-top: 20px;
    }
    .br-img img {
      height: 284px;
      width: 100%;
      display: block;
    }
    .time-exp {
      font-size: 12px;
      color: #2783EB;
      margin-bottom: 10px
    }
    .center-banner-list {
      width: 100%;
      height: 96px;
      display: block
    }
    .exp-text {
      width: 100%;
      text-align: center;
      color: #fff;
      font-size: 12px;
      background-color: #2683EB
    }
    .act-bnt>span{padding: 4px 12px;}
    .el-slider__button{border-color: #C81415;width: 10px;height: 10px;background-color: #C81415}
    .el-slider__bar{background-color:#C81415 }
    .el-checkbox__input.is-checked+.el-checkbox__label{color:#C81415}
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #C81415;
      border-color: #C81415;
    }
    .tag-list{width:100%;text-align:center;}
    .tag-list span{
      cursor: pointer;
      display: block;
      font-size: 15px;
      padding: 3px 0;
      width: 100%;
      color: #333;
      border-bottom: 2px solid transparent;
    }
    .tag-list span.tag-active{border-bottom:none;color: #C51D12;position: relative}
    .tag-list span.tag-active:after{
      content: '';
      display: block;
      width:0;
      height:0;
      border-right:10px solid transparent;
      border-left:10px solid transparent;
      border-top:12px solid #C51D12;
      position: absolute;
      bottom:-21px;
      left: 65px;
      z-index: 99;
    }
    .tag-list span.mj-active{border-bottom:none;color: #C51D12;position: relative}
    .tag-list span.mj-active:after{
      content: '';
      display: block;
      width:0;
      height:0;
      border-right:10px solid transparent;
      border-left:10px solid transparent;
      border-top:12px solid #C51D12;
      position: absolute;
      bottom:-21px;
      left: 47%;
      z-index: 99;
    }
    .me-info{
      padding-left: 30px;
      background-repeat: no-repeat;
      height: 30px;
    }
    .van-checkbox__icon--checked .van-icon{    background-color: #C81415;
      border-color: #C81415;}
    .kailong-up{
      width:60px;
      height:0;
      /*border-right:20px solid transparent;*/
      /*border-left:20px solid transparent;*/
      border-bottom:3px solid red;
    }
    .kuicon{display: inline-block;position: absolute;top: 21px;z-index: 22;}
    .businessCircle-top{
      width: 100%;
      padding-bottom: 10px;
      background: linear-gradient(left,  #fff 20%, #fff 100%);
    }
    .choice-list{width:100%;display: block;text-align: center;background: #eee;color: #333;padding:5px 0;border-radius: 4px;margin-top: 8px}
  }

</style>
