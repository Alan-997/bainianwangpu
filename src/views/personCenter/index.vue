<template>
  <div id="personCenter" >
    <transition :name="transitionName">
      <div class="fh"  style="width: 100%;">
        <div class="personCenter-top">
          <div class="fh" style="position: fixed;z-index: 99;top:0;left: 0;width: 100%">
            <van-nav-bar
              title=""
              left-arrow
              @click-left="back"
            />
          </div>
          <div class="mt20 pt40 fh ml10" >
            <div v-show="tokentages">
              <van-row>
                <router-link  to="/register" >
                  <van-col span="9">
                    <van-image   src="../../../static/images/logo.png" fit="cover" width="80%" height="80px" radius="30px"  lazy-load />
                  </van-col>
                  <van-col span="12" >
                    <div class="fb c666 f16 mt30">点击登录</div>
                  </van-col>
                </router-link>
              </van-row>
            </div>

            <div v-show="!tokentages" class="user-bar">
              <van-row>
                <van-col span="9">
                  <van-image   src="../../../static/images/background.jpg" fit="cover" width="80%" height="80px" radius="30px"  lazy-load />
                </van-col>
                <van-col span="14">
                  <div class="fb " @click="showPopup">
                    <div class="van-ellipsis  c13 f16 mt10 ">{{user.mobile}}</div>
                    <div class="van-ellipsis  c666 f16 mt5 ">{{user.realName}}</div>
                  </div>
                </van-col>
              </van-row>
              <van-icon name="setting-o"   @click="acShow=true" class="user-exit"/>
            </div>
            <van-popup v-model="showpopup" closeable position="right" :style="{ height: '25%' }">
              <div  style="background: #faf6f6">
                <van-field v-model="realName" disabled label="用户名" />
                <van-field v-model="realNames"  placeholder="输入用户名"/>
                <van-button type="info" block @click="updateUserName(realNames)">保存</van-button>
              </div>
            </van-popup>
          </div>
        </div>

        <!-- <div class=" bgf fh container">
          <div class="mt10">
          <ul  style="list-style: none;display: inline" v-for="item in firstList" :key="item.id">
            <li class="t-center  " style="display: inline-block;width: 25%">
              <div @click="gotopublish(item.id)">
                <van-image   :src="item.icon" round fit="cover" width="50%" />
                <p class="f14 " style="color:black;">{{item.name}}</p>
              </div>
            </li>
          </ul>
          </div>
        </div> -->
        
        <div class=" bgf ">
          <span  class="release f15 fb ml20">我的发布</span>
          <van-grid :column-num="4" class="grid">
            <van-grid-item icon="../../../static/images/rent.png" to="/publish" icon-size="40px" text="我要出租" />
            <van-grid-item icon="../../../static/images/transfer.png" to="/publish" icon-size="40px" text="我要转让" />
            <van-grid-item icon="../../../static/images/sell.png" to="/publish" icon-size="40px" text="我要出售" />
            <van-grid-item icon="../../../static/images/rent.png" to="/publish" icon-size="40px" text="我要求租" />
            <van-grid-item icon="../../../static/images/shops.png" to="/businessCircleRelease" icon-size="40px" text="我的商圈" />
            <van-grid-item icon="../../../static/images/food.png" to="/publish" icon-size="40px" text="老店美食" />
            <van-grid-item icon="../../../static/images/specialty.png" to="/publish" icon-size="40px" text="特产" />
            <van-grid-item icon="../../../static/images/recruitment.png" to="/publish" icon-size="40px" text="招聘" />
            <van-grid-item icon="../../../static/images/help.png" to="/publish" icon-size="40px" text="力帮" />
            <van-grid-item icon="../../../static/images/farmproducts.png" to="/publish" icon-size="40px" text="农产品" />
          </van-grid>
        </div>  


        <div class="bgf  container" v-show="!tokentages">
          <span  class="f15 fb ml5 van-cell">我的服务</span>
          <van-grid :column-num="4" class="grid">
            <van-grid-item icon="../../../static/images/rent.png" to="/publishInfo" icon-size="40px" text="我的商铺" />
            <van-grid-item icon="../../../static/images/shops.png" to="/businessCircleInfo" icon-size="40px" text="我的商圈" />
            <van-grid-item icon="../../../static/images/collection.png" to="/collectionInfo" icon-size="40px" text="我的收藏" />
          </van-grid>
        </div>
        <van-divider/>
      </div>
    </transition>



    <van-action-sheet
      v-model="acShow"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      @cancel="acShow=false"
    />
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
  import Vue from 'vue'
  import {editUserName,getclientInfo,logout } from '@/api/rentout'
  import {Field ,Popup ,Image as VanImage ,Tag,Divider, Lazyload ,Icon, Tabbar, TabbarItem, Cell, CellGroup, ActionSheet, Toast, Grid, GridItem } from 'vant';
  Vue.use(Field).use(Popup).use(VanImage).use(Tag).use(Divider).use(Lazyload).use(Icon).use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup).use(ActionSheet);
  Vue.use(Lazyload, {
    lazyComponent: true,
  }).use(Grid).use(GridItem);
  export default {
    name: 'personCenter',
    data() {
      return {
        firstList:[{id:1, name:'我要出租',icon: '../../../static/images/1.jpg'},
          {id:2, name:'我要转让', icon: '../../../static/images/2.jpg'},
          {id:3, name:'我要求租',icon: '../../../static/images/3.jpg'},
          {id:4, name:'我要出售',icon: '../../../static/images/4.jpg'},

        ],
        realName:'',
        realNames:'',
        id:null,
        showpopup: false,
        tokentages:true,
        token: null,
        user:{},
        show:false,
        transitionName:'',
        active:'personCenter',
        acShow:false,
        actions: [
          { name: '确认退出' },
        ]
      }
    },
    created() {
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      this.getToken()
      this.getclientInfo()
      // const userinfo = JSON.parse(window.sessionStorage.getItem('rowObj'))
      // this.user=userinfo
      this.realName=this.user.realName

    },
    computed: {

    },
    watch:{

    },

    methods: {
      showPopup() {
        this.showpopup = true;
      },
      getToken(){
        this.token= localStorage.getItem('token')
        if(this.token===null){
          this.tokentages=true
        }else {
          this.tokentages=false
        }
      },

      getclientInfo(){
        this.token= localStorage.getItem('token')
        if(this.token===null){
          this.tokentages=true
          return
        }
        getclientInfo({token:  this.token }).then(response => {
          console.log(response.data)
          if(response.code===0 && response.data!=null){
            localStorage.removeItem('user');
            // localStorage.removeItem('token');
            this.user= response.data
            // const info = JSON.stringify(response.data)
            // localStorage.setItem('rowObj', JSON.stringify(info))
            // const rowObj = JSON.stringify(response.data)
            // window.sessionStorage.setItem('rowObj', rowObj)
            // this.user= response.data
            this.realName=this.user.realName
          }else {
            localStorage.removeItem('token');
          }


        }).catch(function(reason) {

        })
      },
      updateUserName(realNames){
        if(realNames===''|| realNames===null){
          Toast('请输入用户名');
          return
        }
        let _this = this
        var loginForm = {
          id: this.user.id,
          realName: realNames
        }
        editUserName(loginForm).then(response => {
          if(response.code===0){
            this.realNames=''
            this.getclientInfo()
            // location.reload()
            this.showpopup = false

          }
          if(response.data===null){

            Toast.fail(response.msg);
          }
        }).catch(function(reason) {
        })
      },

      switchTo(path){
        console.log(this.active)
       this.$router.push({
         path:path,
         replace:true
       })
      },
      gotopublish(id){
        // if(this.token===null){
        //   Toast('请先登录！！！')
        //   return
        // }
        if(id===1){
          this.$router.push('/publish')
        }else  if(id===2){
          this.$router.push('/publish')
        }else  if(id===3){
          this.$router.push('/publishwanted')
        }else {
          this.$router.push('/publishsell')
        }

        // this.$router.push('/publish')
      },
      back(){
        this.$router.push('/')
      },
      goto(){
        this.token= localStorage.getItem('token')
        if( this.token===null){
          this.$router.push('/login')
        }else {
          this.$router.push('/publish')
        }
        // this.$router.push('/publish')
      },
      onSelect(item) {
        this.token= localStorage.getItem('token')
        if(this.token===null ){
          return
        }else {
          localStorage.removeItem('token');
          logout({token: this.token }).then(response => {
            console.log(response.data)
            if(response.code===0){
              this.getToken()
            }
          }).catch(function(reason) {
          })
        }
        this.acShow = false;
        this.$router.push('/personCenter')
      }

    },
    mounted() {
      // this.show=true
      // this.transitionName =getToken("transitionName")
    }
  }
