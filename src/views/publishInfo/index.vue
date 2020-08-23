<template>
  <div id="publish">
    <transition>
      <div class="fh" v-if="show" style="width: 100%;">
        <van-nav-bar
          title="我的发布"
          left-text=""
          left-arrow
          @click-left="back"
        />
      </div>
    </transition>

    <div class="">
      <van-tabs @click="onClick">
        <van-tab title="出租">
          <div  class="ml10 mr5 "  v-for="item in rentoutList" :key="item.id">
            <van-divider/>
            <van-row >
              <div class="c999 " @click="torentout(urlType, item.id)" >
                <van-col span="9">
                  <van-image  src="../../../static/images/background.jpg" fit="cover" width="100%" height="140px" radius="10px"   />
                </van-col>
              </div>
              <van-col span="15">
                <div class="fb ml5" >
                  <div class="van-ellipsis fb c13 f14 mt5 ">{{item.title}}</div>
                  <van-row class="">
                    <van-col span="18" class="">
                      <div class="van-ellipsis  c666 f14  ">{{item.city}}-{{item.county}}-{{item.addr}}</div>
                    </van-col>
                    <van-col  span="6"><van-button type="info"  plain size="mini"  @click="clickrfeshrentout(item.id)">刷新</van-button></van-col>
                  </van-row>

                  <van-row class="mt5">
                    <van-col v-if="item.type==1" span="5"  >
                      <van-tag  color="#f2826a" plain>出租</van-tag></van-col>
                    <van-col v-else-if="item.type==2" span="5"  >
                      <van-tag color="#f2826a" plain>转租</van-tag></van-col>
                    <van-col v-else-if="item.type==3" span="5"  >
                      <van-tag  color="#f2826a" plain>  转让</van-tag></van-col>
                    <van-col  span="12" >
                      <van-tag color="#f2826a" plain>{{item.shopType}}</van-tag>
                    </van-col>
                    <van-col  span="7" >
                      <van-tag color="#f2826a" plain>{{item.industry}}</van-tag>
                    </van-col>
                  </van-row>
                  <van-row class="mt5">
                    <van-col v-if="item.status==0"  span="6" >
                      <van-tag  type="primary" plain> 待审核</van-tag></van-col>
                    <van-col v-else  span="6" >
                      <van-tag  type="primary" plain>  已发布</van-tag></van-col>
                    <van-col span="18" class="van-ellipsis f14 mt5 c000   " style="font-family: 'Arial Black';" >{{item.createTime}}</van-col>
                  </van-row>

                  <van-row class="">
                    <van-col span="6" class="f14 c666" style="font-family: 'Arial Black'">{{item.acreage}}m²</van-col>
                    <van-col  span="18" class="f14  fb" style="color: #AB0015"><span  style="color: #AB0015;font-family: 'Arial Black';">{{item.monthlyRent}}元/月</span></van-col>
                  </van-row>

                  <van-row class="" v-if="item.type===3">
                    <van-col span="6" class="c000" style="font-family: 'Arial Black';">转让费</van-col>
                    <van-col span="18" class="van-ellipsis c000" style="font-family: 'Arial Black';" >{{item.transferFee}}万</van-col>
                  </van-row>

                  <van-row class="">
                    <van-col span="9" class="f14 c666" >刷新时间</van-col>
                    <van-col  span="15" class="f14 van-ellipsis fb" >{{item.freshTime}}</van-col>
                  </van-row>
                </div>
              </van-col>
            </van-row>
          </div>

        </van-tab>
        <van-tab title="转让">
          <div  class="ml10 mr5 "  v-for="item in transList" :key="item.id">
            <van-divider/>
              <van-row >
                <div class="c999 " @click="totrans(urlType, item.id)" >
                <van-col span="9">
                  <van-image  src="../../../static/images/background.jpg" fit="cover" width="100%" height="160px" radius="10px"   />
                </van-col>
                </div>
                <van-col span="15">
                  <div class="fb ml5" >
                    <div class="van-ellipsis fb c13 f14 mt5 ">{{item.title}}</div>
                    <van-row class="">
                      <van-col span="18" class="">
                        <div class="van-ellipsis  c666 f14  ">{{item.city}}-{{item.county}}-{{item.addr}}</div>
                      </van-col>
                      <van-col  span="6"><van-button type="info"  plain size="mini"  @click="clickrfeshrentout(item.id)">刷新</van-button></van-col>
                    </van-row>
                    <van-row class="mt5">
                      <van-col v-if="item.type==1" span="5"  >
                        <van-tag  color="#f2826a" plain>出租</van-tag></van-col>
                      <van-col v-else-if="item.type==2" span="5"  >
                        <van-tag color="#f2826a" plain>转租</van-tag></van-col>
                      <van-col v-else-if="item.type==3" span="5"  >
                        <van-tag  color="#f2826a" plain>  转让</van-tag></van-col>
                      <van-col  span="12" >
                        <van-tag color="#f2826a" plain>{{item.shopType}}</van-tag>
                      </van-col>
                      <van-col  span="7" >
                        <van-tag color="#f2826a" plain>{{item.industry}}</van-tag>
                      </van-col>
                    </van-row>
                    <van-row class="mt5">
                      <van-col v-if="item.status==0"  span="6" >
                        <van-tag  type="primary" plain> 待审核</van-tag></van-col>
                      <van-col v-else  span="6" >
                        <van-tag  type="primary" plain>  已发布</van-tag></van-col>
                      <van-col span="18" class="van-ellipsis f14 mt5 c000   " style="font-family: 'Arial Black';" >{{item.createTime}}</van-col>
                    </van-row>

                    <van-row class="">
                      <van-col span="6" class="f14 c666" style="font-family: 'Arial Black'">{{item.acreage}}m²</van-col>
                      <van-col  span="18" class="f14  fb" style="color: #AB0015"><span  style="color: #AB0015;font-family: 'Arial Black';">{{item.monthlyRent}}元/月</span></van-col>
                    </van-row>

                    <van-row class="" v-if="item.type===3">
                      <van-col span="6" class=" f12" style="font-family: 'Arial Black';">转让费</van-col>
                      <van-col span="18" class="van-ellipsis cred " style="font-family: 'Arial Black';" >{{item.transferFee}}万</van-col>
                    </van-row>
                    <van-row class="">
                      <van-col span="9" class="f14 c666" >刷新时间</van-col>
                      <van-col  span="15" class="f14 van-ellipsis fb" >{{item.freshTime}}</van-col>
                    </van-row>
                  </div>
                </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab title="出售">
          <div  class=" ml10 mr5"  v-for="item in sellList" :key="item.id">
            <van-divider/>
              <van-row >
                <div class="c999 " @click="tosell(urlType, item.id)" >
                <van-col span="9">
                  <van-image  src="../../../static/images/background.jpg" fit="cover" width="100%" height="140px" radius="10px"   />
                </van-col>
                </div>
                <van-col span="15">
                  <div class="fb ml5" >
                    <div class="van-ellipsis fb c13 f14 mt5 ">{{item.title}}</div>
                    <van-row class="">
                      <van-col span="18" class="">
                        <div class="van-ellipsis  c666 f14  ">{{item.city}}-{{item.county}}-{{item.addr}}</div>
                      </van-col>
                      <van-col  span="6"><van-button type="info"  plain size="mini"  @click="clickrfeshsell(item.id)">刷新</van-button></van-col>
                    </van-row>

                    <van-row class="mt5">
                      <van-col v-if="item.type==1" span="5"  >
                        <van-tag  color="#f2826a" plain>出租</van-tag></van-col>
                      <van-col v-else-if="item.type==2" span="5"  >
                        <van-tag color="#f2826a" plain>转租</van-tag></van-col>
                      <van-col v-else-if="item.type==3" span="5"  >
                        <van-tag  color="#f2826a" plain>  转让</van-tag></van-col>
                      <van-col  span="12" >
                        <van-tag color="#f2826a" plain>{{item.shopType}}</van-tag>
                      </van-col>
                      <van-col  span="7" >
                        <van-tag color="#f2826a" plain>{{item.industry}}</van-tag>
                      </van-col>
                    </van-row>
                    <van-row class="mt5">
                      <van-col v-if="item.status==0"  span="6" >
                        <van-tag  type="primary" plain> 待审核</van-tag></van-col>
                      <van-col v-else  span="6" >
                        <van-tag  type="primary" plain>  已发布</van-tag></van-col>
                      <van-col span="18" class="van-ellipsis f14 mt5 c000   " style="font-family: 'Arial Black';" >{{item.createTime}}</van-col>
                    </van-row>

                    <van-row class="">
                      <van-col span="6" class="f14 c666" style="font-family: 'Arial Black'">{{item.acreage}}m²</van-col>
                      <van-col span="18" class="van-ellipsis" style="font-family: 'Arial Black';color: black" >{{item.totalPrice}}万</van-col>
                    </van-row>
                    <van-row class="">
                      <van-col span="9" class="f14 c666" >刷新时间</van-col>
                      <van-col  span="15" class="f14 van-ellipsis fb" >{{item.freshTime}}</van-col>
                    </van-row>
                  </div>
                </van-col>
              </van-row>
          </div>
        </van-tab>
        <van-tab title="求租">
          <div  class="pl10 ml10 pt10 mt10 "  v-for="item in wantedList" :key="item.id">
            <van-divider/>
              <van-row >
                <div class="c999 " @click="towanted(urlType, item.id)" >
                <van-col span="9">
                  <van-image  src="../../../static/images/background.jpg" fit="cover" width="100%" height="140px" radius="10px"   />
                </van-col>
                </div>
                <van-col span="15">
                  <div class="fb ml5" >
                    <div class="van-ellipsis fb c13 f14 mt5 ">{{item.title}}</div>

                    <van-row class="">
                      <van-col span="18" class="">
                        <div class="van-ellipsis  c666 f14  ">{{item.city}}-{{item.county}}-{{item.street}}</div>
                      </van-col>
                      <van-col  span="6"><van-button type="info"  plain size="mini"  @click="clickrfeshwanted(item.id)">刷新</van-button></van-col>
                    </van-row>
                    <van-row class="mt5">
                      <van-col span="5"  >
                        <van-tag  color="#f2826a" plain>求租</van-tag></van-col>

                      <van-col  span="12" >
                        <van-tag color="#f2826a" plain>{{item.industry}}</van-tag>
                      </van-col>
                      <van-col  span="7" >
                        <van-tag color="#f2826a" plain>{{item.industry1}}</van-tag>
                      </van-col>
                    </van-row>
                    <van-row class="mt5">
                      <van-col v-if="item.status==0"  span="6" >
                        <van-tag  type="primary" plain> 待审核</van-tag></van-col>
                      <van-col v-else  span="6" >
                        <van-tag  type="primary" plain>  已发布</van-tag></van-col>
                      <van-col span="18" class="van-ellipsis f14 mt5 c000   " style="font-family: 'Arial Black';" >{{item.createTime}}</van-col>
                    </van-row>

                    <van-row class="">
                      <van-col span="10" class="f14 c666" style="font-family: 'Arial Black'">{{item.acreageStart}}~{{item.acreageEnd}}m²</van-col>
                      <van-col span="14" class="van-ellipsis" style="font-family: 'Arial Black';color: black" >{{item.monthlyRentStart}}~{{item.monthlyRentEnd}}元/月</van-col>
                    </van-row>
                    <van-row class="">
                      <van-col span="9" class="f14 c666" >刷新时间</van-col>
                      <van-col  span="15" class="f14 van-ellipsis fb" >{{item.freshTime}}</van-col>
                    </van-row>
                  </div>
                </van-col>
              </van-row>
            </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>


