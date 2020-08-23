<template>
  <div id="publish">
    <transition :name="transitionName">
      <div class="fh " v-if="show" style="width: 100%;">
        <div class="fh" style="position: fixed;z-index: 99;top:0;left: 0;width: 100%">
          <van-nav-bar
            title="免费发布"
            left-arrow
            left-text=""
            @click-left="back"
          />
        </div>
      </div>
    </transition>

    <div class="container fh">
      <div class="">
        <form>
          <div class="info_form" style="padding-top: 8px">
            <van-row>
              <van-col span="6">
                <label >信息类型</label>
              </van-col>
              <van-col span="6">
                <label class="fb f16">求租</label>
              </van-col>
            </van-row>
          </div>

          <div class="info_form" style="padding-top: 8px">
            <van-row>
              <van-col span="6">
                <label class="lh40">信息标题</label>
              </van-col>
              <van-col span="18">
                <el-input  v-model="dataForm.title " placeholder="请输入信息标题" style="width: 100%" />
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">意向区域</label>
              </van-col>
              <van-col span="9">
                <el-select v-model="dataForm.city" style="width: 100%" placeholder="请选择城市" @change="exchengProvinceCode()">
                  <el-option
                    v-for="item in cityList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name"/>
                </el-select>
              </van-col>
              <van-col span="9">
                <el-select v-model="dataForm.county" style="width: 100%" placeholder="请选择区县">
                  <el-option
                    v-for="item in areaList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name"/>
                </el-select>
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">意向地址</label>
              </van-col>
              <van-col span="18">
                <el-input type="text" v-model="dataForm.street" placeholder="请填写位置详细信息"   style="width: 100%"/>
              </van-col>
            </van-row>
          </div>


          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">经营行业</label>
              </van-col>
              <van-col span="18">
                <el-select v-model="dataForm.industry" placeholder="请选择经营行业" style="width: 100%">
                  <el-option label="请选择经营行业" value=""/>
                  <el-option v-for="item in classificationList" :key="item.id" :label="item.name" :value="item.name"/>
                </el-select>
              </van-col>
            </van-row>
          </div>



          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">意向面积</label>
              </van-col>
              <van-col span="18">
                <el-input v-model=" dataForm.acreageStart " style="width: 50%" placeholder="请输入面积"/> ~
                <el-input v-model=" dataForm.acreageEnd " style="width: 50%" placeholder="请输入面积"/> 平米

<!--                <el-input v-model=" dataForm.acreage " style="width: 150px" placeholder="请输入面积" type="number"/> 平米&nbsp;-->
              </van-col>
            </van-row>
            <!--<input type="text" placeholder="" class="shopName" style="width:136px;"> m2-->
          </div>



          <div class="info_form" >
            <van-row>
              <van-col span="24">
                <label class="lh40">承受租金</label>
              </van-col>
              <van-col span="6">
                <el-checkbox v-model="dataForm.mianyi" style="width: 10%; color:black">面议</el-checkbox>
              </van-col>
              <van-col span="18">
                  <el-input v-model=" dataForm.monthlyRentStart " :disabled="isChecked" style="width: 50%" placeholder="请输入承受租金" /> ~
                  <el-input v-model=" dataForm.monthlyRentEnd " :disabled="isChecked" style="width: 50%" placeholder="请输入承受租金"/> 元/月
              </van-col>
            </van-row>
          </div>








          <div class="info_form" >
            <van-row>
              <van-col span="6">
                <label class="lh40">详细意向</label>
              </van-col>
              <van-col span="18">
                <el-input v-model=" dataForm.about " :rows="12"  type="textarea" placeholder="详细意向" style="width:100%"/>
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">联系人</label>
              </van-col>
              <van-col span="18">
                <el-input type="text" style="width: 100%" v-model="dataForm.contacts" value="user.realName" placeholder="请输入联系人" />
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6" style="padding-top: 3px">
                <label class="">联系电话</label>
              </van-col>
              <van-col span="18" >
                <!--                <div v-if="token==null">-->
                <!--                  <el-input type="text" style="width: 100%" v-model=" dataForm.telphone "  placeholder="请输入联系电话"  />-->
                <!--                  <el-input type="text" style="width: 50%" v-model=" dataForm.smcode "  placeholder="请输入验证码"  />-->
                <!--                  <el-button >获取验证码</el-button>-->
                <!--                </div>-->
                <!--                <div v-else>-->
                <!--                  <el-input type="text" style="width: 100%" v-model=" dataForm.telphone "  placeholder="请输入联系电话"  />-->
                <!--                </div>-->

                <el-input type="text" style="width: 100%" v-model=" dataForm.mobile"  placeholder="请输入联系电话"  />
              </van-col>
            </van-row>
          </div>
        </form>
      </div>
      <div style="text-align: center">
        <!--        <button class="info_from_button" style="cursor: pointer;"  @click="save">确认发布</button>-->
        <!--        <van-button class="mt20"  round type="info" style="cursor: pointer;width: 50%"  @click="save">确认发布</van-button>-->
        <el-button type="success" @click="save" >确认发布</el-button>
        <el-button type="danger" @click="goBack()">取消</el-button>
      </div>
      <div class="fh pt20 pb5"></div>
    </div>

