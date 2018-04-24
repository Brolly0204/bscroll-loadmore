<template>
  <scroll 
  ref="scroll-wrapper" :bounce="bounce" :listenTouchEnd="listenTouchEnd" :listenScrollEnd="listenScrollEnd" :scrollbar="scrollbar"
    @touchEnd="loadMore" 
    @scrollEnd="loadMore">
    <div>
      <ul class="list-container">
        <li v-for="(list, index) in listData" :key="index">{{list.id + index}}</li>
      </ul>
      <div class="loadinfo">{{loadinfo}}</div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from './Scroll.vue';
  import {
    getList
  } from '@/api/list';
  export default {
    data() {
      return {
        listData: [],
        bounce: true,
        listenTouchEnd: true,
        loading: false,
        scrollbar: true,
        listenScrollEnd: true,
        loadinfo: '上拉加载更多',
        num: 0
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      initScroll() {
        this.$refs['scroll-wrapper']._initScroll();
      },
      loadData() {
        getList().then(res => {
          let {
            code,
            result
          } = res.data;
          if (code === 200) {
            this.listData.push(...result.slice(0, 50));
            this.$nextTick(() => {
              this.loading = false;
              this.loadinfo = '上拉加载更多';
              this.initScroll();
              if (++this.num >= 5) {
                this.loadinfo = '客官我们也是有底线的~~';
              }
            });
          }
        })
      },
      loadMore(pos) {
        let {
          maxScrollY
        } = this.$refs['scroll-wrapper'].scroll;
        if (pos.y <= (maxScrollY + 200) && !this.loading && this.num < 5) {
          this.loading = true;
          this.loadinfo = '正在加载...';
          setTimeout(() => {
            this.loadData();
          }, 500);
        }
      }
    },
    components: {
      Scroll
    }
  }

</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #app {
    width: 100%;
    height: 100%;
  }

  .components-scroll {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
  }

  .list-container li {
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: pink;
    border: 1px solid #cccccc;
    list-style: none;
  }

  .loadinfo {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

</style>
