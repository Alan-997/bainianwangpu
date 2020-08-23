<template>
  <div id="home">
    <div class="home-top pt5 pb10">
      <van-row class="bxs pr15" >
        <van-col span="4" @click="toAddr">
          <p class="van-ellipsis mt5 city-position" style="color:#fff;font-size: 0.9rem;">{{locationCity}}
          <van-icon name="arrow-down" class="city-position-icon" />
          </p>
        </van-col>
        <div class="search-box">
          <van-search v-model="search"
                    @search="onSearch"
                    left-icon='搜索框'
                    autofocus
                    placeholder="类型/业态/区域"
                    background="#4fc08d"/>
          <van-icon class="search-icon" name="search" @click="onSearch"/>
        </div>
      </van-row>

      <van-row class="ml20 top-location mt10"  v-show="cityShow">
        <van-col  span="12" >
          <p  style="font-size: 12px"> <van-icon name="location-o"/>定位显示你在"{{area}}"</p>
        </van-col>
        <van-col  span="10" @click="tocity(area)">
          <p   style="font-size: 12px;text-decoration: underline;color: #d1dbe5" >切换到{{area}}</p>
        </van-col>
        <van-col  span="2" @click="hidePanel">
          <van-icon name="cross" />
        </van-col>
      </van-row>
    </div>
    <div class="top-tab-bg"></div>

    <div class="swipe-box" style="margin-top: 54px">
      <van-swipe :autoplay="3000" indicator-color="white"  >
        <div v-for="item in listAppBanner" :key="item.id">
          <van-swipe-item >
            <div class="pr fh" style="height: 100%" >
              <div class="banner-title">
                <p class="f14 t-center" style="color: #eee;margin-top: 20px">{{item.title}}</p>
                <p class="f14 t-center mt10" style="color: #eee;">{{item.description}}</p>
                <p v-if="item.remarks!=''" class="f14 t-center mt10" style="color: #eee;">{{item.remarks}}</p>
              </div>
              <div v-if="item.imageUrl!=null">
                <van-image class="swipe-img" :src="item.imageUrl" fit="fill"  width="100%" height="120" lazy-load />
              </div>
            </div>
          </van-swipe-item>
        </div>
      </van-swipe>
    </div>

    <div class="  fh container ">
      <div class="mt20 mb10">
        <ul  style="list-style: none;display: inline" v-for="item in firstList" :key="item.id">
          <li class="t-center " style="display: inline-block;width: 20%">
            <div @click="goto(item.id)" class="firstList-item-icon">
              <van-image   :src="item.icon" round fit="cover" width="50%" class="icon"/>
              <p class="mt5 item-name" style="color:black;font-weight: bolder">{{item.name}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="adv-swipe-bar">
      <van-notice-bar left-icon="volume-o" :scrollable="false" >
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <div  v-for="item in listNearComplete" :key="item.id">
            <van-swipe-item  style="font-weight: bolder;color: black;">
              <span class="f10" >{{item.addr}}</span>
              <span class="f10" v-if="item.shopName!=null">[{{item.shopName}}]</span>
              <span class="f10">于{{dateFormat(item.updateTime)}}成交</span>
            </van-swipe-item>
          </div>
        </van-swipe>
      </van-notice-bar>
    </div>

      <van-sticky :offset-top="60">
        <div class=" " style="background: white">
          <van-row>
            <van-col span="24">
              <van-tabs @click="onClick" style="font-weight :500">
                <van-tab title="商铺转让"></van-tab>
                <van-tab title="商铺出租"></van-tab>
                <van-tab title="商铺出售"></van-tab>
              </van-tabs>
            </van-col>
          </van-row>
        </div>
        <div class="bbe  fh" style="width: 100%">
          <van-dropdown-menu active-color="#ee0a24" v-show="tagShow" >
            <van-dropdown-item @change="araeChange" v-model="value2" :options="option2" />
            <van-dropdown-item @change="industryChange" v-model="value3" :options="option3" />
            <van-dropdown-item @change="mjChange" v-model="value1" :options="option1" />
            <van-dropdown-item @change="moneyChange" v-model="value4" :options="option4" />
          </van-dropdown-menu>
          <van-dropdown-menu active-color="#ee0a24" v-show="!tagShow" >
            <van-dropdown-item @change="sourceshopType" v-model="value5" :options="option5" />
            <van-dropdown-item @change="mjChange" v-model="value1" :options="option1" />
            <van-dropdown-item @change="moneyChanges" v-model="value6" :options="option6" />
          </van-dropdown-menu>
        </div>
      </van-sticky>
    <div class="shop-list" style="width: 100%">
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh" v-show="refreshShow">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="我是有底线的"
          @load="onLoadList">

          <div class="masonry" v-show="tagShow">
            <!--不是商圈时的数据列表-->
            <img v-if="btnFlag" class="totop" src="static/images/info.jpg" @click="backTop">
            <div v-if="rcDateList.length > 0">
              <div class="item" v-for="item in rcDateList" :key="item.id">
                <div class="">
                  <router-link :to="pingRentoutUrl(item.type, item.id)" class="bgf shop-box" >
                    <div v-if="item.url!=null">
                      <van-image  :src="item.url" fit="cover" width="100%" height="120" radius="8px" lazy-load />
                    </div>
                    <div v-else>
                      <van-image fit="cover"  src="../../../static/images/logo.png" width="100%" radius="8px" height="120"  lazy-load />
                    </div>
                    <div class="pt5 pb5 pl5 pr5">
                      <div class="van-ellipsis fb c13 f16 " style="width: 100%">{{item.title}}</div>
                      <div class="van-ellipsis  c13 f12 mt5 ">{{item.addr}}</div>
                      <div class="mt5">
                        <van-row class="">
                          <van-col class="van-ellipsis" span="24" >
                            <van-tag color="#f2826a" plain>{{item.shopType}}</van-tag>
                            <van-tag color="#f2826a" plain>{{item.industry}}</van-tag>
                            <span  class="" >
                                    <van-tag v-if="item.matingList[0]!=null" class="ml5" color="#7232dd" plain>{{item.matingList[0]}}</van-tag>
                                  </span>
                          </van-col>
                        </van-row>

                        <van-row class="mt5">
                          <van-col span="8" class="f14 c666" style="font-family: 'Arial Black'">{{item.acreage}}m²</van-col>
                          <van-col  span="16" class="f14 t-right fb" style="color: #AB0015"><span  style="color: #AB0015;font-family: 'Arial Black';">{{item.monthlyRent}}元/月</span></van-col>
                        </van-row>
                        <van-row class="" v-if="item.type===3">
                          <van-col  span="8" class="f12 c666" style="line-height: 24px">转让费</van-col>
                          <span v-if="item.transferFee!='' && item.transferFee!=0.0 && item.transferFee!='unll'">
                                  <van-col style="font-family: 'Arial Black';" span="16" class="t-right cred">{{item.transferFee}} 万元</van-col>
                                </span>
                          <span v-else>
                                  <van-col style="font-family: 'Arial Black';" span="16" class="t-right cred">0 万元</van-col>
                                 </span>
                        </van-row>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>

      <!--商圈数据列表-->
      <van-pull-refresh v-model="refreshing" @refresh="onDownRefreshs" v-show="!refreshShow">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          :offset="10"
          finished-text="我是有底线的"
          @load="onLoadLists">
          <div style="width: 100%;" v-show="!tagShow">
            <img v-if="btnFlag" class="totop" src="static/images/info.jpg" @click="backTop">
            <div class="masonry">
              <div v-if="rcDateList.length > 0">
                <div class="item" v-for="item in rcDateList" :key="item.id">
                  <div class="item_content">
                    <router-link :to="pingRentoutUrl(10, item.id)" class="bgf shop-box" style="border: 1px solid #DEDEDE;box-shadow: 1px 2px 8px #ddd;border-radius: 4px;overflow: hidden">
                      <div v-if="item.url!=null">
                        <van-image  :src="item.url" fit="cover" width="100%" height="120px" radius="8px"  lazy-load />
                      </div>
                      <div v-else>
                        <van-image fit="cover"  src="../../../static/images/background.jpg" radius="8px" width="100%" height="120px"  lazy-load />
                      </div>

                      <div class="pt5 pb5 pl5 pr5">
                        <div class="van-ellipsis fb c13 f16  ">{{item.title}}</div>
                        <div class="van-ellipsis   f12 mt5 ">{{item.addr}}</div>
                        <div class="">

                          <van-row class="">
                            <van-col class="van-ellipsis" span="24" >
                              <van-tag color="#f2826a" plain>{{item.shopType}}</van-tag>
                              <van-tag color="#f2826a" plain>{{item.industry}}</van-tag>
                              <span  class="" >
                                    <van-tag v-if="item.matingList[0]!=null" class="ml5" color="#7232dd" plain>{{item.matingList[0]}}</van-tag>
                                  </span>
                            </van-col>
                          </van-row>

                          <van-row class="">
                            <van-col span="8" class="f14 c666" style="font-family: 'Arial Black'">{{item.acreage}}m²</van-col>
                            <van-col  span="16" class="f14 t-center " >
                              <span v-if="item.totalPrice<10000" style="color: #AB0015;font-family: 'Arial Black';">{{item.totalPrice}} 万元</span>
                              <span v-else style="color: #AB0015;font-family: 'Arial Black';">{{item.totalPrice/10000}} 万元</span>
                            </van-col>
                          </van-row>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-tabbar route active-color="#07c160" inactive-color="#000">
      <van-tabbar-item replace to="/" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/findShop" icon="browsing-history-o">
        找商铺
      </van-tabbar-item>
      <van-tabbar-item replace to="/businessCircle" icon="fire-o">
        商圈
      </van-tabbar-item>
      <van-tabbar-item replace to="/exam" icon="bulb-o">
        成交案例
      </van-tabbar-item>
      <van-tabbar-item replace to="/personCenter" icon="user-circle-o">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
  import { setToken , getToken } from '@/utils/auth' // 在cookie中获取用户
  import Vue from 'vue'
  import BMap from 'BMap'
  import {
    Tag,
    Divider,
    Image as VanImage,
    Button,
    TreeSelect,
    NoticeBar,
    Tab,
    Tabs,
    Area,
    Lazyload,
    PullRefresh,
    Tabbar,
    list,
    TabbarItem,
    Search,
    DropdownMenu,
    DropdownItem,
    Swipe,
    SwipeItem,
    Popup,
    Checkbox,
    CheckboxGroup,
    Toast,
    Sticky
  } from 'vant';
  Vue.use(Tag).use(Divider).use(Toast).use(VanImage).use(Button).use(TreeSelect).use(NoticeBar).use(Tab).use(Tabs).use(Area).use(PullRefresh).use(Tabbar).use(TabbarItem).use(list).use(Search).use(DropdownMenu).use(DropdownItem).use(Swipe).use(SwipeItem).use(Popup).use(Checkbox).use(CheckboxGroup);
  Vue.use(Lazyload, {
    lazyComponent: true,
  }).use(Sticky);
  import {getLocalCityList,getListByclassificationId,getAppBanner,rentoutNearComplete, getRentoutListRPage,getSellListSPage, getRentoutListPage,getRentoutListPageIndex, getCListRPage, getAlListPage, getSellListPage,getBusiness } from '@/api/rentout'
  export default {
    name: 'home',
    data() {
      return {
        firstList:[{id:1, name:'商铺转让',icon: '../../../static/images/transfer.png'},
          {id:2, name:'商铺出租', icon: '../../../static/images/rent.png'},
          {id:3, name:'商铺出售',icon: '../../../static/images/sell.png'},
          {id:4, name:'商圈',icon: '../../../static/images/shops.png'},
          {id:5, name:'老店美食',icon: '../../../static/images/food.png'},
          {id:6, name:'特产',icon: '../../../static/images/specialty.png'},
          {id:7, name:'招聘',icon: '../../../static/images/recruitment.png'},
          {id:8, name:'力帮',icon: '../../../static/images/help.png'},
          {id:9, name:'农产品',icon: '../../../static/images/farmproducts.png'},
        ],
        dymicCity:'',//动态城市
        area:'',
        cityShow:false,
        refreshShow:true,
        localCityList:[],
        classificationList:[],
        btnFlag:true,
        longitude:0,
        latitude:0,
        locationCity:"",
        listAppBanner:[], //手机轮播图
        listNearComplete:[],//最近成交案例
        pageSize: 6, // 每页条数
        pageIndex: 1, // 页码
        rcDateList:[], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100, // 滚动条与底部距离小于 offset 时触发load事件

        active:'home',

        name:'',
        rightShow:false,
        tagShow:true,
        checkList: ['可明火', '上水', '下水', '天然气', '外摆区', '货梯'],
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'',
        value:'',
        tcur: 0,
        qycur: 0,
        zjcur: 0,
        mjcur:0,
        need: [],
        option1: [
          { text: '面积', value: '' },
          // { text: '不限', value: '' },
          { text: '20m²以下', value: '0,20'},
          { text: '20m²-50m²', value: '20,50'},
          { text: '50m²-100m²', value: '50,100'},
          { text: '100m²-200m²', value: '100,200'},
          { text: '200m²-500m²', value: '200,500'},
          { text: '500m²以上', value: '500,100000'}
        ],
        option2:[{ text: '区域', value: '' }],
        // option2: [
        //   { text: '区域', value: '' },
        //   { text: '南明', value: '南明' },
        //   { text: '云岩', value: '云岩' },
        //   { text: '观山湖', value: '观山湖' },
        //   { text: '花溪', value: '花溪' },
        //   { text: '白云', value: '白云' },
        //   { text: '乌当', value: '乌当' },
        //   { text: '小河', value: '小河' },
        //   { text: '清镇', value: '清镇' },
        //   { text: '修文', value: '修文' },
        //   { text: '息烽', value: '息烽' },
        //   { text: '开阳', value: '开阳' },
        //   { text: '其他', value: '其他' },
        // ],
        // option2: [
        //   { text: '类型', value: '' },
        //   { text: '不限', value: '' },
        //   { text: '临街门面', value: '临街门面' },
        //   { text: '社区底商', value: '社区底商' },
        //   { text: '档口摊位', value: '档口摊位' },
        //   { text: '商业街店铺', value: '商业街店铺' },
        //   { text: '写字楼配套', value: '写字楼配套' },
        //   { text: '购物百货中心', value: '购物百货中心' },
        //   { text: '其他', value: '其他' },
        // ],
        option3: [{ text: '业态', value: '' }
          // { text: '不限', value: '' }
          ],
        //   { text: '业态', value: '' },
        //   { text: '日用零售', value: '日用零售' },
        //   { text: '酒店', value: '酒店' },
        //   { text: '餐饮', value: '餐饮' },
        //   { text: '休息娱乐', value: '休息娱乐' },
        //   { text: '服务类', value: '服务类' },
        //   { text: '家居建材', value: '家居建材' },
        //   { text: '其他类', value: '其他类' }
        // ],
        option4: [
          { text: '价格', value: '' },
          // { text: '不限', value: '' },
          { text: '1000—2000', value: '1000,2000' },
          { text: '2000—5000', value: '2000,5000' },
          { text: '5000—8000', value: '5000,8000' },
          { text: '8000—10000', value: '8000,10000' },
          { text: '10000以上', value: '10000,10000000' },
        ],
        option5: [
          { text: '来源', value: '' },
          // { text: '不限', value: '' },
          { text: '个人', value: 0 },
          { text: '楼盘', value: 1 },
        ],
        option6: [
          { text: '价格', value: '' },
          // { text: '不限', value: '' },
          { text: '20万以下', value: '0,20'},
          { text: '20万-50万', value: '20,50'},
          { text: '50万-80万', value: '50,80'},
          { text: '80万-100万', value: '80,100'},
          { text: '100万-150万', value: '100,150'},
          { text: '150万-200万', value: '150,200'},
          { text: '200万以上', value: '200,100000'}
        ],
        // rcDateList:[],
        industry:'', //经营行业
        acreageS:'', //面积 单位平米
        acreageE:'',
        monthlyRentS:'',//月租金
        monthlyRentE:'',
        shopType:'', //类型

        tt:'findShop',
        type: 3, //类型 1：出租 2：转租 3：转让
        urlType:1,
        search:'',
        /*商圈*/
        bscurrent: 1,
        size: 4,

        refreshing: false,
        loading:false,
        finished:false,
        jd: '',//经度
        wd: '',//纬度
        businessList: [],
        bsvalue2:'',
        bsvalue3:'',
        token:'',
      }
    },
    activated() {
      this.locationCity = localStorage.getItem('city');//从本地存储取出
      this.area = localStorage.getItem('area');//从本地存储取出
      if(this.area==''|| this.area==null){
        this.cityShow=false
        this.city()
      }
      this.token=localStorage.getItem('token');
      if( this.locationCity===null){
        this.city()
        this.getLocalCityList()
      }else {
        this.getLocalCityList()
      }
      this.getisCity()

      if(this.area!=this.locationCity){
        this.pageIndex= 1  // 页码
        this.rcDateList=[]  // 请求数据
        this.getRentoutListPages()
      }

      // this.pageIndex= 1  // 页码
      // this.rcDateList=[]  // 请求数据
      // this.getRentoutListPages()
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('scroll', this.scrollToTop)
      // let that = this;
      // this.getRentoutListPage()
      // /*定位当前经纬度 start*/
      // var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(function(r){
      //   if(this.getStatus() == BMAP_STATUS_SUCCESS){
      //     that.jd = r.point.lng
      //     that.wd = r.point.lat
      //
      //   }else {
      //     Toast.fail('定位失败');
      //   }
      // });
      /*定位当前经纬度 end*/
    },

    methods: {
      onClick(name, title) {
        if(name===0){
          this.type = 3
          this.pageIndex = 1
          this.changeType('findShop')
        }
        if(name===1){
          this.type=1
          this.pageIndex=1
          this.changeType('outrent')
        }
        if(name===2){
          this.bscurrent=1
          this.changeType('sell')
          // this.changeType('want')
        }
      },

      hidePanel(){
        this.cityShow=false
      },
      goto(id){
        // if(this.token===null){
        //   Toast('请先登录！！！')
        //   return
        // }
        if(id === 1){
          this.$router.push('/findShop')
        }else  if(id === 2){
          this.$router.push('/findShop')
        }else  if(id === 3){
          this.$router.push('/findShop')
        }else if(id === 4){
          this.$router.push('/businessCircle')
        }else if(id === 5){
          this.$router.push('/oldFood')
        }else if(id === 6){
          this.$router.push('/specialty')
        }else if(id === 7){
          this.$router.push('/recruitment')
        }else if(id === 8){
          this.$router.push('/forceHelp')
        }else if(id === 9){
          this.$router.push('/farmProducts')
        }

        // this.$router.push('/publish')
      },
      toAddr(){
        this.$router.push('/addr')
      },
      backTop () {
        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 10)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 2)
      },

      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop () {
        const that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 600) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      },

      city() {
        let _this = this
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
          // console.log(r)
          localStorage.removeItem('city');//删除上次的存储
          localStorage.removeItem('area');//删除上次的存储
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {

            const myGeo = new BMap.Geocoder()
            myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
              if (data.addressComponents) {
                const result = data.addressComponents
                // console.log(data.addressComponents)
                const location = {
                  creditLongitude: r.point.lat, // 经度
                  creditLatitude: r.point.lng, // 纬度
                  creditProvince: result.province || '', // 省
                  creditCity: result.city || '', // 市
                  creditArea: result.district || '', // 区
                  creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
                }
                _this.location = location;
                _this.creditLongitude=location.creditLongitude;
                _this.creditLatitude=location.creditLatitude;
                _this.creditCity=location.creditCity;
                _this.creditArea=location.creditArea;
                _this.locationCity = location.creditCity;
                // alert(this.getStatus());


                const str=_this.creditCity;//city存储本地
                localStorage.setItem('city', str);
                localStorage.setItem('area', str);
              }
            })
          }

        })
      },

      getisCity(){
        this.locationCity = localStorage.getItem('city');//从本地存储取出
        this.area = localStorage.getItem('area');//从本地存储取出
        if(this.locationCity!=this.area){
          this.cityShow=true
        }else {
          this.cityShow=false
        }

      },
      tocity(area){
        // alert(area)
        localStorage.removeItem('background');
        localStorage.removeItem('city');//删除上次的存储
        localStorage.setItem('city', area);
        this.locationCity = localStorage.getItem('city');//从本地存储取出
        localStorage.setItem('background', area);
        // console.log(this.locationCity );
        this.getLocalCityList()
        this.getRentoutListPages()
        this.cityShow=false
      },

      onSearch(){
        if(this.tagShow){
          this.pageIndex = 1
          this.rcDateList=[]
          this.getRentoutListPage()
        }else{
          // this.businessList=[]
          // this.getBusinessList()
        }

      },
      araeChange: function(val) {
        this.pageIndex = 1
        this.rcDateList=[]
        // this.getRentoutListPage()
        this.getRentoutListPages()
      },
      // bsaraeChange: function(val) {
      //   this.businessList=[]
      //   this.getBusinessList()
      // },
      moneyChange: function() {
        this.pageIndex = 1
        let a = this.value4.split(",")
        if(a[0]==0||a[1]!==0){
          this.monthlyRentS=a[0]
          this.monthlyRentE=a[1]
        }else{
          this.monthlyRentS=''
          this.monthlyRentE=''
        }
        this.rcDateList=[]
        this.getRentoutListPage()
      },
      moneyChanges: function() {
        this.pageIndex = 1
        let a = this.value6.split(",")
        if(a[0]==0||a[1]!==0){
          this.monthlyRentS=a[0]
          this.monthlyRentE=a[1]
        }else{
          this.monthlyRentS=''
          this.monthlyRentE=''
        }
        this.rcDateList=[]
        this.getSellListPage()
      },
      sourceshopType: function(val) {
        this.pageIndex = 1
        this.rcDateList=[]
        // this.getRentoutListPage()
        this.getSellListPage()
      },
      mjChange: function() {
        this.pageIndex = 1
        let a = this.value1.split(",")
        if(a[0]!==0||a[1]!==0){
          this.acreageS=a[0]
          this.acreageE=a[1]
        }else{
          this.acreageS=''
          this.acreageE=''
        }
        this.rcDateList=[]
        this.getRentoutListPage()
      },
      needChange: function() {
        this.pageIndex = 1
        // console.log(this.need)
        if(this.need.length>0){
          var s='';
          for(var i=0;i<this.need.length;i++){
            if(this.need[i]!==''){
              s+=this.need[i]+','
            }
          }
          this.mating=s
        }else{
          this.mating=''
        }
        this.rcDateList=[]
        this.getRentoutListPage()
      },
      industryChange() {
        this.pageIndex = 1
        this.rcDateList=[]

        this.getRentoutListPages()
      },
      // bsindustryChange() {
      //   this.businessList=[]
      //   this.getBusinessList()
      // },
      pingRentoutUrl(type, id) {
        // alert(type)
        if(type==10){
          return '/sellInfo?id='+id
        }else if(type==1){
          // localStorage.setItem('type',1);
          return '/rentoutInfo?id='+id
        }else if(type==3){
          // localStorage.setItem('type',3);
          return '/transferInfo?id='+id
        }
      },
      pingLocatonUrl(id) {
        return '/sellInfo?id='+id
      },
      getLocalCityList(){
        var data2 = localStorage.getItem('city');//从本地存储取出
        // alert('city'+data2)
        this.option2=[]
        this.option2.push({ text: '区域', value: '' })
        getLocalCityList({locationCity: data2 }).then(response => {
          // console.log(response.data)
          this.localCityList = this.localCityList.concat(response.data)
          for (var i = 0; i <  this.localCityList.length; i++) {
            var proUrl = {
              text: response.data[i].name,
              value: response.data[i].name,
            }
            this.option2.push(proUrl)
          }

        }).catch(function(reason) {

        })
      },
      getListByclassificationId(){
        getListByclassificationId({classificationId: 20}).then(response => {
          // console.log(response.data)
          this.classificationList = this.classificationList.concat(response.data)
          for (var i = 0; i <  this.classificationList.length; i++) {
            var proUrl = {
              text: response.data[i].name,
              value: response.data[i].name,
            }
            this.option3.push(proUrl)
          }
        }).catch(function(reason) {

        })
      },
      changeType(tt){
        this.tt=tt;
        if(tt=='findShop'){//转让
          this.type = 3
          this.urlType=3
          this.pageIndex = 1
          this.refreshShow = true
          this.tagShow = true
          this.rcDateList=[]
          this.getRentoutListPages()
        }else if(tt=='outrent'){//出租
          this.type = 1
          this.urlType=1
          this.pageIndex = 1
          this.refreshShow = true
          this.tagShow = true
          this.rcDateList=[]
          this.getRentoutListPages()
        }else if(tt=='sell'){//出售
          this.type = ''
          this.urlType=2
          this.bscurrent = 1
          this.tagShow = false
          this.refreshShow= false
          this.rcDateList=[]
          this.getSellListPage()
        }else if(tt=='bs'){//商圈
          this.tagShow = false
          // if(this.businessList.length==0){
          //   this.getBusinessList()
          // }
        }
      },
      getRentoutListPages(){
        if(this.urlType!=2){
          const _self = this
          _self.locationCity = localStorage.getItem('city');
          getRentoutListPageIndex({
            // getRentoutListPage({
            search:this.search,type:this.type,current: this.pageIndex, size: this.pageSize,
            monthlyRentS:this.monthlyRentS,monthlyRentE:this.monthlyRentE,
            acreageS:this.acreageS,acreageE:this.acreageE,
            industry:this.value3, county: this.value2, shopType: '',city:_self.locationCity }).then(response => {
            // console.log(response.data)
            // this.rcDateList = response.data.records
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
              _self.rcDateList = rows
            } else {
              _self.rcDateList = _self.rcDateList.concat(rows)
            }

          }).catch(function(reason) {
            console.log('catch:', reason)
          }).finally(() => {
            _self.isDownLoading = false
            _self.isUpLoading = false
          })

        }
      },
      getRentoutListPage() {
        if(this.urlType===2){
          this.getSellListPage();
        }else{
          this.getRentoutListPages()
        }
      },
      getSellListPage(){
        const _self = this
        this.locationCity = localStorage.getItem('city');//从本地存储取出
        if(this.locationCity==null){
          this.locationCity='南明'
        }
        getSellListPage({ search:this.search,type:this.type,current: this.bscurrent, size: this.size, monthlyRentS:this.monthlyRentS,monthlyRentE:this.monthlyRentE,acreageS:this.acreageS,acreageE:this.acreageE,industry:this.value3,
          county: '' , sourcetype: this.value5,city: this.locationCity
        }).then(response => {
          // console.log(response.data)
          // this.rcDateList = response.data.records
          // if(this.bscurrent===1 && response.data.records.size()<this.size){
          //   return
          // }
          const rows = response.data.records
          if (rows == null || rows.length === 0) {
            // 加载结束
            _self.finished = true
            return
          }
          if (rows.length < this.size) {
            // 最后一页不足10条的情况
            _self.finished = true

          }
          // 处理数据
          if (_self.bscurrent === 1) {
            _self.rcDateList = rows
          } else {
            _self.rcDateList = _self.rcDateList.concat(rows)
          }

        }).catch(function(reason) {
          console.log('catch:', reason)

        // })
        }).finally(() => {
          _self.refreshing = false
          _self.loading = false
        })
      },
      rentoutNearComplete(){
        rentoutNearComplete({ }).then(response => {
          // console.log(response.data)
          this.listNearComplete = this.listNearComplete.concat(response.data)
        }).catch(function(reason) {

        })
      },
      dateFormat:function(time) {
        var date=new Date(time);
        var year=date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        // var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        // var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        // 拼接
        // return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        return year+"-"+month+"-"+day;
      },
      getAppBanner(){
        getAppBanner({ }).then(response => {
          // console.log(response.data)
          this.listAppBanner = this.listAppBanner.concat(response.data)
        }).catch(function(reason) {

        })
      },

      /*获取商圈数据*/
      // getBusinessList() {
      //   getBusiness({ search:this.search,current: 1, size: 10,jd: this.jd,wd: this.wd/*,industry:this.bsvalue3, county: this.bsvalue2*/}).then(response => {
      //     for(var i = 0;i<response.data.records.length;i++){
      //       if(response.data.records[i].imgjson){
      //         response.data.records[i].imgList = JSON.parse(response.data.records[i].imgjson)
      //       }
      //     }
      //     this.businessList = this.businessList.concat(response.data.records)
      //
      //   }).catch(function(reason) {
      //
      //   })
      // },

      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.getRentoutListPages() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.getRentoutListPages()
      },

      onDownRefreshs() {
        this.bscurrent = 1
        this.finished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.getSellListPage() // 加载数据
      },
      // 上拉加载请求方法
      onLoadLists() {
        this.bscurrent++
        this.getSellListPage()
      },


      switchTo(path){
        // console.log(this.active)
        this.$router.push({
          path:path,
          replace:true
        })
      },
      go(lik){
        // this.$router.push(lik)
        this.$router.back()
      }
    },

    created() {
      // this.locationCity = localStorage.getItem('city');//从本地存储取出
      // this.area = localStorage.getItem('area');//从本地存储取出
      // if( this.locationCity===null){
      //   this.city()
      //   this.getLocalCityList()
      // }else {
      //   // this.city()    //触发获取城市方法
      //   this.getLocalCityList()
      // }
      // this.city()    //触发获取城市方法
      // this.getLocalCityList()
      this.getListByclassificationId()
      this.getRentoutListPages()
      this.rentoutNearComplete()
      this.getAppBanner()
    },

    computed: {

    },
    watch:{

    },
    // beforeRouteLeave(to, from, next) {
    //   if (to.path === "/") {
    //     to.meta.keepAlive = true;
    //   } else {
    //     to.meta.keepAlive = false;
    //     // location. reload()
    //   }
    //   next();
    // },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    }




  }
