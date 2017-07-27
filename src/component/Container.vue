<template>
  <div :class="['zan-doc-container', { 'zan-doc-container--with-simulator': hasSimulator }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zan-doc-container',

  props: {
    hasSimulator: Boolean
  }
}
</script>

<style lang="postcss">
@import '../style/variable';

.zan-doc-container {
  display: flex;
  overflow: hidden;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: #fff;
  margin: $zan-doc-padding $zan-doc-padding 50px $zan-doc-padding;

  &--with-simulator {
    margin-right: calc($zan-doc-simulator-width + $zan-doc-padding * 2);

    @media (max-width: 1300px) {
      margin-right: calc($zan-doc-simulator-small-width + $zan-doc-padding * 2);      
    }
  }
}
</style>