<script>
  import { getToken,removeStorage } from '@/utils/auth' // 在cookie中获取用户
  import Vue from 'vue'
  import {Image as VanImage ,Tag,Lazyload,Divider ,List ,Toast , Tab, Tabs , Cell, CellGroup,ActionSheet,Tabbar, TabbarItem,Search,DropdownMenu, DropdownItem,Swipe, SwipeItem } from 'vant';
  Vue.use(VanImage).use(Tag).use(Toast).use(Lazyload).use(Divider).use(List).use(Tab).use(Tabs).use(Cell).use(CellGroup).use(ActionSheet).use(Tabbar).use(TabbarItem).use(Search).use(DropdownMenu).use(DropdownItem).use(Swipe).use(SwipeItem);
  Vue.use(Lazyload, {
    lazyComponent: true,
  });
  import {freshrentout,freshsell,freshwanted,getPublishList } from '@/api/rentout'
  export default {
    name: 'publishInfo',
    data() {
      return {
        urlType:1,
        token:'',
        user:{},
        active:4,
        rentoutList:[],
        transList:[],
        sellList:[],
        wantedList:[]
      }
    },
    computed: {

    },
    watch:{

    },
    created() {
      this.token= localStorage.getItem('token')
      this.show=true;
      this.getPublishList()
    },
    methods: {
      getPublishList(){
        this.token= localStorage.getItem('token')
        if(this.token===null){
          return
        }
        getPublishList({token:  this.token }).then(response => {
          console.log(response.data)
          this.rentoutList=response.data.rentoutList
          this.transList=response.data.transList
          this.sellList=response.data.sellList
          this.wantedList=response.data.wantedList

        }).catch(function(reason) {
        })
        // this.user= JSON.parse(localStorage.getItem('user'))
      },
      torentout(type, id) {
        if (type == 1) {
          this.$router.push({path: '/publish', query: {rentoutId: id}})
        }
      },
      totrans(type, id) {
        if (type == 2) {
          this.$router.push({path: '/publish', query: {rentoutId: id}})
        }
      },
      tosell(type, id) {
        if (type == 3) {
          this.$router.push({path: '/publishsell', query: {sellId: id}})
        }
      },
      towanted(type, id) {
        if (type == 4) {
          this.$router.push({path: '/publishwanted', query: {wantedId: id}})
        }
      },

      onClick(name, title) {
        if(title==='出租'){
          this.urlType=1
        }else if(title==='转让') {
          this.urlType = 2
        }else if(title==='出售') {
          this.urlType = 3
        }else {
          this.urlType = 4
          // Toast(title)
        }
      },
      clickrfeshrentout(id){
        freshrentout({id:  id }).then(response => {
          if(response.code===0){
            this.getPublishList()
            Toast.success('刷新成功');
          }else {
            Toast.fail(response.msg);
          }
        }).catch(function(reason) {
        })
      },
      clickrfeshsell(id){
        freshsell({id:  id }).then(response => {
          if(response.code===0){
            this.getPublishList()
            Toast.success('刷新成功');
          }else {
            Toast.fail(response.msg);
          }

        }).catch(function(reason) {
        })
      },
      clickrfeshwanted(id){
        freshwanted({id:  id }).then(response => {
          if(response.code===0){
            this.getPublishList()
            Toast.success('刷新成功');
          }else {
            Toast.fail(response.msg);
          }

        }).catch(function(reason) {
        })
      },
      back(){
        this.$router.go(-1);//返回上一层
      },
      switchTo(path){
        // console.log(this.$router)
        this.$router.replace(path)
      },

    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  body{
    background: #ffffff;
  }
  #publish{
    padding-bottom: 50px;
    .publish-top{
      width: 100%;
      padding-bottom: 10px;
      background: linear-gradient(left, #84d24c 20%, #ead233 100%);
    }
  }
  .van-nav-bar .van-icon{color: #000000;}
  /*.van-nav-bar{ background: linear-gradient(left, #BBBB00 20%, #FFBB00 100%);}*/
  .van-nav-bar__title{color: #2a1d1d
  }


</style>
