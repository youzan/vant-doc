<template>
  <div class="zan-doc-footer">
    <ul>
      <li class="zan-doc-footer__item" v-for="(value, key) in config.nav" :key="key">
        <a :href="value">{{ key }}</a>
      </li>
    </ul>
    <p class="zan-doc-footer__copyright">{{ config.copyright }}</p>
  </div>
</template>

<script>
export default {
  name: 'zan-doc-footer',

  props: {
    config: Object
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.zan-doc-footer {
  display: flex;
  height: 72px;
  margin-top: 40px;
  background-color: #34383B;
  justify-content: center;

  &__item {
    float: left;
    margin: 0 20px;

    a {
      display: block;
      color: #E5E5E5;
      font-size: 12px;
      line-height: 72px;
    }
  }

  &__copyright {
    color: #999;
    font-size: 12px;
    line-height: 72px;
    margin-left: 50px;
  }
}
</style>