<!--    <van-tabbar v-model="active">-->
<!--      <van-tabbar-item icon="home-o" @click="switchTo('/')">首页</van-tabbar-item>-->
<!--      <van-tabbar-item icon="browsing-history-o" @click="switchTo('/findShop')">找商铺</van-tabbar-item>-->
<!--      &lt;!&ndash;      <van-tabbar-item icon="fire-o" @click="switchTo('/businessCircle')">商圈</van-tabbar-item>&ndash;&gt;-->
<!--      <van-tabbar-item icon="bulb-o" @click="switchTo('/exam')">成交案例</van-tabbar-item>-->
<!--      <van-tabbar-item icon="user-circle-o" @click="switchTo('/personCenter')">我的</van-tabbar-item>-->
<!--    </van-tabbar>-->
  </div>
</template>


<script>
  import { getToken,removeStorage } from '@/utils/auth' // 在cookie中获取用户
  import Vue from 'vue'
  import {
    Cell,
    CellGroup,
    ActionSheet,
    Tabbar,
    TabbarItem,
    Search,
    DropdownMenu,
    DropdownItem,
    Swipe,
    SwipeItem,
    Toast
  } from 'vant';
  Vue.use(Cell).use(CellGroup).use(ActionSheet).use(Tabbar).use(TabbarItem).use(Search).use(DropdownMenu).use(DropdownItem).use(Swipe).use(SwipeItem);
  import {getAreaListcityname,getListByclassificationId,getWantedInfoById,uploadFileImg,getAreaList,getclientInfo, saveWanted, saveSell } from '@/api/rentout'
  export default {
    name: 'publish',
    data() {
      return {
        classificationList:[],
        wantedId:null,
        cityList: [],
        areaList: [],
        token:'',
        user:{},
        show:false,
        transitionName:'',
        active:2,
        dataForm: {
          mobile:'',
          contacts:'',
          /* longitude: '',
           latitude: '',*/
        },
        isChecked: '',
      }
    },
    computed: {

    },
    watch:{

    },
    created() {
      this.token= localStorage.getItem('token')
      // alert( this.token)
      this.show=true;
      this.wantedId = this.$route.query.wantedId
      if (this.wantedId) {
        this.$route.meta.name = '编辑发布'
        this.getWantedInfoById()
      } else {
        this.$route.meta.name = '新增发布'
      }
      // this.getRentoutInfoById()
      this.getListByclassificationId()
      this.getclientInfo()
      this.getAreaList()
      var _this = this
      // _this.dataForm.contacts =_this.user.realName
      // _this.dataForm.telphone= _this.user.mobile
      // alert( _this.user.mobile)
    },
    methods: {
      getclientInfo(){
        this.token= localStorage.getItem('token')
        if(this.token===null){
          return
        }
        getclientInfo({token:  this.token }).then(response => {
          console.log(response.data)
          this.user= response.data
          this.dataForm.mobile=this.user.mobile
          // this.dataForm.contacts=this.user.realName
          // alert(  this.dataForm.contacts)
        }).catch(function(reason) {

        })
        // this.user= JSON.parse(localStorage.getItem('user'))
      },
      goBack() {
        // this.$router.push({ path: '/publishInfo' })
        this.$router.go(-1);//返回上一层
      },
      back(){
        this.$router.go(-1);//返回上一层
      },
      switchTo(path){
        // console.log(this.$router)
        this.$router.replace(path)
      },
      exchengProvinceCode() {
        getAreaListcityname({ name: this.dataForm.city }).then(response => {
          console.log(response.data)
          this.areaList = response.data
        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },
      getAreaList() {
        getAreaListcityname({ name: '贵州' }).then(response => {
          console.log(response.data)
          this.cityList = response.data
        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },
      getListByclassificationId(){
        getListByclassificationId({classificationId: 20}).then(response => {
          console.log(response.data)
          this.classificationList = this.classificationList.concat(response.data)
        }).catch(function(reason) {

        })
      },
      getWantedInfoById(){
        getWantedInfoById({ wantedId: this.wantedId }).then(response => {
          console.log(response.data)
          this.dataForm = response.data

        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },
      save() {
        var _this = this
        console.log('保存出租信息')
        var validateFl = _this.validateRFun()
        if (!validateFl) {
          return
        }
        const loading = _this.$loading({
          lock: true,
          text: '正在保存，请稍等',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        // _this.dataForm.clienteleId = _this.userId
        _this.dataForm.token=localStorage.getItem('token')
        saveWanted(_this.dataForm).then(response => {
          loading.close()
          // this.$alert('提交成功，等待审核！', '提示', {
          //   confirmButtonText: '确定',
          //   // callback: action => {
          //   //   location.reload() // 为了重新实例化vue-router对象 避免bug
          //   // }
          // });

          Toast.success('提交成功，等待审核！');
          this.$router.push('/personCenter')
        }).catch(function(reason) {
          loading.close()
          console.log('catch:', reason)
        })

      },


      validateRFun() {
        var _this = this
        if (_this.dataForm.title === '' || !_this.dataForm.title) {
          _this.$message.error('请填写标题')
          return false
        }


        if (_this.dataForm.city === '' || !_this.dataForm.city) {
          _this.$message.error('请选择城市')
          return false
        }
        if (_this.dataForm.county === '' || !_this.dataForm.county) {
          _this.$message.error('请选择区县')
          return false
        }
        if (_this.dataForm.street === '' || !_this.dataForm.street) {
          _this.$message.error('请填写地址')
          return false
        }
        if (_this.dataForm.acreageStart === '' || !_this.dataForm.acreageStart) {
          _this.$message.error('请填写意向最小面积')
          return false
        }
        if (_this.dataForm.acreageEnd === '' || !_this.dataForm.acreageEnd) {
          _this.$message.error('请填写意向最大面积')
          return false
        }
        if (_this.dataForm.monthlyRentStart === '' || !_this.dataForm.monthlyRentStart) {
          _this.$message.error('请填写意向最小租金')
          return false
        }
        if (_this.dataForm.monthlyRentEnd === '' || !_this.dataForm.monthlyRentEnd) {
          _this.$message.error('请填写意向最大租金')
          return false
        }

        if (_this.dataForm.industry === '' || !_this.dataForm.industry) {
          _this.$message.error('请选择经营行业')
          return false
        }
        if (_this.dataForm.contacts === '' || !_this.dataForm.contacts) {
          _this.$message.error('请填写联系人')
          return false
        } if (_this.dataForm.mobile === '' || !_this.dataForm.mobile) {
          _this.$message.error('请填写联系电话')
          return false
        }

        return true
      },
      validateSFun() {
        var _this = this
        /* if (_this.dataForm.monthlyRent === '' || !_this.dataForm.monthlyRent) {
           _this.$message.error('请填写按月租金')
           return false
         }*/
        return true
      }
    },
    mounted() {
      this.show=true
      // this.transitionName =getToken("transitionName")
    }
  }
</script>

<style lang="scss">
  body{
    background: #f5f5f5;
  }
  #publish{
    padding-bottom: 50px;
    .publish-top{
      width: 100%;
      padding-bottom: 10px;
      background: linear-gradient(left, #84d24c 20%, #ead233 100%);
    }
    .info-img-box{
      width: 100px;height: 100px;border-radius: 50%;overflow: hidden;
      margin: 0 auto;
    }
    .cell-icon{position: absolute;right: -4px;top: 4px;}
    .van-cell{padding: 10px 5px}
    .van-cell__value{padding-right: 15px}
    .info-img-box img{width: 100px;height: 100px}
    .bntdanger{display: block;width: 80%;margin: 20px auto;background-color: #8bd525;border-color: #ded415;}
    .resk-load{width: 100%;position: absolute;left: 0;top: -24px;z-index: 2}
    .resk-load-box{width: 100%;overflow: hidden;box-shadow: 0 1px 10px 0px #D2D2D2;height: 160px;background: #fff;border-radius: 6px;}

  }

  .info_form {
    margin-top: 25px;
    position: relative;
  }

  .info_form::before {
    content: '';
    display: block;
    width: 2px;
    height: 15px;
    background: #d9cfcf;
    position: absolute;
    top: 12px;
    left: -8px;
  }

  .info_form:nth-child(9)::before {
    top: 5px;
  }

  .info_form:nth-child(14)::before {
    top: 5px;
  }

  .info_form:last-child::before {
    top: 5px;
  }

  .info_item label {
    font-size: 16px;
    color: #000;
    margin-right: 15px;
    padding-top: 0px;
  }

  .shopName {
    width: 40%;
    height: 29px;
    padding-left: 10px;
    border-radius: 1px;
  }

  .options {
    width: 160px;
    height: 29px;
    margin-right: 10px;
  }

  .container {
    position: relative;
    top: 30px;
  }

  .container_info .el-checkbox-group {
    display: inline;
  }
  .abc .el-checkbox{
    margin-right:0
  }
  .info_from_button {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #352cad;
    color: #fff;
    margin-top: 50px;
    border-color: #6b7dbd;
    border-radius: 20px;
  }

  .editorMenu {
    border: 1px solid #ccc;
  }

  .editor {
    min-height: 400px; //编辑框最小高度
    height: auto; //编辑框高度超过最小高度会根据内容高度自适应
    margin-left: 82px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader {
    display: inline-block;
    margin-left: 76px;
  }

  .info_upload,
  .info_upload_info {
    font-size: 16px;
    position: absolute;
    bottom: 150px;
    left: 0;
    color: #535459;
  }

  .info_upload_info {
    left: 280px;
    bottom: 80px;
    color: #717171;
    font-size: 12px;
  }
  .el-radio__input.is-checked+.el-radio__label {
    color: #148fc8;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #67c42f;
    background: #d3d750;
  }
  .el-input__inner:focus,.el-textarea__inner:focus
  {
    border-color: #1474c8;
  }
  .el-select .el-input.is-focus .el-input__inner{
    border-color: #1474c8;
  }
  .van-nav-bar .van-icon{color: #000000;}
  .van-nav-bar{ background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);}
  .van-nav-bar__title{color:#fff}

</style>
