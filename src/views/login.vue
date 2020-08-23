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

        <div class="mt40">
          <van-cell-group>
            <van-field  v-model="ruleForm2.mobile" placeholder="请输入手机号" type="tel" label="+86 >" clearable/>
            <hr >
          </van-cell-group>
          <van-cell-group>
            <van-field  v-model="ruleForm2.password"  placeholder="请输入密码" type="password" label="" clearable/>
            <hr>
          </van-cell-group>
          <button class="mt30 login-button"  @click="submitForm('ruleForm2')" style="width: 100%;">登录</button>
          <van-row >
            <van-col class="mt20 f12" span="16">
              <p @click="tosmslogin">验证码登录</p>
            </van-col>
            <van-col class="mt20 f12" span="8">
              <p @click="editpass">忘记密码</p>
            </van-col>
          </van-row>
        </div>
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
  import {Form, Divider, Field, NavBar, Toast, Cell, CellGroup, Button, Col, Row } from 'vant'
  Vue.use(Form).use(Divider).use(Field).use(NavBar).use(Cell).use(CellGroup).use(Button).use(Col).use(Row);
  import { getclientInfo,login ,applogin} from '@/api/rentout'
  export default {

    data() {
      return {
        // 验证码初始值
        ruleForm2: {
          mobile:'',
          password: ''
        },
        token:'',
        height: ''
      };
    },
    watch: {
      // $route: {
      //   handler: function(route) {
      //     this.redirect = route.query && route.query.redirect
      //   },
      //   immediate: true
      // }
    },
    mounted(){
    },
    methods: {
      // ...mapMutations(['changeLogin']),
      back(){
        // this.$router.go(-1);//返回上一层
        this.$router.push('/personCenter');
      },
      tosmslogin(){
        this.$router.push('/register');
      },
      toagreement(){
        this.$router.push('/agreement');
      },
      editpass(){
        this.$router.push('/updatePassword');
      },
      submitForm(formName) {
        let _this = this
        var loginForm = {
          mobile: this.ruleForm2.mobile,
          password: this.ruleForm2.password
        }
        if(this.ruleForm2.mobile===''||this.ruleForm2.mobile.length!=11||this.ruleForm2.password===''){
          Toast('请输入手机号或者密码');
          return
        }
        applogin(loginForm).then(response => {
          console.log(response.data)
          if(response.code===0){
            _this.token=response.data
            localStorage.setItem('token',_this.token);
            // this.getclientInfo()
            this.$router.push({ path: this.redirect || '/personCenter' })
          }
          if(response.data===null){
            localStorage.removeItem('token');
            // this.$router.push('/login');
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
    }
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
