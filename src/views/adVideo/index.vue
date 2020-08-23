<template>
  <div id="advideo" :style="{'width' : '100%','overflow': 'hidden'}">
     <div style="position: absolute;width: 100%;z-index: 99;">
      <van-nav-bar
         title=""
         left-arrow
         @click-left="back"
       />
       <div :style="{'position': 'absolute','width': '100%','z-index': '100','top': pageHeight*0.6 + 'px'}">
      <van-row class="ml20 mr20 ">

        <van-col  span="24" class="f14 t-right c000" >
          <div @click="dianzan(rentoutForm.id)" v-show="dianz">
          <van-icon size="50" name="good-job-o" color="#959595"/>
          <div style="margin-right: 15px;color: #fff;">{{rentoutForm.viewnum}}</div>
          </div>
          <div @click="dianzan(rentoutForm.id)" v-show="!dianz">
            <van-icon size="50" name="good-job" color="#959595"/>
            <div style="margin-right: 15px;color: #fff;">{{rentoutForm.viewnum}}</div>
          </div>
        </van-col>
        <van-col  span="24" class="f14 t-right mt10 c000">
          <div @click="share">
            <van-icon size="50" name="share" color="#959595"/>
          </div>
          <van-share-sheet
            v-model="showShare"
            title=""
            :options="options"
            @select="onSelect"
          />
        </van-col>
        <router-link  :to="pingUrl(rentoutForm.id)" class="">
        <van-col span="24">
<!--          <div class="pb10 mb5" style="margin-top: 80px;">-->
            <div class="mt20" >
            <span class="cfff  f20">{{rentoutForm.title}}</span>
          </div>
        </van-col>
        </router-link>
      </van-row>
      </div>
    </div>
    <div >
      <van-row>
        <van-col span="24" >
          <div  v-for="(item,index) in rentoutForm.videosList" :key="index" :style="{'height' : pageHeight+'px','background-color': 'black'}">
            <video :src="item.url" controls="controls" width="100%" height="100%" autoplay="autoplay" controlsList="nodownload"/>
          </div>
        </van-col>
      </van-row>

    </div>
  </div>
</template>


<script>
  import Vue from 'vue'
  import {Lazyload, Toast,ShareSheet,Swipe, SwipeItem, NavBar, ImagePreview ,Cell} from 'vant';
  Vue.use(Lazyload).use(ImagePreview).use(Toast).use(ShareSheet).use(Swipe).use(SwipeItem).use(NavBar).use(Cell);
  import { getBsInfoById ,getBusiness ,dianzanAd ,getAd} from '@/api/businessCircle'
  export default {
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
        transitionName:'',
        rentoutForm: {},
        rentoutId: '',
        pageHeight:0

      }
    },
    created() {
      // window.scroll(0,0)
      this.rentoutId = this.$route.query.id
      this.getrentoutInfo()
      this.pageHeight = window.screen.availHeight
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
      pingUrl(id) {
        return '/bsInfo?id=' + id
      },

      into(id) {

        window.scroll(0, 0)
        this.rentoutId = id
        this.getrentoutInfo()
      },

      getrentoutInfo() {
        var _this = this
        //rentoutId: this.rentoutId
        getBsInfoById({adId: this.rentoutId}).then(response => {
          _this.rentoutForm = response.data

        }).catch(function (reason) {
          console.log('catch:', reason)
        })
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
                this.dianz=true
                Toast(response.data)
              }else if(response.data==='点赞成功'){
                this.dianz=false
                Toast(response.data)
              }
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
        let a = scrollTop / 500;
        if (a > 1) {
          a = 1
        }
        this.opacity = a;
      },
      back() {
        // this.$router.go(-1);//返回上一层
        this.$router.back()
      }
    },

    destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
      window.removeEventListener('scroll', this.scrollToTop)
    },
    mounted() {
      window.addEventListener('scroll', this.scrollToTop)
      this.show=true
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
    background: #ffffff;
  }
  #advideo {
    .exam-top {
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100%;
      font-size: 18px;
      text-align: center;
      color: #fff;
      background: linear-gradient(left, #000000 20%, #070707 100%);
    }

    .van-nav-bar .van-icon {
      color: #ffffff;
    }

    .van-nav-bar {
      background: linear-gradient(left, #000000 20%, #000000 100%);
    }

    .van-nav-bar__title {
      color: #fff
    }
  }


</style>
