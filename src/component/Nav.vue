<template>
  <div class="van-doc-nav">
    <ul>
      <li class="van-doc-nav__item" v-for="(item, index) in navConfig" :key="index">
        <van-doc-nav-link :item="item" :base="base" />
        <ul v-if="item.children">
          <li class="nav-item" v-for="(navItem, index) in item.children" :key="index">
            <van-doc-nav-link :item="navItem" :base="base" />
          </li>
        </ul>
        <div v-if="item.groups" v-for="(group, index) in item.groups" :key="index">
          <div class="van-doc-nav__group-title">{{ group.groupName }}</div>
          <ul>
            <li :key="index" class="van-doc-nav__subitem" v-for="(navItem, index) in group.list" v-if="!navItem.disabled">
              <van-doc-nav-link :item="navItem" :base="base" />              
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import NavLink from './NavLink.vue';

export default {
  name: 'van-doc-nav',

  components: {
    [NavLink.name]: NavLink
  },

  props: {
    navConfig: Array,
    base: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.van-doc-nav {
  padding: 20px 0;
  min-width: 240px;
  max-width: 240px;
  border-right: 1px solid $van-doc-border-color;

  @media (max-width: 1300px) {
    min-width: 220px;
    max-width: 220px;
  }

  &__item,
  &__subitem {
    a {
      margin: 0;
      display: block;
      color: #455a64;
      font-size: 16px;
      padding: 8px 20px;
      line-height: 24px;
      transition: all .3s;

      &.active {
        color: $van-doc-blue;
        background-color: #f5f7fa;
      }
    }
  }

  &__subitem {
    a {
      font-size: 14px;
      padding-left: 34px;

      &:hover {
        color: $van-doc-blue;
        background-color: #f5f7fa;
      }
    }

    span {
      opacity: .6;
      font-size: 13px;
    }
  }

  &__group-title {
    font-size: 12px;
    line-height: 40px;
    padding-left: 22px;
    color: $van-doc-text-light-blue;
  }

  @media (max-width: 1300px) {
    min-width: 220px;
    max-width: 220px;

    &__item,
    &__subitem {
      a {
        line-height: 22px;
      }
    }

    &__subitem {
      a {
        font-size: 13px;
        padding-left: 30px;
      }
    }
  }
}
</style>
