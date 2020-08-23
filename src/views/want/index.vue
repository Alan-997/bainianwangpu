<template>
  <div id="findShop" style="background:#faf6f6;width: 100%;overflow: hidden">
    <div class="findShop-top pb10">
      <van-row class="bxs pr10">
        <van-col span="24" class="pt10 pr bxb pr20">
          <input class="top-search ml15 pl15 bxb" v-model="search" placeholder="请输入"/>
          <van-icon name="search" class="search-icon fb" @click="searchRet" />
        </van-col>
      </van-row>
    </div>

    <van-sticky :offset-top="0">
      <div class="mt20 pt40 pb10" style="background:white;">
        <van-row class="ml20 mr5 " >
          <van-col span="5"  @click="changeType('findShop')" >转让</van-col>
          <van-col span="5" @click="changeType('outrent')">出租</van-col>
          <van-col span="5" @click="changeType('sell')">出售</van-col>
          <van-col span="5" class="active-font-weight"><span class="pr"><span class="kailong-up kuicon"></span></span>求租</van-col>
          <van-col span="4">
            <div class="fl" @click="rightShow=true">
              <van-icon name="filter-o" size="18" class="bk fl" />
              <span class="bk fl">筛选</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-sticky>

    <div class="">
      <van-row class="ml10 mr10">
        <van-col :span="24"  >
          <div v-if="dateList.length > 0">
            <div v-for="item in dateList" :key="item.id"  >
              <van-divider />
              <router-link :to="pingUrl(item.id)" >
                <van-divider />
                <van-row>
                  <van-col span="9">
                    <div >
                      <van-image  src="../../../static/images/background.jpg" fit="cover" width="100%" height="120px" radius="10px"  lazy-load />
                    </div>
                  </van-col>
                  <van-col span="15">
                    <div class="ml10 " style="font-weight: bolder">
                      <div class="van-ellipsis fb c13 f18 mt5 ">{{item.title}}</div>

                      <van-row class="">
                        <van-col span="8" class="f14 c666" style="font-family: 'Arial Black'">意向面积</van-col>
                        <van-col  span="16" class="f14 t-right  van-ellipsis fb" >
                          <span  style="font-family: 'Arial Black';">{{item.acreageStart}}-{{item.acreageEnd}}m²</span>
                        </van-col>
                      </van-row>

                      <van-row class="">
                        <van-col  span="8" class="f14 c666" style="line-height: 24px">承受租金</van-col>
                        <van-col style="font-family: 'Arial Black';" span="16" class="t-right van-ellipsis ">{{item.monthlyRentStart}}-{{item.monthlyRentEnd}}元/月</van-col>
                      </van-row>
                      <van-row class="">
                        <van-col  span="8" class="f14 c666" style="line-height: 24px">经营业态</van-col>
                        <van-col  span="10" class="  ">
                          <van-tag type="warning" size="large" plain>{{item.industry}}</van-tag>
                        </van-col>
                        <van-col  span="6" class="t-right van-ellipsis ">
                          <van-tag type="warning" size="large" plain>{{item.industry1}}</van-tag>
                        </van-col>
                      </van-row>
                      <van-row class="">
                        <van-col  span="8" class="f14 c666" style="line-height: 24px">意向区域</van-col>
                        <van-col style="font-family: 'Arial Black';" span="16" class="t-right van-ellipsis ">{{item.county}}
                          <span  v-if="item.street!=''|| item.street!=null" class="van-ellipsis">-{{item.street}}</span>
                        </van-col>
                      </van-row>
                    </div>
                  </van-col>

                </van-row>

              </router-link>

            </div>
          </div>
        </van-col>
      </van-row>
      <div class="">
        <p class="loadMore" @click="load" v-if="state==0">加载更多</p>
        <p class="t-center" v-else-if="state==1">
          <van-loading color="#1989fa" ><span style="color: #F19097">加载中...</span></van-loading>
        </p>
        <p class="noMore" v-else-if="state==2">没有更多了</p>
      </div>
    </div>

<!--    <div class="mt20 pt40">-->
<!--      <van-row>-->
<!--        <van-col span="24">-->
<!--          <van-tabs @click="onClick">-->
<!--            <van-tab title="转让"></van-tab>-->
<!--            <van-tab title="出租"></van-tab>-->
<!--            <van-tab title="求租">-->

