<template>
  <div class="van-doc-footer">
    <ul>
      <li class="van-doc-footer__item" v-for="(value, key) in config.nav" :key="key">
        <a :href="value" target="_blank">{{ key }}</a>
      </li>
    </ul>
    <a v-if="config.github" :href="config.github" target="_blank" class="github-corner" aria-label="View source on Github">
      <svg width="100" height="100" viewBox="0 0 250 250" aria-hidden="true">
        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: 'van-doc-footer',

  props: {
    config: Object
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.van-doc-footer {
  position: relative;
  background-color: #061A2A;

  ul {
    text-align: center;
  }

  &__item {
    margin-right: 45px;
    display: inline-block;

    a {
      color: #b3b3b3;
      display: block;
      font-size: 13px;
      line-height: 72px;
      transition: color .3s ease-in-out;

      &:hover {
        color: #fff;
      }
    }
  }
}

.github-corner {
  position: absolute;
  top: -50px;
  right: 61px;
  height: 50px;
  width: 40px;
  overflow: hidden;

  svg {
    fill:transparent;
    color:#fff;
    position: absolute;
    border: 0;
    right: -29px;
    opacity: .9;
    transition: .3s;
    transform: rotate(-45deg);

    &:hover {
      opacity: 1;
      transform: rotate(-45deg) scale(1.15) !important;
    }
  }

  .octo-arm {
    animation: octocat-wave 3s ease-in-out infinite;
  }
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0)
  }
  20%,
  60% {
    transform: rotate(-25deg)
  }
  40%,
  80% {
    transform: rotate(10deg)
  }
}
</style>
