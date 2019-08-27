<template>
    <header>
        {{title}}
    </header>
</template>
<script>
export default {
    props:{
        title: {
            type: String,
            default: "校园超市"
        }
    },
    components:{

    },
    data(){
        return {

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
<style lang="scss">
header{
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
}
</style>