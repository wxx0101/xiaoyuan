<template>
    <footer>
        <router-link v-for="(item,index) in arr" :key="index" :to="item.url"><i :class="item.icon"></i><span>{{item.title}}</span></router-link>
    </footer>
</template>
<script>
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            arr: [
                {
                    title: "首页",
                    url: "/home",
                    icon: "iconfont icon-shouye"
                },
                {
                    title: "分类",
                    url: "/classify",
                    icon: "iconfont icon-gongzuo"
                },
                {
                    title: "购物车",
                    url: "/shopcar",
                    icon: "iconfont icon-gouwuche"
                },
                {
                    title: "我的",
                    url: "/profile",
                    icon: "iconfont icon-wode"
                }
            ]
        }
    },
    computed:{

    },
    methods:{

    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
footer{
    width: 100%;
    height: 40px;
    display: flex;
    a{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
        flex-direction: column;
        &.router-link-exact-active{
            color: orangered;
        }
    }
}
</style>