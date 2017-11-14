<template>
  <section :class="`demo-${demoName}`">
    <h1 class="van-doc-demo-section__title">{{ title || demoName }}</h1>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'van-doc-demo-section',

  props: {
    name: String,
    title: String
  },

  computed: {
    demoName() {
      return this.name || this.getParentName();
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