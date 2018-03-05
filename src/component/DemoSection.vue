<template>
  <section class="van-doc-demo-section" :class="`demo-${demoName}`" :style="style">
    <slot></slot>
  </section>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'van-doc-demo-section',

  props: {
    name: String,
    title: String,
    background: String
  },

  computed: {
    demoName() {
      return this.name || this.getParentName();
    },
    style() {
      return {
        background: this.background
      };
    }
  },

  methods: {
    getParentName() {
      const { $parent } = this;
      if ($parent && $parent.$options.name) {
        return $parent.$options.name.replace('demo-', '');
      }
    }
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.van-doc-demo-section {
  min-height: 100vh;
  padding-bottom: 20px;
  box-sizing: border-box;

  &__title {
    margin: 0;
    padding: 15px;
    font-size: 16px;
    line-height: 1.5;
    font-weight: normal;
    text-transform: capitalize;

    + .van-doc-demo-block {
      .van-doc-demo-block__title {
        padding-top: 0;
      }
    }
  }
}
</style>