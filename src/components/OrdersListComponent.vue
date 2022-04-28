<template>
  <table class="orders-list" v-if="orders.length != 0">
    <thead>
      <tr>
        <th>
          <checkbox-custom
            v-model="selectedAll"
            value="selectedAll"
            @click.prevent="selectAllOrders"
            :minus="true"
          />
        </th>
        <th
          v-for="cell in tableHeading"
          :key="cell.id"
          @click="sortOrders(cell.name), (activeIndex = cell.id)"
          :class="activeIndex === cell.id ? 'active' : ''"
        >
          <span>
            {{ cell.text }}
          </span>
          <svg
            id="arrIcn"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.30691 7.29156C5.154 7.13938 4.90668 7.13996 4.75449 7.29287L3.39074 8.66322V0.390625C3.39074 0.174883 3.21586 0 3.00012 0C2.78438 0 2.60949 0.174883 2.60949 0.390625V8.66324L1.24574 7.29285C1.09356 7.13994 0.846234 7.13936 0.693324 7.29154C0.540394 7.44375 0.539828 7.69107 0.691996 7.84398L2.72324 9.88508C2.72336 9.88521 2.7235 9.88531 2.72361 9.88543C2.8758 10.0379 3.12393 10.0384 3.27662 9.88545C3.27674 9.88531 3.27687 9.88521 3.27699 9.8851L5.30824 7.844C5.46039 7.69111 5.45986 7.44377 5.30691 7.29156Z"
              fill="#9AA3B0"
            />
            <path
              d="M0.69321 2.70844C0.84612 2.86063 1.09344 2.86004 1.24563 2.70713L2.60938 1.33678L2.60938 9.60938C2.60938 9.82512 2.78426 10 3 10C3.21575 10 3.39063 9.82512 3.39063 9.60938L3.39063 1.33676L4.75438 2.70715C4.90656 2.86006 5.15389 2.86064 5.3068 2.70846C5.45973 2.55625 5.46029 2.30893 5.30813 2.15602L3.27688 0.114922C3.27676 0.114785 3.27662 0.114688 3.27651 0.114571C3.12432 -0.0379484 2.8762 -0.0384376 2.7235 0.114551C2.72338 0.114687 2.72325 0.114785 2.72313 0.114903L0.691882 2.156C0.539734 2.30889 0.540261 2.55623 0.69321 2.70844Z"
              fill="#9AA3B0"
            />
          </svg>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <OrderItem v-for="order in orders" :key="order.id" :order="order">
        <checkbox-custom
          v-model="selectedOrders"
          :value="order.id.toString()"
          :minus="false"
        />
      </OrderItem>
      <!-- <tr v-for="order in orders" :key="order.id">
        <td>
          <checkbox-custom
            v-model="selectedOrders"
            :value="order.id.toString()"
            :minus="false"
          />
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
      </tr> -->
    </tbody>
  </table>
  <p v-else class="empty-block">Пусто</p>
</template>
<script>
import OrderItem from "@/components/OrderItem.vue";
export default {
  name: "orders-list-component",
  components: { OrderItem },
  props: {
    couriers: {
      type: Array,
      default: () => [],
    },
    orders: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {
      selectedAll: [],
      selectedOrders: [],
      tableHeading: [
        {
          id: 1,
          name: "id",
          text: "Номер заказа",
        },
        {
          id: 2,
          name: "user",
          text: "Заказчик",
        },
        {
          id: 3,
          name: "order_time",
          text: "Время доставки",
        },
        {
          id: 4,
          name: "amount",
          text: "Стомость",
        },
        {
          id: 5,
          name: "courier_name",
          text: "Курьер",
        },
        {
          id: 6,
          name: "status",
          text: "Статус",
        },
      ],
      couriersNames: [],
      asc: true,
      activeIndex: null,
    };
  },
  methods: {
    sortOrders(key) {
      if (this.asc) {
        this.orders.sort((a, b) => {
          return b[key] < a[key] ? -1 : 1;
        });
      } else {
        this.orders.sort((a, b) => {
          return a[key] < b[key] ? -1 : 1;
        });
      }
      this.asc = !this.asc;
      this.$forceUpdate();
    },
    // Выделить/Убрать выделенное все заказы
    selectAllOrders() {
      if (this.selectedAll.length != 0) {
        this.selectedOrders = [];
        this.selectedAll = [];
        return;
      } else {
        this.selectedOrders = this.orders.map((order) => order.id.toString());
        this.selectedAll.push("selectedAll");
        return;
      }
    },
  },

  watch: {
    selectedOrders() {
      if (this.selectedOrders.length != 0) {
        if (!this.selectedAll.includes("selectedAll")) {
          this.selectedAll.push("selectedAll");
        }
      } else {
        this.selectedAll = [];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.orders-list {
  flex-grow: 1;
  margin-left: 24px;
  border-collapse: collapse;
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
.empty-block {
  width: 100%;
  text-align: center;
  padding-top: 100px;
}
.dots {
  &:hover {
    cursor: pointer;
  }
}
</style>