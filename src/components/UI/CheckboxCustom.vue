<template>
  <label>
    <input
      :value="value"
      :checked="modelValue.includes(value)"
      @change="(evt) => onChange(evt.target.value)"
      @click.stop
      type="checkbox"
    />
    <span v-if="minus">
      <svg
        width="8"
        height="2"
        viewBox="0 0 8 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.149902 0.999902C0.149902 0.53046 0.53046 0.149902 0.999902 0.149902H6.9999C7.46934 0.149902 7.8499 0.53046 7.8499 0.999902C7.8499 1.46934 7.46934 1.8499 6.9999 1.8499H0.999902C0.53046 1.8499 0.149902 1.46934 0.149902 0.999902Z"
          fill="white"
        />
      </svg>
    </span>
    <span v-else>
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
    <p v-if="slotPassed">
      <slot></slot>
    </p>
  </label>
</template>
<script>
export default {
  name: "checkbox-custom",
  props: {
    value: { type: String, default: null },
    modelValue: { type: Array, default: () => [] },
    minus: { type: Boolean, default: false },
  },
  methods: {
    onChange(value) {
      if (this.modelValue.includes(this.value)) {
        this.$emit(
          "update:modelValue",
          this.modelValue.filter((cv) => cv !== value)
        );
      } else {
        this.$emit("update:modelValue", this.modelValue.concat(value));
      }
    },
  },
  computed: {
    slotPassed() {
      
      return !!this.$slots.default
    },
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
  }
  &:hover {
    cursor: pointer;
  }
  input {
    position: absolute;
    z-index: -999999;
    opacity: 0;
    pointer-events: none;
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
      pointer-events: none;
    }
    &:before {
      content: "";
      display: flex;
      width: 18px;
      height: 18px;
      border-radius: 4px;
      border: 1px solid #bdcbd6;
      pointer-events: none;
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