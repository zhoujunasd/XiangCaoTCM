<template>
    <div>
        yisheng
    </div>
</template>

<script>
export default {
    data(){
        return{
            docList: [], //获取数据列表
        }
    },
    onLoad(options){
        this.getData(options)
    },
    methods: {
        getData(options){
            this.$net.get(`${options}`)
                .then(res => {

                })
        }
    },
}
</script>



