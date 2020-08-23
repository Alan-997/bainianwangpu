<template>
  <div id="exam" style="background:#faf6f6;width: 100%;overflow: hidden">
    <div class="personCenter-top">
      <h2 class="t-center cfff f18 " style="font-weight: normal">成交案例</h2>
    </div>
    <div class="ml5 mr10 exam-content">
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
              <div v-if="dateList.length > 0">
                <div v-for="item in dateList" :key="item.id" >
                  <router-link :to="pingUrl(item.id)" class="info-list pr">
                    <van-divider />
                    <van-row>
                      <van-col span="9">
                        <div v-if="item.url!=null">
                          <van-image  :src="item.url" fit="cover" width="100%" height="140px" radius="8px"  lazy-load />
                        </div>
                      </van-col>
                      <van-col span="15">
                        <div class="ml10 " style="font-weight: bolder">
                          <div class="van-ellipsis fb c13 f16 mt5 ">{{item.title}}</div>
                          <div class="van-ellipsis  c666 f14 mt5 ">{{item.addr}}</div>

                          <van-row class="">
                            <van-col class="van-ellipsis" span="24" >
                              <van-tag color="#f2826a" plain>{{item.industry}}</van-tag>
                              <span  class="van-ellipsis" >
                               <van-tag v-if="item.matingList[0]!=null" class="ml5" color="#7232dd" plain>{{item.matingList[0]}}</van-tag>
                               <van-tag v-if="item.matingList[1]!=null" class="ml5" color="#7232dd" plain>{{item.matingList[1]}}</van-tag>
                               <van-tag v-if="item.matingList[2]!=null" class="ml5" color="#7232dd" plain>{{item.matingList[2]}}</van-tag>
                            </span>
                            </van-col>
                          </van-row>

                          <p class="f12  mt5">
                          <span class="f15 ">
                            <van-tag color="#f2826a" plain>{{item.type}}</van-tag>
                          </span>
                            <span style="font-family: 'Arial Black';" class="f14  ml5 ">{{item.acreage}}</span>
                          </p>
                          <van-row class="">
                            <van-col span="8" class="f12 c666" style="line-height: 24px">月租</van-col>
                            <van-col  span="16" class="f14 t-right fb" style="color: #AB0015"><span  style="color: #AB0015;font-family: 'Arial Black';">{{item.monthlyRent}}</span></van-col>
                          </van-row>
                          <van-row class="">
                            <van-col  span="8" class="f12 c666" style="line-height: 24px">转让费</van-col>
                            <span v-if="item.transferFee!='' && item.transferFee!=0.0 && item.transferFee!='unll'">
                               <van-col style="font-family: 'Arial Black';" span="16" class="t-right cred">{{item.transferFee}} 万元</van-col>
                            </span>
                            <span v-else>
                               <van-col style="font-family: 'Arial Black';" span="16" class="t-right cred">0 万元</van-col>
                            </span>
                          </van-row>
                        </div>
                      </van-col>
                    </van-row>
                  </router-link>
                </div>
              </div>
            </van-col>
          </van-row>
        </van-list>
      </van-pull-refresh>
    </div>
    <div>
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

    <van-popup
      v-model="rightShow"
      position="right"
      :style="{ width: '80%',height:'100%' }"
    >
      <div class="wrap mt10 pl10">
        <p><span class="c888">区域</span></p>
        <van-row class="bbe pb15 act-bnt">
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==0}" @click="araeChange(0,'')">贵阳</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==1}" @click="araeChange(1,'南明')">南明</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==2}" @click="araeChange(2,'云岩')">云岩</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==3}" @click="araeChange(3,'花溪')">花溪</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==4}" @click="araeChange(4,'白云')">白云</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==5}" @click="araeChange(5,'乌当')">乌当</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==6}" @click="araeChange(6,'清镇')">清镇</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==7}" @click="araeChange(7,'观山湖')">观山湖</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==12}" @click="araeChange(12,'小河')">小河</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==8}" @click="araeChange(8,'开阳')">开阳</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==9}" @click="araeChange(9,'修文')">修文</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==10}" @click="araeChange(10,'息烽')">息烽</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list" :class="{'qy-active':qycur==11}" @click="araeChange(11,'其他')">其他</span>
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
            <span class="cp f12 choice-list" @click="industryChange('商业街店铺')" :class="{'qy-active':industry=='商业街店铺'}">商业街店铺</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list"  @click="industryChange('写字楼配套')" :class="{'qy-active':industry=='写字楼配套'}">写字楼配套</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span  class="cp f12 choice-list" @click="industryChange('社区底商')" :class="{'qy-active':industry=='社区底商'}">社区底商</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span  class="cp f12 choice-list" @click="industryChange('临街门面')" :class="{'qy-active':industry=='临街门面'}">临街门面</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span  class="cp f12 choice-list" @click="industryChange('档口摊位')" :class="{'qy-active':industry=='档口摊位'}">档口摊位</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span  class="cp f12 choice-list" @click="industryChange('购物百货中心')" :class="{'qy-active':industry=='购物百货中心'}">购物百货中心</span>
          </van-col>
          <van-col span="8" class="pr5 pl5 bxs">
            <span class="cp f12 choice-list"  @click="industryChange('其他')" :class="{'qy-active':industry=='其他'}">其他</span>
          </van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>


