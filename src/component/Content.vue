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
  position: relative;
  padding-bottom: 75px;

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
      color: rgba(51, 51, 51, .9);
    }

    > h1 {
      font-size: 36px;
    }

    > h2 {
      font-size: 30px;
    }

    > h3 {
      font-size: 20px;
    }

    > h4 {
      font-size: 16px;
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
      padding-left: 15px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 4px;
        height: 4px;
        margin-top: -1px;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: $zan-doc-dark-grey;
      }

      li {
        margin-left: 0;
      }
    }

    > hr {
      border: 0px none;
      border-top: 1px solid #eee;
    }

    p > code,
    li > code,
    .zan-doc-table code {
      margin: 2px;
      padding: 2px 7px;
      display: inline-block;
      vertical-align: middle;
    }

    .zan-doc-table code {
      padding: 0 8px;
    }
  }
}
</style>
