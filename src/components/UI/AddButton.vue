<template>
  <button>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3333 7.33332H8.66668V2.66662C8.66668 2.2987 8.36798 2 7.99994 2C7.63202 2 7.33332 2.2987 7.33332 2.66662V7.33332H2.66662C2.2987 7.33332 2 7.63202 2 7.99994C2 8.36798 2.2987 8.66668 2.66662 8.66668H7.33332V13.3333C7.33332 13.7013 7.63202 14 7.99994 14C8.36798 14 8.66668 13.7013 8.66668 13.3333V8.66668H13.3333C13.7013 8.66668 14 8.36798 14 7.99994C14 7.63202 13.7013 7.33332 13.3333 7.33332Z"
        fill="#F57C00"
      />
    </svg>
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "add-button",
};
</script>
<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 20px;
  justify-content: center;
  border: 1px solid #f57c00;
  box-sizing: border-box;
  border-radius: 4px;
  color: #f57c00;
  background: none;
  &:hover{
      color: #fff;
      background: #f57c00;
      transition: .3s;
      svg{
          path{
            fill: #fff;
            transition: .3s;
          }
      }
  }
}
svg {
  margin-right: 8px;
}
</style>