</script>

<style lang="scss">
  body{
    background: #f2f2f2;
  }
  #home{
    padding-bottom: 50px;
    background-color: #fff;
    .home-top{
      position: fixed;
      z-index: 999;
      top:0;
      left:0;
      width:100%;
      height: 3.5rem;
      font-size: 22px;
      text-align: center;
      background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);
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
      // padding: 0 0.5rem 0 0.5rem;
    }
    .item {
      padding: 0.7rem;
      margin: 0;
      -moz-page-break-inside: avoid;
      -webkit-column-break-inside: avoid;
      break-inside: avoid;
    }
    .van-checkbox__icon--checked .van-icon{    background-color: #C81415;
      border-color: #C81415;}
    .qy-active {
      color: #fff !important;
      border-radius: 14px;
      background: #C81415 !important;
    }
    .choice-list {
      width: 100%;
      display: block;
      text-align: center;
      background: #eee;
      color: #333;
      padding: 5px 0;
      border-radius: 4px;
      margin-top: 8px;
    }
    .kailong-up{
      width:60px;
      height:0;
      border-bottom:3px solid red;
    }
    .notice-swipe {
      height: 200px;
      line-height: 200px;
    }
    .totop {
      position: fixed;
      width: 2rem; /* 40/16 */
      height: 2rem;
      border-radius: 1.25rem /* 20/16 */;
      opacity: 0.8;
      background: rgba(255, 255, 255, .9);
      box-shadow: 0 1px 5px 0 #e0e0e0;
      right: 1.125rem; /* 18/16 */
      bottom: 4.5rem; /* 64/16 */
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
    .kuicon{display: inline-block;position: absolute;top: 21px;z-index: 22;}
    .banner-title{position: absolute;z-index: 2;top:20px;width: 100%;color:#c50a39;font-size: 30px;font-weight:bold}
    
    .top-tab-bg {
      position: absolute;
      top: 1.5rem;
      width: 100%;
      height: 10rem;
      border-radius: 0 0 5rem 5rem;
      background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);
    }

    // 城市定位
    .city-position {
      position: relative;
      color: #f2f2f2;
      width: 5rem;
      line-height: 3.5rem;
    }

    .city-position-icon {
      color: #fff;
      position: absolute;
      top: 1.4rem;
      right: 3px;
    }

    // 搜索框
    // .search-box {
    //   position: relative;
    //   top: 1rem;
    //   left: 2rem;
    //   height: 3rem;
    //   width: 15rem;
    //   background-color: #fff;
    // }

    .van-search {
      position: relative;
      top: 1rem;
      left: 2rem;
      margin: 0;
      padding: 0;
      width: 14rem;
      background-color: #fff !important;
      border-radius: 1rem;
    }

    .search-icon {
      width: 12px;
      height: 12px;
      position: absolute;
      z-index: 9;
      top: 39%;
      left: 25.5%;
      color: #FFBB00;
    }

    .van-search__content {
      border-radius: 0.4rem;
    }
    // 轮播图
    .swipe-box {
      margin: 0 0.5rem;
      position: relative;
      top: 1rem;
      border-radius: 0.3rem;
    }
    .swipe-img {
      border-radius: 0.3rem;
    }
    .swipe-img img {
      border-radius: 0.3rem;
    }
    // icon
    .container {
      background-color: #fff;
    }

    .firstList-item-icon {
      margin-bottom: 1.8rem;
      line-height: 0;
    }

    .firstList-item-icon .icon {
      margin-bottom: 0.5rem;
    }
    .firstList-item-icon .item-name {
      font-size: 0.9rem;
    }
    // 小广告轮播栏
    .adv-swipe-bar {
      height: 1.6rem;
      margin: 0 0.75rem;
      padding: 3px 0;
      border: 1px solid #e7e7e7;
    }

    .van-notice-bar {
      height: 1.6rem;
      background: #fff;
    }

    .van-tab--active {
      font-weight: 700;
    }
  }

</style>
