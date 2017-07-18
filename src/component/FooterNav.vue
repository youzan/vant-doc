<template>
  <div class="zan-doc-footer-nav">
    <a
      href="javascript:void(0)"
      v-if="leftNav"
      class="zan-doc-footer-nav__link zan-doc-footer-nav__left"
      @click="handleNavClick('prev')">
      <van-icon name="arrow"></van-icon>
      <span>{{ leftNav.title }}</span>
    </a>
    <a
      href="javascript:void(0)"
      v-if="rightNav"
      class="zan-doc-footer-nav__link zan-doc-footer-nav__right"
      @click="handleNavClick('next')">
      <span>{{ rightNav.title }}</span>
      <van-icon name="arrow"></van-icon>
    </a>
  </div>
</template>

<script>
import { Icon } from 'vant';

export default {
  name: 'zan-doc-footer-nav',

  props: {
    navConfig: Array
  },

  data() {
    return {
      nav: [],
      currentPath: null,
      leftNav: null,
      rightNav: null
    };
  },

  components: {
    'van-icon': Icon
  },

  watch: {
    '$route.path'() {
      this.setNav();
      this.updateNav();
    }
  },

  methods: {
    setNav() {
      let nav = this.navConfig;
      for (let i = 0; i < nav.length; i++) {
        let navItem = nav[i];
        if (!navItem.groups) {
          this.nav.push(nav[i]);
        } else {
          for (let j = 0; j < navItem.groups.length; j++) {
            this.nav = this.nav.concat(navItem.groups[j].list);
          }
        }
      }
    },

    updateNav() {
      let baseUrl = '/component';
      let currentIndex;

      this.currentPath = this.$route.path.slice(baseUrl.length);

      for (let i = 0, len = this.nav.length; i < len; i++) {
        if (this.nav[i].path === this.currentPath) {
          currentIndex = i;
          break;
        }
      }
      this.leftNav = this.nav[currentIndex - 1];
      this.rightNav = this.nav[currentIndex + 1];
    },

    handleNavClick(direction) {
      this.$router.push(`/component${ direction === 'prev' ? this.leftNav.path : this.rightNav.path }`);
    }
  },

  created() {
    this.setNav();
    this.updateNav();
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.zan-doc-footer-nav {
  display: flex;
  padding: 24px 40px;
  border-top: 1px solid $zan-doc-border-color;

  &__link {
    flex: 1;
    font-size: 16px;
    line-height: 1.5;
    color: $zan-doc-blue;

    .van-icon {
      font-size: 12px;
      line-height: 16px;
    }

    span {
      vertical-align: middle;
    }
  }

  &__left {
    .van-icon {
      margin-right: 10px;
      transform: rotate(180deg);
    }
  }

  &__right {
    text-align: right;
    
    .van-icon {
      margin-left: 10px;
    }
  }
}
</style>
