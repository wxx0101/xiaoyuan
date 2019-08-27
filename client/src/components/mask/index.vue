<template>
  <div class="mask">
    <div class="box">
      <h2>请输入验证码</h2>
      <p>
        <span>6</span>位短信验证码已发送至
        <span>{{phone}}</span>
      </p>
      <div class="numBox">
        <input ref="ipt" v-model="codeVal" @keyup="changeFn" type="text" />
        <span v-for="(item,index) in numArr" :class="{'show': index == ind}" :key="index">{{item}}</span>
      </div>
      <div class="btn">
        <button @click="loginFn">登录</button>
      </div>
      <b @click="deleteFn">X</b>
    </div>
  </div>
</template>
<script>
import api from "../../api/index";
export default {
  props: ["phone"],
  components: {},
  data() {
    return {
      codeVal: "",
      isVal: "",
      ind: -1,
      numArr: ["", "", "", "", "", ""]
    };
  },
  computed: {},
  methods: {
    deleteFn() {
      this.$emit("del");
    },
    changeFn() {
      if (
        (parseInt(this.codeVal * 1) &&
          this.codeVal[this.codeVal.length - 1] !== "." &&
          this.codeVal[this.codeVal.length - 1] !== " ") ||
        this.codeVal === ""
      ) {
        this.isVal = this.codeVal;
      } else {
        this.codeVal = this.isVal;
      }
      let data = this.codeVal.split("");
      if (data.length > 6) {
        this.codeVal = this.codeVal.slice(0, 6);
        return;
      } else {
        this.ind = data.length - 1;
        this.numArr = this.numArr.map((item, i) => {
          if (data[i]) {
            return data[i];
          } else {
            return "";
          }
        });
      }
    },
    loginFn() {
      api.login({ phone: this.phone, checkcode: this.codeVal }).then(res => {
        let { code, data } = res
        sessionStorage.setItem("userinfo", JSON.stringify(data));
        if (code) {
          this.$router.push("/home");
        }
      });
    }
  },
  created() {},
  mounted() {
    this.$refs.ipt.focus();
  }
};
</script>
<style scoped lang="scss">
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
  .box {
    width: 80%;
    height: 200px;
    background: #fff;
    border-radius: 12px;
    position: absolute;
    left: 10%;
    top: 20%;
    b {
      position: absolute;
      right: 10px;
      top: 10px;
      font-weight: 600;
    }
    > h2 {
      width: 100%;
      height: 55px;
      font-size: 18px;
      padding-left: 10px;
      display: flex;
      align-items: center;
    }
    > p {
      width: 90%;
      height: 20px;
      color: #666;
      font-size: 10px;
      font-weight: 200;
      margin-left: 10px;
      display: flex;
      justify-content: flex-start;
      span {
        color: #000;
        font-weight: 600;
      }
    }
    .btn {
      width: 100%;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 22px;
      > button {
        width: 94%;
        height: 90%;
        border-radius: 20px;
        border: none;
        outline: none;
        background: #fd542d;
        color: #fff;
      }
    }
    .numBox {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      > input {
        width: 100%;
        height: 40px;
        position: absolute;
        opacity: 0;
      }
      > span {
        width: 30px;
        height: 30px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        &.show {
          border: 1px solid red;
        }
      }
    }
  }
}
</style>
