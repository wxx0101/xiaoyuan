<template>
  <div class="registerBox">
    <Header />
    <h2>手机号注册</h2>
    <div class="ipt">
      <input type="text" placeholder="手机号" />
    </div>
    <div class="ipt">
      <input type="password" placeholder="密码" />
    </div>
    <div class="btn">
      <button>注册</button>
    </div>
    <div class="con">
      <a href="/login">使用手机号进行登录</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.registerBox {
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
  .btn {
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