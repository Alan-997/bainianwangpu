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
                <label class="fb f16">出售</label>
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
                <label class="lh40">选择地区</label>
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
                <label class="lh40">商铺地址</label>
              </van-col>
              <van-col span="18">
                <el-input type="text" v-model="dataForm.addr" placeholder="请填写位置详细信息"   style="width: 100%"/>
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">当前状态</label>
              </van-col>
              <van-col span="18">
                <el-select v-model="dataForm.shopStatus" placeholder="请选择当前状态" style="width: 100%">
                  <el-option label="请选择当前状态" value=""/> <el-option label="经营中" value="经营中"/>
                  <el-option label="空置中" value="空置中"/>
                </el-select>
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">商铺类型</label>
              </van-col>
              <van-col span="18">
                <el-select v-model="dataForm.shopType" placeholder="请选择商铺类型" style="width: 100%">
                  <el-option label="请选择商铺类型" value=""/> <el-option label="商业街店铺" value="商业街店铺"/>
                  <el-option label="写字楼配套" value="写字楼配套"/> <el-option label="社区底商" value="社区底商"/>
                  <el-option label="临街门面" value="临街门面"/> <el-option label="档口摊位" value="档口摊位"/>
                  <el-option label="购物百货中心" value="购物百货中心"/> <el-option label="其他" value="其他"/>
                </el-select>
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
                <label class="lh40">建筑面积</label>
              </van-col>
              <van-col span="18">
                <el-input v-model=" dataForm.acreage " style="width: 150px" placeholder="请输入面积" type="number"/> 平米&nbsp;
              </van-col>
            </van-row>
            <!--<input type="text" placeholder="" class="shopName" style="width:136px;"> m2-->
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">建筑楼层</label>
              </van-col>
              <van-col span="18">
                <van-row>
                  <van-col span="11"><el-input v-model=" dataForm.floor" class="bxs" style="width: 90%" placeholder="请输入所在楼层" type="number"/><span style="display: inline-block;width: 10%;text-align: right">层</span></van-col>
                  <van-col span="1"></van-col>
                  <van-col span="12"><span style="display: inline-block;width: 10%;text-align: right">共：</span><el-input class="bxs" v-model="dataForm.allFloor" style="width: 40%" type="number"/><span style="display: inline-block;width: 10%;text-align: right">层</span></van-col>
                </van-row>
              </van-col>
            </van-row>
          </div>

          <div class="info_form" >
            <van-row>
              <van-col span="24">
                <label class="lh40">价格信息</label>
              </van-col>
              <van-col span="24">
                <p>商铺总价：<el-input v-model=" dataForm.totalPrice " style="width: 160px" placeholder="请输入按月租金" type="number"/> 万元</p>
                <p>预期收益：<el-input v-model=" dataForm.earnings" style="width:160px;" placeholder="请输入预期收益" type="number"/>元/月</p>
              </van-col>
            </van-row>
          </div>



          <div class="info_form" style="">
            <van-row>
              <van-col span="6">
                <label class="lh40">商铺配套</label>
              </van-col>
              <van-col span="18" class="abc">
                <el-checkbox-group v-model="dataForm.matingList" style="width: 90%">
                  <el-checkbox style="width: 30%" label="客梯"/> <el-checkbox style="width: 30%" label="货梯"/>
                  <el-checkbox style="width: 30%" label="中央空调"/><el-checkbox style="width: 30%" label="停车位"/>
                  <el-checkbox style="width: 30%" label="天然气"/><el-checkbox style="width: 30%" label=" 电话/网络"/>
                  <el-checkbox style="width: 30%" label="暖气"/><el-checkbox style="width: 30%" label=" 扶梯"/>
                  <el-checkbox style="width: 30%" label="上水"/><el-checkbox style="width: 30%" label="下水"/>
                  <el-checkbox style="width: 30%" label="排烟"/><el-checkbox style="width: 30%" label="排污"/>
                  <el-checkbox style="width: 30%" label="管煤"/><el-checkbox style="width: 30%" label="380V"/>
                  <el-checkbox style="width: 30%" label="可明火"/><el-checkbox style="width: 30%" label="外摆区"/>
                </el-checkbox-group>
              </van-col>
            </van-row>
          </div>


          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">是否临街</label>
              </van-col>
              <van-col span="18">
                <el-select v-model="dataForm.frontage" placeholder="请选择是否临街" style="width: 100%">
                  <el-option label="请选择是否临街" value=""/> <el-option label="是" value="是"/>
                  <el-option label="否" value="否"/>
                </el-select>
              </van-col>
            </van-row>
          </div>

          <div class="info_form" style="">
            <van-row>
              <van-col span="6">
                <label class="lh40">客流人群</label>
              </van-col>
              <van-col span="18">
                <el-checkbox-group v-model="dataForm.passengerFlowList">
                  <el-checkbox class="mr10" label="办公人群"/> <el-checkbox class="mr10" label="学生人群"/>
                  <el-checkbox class="mr10" label="居民人群"/><el-checkbox class="mr10" label="旅游人群"/>
                  <el-checkbox class="mr10" label="其他"/>
                </el-checkbox-group>
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">公交路线</label>
              </van-col>
              <van-col span="18">
                <el-input v-model=" dataForm.busRoute " placeholder="请输入公交路线" style="width: 100%"/>
              </van-col>
            </van-row>
          </div>



          <div class="info_form" >
            <van-row>
              <van-col span="6">
                <label class="lh40">商铺卖点</label>
              </van-col>
              <van-col span="18">
                <el-input v-model=" dataForm.sellingPoints " :rows="12"  type="textarea" placeholder="请输入商铺卖点" style="width:100%"/>
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

                <el-input type="text" style="width: 100%" v-model=" dataForm.mobile "  placeholder="请输入联系电话"  />
              </van-col>
            </van-row>
          </div>
          <div class="info_form" style="">
            <label class="lh40">上传照片</label>
            <van-row >
              <van-col span="24">
                <el-upload
                  ref="upload"
                  :before-upload="beforeUploadPicture"
                  :on-preview="handlePictureCardPreview"
                  :on-progress="uploadProgress"
                  :on-remove="insideRemove"
                  :on-success="insideSuccess"
                  :on-error="uploadError"
                  :show-file-list="true"
                  :limit="10"
                  :file-list="appImgUrl"
                  :action="uploadUrl"
                  :http-request="uploadFile"
                  accept="image/png, image/jpeg,"
                  list-type="picture-card">
                  <i class="el-icon-plus"/>
                </el-upload>
                <el-button class="t-center" type="success" @click="subPicForm">上传图片</el-button>
              </van-col>
            </van-row>

            <el-dialog
              :visible.sync="imgVisible"
              class="preview-modal"
              append-to-body>
              <img
                :src="dialogImageUrl"
                width="50%"
                alt="photo">
            </el-dialog>
          </div>
        </form>
      </div>
      <div class="mt40" style="text-align: center">
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
<!--&lt;!&ndash;      <van-tabbar-item icon="fire-o" @click="switchTo('/businessCircle')">商圈</van-tabbar-item>&ndash;&gt;-->
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
  import {getAreaListcityname,getListByclassificationId,getSellInfoById,uploadFileImg,getAreaList,getclientInfo, saverentout, saveSell } from '@/api/rentout'
  export default {
    name: 'publish',
    data() {
      return {
        classificationList:[],
        formDate: {},
        sellId:null,
        cityList: [],
        areaList: [],
        token:'',
        user:{},
        show:false,
        transitionName:'',
        active:2,
        uploadComplete: false, // 图片上传完成状态
        imgVisible: false, // 上传图片预览
        dialogImageUrl: '', // 图片预览地址
        uploadUrl: 'http://wp.wangpu100.com/zupuk/webApi/uploadFileImg',
        // uploadUrl: 'http://localhost:8887/zupuk/webApi/uploadFileImg',
        // uploadUrl: 'http://wp.wangpu100.com/system/uploadFile',
        appImgUrl: [],
        dataForm: {
          mobile:'',
          contacts:'',
          /* longitude: '',
           latitude: '',*/
          passengerFlowList: [],
          matingList: []
        },
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
      this.sellId = this.$route.query.sellId
      if (this.sellId) {
        this.$route.meta.name = '编辑发布'
        this.getSellInfoById()
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
        getAreaListcityname({ name: '贵州'  }).then(response => {
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
      getSellInfoById(){
        getSellInfoById({ sellId: this.sellId }).then(response => {
          console.log(response.data)
          this.dataForm = response.data

          for (var i = 0, ilen = this.dataForm.imgList.length; i < ilen; i++) {
            this.appImgUrl.push({
              id: this.dataForm.imgList[i].id,
              url: this.dataForm.imgList[i].url,
              fileName: this.dataForm.imgList[i].fileName
            })
          }

          this.dataForm.passengerFlowList = this.dataForm.passengerFlow.split(',')
          this.dataForm.matingList = this.dataForm.mating.split(',')
          console.log(typeof this.dataForm.discuss)

        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },
      uploadFile(file) {
        this.formDate.append('file', file.file)
      },
      subPicForm() {
        var _this = this
        this.formDate = new FormData()
        this.$refs.upload.submit()
        var loadingee = this.$loading({
          lock: true,
          text: '正在上传',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        uploadFileImg(this.formDate).then(response => {
          loadingee.close()
          for (var i = 0; i < response.data.length; i++) {
            var proUrl = {
              id: null,
              url: response.data[i],
              fileName: ''
            }
            this.appImgUrl.push(proUrl)
          }
          _this.$message.success('上传成功')
        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      },
      save() {
        var _this = this
        _this.dataForm.imgList = _this.appImgUrl
        console.log('保存出租信息')
        console.log(_this.rentoutForm)
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
        saveSell(_this.dataForm).then(response => {
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
      changeType(pbType) {
       // alert(pbType)
      },
      // 上传图片前调用方法
      beforeUploadPicture(file) {
        var isJPG = false
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif') {
          isJPG = true
        }
        if (!isJPG) {
          this.$message.error('只能支持 jpeg, jpg, png, gif 等图片格式!')
          return false
        }
        if (file.size > 10 * 1024 * 1024) {
          this.$message.error('上传图片或文件不能大于10M')
          return false
        }
      },
      // 上传图片时调用
      uploadProgress(event, file, fileList) {
        this.uploadComplete = false
      },
      // 上传图片成功
      insideSuccess(res, file, fileList) {
        console.log(fileList)
        console.log(file.response.data)
        console.log(res)
        this.uploadComplete = true
        var proUrl = {
          id: null,
          url: file.response.data,
          fileName: file.name
        }
        alert(file.response.data)
        this.appImgUrl.push(proUrl)
      },
      // 上传图片出错
      uploadError(file, fileList) {
        this.$message.error('上传出错')
      },
      // 移除图片
      insideRemove(file, fileList) {
        console.log(fileList)
        console.log('---==--')
        console.log(file)
        for (let i = 0; i < this.appImgUrl.length; i++) {
          if (this.appImgUrl[i].url === file.url) {
            this.appImgUrl.splice(i, 1)
          }
        }
      },
      // 图片预览
      handlePictureCardPreview(file) {
        console.log('-----' + file)
        this.dialogImageUrl = file.url
        this.imgVisible = true
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
        if (_this.dataForm.addr === '' || !_this.dataForm.addr) {
          _this.$message.error('请填写地址')
          return false
        }
        if (_this.dataForm.shopStatus === '' || !_this.dataForm.shopStatus) {
          _this.$message.error('请选择商铺状态')
          return false
        }
        if (_this.dataForm.shopType === '' || !_this.dataForm.shopType) {
          _this.$message.error('请选择商铺类别')
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

        if (_this.dataForm.totalPrice === '' || !_this.dataForm.totalPrice) {
          _this.$message.error('请填写售价')
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
