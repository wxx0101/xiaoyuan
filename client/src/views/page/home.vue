<template>
  <div class="homeBox">
    <div class="wrap" v-if="positionName">
      <Header />
      <div class="main" @scroll="scrollFn" ref="main">
        <div class="content" ref="content">
          <div class="topBig" ref="topBig">
            <div class="top">
              <div class="left" @click="positionFn">
                <i class="iconfont icon-dingwei"></i>
                送至：{{positionName}}>
              </div>
              <div class="right">
                <i class="iconfont icon-fangdajing"></i>
              </div>
            </div>
            <div class="banner">
              <swiper v-if="bannerArr.length" :options="swiperOption">
                <swiper-slide v-for="(item,index) in bannerArr" :key="index">
                  <a :href="item.url">
                    <img :src="item.image" />
                  </a>
                </swiper-slide>
              </swiper>
            </div>
            <div class="logo">
              <div class="logo-item" v-for="(item,index) in logo" :key="index">
                <div class="img-box">
                  <img :src="item.url" alt />
                </div>
                <span>{{item.name}}</span>
              </div>
            </div>
            <div class="dailyBuy">
              <h2>
                每日必购
                <span>大家都在买</span>
              </h2>
              <div>
                <img src="../../static/logo/big.png" alt />
              </div>
            </div>
          </div>
          <List :page="page" />
          <div v-show="flag" class="loadBox">
            <img src="../../static/logo/loading.gif" alt />
          </div>
        </div>
      </div>
      <Footer />
    </div>
    <div class="wrap" v-else>
      <img src="../../static/logo/定位.png" alt />
    </div>
  </div>
</template>
<script>
import api from "../../api/index";
import { Message } from "element-ui";

export default {
  props: {},
  name: "home",
  components: {},
  data() {
    return {
      logo: [
        {
          name: "蔬菜每日鲜",
          url: require("../../static/logo/1.png")
        },
        {
          name: "肉蛋禽",
          url: require("../../static/logo/2.png")
        },
        {
          name: "母婴天地",
          url: require("../../static/logo/3.png")
        },
        {
          name: "进店必买",
          url: require("../../static/logo/4.png")
        },
        {
          name: "美通卡",
          url: require("../../static/logo/5.png")
        },
        {
          name: "早晚市",
          url: require("../../static/logo/6.png")
        },
        {
          name: "品牌汇",
          url: require("../../static/logo/7.png")
        },
        {
          name: "领卷中心",
          url: require("../../static/logo/8.png")
        },
        {
          name: "支付优惠",
          url: require("../../static/logo/9.png")
        },
        {
          name: "直采品牌",
          url: require("../../static/logo/10.png")
        }
      ],
      swiperOption: {
        loop: true,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 1000
        }
      },
      bannerArr: [],
      flag: false,
      go: true,
      page: 0,
      positionName: "",
      heightH: 0
    };
  },
  computed: {},
  methods: {
    scrollFn(e) {
      if (!this.flag && this.go) {
        let Top = e.target.scrollTop;
        let mainH = e.target.offsetHeight;
        let contentH = this.$refs.content.offsetHeight;
        this.heightH = Top;
        if (contentH - mainH < Top) {
          this.flag = true;
          setTimeout(() => {
            this.page = ++this.page;
          }, 1500);
        }
      }
    },
    openFn() {
      this.flag = false;
    },
    willStop() {
      this.go = false;
    },
    positionFn() {
      this.$router.push("/position");
    },
    getLocation() {
      let that = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          if (data) {
            sessionStorage.setItem("position", data.formattedAddress);
            that.positionName = data.formattedAddress;
          }
          console.log("定位成功信息：", data.formattedAddress);
        }
        function onError(data) {
          // 定位出错
          Message({
            message: "定位失败,手动定位",
            type: "warning"
          });
          that.$router.push("/position");
          console.log("定位失败错误：", data);
        }
      });
    }
  },
  created() {
    this.positionName = sessionStorage.getItem("position");
    api.homeBanner().then(res => {
      let { code, data } = res;
      if (code) {
        this.bannerArr = data.filter(item => {
          let { start_time, end_time } = item;
          let date = new Date() * 1;
          if (
            date > new Date(start_time) * 1 &&
            date < new Date(end_time) * 1
          ) {
            return item;
          }
        });
        if (!this.positionName) {
          this.getLocation();
        }
      }
    });
  },
  mounted() {},
  activated() {
    if (this.$refs.main) {
      this.$refs.main.scrollTop = this.heightH;
    }
    this.positionName = sessionStorage.getItem("position");
  }
};
</script>
<style lang="scss">
.homeBox {
  width: 100%;
  height: 100%;
  > .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    > img {
      width: 100%;
      height: 100%;
    }
    > .main {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      .content {
        width: 100%;
        height: 100%;
        .topBig {
          width: 100%;
          overflow: hidden;
          .top {
            width: 100%;
            height: 30px;
            font-size: 12px;
            display: flex;
            flex-direction: row;
            .left {
              flex: 5;
              height: 100%;
              color: #777;
              padding-left: 6px;
              line-height: 30px;
              display: inline-block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .right {
              flex: 5;
              height: 100%;
              display: flex;
              line-height: 32px;
              position: relative;
              i {
                position: absolute;
                right: 6px;
              }
            }
          }
          .banner {
            width: 100%;
            .swiper-container {
              width: 100%;
              background: rgba(0, 0, 0, 0.1);
              .swiper-wrapper {
                width: 100%;
                .swiper-slide {
                  width: 100%;
                  a {
                    display: block;
                    text-align: center;
                    > img {
                      max-width: 100%;
                      height: 160px;
                    }
                  }
                }
              }
            }
          }
          .logo {
            width: 100%;
            height: 120px;
            display: flex;
            flex-wrap: wrap;
            .logo-item {
              width: 20%;
              height: 50%;
              display: flex;
              flex-direction: column;
              .img-box {
                flex: 8;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  width: 35px;
                  height: 35px;
                }
              }
              span {
                flex: 2;
                width: 100%;
                font-size: 10px;
                text-align: center;
                color: #777;
              }
            }
          }
          .dailyBuy {
            width: 100%;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            h2 {
              width: 100%;
              height: 40px;
              font-weight: 600;
              font-size: 20px;
              font-family: "幼圆";
              display: flex;
              align-items: center;
              span {
                font-weight: 200;
              }
            }
            > div {
              width: 100%;
              img {
                width: 100%;
              }
            }
          }
        }
        .loadBox {
          width: 100%;
          height: 50px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>