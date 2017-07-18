<template>
  <div class="zan-doc-nav">
    <ul>
      <li class="zan-doc-nav__item" v-for="(item, index) in navConfig" :key="index">
        <a v-if="!item.path">{{item.name}}</a>
        <router-link v-else active-class="active" :to="base + item.path" exact v-text="item.title || item.name" />
        <ul v-if="item.children">
          <li class="nav-item" v-for="(navItem, index) in item.children" :key="index">
            <router-link active-class="active" :to="base + navItem.path" v-text="navItem.title || navItem.name" />
          </li>
        </ul>
        <div v-if="item.groups" v-for="(group, index) in item.groups" :key="index">
          <div class="zan-doc-nav__group-title">{{group.groupName}}</div>
          <ul>
            <li :key="index" class="zan-doc-nav__subitem" v-for="(navItem, index) in group.list" v-if="!navItem.disabled">
              <router-link active-class="active" :to="base + navItem.path" v-text="navItem.title" />
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'zan-doc-nav',

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

  &__item,
  &__subitem {
    a {
      margin: 0;
      display: block;
      font-size: 16px;
      padding: 8px 20px;
      line-height: 24px;
      transition: all .3s;
      color: $zan-doc-text-color;

      &.active {
        color: $zan-doc-blue;
        background-color: #f2f2f2;
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
    line-height: 26px;
    padding-left: 22px;
    color: $zan-doc-dark-grey;
  }
}
</style>