<script>
  import { setToken , getToken } from '@/utils/auth' // 在cookie中获取用户
  import Vue from 'vue'
  import {Lazyload,Image as VanImage,Divider, Tag , PullRefresh,list,Tabbar, TabbarItem,Search,DropdownMenu, DropdownItem,Popup,Checkbox, CheckboxGroup , Sticky } from 'vant';
  Vue.use(VanImage).use(Divider).use(Tag).use(PullRefresh).use(list).use(Tabbar).use(TabbarItem).use(Search).use(DropdownMenu).use(DropdownItem).use(Popup).use(Checkbox).use(CheckboxGroup);
  Vue.use(Lazyload, {
    lazyComponent: true,
  }).use(Sticky);
  import { getAlListPage} from '@/api/rentout'
  export default {
    name: 'exam',
    data() {
      return {
        pageSize: 6, // 每页条数
        pageIndex: 1, // 页码
        dateList:[], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
        select:'转让',
        checkList: ['可明火', '上水', '下水', '天然气', '外摆区', '货梯'],
        active:'exam',
        rightShow:false,
        rDateList: [],
        rDateList1: [],
        search: '',
        county: '',
        monthlyRentS: '',
        monthlyRentE: '',
        acreageS: '',
        acreageE: '',
        mating: '',
        matingList: [],
        industry: '',
        // dateList: [],
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
      }
    },
    mounted() {
        // console.log(this.$router)
    },

    methods: {
      changeType(path){
        this.$router.replace(path)
      },
      pingUrl(id) {
        return '/rentoutInfo?id='+id
      },
      // getAlListPage() {
      //   getAlListPage({ current: this.currentPage, size: this.pagesize, search: this.search, county: this.county,
      //     monthlyRentS: this.monthlyRentS, monthlyRentE: this.monthlyRentE,
      //     acreageS: this.acreageS, acreageE: this.acreageE,
      //     mating: this.mating, industry: this.industry,type:1 }).then(response => {
      //     let len = response.data.length
      //     this.dateList = this.dateList.concat(response.data);
      //     if(len<this.pagesize){//没有数据了
      //       this.state = 2;
      //     }else{
      //       this.state = 0;
      //     }
      //   }).catch(function(reason) {
      //     this.state = 2;
      //   })
      // },

      getAlListPage() {
        const _self = this
        var data = localStorage.getItem('city');//从本地存储取出
        getAlListPage({ current: this.pageIndex, size: this.pageSize,city:data}).then(response => {
          // let len = response.data.records.length
          // this.dateList = this.dateList.concat(response.data.records);
          // if(len<this.pagesize){//没有数据了
          //   this.state = 2;
          // }else{
          //   this.state = 0;
          // }
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
            _self.dateList = rows
          } else {
            _self.dateList = _self.dateList.concat(rows)
          }


        }).catch(function(reason) {
          // this.state = 2;
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

      // araeChange: function(qycur,name) {
      //   this.state=0
      //   this.qycur = qycur
      //   this.county = name
      //   this.currentPage = 1
      //   this.dateList=[]
      //   this.getAlListPage()
      // },
      // moneyChange: function(zjcur,s,e) {
      //   this.state=0
      //   this.startMoney = ''
      //   this.endMoney = ''
      //   this.zjcur = zjcur
      //   if(s!==0||e!==0){
      //     this.monthlyRentS=s
      //     this.monthlyRentE=e
      //   }else{
      //     this.monthlyRentS=''
      //     this.monthlyRentE=''
      //   }
      //   this.currentPage = 1
      //   this.dateList=[]
      //   this.getAlListPage()
      // },
      // mjChange: function(mjcur,s,e) {
      //   this.state=0
      //   this.mjcur = mjcur
      //   this.startMj = '';
      //   this.endMj = '';
      //   if(s!==0||e!==0){
      //     this.acreageS=s
      //     this.acreageE=e
      //   }else{
      //     this.acreageS=''
      //     this.acreageE=''
      //   }
      //   this.currentPage = 1
      //   this.dateList=[]
      //   this.getAlListPage()
      // },
      // needChange: function() {
      //   this.state=0
      //   console.log(this.need)
      //   if(this.need.length>0){
      //     var s='';
      //     for(var i=0;i<this.need.length;i++){
      //       if(this.need[i]!==''){
      //         s+=this.need[i]+','
      //       }
      //     }
      //     this.mating=s
      //   }else{
      //     this.mating=''
      //   }
      //   this.currentPage = 1
      //   this.dateList=[]
      //   this.getAlListPage()
      // },
      // industryChange(text) {
      //   this.state=0
      //   this.currentPage = 1
      //   this.industry = text
      //   this.dateList=[]
      //   this.getAlListPage()
      // },
      searchRet(){
        this.getAlListPage()
      },
      pingRentoutUrl(id) {
        return '/rentoutInfo?id='+id
      },
      switchTo(path){
        console.log(this.active)
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
      window.scroll(0,0)
      // var ss = this.$route.query.search
      // var county = this.$route.query.county
      // var industry = this.$route.query.industry
      // var acreageS = this.$route.query.acreageS
      // var acreageE = this.$route.query.acreageE
      // var qycur = this.$route.query.qycur
      // var mjcur = this.$route.query.mjcur
      // if(ss&&ss!==''){
      //   this.search=ss
      // }
      // if(county&&county!==''){
      //   this.qycur = qycur
      //   this.county=county
      // }
      // if(industry&&industry!==''){
      //   this.industry=industry
      // }
      // if((acreageS!=0||acreageE!=0)&&typeof(acreageS) != "undefined"){
      //   this.mjcur = mjcur
      //   this.acreageS=acreageS
      //   this.acreageE=acreageE
      // }
      this.getAlListPage()
    },
    // beforeRouteLeave(to, from, next) {
    //   if (to.path == "/exam") {
    //     to.meta.keepAlive = true;
    //   } else {
    //     to.meta.keepAlive = false;
    //   }
    //   next();
    // },

    computed: {

    },
    watch:{

    }
  }
</script>

<style lang="scss">
  body{
    background: #fff;
  }
  #exam{
    .exam-top{position: fixed;z-index: 999;top:0;left:0;width:100%;font-size: 18px;text-align: center;color:#fff;
      background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);}
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

    .br-desc{
      position: absolute;
      width: 100%;
      padding:10px;
      background: rgba(0,0,0,0.5);
      z-index: 2;
      bottom: 0;
      color: #fff;box-sizing: border-box
    }
    
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
      /*padding: 4px;*/
      /*margin-top: 6px;*/
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
    .tag-list span.mj-active{
      border-bottom:none;color: #C51D12;
      position: relative
    }
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

    .van-checkbox__icon--checked .van-icon{    
      background-color: #C81415;
      border-color: #C81415;
    }

    .kailong-up{
      width:0;
      height:0;
      border-right:20px solid transparent;
      border-left:20px solid transparent;
      border-bottom:20px solid #fff;
    }

    .kuicon{
      display: inline-block;
      position: absolute;
      top: 20px;z-index: 22;
      left: -3px
    }

    .personCenter-top{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9;
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);
    }

    .exam-content {
      position: absolute;
      top: 2rem;
    }

    .choice-list{
      width:100%;
      display: block;
      text-align: center;
      background: #eee;
      color: #333;
      padding:5px 0;
      border-radius: 4px;
      margin-top: 8px
    }
  }

</style>
