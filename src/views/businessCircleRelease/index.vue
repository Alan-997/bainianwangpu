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

    <div class="container fh mt40" >
      <div class="">
        <form>
          <div class="info_form" >
            <van-row>
              <van-col span="6">
                <label class="lh40">广告基本信息</label>
              </van-col>
              
            </van-row>
          </div>

          <div class="info_form" >
            <van-row>
              <van-col span="6">
                <label class="lh40">信息标题</label>
              </van-col>
              <van-col span="18">
                <el-input  v-model="rentoutForm.title " placeholder="请输入信息标题" style="width: 100%" />
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">选择地区</label>
              </van-col>
              <van-col span="9">
                <el-select v-model="rentoutForm.citycode" style="width: 100%" placeholder="请选择城市" @change="exchengProvinceCode()">
                  <el-option
                    v-for="item in cityList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"/>
                </el-select>
              </van-col>
              <van-col span="9">
                <el-select v-model="rentoutForm.areacode" style="width: 100%" placeholder="请选择区县">
                  <el-option
                    v-for="item in areaList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"/>
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
                <el-input type="text" v-model="rentoutForm.addr" placeholder="请填写位置详细信息"   style="width: 100%"/>
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">经营行业</label>
              </van-col>
              <van-col span="18">
                <el-select v-model="rentoutForm.classificationId" placeholder="请选择经营行业" style="width: 40%" @change="iChange">
                  <el-option v-for="item in classificationList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              -
                <el-select v-model="rentoutForm.categoryId" placeholder="请选择行业详细" style="width: 40%" >
                  <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </van-col>
            </van-row>
          </div>

          <div class="info_form"  v-show="isshow" style="">
            <van-row>
              <van-col span="6">
                <label class="lh40">配套设施</label>
              </van-col>
              <van-col span="18" class="abc">
                <el-checkbox-group v-model="rentoutForm.matingList" style="width: 90%">
                  <el-checkbox label="预约发票"/> <el-checkbox label="可自助入住"/>
                  <el-checkbox label="健身房"/> <el-checkbox label="复式loft"/>
                  <el-checkbox label="厨房"/> <el-checkbox label="森林吸氧"/>
                  <el-checkbox label="休闲度假"/> <el-checkbox label="安全联盟"/>
                  <el-checkbox label="隔音好"/> <el-checkbox label="近景湖"/>
                  <el-checkbox label="主题酒店"/> <el-checkbox label="情侣约会"/>
                  <el-checkbox label="停车场"/><el-checkbox label="学校周边"/>
                  <el-checkbox label="溜溜住"/><el-checkbox label=" 近火车站"/>
                  <el-checkbox label="影视主题"/><el-checkbox label=" 即时确认"/>
                  <el-checkbox label="干净卫生"/><el-checkbox label="电竞酒店"/>
                  <el-checkbox label="电竞先锋"/><el-checkbox label="商务出行"/>
                  <el-checkbox label="新开业/新装修"/><el-checkbox label="公益商家"/>
                  <el-checkbox label="水床"/><el-checkbox label="放心洗漱"/>
                  <el-checkbox label="圆床"/><el-checkbox label="投影设备"/>
                  <el-checkbox label="共享充电宝"/><el-checkbox label="浴缸"/>
                </el-checkbox-group>
              </van-col>
            </van-row>
          </div>

          <div class="info_form"  >
            <van-row>
              <van-col span="6" style="padding-top: 2px">
                <label>描述</label>
              </van-col>
              <van-col span="18">
                <el-input v-model=" rentoutForm.notice " :rows="6" type="textarea" placeholder="请输入详细介绍" style="width:100%"/>
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label class="lh40">联系人</label>
              </van-col>
              <van-col span="18">
                <el-input type="text" style="width: 100%" v-model="rentoutForm.contacts" value="user.realName" placeholder="请输入联系人" />
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6" style="padding-top: 3px">
                <label class="">联系电话</label>
              </van-col>
              <van-col span="18" >
                <el-input type="text" style="width: 100%" v-model=" rentoutForm.mobile "  placeholder="请输入联系电话"  />
              </van-col>
            </van-row>
          </div>

        <div class="info_form">
            <van-row>
              <van-col span="6" style="padding-top: 3px">
                <label class="">联系手机</label>
              </van-col>
              <van-col span="18" >
                <el-input type="text" style="width: 100%" v-model=" rentoutForm.mobile "  placeholder="请输入联系手机"  />
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6" style="padding-top: 3px">
                <label class="">到期时间</label>
              </van-col>
              <van-col span="18" >
                <el-date-picker
                  v-model="rentoutForm.expirationTime"
                  :picker-options="pickerOptions"
                  clearable
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择到期时间"/>
              </van-col>
            </van-row>
          </div>

          <div class="info_form">
            <van-row>
              <van-col span="6" style="padding-top: 3px">
                <label class="">营业时间</label>
              </van-col>
              <van-col span="18" >
                <el-time-picker
                v-model="rentoutForm.openStartTime"
                clearable
                value-format="HH:mm"
                format="HH:mm"
                type="time"
                placeholder="选择开始时间"/>

                <el-time-picker
                v-model="rentoutForm.openEndTime"
                clearable
                value-format="HH:mm"
                format="HH:mm"
                placeholder="选择结束时间"/>
              </van-col>
            </van-row>
          </div>

          <div class="info_form"  >
            <van-row>
              <van-col span="6" style="padding-top: 2px">
                <label>视频集合</label>
              </van-col>
              <van-col span="18">
                <div v-for="item in imgList" :key="item.id">
                  <img :src="item.url" height="200" width="30%">
                </div>
                <div v-for="item in videosList" :key="item.id">
                  <video :src="item.url" height="180" width="70%" controls="controls"/>
                </div>
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
                <el-button style="text-align: center" type="success" @click="subPicForm">上传图片</el-button>
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

          <div class="info_form" style="">
            <label class="lh40">上传视频</label>
            <van-row >
              <van-col span="24">
                <el-upload
                  ref="upload5"
                  :before-upload="beforeUploadPicture5"
                  :on-preview="handlePictureCardPreview5"
                  :on-progress="uploadProgress5"
                  :on-remove="insideRemove5"
                  :on-success="insideSuccess5"
                  :on-error="uploadError5"
                  :show-file-list="true"
                  :file-list="appImgUrl5"
                  :action="uploadUrl"
                  :auto-upload="false"
                  :http-request="uploadFile5"
                  limit="1"
                  multiple
                  accept=" video/mp4, video/ogg, video/flv, video/avi, video/wmv, video/rmvb"
                  list-type="picture-card">
                  <i class="el-icon-plus"/>
                </el-upload>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="subPicForm5">上传到服务器</el-button>
              </van-col>
            </van-row>
            <!-- <el-dialog
              :visible.sync="imgVisible5"
              class="preview-modal"
              append-to-body>
              <video
              :src="dialogImageUrl"
              width="100%"
              alt="photo"/>
            </el-dialog> -->
          </div>
        </form>
      </div>

      <div class="mt40" style="text-align: center">
       <el-button type="success" @click="save" >保存</el-button>
        <el-button type="danger" @click="goBack()">取消</el-button>
      </div>
      <div class="fh pt20 pb5"></div>
    </div>
  </div>
