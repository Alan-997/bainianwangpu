<template>
  <div id="publish">
    <transition :name="transitionName">
      <div class="fh" v-if="show" style="width: 100%;">
        <div class="bgf fh">
          <div class="publish-top">
            <van-nav-bar
              title="免费发布"
              left-arrow
              @click-left="back"
            />
          </div>
          <div class="container fh">
            <div class="">
              <form>
                <div class="info_form" style="padding-top: 8px">

                  <el-radio-group v-model="pbType" @change="changeType">
                    <el-radio label="1">商铺出租</el-radio>
                    <el-radio label="3">商铺转让</el-radio>
                    <el-radio label="2">商铺出售</el-radio>
                  </el-radio-group>
                </div>
                <div class="info_form">
                  <van-row>
                    <van-col span="6">
                      <label class="lh40">信息标题</label>
                    </van-col>
                    <van-col span="18">
                      <el-input  v-model="dataForm.title " placeholder="请输入信息标题" style="width: 100%" />
                    </van-col>
                  </van-row>

                </div>
                <!-- <div class="info_form" v-if="pbType===1||pbType==='1'">
                   <label>信息类型</label>
                   <el-radio-group v-model="dataForm.type">
                     <el-radio :label="2">转租</el-radio>
                     <el-radio :label="3">转让</el-radio>
                     <el-radio :label="1">出租</el-radio>
                   </el-radio-group>
                 </div>-->
                <div class="info_form">
                  <van-row>
                    <van-col span="6">
                      <label class="lh40">商铺地址</label>
                    </van-col>
                    <van-col span="9">
                      <el-select v-model="dataForm.county" placeholder="请选择商铺位置" style="width: 100%">
                        <el-option label="请选择商铺位置" value=""/> <el-option label="南明" value="南明"/>
                        <el-option label="云岩" value="云岩"/> <el-option label="花溪" value="花溪"/>
                        <el-option label="白云" value="白云"/> <el-option label="乌当" value="乌当"/>
                        <el-option label="清镇" value="清镇"/> <el-option label="观山湖" value="观山湖"/>
                        <el-option label="开阳" value="开阳"/> <el-option label="修文" value="修文"/>
                        <el-option label="息烽" value="息烽"/> <el-option label="小河" value="小河"/>
                        <el-option label="其他" value="其他"/>
                      </el-select>
                    </van-col>
                    <van-col span="8">
                      <el-input type="text" v-model="dataForm.addr" placeholder="请填写位置详细信息" class="shopName"  style="width: 100%"/>
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
                        <el-option label="请选择经营行业" value=""/> <el-option label="餐饮美食" value="餐饮美食"/>
                        <el-option label="美容美发" value="美容美发"/> <el-option label="服饰鞋包" value="服饰鞋包"/>
                        <el-option label="休闲娱乐" value="休闲娱乐"/> <el-option label="百货超市" value="百货超市"/>
                        <el-option label="生活服务" value="生活服务"/> <el-option label="电器通讯" value="电器通讯"/>
                        <el-option label="汽修美容" value="汽修美容"/> <el-option label="医疗器械" value="医疗器械"/>
                        <el-option label="家具建材" value="家具建材"/> <el-option label="教育培训" value="教育培训"/>
                        <el-option label="酒店宾馆" value="酒店宾馆"/><el-option label="其他" value="其他"/>
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
                        <van-col span="12"><span style="display: inline-block;width: 10%;text-align: right">共：</span><el-input class="bxs" v-model="dataForm.allFloor" style="width: 80%" type="number"/><span style="display: inline-block;width: 10%;text-align: right">层</span></van-col>
                      </van-row>
                    </van-col>
                  </van-row>
                </div>

                <div class="info_form" v-if="pbType===2||pbType==='2'">
                  <van-row>
                    <van-col span="24">
                      <label class="lh40">价格信息</label>
                    </van-col>
                    <van-col span="24">
                      <p>商铺总价：<el-input v-model=" dataForm.totalPrice " style="width: 160px" placeholder="请输入按月租金" type="number"/> 元/月</p>
                      <p>预期收益：<el-input v-model=" dataForm.earnings" style="width:160px;" placeholder="请输入预期收益" type="number"/>元/月</p>
                    </van-col>
                  </van-row>

                </div>
                <div class="" v-if="pbType===1||pbType==='1'||pbType===3||pbType==='3'">
                  <p class="mt10">按月租金：<el-input v-model=" dataForm.monthlyRent " style="width: 160px" placeholder="请输入商铺总价" type="number"/> 万/元</p>
                  <p class="mt10">支付方式：付<el-input v-model=" dataForm.payWayf " style="width: 50px" type="number"/>月
                    &nbsp;&nbsp;&nbsp;押<el-input v-model=" dataForm.payWayy " style="width: 50px" type="number"/> 月</p>
                  <p class="mt10">
                    转让费：<el-input v-model=" dataForm.transferFee " style="width: 100px" type="number"/>万元
                  </p>
                  <p class="mt10">
                    起租期：<el-input v-model=" dataForm.tenancy " style="width:100px" type="number"/>月
                  </p>
                </div>

                <div class="info_form" style="">
                  <van-row>
                    <van-col span="6">
                      <label class="lh40">商铺配套</label>
                    </van-col>
                    <van-col span="18" class="abc">
                      <el-checkbox-group v-model="dataForm.matingList" style="width: 100%">
                        <el-checkbox style="width: 50%" label="客梯"/> <el-checkbox style="width: 50%" label="货梯"/>
                        <el-checkbox style="width: 50%" label="中央空调"/><el-checkbox style="width: 50%" label="停车位"/>
                        <el-checkbox style="width: 50%" label="天然气"/><el-checkbox style="width: 50%" label=" 电话/网络"/>
                        <el-checkbox style="width: 50%" label="暖气"/><el-checkbox style="width: 50%" label=" 扶梯"/>
                        <el-checkbox style="width: 50%" label="上水"/><el-checkbox style="width: 50%" label="下水"/>
                        <el-checkbox style="width: 50%" label="排烟"/><el-checkbox style="width: 50%" label="排污"/>
                        <el-checkbox style="width: 50%" label="管煤"/><el-checkbox style="width: 50%" label="380V"/>
                        <el-checkbox style="width: 50%" label="可明火"/><el-checkbox style="width: 50%" label="外摆区"/>
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

                <div class="info_form"  v-if="pbType===1||pbType==='1'||pbType===3||pbType==='3'">
                  <van-row>
                    <van-col span="6" style="padding-top: 2px">
                      <label>详细信息</label>
                    </van-col>
                    <van-col span="18">
                      <el-input v-model=" dataForm.about " :rows="12" type="textarea" placeholder="请输入详细介绍" style="width:100%"/>
                    </van-col>
                  </van-row>


                </div>
                <div class="info_form" v-if="pbType===2||pbType==='2'">
                  <van-row>
                    <van-col span="6">
                      <label class="lh40">商铺卖点</label>
                    </van-col>
                    <van-col span="18">
                      <el-input v-model=" dataForm.sellingPoints " :rows="12" type="textarea" placeholder="请输入商铺卖点" style="width:100%"/>
                    </van-col>
                  </van-row>


                </div>
                <div class="info_form" style="">
                  <van-row>
                    <van-col span="6">
                      <label class="lh40">上传照片</label>
                    </van-col>
                    <van-col span="18">
                      <el-upload
                        :before-upload="beforeUploadPicture"
                        :on-preview="handlePictureCardPreview"
                        :on-progress="uploadProgress"
                        :on-remove="insideRemove"
                        :on-success="insideSuccess"
                        :on-error="uploadError"
                        :show-file-list="true"
                        :file-list="appImgUrl"
                        :action="uploadUrl"
                        accept="image/png, image/jpeg,"
                        list-type="picture-card">
                        <i class="el-icon-plus"/>
                      </el-upload>
                    </van-col>
                  </van-row>
                  <el-dialog
                    :visible.sync="imgVisible"
                    class="preview-modal"
                    append-to-body>
                    <img
                      :src="dialogImageUrl"
                      width="100%"
                      alt="photo">
                  </el-dialog>
                </div>
                <div class="info_form">
                  <van-row>
                    <van-col span="6">
                      <label class="lh40">联系人</label>
                    </van-col>
                    <van-col span="18">
                      <el-input type="text" style="width: 100%" v-model="dataForm.contacts" placeholder="请输入联系人" class="shopName" />
                    </van-col>
                  </van-row>

                </div>
                <div class="info_form">
                  <van-row>
                    <van-col span="6" style="padding-top: 3px">
                      <label class="">联系电话</label>
                    </van-col>
                    <van-col span="18">
                      <el-input type="text" style="width: 100%" v-model=" dataForm.telphone " placeholder="请输入联系电话" class="shopName" />
                    </van-col>
                  </van-row>

                </div>
              </form>
            </div>
            <div style="text-align: center">
              <button class="info_from_button" style="cursor: pointer;"  @click="save">确认发布</button>
            </div>
            <div class="fh pt20 pb5"></div>


          </div>
          <div class="mt40"></div>
        </div>

      </div>
    </transition>


  </div>