<!--              <van-row class="ml10 mr10">-->
<!--                <van-col :span="24"  >-->
<!--                  <div v-if="dateList.length > 0">-->
<!--                    <div v-for="item in dateList" :key="item.id"  >-->
<!--                      <van-divider />-->
<!--                      <router-link :to="pingUrl(item.id)" >-->
<!--                        <van-row>-->
<!--                          <van-col span="9">-->
<!--                            <lazy-component >-->
<!--                              <van-image  src="../../../static/images/background.jpg" fit="cover" width="100%" height="120px" radius="10px"  lazy-load />-->
<!--                            </lazy-component>-->
<!--                          </van-col>-->
<!--                          <van-col span="15">-->
<!--                            <div class="ml10 " style="font-weight: bolder">-->
<!--                              <div class="van-ellipsis fb c13 f18 mt5 ">{{item.title}}</div>-->

<!--                              <van-row class="">-->
<!--                                <van-col span="6" class="f14 c666" style="font-family: 'Arial Black'">意向面积</van-col>-->
<!--                                <van-col  span="18" class="f14 t-right fb" >-->
<!--                                  <span  style="font-family: 'Arial Black';">{{item.acreageStart}}-{{item.acreageEnd}}m²</span>-->
<!--                                </van-col>-->
<!--                              </van-row>-->

<!--                              <van-row class="">-->
<!--                                <van-col  span="6" class="f14 c666" style="line-height: 24px">承受租金</van-col>-->
<!--                                <van-col style="font-family: 'Arial Black';" span="18" class="t-right ">{{item.monthlyRentStart}}-{{item.monthlyRentEnd}}元/月</van-col>-->
<!--                              </van-row>-->
<!--                              <van-row class="">-->
<!--                                <van-col  span="6" class="f14 c666" style="line-height: 24px">经营业态</van-col>-->
<!--                                <van-col  span="9" class="  ">-->
<!--                                  <van-tag type="warning" size="large" plain>{{item.industry}}</van-tag>-->
<!--                                </van-col>-->
<!--                                <van-col  span="9" class="t-right van-ellipsis ">-->
<!--                                  <van-tag type="warning" size="large" plain>{{item.industry1}}</van-tag>-->
<!--                                </van-col>-->
<!--                              </van-row>-->
<!--                              <van-row class="">-->
<!--                                <van-col  span="6" class="f14 c666" style="line-height: 24px">意向区域</van-col>-->
<!--                                <van-col style="font-family: 'Arial Black';" span="18" class="t-right ">{{item.county}}-->
<!--                                  <span  v-if="item.street!=''|| item.street!=null" class="van-ellipsis">-{{item.street}}</span>-->
<!--                                </van-col>-->
<!--                              </van-row>-->
<!--                            </div>-->
<!--                          </van-col>-->

<!--                        </van-row>-->
<!--                      </router-link>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </van-col>-->
<!--              </van-row>-->
<!--              <div class="">-->
<!--                <p class="loadMore" @click="load" v-if="state==0">加载更多</p>-->
<!--                <p class="t-center" v-else-if="state==1">-->
<!--                  <van-loading color="#1989fa" ><span style="color: #F19097">加载中...</span></van-loading>-->
<!--                </p>-->
<!--                <p class="noMore" v-else-if="state==2">没有更多了</p>-->
<!--              </div>-->


<!--            </van-tab>-->
<!--            <van-tab title="出售"></van-tab>-->
<!--            <van-tab title="筛选">-->
<!--              <van-row class="ml10 mr10">-->
<!--                <van-col :span="24"  >-->
<!--                  <div v-if="dateList.length > 0">-->
<!--                    <div v-for="item in dateList" :key="item.id"  >-->
<!--                      <van-divider />-->
<!--                      <router-link :to="pingUrl(item.id)" >-->
<!--                        <van-row>-->
<!--                          <van-col span="9">-->
<!--                            <lazy-component >-->
<!--                              <van-image  src="../../../static/images/background.jpg" fit="cover" width="100%" height="120px" radius="10px"  lazy-load />-->
<!--                            </lazy-component>-->
<!--                          </van-col>-->
<!--                          <van-col span="15">-->
<!--                            <div class="ml10 " style="font-weight: bolder">-->
<!--                              <div class="van-ellipsis fb c13 f18 mt5 ">{{item.title}}</div>-->

<!--                              <van-row class="">-->
<!--                                <van-col span="6" class="f14 c666" style="font-family: 'Arial Black'">意向面积</van-col>-->
<!--                                <van-col  span="18" class="f14 t-right fb" >-->
<!--                                  <span  style="font-family: 'Arial Black';">{{item.acreageStart}}-{{item.acreageEnd}}m²</span>-->
<!--                                </van-col>-->
<!--                              </van-row>-->

