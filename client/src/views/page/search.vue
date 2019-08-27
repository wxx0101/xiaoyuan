<template>
  <div class="wrap">
    <div class="ipt-box">
      <i class="iconfont icon-fangdajing"></i>
      <input type="text" v-model="val" @input="iptFn" placeholder="搜索校园超市商品" />
    </div>
    <div class="content" v-if="dataList.length">
      <ListItem v-for="(item,index) in dataList" :key="index" :ele="item" />
    </div>
    <div class="content" v-else>
      <b>暂无数据</b>
    </div>
  </div>
</template>
<script>
import api from "../../api/index";
export default {
  props: {},
  components: {},
  data() {
    return {
      val: "",
      dataList: []
    };
  },
  computed: {},
  methods: {
    iptFn() {
      if (this.val !== "") {
        api.carSearch({ search_key: this.val }).then(res => {
          let { code, data } = res;
          if (code) {
            this.dataList = data;
          }
        });
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .ipt-box {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    position: relative;
    box-shadow: 3px 3px 5px #eee;
    input {
      width: 94%;
      height: 80%;
      margin: 0 3%;
      border-radius: 10px;
      outline: none;
      border: none;
      background: #eee;
      padding-left: 30px;
      box-sizing: border-box;
      font-size: 12px;
    }
    i {
      position: absolute;
      left: 15px;
      z-index: 999;
      top: 7px;
    }
  }
  .content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    > b {
      position: absolute;
      left: 40%;
      top: 40%;
      color: #666;
    }
  }
}
</style>