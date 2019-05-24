<template>
  <div class="van-doc-header">
    <div class="van-doc-row">
      <div class="van-doc-header__top">
        <a class="van-doc-header__logo" :href="config.logo.href">
          <img :src="config.logo.image">
          <span>{{ config.logo.title }}</span>
        </a>

        <search-input
          v-if="searchConfig"
          :lang="lang"
          :search-config="searchConfig"
        />

        <ul class="van-doc-header__top-nav">
          <li ref="version" v-if="versions" class="van-doc-header__top-nav-item">
            <span
              class="van-doc-header__cube van-doc-header__version"
              @click="toggleVersionPop"
            >
              {{ versions[0] }}

              <transition name="van-doc-dropdown">
                <div v-if="showVersionPop" class="van-doc-header__version-pop">
                  <div
                    v-for="item in versions"
                    class="van-doc-header__version-pop-item"
                    @click="onSwitchVersion(item)"
                  >
                    {{ item }}
                  </div>
                </div>
              </transition>
            </span>
          </li>

          <li v-if="config.nav.lang" class="van-doc-header__top-nav-item">
            <a
              class="van-doc-header__cube"
              :href="langLink"
            >
              {{ config.nav.lang.text }}
            </a>
          </li>

          <li v-if="github" class="van-doc-header__top-nav-item">
            <github-icon :link="github" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import GithubIcon from './GithubIcon';
import SearchInput from './SearchInput';

export default {
  name: 'van-doc-header',

  components: {
    GithubIcon,
    SearchInput
  },

  props: {
    lang: String,
    config: Object,
    github: String,
    versions: Array,
    searchConfig: Object
  },

  data() {
    return {
      showVersionPop: false
    };
  },

  computed: {
    langLink() {
      const { lang } = this.config.nav;
      return `#${this.$route.path.replace(lang.from, lang.to)}`;
    }
  },

  methods: {
    toggleVersionPop() {
      const val = !this.showVersionPop;

      const action = val ? 'add' : 'remove';
      document.body[`${action}EventListener`]('click', this.checkHideVersionPop);

      this.showVersionPop = val;
    },

    checkHideVersionPop(event) {
      if (!this.$refs.version.contains(event.target)) {
        this.showVersionPop = false;
      }
    },

    onSwitchLang(lang) {
      this.$router.push(this.$route.path.replace(lang.from, lang.to));
    },

    onSwitchVersion(version) {
      this.$emit('switch-version', version);
    }
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.van-doc-header {
  width: 100%;
  user-select: none;
  box-shadow: 0 4px 12px #ebedf0;

  &__top {
    display: flex;
    align-items: center;
    background-color: #001938;
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

      &-item {
        margin-left: 25px;
      }

      &-title {
        display: block;
        font-size: 15px;
      }
    }
  }

  &__cube {
    position: relative;
    cursor: pointer;
    padding: 0 7px;
    font-size: 14px;
    line-height: 24px;
    display: block;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, .7);
    font-family: 'Helvetica Neue', Arial, sans-serif;
    transition: 0.3s ease-in-out;
  }

  &__version {
    padding-right: 20px;

    &::after {
      position: absolute;
      content: '';
      top: 7px;
      right: 7px;
      width: 5px;
      height: 5px;
      border: 1px solid;
      color: rgba(255, 255, 255, .9);
      border-color: transparent transparent currentColor currentColor;
      transform: rotate(-45deg);
    }

    &-pop {
      position: absolute;
      z-index: 99;
      left: 0;
      right: 0;
      top: 30px;
      color: #333;
      transition: .2s cubic-bezier(0.215, 0.61, 0.355, 1);
      text-align: left;
      line-height: 36px;
      border-radius: 3px;
      transform-origin: top;
      background-color: #fff;
      box-shadow: 0 4px 12px #ebedf0;

      &-item {
        padding-left: 7px;
        transition: .2s;

        &:hover {
          color: $van-doc-blue;
        }
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
      width: 26px;
      margin-right: 5px;
    }

    span {
      color: #fff;
      font-size: 22px;
    }
  }
}

.van-doc-dropdown {
  &-enter,
  &-leave-active {
    opacity: 0;
    transform: scaleY(0);
  }
}
</style>
