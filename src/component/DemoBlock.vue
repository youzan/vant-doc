<template>
  <div class="zan-doc-demo-block">
    <h2 class="zan-doc-demo-block__subtitle">{{ title }}</h2>
    <slot></slot>
  </div>  
</template>

<script>
export default {
  name: 'zan-doc-demo-block',

  props: {
    title: String
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.zan-doc-demo-block {
  &__title,
  &__subtitle {
    margin: 0;
    font-weight: normal;
  }

  &__title {
    padding: 15px;
    font-size: 16px;
    line-height: 1.5;

    + .zan-doc-demo-block {
      .zan-doc-demo-block__subtitle {
        padding-top: 0;
      }
    }
  }

  &__subtitle {
    font-size: 14px;
    color: $zan-doc-text-light-blue;
    padding: 40px 15px 10px;
  }
}
</style>
