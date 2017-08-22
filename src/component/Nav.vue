<template>
  <div class="zan-doc-nav">
    <ul>
      <li class="zan-doc-nav__item" v-for="(item, index) in navConfig" :key="index">
        <zan-doc-nav-link :item="item" :base="base" />
        <ul v-if="item.children">
          <li class="nav-item" v-for="(navItem, index) in item.children" :key="index">
            <zan-doc-nav-link :item="navItem" :base="base" />
          </li>
        </ul>
        <div v-if="item.groups" v-for="(group, index) in item.groups" :key="index">
          <div class="zan-doc-nav__group-title">{{ group.groupName }}</div>
          <ul>
            <li :key="index" class="zan-doc-nav__subitem" v-for="(navItem, index) in group.list" v-if="!navItem.disabled">
              <zan-doc-nav-link :item="navItem" :base="base" />              
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
  name: 'zan-doc-nav',

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

.zan-doc-nav {
  padding: 20px 0;
  min-width: 240px;
  max-width: 240px;
  border-right: 1px solid $zan-doc-border-color;

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
        color: $zan-doc-blue;
        background-color: #f5f7fa;
      }
    }
  }

  &__subitem {
    a {
      font-size: 14px;
      padding-left: 34px;

      &:hover {
        color: $zan-doc-blue;
      }
    }
  }

  &__group-title {
    font-size: 12px;
    line-height: 30px;
    padding-left: 22px;
    color: rgba(51, 51, 51, .6);
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
