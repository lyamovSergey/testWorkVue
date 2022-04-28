<template>
  <label>
    <input
      type="radio"
      :value="value"
      @change="$emit('update:modelValue', $event.target.value)"
      :checked="value === modelValue"
      @click.stop
    />
    <span>
      <svg
        width="11"
        height="8"
        viewBox="0 0 11 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.88886 0.463611C9.61044 0.154212 9.15104 0.145633 8.86276 0.444444C8.85672 0.450696 8.85077 0.457085 8.8449 0.463611L3.90126 5.70622L1.3409 3.81249C1.05262 3.51368 0.593224 3.52226 0.3148 3.83166C0.0431787 4.13348 0.0431787 4.61195 0.3148 4.91377L3.38821 7.35812C3.67161 7.66218 4.13096 7.66218 4.41432 7.35812L9.871 1.5649C10.1593 1.26604 10.1673 0.773009 9.88886 0.463611Z"
          fill="white"
        />
      </svg>
    </span>
    <p><slot></slot></p>
  </label>
</template>
<script>
export default {
  name: "radio-custom",
  props: {
    value: { type: String, default: null },
    modelValue: { type: String, default: null },
  },
};
</script>

<style lang="scss" scoped>
label {
  display: flex;
  position: relative;
  overflow: hidden;
  align-items: center;
  p {
    margin-bottom: 0;
    padding: 0;
    margin-left: 8px;
    pointer-events: none;
  }
  &:hover {
    cursor: pointer;
  }
  input {
    position: absolute;
    z-index: -999999;
    opacity: 0;
    visibility: hidden;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    pointer-events: none;
    svg {
      visibility: hidden;
      position: absolute;
      border-radius: 4px;
      display: block;
    }
    &:before {
      content: "";
      display: flex;
      width: 18px;
      height: 18px;
      border-radius: 4px;
      border: 1px solid #bdcbd6;
    }
  }
  input:checked + span {
    border-color: #f57c00;
    svg {
      visibility: visible;
    }
    &:before {
      content: "";
      border-color: #f57c00;
      background: #f57c00;
    }
  }
}
</style>