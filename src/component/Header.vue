<template>
  <div class="zan-doc-header">
    <div class="zan-doc-header__top">
      <a class="zan-doc-header__logo" href="http://www.youzanyun.com/zanui"></a>
      <ul class="zan-doc-header__top-nav">
        <li v-for="navItem in navData" class="zan-doc-header__top-nav-item">
          <a
            class="zan-doc-header__top-nav-title"
            :href="navItem.link"
            :class="{ active: navItem.title === active, 'zan-doc-header__arrow': navItem.type === 'dropdown' }">
            {{ navItem.title }}
          </a>
          <zan-doc-dropdown
            v-if="navItem.type === 'dropdown'"
            :top="50"
            :nav="navItem.nav"
          ></zan-doc-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zan-doc-header',

  props: {
    nav: Object,
    active: String
  },

  computed: {
    navData() {
      return Object.keys(this.nav).map(key => {
        const navItem = this.nav[key];
        let type = 'link';
        let link = navItem;

        if (typeof navItem === 'object') {
          link = 'javascript:;';
          type = 'dropdown';
        }

        return {
          link,
          type,
          nav: navItem,
          title: key
        };
      });
    }
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.zan-doc-header {
  width: 100%;

  &__top {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 $zan-doc-padding;
    height: $zan-doc-header-top-height;
    line-height: $zan-doc-header-top-height;
    box-shadow: 0 1px 4px rgba(0,0,0,.1);

    &-nav {
      flex: 1;
      text-align: right;

      > li {
        display: inline-block;
        position: relative;

        &:last-child {
          > a {
            margin-right: 5px;
          }
        }
      }

      &-item {
        .zan-doc-dropdown {
          display: none;
        }

        &:hover .zan-doc-dropdown {
          display: block;
        }
      }

      &-title {
        margin: 0 20px;
        font-size: 15px;
        display: block;
        letter-spacing: 1px;
        color: $zan-doc-text-color;

        &:hover,
        &.active {
          color: $zan-doc-blue;
        }
      }

      .zan-doc-header__arrow:hover {
        color: $zan-doc-text-color;
      }

      .zan-doc-header__arrow::after {
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
    width: 76px;
    height: 20px;
    background-image: url(https://img.yzcdn.cn/upload_files/2017/04/20/FjwR1mraVIqtHWb8YWDW_YzQ_Kh2.png);
    background-size: contain;
    background-repeat: no-repeat;
  }


  &__bottom {
    height: $zan-doc-header-bottom-height;
    line-height: $zan-doc-header-bottom-height;

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
