<template>
  <div id="publish">
    <transition :name="transitionName">
      <div class="fh" style="width: 100%;">
        <van-nav-bar
          title="常见问题"
          left-arrow
          left-text=""
          @click-left="back"
        />
      </div>
    </transition>

    <div class="container fh pt20 mt40 ml20">
      <label class="fb f18">无法接受短信验证码?</label>
      <div>
        <p class="mt20">
          1.网络通讯异常可能会造成短信丢失或发送延迟,请重新获取或稍后重试。
        </p>
        <p class="mt20">
          2.请核您的手机是否已停机或开启了飞行模式,或者屏蔽了该类短信。您可进入短信箱货垃圾短信箱中查找。
        </p>
      </div>
      <div class="fh pt20 pb5"></div>
    </div>


  </div>
</template>


<script>
  import Vue from 'vue'
  import {Form,Divider , Field ,NavBar } from 'vant'
  Vue.use(Form).use(Divider).use(Field).use(NavBar);
  export default {
    data() {
      return {
      };
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    mounted(){
    },
    methods: {
      back() {
        this.$router.go(-1);//返回上一层
      },
    }
  }
</script>

<style lang="scss">
  body{
    background: #f5f5f5;
  }
  #publish {
    padding-bottom: 50px;

    .publish-top {
      width: 100%;
      padding-bottom: 10px;
      background: linear-gradient(left, #84d24c 20%, #ead233 100%);
    }
  }

  .van-nav-bar .van-icon{color: #000000;}
  /*.van-nav-bar{ background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);}*/
  .van-nav-bar__title{color: #0a0a0a
  }

</style>