<!--                              <van-row class="">-->
<!--                                <van-col  span="6" class="f14 c666" style="line-height: 24px">承受租金</van-col>-->
<!--                                <van-col style="font-family: 'Arial Black';" span="18" class="t-right ">{{item.monthlyRentStart}}-{{item.monthlyRentEnd}}元/月</van-col>-->
<!--                              </van-row>-->
<!--                              <van-row class="">-->
<!--                                <van-col  span="6" class="f14 c666" style="line-height: 24px">经营业态</van-col>-->
<!--                                <van-col  span="9" class="  ">-->
<!--                                  <van-tag type="warning" size="large" plain>{{item.industry}}</van-tag>-->
<!--                                </van-col>-->
<!--                                <van-col  span="9" class="t-right van-ellipsis ">-->
<!--                                  <van-tag type="warning" size="large" plain>{{item.industry1}}</van-tag>-->
<!--                                </van-col>-->
<!--                              </van-row>-->
<!--                              <van-row class="">-->
<!--                                <van-col  span="6" class="f14 c666" style="line-height: 24px">意向区域</van-col>-->
<!--                                <van-col style="font-family: 'Arial Black';" span="18" class="t-right ">{{item.county}}-->
<!--                                  <span  v-if="item.street!=''|| item.street!=null" class="van-ellipsis">-{{item.street}}</span>-->
<!--                                </van-col>-->
<!--                              </van-row>-->
<!--                            </div>-->
<!--                          </van-col>-->

<!--                        </van-row>-->
<!--                      </router-link>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </van-col>-->
<!--              </van-row>-->
<!--              <div class="">-->
<!--                <p class="loadMore" @click="load" v-if="state==0">加载更多</p>-->
<!--                <p class="t-center" v-else-if="state==1">-->
<!--                  <van-loading color="#1989fa" ><span style="color: #F19097">加载中...</span></van-loading>-->
<!--                </p>-->
<!--                <p class="noMore" v-else-if="state==2">没有更多了</p>-->
<!--              </div>-->

<!--            </van-tab>-->
<!--          </van-tabs>-->
<!--        </van-col>-->
<!--      </van-row>-->

<!--    </div>-->

    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item icon="home-o" @click="switchTo('/')">首页</van-tabbar-item>
      <van-tabbar-item icon="browsing-history-o" @click="switchTo('/findShop')">找商铺</van-tabbar-item>
      <van-tabbar-item icon="fire-o" @click="switchTo('/businessCircle')">商圈</van-tabbar-item>
      <van-tabbar-item icon="bulb-o" @click="switchTo('/exam')">成交案例</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" @click="switchTo('/personCenter')">我的</van-tabbar-item>
    </van-tabbar>

    <van-popup
      v-model="rightShow"
      position="right"
      :style="{ width: '80%',height:'100%' }"
    >
      <div class="wrap mt10 pl10">
        <p><span class="c888">区域</span></p>
        <van-row class="bbe pb15 act-bnt">
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==0}" @click="araeChange(0,'')">{{locationCity}}</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs" v-for="(item,index) in localCityList" :key="index">
            <span class="f12 choice-list" :class="{'qy-active':qycur==index+1}" @click="araeChange(index+1,item.name)" >{{item.name}}</span>
          </van-col>
        </van-row>

        <p class="mt15"><span class="c888">面积</span></p>
        <van-row class="bbe pb15 act-bnt">
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':mjcur==0}" @click="mjChange(0,0,0)">不限</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':mjcur==1}" @click="mjChange(1,0,20)">20m²以下</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':mjcur==2}" @click="mjChange(2,20,50)">20-50m²</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':mjcur==3}" @click="mjChange(3,50,100)">50-100m²</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':mjcur==4}" @click="mjChange(4,100,200)">100-200m²</span>
          </van-col>
          <van-col span="8" claschoice-lists="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':mjcur==5}" @click="mjChange(5,200,500)">200-500m²</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':mjcur==6}" @click="mjChange(6,500,500000)">500m²以上</span>
          </van-col>
        </van-row>
        <p class="mt15"><span class="c888">租金</span></p>
        <van-row class="bbe pb15 act-bnt">
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':zjcur==0}" @click="moneyChange(0,0,0)">不限</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':zjcur==1}" @click="moneyChange(1,0,2000)">1000—2000</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':zjcur==2}" @click="moneyChange(2,2000,5000)">2000—5000</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':zjcur==3}" @click="moneyChange(3,5000,8000)">5000—8000</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':zjcur==4}" @click="moneyChange(4,8000,10000)">8000—10000</span>
          </van-col>

        </van-row>

        <p class="mt15"><span class="c888">要求</span></p>
        <div class="pb15 bbe">
          <van-checkbox-group  v-model="need" @change="needChange()">
            <van-row>
              <van-col class="mt10" span="12"  v-for="(item, index) in checkList" :key="index">
                <van-checkbox :key="item" :name="item">
                  {{ item }}
                </van-checkbox>
              </van-col>
            </van-row>

          </van-checkbox-group>
        </div>

        <p class="mt15"><span class="c888">位置</span></p>
        <van-row class="bbe pb15 act-bnt">
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" @click="industryChange('')" :class="{'qy-active':industry==''}">不限</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs" v-for="(item,index) in wantedIndustryList" :key="index">
            <span class="cp f12 choice-list" @click="industryChange(item)" :class="{'qy-active':industry==item}">{{item}}</span>
          </van-col>

