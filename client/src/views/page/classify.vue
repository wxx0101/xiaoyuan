<template>
  <div class="wrap">
    <Header />
    <div class="main">
      <div class="ipt-box" @click="iptFn">
        <i class="iconfont icon-fangdajing"></i>
        <input type="text" placeholder="搜索校园超市商品"  />
      </div>
      <div class="content">
        <div class="left">
          <p
            v-for="(item,index) in dataList"
            :class="{'active': index == currentInd}"
            :key="index"
            @click="switchFn(index,item.id)"
          >{{item.title}}</p>
        </div>
        <div class="right" v-if="topArr.length">
          <ul>
            <li
              v-for="(ite,ind) in topArr"
              :key="ind"
              :class="{'show': childInd == ind}"
              @click="switchChildFn(ind,ite.parent_id,ite.id)"
            >{{ite.name}}</li>
          </ul>
          <div class="con">
            <ListItem v-for="(item,index) in listData" :key="index" :ele="item" />
          </div>
        </div>
        <div class="right" v-else>
          <b>暂无数据</b>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import api from "../../api/index";
export default {
  props: {},
  components: {},
  data() {
    return {
      currentInd: 0,
      childInd: 0,
      dataList: [],
      topArr: [],
      parent_id: "",
      child_id: "",
      listData: []
    };
  },
  computed: {},
  methods: {
    iptFn(){
      this.$router.push("/search")
    },  
    switchFn(index, parent_id) {
      this.currentInd = index;
      this.childInd = 0;
      this.topArr = this.dataList[index].children;
      this.parent_id = parent_id;
      this.child_id = this.dataList[index].children[0]
        ? this.dataList[index].children[0].id
        : "";
      this.getData();
    },
    switchChildFn(ind, parent_id, child_id) {
      this.childInd = ind;
      this.parent_id = parent_id;
      this.child_id = child_id;
      this.getData();
    },
    getData() {
      api
        .shopSelectType({ type_id: this.parent_id, category_id: this.child_id })
        .then(res => {
          let { code, data } = res;
          if (code) {
            this.listData = data;
          }
        });
    }
  },
  created() {
    api.classifyShop().then(res => {
      let { code, data } = res;
      if (code) {
        this.dataList = data;
        this.topArr = this.dataList[0].children;
        this.parent_id = this.dataList[0].children[0].parent_id;
        this.child_id = this.dataList[0].children[0].id;
      }
    });
  },
  updated() {
  },
  mounted() {},
  watch: {
    dataList() {
      this.getData();
    }
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
    overflow: auto;
    display: flex;
    flex-direction: column;
    .ipt-box {
      width: 100%;
      height: 30px;
      position: relative;
      input {
        width: 94%;
        height: 100%;
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
      overflow: auto;
      display: flex;
      margin-top: 6px;
      .left {
        width: 85px;
        height: 100%;
        box-sizing: border-box;
        background: #eee;
        p {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          color: #666;
          &.active {
            background: #fff;
          }
        }
      }
      .right {
        flex: 1;
        overflow: auto;
        display: flex;
        flex-direction: column;
        position: relative;
        ul {
          width: 100%;
          height: 25px;
          border-bottom: 1px solid #ccc;
          li {
            float: left;
            padding: 5px;
            color: #777;
            font-size: 12px;
            box-sizing: border-box;
            &.show {
              color: #000;
            }
          }
        }
        .con {
          flex: 1;
          overflow-x: hidden;
          overflow-y: auto;
        }
        >b{
          position: absolute;
          left: 35%;
          top: 40%;
          color: #333;
        }
      }
    }
  }
}
</style>