<template>
  <div class="old-food">
    <van-sticky :offset-top="0">
      <!-- 搜索框 -->
      <div class="">
      <!--餐饮美食-->
        <van-nav-bar
          title=""
          left-text=""
          left-arrow
          @click-left="back">
        </van-nav-bar>
      </div>
    </van-sticky>
    
    <div class="tab-position" style="background: white;" >
      <van-tabs @click="onClick" 
        sticky
        offset-top = "3.5rem"
        >
      <van-tab  v-for="(item,index) in listTabs" :title="item.name" :key="index" >
          <!--列表start-->
          <!-- 老店美食 -->
          <div class="" style="float: none" >
            <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
              <van-list
                v-model="isUpLoading"
                :finished="upFinished"
                :immediate-check="false"
                :offset="10"
                finished-text="我是有底线的"
                @load="onLoadList">
                <van-row class="">
                  <van-col :span="24">
                    <div v-if="businessList.length > 0" v-for="item in businessList" :key="item.id" >
                      <van-row>
                        <router-link  :to="pingVideoUrl(item.id)" class="">
                          <van-col span="24">
                            <van-swipe style="height: 200px" >
                              <van-swipe-item  v-for="items in item.videosList" :key="items.id">
                                <div v-if="items.imgurl!=null">
                                  <van-image  :src="items.imgurl" fit="cover" width="100%"   lazy-load />
                                </div>
                                <div v-else>
                                  <van-image fit="cover"  src="../../../static/images/logo.png" width="100%"   lazy-load />
                                </div>
                              </van-swipe-item>
                              <template #indicator>
                                <div class="custom-indicator cfff ">
                                  <van-icon size="16" name="play-circle-o" />
                                  <span class="f16">{{item.videosList[0].longtime}}</span>
                                </div>
                              </template>
                            </van-swipe>
                          </van-col>
                        </router-link>
                        <van-col span="24"  class="mb10 mt5">
                          <div class="ml10">
                            <div class="">
                              <router-link  :to="pingUrl(item.id)" class="">
                                <van-row>
                                  <van-col span="18">
                                    <p  class="c000 f18 van-ellipsis fb" style="font-family: 新宋体">{{item.title}}</p>
                                  </van-col>
                                  <van-col span="6"> <p  class="van-ellipsis fb t-center cred">{{item.categoryName}}</p></van-col>
                                </van-row>
                              </router-link>
                              <van-row class="mt5">
                                <router-link  :to="pingUrl(item.id)" class="">
                                  <van-col span="8" class="f14 cblue t-left van-ellipsis" >{{item.area}}{{item.addr}}</van-col>
                                  <van-col v-if="item.distance<1" span="8" class="f10 c666 " >距我步行{{item.distance*1000}}m</van-col>
                                  <van-col v-if="item.distance>=1" span="8" class="f10 c666" >距我直线{{item.distance}}km</van-col>
                                </router-link>
                                <van-col  span="4" class="f14 t-right c666">
                                  <div @click="dianzan(item.id)" >
                                    <van-icon  name="good-job-o" />{{item.viewnum}}
                                  </div>
                                </van-col>
                                <van-col  span="4" class="t-center c666">
                                  <van-icon  name="share" @click="share"/>
                                  <van-share-sheet
                                    v-model="showShare"
                                    title=""
                                    :options="options"
                                    @select="onSelect"
                                  />
                                </van-col>
                              </van-row>
                            </div>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                  </van-col>
                </van-row>
              </van-list>
            </van-pull-refresh>
          </div>
         

         <van-row>
          <van-col span="10">
            <div v-if="item.url!=null">
              <van-image  :src="item.url" fit="fill" width="100%" height="100px" radius="6px"  lazy-load />
            </div>
            <van-image v-else  src="../../../static/images/background.jpg" fit="fill" width="100%" height="100px" radius="6px" lazy-load />
            <div v-else>
              <img src="../../../static/images/logo.png" width="100%" height="140" />
            </div>
          </van-col>
          <van-col span="13" >
            <div class="ml10">
              <p  class="c13 f16 fb tf2 van-ellipsis">{{item.title}}</p>
              <div class="">
                <van-row class="mt5">
                  <!-- <van-col class="van-ellipsis" span="16"  >
                    <span style="color: blue" v-html="item.notice"></span>
                  </van-col> -->
                  <van-col span="8"  v-if="item.price>0">
                    <span class="f16 fb" style="color: red" >￥{{item.price}}</span>
                    <span class="f12 ">起</span>
                  </van-col>
                </van-row>
                <van-row class="mt5">
                  <van-col v-if="item.distance<1"  class="f12 c666 " >距我步行{{item.distance*1000}}m</van-col>
                  <van-col v-if="item.distance>=1"  class="f12 c666" >距我直线{{item.distance}}km</van-col>
                  <van-col class="ml5" >|</van-col>
                  <van-col  class="f12 ml5 c666 t-left van-ellipsis">{{item.addr}}附近</van-col>
                </van-row>
                <van-row class="" v-if="item.matingList!=null" >
                  <van-col class="van-ellipsis mr5" v-for="(items,index) in item.matingList" :key="index">
                    <van-tag v-if="index<3" color="#f2826a" plain>{{items}}</van-tag>
                  </van-col>
                </van-row>
              </div>
            </div>
          </van-col>
        </van-row>
        </van-tab>
      </van-tabs>
    </div>

    
  </div>
