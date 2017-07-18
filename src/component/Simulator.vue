<template>
  <div :class="['zan-doc-simulator', { 'zan-doc-simulator-fixed': isFixed }]">
    <iframe :src="src" frameborder="0" />
  </div>
</template>

<script>
export default {
  name: 'zan-doc-simulator',

  props: {
    src: String
  },

  data() {
    return {
      scrollTop: window.scrollY
    };
  },

  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollTop = window.scrollY;
    });
  },

  computed: {
    isFixed() {
      return this.scrollTop > 60;
    }
  }
}
</script>

<style lang="postcss">
@import '../style/variable';

.zan-doc-simulator {
  z-index: 1;
  overflow: hidden;
  position: absolute;
  border-radius: 6px;
  background: #f2f2f4;
  box-sizing: border-box;
  right: $zan-doc-padding;
  width: $zan-doc-simulator-width;
  height: $zan-doc-simulator-height;
  min-width: $zan-doc-simulator-width;
  top: calc($zan-doc-padding + $zan-doc-header-top-height);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);

  &-fixed {
    top: $zan-doc-padding;
    position: fixed;
  }

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>


