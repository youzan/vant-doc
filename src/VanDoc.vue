<template>
  <div class="van-doc">
    <van-doc-header :config="config.header" active="移动端" />
    <van-doc-nav :navConfig="config.nav" :base="base" />
    <van-doc-container :hasSimulator="!!(simulator || simulators.length)">
      <van-doc-content>
        <slot></slot>
        <van-doc-footer-nav :navConfig="config.nav" :base="base" />
      </van-doc-content>
    </van-doc-container>
    <van-doc-simulator v-if="simulator" :src="simulator" />
    <van-doc-simulator
      v-for="(url, index) in simulators"
      v-show="index === currentSimulator"
      :src="url"
    />
  </div>
</template>

<script>
export default {
  name: 'van-doc',

  props: {
    config: {
      type: Object,
      required: true
    },
    currentSimulator: Number,
    simulator: String,
    simulators: {
      type: Array,
      default: () => {}
    },
    base: {
      type: String,
      default: '/component'
    }
  }
};
</script>

<style lang="postcss">
@import './style/index.css';
</style>
