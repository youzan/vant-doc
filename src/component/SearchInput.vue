<template>
  <input class="van-doc-search" :placeholder="searchPlaceholder">
</template>

<script>
export default {
  name: 'van-doc-search',

  props: {
    lang: String,
    searchConfig: Object
  },

  computed: {
    searchPlaceholder() {
      return this.lang === 'zh-CN' ? '搜索文档...' : 'Search...';
    }
  },

  watch: {
    lang(lang) {
      if (this.docsearchInstance) {
        this.docsearchInstance.algoliaOptions.facetFilters = [`lang:${lang}`];
      }
    }
  },

  mounted() {
    if (this.searchConfig) {
      this.docsearchInstance = window.docsearch({
        ...this.searchConfig,
        inputSelector: '.van-doc-search',
        algoliaOptions: {
          facetFilters: [`lang:${this.lang}`]
        }
      });
    }
  }
};
</script>

<style lang="postcss">
@import '../style/variable';

.van-doc-search {
  height: 60px;
  width: 200px;
  border: none;
  color: #fff;
  font-size: 14px;
  margin-left: 140px;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  &::placeholder {
    opacity: 0.7;
    color: #fff;
  }
}

.ds-dropdown-menu {
  line-height: 1.8;
}

.algolia-autocomplete {
  .algolia-docsearch-suggestion--highlight {
    color: $van-doc-blue;
    background-color: transparent;
  }

  .algolia-docsearch-suggestion--title {
    font-weight: 500;
  }

  .algolia-docsearch-suggestion--text {
    .algolia-docsearch-suggestion--highlight {
      box-shadow: inset 0 -1px 0 0 $van-doc-blue;
    }
  }

  .algolia-docsearch-suggestion--category-header {
    border-bottom-color: #eee;
  }

  .ds-dropdown-menu [class^='ds-dataset-'] {
    border: none;
  }

  .ds-dropdown-menu {
    top: 80% !important;
    box-shadow: 0 4px 12px #ebedf0;

    &:before {
      display: none;
    }
  }
}
</style>
