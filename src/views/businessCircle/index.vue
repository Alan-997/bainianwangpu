<template>
  <div id="businessCircle" style="width: 100%;overflow: hidden">
    <div class="findShop-top pb10">
      <van-row class="bxs pr10">
        <van-col span="20" class="pt10 pr bxb pr20">
          <van-icon name="arrow-left" size="1.8rem" @click="backHome" class="business-back" />
          <input
            style="color: black"
            class="top-search ml15 pl15 bxb"
            v-model="search"
            placeholder="请输入"
          />
          <van-icon
            name="search"
            class="search-icon fb"
            style="top: 15px;color: #FFBB00;"
            @click="onSearch"
          />
        </van-col>
      </van-row>
    </div>

    <div style="margin: 70px 0 10px 0; ">
      <van-swipe indicator-color="white" v-for="items in classificationList" :key="items.id">
        <van-swipe-item>
          <ul
            class
            style="list-style: none;display: inline;"
            v-for="item in firstList"
            :key="item.id"
          >
            <li class="t-center" style="display: inline-block;width: 25%">
              <div @click="goto(item.id,item.name)">
                <div v-if="item.icon!='' ">
                  <van-image :src="item.icon" width="1.8rem" radius="10px" lazy-load />
                </div>
                <div v-else>
                  <van-image
                    src="../../../static/images/6.jpg"
                    width="1.8rem"
                    radius="10px"
                    lazy-load
                  />
                </div>
                <p class="f14 t-center van-ellipsis" style="color:black;">{{item.name}}</p>
              </div>
            </li>
          </ul>
        </van-swipe-item>

        <van-swipe-item>
          <ul
            class
            style="list-style: none;display: inline;"
            v-for="itemfirst in secondList"
            :key="itemfirst.id"
          >
            <li class="t-center" style="display: inline-block;width: 25%">
              <div @click="goto(itemfirst.id,itemfirst.name)">
                <div v-if="itemfirst.icon!='' ">
                  <van-image :src="itemfirst.icon" width="1.8rem" radius="10px" lazy-load />
                </div>
                <div v-else>
                  <van-image
                    src="../../../static/images/6.jpg"
                    width="1.8rem"
                    radius="10px"
                    lazy-load
                  />
                </div>
                <p class="f14 t-center van-ellipsis" style="color:black;">{{itemfirst.name}}</p>
              </div>
            </li>
          </ul>
        </van-swipe-item>

        <van-swipe-item>
          <ul
            class
            style="list-style: none;display: inline;"
            v-for="itemthree in threeList"
            :key="itemthree.id"
          >
            <li class="t-center" style="display: inline-block;width: 25%">
              <div @click="goto(itemthree.id,itemthree.name)">
                <div v-if="itemthree.icon!='' ">
                  <van-image :src="itemthree.icon" width="1.8rem" radius="10px" lazy-load />
                </div>
                <div v-else>
                  <van-image
                    src="../../../static/images/6.jpg"
                    width="1.8rem"
                    radius="10px"
                    lazy-load
                  />
                </div>
                <p class="f14 t-center van-ellipsis" style="color:black;">{{itemthree.name}}</p>
              </div>
            </li>
          </ul>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class style="background: white;">
      <van-tabs @click="onClick" sticky offset-top="3.5rem">
        <van-tab v-for="(item,index) in listTabs" :title="item.name" :key="index">
          <!--商圈数据列表-->
          <div class style="float: none">
            <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
              <van-list
                v-model="isUpLoading"
                :finished="upFinished"
                :immediate-check="false"
                :offset="10"
                finished-text="我是有底线的"
                @load="onLoadList"
              >
                <van-row class>
                  <van-col :span="24">
                    <div v-if="businessList.length > 0" v-for="item in businessList" :key="item.id">
                      <!-- 餐饮 -->
                      <div v-if="item.classificationId===23">
                        <van-row>
                          <router-link :to="pingVideoUrl(item.id)" class>
                            <van-col span="24">
                              <van-swipe style="height: 200px">
                                <van-swipe-item v-for="items in item.videosList" :key="items.id">
                                  <div v-if="items.imgurl!=null">
                                    <van-image
                                      :src="items.imgurl"
                                      fit="cover"
                                      width="100%"
                                      lazy-load
                                    />
                                  </div>
                                  <div v-else>
                                    <van-image
                                      fit="cover"
                                      src="../../../static/images/logo.png"
                                      width="100%"
                                      lazy-load
                                    />
                                  </div>
                                </van-swipe-item>
                                <template #indicator>
                                  <div class="custom-indicator cfff">
                                    <van-icon size="16" name="play-circle-o" />
                                    <span class="f16">{{item.videosList[0].longtime}}</span>
                                  </div>
                                </template>
                              </van-swipe>
                            </van-col>
                          </router-link>
                          <van-col span="24" class="mb10 mt5">
                            <div class="ml10">
                              <div class>
                                <router-link :to="pingUrl(item.id)" class>
                                  <van-row>
                                    <van-col span="18">
                                      <p
                                        class="c13 f16 van-ellipsis fb"
                                        style="font-family: 新宋体"
                                      >{{item.title}}</p>
                                    </van-col>
                                    <van-col span="6">
                                      <p class="van-ellipsis fb t-center cred">{{item.categoryName}}</p>
                                    </van-col>
                                  </van-row>
                                </router-link>
                                <van-row class="mt5">
                                  <router-link :to="pingUrl(item.id)" class>
                                    <van-col
                                      span="8"
                                      class="f14 cblue t-left van-ellipsis"
                                    >{{item.area}}{{item.addr}}</van-col>
                                    <van-col
                                      v-if="item.distance<1"
                                      span="8"
                                      class="f12 c666"
                                    >距我步行{{item.distance*1000}}m</van-col>
                                    <van-col
                                      v-if="item.distance>=1"
                                      span="8"
                                      class="f12 c666"
                                    >距我直线{{item.distance}}km</van-col>
                                  </router-link>
                                  <van-col span="4" class="f14 t-right c666">
                                    <div @click="dianzan(item.id)">
                                      <van-icon name="good-job-o" />
                                      {{item.viewnum}}
                                    </div>
                                  </van-col>
                                  <van-col span="4" class="t-center c666">
                                    <van-icon name="share" @click="share" />
                                    <van-share-sheet
                                      v-model="showShare"
                                      title
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

                      <!--服装鞋帽-->
                      <div v-if="item.classificationId===25" style="float: none">
                        <div @click="pingUrlclothing(item.id)">
                          <van-col span="12">
                            <div
                              style="font-weight: bold;margin: 10px;background-color: #f4f4f4;border-radius: 8px;display: inline-block;width: 90%;"
                            >
                              <div v-if="item.url!=null">
                                <van-image
                                  :src="item.url"
                                  fit="fill"
                                  width="100%"
                                  height="140px"
                                  radius="4px"
                                  lazy-load
                                />
                              </div>
                              <van-image
                                v-else
                                src="../../../static/images/background.jpg"
                                fit="fill"
                                width="100%"
                                height="100px"
                                radius="4px"
                                lazy-load
                              />
                              <div style="padding: 3px ;">
                                <van-col span="24" class="van-ellipsis">
                                  <div
                                    style="color: #ee0a24;font-size: 16px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                                  >{{item.title}}</div>
                                </van-col>
                                <van-col span="24" class="van-ellipsis">
                                  <div style="font-size: 12px;margin: 2px 0 5px 0;">{{item.addr}}</div>
                                </van-col>
                                <van-col span="24" class="van-ellipsis">
                                  <div
                                    style="font-size: 12px;margin: 0 0 2px 0;color: #959595;font-family: 'Arial Black'"
                                  >
                                    <span v-if="item.distance<1" class="f12">距我步行{{item.distance}}m</span>
                                    <span
                                      v-if="item.distance>=1"
                                      class="f12"
                                    >距我直线{{item.distance}}km</span>
                                  </div>
                                </van-col>
                              </div>
                            </div>
                          </van-col>
                        </div>
                      </div>

                      <!-- 车辆服务 -->
                      <div v-if="item.classificationId===31" style="float: none">
                        <div @click="pingUrlclothing(item.id)">
                          <van-col span="12">
                            <div
                              style="margin: 10px;background-color: #f4f4f4;border-radius: 8px;display: inline-block;width: 90%;"
                            >
                              <div v-if="item.url!=null">
                                <van-image
                                  :src="item.url"
                                  fit="fill"
                                  width="100%"
                                  height="140px"
                                  radius="4px"
                                  lazy-load
                                />
                              </div>
                              <van-image
                                v-else
                                src="../../../static/images/background.jpg"
                                fit="fill"
                                width="100%"
                                height="100px"
                                radius="4px"
                                lazy-load
                              />
                              <div style="padding: 3px ;">
                                <van-col span="24" class="van-ellipsis">
                                  <div
                                    style="color: #ee0a24;font-size: 16px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                                  >{{item.title}}</div>
                                </van-col>
                                <van-col span="24" class="van-ellipsis">
                                  <div style="font-size: 12px;margin: 2px 0 5px 0;">{{item.addr}}</div>
                                </van-col>
                                <van-col span="24" class="van-ellipsis">
                                  <div
                                    style="font-size: 12px;margin: 0 0 2px 0;color: #959595;font-family: 'Arial Black'"
                                  >
                                    <span v-if="item.distance<1" class="f12">距我步行{{item.distance}}m</span>
                                    <span
                                      v-if="item.distance>=1"
                                      class="f12"
                                    >距我直线{{item.distance}}km</span>
                                  </div>
                                </van-col>
                              </div>
                            </div>
                          </van-col>
                        </div>
                      </div>

                      <!--酒店宾馆-->
                      <div v-if="item.classificationId===33" class="hotels">
                        <router-link :to="pingUrlHotel(item.id)">
                          <van-row>
                            <van-col span="10">
                              <div v-if="item.url!=null">
                                <van-image
                                  :src="item.url"
                                  fit="fill"
                                  width="100%"
                                  height="100px"
                                  radius="6px"
                                  lazy-load
                                />
                              </div>
                              <van-image
                                v-else
                                src="../../../static/images/background.jpg"
                                fit="fill"
                                width="100%"
                                height="100px"
                                radius="6px"
                                lazy-load
                              />
                              <div v-else>
                                <img
                                  src="../../../static/images/logo.png"
                                  width="100%"
                                  height="140"
                                />
                              </div>
                            </van-col>
                            <van-col span="13">
                              <div class="ml10">
                                <p class="c13 f16 fb tf2 van-ellipsis">{{item.title}}</p>
                                <div class>
                                  <van-row class="mt5">
                                    <!-- <van-col class="van-ellipsis" span="16"  >
                                      <span style="color: blue" v-html="item.notice"></span>
                                    </van-col>-->
                                    <van-col span="8" v-if="item.price>0">
                                      <span class="f16 fb" style="color: red">￥{{item.price}}</span>
                                      <span class="f12">起</span>
                                    </van-col>
                                  </van-row>
                                  <van-row class="mt5">
                                    <van-col
                                      v-if="item.distance<1"
                                      class="f12 c666"
                                    >距我步行{{item.distance*1000}}m</van-col>
                                    <van-col
                                      v-if="item.distance>=1"
                                      class="f12 c666"
                                    >距我直线{{item.distance}}km</van-col>
                                    <van-col class="ml5">|</van-col>
                                    <van-col
                                      class="f12 ml5 c666 t-left van-ellipsis"
                                    >{{item.addr}}附近</van-col>
                                  </van-row>
                                  <van-row class v-if="item.matingList!=null">
                                    <van-col
                                      class="van-ellipsis mr5"
                                      v-for="(items,index) in item.matingList"
                                      :key="index"
                                    >
                                      <van-tag v-if="index<3" color="#f2826a" plain>{{items}}</van-tag>
                                    </van-col>
                                  </van-row>
                                </div>
                              </div>
                            </van-col>
                          </van-row>
                          <van-divider />
                        </router-link>
                      </div>

                      <!-- 其他 -->
                      <div
                        v-if="item.classificationId != 31 && item.classificationId != 33 && item.classificationId != 23 && item.classificationId != 25"
                        style="float: none"
                      >
                        <div @click="pingUrlclothing(item.id)">
                          <van-col span="12">
                            <div
                              style="margin: 10px;background-color: #f4f4f4;border-radius: 8px;display: inline-block;width: 90%;"
                            >
                              <div v-if="item.url!=null">
                                <van-image
                                  :src="item.url"
                                  fit="fill"
                                  width="100%"
                                  height="140px"
                                  radius="4px"
                                  lazy-load
                                />
                              </div>
                              <van-image
                                v-else
                                src="../../../static/images/background.jpg"
                                fit="fill"
                                width="100%"
                                height="100px"
                                radius="4px"
                                lazy-load
                              />
                              <div style="padding: 3px ;">
                                <van-col span="24" class="van-ellipsis">
                                  <div
                                    style="color: #ee0a24;font-size: 16px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                                  >{{item.title}}</div>
                                </van-col>
                                <van-col span="24" class="van-ellipsis">
                                  <div style="font-size: 12px;margin: 2px 0 5px 0;">{{item.addr}}</div>
                                </van-col>
                                <van-col span="24" class="van-ellipsis">
                                  <div
                                    style="font-size: 12px;margin: 0 0 2px 0;color: #959595;font-family: 'Arial Black'"
                                  >
                                    <span v-if="item.distance<1" class="f12">距我步行{{item.distance}}m</span>
                                    <span
                                      v-if="item.distance>=1"
                                      class="f12"
                                    >距我直线{{item.distance}}km</span>
                                  </div>
                                </van-col>
                              </div>
                            </div>
                          </van-col>
                        </div>
                      </div>
                    </div>
                  </van-col>
                </van-row>
              </van-list>
            </van-pull-refresh>
          </div>
          <!--商圈数据列表end-->
        </van-tab>
      </van-tabs>
    </div>

    <div>
      <van-tabbar route active-color="#07c160" inactive-color="#000">
        <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/findShop" icon="browsing-history-o">找商铺</van-tabbar-item>
        <van-tabbar-item replace to="/businessCircle" icon="fire-o">商圈</van-tabbar-item>
        <van-tabbar-item replace to="/exam" icon="bulb-o">成交案例</van-tabbar-item>
        <van-tabbar-item replace to="/personCenter" icon="user-circle-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>


