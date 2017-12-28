<template>
  <div class="van-doc-header">
    <div class="van-doc-row">
      <div class="van-doc-header__top">
        <a class="van-doc-header__logo" :href="config.logo.href">
          <img :src="config.logo.image">
          <span>{{ config.logo.title }}</span>
        </a>
        <ul class="van-doc-header__top-nav">
          <li v-for="(value, key) in config.nav" class="van-doc-header__top-nav-item">
            <a
              class="van-doc-header__top-nav-title"
              :href="typeof value === 'string' ? value : 'javascript:;'"
              :target="key === 'github' ? '_blank' : ''"
              :class="{ active: key === active }"
            >
              <svg v-if="key === 'github'" height="28" width="28" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span v-else-if="key === 'lang'" class="van-doc-header__top-nav-lang" @click="onSwitchLang(value)">{{ value.text }}</span>
              <span v-else>{{ key }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'van-doc-header',

  props: {
    config: Object,
    active: String
  },

  methods: {
    onSwitchLang(lang) {
      this.$router.push(this.$route.path.replace(lang.from, lang.to));
    }
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.van-doc-header {
  width: 100%;
  user-select: none;
  border-bottom: 1px solid $van-doc-border-color;

  &__top {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 $van-doc-padding;
    height: $van-doc-header-top-height;
    line-height: $van-doc-header-top-height;

    &-nav {
      flex: 1;
      text-align: right;

      > li {
        display: inline-block;
        position: relative;
        vertical-align: middle;
      }

      &-lang {
        padding: 0 7px;
        font-size: 14px;
        line-height: 24px;
        display: block;
        border-radius: 3px;
        text-align: center;
        color: $van-doc-code-color;
        border: 1px solid currentColor;
        font-family: "Helvetica Neue", Arial, sans-serif;
        transition: .3s ease-in-out;

        &:hover {
          color: $van-doc-blue;
        }
      }

      &-item {
        margin-left: 20px;
      }

      &-title {
        font-size: 15px;
        letter-spacing: 1px;
        color: $van-doc-text-color;

        &:hover,
        &.active {
          color: $van-doc-blue;
        }

        svg {
          fill: $van-doc-code-color;
          display: block;
          vertical-align: middle;
          transition: .3s ease-in-out;

          &:hover {
            fill: $van-doc-blue;
          }
        }
      }

      .van-doc-header__arrow:hover {
        color: $van-doc-text-color;
      }

      .van-doc-header__arrow::after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        margin-top: -1px;
        margin-left: 1px;
        margin-right: -4px;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 5px solid #ccc;
        pointer-events: none;
      }
    }
  }

  &__logo {
    display: block;

    img,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    img {
      width: 24px;
      margin-right: 5px;
    }

    span {
      color: #333;
      font-size: 20px;
      font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    }
  }

  &__bottom {
    height: $van-doc-header-bottom-height;
    line-height: $van-doc-header-bottom-height;

    &-nav {
      text-align: center;

      li {
        display: inline-block;
      }

      a {
        color: #fff;
        opacity: .8;
        display: block;
        padding: 0 20px;
        font-size: 14px;

        &.active {
          background-color: rgba(255, 255, 255, .1);
        }

        &:hover,
        &.active {
          opacity: 1;
        }
      }
    }
  }
}
</style>
