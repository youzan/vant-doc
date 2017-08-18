<template>
  <div class="zan-doc-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zan-doc-content'
}
</script>

<style lang="postcss">
@import '../style/variable';

.zan-doc-content {
  flex: 1;

  a {
    color: $zan-doc-blue;
  }

  section {
    padding: 0 $zan-doc-padding;
    overflow: hidden;

    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
      line-height: 1.5;
      font-weight: normal;
      margin: 20px 0 10px;
      color: $zan-doc-text-color;
    }

    > h1 {
      font-size: 36px;
    }

    > h2 {
      font-size: 30px;
    }

    > h3 {
      font-size: 22px;
    }

    > h4 {
      font-size: 18px;
    }

    > h5 {
      font-size: 14px
    }

    > h6 {
      font-size: 14px;
      color: $zan-doc-dark-grey;
    }

    > p {
      margin: 14px 0;
      font-size: 14px;
      line-height: 20px;
      color: $zan-doc-dark-grey;
    }

    > ul li,
    > ol li {
      color: #666;
      font-size: 14px;
      line-height: 20px;
      margin: 10px 0 10px 20px;
      padding-left: 20px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 6px;
        left: 0;
        width: 8px;
        height: 8px;
        box-sizing: border-box;
        border: 2px solid $zan-doc-grey;
        border-radius: 50%;
      }

      li {
        margin-left: 0;
      }
    }

    p > code,
    li > code,
    .zan-doc-table code {
      margin: 0 2px;
      padding: 2px 7px;
      display: inline-block;
      vertical-align: middle;
    }

    .zan-doc-table code {
      padding: 0 10px;
    }
  }
}
</style>