<script>
import { setToken, getToken } from "@/utils/auth"; // 在cookie中获取用户
import Vue from "vue";
import {
  ShareSheet,
  Image as VanImage,
  Divider,
  Tag,
  Toast,
  Tab,
  Tabs,
  Lazyload,
  PullRefresh,
  Tabbar,
  list,
  TabbarItem,
  Search,
  DropdownMenu,
  DropdownItem,
  Swipe,
  SwipeItem,
  Popup,
  Checkbox,
  CheckboxGroup,
  Cell,
  Sticky,
  NavBar,
} from "vant";
Vue.use(ShareSheet)
  .use(VanImage)
  .use(Divider)
  .use(Tag)
  .use(Toast)
  .use(Tab)
  .use(Tabs)
  .use(PullRefresh)
  .use(Tabbar)
  .use(TabbarItem)
  .use(list)
  .use(Search)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Popup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Cell);
Vue.use(Lazyload, {
  lazyComponent: true,
})
  .use(Sticky)
  .use(NavBar);
// import {  } from '@/api/rentout'
import {
  getClassificationList,
  getBusiness,
  dianzanAd,
  getBsInfoById,
  getAd,
} from "@/api/businessCircle";
export default {
  name: "businessCircle",
  data() {
    return {
      dianz: true,
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      show: false,
      active: 2,
      pageSize: 5, // 每页条数
      pageIndex: 1, // 页码
      businessList: [], // 请求数据
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      cityShow: false,

      rentoutForm: {},
      jd: "", //经度
      wd: "", //纬度
      search: "",
      locationCity: "",
      area: "",
      classificationList: [],
      secondList: [],
      firstList: [],
      threeList: [],
      classificationName: "餐饮",
      categoryName: "",
      listTabs: [
        { name: "餐饮" },
        { name: "服装鞋帽" },
        { name: "车辆服务" },
        { name: "酒店宾馆" },
        { name: "休闲娱乐" },
        { name: "教育培训" },
        { name: "美容美发" },
        { name: "日用百货" },
      ],
      isShowTab: false,
      value: "",
    };
  },
  activated() {
    this.locationCity = localStorage.getItem("city"); //从本地存储取出
    this.area = localStorage.getItem("area"); //从本地存储取出
    // this.getAlListPage()
    if (this.area != this.locationCity) {
      this.pageIndex = 1; // 页码
      this.businessList = []; // 请求数据
      this.getAlListPage();
    }
  },
  created() {
    // this.area = localStorage.getItem('area');//从本地存储取出
    // this.locationCity = localStorage.getItem('city');//从本地存储取出
    this.getAlListPage();
    this.getClassificationList();
  },
  computed: {},
  watch: {},

  methods: {
    share() {
      this.showShare = true;
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    toAddr() {
      this.$router.push("/addr");
    },

    backHome() {
      this.$router.push("/");
    },

    goto(id, name) {
      var url;
      switch (id) {
        case 23:
          //餐饮
          url = "/restaurantFood";
          break;
        case 25:
          //服装鞋帽
          url = "/clothing";
          break;
        case 31:
          //车辆服务
          url = "/carService";
          break;
        case 33:
          //酒店宾馆
          url = "/hotel";
          break;
        default:
          url = "/common";
      }
      this.$router.push({
        path: url,
        query: {
          typeId: id,
          classificationName: name,
        },
      });
    },
    onClick(name, title) {
      // 点击时的弹窗提示
      // Toast(title)
      this.pageIndex = 1;
      this.businessList = [];
      this.classificationName = title;
      this.getAlListPage();
    },
    onSearch() {
      this.businessList = [];
      this.getAlListPage();
    },

    getClassificationList() {
      getClassificationList({ search: "" })
        .then((response) => {
          this.classificationList = this.classificationList.concat(
            response.data
          );
          this.firstList = this.classificationList[0].firstList;
          this.secondList = this.classificationList[0].secondList;
          this.threeList = this.classificationList[0].threeList;
          // console.log(response);
        })
        .catch(function (reason) {});
    },
    getrentoutInfo(id) {
      var _this = this;
      //rentoutId: this.rentoutId
      getAd({ adId: id })
        .then((response) => {
          _this.rentoutForm = response.data;
        })
        .catch(function (reason) {
          console.log("catch:", reason);
        });
    },
    dianzan(id) {
      var token = localStorage.getItem("token");
      if (token == null) {
        Toast.success("请登录！");
        return false;
      }
      if (token != null) {
        dianzanAd({ adId: id, token: token })
          .then((response) => {
            if (response.code === 0) {
              this.getrentoutInfo(id);
              for (var i = 0; i < this.businessList.length; i++) {
                if (this.businessList[i].id === id) {
                  var viewnum = this.businessList[i].viewnum;
                  this.businessList[i].viewnum = this.rentoutForm.viewnum;
                  if (viewnum < this.rentoutForm.viewnum) {
                    Toast.success("点赞成功");
                  } else if (viewnum > this.rentoutForm.viewnum) {
                    Toast.success("取消点赞");
                  }
                  break;
                }
              }
            }
          })
          .catch(function (reason) {
            console.log("catch:", reason);
          });
      }
    },

    getAlListPage() {
      var city = localStorage.getItem("city");
      // localStorage.setItem('longitude', _this.creditLongitude)
      // localStorage.setItem('latitude', _this.creditLatitude)
      this.jd = localStorage.getItem("longitude");
      this.wd = localStorage.getItem("latitude");
      const _self = this;
      getBusiness({
        current: this.pageIndex,
        size: this.pageSize,
        search: this.search,
        classificationName: this.classificationName,
        categoryName: this.categoryName,
        cityCode: city,
        areaCode: this.areaCode,
        jd: this.jd,
        wd: this.wd,
      })
        .then((response) => {
          this.businessList = this.businessList.concat(response.data.records);

          const rows = response.data.records;
          if (rows == null || rows.length === 0) {
            // 加载结束
            _self.upFinished = true;
            return;
          }
          if (rows.length < this.pageSize) {
            // 最后一页不足10条的情况
            _self.upFinished = true;
          }
          // 处理数据
          if (_self.pageIndex === 1) {
            _self.businessList = rows;
          } else {
            _self.businessList = _self.businessList.concat(rows);
          }
        })
        .catch(function (reason) {})
        .finally(() => {
          _self.isDownLoading = false;
          _self.isUpLoading = false;
        });
    },

    onDownRefresh() {
      this.pageIndex = 1;
      this.upFinished = false; // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.getAlListPage(); // 加载数据
    },
    // 上拉加载请求方法
    onLoadList() {
      this.pageIndex++;
      this.getAlListPage();
    },

    pingUrlHotel(id) {
      return "/hotelInfo?id=" + id;
    },
    pingUrlclothing(id) {
      this.$router.push({
        path: "/merchandise",
        query: {
          id: id,
        },
      });
    },
    pingUrl(id) {
      return "/bsInfo?id=" + id;
    },
    pingVideoUrl(id) {
      return "/adVideo?id=" + id;
    },

    switchTo(path) {
      // console.log(this.$router)
      this.$router.replace(path);
    },
    go(lik) {
      this.$router.push(lik);
    },
  },

  mounted() {
    let that = this;
    /*定位当前经纬度 start*/
    localStorage.removeItem("longitude");
    localStorage.removeItem("latitude");
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        that.jd = r.point.lng;
        that.wd = r.point.lat;
        // console.log(r)
        localStorage.setItem("longitude", r.point.lng);
        localStorage.setItem("latitude", r.point.lat);
        // that.locationCity = r.address.city
        // Toast(that.jd+'===='+that.wd)
      } else {
        Toast.fail("定位失败");
      }
    });
    /*定位当前经纬度 end*/
  },
};
</script>

