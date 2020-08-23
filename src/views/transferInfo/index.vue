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
              :style="{opacity:opacity}"
            />
          </div>

          <van-swipe :autoplay="3000" @change="onChange" class="pr" style="height: 200px">
            <van-swipe-item v-for="(item,index) in imgList" :key="index" @click="picBanner(index)">
              <div v-if="item.url!=null">
                <van-image  :src="item.url" fit="cover" width="100%"   lazy-load />
              </div>
              <div v-else>
                <van-image fit="cover"  src="../../../static/images/logo.png" width="100%" radius="8px"   lazy-load />
              </div>
            </van-swipe-item>

            <div class="custom-indicator" slot="indicator">
              {{ current + 1 }}/{{imgTotal}}
            </div>
          </van-swipe>

          <div class="pt20 pb15 bgf fh container">
            <van-row class="cr c000  fb ">
              <van-col span="24" >
                <span class="f18"> {{rentoutForm.title}}</span>
              </van-col>
            </van-row>

            <van-row class="cr c000   mt5">
              <van-col span="20" >
                <span  class=" f14">{{rentoutForm.county}}-{{rentoutForm.addr}}</span>
              </van-col>
              <van-col span="4" >
                <span class="cblue t-left f14" @click="gotoMap(rentoutForm.longitude,rentoutForm.latitude)" >
                  <van-icon class="el-icon-s-promotion"/>  导航
                </span>
              </van-col>
            </van-row>

            <van-row class=" mt5">
              <van-col span="6" v-if="rentoutForm.complete==1">
                <van-tag type="danger" size="large" plain>已成交</van-tag>
              </van-col>
              <van-col span="8" >
                <van-tag type="warning" size="large" plain>{{rentoutForm.industry}}</van-tag>
              </van-col>
              <van-col span="10" >
                <van-tag type="primary" size="large" plain>{{rentoutForm.shopType}}</van-tag>
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
                <p class="fb"><span>  {{rentoutForm.contacts}} {{rentoutForm.mobile}}</span></p>
              </van-col>
            </van-row>
            <van-divider/>

            <van-row>
              <van-col span="8">
                <p style="font-family: 'Arial Black'" class=" cred  ">{{rentoutForm.monthlyRent}}元/月</p>
                <p class="">
                  <span  class="f14">押{{rentoutForm.payWayy}}付{{rentoutForm.payWayf}}</span>
                  <span ><van-icon name="gold-coin-o" size="16"/></span>
                </p>
              </van-col>
              <van-col span="8">
                <p>
                  <span v-if="rentoutForm.transferFee<1" style="font-family: 'Arial Black'" class="f18 cred fb">0万</span>
                  <span v-else-if="rentoutForm.transferFee<10000" style="font-family: 'Arial Black'" class="f18 cred fb">{{rentoutForm.transferFee}}万</span>
                  <span v-else style="font-family: 'Arial Black'" class="f18 cred fb">{{rentoutForm.transferFee/10000}}万</span>
                </p>
                <p><span  class="f14 ">转让费 </span></p>
              </van-col>
              <van-col span="8">
                <p> <span style="font-family: 'Arial Black';" class="f18 cred fb">{{rentoutForm.acreage}}㎡</span></p>
                <p><span class="f14">面积</span></p>
              </van-col>
            </van-row>
          </div>

          <div class="mt10 pb10 bgf fh container">
            <van-row class="d-box  mt10">
              <van-col span="5"><label>类型</label></van-col>
              <van-col class="c13" span="10">{{rentoutForm.shopType}}</van-col>
              <van-col class="c13" span="9">({{rentoutForm.shopStatus}})</van-col>
            </van-row>

            <van-row class="d-box fh mt10">
              <van-col span="5"><label>楼层</label></van-col>
              <van-col class="c13" span="19">第{{rentoutForm.floor}}层/共{{rentoutForm.allFloor}}层</van-col>
            </van-row>

            <van-row class="d-box fh mt10">
              <van-col span="5"><label>行业</label></van-col>
              <van-col class="c13" span="19">{{rentoutForm.industry}}</van-col>
            </van-row>

            <van-row class="d-box fh mt10">
              <van-col span="5"><label>租期</label></van-col>
              <van-col class="c13" span="19">{{rentoutForm.tenancy}}个月</van-col>
            </van-row>

            <van-row class="d-box fh mt10">
              <van-col span="5"><label>公交</label></van-col>
              <van-col class="c13" span="19">{{rentoutForm.busRoute}}</van-col>
            </van-row>

            <van-row class="c666  mt10">
              <van-col  span="5" >
                <label>客流</label>
              </van-col>
              <van-col  span="19" >
                  <span  v-for="(item,index) in rentoutForm.passengerFlowList" :key="index">
                    <van-tag v-if="item!=''" class="ml5" type="primary" >{{item}}</van-tag>
                  </span>
              </van-col>
            </van-row>

            <van-row class="c666 mt10">
              <van-col  span="5" >
                <label>配套</label>
              </van-col>
              <van-col  span="19" >
                  <span  v-for="(item,index) in mating" v-if="item" :key="index">
                    <van-tag v-if="item!=''" class="ml5" type="primary" >{{item}}</van-tag>
                  </span>
              </van-col>
            </van-row>
          </div>

          <div class="mt10 pb10 bgf fh container">
            <p class="lh26 c333 f15 mt10" style="text-indent: 2em;font-size: small">{{rentoutForm.about}}</p>
            <div class=" fh mt10" v-if="rentoutForm.complete!=1">
              <span ><van-icon name="phone" size="18"/>联系电话</span>
              <span class= " fb cred">{{rentoutForm.contacts}}</span>
              <span style="font-family: 'Arial Black';font-size: 14px" class="">{{rentoutForm.mobile}}</span>
            </div>
          </div>
          <img v-if="btnFlag" class="totop" src="static/images/info.jpg" @click="backTop">
          <div class="mt10 pb10 " id="viewer" ></div>

          <!-- 地图 -->
          <div class=" bgf fh van-hairline--bottom">
            <div class="pt10 f18 pb10 fb cred">
              <ul>
                <li style="list-style-type: none;float: right;">
                  <span class="cblue pr20 mr20 " @click="gotoMap(rentoutForm.longitude,rentoutForm.latitude)" >
                    <van-icon class="el-icon-s-promotion"/>  导航
                   </span>
                </li>
                <li>
                  <span class="ml15 f22 " style="font-size: large;"> 位置及周边</span>
                </li>
              </ul>
            </div>
            <div id="allmap" style="height: 350px;margin-top: 10px"></div>
          </div>

          <div class="mt10 pb10 bgf fh container">
            <div class="pt10 f18 pb10 fb cred">相似推荐</div>
            <div class="">
              <van-row class="">
                <van-col :span="24">
                  <div v-if="rDateList.length > 0">
                    <div v-for="item in rDateList" :key="item.id" @click="into(item.id)" >
                      <van-row>
                        <van-col span="9">
                          <div v-if="item.url!=null">
                            <van-image  :src="item.url" fit="cover" width="100%" height="120px" radius="8px"  lazy-load />
                          </div>
                        </van-col>
                        <van-col span="15">
                          <div class="ml10 " style="font-weight: bolder">
                            <div class="van-ellipsis fb c13 f16 mt5 ">{{item.title}}</div>
                            <div class="van-ellipsis  c666 f14 mt5 ">{{item.addr}}</div>

                            <van-row class="">
                              <van-col class="van-ellipsis" span="24" >
                                <van-tag color="#f2826a" plain>{{item.industry}}</van-tag>
                                <van-tag color="#f2826a" plain>{{item.shopType}}</van-tag>
                                <span  class="" >
                               <van-tag v-if="item.matingList[0]!=null" class="ml5" color="#7232dd" plain>{{item.matingList[0]}}</van-tag>
                            </span>
                              </van-col>
                            </van-row>

                            <van-row class="">
                              <van-col span="8" class="f12 c666" style="font-family: 'Arial Black'">{{item.acreage}}m²</van-col>
                              <van-col  span="16" class="f14 t-right fb" style="color: #AB0015"><span  style="color: #AB0015;font-family: 'Arial Black';">{{item.monthlyRent}}元/月</span></van-col>
                            </van-row>
                            <van-row class="">
                              <van-col  span="8" class="f12 c666" style="line-height: 24px">转让费</van-col>
                              <span v-if="item.transferFee!='' && item.transferFee!=0.0 && item.transferFee!=unll">
                                <van-col style="font-family: 'Arial Black';" span="16" class="t-right cred">{{item.transferFee}} 万元</van-col>
                            </span>
                              <span v-else>
                                <van-col style="font-family: 'Arial Black';" span="16" class="t-right cred">0 万元</van-col>
                            </span>
                            </van-row>
                          </div>
                        </van-col>
                      </van-row>
                      <van-divider />
                    </div>
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
  import PhotoSphereViewer from 'photo-sphere-viewer'
  import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
  import { getToken,removeStorage } from '@/utils/auth' // 在cookie中获取用户
  import Vue from 'vue'
  import {Image as VanImage ,Tag,Divider,Lazyload, ShareSheet, Swipe, SwipeItem, NavBar, ImagePreview, Toast} from 'vant';
  Vue.use(VanImage).use(Tag).use(Divider).use(Lazyload).use(ImagePreview).use(Toast).use(ShareSheet).use(Swipe).use(SwipeItem).use(NavBar);
  Vue.use(Lazyload, {
    lazyComponent: true,
  });
  import { getRentoutInfoById, getRentoutListRPage,getRentoutListPage, saveViewNum } from '@/api/rentout'
  export default {
    name: 'transferInfo',
    data() {
      return {
        bannerlength:0,
        bannerlist:[],
        btnFlag:true,
        showShare: false,
        options: [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
        ],
        unll:null,
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
        map:'',//地图
        mPoint:'',//坐标
        key1:["餐饮美食","休闲娱乐","大型超市","生活服务","酒店宾馆","美容美体","医院","教育培训"],
        key2:["小区","写字楼","学校","公交站","商场","地铁站"],
        opacity:0,
        config: {
          url:{
            left: '../../../static/images/left.jpg',
            front: '../../../static/images/front.jpg',
            right: '../../../static/images/right.jpg',
            back: '../../../static/images/back.jpg',
            top: '../../../static/images/info.jpg',
            bottom: '../../../static/images/bottom.jpg',
          },
          fileName:'店铺全景'
        },
        point: null
      }
    },
    created() {
      window.scroll(0,0)
      this.rentoutId = this.$route.query.id
      this.getrentoutInfo()
      this.getRentoutListRPage();
      this.saveViewNum()
    },
    computed: {

    },
    watch:{

    },
    methods: {
      backTop() {
        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },
      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop() {
        const that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 60) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      },
      share() {
        this.showShare = true;
      },
      onSelect(option) {
        Toast(option.name);
        this.showShare = false;
      },
      onChange(index) {
        this.current = index;
      },
      saveViewNum() {
        saveViewNum({ businessId: this.rentoutId, type: 1 }).then(response => {
          console.log(response.data)
        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },
      into(id) {
        this.config={}
        window.scroll(0,0)
        this.rentoutId=id
        this.getrentoutInfo()
      },
      getRentoutListRPage() {
        var data= localStorage.getItem('city');
        getRentoutListPage({ current: 1, size: 8, type:3,city:data}).then(response => {
          this.rDateList = response.data.records
        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },

      getrentoutInfo() {
        var _this = this
        getRentoutInfoById({ rentoutId: this.rentoutId }).then(response => {
          _this.imgList = response.data.imgList
          _this.rentoutForm = response.data
          this.imgTotal = _this.imgList.length
          _this.startMap(response.data.addr)
          this.bannerlength = _this.imgList.length
          if(this.imgTotal<1){
            _this.imgList.push({url:'/../../static/images/logo.png'})
            this.bannerlength=1
          }
          if(_this.imgList.length>5){
            this.config.url.left = _this.imgList[0].url
            this.config.url.front = _this.imgList[1].url
            this.config.url.right = _this.imgList[2].url
            this.config.url.back = _this.imgList[3].url
            this.config.url.top = _this.imgList[4].url
            this.config.url.bottom = _this.imgList[5].url
            // alert( this.config.url.bottom)
            this.initPhotoSphere()
          }
          this.mating =  _this.rentoutForm.mating.split(",")

          if( _this.rentoutForm.passengerFlow){
            _this.rentoutForm.passengerFlow=_this.rentoutForm.passengerFlow.replace(/,,/, '')
            _this.rentoutForm.passengerFlowList = _this.rentoutForm.passengerFlow.split(",")
          }

        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },
      picBanner(index) {
        for (var i = 0; i < this.bannerlength; i++) {
          this.bannerlist[i] = this.imgList[i].url;
        }
        ImagePreview({
          images: this.bannerlist,
          startPosition: index
        })
      },
      initPhotoSphere() {
        this.PSV = PhotoSphereViewer({
          container: document.getElementById('viewer'),
          panorama:this.config.url,
          // panorama:this.src,
          size: {
            width: '100%',
            height: screen.availHeight/2
          },
          caption: '店铺全景图',
          time_anim: false,
          default_long: 1.4441088145446443,
          default_lat: 0.0800613513013615,
          sphere_correction: {pan: 30.01, tilt: 0, roll: 0},
          default_fov: 100,     // 默认缩放值，在1-179之间
          navbar: [
            'autorotate',
            'zoom',
            'markers',
            'caption',
            'fullscreen'
          ],
          theta_offset: 1000, // 旋转速度
        })
      },
      cimg:function(e){
        this.src = e.target.dataset.src;
      },
      //初始化地图
      mapInit(){
        var map =new BMap.Map("allmap");// 创建Map实例
        let that = this;
        map.centerAndZoom("贵州省", 15);

        // 添加带有定位的导航控件
        var navigationControl = new BMap.NavigationControl({
          // 靠左上角位置
          anchor: BMAP_ANCHOR_TOP_LEFT,
          // LARGE类型
          type: BMAP_NAVIGATION_CONTROL_LARGE,
          // 启用显示定位
          enableGeolocation: true
        });
        map.addControl(navigationControl);
        map.addControl(new BMap.MapTypeControl({//添加地图类型控件
          mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
          ]}));
        return map;
      },
      //本地索检地图数据
      searchData(keywards,onSearchComplete = function () {}){
        this.map.clearOverlays();
        this.map.addOverlay(new BMap.Marker(this.mPoint));
        var circle = new BMap.Circle(this.mPoint,400,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
        this.map.addOverlay(circle);
        var local =  new BMap.LocalSearch(this.map,
          {pageCapacity:1,renderOptions: {map: this.map, autoViewport: false},
            onSearchComplete:onSearchComplete});
        local.searchNearby(keywards,this.mPoint,400);
      },
      searchDataNo(keywards,onSearchComplete = function () {}){
        var local =  new BMap.LocalSearch(this.map,
          {pageCapacity:1,onSearchComplete:onSearchComplete});
        local.searchNearby(keywards,this.mPoint,400);
      },
      startMap(adr){
        console.log(adr)
        this.map = this.mapInit()
        let that = this;
        var localSearch = new BMap.LocalSearch(this.map);
        localSearch.setSearchCompleteCallback(function (searchResult) {
          var poi = searchResult.getPoi(0);
          that.mPoint =new BMap.Point(poi.point.lng,poi.point.lat);
          console.log(poi)
          that.map.centerAndZoom(that.mPoint, 15);
          that.searchData(that.key1,function (res) {

          })

        });
        localSearch.search(adr);
      },

      handleScroll: function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let a = scrollTop/500;
        if(a>1){a=1}
        this.opacity=a;
      },
      back(){
        this.$router.go(-1);//返回上一层
        // this.$router.back()
      },
      // 去导航
      gotoMap(jd,wd){
        /*定位当前经纬度 start*/
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          // alert(r.point.lat+'-'+r.point.lng)
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            location.href="http://api.map.baidu.com/direction?origin=latlng:"+r.point.lat+","+r.point.lng+"|name:我的位置&destination="+wd+","+jd+"&mode=driving&region=中国&output=html&src=webapp.demo.location";
          }else {
            Toast.fail('定位失败');
          }
        });
      }
    },
    destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
      window.removeEventListener('scroll', this.scrollToTop)
    },

    mounted() {
      window.addEventListener('scroll', this.scrollToTop)
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
    .d-box label{font-weight: normal;color: #858585;font-size: 14px;width: 63px;display: block;float: left;}
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
    .totop {
      position: fixed;
      width: 2.5rem; /* 40/16 */
      height: 2.5rem;
      border-radius: 1.25rem /* 20/16 */
    ;
      opacity: 0.8;
      background: rgba(255, 255, 255, .9);
      box-shadow: 0 1px 5px 0 #e0e0e0;
      right: 1.125rem; /* 18/16 */
      bottom: 6rem; /* 64/16 */
      z-index: 1100;
      -webkit-transition: opacity .5s;
      transition: opacity .5s;

      i {
        font-size: 1.5rem;
        color: #e2294c;
        margin: 0 0 0 0.5rem;
        position: relative;
        top: 0.5rem;
      }
    }
    .van-nav-bar .van-icon{color:#fff;}
    .van-nav-bar{ background: linear-gradient(left, #b8f312 20%, rgba(211, 222, 47, 0.8) 100%);}
    .van-nav-bar__title{color:#fff}
  }
</style>
