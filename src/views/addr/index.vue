<template>
  <div id="publish">
    <transition :name="transitionName">
      <div class="fh " v-if="show" style="width: 100%">
          <van-nav-bar
            title=""
            left-text=""
            left-arrow
            @click-left="back"
          />
      </div>
    </transition>

    <div class="container fh">
      <div class="">
        <form>
          <div class="info_form">
            <van-row>
              <van-col span="6">
                <label  style="font-family: '微软雅黑 Light';font-size: 18px" class="lh40">你正在看:</label>
              </van-col>
              <van-col span="18">
                <label  style="font-family: '微软雅黑 Light';font-size: 18px" class="lh40"> {{locationCity}}</label>
              </van-col>
            </van-row>
          </div>
<!--          <div class="info_form">-->
<!--            <label style="font-weight: bolder;font-size: 20px" class="lh40 cae">定位/最近访问</label>-->
<!--            <ul style="border: #6a7bbb 1px solid;width: 80px" >-->
<!--              <li style="float: left;" @click="location">-->
<!--                <van-icon name="location"  style="top:8px"  />-->
<!--              </li>-->
<!--              <li >-->
<!--                <p style="color:#000088;">{{city}}</p>-->
<!--              </li>-->
<!--            </ul>-->

<!--          </div>-->

          <div class="info_form" >
            <div>
              <label style="font-weight: bolder;font-size: 20px" class="lh40 cae">城市</label>
            </div>

            <vant-row>
              <vant-col span="24">
                <ul style="display: inline"  v-for="item in localCityList" :key="item.id">
                  <li class="ml5 mt5" style="display: inline-block;width: 30%"  @click="changeType(item.fullname)" :class="{ liBackground:changeLeftBackground == item.fullname}">
                    <el-button  style="width: 100%">{{item.name}}</el-button>
                  </li>
                </ul>
              </vant-col>
              <vant-col span="24" >
                <div v-show="tagshow" class="mt20">
                  <div class="info_form">
                    <label style="font-weight: bolder;font-size: 20px" class="lh40 cae">选择区县</label>
                  </div>
                  <ul style="display: inline" class="ml20" v-for="item in localAreaList" :key="item.id">
                    <li class="mt10 mb5" style="display: inline-block;width: 80px"  @click="changeTypes(item.fullname)">
                      <span style="font-family: '微软雅黑 Light';font-weight: bolder;font-size: 18px;border: white 4px solid;background-color: white">{{item.name}}</span>
                    </li>
                  </ul>
                </div>
              </vant-col>
            </vant-row>
          </div>

        </form>
      </div>
      <div style="text-align: center">
<!--        <button class="info_from_button" style="cursor: pointer;"  @click="save">确认发布</button>-->
      </div>
      <div class="fh pt20 pb5"></div>
    </div>
  </div>
</template>


<script>
  import { getToken,removeStorage } from '@/utils/auth' // 在cookie中获取用户
  import Vue from 'vue'
  import { Cell, CellGroup,ActionSheet,Tabbar, TabbarItem,Search,DropdownMenu, DropdownItem,Swipe, SwipeItem, Col, Row  } from 'vant';
  Vue.use(Cell).use(CellGroup).use(ActionSheet).use(Tabbar).use(TabbarItem).use(Search).use(DropdownMenu).use(DropdownItem).use(Swipe).use(SwipeItem).use(Col).use(Row);
  import { getLocalCityList, saveSell } from '@/api/rentout'
  export default {
    name: 'publish',
    data() {
      return {
        tagshow:false,
        firstlist:[],
        secondlist:[],
        threelist:[],
        localCityList:[],
        localAreaList:[],
        city:'',
        locationCity:'',
        show:false,
        transitionName:'',
        active:2,
        dataForm: {
          /* longitude: '',
           latitude: '',*/
          passengerFlowList: [],
          matingList: []
        },
        changeLeftBackground: '',
        pbType: '1'
      }
    },
    computed: {

    },
    watch:{

    },
    created() {
      this.getLocalCityList()
      // this.location()
      this.show=true;
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      switchTo(path){
        // console.log(this.$router)
        this.$router.replace(path)
      },
      changeType(name) {
        // this.tagshow=true
        localStorage.removeItem('background');
        this.changeLeftBackground = name;
        localStorage.setItem('background', this.changeLeftBackground);
        localStorage.removeItem('city');//删除上次的存储
        localStorage.setItem('city', name);
        this.$router.push('/')
        // this.localAreaList=[]
        // getLocalCityList({locationCity: name }).then(response => {
        //   console.log(response.data)
        //   this.localAreaList = this.localAreaList.concat(response.data)
        //
        // }).catch(function(reason) {
        //
        // })
      },
      changeTypes(name) {
        localStorage.removeItem('city');//删除上次的存储
        localStorage.setItem('city', name);

        this.$router.push('/')
      },
      // location() {
      //   let _this = this
      //   var geolocation = new BMap.Geolocation();
      //   geolocation.getCurrentPosition(function(r) {
      //     console.log(r)
      //     localStorage.removeItem('city');//删除上次的存储
      //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      //
      //       const myGeo = new BMap.Geocoder()
      //       myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
      //         if (data.addressComponents) {
      //           const result = data.addressComponents
      //           console.log(data.addressComponents)
      //           const location = {
      //             creditLongitude: r.point.lat, // 经度
      //             creditLatitude: r.point.lng, // 纬度
      //             creditProvince: result.province || '', // 省
      //             creditCity: result.city || '', // 市
      //             creditArea: result.district || '', // 区
      //             creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
      //           }
      //           _this.location = location;
      //           _this.creditLongitude=location.creditLongitude;
      //           _this.creditLatitude=location.creditLatitude;
      //           _this.creditCity=location.creditCity;
      //           _this.creditArea=location.creditArea;
      //           _this.city = location.creditCity;
      //           // _this.locationCity= location.creditCity;
      //           // alert(this.getStatus());
      //
      //           // const str=_this.locationCity;//city存储本地
      //           localStorage.setItem('city', _this.city);
      //         }
      //       })
      //     }
      //
      //   })
      // },
      getLocalCityList(){
        getLocalCityList({locationCity: '贵州省' }).then(response => {
          console.log(response.data)
          this.localCityList = this.localCityList.concat(response.data)
          var data2 = localStorage.getItem('background');//从本地存储取出
          for (var i = 0; i <  this.localCityList.length; i++) {
            if(data2===this.localCityList[i].fullname){
              this.changeLeftBackground = data2;
            }
          }
        }).catch(function(reason) {

        })
      }

    },
    mounted() {
       this.locationCity = localStorage.getItem('city');//从本地存储取出
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
      /*background: linear-gradient(left, #a1ee5d 20%, #d2b31f 100%);*/
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
  .liBackground {
    /*background: -webkit-gradient(linear, 0 0, 0 100%, from(#3211ee), to(#f1f5fc));*/
    border: #ba7676 2px solid;
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
  /*.van-nav-bar{ background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);}*/
  .van-nav-bar__title{color:#fff}


</style>
