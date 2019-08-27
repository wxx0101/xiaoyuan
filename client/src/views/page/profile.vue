<template>
  <div class="wrap">
    <Header />
    <div class="main">
      <div class="top">
        <div class="left">
          <h2 v-if="userinfo">{{userinfo.nickname}}</h2>
          <h2 v-else>
            <a href="/login">未登录</a>
          </h2>
          <p>开启美好的一天...</p>
        </div>
        <div class="right">
          <img :src="userinfo.avatar" alt />
        </div>
      </div>
      <div class="order">
        <div>
          <h3>我的订单</h3>
          <span>查看全部></span>
        </div>
        <ul>
          <li v-for="(item,index) in orderArr" :key="index">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="box">
        <p>
          <span>我的优惠卷</span>
          <b>8张未使用</b>
        </p>
        <p>
          <span>资质规则</span>
        </p>
        <p>
          <span>联系客服</span>
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      userinfo: "",
      orderArr: [
        {
          name: "待付款",
          icon: "iconfont icon-01"
        },
        {
          name: "待配送",
          icon: "iconfont icon-gongzuojilu"
        },
        {
          name: "已发送",
          icon: "iconfont icon-daishouhuo-01"
        },
        {
          name: "退款/售后",
          icon: "iconfont icon-31"
        }
      ]
    };
  },
  computed: {},
  methods: {},
  created() {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo) {
      this.userinfo = userinfo;
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    overflow: auto;
    background: #eee;
    position: relative;
    > b {
      position: absolute;
      left: 20%;
      top: 40%;
      > a {
        color: blue;
        font-size: 25px;
      }
    }
    .top {
      width: 100%;
      height: 120px;
      background: #fe3113;
      display: flex;
      .left {
        flex: 7;
        display: flex;
        flex-direction: column;
        h2 {
          flex: 5;
          display: flex;
          align-items: flex-end;
          padding-left: 10px;
          font-size: 20px;
          color: #fff;
          padding-bottom: 6px;
          a {
            color: #fff;
          }
        }
        p {
          flex: 5;
          display: flex;
          align-items: flex-start;
          padding-left: 10px;
          color: #fff;
          font-size: 12px;
        }
      }
      .right {
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
    .order {
      width: 94%;
      height: 130px;
      border-radius: 8px;
      margin: 3%;
      background: #fff;
      position: absolute;
      top: 90px;
      display: flex;
      flex-direction: column;
      > div {
        width: 100%;
        height: 40px;
        display: flex;
        h3 {
          flex: 5;
          display: flex;
          align-items: center;
          padding-left: 8px;
        }
        span {
          flex: 5;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8px;
          color: #666;
          font-size: 12px;
        }
      }
      ul {
        flex: 1;
        display: flex;
        margin-top: 15px;
        li {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          color: #000;
          flex-direction: column;
          i {
            font-size: 20px;
            color: #fe3113;
          }
        }
      }
    }
    .box {
      width: 94%;
      background: #fff;
      border-radius: 8px;
      margin: 130px 3% 0 3%;
      > p {
        width: 100%;
        height: 45px;
        display: flex;
        > span {
          flex: 5;
          height: 100%;
          display: flex;
          align-items: center;
          padding-left: 10px;
        }
        > b {
          flex: 5;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 30px;
          color: #666;
        }
      }
    }
  }
}
</style>