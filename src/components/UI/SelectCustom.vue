<template>
  <div class="select-custom">
    <p
      class="select-custom__text"
      @click="optionsVisibility = !optionsVisibility"
    >
      {{ selectedOptionName }}
    </p>
    <div class="select-custom__options" v-if="optionsVisibility">
      <p
        v-for="option in sortOptions"
        :key="option.id"
        class="select-custom__option"
        @click="selectedoption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "select-custom",
  data() {
    return {
      optionsVisibility: false,
      selectedOptionName: "",
    };
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectedoption(option) {
      this.selectedOptionName = option.name;
      this.hideOptions();
      this.$emit("selectedOption", option);
    },
    hideOptions() {
      this.optionsVisibility = false;
    },
  },
  computed: {
    sortOptions() {
      let arr = this.options.sort((a, b) => {
          return a['name'] < b['name'] ? -1 : 1;
      })
        arr.unshift({id: 0, name: '-'});
      return arr
    },
  },
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
  background: #fff;
  .select-custom__text {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }
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
  z-index: 1;
}
.select-custom__option {
  padding: 5px 10px;
  font-size: 12px;
  &:hover {
    background: #dcdcdc;
  }
}
</style>