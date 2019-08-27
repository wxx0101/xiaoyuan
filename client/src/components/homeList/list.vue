<template>
  <div class="listBox" ref="listBox">
    <ListItem v-for="(item,index) in ShopList" :key="index" :ele="item" />
  </div>
</template>
<script>
import api from "../../api/index";

export default {
  props: ["page"],
  components: {},
  data() {
    return {
      ShopList: [],
      limit: 10
    };
  },
  computed: {},
  methods: {
    getData() {
      api.homeShop({ pageid: this.page, limit: this.limit }).then(res => {
        let { code, data } = res;
        if (code) {
          if (data.length) {
            this.ShopList = this.ShopList.concat(data);
          } else {
            this.$parent.willStop();
          }
          setTimeout(() => {
            this.$parent.openFn();
          }, 1000);
        }
      });
    }
  },
  created() {
    this.getData();
  },
  mounted() {},
  updated() {},
  watch: {
    page() {
      this.getData();
    }
  }
};
</script>
<style scoped lang="scss">
.listBox {
  width: 100%;
  position: relative;
}
</style>