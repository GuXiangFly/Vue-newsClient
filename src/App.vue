<template>
    <div id="app">

        <ul>
            <li>
                <loading v-if="loading"></loading>
                <NavView></NavView>
                <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
                    <keep-alive>
                        <router-view class="router-view"></router-view>
                    </keep-alive>
                </transition>
                <FooterView></FooterView>
                <!-- <router-link to="/home">主页</router-link>
                 <router-link to="/news">新闻</router-link>-->
            </li>
        </ul>
    </div>
</template>

<script>
    import NavView from './components/Nav.vue'
    import FooterView from './components/Footer.vue'

    import {mapGetters,mapActions} from 'vuex'
    import animate from 'animate.css'
    export default {
        name: 'app',
        components: {
            NavView,
            FooterView
        },
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted(){
            var path=this.$route.path.substring(1);
            this.headerChange(path);
            this.footerChange(path);
        },
        watch:{
            $route(to,from){
                var path=to.path.substring(1);
                this.headerChange(path);
                this.footerChange(path);
            }
        },

        methods:{
            headerChange(path){
                if(path=='user-info' || path=='user-reg' || path=='user-login' || path.indexOf('article')!=-1){
                    this.$store.dispatch('SHOW_HEAD_FAIL')
                }else{
                    this.$store.dispatch('SHOW_HEAD_SUCC')
                }
            },
            footerChange(path){
                if(path.indexOf('article')==-1){
                    this.$store.dispatch('showFooter');
                }else{
                    this.$store.dispatch('hideFooter');
                }
            }
        }
    }
</script>

<style>

@import "./assets/css/index.css";

</style>
