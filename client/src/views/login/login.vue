<template>
  <div class="loginBox">
    <Header />
    <h2>手机号登录</h2>
    <div class="ipt">
      <input type="text" v-model="phone" placeholder="手机号" />
    </div>
    <div class="btn">
      <button :class="{'active': open}" @click="btnFn">获取验证码</button>
    </div>
    <div class="con">
      <a href="/register">没有账号，请亲爱滴前往注册</a>
    </div>
    <MaskBox v-if="open" :phone="phone" @del="delFn" />
  </div>
</template>
<script>
import MaskBox from "../../components/mask/index";
import api from "../../api/index";

export default {
  props: {},
  components: {
    MaskBox
  },
  data() {
    return {
      open: false,
      phone: ""
    };
  },
  computed: {},
  methods: {
    btnFn() {
      if (this.phone !== "") {
        api.userCheckbox({ phone: this.phone }).then(res => {
          let { code } = res
          if (code) {
            this.open = true;
          }
        });
      } else {
        alert("手机号不正确，亲爱滴 ^_^");
      }
    },
    delFn() {
      this.open = false;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.loginBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h2 {
    width: 100%;
    height: 55px;
    font-size: 25px;
    display: flex;
    align-items: center;
  }
  .ipt {
    width: 100%;
    height: 36px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    > input {
      width: 94%;
      height: 100%;
      padding-left: 6px;
      border-bottom: 1px solid #eee;
    }
  }
  > .btn {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    > button {
      width: 94%;
      height: 90%;
      border-radius: 20px;
      border: none;
      outline: none;
      background: #fd542d;
      color: #fff;
      &.active {
        background: #eeeeee;
        color: #333;
      }
    }
  }
  .con {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
  }
}
</style>