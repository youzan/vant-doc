<template>
  <div :class="['zan-doc-simulator', { 'zan-doc-simulator-fixed': isFixed }]">
    <div class="zan-doc-simulator__nav">
      <div class="zan-doc-simulator__url">{{ iframeHostName }}</div>
      <div class="zan-doc-simulator__reload" @click="reloadIframe"></div>
    </div>
    <iframe ref="iframe" :src="src" :style="simulatorStyle" frameborder="0" />
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
      scrollTop: window.scrollY,
      iframeHostName: '',
      windowHeight: window.innerHeight
    };
  },

  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollTop = window.scrollY;
    });
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight;
    })
    
    const { iframe } = this.$refs;
    if (iframe) {
      if (iframe.contentDocument.readyState === 'complete') {
        setTimeout(this.onSrcChanged, 0);
      } else {
        iframe.onload = () => {
          this.onSrcChanged();
        }
      }
    }
  },

  watch:{
    src() {
      this.onSrcChanged();
    }
  },

  computed: {
    isFixed() {
      return this.scrollTop > 60;
    },
    simulatorStyle() {
      const height = Math.min(556, this.windowHeight - 222);
      return {
        height: height + 'px'
      };
    }
  },

  methods: {
    reloadIframe() {
      const { iframe } = this.$refs;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.location.reload();
      }
    },
    onSrcChanged() {
      const { iframe } = this.$refs;
      if (iframe && iframe.contentWindow) {
        this.iframeHostName = iframe.contentWindow.location.host || location.host;
      }
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
  min-width: $zan-doc-simulator-width;
  top: calc($zan-doc-padding + $zan-doc-header-top-height);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);

  @media (max-width: 1300px) {
    width: $zan-doc-simulator-small-width;
    min-width: $zan-doc-simulator-small-width;
  }

  @media (max-width: 1100px) {
    left: 750px;
    right: auto;
  }

  &-fixed {
    position: fixed;
    top: $zan-doc-padding;
  }

  iframe {
    width: 100%;
    display: block;
  }

  &__nav {
    height: 63px;
    background: url('data:image/png;base64,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') no-repeat;
    background-size: 100%;
    border-bottom: 1px solid #e5e5e5;
  }

  &__url {
    left: 40px;
    top: 25px;
    right: 40px;
    font-size: 15px;
    position: absolute;
    text-align: center;
    font-weight: bold;
    line-height: 28px;

    @media (max-width: 1300px) {
      top: 21px;
      line-height: 24px;
    }
  }

  &__reload {
    top: 25px;
    right: 10px;
    width: 28px;
    height: 28px;
    cursor: pointer;
    position: absolute;
  }
}
</style>
