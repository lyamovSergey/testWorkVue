<template>
  <button>
    <slot name="svg"></slot>
    <p>
    <slot name="text"></slot>
    </p>
  </button>
</template>
<script>
export default {
  name: "custom-button",
};
</script>
<style lang="scss" scoped>
button{
    display: flex;
    align-items: center;
    background: #F57C00;
    border-radius: 4px;
    border: none;
    padding: 4px 24px;
    min-height: 32px;
    p{
        margin: 0;
        padding: 0;
        margin-left: 4px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #fff;
    }
}
</style>