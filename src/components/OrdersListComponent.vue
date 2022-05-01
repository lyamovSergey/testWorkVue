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
      <OrderItem
        v-for="order in orders"
        :key="order.id"
        :order="order"
        @showDeleButton="$emit('showDeleButton', $event)"
        @showDots="$emit('showDots', $event)"
        @deleteOrder="$emit('deleteOrder', $event)"
      >
        <checkbox-custom
          v-model="selectedOrders"
          :value="order.id.toString()"
          :minus="false"
          @click.stop="toggleCheckOrder($event, order.id)"
        />
      </OrderItem>
    </tbody>
  </table>
  <p v-else class="empty-block">Пусто</p>
  <transition name="toast">
    <div class="toast-block" v-if="showToast">
      <div class="container">
        <div class="toast-block__text">
          <p>Выбрано: </p>
          <span>{{selectedOrders.length}}/</span>
          <span>{{orders.length}}</span>
        </div>
        <div class="toast-block__buttons">
          <custom-button @click="deleteSelected">
            <template v-slot:svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.6364 4.36585C10.5073 4.36585 10.4091 4.46907 10.4091 4.58852V5.26399H13.5909V4.58852C13.5909 4.46907 13.4927 4.36585 13.3636 4.36585L10.6364 4.36585ZM14.9545 5.26399V4.58852C14.9545 3.70768 14.2387 3 13.3636 3L10.6364 3C9.76125 3 9.04545 3.70768 9.04545 4.58852V5.26399H5.18182C4.80526 5.26399 4.5 5.56975 4.5 5.94692C4.5 6.32409 4.80526 6.62984 5.18182 6.62984H6.31818V16.5059C6.31818 17.8869 7.441 19 8.81818 19H15.1818C16.559 19 17.6818 17.8869 17.6818 16.5059V6.62984H18.8182C19.1947 6.62984 19.5 6.32409 19.5 5.94692C19.5 5.56975 19.1947 5.26399 18.8182 5.26399H14.9545ZM7.68182 6.62984V16.5059C7.68182 17.1255 8.18706 17.6341 8.81818 17.6341H15.1818C15.8129 17.6341 16.3182 17.1255 16.3182 16.5059V6.62984H7.68182ZM10.6364 8.88637C11.0129 8.88637 11.3182 9.19213 11.3182 9.5693V14.5501C11.3182 14.9272 11.0129 15.233 10.6364 15.233C10.2598 15.233 9.95455 14.9272 9.95455 14.5501V9.5693C9.95455 9.19213 10.2598 8.88637 10.6364 8.88637ZM13.3636 8.88637C13.7402 8.88637 14.0455 9.19213 14.0455 9.5693V14.5501C14.0455 14.9272 13.7402 15.233 13.3636 15.233C12.9871 15.233 12.6818 14.9272 12.6818 14.5501V9.5693C12.6818 9.19213 12.9871 8.88637 13.3636 8.88637Z"
                  fill="white"
                />
              </svg>
            </template>
            <template v-slot:text> Удалить </template>
          </custom-button>
          <div class="close-btn" @click="showToast = false">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.51375 7.57874C6.21612 7.28404 6.21612 6.80625 6.51375 6.51155C6.81138 6.21685 7.29392 6.21685 7.59155 6.51155L17.4863 16.2975C17.784 16.5922 17.784 17.07 17.4863 17.3647C17.1887 17.6594 16.7062 17.6594 16.4085 17.3647L6.51375 7.57874Z"
                fill="#9AA3B0"
              />
              <path
                d="M16.4086 6.63547C16.7063 6.34077 17.1888 6.34077 17.4864 6.63547C17.7841 6.93016 17.7841 7.40796 17.4864 7.70266L7.59165 17.4886C7.29402 17.7833 6.81148 17.7833 6.51385 17.4886C6.21622 17.1939 6.21622 16.7161 6.51385 16.4214L16.4086 6.63547Z"
                fill="#9AA3B0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import OrderItem from "@/components/OrderItem.vue";
export default {
  name: "orders-list-component",
  emits: ["showDeleButton", "deleteOrder", "showDots", "deleteGroupOrders"],
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
      showToast: false,
    };
  },
  methods: {
    // Сортировка
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
    // test
    toggleCheckOrder(event, id) {
      let inputInfo = {
        orderId: id,
        checked: event.target.getElementsByTagName("input")[0].checked,
      };
      // console.log('event', inputInfo)
    },
    // Удалить выбранные заказы
    deleteSelected() {
      this.$emit('deleteGroupOrders', this.selectedOrders);
      this.selectedAll = [];
      this.showToast = false
    },
  },

  watch: {
    // Переключатель "выделить все"
    selectedOrders() {
      if (this.selectedOrders.length != 0) {
        this.showToast = true
        if (!this.selectedAll.includes("selectedAll")) {
          this.selectedAll.push("selectedAll");
        }
      } else {
        this.selectedAll = [];
        this.showToast = false
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.orders-list {
  
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
.toast-block {
  width: 100%;
  height: 44px;
  background-color: #fff;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  .container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    .toast-block__text {
      display: flex;
      align-items: center;
      p {
        font-weight: 400;
        font-size: 13px;
        line-height: 15px;
        color: #9aa3b0;
        margin-right: 5px;
      }
      span {
        font-weight: 400;
        font-size: 13px;
        line-height: 15px;
        color: #f57c00;
        
      }
    }
  }
}
.toast-block__buttons{
  display: flex;
  align-items: center;
}
.close-btn{
  display: flex;
  align-items: center;
  margin-left: 20px;
  &:hover{
    cursor: pointer;
  }

}

.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.toast-leave-active {
  position: fixed;
}
</style>