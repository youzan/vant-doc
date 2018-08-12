<template>
  <div class="van-doc">
    <van-doc-header :config="config.header" :active="active" />
    <van-doc-nav :nav-config="config.nav" :base="base" />
    <van-doc-container :has-simulator="!!(simulator || simulators.length)">
      <van-doc-content>
        <slot />
        <van-doc-footer-nav :nav-config="config.nav" :base="base" />
      </van-doc-content>
    </van-doc-container>
    <van-doc-simulator v-if="simulator" :src="simulator" />
    <van-doc-simulator
      v-for="(url, index) in simulators"
      v-show="index === currentSimulator"
      :src="url"
      :key="url"
    />
  </div>
</template>

<script>
export default {
  name: 'van-doc',

  props: {
    active: String,
    config: {
      type: Object,
      required: true
    },
    currentSimulator: Number,
    simulator: String,
    simulators: {
      type: Array,
      default: () => []
    },
    base: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="postcss">
@import './style/index.css';
</style>