</template>
<script>
  import Vue from 'vue'
  import { Tabbar, TabbarItem,Search,DropdownMenu, DropdownItem,Swipe, SwipeItem } from 'vant';
  Vue.use(Tabbar).use(TabbarItem).use(Search).use(DropdownMenu).use(DropdownItem).use(Swipe).use(SwipeItem);
  import { saverentout, saveSell } from '@/api/rentout'
  // import { mapGetters } from 'vuex'
	export default {

		data() {
			return {
        show:false,
        transitionName:'',
        uploadComplete: false, // 图片上传完成状态
        imgVisible: false, // 上传图片预览
        dialogImageUrl: '', // 图片预览地址
        uploadUrl: process.env.BASE_API + '/zupuk/webApi/uploadImg',
        appImgUrl: [],
        dataForm: {
         /* longitude: '',
          latitude: '',*/
          passengerFlowList: [],
          matingList: []
        },
				pbType: '1'
			}

		},
/*
		,
		components: {
			ShopInfo,

		},*/
    computed: {
      ...mapGetters([
        'userId',
        'name'
      ])
    },
    created() {
      this.show=true;
      this.transitionName =getToken("transitionName");
		  var _this = this
      _this.dataForm.contacts = _this.name

    },
		methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      save() {
        var _this = this
        _this.dataForm.imgList = _this.appImgUrl
        console.log('保存出租信息')
        console.log(_this.rentoutForm)
        if(_this.pbType===1||_this.pbType==='1'||_this.pbType===3||_this.pbType==='3'){
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

          if(_this.pbType===3||_this.pbType==='3'){
            _this.dataForm.type = 3
          }else{
            _this.dataForm.type = 1
          }

          _this.dataForm.clienteleId = _this.userId
          saverentout(_this.dataForm).then(response => {
            loading.close()
            this.$alert('提交成功，等待审核！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              }
            });
          }).catch(function(reason) {
            loading.close()
            console.log('catch:', reason)
          })
        }else if(_this.pbType===2||_this.pbType==='2'){
          var validateFl = _this.validateSFun()
          if (!validateFl) {
            return
          }
          const loading = _this.$loading({
            lock: true,
            text: '正在保存，请稍等',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          _this.dataForm.clienteleId = _this.userId
          saveSell(_this.dataForm).then(response => {
            loading.close()
            this.$alert('提交成功，等待审核！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              }
            });
          }).catch(function(reason) {
            loading.close()
            console.log('catch:', reason)
          })
        }
      },
      changeType() {
        console.log('111111')
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
        if (_this.dataForm.monthlyRent === '' || !_this.dataForm.monthlyRent) {
          _this.$message.error('请填写按月租金')
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
		}
	}
</script>


<style lang="scss">
  body{
    background: #f5f5f5;
  }
  #publish{
    input,
    select,
    button {
      border: 0;
      border: 1px solid #ccc;
      outline: none;
    }

    .publish-top{font-size: 18px;text-align: center;color:#fff; background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);}
    .van-nav-bar{background-color: rgba(0,0,0,0)}
    .van-hairline--bottom::after{border-bottom-width: 0;}
    .van-nav-bar__title{color:#fff;font-size: 18px}
    .van-nav-bar .van-icon{color:#fff;font-size: 18px}
    .container_info {
      background: #fff;
      padding-top: 20px;
      padding-bottom: 40px;
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
  }

</style>
