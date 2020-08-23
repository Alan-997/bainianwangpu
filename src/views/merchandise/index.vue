<template>
  <div id="">
    <transition :name="transitionName">
      <div class="fh" v-if="show" style="width: 100%;">
        <div style="background: #f2f2f2">
          <div  style="position: fixed;z-index: 99;top:0;left: 0;width: 100%">
            <button type="primary" class="goBack" @click="back">
              <van-icon name="arrow-left" color="white" size='1.8rem'/>
            </button>
            <van-row >
              <van-col span="24" >
                <div style="position: relative;">
                  <div style="height: 200px;width: 100%" v-for="(item,index) in rentoutForm.videosList" :key="index" v-if="rentoutForm.videosList.length > 0 && showData == 1" >
                    <video :src="item.url" width="100%" height="100%" autoplay="autoplay" controls="controls"/>
                  </div>
                  <van-swipe :autoplay="3000">
                    <div style="height: 200px;width: 100%" v-for="(item,index) in rentoutForm.imgList" :key="index" v-if="rentoutForm.imgList.length > 0 && showData == 2">
                      <van-swipe-item @click="picBanner(index)">
                        <van-image :src="item.url" width="100%" height="100%"></van-image>
                      </van-swipe-item>
                    </div>
                  </van-swipe>
                  <div style="position: absolute;bottom: 30px;left: 90px;z-index: 99;"  v-if="rentoutForm.videosList.length > 0 && rentoutForm.imgList.length > 0">
                    <span style="color: white;text-align: center;display: inline-block;background-color: rgba(85,170,255,0.5);width: 80px;height: 30px;line-height: 30px;border-radius: 50px;" @click="shopShow(1)">
                      视频
                    </span>
                    <span style="color: white;text-align: center;display: inline-block;background-color: rgba(85,170,255,0.5);width: 80px;height: 30px;line-height: 30px;border-radius: 50px;margin-left: 10px;" @click="shopShow(2)">
                      图片
                    </span>
                  </div>
                </div>
              </van-col>
            </van-row>
          </div>


          <div style="margin-top: 200px;padding: 10px 15px;" class="bgf fh container ">
            <van-row >
              <van-col span="24" >
                <span class="fb f18">{{rentoutForm.title}}</span>
              </van-col>

              <van-col class="mt5" span="12">
                  <span class="c666 business-icon" >
                   <img src="../../../static/images/business.png" alt="">
                  </span>
                  <span class="c666 " >{{rentoutForm.openStartTime.substring(0, 5)}}</span>
                  <span class="c666 " >-{{rentoutForm.openEndTime.substring(0, 5)}}</span>
                
                
              </van-col>
              <van-col class="mt5" >
                <span class="c666 " >
                  <van-icon name="fire" color="red" />
                  {{rentoutForm.videonum}}
                </span>
              </van-col>
            </van-row>
          </div>

          <div class="mt5 pb5 bgf container" style="padding: 10px 15px;">
            <van-row class="location-bar">
                <van-col span="24" >
                  <div style="padding: 3px 0;">
                    <span class="ml5 f14 cblue mr20" @click="gotoMap(rentoutForm.longitude,rentoutForm.latitude)" > 
                      <van-icon name="location" />
                      {{rentoutForm.area}}{{rentoutForm.addr}}
                    </span>

                    <span class="f18 car-icon" @click="gotoMap(rentoutForm.longitude,rentoutForm.latitude)">
                      <img src="../../../static/images/car.png" alt=""> |
                    </span>

                    <span class=" f18 cblue phone-icon"  @click="clickContact">
                      <van-icon name="phone"  @click="callTel = true"/>
                    </span>
                 </div>
                </van-col>
            </van-row>
          </div>

        <div class="mt5 pb5 bgf container" style="padding: 5px 15px;">
          <van-row class="location-bar">
            <van-col span="4" class="mt10">
              <div style="padding: 3px 0;">
                <span class="">
                  <el-tag size="small">
                    <!-- <i size="20px" class="el-icon-collection-tag" /> -->
                    公告栏：
                  </el-tag> 
                </span>
              </div>
              </van-col>
              <van-col span="20" class="mt10">
                <div style="padding: 3px 0;">
                <span class="c666 f10 " v-html="rentoutForm.notice"></span>
                </div>
              </van-col>
          </van-row>
        </div>

          <div class="bgf">
            <div class="mt5  bgf container" v-show="isdetail">
              <label class="fb f16 cred">推荐</label>
              <van-swipe :autoplay="3000" class="pr mt10" >
                <van-swipe-item v-for="(item,index) in rentoutForm.adDetailList" :key="index">
                  <div v-if="item.imageUrl!='' ">
                    <van-image  :src="item.imageUrl" fill="fill" width="100%"  height="140px"  radius="10px"  lazy-load />
                  </div>
                  <div v-else >
                    <van-image  src="../../../static/images/6.jpg" fill="fill" width="100%" height="140px"  radius="10px"  lazy-load />
                  </div>
                  <p class="f20 t-center  fb van-ellipsis" style="color:black;">{{item.name}}</p>
                </van-swipe-item>
              </van-swipe>
            </div>

            <van-divider/>
            <div style="height: 75px;"></div>
            <div class="bgf" style="position: fixed;z-index: 99;bottom: 0px;width: 100%;padding: 10px 0;">
              <van-row >
                <van-col class="t-center" span="8">
                  <div @click="collect(rentoutForm.id)" v-show="iscollect">
                    <van-icon size="30" name="star-o" />
                    <div>收藏</div>
                  </div>
                  <div @click="collect(rentoutForm.id)" v-show="!iscollect">
                    <van-icon size="30" name="star" />
                    <div>取消收藏</div>
                  </div>
                </van-col>
                <van-col span="8" class="t-center">
                  <div title="" @click="share" >
                    <van-icon size="30" name="share" />
                    <div>转发</div>
                  </div>
                  <van-share-sheet
                    v-model="showShare"
                    title=""
                    :options="options"
                    @select="onSelect"
                  />
                </van-col>
                <van-col class="t-center" span="8">
                  <div @click="dianzan(rentoutForm.id)">
                    <div v-show="dianz">
                      <van-icon size="30"  name="good-job" />
                      <div>取消点赞 {{rentoutForm.viewnum}}</div>
                     </div>
                     <div v-show="!dianz">
                      <van-icon size="30"  name="good-job-o" />
                      <div>点赞 {{rentoutForm.viewnum}}</div>
                     </div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
        <!-- 联系页面 -->
        <contact v-show="isShowContact"></contact>
      </div>
    </transition>
  </div>
