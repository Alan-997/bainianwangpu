<template>
  <div class="collection-info">
    <div class="fh" v-if="show" style="width: 100%;">
      <van-nav-bar
        title="我的收藏"
        left-text=""
        fixed="true"
        left-arrow
        @click-left="back"
      />
    </div>
    <div class="collection-list">
       <div class="content-info ml10 mr10 mt10" v-for="(item,index) in collectionList" :key="index" @click="toDetails(item.id , item.classificationName)">
        <van-row>
          <van-col span="15">
            <div class="fb ml5" >
              <div class="van-ellipsis fb c13 f16 mt5 ">{{item.title}}</div>
                <van-row class="">
                  <van-col span="12" class="f14 c666" style="font-family: 'Arial Black'">
                    <van-tag  type="primary" plain> {{item.classificationName}}</van-tag>
                  </van-col>
                  <van-col  span="12" class="f14 c666" style="">
                    <van-tag  type="primary" plain> {{item.categoryName}}</van-tag>
                  </van-col>
                </van-row>
                <van-row class="">
                  <van-col  class="f14 c666" style="">
                    <div class="van-ellipsis c13 f12 mt5 ">收藏时间：{{item.createTime}}</div>
                  </van-col>
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

import { getAdcollect } from '@/api/businessCircle'
export default {
  name: 'collectionInfo',
  data() {
    return {
      token: '',
      collectionList: [],
      imgList: []
    }
  },
  created () {
    this.show=true
    this.token=localStorage.getItem('token')
    this.getAdcollect()
  },
  methods: {
    getAdcollect(){
      getAdcollect({ token: this.token }).then(response => {
        this.collectionList = response.data
        this.imgList = response.data.imgList
        console.log(response.data)
        // this.cityList = response.data
      }).catch(function(reason) {
        console.log('catch:', reason)
      })
    },
    back(){
      this.$router.go(-1);//返回上一层
    },
    toDetails(id,name) {
      // alert(name)
      if(name==='酒店宾馆'){
        this.$router.push({path: '/hotelInfo', query: {id: id}})
      }else if (name==='服装鞋帽'){
        this.$router.push({path: '/merchandise', query: {id: id}})
      }else if (name==='车辆服务'){
        this.$router.push({path: '/merchandise', query: {id: id}})
      }else if (name==='餐饮'){
        this.$router.push({path: '/bsInfo', query: {id: id}})
      }else {
        this.$router.push({path: '/common', query: {id: id}})
      }
    },
  },
  
}
</script>

<style scoped>
  .collection-list {
    margin: 60px 0;
  }
  .content-info {
    padding:10px 5px;
    background-color: #eee;
    border-radius: .5rem;
    /* border: 1px solid #999; */
  }
</style>