<style lang="scss" scope>
body {
  background: #fff;
}
.findShop-top {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 18px;
  text-align: center;
  color: #fff;
  background: linear-gradient(left, #bbbb00 20%, #ffbb00 100%);
}
.home-top {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  color: #000033;
  background: linear-gradient(left, #bbbb00 20%, #ffbb00 100%);
}
#businessCircle {
  padding-bottom: 50px;
  .exam-top {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 18px;
    text-align: center;
    color: #fff;
    background: linear-gradient(left, #bbbb00 20%, #ffbb00 100%);
  }
  .shop-box {
    overflow: hidden;
    display: block;
    transition: all 0.4s ease-in;
  }
  .shop-box img {
    display: block;
    width: 100%;
  }
  .shop-box p {
    line-height: 20px;
  }
  .masonry {
    -moz-column-count: 2; /* Firefox */
    -webkit-column-count: 2; /* Safari 和 Chrome */
    column-count: 2;
    -moz-column-gap: 0;
    -webkit-column-gap: 0;
    column-gap: 0;
    width: 100%;
    margin: 0 auto;
  }
  .item {
    padding: 7px;
    margin: 0;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
  }
  .br-desc {
    position: absolute;
    width: 100%;
    padding: 10px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
    bottom: 0;
    color: #fff;
    box-sizing: border-box;
  }
  .br-desc * {
    color: #fff;
  }
  .br-img {
    width: 100%;
    margin-bottom: 20px;
  }
  .br-img img {
    height: 284px;
    width: 100%;
    display: block;
  }
  .c-bnt {
    display: inline-block;
    padding: 2px 5px;
    margin-right: 5px;
  }
  .cbnt-active {
    background-color: #2683ea !important;
    color: #fff !important;
  }
  .qy-active {
    color: #fff !important;
    border-radius: 14px;
    background: #c81415 !important;
  }
  .need .el-checkbox-group {
    display: inline-block;
  }
  .typeChioce {
    padding: 3px;
    background: #e6e6e6;
    overflow: hidden;
  }
  .typeChioce .el-input__inner {
    border-radius: 0;
    width: 153px;
    border: 0;
    height: 24px;
    line-height: 24px;
  }
  .typeChioce .el-input__icon {
    line-height: 24px;
  }
  .text-sbnt {
    padding: 1px 5px;
    background: #daeafd;
    margin-right: 6px;
  }
  .info-list {
    display: block;
    overflow: hidden;
    padding: 7px;
    margin-top: 20px;
  }
  .info-time {
    font-size: 12px;
    color: #888;
    position: absolute;
    top: 2px;
    right: 20px;
  }
  .br-img {
    width: 100%;
    margin-top: 20px;
  }
  .br-img img {
    height: 284px;
    width: 100%;
    display: block;
  }
  .time-exp {
    font-size: 12px;
    color: #2783eb;
    margin-bottom: 10px;
  }
  .center-banner-list {
    width: 100%;
    height: 96px;
    display: block;
  }
  .exp-text {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background-color: #2683eb;
  }
  .act-bnt > span {
    padding: 4px 12px;
  }
  .el-slider__button {
    border-color: #c81415;
    width: 10px;
    height: 10px;
    background-color: #c81415;
  }
  .el-slider__bar {
    background-color: #c81415;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #c81415;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #c81415;
    border-color: #c81415;
  }
  .tag-list {
    width: 100%;
    text-align: center;
  }
  .tag-list span {
    cursor: pointer;
    display: block;
    font-size: 15px;
    padding: 3px 0;
    width: 100%;
    color: #333;
    border-bottom: 2px solid transparent;
  }
  .tag-list span.tag-active {
    border-bottom: none;
    color: #c51d12;
    position: relative;
  }
  .tag-list span.tag-active:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-top: 12px solid #c51d12;
    position: absolute;
    bottom: -21px;
    left: 65px;
    z-index: 99;
  }
  .tag-list span.mj-active {
    border-bottom: none;
    color: #c51d12;
    position: relative;
  }
  .tag-list span.mj-active:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-top: 12px solid #c51d12;
    position: absolute;
    bottom: -21px;
    left: 47%;
    z-index: 99;
  }
  .me-info {
    padding-left: 30px;
    background-repeat: no-repeat;
    height: 30px;
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: #c81415;
    border-color: #c81415;
  }
  .kailong-up {
    width: 60px;
    height: 0;
    /*border-right:20px solid transparent;*/
    /*border-left:20px solid transparent;*/
    border-bottom: 3px solid red;
  }
  .kuicon {
    display: inline-block;
    position: absolute;
    top: 21px;
    z-index: 22;
  }
  /*.businessCircle-top{*/
  /*  width: 100%;*/
  /*  padding-bottom: 10px;*/
  /*  background: linear-gradient(left,  #BBBB00 20%, #FFBB00 100%);*/
  /*}*/
  .businessCircle-top {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    color: #000033;
    background: linear-gradient(left, #bbbb00 20%, #ffbb00 100%);
  }
  .choice-list {
    width: 100%;
    display: block;
    text-align: center;
    background: #eee;
    color: #333;
    padding: 5px 0;
    border-radius: 4px;
    margin-top: 8px;
  }
}
.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 2px 5px;
  background: rgba(0, 0, 0, 0.1);
}

// 城市定位
.city-position {
  position: relative;
  color: #f2f2f2;
  width: 5rem;
  line-height: 3.5rem;
}

.city-position-icon {
  color: #fff;
  position: absolute;
  top: 1.4rem;
  right: 3px;
}

// 搜索框
.top-search {
  position: relative;
  top: 0;
  left: 36px;
  background-color: #fff;
}

.van-search {
  position: relative;
  top: 1rem;
  left: 2rem;
  margin: 0;
  padding: 0;
  width: 14rem;
  background-color: #fff !important;
  border-radius: 1rem;
}

.search-icon {
  width: 24px;
  height: 24px;
  position: absolute;
  z-index: 9;
  top: 39%;
  right: -2%;
  color: #ffbb00;
}

.van-search__content {
  border-radius: 0.4rem;
}

.van-tab--active {
  font-weight: 700;
}

// back按钮
.business-back {
  position: absolute;
  top: 15px;
  left: 5px;
  border: none;
}

// 酒店宾馆
.hotels {
  padding-left: 0.7rem;
}
</style>