</template>


<script>
  import Contact from '../../components/contact/Contact'

  import PhotoSphereViewer from 'photo-sphere-viewer'
  import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
  import { getToken,removeStorage } from '@/utils/auth' // 在cookie中获取用户
  import Vue from 'vue'
  import {Image as VanImage, Divider,Lazyload, Toast,ShareSheet,Swipe, SwipeItem, NavBar, ImagePreview , Cell,SwipeCell,Icon } from 'vant';
  Vue.use(VanImage).use(Divider).use(Lazyload).use(ImagePreview).use(Toast).use(ShareSheet).use(Swipe).use(SwipeItem).use(NavBar).use(Cell).use(SwipeCell).use(Icon);
  import { getBsInfoById  ,dianzanAd ,usercollect ,getAd} from '@/api/businessCircle'
  export default {
    name: 'transferInfo',
    data() {
      return {
        iscollect:true,
        isdetail:true,
        dianz: false,
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
        showData:2,
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
        callTel: false,
        input: '',
        refreshDate:'',
        src:'../../../static/images/timg.jpg',
        imgList:[],
        map:'',//地图
        mPoint:'',//坐标
        key1:["餐饮美食","休闲娱乐","大型超市","生活服务","酒店宾馆","美容美体","医院","教育培训"],
        key2:["小区","写字楼","学校","公交站","商场","地铁站"],
        opacity:0,
        videosList: [],
        panoramicImage:{},
        config: {
          url:{
            left: '../../../static/images/left.jpg',
            front: '../../../static/images/front.jpg',
            right: '../../../static/images/right.jpg',
            back: '../../../static/images/back.jpg',
            top: '../../../static/images/info.jpg',
            bottom: '../../../static/images/bottom.jpg',
          },
          desc:'店铺全景'
        },
        flag: false,
        startX: 0,
        endX: 0,
        slideStyle: {
            left: 0,
            transition: 'none'
        },
        isShowContact:false
      }
    },
    components: {
      Contact
    },
    created() {
      window.scroll(0,0)
      this.rentoutId = this.$route.query.id
      this.getrentoutInfo()
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
        getBsInfoById({ adId: this.rentoutId }).then(response => {
          console.log(response);
          _this.imgList = response.data.imgList
          _this.rentoutForm = response.data
          _this.imgTotal = _this.imgList.length
          this.bannerlength = _this.imgList.length
          if(this.imgTotal<1){
            _this.imgList.push({url:'/../../static/images/logo.png'})
            this.bannerlength=1
          }
          if(_this.rentoutForm.adDetailList===null){
            _this.isdetail=false
          }
          // console.log(response);
          _this.startMap(response.data.addr)


        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },
      collect(id){
        var token= localStorage.getItem('token')
        if(token!=null){
          usercollect({adId: id ,token: token}).then(response => {
            if(response.code===0){
              if(response.data==='取消收藏'){
                this.iscollect=true
              }else if(response.data==='收藏成功'){
                this.iscollect=false
              }
              Toast.success(response.data)
            }
          }).catch(function (reason) {
            console.log('catch:', reason)
          })
        }
      },
      getAd(){
        var _this = this
        //rentoutId: this.rentoutId
        getAd({ adId: this.rentoutId }).then(response => {
          _this.rentoutForm.viewnum = response.data.viewnum

        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },
      dianzan(id){
        var token= localStorage.getItem('token')
        if(token!=null){
          dianzanAd({adId: id,token: token}).then(response => {
            if(response.code===0){
              // this.getrentoutInfo()
              this.getAd()
              if(response.data==='取消点赞'){
                this.dianz=false
              }else if(response.data==='点赞成功'){
                this.dianz=true
              }
              Toast.success(response.data)
            }
          }).catch(function (reason) {
            console.log('catch:', reason)
          })
        }else{
          Toast('请先登录！')
        }
      },
      handleScroll: function () {

        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let a = scrollTop/500;
        if(a>1){a=1}
        this.opacity=a;
      },
      back(){ 
        // this.$router.push('/');//返回上一层
        this.$router.back()
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
      //去导航
      gotoMap(jd,wd){
        /*定位当前经纬度 start*/
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            location.href="http://api.map.baidu.com/direction?origin=latlng:"+r.point.lat+","+r.point.lng+"|name:我的位置&destination="+wd+","+jd+"&mode=driving&region=中国&output=html&src=webapp.demo.location";
          }else {
            Toast.fail('定位失败');
          }
        });
      },
      //图片与视频的切换显示
      shopShow(type){
        this.showData = type
      },
      // 点击显示呼叫页面
      clickContact () {
        this.isShowContact = true
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
      // var _this = this;
      // // 使用js的现代事件监听transition过渡结束
      // this.$refs.slide.addEventListener('transitionend',function(){
      //     _this.endX = this.offsetLeft;
      // })
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
    .van-nav-bar {
      position: absolute;
    }
    .van-nav-bar .van-icon{color:#000;}
    .van-nav-bar__arrow {
      font-size: 26px;
    }
    /*.van-nav-bar{ background: linear-gradient(left,  #BBBB00 20%, #FFBB00 100%);}*/
    .van-nav-bar__title{color:#fff}
    // .my-swipe .van-swipe-item {
    //     color: #fff;
    //     font-size: 20px;
    //     line-height: 150px;
    //     text-align: center;
    //     background-color: #39a9ed;
    //   }
  }

  //
  // back按钮
  .goBack {
    border: none;
    height: 0;
    position: absolute;
    top: 16px;
    left: 12px;
    z-index: 99;
  }

  .goBack img {
    width: 16px;
  }

  .adDetailList {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 5px;
    text-align: center;
  }

  .adDetailList-item {
    margin-right: 5px;
    flex: 1;
  }

  .item-image {
    border-radius: 1rem;
  }

  .item-image img {
    width: 10rem;
    border-radius: 1rem;
  }

  .swipe-bgc {
    background-color: #fff;
  }

  // 营业时间
  .business-icon img {
    width: 14px;
    height: 14px;
  }

   // 定位栏
  .location-bar {
    position: relative;
    width: 100%;
    display: block;
  }

  .car-icon {
    position: absolute;
    top: 0;
    right: 20px;
    line-height: 20px;
  }
  .car-icon img {
    width: 18px;
    height: 18px;
  }

  .phone-icon {
    position: absolute;
    top: 0;right: 0;
  }

</style>