</script>

<style lang="scss">
  body{
    background: #ffffff;
  }
  #personCenter{
    /*padding-bottom: 10px;*/
    .personCenter-top{
      width: 100%;
      padding-bottom: 10px;
      background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);
    }
    .info-img-box{
      width: 80px;height: 80px;border-radius: 100%;overflow: hidden;
    }
    .cell-icon{position: absolute;right: -4px;top: 4px;}
    .van-cell{padding: 10px 5px}
    .van-cell__value{padding-right: 15px}
    .info-img-box img{width: 100px;height: 100px}
    .bntdanger{display: block;width: 80%;margin: 20px auto;background-color: #BBBB00;border-color: #FFBB00;}
    .resk-load{width: 100%;position: absolute;left: 0;top: -24px;z-index: 2}
    .resk-load-box{width: 100%;overflow: hidden;box-shadow: 0 1px 10px 0px #D2D2D2;height: 160px;background: #fff;border-radius: 6px;}

  }
  .van-nav-bar .van-icon{color:#fff;}
  .van-nav-bar{ background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);}
  .van-nav-bar__title{color:#fff}

  // 用户登录栏
  .user-bar {
    position: relative;
  }

  .user-exit {
    position: absolute;
    top: 8px;
    right: 20px;
  }
  // 九宫格
  .van-grid-item__icon img {
    width: 28px;
    height: 28px;
  } 

  // 我的发布
  .release {
    height: 40px;
    line-height: 40px;
  }
</style>
