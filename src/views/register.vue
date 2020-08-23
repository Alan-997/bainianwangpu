<template>
  <div id="home" >
    <div class="" v-bind:style="{ height: height}">
      <div >
        <van-nav-bar
          title=""
          left-arrow
          @click-left="back"
        />
      </div>

      <div class="ml20 mr20 mb20 pt20 mt20">
        <div >
          <label style="font-size: 20px">欢迎登陆百年旺铺</label>
        </div>
        <!--        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="mt40" >-->

        <div class="mt40">

          <van-cell-group>
            <van-field  v-model="ruleForm2.mobile" placeholder="请输入手机号" type="tel" label="+86 >" clearable/>
            <hr >
          </van-cell-group>
          <van-cell-group v-show="!smtags">
            <van-row>
              <van-col span="20">
                <van-field  v-model="ruleForm2.smscode"  placeholder="请输入验证码" type="text" label="" clearable/>
              </van-col>
              <van-col span="4">
                <van-count-down :time="time" type="text" format=" ss 秒"/>
              </van-col>
            </van-row>
            <hr>
          </van-cell-group>
        </div>
        <div class="mt5 cae">
          <p>
            未注册的手机号码验证后自动创建百年旺铺账户
          </p>
        </div>
        <button v-show="smtags" class="mt30 login-button"   @click="smscode" style="width: 100%;">获取短信验证码</button>
        <button v-show="!smtags" class="mt30 login-button"  @click="submitForm('ruleForm2')" style="width: 100%;">登录</button>
        <van-row >
          <van-col class="mt20 f12" span="12">
            <p @click="topasslogin">密码登录</p>
          </van-col>
          <van-col class="mt20 f12" span="12">
            <p @click='question'>无法接受验证码？</p>
          </van-col>
        </van-row>
        <div class="mt40 pt40">
          <div class="mt40 pt40">
            <div class="mt40 pt40">
              <p>
                登录代表同意<a @click="toagreement">百年旺铺用户协议</a>,并授权使用你的百年旺铺账号信息
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Vue from 'vue'
  import {CountDown ,Form, Divider, Field, NavBar, Toast, Cell, CellGroup } from 'vant'
  Vue.use(CountDown).use(Form).use(Divider).use(Field).use(NavBar).use(Cell).use(CellGroup);
  import {getclientInfo, smscode,login ,applogin} from '@/api/rentout'
  export default {

    data() {
      return {
        time: 60 * 1000,
        smtags:true,
        // 验证码初始值
        ruleForm2: {
          mobile:'',
          smscode: ''
        },
        mobile:'',
        token:'',
        height: ''
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
    created() {
      this.ruleForm2.mobile=''
      this.ruleForm2.smscode=''
    },
    methods: {
      // ...mapMutations(['changeLogin']),
      back(){
        // this.$router.go(-1);//返回上一层
        this.$router.push('/personCenter');
      },
      topasslogin(){
        this.$router.push('/login');
      },
      question(){
        this.$router.push('/question');
      },
      toagreement(){
        this.$router.push('/agreement');
      },
      smscode(){
        this.mobile= this.ruleForm2.mobile
        if(this.mobile===null || this.mobile==='' || this.mobile.length!=11){
          Toast("手机号为空或者格式有误,请输入手机号");
          return
        }
        // this.smtags=false
        // return
        smscode({mobile: this.mobile}).then(response => {
          console.log(response.data)
          if(response.code===0){
            this.smtags=false
            Toast.success(response.data);
          }else {
            Toast.fail(response.msg);
          }

        }).catch(function(reason) {

        })
      },
      submitForm(formName) {
        let _this = this
        if(this.mobile===null || this.mobile==='' || this.mobile.length!=11){
          Toast("手机号为空或者格式有误,请输入手机号");
          return
        }
        if(this.ruleForm2.smscode===''){
          Toast('请输入验证码');
          return
        }
        var loginForm = {
          mobile: this.ruleForm2.mobile,
          smscode: this.ruleForm2.smscode
        }
        login(loginForm).then(response => {
          console.log(response.data)
          if(response.code===0){
            _this.token=response.data
            localStorage.setItem('token',_this.token);
            // this.getclientInfo()
            this.$router.push({ path: this.redirect || '/personCenter' })
          }
          if(response.data===null){
            localStorage.removeItem('token');
            // localStorage.removeItem('user');
            // this.smtags=true
            // this.time=60 * 1000
            Toast.fail(response.msg);
          }
          loading.close()
        }).catch(function(reason) {
          loading.close()
          console.log('catch:', reason)
        })
      },
      getclientInfo(){
        this.token= localStorage.getItem('token')
        if(this.token===null){
          this.$router.push('/login')
        }
        getclientInfo({token:  this.token }).then(response => {
          console.log(response.data)
          // this.user= response.data
          // const info = JSON.stringify(response.data)
          // localStorage.setItem('rowObj', JSON.stringify(info))
          const rowObj = JSON.stringify(response.data)
          window.sessionStorage.setItem('rowObj', rowObj)

        }).catch(function(reason) {

        })
      },
    },


  }
</script>

<style  lang="scss" scope>
  body{
    background: #fff6f6;
  }
  #home {
    padding-bottom: 50px;

    .home-top {
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100%;
      font-weight: bold;
      font-size: 22px;
      text-align: center;
      color: #000033;
      background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);
    }

    .shop-box {
      overflow: hidden;
      display: block;
      transition: all 0.4s ease-in;
    }

    .shop-box img {
      display: block;
      width: 100%;
    }

    .shop-box p {
      line-height: 20px
    }

    .masonry {
      -moz-column-count: 2; /* Firefox */
      -webkit-column-count: 2; /* Safari 和 Chrome */
      column-count: 2;
      -moz-column-gap: 0;
      -webkit-column-gap: 0;
      column-gap: 0;
      width: 100%;
      margin: 0 auto;
    }
  }
  #login{
    .van-nav-bar{background: none;}
    .van-hairline--bottom::after {
      border-bottom-width: 0;
    }
    .van-nav-bar .van-icon {
      color: #f3e8e8;
    }
    .bg-box{}
    .form-box{
      width: 100%;
      background: rgba(203, 177, 177, 0.6);
      padding: 25px;
      border-radius: 6px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      height: auto;
    }
    .el-button--primary span{color:#fff }
    .el-tabs__nav{
      margin: 0 auto;
      width: 220px;
      float:none;

    }
    .el-form-item__label{
      color:#fff;
      font-size: 18px;
    }
  }
  .van-nav-bar .van-icon{color: #000000;}
  .van-nav-bar{ background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);}
  .van-nav-bar__title{color:#fff}
  .login-button {
    height: 60px;
    background-color: skyblue ;
    border: none;
    border-radius: .5rem;
  }

</style>
