<template>
  <section class="van-doc-demo-block">
    <h2 class="van-doc-demo-block__title">{{ title }}</h2>
    <slot></slot>
  </section>  
</template>

<script>
export default {
  name: 'van-doc-demo-block',

  props: {
    title: String
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.van-doc-demo-block {
  &__title {
    margin: 0;
    font-weight: normal;
    font-size: 14px;
    color: $van-doc-text-light-blue;
    padding: 40px 15px 15px;
  }

  &:first-of-type {
    .van-doc-demo-block__title {
      padding-top: 20px;
    }
  }
}
</style>
