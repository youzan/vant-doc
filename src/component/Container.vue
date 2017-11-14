<template>
  <div :class="['van-doc-container', { 'van-doc-container--with-simulator': hasSimulator }]">
    <slot></slot>
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
  display: flex;
  overflow: hidden;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: #fff;
  margin: $van-doc-padding $van-doc-padding 50px $van-doc-padding;

  &--with-simulator {
    margin-right: calc($van-doc-simulator-width + $van-doc-padding * 2);

    @media (max-width: 1300px) {
      margin-right: calc($van-doc-simulator-small-width + $van-doc-padding * 2);      
    }
  }
}
</style>
