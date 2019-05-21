<template>
  <input class="van-doc-search" :placeholder="searchPlaceholder">
</template>

<script>
import docsearch from 'docsearch.js';
import 'docsearch.js/dist/cdn/docsearch.css';

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
      this.docsearchInstance = docsearch({
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
</style>
