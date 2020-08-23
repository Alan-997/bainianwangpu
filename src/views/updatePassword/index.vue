<template>
  <div id="updatePassword" class="bgf" >
    <transition :name="transitionName" >
      <div class="fh" v-if="showPage" :style="{ minHeight:(height+'px')}" style="width: 100%;">
        <div class="updatePassword-top">
          <van-nav-bar
            title=""
            left-arrow
            @click-left="back"
          />
        </div>

        <form style="">
          <div class="ml20 mr20 mb20 pt20 ">
            <div class="mb20">
              <label style="font-size: 20px">忘记密码</label>
            </div>
            <van-cell-group>
              <van-field  v-model="mobile" placeholder="请输入手机号" type="tel" label="+86 >" clearable/>
              <hr >
            </van-cell-group>
<!--            <van-cell-group>-->
<!--              <van-field clearable label="旧密码" type="password" v-model="password" placeholder="请输入您的旧密码" />-->
<!--              <hr >-->
<!--            </van-cell-group>-->

            <van-cell-group>
              <van-field clearable label="新密码" type="password" v-model="newPassword" placeholder="请输入您新的密码" />
              <hr >
            </van-cell-group>
            <van-cell-group>
              <van-field clearable label="确认密码" type="password" v-model="passwordConfirmation" placeholder="请再次输入您的新密码" />
              <hr >
            </van-cell-group>
          </div>
        </form>
        <button class="mt30 login-button"  @click="handleSubmit" style="width: 100%;">确定</button>

<!--        <van-button class="login-bnt" type="info" @click="handleSubmit">确定</van-button>-->
      </div>
    </transition>
    <commFooter :text="text" />

  </div>
</template>


<script>
  // import { getToken } from '@/utils/auth'
  import Vue from 'vue'
  import {NavBar,Field,Toast,CellGroup} from 'vant';
  Vue.use(NavBar).use(CellGroup).use(Field).use(Toast);
  import { passwordUpdate } from '@/api/rentout'
  export default {
    name: 'updatePassword',
    data() {
      return {
        showPage:false,
        transitionName:'',
        text:'',
        mobile:'',
        // password:'',
        newPassword:'',
        passwordConfirmation:'',
      }
    },
    computed: {
      errors() {
        return this.$vuerify.$errors // 错误信息会在 $vuerify.$errors 内体现
      }
    },
    vuerify: {
      // password: {
      //   test: /\w{6,}/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
      //   message: '旧密码至少6位字符'
      // },
      newPassword: {
        test: /\w{6,}/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
        message: '新密码至少6位字符'
      },
      passwordConfirmation: {
        test: function() {
          if (this.passwordConfirmation !== this.newPassword) {
            return false;
          } else {
            return  true;
          }
        },
        message: '两次密码输入不一致'
      }
    },
    watch:{

    },
    methods: {
      handleSubmit() {
        if (this.$vuerify.check()) { // 手动触发校验所有数据
          this.text ="";
          const toast1= Toast.loading({
            mask: true,
            message: '修改中...',
            duration:20000,
          });
          passwordUpdate({
            mobile:this.mobile,
            // password:this.password,
            newPassword:this.newPassword,
            passwordConfirmation:this.passwordConfirmation,
          }).then(res=>{
            let th = this;
            toast1.clear();
            if(res.code==0){
              // Toast.success({message:'修改成功',onOpened:function () {
              //     th.back()
              //   }});
              this.$router.go(-1);//返回上一层
            }else{
              Toast.fail(res.msg);
            }
          }).catch(function (e) {
            Toast.fail("服务出错");
          })
        } else {
          let key = Object.keys(this.$vuerify.$errors)
          this.text =this.$vuerify.$errors[key[0]]
        }
      },
      switchTo(path){
        this.$router.replace(path)
      },
      go(lik){
        this.$router.push(lik)
      },
      back(){
        this.$router.go(-1);//返回上一层
      },

    },
    mounted() {
      this.height = document.documentElement.clientHeight || document.body.clientHeight;
      this.showPage = true;
      // this.transitionName =getToken("transitionName")
    }
  }
</script>

<style lang="scss">
  body{
    background: #f5f5f5;
  }
  #updatePassword{
    .updatePassword-top{font-size: 18px;text-align: center;color:#fff;background: #c6ad30;}
    .van-nav-bar{background-color: rgba(0,0,0,0)}
    .van-hairline--bottom::after{border-bottom-width: 0;}
    .van-nav-bar__title{color:#fff;font-size: 18px}
    .van-nav-bar .van-icon{color:#fff;font-size: 18px}
    .left-search{position: absolute;font-size: 20px;top:12px;left: 30px;color:#D2D2D2}
    .login-bnt{width:100%;display: block;margin-top: 40px}
    .van-dropdown-menu{height: 24px}
  }
  .login-button {
    height: 60px;
    background-color: skyblue ;
    border: none;
    border-radius: .5rem;
  }

</style>
