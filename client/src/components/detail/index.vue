<template>
  <div class="wrap">
    <Header title="详情" />
    <div class="main">
      <div class="img-box">
        <swiper v-if="imgArr.length" :options="swiperOption">
          <swiper-slide v-for="(item,index) in imgArr" :key="index">
            <img :src="item" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="con">
        <h2>{{obj.name}}</h2>
        <p>累计{{(obj.volume/10000).toFixed(2)}}万份/已拼{{obj.stock}}份</p>
        <b>
          ￥{{obj.price}}&nbsp;
          <s>￥199</s>
        </b>

        <div class="context" ref="context"></div>
      </div>
    </div>
    <div class="bottom">
      <button @click="backFn">返回</button>
      <button @click="addShopFn(obj.id)">加入购物车</button>
    </div>
  </div>
</template>
<script>
import api from "../../api/index";
import { Message } from "element-ui";

export default {
  props: {},
  components: {},
  data() {
    return {
      swiperOption: {
        loop: true,
        observer: true,
        observeParents: true
      },
      obj: {},
      imgArr: []
    };
  },
  computed: {},
  methods: {
    backFn() {
      this.$router.go(-1);
    },
    addShopFn(id) {
      let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      if (!userinfo) {
        alert(`用户未登录,请前往登录界面 ^_^`);
        this.$router.push("/login");
      } else {
        // this.$router.push("/shopcar")
        api.carAddCar({ user_id: userinfo.userid, shop_id: id }).then(res => {
          let { code } = res;
          if (code) {
            Message({
              message: "成功添加购物车",
              type: "success"
            });
          }
        });
      }
    }
  },
  created() {
    let { id } = this.$route.query;
    api.allShop().then(res => {
      let { code, data } = res;
      if (code) {
        this.obj = data.find(item => item.id == id);
        this.$refs.context.innerHTML = this.obj.detail;
        this.imgArr = JSON.parse(this.obj.pictures);
      }
    });
  },
  mounted() {}
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > .main {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    > .img-box {
      width: 100%;
      .swiper-container {
        width: 100%;
        .swiper-wrapper {
          width: 100%;
          .swiper-slide {
            width: 100%;
            > img {
              width: 100%;
            }
          }
        }
      }
    }
    > .con {
      width: 100%;
      > h2 {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 40px;
        font-size: 22px;
      }
      > p {
        font-size: 12px;
        height: 30px;
        color: #666;
        line-height: 30px;
        padding-left: 12px;
      }
      > b {
        width: 100%;
        height: 35px;
        font-size: 18px;
        padding-left: 10px;
        line-height: 35px;
        color: #fe3113;
        s {
          font-size: 11px;
          color: #999;
          line-height: 40px;
        }
      }
      > .context {
        width: 100%;
        > p {
          width: 100%;
          > img {
            width: 100%;
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 40px;
    box-shadow: 3px 3px 5px #333;
    button {
      outline: none;
      border: none;
      height: 100%;
      width: 50%;
      background: #fe3113;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      &:nth-child(1) {
        background: #ccc;
      }
    }
  }
}
</style>