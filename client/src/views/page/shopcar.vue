<template>
  <div class="wrap">
    <Header />
    <div class="main" v-if="userinfo">
      <p>
        总价:
        <b>{{allPrice.toFixed(2)}}</b>
      </p>
      <div class="content">
        <ListItem v-for="(item,index) in dataList" :key="index" :ele="item" />
      </div>
    </div>
    <div class="main" v-else>
      <b>
        用户未登录,请前往&nbsp;
        <a href="/login">登录</a>&nbsp;界面
      </b>
    </div>
    <Footer />
  </div>
</template>
<script>
import api from "../../api/index";
export default {
  props: {},
  name: "shopcar",
  components: {},
  data() {
    return {
      userinfo: "",
      dataList: [],
      allPrice: 0
    };
  },
  computed: {},
  methods: {
    deleteFn(id) {
      let ind = this.dataList.findIndex(item => item.id == id);
      if (this.dataList[ind].checked) {
        this.allPrice -= this.dataList[ind].price * this.dataList[ind].count;
      }
      this.dataList.splice(ind, 1);
    },
    addFn(id) {
      let ind = this.dataList.findIndex(item => item.id == id);
      this.dataList[ind].count = ++this.dataList[ind].count;
      this.allPrice += this.dataList[ind].price;
    },
    delFn(id) {
      let ind = this.dataList.findIndex(item => item.id == id);
      this.dataList[ind].count = --this.dataList[ind].count;
      this.allPrice -= this.dataList[ind].price;
    },
    changeCheckedFn(id) {
      let ind = this.dataList.findIndex(item => item.id == id);
      this.dataList[ind].checked = !this.dataList[ind].checked;
      if (this.dataList[ind].checked) {
        this.allPrice += this.dataList[ind].price * this.dataList[ind].count;
      } else {
        this.allPrice -= this.dataList[ind].price * this.dataList[ind].count;
      }
    },
    getData() {
      let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      if (userinfo) {
        this.userinfo = userinfo;
        api.carGetCar({ user_id: userinfo.userid }).then(res => {
          let { code, data } = res;
          if (code) {
            let arr = [];
            data.forEach(item => {
              item.shopdata.checked = false;
              item.shopdata.count = item.count;
              arr.push(item.shopdata);
              this.dataList = arr;
            });
          }
        });
      }
    }
  },
  created() {
    this.getData();
  },
  mounted() {},
  updated() {},
  activated() {
    // this.getData();
  }
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
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    > p {
      width: 100%;
      height: 45px;
      right: 10px;
      font-size: 15px;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      box-shadow: 3px 3px 3px #eee;
      > b {
        font-size: 22px;
        color: red;
        float: left;
        margin: 0 10px;
      }
    }
    .content {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
    }
    > b {
      position: absolute;
      left: 20%;
      top: 40%;
      a {
        color: blue;
        font-size: 25px;
      }
    }
  }
}
</style>