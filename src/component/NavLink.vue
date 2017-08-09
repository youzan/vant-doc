<template>
  <router-link v-if="item.path" active-class="active" :to="base + item.path" v-text="item.title || item.name" />  
  <a v-else-if="item.link" :href="item.link" v-text="item.title || item.name"></a>
  <a v-else v-text="item.title || item.name"></a>
</template>

<script>
export default {
  name: 'zan-doc-nav-link',
  props: ['base', 'item']
}
</script>
