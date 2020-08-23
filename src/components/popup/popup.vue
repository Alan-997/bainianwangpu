<template>
  <transition name='fade'>
    <!-- 蒙版 -->
    <div class="mask" v-if="show" @touchmove.prevent>
      <div class="window">
        <img class="shadow" :src="imgUrl" alt="">
        <h1>{{title}}</h1>
        <p>{{content}}</p>
        <button @click="btnClick">{{btnText}}</button>
      </div>
      <span @click="show = false" v-fb class="close" >关闭</span>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        show: false,
        imgUrl: '',
        title: '',
        content: '',
        btnText: '',
        click: ''
      }
    },
    created () {
    },
    methods: {
      btnClick () {
        this.click()
        this.show = false
      }
    }
  }
</script>

<style>

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .35s;
  }


</style>
