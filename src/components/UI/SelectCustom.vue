<template>
  <div class="select-custom">
    <p class="select-custom__text">1231</p>
    <div class="select-custom__options">
      <p class="select-custom__option">212222</p>
      <p class="select-custom__option">212222</p>
      <p class="select-custom__option">212222</p>
      <p class="select-custom__option">212222</p>
      <p class="select-custom__option">212222</p>
      <p class="select-custom__option">212222</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "select-custom",
  props: {
      options: {
          type: Array,
          default: () => []
      }
  }
};
</script>
<style lang="scss" scoped>
.select-custom {
  width: 100%;
  max-width: 288px;
  height: 32px;
  position: relative;
  border: 1px solid;
  border: 1px solid #bdcbd6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: #fff;
  &:hover {
    cursor: pointer;
  }
}
p {
  margin: 0;
  padding: 0;
}
.select-custom__options {
  position: absolute;
  width: 100%;
  left: 0;
  border: 1px solid #bdcbd6;
  border-top: none;
  background: #fff;
  top: 32px;
  max-height: 160px;
  overflow: auto;
}
.select-custom__option {
  padding: 5px 10px;
  font-size: 12px;
  &:hover {
    background: #dcdcdc;
  }
}
</style>