</template>


<script>
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
  import {saveAd, getAreaList, getClassificationListpublish, getByclassificationList, getBsInfoById , uploadFileWater, uploadFileVideo} from '@/api/businessCircle'
  export default {
    name: 'publish',
    data() {
      return {
        isshow:false,
        classificationList:[],
        formDate: {},
        rentoutId:null,
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
        rentoutForm: {
        matingList: [],
        longitude: '',
        latitude: '',
        title: '',
        addr: ''
      },
      pickerOptions: { // 限制时间不让选择今天以前的
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
    },
        categoryList: [],
        matingList: [],
        imgList: [],
        // myHeaders: {
        //   Authorization: getToken()
        // },
        appImgUrl5: [],
        videosList: [],
        imgVisible5: '',
      }
    },
    computed: {

    },
    watch:{

    },
    created() {
    var _this = this
    this.adId = this.$route.query.adId
    _this.token=localStorage.getItem('token');
      if(_this.token===null){
          Toast.success('请登录')
      }
   
    if (this.adId) {
      this.$route.meta.title = '编辑广告信息'
      this.getrentoutInfo()
    } else {
      this.$route.meta.title = '新增广告信息'
    }
    this.getAreaList()
    this.getClassificationListpublish()
    },
    methods: {
      uploadFile5(file) {
        this.formDate5.append('file', file.file)
      },
      subPicForm5() {
      var _this = this
      this.formDate5 = new FormData()
      this.$refs.upload5.submit()
      var loadingee = this.$loading({
        lock: true,
        text: '正在上传',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      uploadFileVideo(this.formDate5).then(response => {
        loadingee.close()
        for (var i = 0; i < response.data.length; i++) {
          var proUrl = {
            id: null,
            url: response.data[i],
            fileName: ''
          }
          this.appImgUrl5.push(proUrl)
          this.videosList.push(proUrl)
        }
        _this.$message.success('上传成功')
      }).catch(function(reason) {
        console.log('catch:', reason)
      })
    },
    // 上传图片前调用方法
    beforeUploadPicture5(file) {
      var isJPG = false
      if (file.type === 'video/mp4' || file.type === 'video/ogg' || file.type === 'video/flv' || file.type === 'video/avi' || file.type === 'video/wmv' || file.type === 'video/rmvb') {
        isJPG = true
      }
      // if (!isJPG) {
      //   alert('只能支持 mp4, ogg, flv, avi, wmv, rmvb 等图片格式!')
      //   // this.$message.error('只能支持 mp4, ogg, flv, avi, wmv, rmvb 等图片格式!')
      //   return
      // }
      /* if (file.size > 50 * 1024 * 1024) {
        this.$message.error('上传图片或文件不能大于50M')
        return false
      }*/
    },
    // 图片预览
    handlePictureCardPreview5(file) {
      // console.log('-----' + file)
      this.dialogImageUrl = file.url
      this.imgVisible5 = true
    },
    // 上传图片时调用
    uploadProgress5(event, file, fileList) {
      // this.uploadComplete = false
    },
    // 移除图片
    insideRemove5(file, fileList) {
      console.log(fileList)
      console.log('---==--')
      console.log(file)
      for (let i = 0; i < this.appImgUrl5.length; i++) {
        if (this.appImgUrl5[i].url === file.url) {
          this.appImgUrl5.splice(i, 1)
        }
      }
    },
    // 上传图片成功
    insideSuccess5(res, file, fileList) {
      console.log(fileList)
      console.log(file.response.data)
      console.log(res)
      // this.uploadComplete = true
      for (var i = 0; i < fileList.length; i++) {
        var proUrl = {
          id: null,
          url: fileList[i].response.data,
          fileName: fileList[i].name
        }
        this.appImgUrl5.push(proUrl)
      }
    },
    // 上传图片出错
    uploadError5(file, fileList) {
      this.$message.error('上传出错')
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
        getAreaList({ pcode: this.rentoutForm.citycode }).then(response => {
        // console.log(response.data)
        this.areaList = response.data
      }).catch(function(reason) {
        console.log('catch:', reason)
      })
      },
      getClassificationListpublish() {
        getClassificationListpublish({ }).then(response => {
          // console.log(response.data)
          this.classificationList = response.data
        }).catch(function(reason) {
          console.log('catch:', reason)
        })
    },
     iChange(item) {
      if (item === 33) {
        this.isshow = true
      } else {
        this.isshow = false
      }
      if (item) {
        getByclassificationList({ classificationId: item }).then(response => {
          console.log(response.data)
          this.categoryList = response.data
        }).catch(function(reason) {
          console.log('catch:', reason)
        })
      }
    },
      getAreaList() {
         getAreaList({ pcode: '520000' }).then(response => {
        // console.log(response.data)
        this.cityList = response.data
      }).catch(function(reason) {
        // console.log('catch:', reason)
      })
      },
      getListByclassificationId(){
        getListByclassificationId({classificationId: 20}).then(response => {
          console.log(response.data)
          this.classificationList = this.classificationList.concat(response.data)
        }).catch(function(reason) {

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
        uploadFileWater(this.formDate).then(response => {
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
      _this.rentoutForm.imgList = _this.appImgUrl
      // _this.rentoutForm.videoList =[]
      _this.rentoutForm.videoList = _this.appImgUrl5
      _this.rentoutForm.longitude=localStorage.getItem('longitude');
      _this.rentoutForm.latitude=localStorage.getItem('latitude');

      _this.token=localStorage.getItem('token');
      if(_this.token===null){
          Toast.success('请登录')
          return
      }
      var validateFl = _this.validateRFun()
      if (!validateFl) {
        return
      }
          saveAd(_this.rentoutForm).then(response => {
           if(response.code===0){
              _this.$router.push({ path: '/personCenter' })
           }else{
              Toast.fail(response.msg)
           }
         
             
            
          }).catch(function(reason) {
            loading.close()
            console.log('catch:', reason)
          })
        
    },
    getrentoutInfo() {
      var _this = this
      getBsInfoById({ adId: this.adId }).then(response => {
        console.log(response.data)
        this.rentoutForm = response.data
        if (this.rentoutForm.classificationId === 33) {
          this.isshow = true
          if (this.rentoutForm.matingList === null) {
            this.rentoutForm.matingList = []
          }
          // this.rentoutForm.matingList = this.rentoutForm.mating.split(',')
        }
        this.imgList = response.data.imgList
        this.videosList = response.data.videoList
       
      }).catch(function(reason) {
        console.log('catch:', reason)
      })
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
        if (_this.rentoutForm.title === '' || !_this.rentoutForm.title) {
          _this.$message.error('请填写标题')
          return false
        }
        // if (_this.rentoutForm.type === '' || !_this.rentoutForm.type) {
        //   _this.$message.error('请选择类型')
        //   return false
        // }

        if (_this.rentoutForm.citycode === '' || !_this.rentoutForm.citycode) {
          _this.$message.error('请选择城市')
          return false
        }
        if (_this.rentoutForm.areacode === '' || !_this.rentoutForm.areacode) {
          _this.$message.error('请选择区县')
          return false
        }
        if (_this.rentoutForm.addr === '' || !_this.rentoutForm.addr) {
          _this.$message.error('请填写地址')
          return false
        }
        if (_this.rentoutForm.longitude === '' || !_this.rentoutForm.longitude) {
          _this.$message.error('请定位')
          return false
        }
        if (_this.rentoutForm.notice === '' || !_this.rentoutForm.notice) {
          _this.$message.error('请输入描述')
          return false
        }
        if (_this.rentoutForm.classificationId === '' || !_this.rentoutForm.classificationId) {
          _this.$message.error('请选择经营行业')
          return false
        }
         if (_this.rentoutForm.categoryId === '' || !_this.rentoutForm.categoryId) {
          _this.$message.error('请选择经营行业')
          return false
        }
       
         if (_this.rentoutForm.mobile === '' || !_this.rentoutForm.mobile) {
          _this.$message.error('请填写联系电话')
          return false
        }

       
        return true
      },

     
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
