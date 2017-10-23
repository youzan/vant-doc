<template>
  <div class="zan-doc">
    <zan-doc-header :nav="config.header" active="移动端" />
    <zan-doc-container :hasSimulator="!!(simulator || simulators.length)">
      <zan-doc-nav :navConfig="config.nav" :base="base" />
      <zan-doc-content>
        <slot></slot>
        <zan-doc-footer-nav :navConfig="config.nav" :base="base" />
      </zan-doc-content>
    </zan-doc-container>
    <zan-doc-simulator v-if="simulator" :src="simulator" />
    <zan-doc-simulator
      v-for="(url, index) in simulators"
      v-show="index === currentSimulator"
      :src="url"
    />
    <zan-doc-footer :config="config.footer" />
  </div>
</template>

<script>
export default {
  name: 'zan-doc',

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