<!--          <van-col span="8" class="pr5 pl5 bxs">-->
<!--            <span class="cp f12 choice-list" @click="industryChange('')" :class="{'qy-active':shopType==''}">不限</span>-->
<!--          </van-col>-->
        </van-row>
      </div>
    </van-popup>
  </div>
</template>


<script>
  import { setToken , getToken } from '@/utils/auth' // 在cookie中获取用户
  import Vue from 'vue'
  import { Toast,Tab, Tabs ,Image as VanImage ,Tag,Divider,Lazyload,Tabbar, TabbarItem,Search,DropdownMenu, DropdownItem,Popup,Checkbox, CheckboxGroup,Sticky } from 'vant';
  Vue.use(Tab).use(Tabs).use(VanImage).use(Tag).use(Divider).use(Tabbar).use(TabbarItem).use(Search).use(DropdownMenu).use(DropdownItem).use(Popup).use(Checkbox).use(CheckboxGroup);
  Vue.use(Lazyload, {
    lazyComponent: true,
  }).use(Sticky);
  import {getWantedListPageIndex, getWantedIndustry,getLocalCityList,getWantedListPage } from '@/api/rentout'
  export default {
    name: 'want',
    data() {
      return {
        checkList: ['可明火', '上水', '下水', '天然气', '外摆区', '货梯'],
        active:1,
        rightShow:false,
        rDateList: [],
        rDateList1: [],
        // search: '',
        county: '',
        monthlyRentS: '',
        monthlyRentE: '',
        acreageS: '',
        acreageE: '',
        mating: '',
        industry: '',
        shopType: '',
        dateList: [],
        total: 0,
        currentPage: 1,
        pagesize: 10,
        state:0,
        tcur: 0,
        qycur: 0,
        zjcur: 0,
        startMoney: '',
        endMoney: '',
        mjcur: 0,
        startMj: '',
        endMj: '',
        need: [],
        value: '',
        value1: 0,
        cur:0,
        rcDateList:[],
        search:'',
        locationCity:'',
        localCityList:[],
        wantedIndustryList:[],

      }
    },
    activated() {
      this.locationCity = localStorage.getItem('city');//从本地存储取出
      this.getLocalCityList()
    },
    computed: {

    },
    watch:{

    },
    methods: {
      onClick(name, title) {
        if(name===0){
          this.changeType('findShop')
        }
        if(name===1){
          this.changeType('outrent')
        }
        if(name===2){
          this.getWantedListPage()
        }
        if(name===3){
          this.changeType('sell')
        }
        if(name===4){
          this.rightShow=true
        }

      },
      load(){
        this.state = 1;
        this.currentPage++;
        this.getWantedListPage()
      },
      changeType(path){
        this.$router.replace(path)
      },
      pingUrl(id) {
        return '/wantInfo?id='+id
      },
      getWantedIndustry(){
        getWantedIndustry({}).then(response => {
          console.log(response.data)
          this.wantedIndustryList = this.wantedIndustryList.concat(response.data)

        }).catch(function(reason) {

        })
      },
      getLocalCityList(){
        var data2 = localStorage.getItem('city');//从本地存储取出
        // alert('city'+data2)
        this.localCityList=[]
        getLocalCityList({locationCity: data2 }).then(response => {
          // console.log(response.data)
          this.localCityList = this.localCityList.concat(response.data)

        }).catch(function(reason) {

        })
      },
      getWantedListPage() {
        var data2 = localStorage.getItem('city');//从本地存储取出
        getWantedListPageIndex({search:this.search, current: this.currentPage, size: this.pagesize,  county: this.county,
          monthlyRentS: this.monthlyRentS, monthlyRentE: this.monthlyRentE,
          acreageS: this.acreageS, acreageE: this.acreageE,
          mating: this.mating, industry: this.industry,shopType: this.shopType,city: data2}).then(response => {
          let len = response.data.records.length
          this.dateList = this.dateList.concat(response.data.records);
          if(len<this.pagesize){//没有数据了
            this.state = 2;
          }else{
            this.state = 0;
          }
        }).catch(function(reason) {
          this.state = 2;
        })
      },

      araeChange: function(qycur,name) {
        this.state=0
        this.qycur = qycur
        this.county = name
        this.currentPage = 1
        this.dateList=[]
        this.getWantedListPage()
      },
      moneyChange: function(zjcur,s,e) {
        this.state=0
        this.startMoney = ''
        this.endMoney = ''
        this.zjcur = zjcur
        if(s!==0||e!==0){
          this.monthlyRentS=s
          this.monthlyRentE=e
        }else{
          this.monthlyRentS=''
          this.monthlyRentE=''
        }
        this.currentPage = 1
        this.dateList=[]
        this.getWantedListPage()
      },
      mjChange: function(mjcur,s,e) {
        this.state=0
        this.mjcur = mjcur
        this.startMj = '';
        this.endMj = '';
        if(s!==0||e!==0){
          this.acreageS=s
          this.acreageE=e
        }else{
          this.acreageS=''
          this.acreageE=''
        }
        this.currentPage = 1
        this.dateList=[]
        this.getWantedListPage()
      },
      needChange: function() {
        this.state=0
        console.log(this.need)
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
        this.currentPage = 1
        this.dateList=[]
        this.getWantedListPage()
      },
      industryChange(text) {
        this.state=0
        this.currentPage = 1
        this.industry = text
        // this.shopType = text
        this.dateList=[]
        this.getWantedListPage()
      },
      searchRet(){
        this.dateList=[]
        this.getWantedListPage()
      },
      pingRentoutUrl(id) {
        return '/rentoutInfo?id='+id
      },
      switchTo(path){
        // console.log(this.$router)
        this.$router.replace(path)
      },
      go(lik){
        this.$router.push(lik)
      }
    },
    created() {
      window.scroll(0,0)
      var ss = this.$route.query.search
      var county = this.$route.query.county
      var industry = this.$route.query.industry
      var shopType = this.$route.query.shopType
      var acreageS = this.$route.query.acreageS
      var acreageE = this.$route.query.acreageE
      var qycur = this.$route.query.qycur
      var mjcur = this.$route.query.mjcur
      if(ss&&ss!==''){
        this.search=ss
      }
      if(county&&county!==''){
        this.qycur = qycur
        this.county=county
      }
      if(industry&&industry!==''){
        this.industry=industry
      }
      if(shopType&&shopType!==''){
        this.shopType=shopType
      }
      if((acreageS!=0||acreageE!=0)&&typeof(acreageS) != "undefined"){
        this.mjcur = mjcur
        this.acreageS=acreageS
        this.acreageE=acreageE
      }
      this.getWantedIndustry()
      this.getWantedListPage()
    },
    mounted() {


    }
  }
</script>

<style lang="scss">
  body{
    background: #fff;
  }
  #findShop{
    padding-bottom: 50px;
    .findShop-top{position: fixed;z-index: 999;top:0;left:0;width:100%;font-size: 18px;text-align: center;color:#fff;
      background: linear-gradient(left,  #BBBB00 20%, #FFBB00 100%);}
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
      /*width:0;*/
      /*height:0;*/
      /*border-right:20px solid transparent;*/
      /*border-left:20px solid transparent;*/
      /*border-bottom:20px solid #fff;*/
      width:36px;
      height:0;
      border-bottom:3px solid red;
    }
    .kuicon{display: inline-block;position: absolute;top: 20px;z-index: 22;left: -3px}
    .choice-list{width:100%;display: block;text-align: center;background: #eee;color: #333;padding:5px 0;border-radius: 4px;margin-top: 8px}
  }

</style>
