<template>
  <div class="van-doc-container van-doc-row" :class="{ 'van-doc-container--with-simulator': hasSimulator }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'van-doc-container',

  props: {
    hasSimulator: Boolean
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.van-doc-container {
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fff;
  padding-left: $van-doc-nav-width;

  &--with-simulator {
    padding-right: calc($van-doc-simulator-width + $van-doc-padding);

    @media (max-width: 1300px) {
      padding-right: calc($van-doc-simulator-small-width + $van-doc-padding);
    }
  }
}
</style>
