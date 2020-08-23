<template>

    <div class="top-toast" :style="{height:height}">
      {{msg}}
    </div>

</template>

<script>
  export default {
    name: 'top-toast',
    props: ['text'],
    data() {
      return {
        msg: this.text,
        height:0
      }
    },
    watch: {
      text(newVal) {

        this.msg = newVal;
      },
      msg(newVal) {
        console.log(newVal)
        if(newVal != ""){
          this.height = "30px";
        }else{

          this.height = 0;
        }
      }
    }
  }
</script>

<style lang="scss">
.top-toast{
  position: fixed;
  top: 0;
  width: 100%;background: #f33333;
  color: #fff;
  line-height: 30px;
  overflow: hidden;
  z-index: 999;
  text-align: center;
  transition: all 0.5s ease-in-out;
}
</style>
