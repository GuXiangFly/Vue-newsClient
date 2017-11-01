<template>
    <div>
        <h3>
            我是新闻页
        </h3>
        <ul>
            <div v-for="(value,index) in news">
                {{value}}
            </div>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'news',
        data(){
            return{
                news:['11111','222222','3333','4444444']
            }
        }
    }
</script>