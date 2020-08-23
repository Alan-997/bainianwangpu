<template>
  <div class="contact">
    <div class="contact-list">
        <ul>
          <li>
            <div class="contact-list-contenr"> 呼叫</div>
          </li>
          <li>
            <div class="contact-list-contenr">复制</div>
          </li>
          <li class="no-border">
            <div class="contact-list-contenr"> 添加到通讯录</div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Overlay } from 'vant';
Vue.use(Overlay);
export default {
  name: 'Contact',
    data() {
    return {
      show: false
    }
  }
}
</script>

<style>
  .no-border {
    border: none !important;
  }
  .contact {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .contact-list {
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    margin-left: -10rem;
    margin-top: -6rem;
    width: 20rem;
    height: 11.5rem;
    background-color: #fff;
    border-radius: 0.75rem;
  }

  .contact-list li {
    width: 100%;
    height: 3.75rem;
    line-height: 3.75rem;
    border-bottom: 1px solid rgb(224, 224, 224);
  }

  
  .contact-list-contenr {
    padding: 0 10px;
  }
</style>