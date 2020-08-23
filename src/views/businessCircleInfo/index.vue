<template>
  <div>
    <div class="fh" v-if="show" style="width: 100%;">
      <van-nav-bar
        title="我的商圈"
        left-text=""
        fixed="true"
        left-arrow
        @click-left="back"
      />
    </div>
    <div class="businessList">
      <div class="content-info ml10 mr10 mt10" v-for="(item,index) in businessList" :key="index">
        <van-row>
          <div class="c999 " @click="tosell( item.id)" >
            <van-col span="8" class="img-col">
              <van-image  src="../../../static/images/background.jpg" fit="cover" width="100%" height="130px" radius="10px" />
            </van-col>
          </div>
          <van-col span="15">
            <div class="fb ml5" >
              <div class="van-ellipsis fb c13 f16 mt5 ">{{item.title}}</div>
              <van-row class="">
                <van-col span="18" class="">
                  <div class="van-ellipsis  c666 f14  ">{{item.city}}-{{item.county}}-{{item.addr}}</div>
                </van-col>
                <van-col  span="6"><van-button type="info"  plain size="mini"  @click="clickrfeshrentout(item.id)">刷新</van-button></van-col>
              </van-row>
              <van-row class="mt5">
                <van-col v-if="item.status==0"  span="6" >
                  <van-tag  type="primary" plain> 待审核</van-tag>
                </van-col>
                <van-col v-else  span="6" >
                  <van-tag  type="primary" plain>  已发布</van-tag></van-col>
                <van-col span="18" class="van-ellipsis f14 mt5 c000   " style="font-family: 'Arial Black';" >{{item.createTime}}</van-col>
              </van-row>

              <van-row class="">
                <van-col span="12" class="f14 c666" style="font-family: 'Arial Black'">
                  <van-tag  type="primary" plain> {{item.classificationName}}</van-tag>
                </van-col>
                <van-col  span="12" class="f14 c666" style="">
                  <van-tag  type="primary" plain> {{item.categoryName}}</van-tag>
                </van-col>
              </van-row>

              <van-row class="">
                <van-col span="6" class="f14 c666" >刷新时间</van-col>
                <van-col  span="15" class="f14 van-ellipsis fb" >{{item.updateTime}}</van-col>
              </van-row>

            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Col, Row, Image as VanImage, Lazyload, Tag, Toast } from 'vant';
Vue.use(NavBar).use(Col).use(Row).use(VanImage).use(Lazyload).use(Tag).use(Toast);

import {getAdPublish,rfeshAdPublish, getAd} from '@/api/businessCircle'
export default {
  name: 'businessCircleInfo',
  data(){
    return{
      token:'',
      businessList: []
    }
  },
  created() {
    this.show=true
    this.token=localStorage.getItem('token')
    this.getAdPublish()
  },
  computed: {

  },
  watch:{

  },
  methods: {
    getAdPublish(){
      getAdPublish({ token: this.token }).then(response => {
        this.businessList = response.data
        console.log(response.data)
        // this.cityList = response.data
      }).catch(function(reason) {
        console.log('catch:', reason)
      })
    },
    back(){
        this.$router.go(-1);//返回上一层
    },
    tosell( id) {
      this.$router.push({path: '/businessCircleRelease', query: {adId: id}})
    },
    clickrfeshrentout(id){
        rfeshAdPublish({adId:  id }).then(response => {
          if(response.code===0){
            
            Toast.success('刷新成功');
          }else {
            Toast.fail(response.msg);
          }
          this.getAd(id)
        }).catch(function(reason) {

        })
      },
     
      getAd(id) {
        var _this = this
        //rentoutId: this.rentoutId
        getAd({adId: id}).then(response => {
          for (var i = 0; i < _this.businessList.length; i++) {
            if( _this.businessList[i].id===id){
              _this.businessList[i].updateTime = response.data.updateTime;
            }
          }
        }).catch(function (reason) {
          console.log('catch:', reason)
        })
      },
      
  }
  
}
</script>

<style>
  .businessList {
    margin-top: 50px;
  }
  .content-info {

    /* border: 1px solid #333; */
  }
</style>