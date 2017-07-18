<template>
  <div class="zan-doc-block">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zan-doc-block'
}
</script>

<style lang="postcss">
@import '../style/variable';

.zan-doc-block {
  display: flex;
  margin-bottom: 20px;

  .highlight {
    flex: 1;
    box-sizing: border-box;
    margin-right: $zan-doc-padding;

    pre {
      word-break: break-all;
    }
  }
}
</style>
