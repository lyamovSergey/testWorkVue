<template>
  <tr>
    <td>
      <slot></slot>
    </td>
    <td>#{{ order.id }}</td>
    <td>{{ order.user }}</td>
    <td>{{ getDateFormat(order.order_time) }}</td>
    <td>{{ order.amount }} грн</td>
    <td>{{ order.courier_name }}</td>
    <td v-if="order.status == 'on_the_way'">
      <span class="status status_on-the-way">В пути</span>
    </td>
    <td v-else-if="order.status == 'delivered'">
      <span class="status status_delivered">Доставлено</span>
    </td>
    <td v-else-if="order.status == 'prepare'">
      <span class="status status_prepare">Готовится</span>
    </td>
    <td class="dots">
      <svg
        v-if="!showDelBtn"
        width="14"
        height="4"
        viewBox="0 0 14 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.43994 0.560579C2.23523 0.560579 2.87994 1.20529 2.87994 2.00058C2.87994 2.79587 2.23523 3.44058 1.43994 3.44058C0.644649 3.44058 -6.10633e-05 2.79587 -6.10981e-05 2.00058C-6.11329e-05 1.20529 0.644649 0.560579 1.43994 0.560579Z"
          fill="#9AA3B0"
        />
        <circle
          cx="7"
          cy="2.00046"
          r="1.44"
          transform="rotate(-90 7 2.00046)"
          fill="#9AA3B0"
        />
        <path
          d="M12.5601 0.560581C13.3553 0.560581 14.0001 1.20529 14.0001 2.00058C14.0001 2.79587 13.3553 3.44058 12.5601 3.44058C11.7648 3.44058 11.1201 2.79587 11.1201 2.00058C11.1201 1.20529 11.7648 0.560581 12.5601 0.560581Z"
          fill="#9AA3B0"
        />
      </svg>
      <div v-else class="del"></div>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    order: { type: Object, default: () => {} },
  },
  data: function () {
    return {
      showDelBtn: false,
    };
  },
  methods: {
    // Отформатировать дату
    getDateFormat(date) {
      let options = {
        hour: "2-digit",
        minute: "2-digit",
        year: "numeric",
        month: "short",
        day: "2-digit",
      };
      return new Date(date)
        .toLocaleString("ru", options)
        .split(",")
        .reverse()
        .join(" ")
        .replace(/\s*г\./, "");
    },
  },
};
</script>
<style lang="scss" scoped>
tr {
  display: flex;
  &:not(:first-child) {
    border-top: 1px solid #dee3ea;
  }
}
td,
th {
  display: flex;
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;

  &:nth-child(1) {
    max-width: 41px;
    align-items: center;
    justify-content: center;
  }
  &:nth-child(2) {
    max-width: 110px;
  }
  &:nth-child(3) {
    max-width: 175px;
  }
  &:nth-child(4) {
    max-width: 134px;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
  }
  &:nth-child(5) {
    max-width: 125px;
  }
  &:nth-child(6) {
    max-width: 230px;
  }
  &:nth-child(7) {
    max-width: 110px;
  }
  &:nth-child(8) {
    max-width: 45px;
  }
}
td {
  padding: 9px 0;
  align-items: center;
}
tbody {
  display: block;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}
th {
  align-items: center;
  padding-bottom: 9px;
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    border-bottom: 1px dashed transparent;
    color: #9aa3b0;
  }
  &:hover {
    cursor: pointer;
  }
  svg {
    width: 6px;
    height: 12px;
    margin-left: 4px;
  }
}
.active {
  span {
    color: #f57c00;
    border-bottom: 1px dashed #f57c00;
  }
  svg {
    path {
      fill: #f57c00;
    }
  }
}
.status {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
  border: 1px solid;
  border-radius: 4px;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  &_on-the-way {
    border-color: #0fa54e;
    color: #0fa54e;
  }
  &_delivered {
    border-color: #e85353;
    color: #e85353;
  }
  &_prepare {
    border-color: #319fef;
    color: #319fef;
  }
}
.dots {
  &:hover {
    cursor: pointer;
  }
}
</style>