</template>

<script>
  import { getBusiness ,dianzanAd ,getBsInfoById ,getAd ,getCategory} from '@/api/businessCircle'

  import Vue from 'vue'
  import {ShareSheet, Image as VanImage,Divider, Tag,Toast, Tab, Tabs  ,Lazyload, PullRefresh, Tabbar, list,TabbarItem,Search,DropdownMenu, DropdownItem,Swipe, SwipeItem,Popup,Checkbox, CheckboxGroup ,Cell,Sticky} from 'vant';
  Vue.use(ShareSheet).use(VanImage).use(Divider).use(Tag).use(Toast).use(Tab).use(Tabs).use(PullRefresh).use(Tabbar).use(TabbarItem).use(list).use(Search).use(DropdownMenu).use(DropdownItem).use(Swipe).use(SwipeItem).use(Popup).use(Checkbox).use(CheckboxGroup).use(Cell);
  Vue.use(Lazyload, {
    lazyComponent: true,
  }).use(Sticky);
  export default {
    name: 'oldFood',
    data(){
      return {
        active:2,
        showShare: false,
        options: [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
        ],
        pageSize: 5, // 每页条数
        pageIndex: 1, // 页码
        businessList:[], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
        classificationId:null,
        classificationName:'',
        jd: '',//经度
        wd: '',//纬度
        search:'',
        locationCity:'',
        classificationList:[],
        firstList:[],
        categoryName:'',
        listTabs:[
          {name: '老店美食'},
          {name: '特产'}
        ],
        rentoutForm: {}

      }
    },
    created() {
      this.getAlListPage()
    },
    methods: {
      
      getAlListPage() {
        var city=localStorage.getItem('city');
        // localStorage.setItem('longitude', _this.creditLongitude)
        // localStorage.setItem('latitude', _this.creditLatitude)
        this.jd=localStorage.getItem('longitude');
        this.wd=localStorage.getItem('latitude');
        var classificationName
        if(!this.classificationName){
           classificationName = '老店美食'
        }else{
          classificationName = this.classificationName
        }
        const _self = this
        getBusiness({ current: this.pageIndex, size: this.pageSize, search: this.search,
          classificationName:classificationName, categoryName: this.categoryName,
          cityCode: city, areaCode:this.areaCode, jd: this.jd, wd: this.wd,
        }).then(response => {
          this.businessList = this.businessList.concat(response.data.records)
          const rows = response.data.records
          if (rows == null || rows.length === 0) {
            // 加载结束
            _self.upFinished = true
            return
          }
          if (rows.length < this.pageSize) {
            // 最后一页不足10条的情况
            _self.upFinished = true
          }
          // 处理数据
          if (_self.pageIndex === 1) {
            _self.businessList = rows
          } else {
            _self.businessList = _self.businessList.concat(rows)
          }

        }).catch(function (reason) {

        }).finally(() => {
          _self.isDownLoading = false
          _self.isUpLoading = false
        })
      },
      onClick(name, title) {
        // 点击时的弹窗提示
        // Toast(title)
        this.pageIndex=1
        this.businessList = []
        this.classificationName=title
        this.getAlListPage()
      },
      back(){
        this.$router.go(-1);//返回上一层
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.getAlListPage() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.getAlListPage()
      },
      pingUrl(id) {
        return '/bsInfo?id=' + id
      },
      pingVideoUrl(id) {
        return '/adVideo?id=' + id
      },

      switchTo(path) {
        // console.log(this.$router)
        this.$router.replace(path)
      },
      share() {
        this.showShare = true;
      },
      onSelect(option) {
        Toast(option.name);
        this.showShare = false;
      },
      getrentoutInfo(id) {
        var _this = this
        //rentoutId: this.rentoutId
        getAd({adId: id}).then(response => {
          _this.rentoutForm = response.data

        }).catch(function (reason) {
          console.log('catch:', reason)
        })
      },
      dianzan(id){
        var token= localStorage.getItem('token')
        if(token===null){
          Toast.success('请登录')
          return false
        }
        if(token!=null){
          dianzanAd({adId: id,token: token}).then(response => {
            if(response.code===0){
              this.getrentoutInfo(id)
              for (var i = 0; i <  this.businessList.length; i++) {
                if( this.businessList[i].id===id){
                  var viewnum= this.businessList[i].viewnum
                  this.businessList[i].viewnum=this.rentoutForm.viewnum
                  if(viewnum<this.rentoutForm.viewnum){
                    Toast.success('点赞成功')
                  }else if(viewnum > this.rentoutForm.viewnum){
                    Toast.success('取消点赞')
                  }
                  break
                }
              }
            }
          }).catch(function (reason) {
            console.log('catch:', reason)
          })
        }
      },
      pingUrlHotel(id){
        return '/hotelInfo?id=' + id
      },
    }

  }
</script>

<style>
.specialty {
  padding-left: 0.7rem;
}
</style>