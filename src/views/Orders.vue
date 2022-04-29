<template>
  <div class="container">
    <div class="orders-heading">
      <h1 class="main-title">База заказов</h1>
      <add-button>Добавить заказ</add-button>
      <label class="search">
        <img src="@/assets/img/svg/ic_search.svg" alt="" />
        <input type="text" v-model="searchText" placeholder="Поиск" />
      </label>
    </div>
    <div class="content">
      <aside class="filter">
        <div class="filter__heading">
          <img src="@/assets/img/svg/ic_filter.svg" alt="" />
          <p>Фильтр</p>
        </div>
        <div class="filter__price">
          <p>Стоимость</p>
          <div class="input-block">
            <input
              v-model="filterPriceFrom"
              type="number"
              min="0"
              placeholder="От"
            />
            <input
              v-model="filterPriceTo"
              type="number"
              min="0"
              placeholder="До"
            />
          </div>
        </div>
        <!-- Не реализован start -->
        <div class="filter__time-delivery">
          <p>Время доставки</p>
          <checkbox-custom
            class="late-checkbox"
            v-model="filterDelivery.late"
            value="late"
            :minus="false"
            >Опоздание
          </checkbox-custom>
          <checkbox-custom
            v-model="filterDelivery.inTime"
            value="inTime"
            :minus="false"
            >Во время
          </checkbox-custom>
        </div>
        <!-- stop -->
        <div class="filter__couriers">
          <p>Курьер</p>
          <select-custom
            :options="couriersList"
            @selectedOption="selectedCourier($event)"
          />
        </div>
        <div class="filter__status">
          <p>Статус заказа</p>
          <radio-custom
            @click="uncheckedButton($event)"
            class="status-btn"
            value="delivered"
            v-model="filterStatus"
            >Доставлено</radio-custom
          >
          <radio-custom
            @click="uncheckedButton($event)"
            class="status-btn"
            value="on_the_way"
            v-model="filterStatus"
            >В пути</radio-custom
          >
          <radio-custom
            @click="uncheckedButton($event)"
            value="prepare"
            v-model="filterStatus"
            >Готовится</radio-custom
          >
        </div>
      </aside>
      <orders-list-component
        :couriers="couriersList"
        :orders="filteredorders"
        @showDeleButton="showButton($event)"
        @showDots="showDotsButton($event)"
        @deleteOrder="deleteOrderItem($event)"
        @deleteGroupOrders="deleteGroupOrders($event)"
      ></orders-list-component>
    </div>
  </div>
</template>

<script>
import OrdersListComponent from "@/components/OrdersListComponent.vue";
export default {
  components: {
    OrdersListComponent,
  },
  data: () => {
    return {
      filterDelivery: {
        inTime: [],
        late: [],
      },

      couriersList: [],
      ordersList: [],
      courierFilterId: 0,
      filterStatus: "",
      filterPriceFrom: "",
      filterPriceTo: "",
      searchText: "",
    };
  },
  methods: {
    getData() {
      // Получить список курьеров
      this.$store
        .dispatch("GET_COURIERS_LIST")
        .then((r) => {
          this.couriersList = r.data.couriers;
        })
        .then((r) => {
          // Получить список заказов
          this.$store
            .dispatch("GET_ORDERS_LIST")
            .then((resp) => {
              this.ordersList = resp.data.orders;
            })
            .then((resp) => {
              //   Добавить имена курьеров
              this.ordersList.forEach((el) => {
                el.courier_name = this.getCourier(el.courier_id);
                el.delBtn = false;
              });
            });
        });
    },
    // имя курьера по id
    getCourier(id) {
      return this.couriersList.find((courier) => courier.id == id).name;
    },
    // фильтр курьеров
    selectedCourier(e) {
      this.courierFilterId = e.id;
    },
    // убрать :checked у радио-кнопки
    uncheckedButton(e) {
      if (
        e.target.getElementsByTagName("input")[0].value == this.filterStatus
      ) {
        setTimeout(() => {
          this.filterStatus = "";
        }, 0);
      }
    },
    // Показать кнопку удалить у заказа
    showButton(orderID) {
      this.ordersList.find((order) => order.id == orderID).delBtn = true;
    },
    // Скрыть кнопку удалить у заказа
    showDotsButton(orderID) {
      this.ordersList.find((order) => order.id == orderID).delBtn = false;
    },
    // Удалить один заказа
    deleteOrderItem(orderID) {
      this.ordersList = this.ordersList.filter((order) => {
        return order.id != orderID;
      });
    },
    // Удалить несколько заказов
    deleteGroupOrders(selectedID) {
      selectedID.forEach((id) => {
        this.ordersList = this.ordersList.filter((order) => {
          return order.id != id;
        });
      });
    },
  },
  computed: {
    // Фильтры
    filteredorders() {
      return this.ordersList
        .filter((order) => {  //Фильтр по курьерам
          return (
            this.courierFilterId == 0 ||
            order.courier_id == this.courierFilterId
          );
        })
        .filter((order) => {  //Фильтр по статусам
          return this.filterStatus == "" || order.status == this.filterStatus;
        })
        .filter((order) => {  //Фильтр цена от
          return (
            this.filterPriceFrom == "" || order.amount >= this.filterPriceFrom
          );
        })
        .filter((order) => {  //Фильтр цена до
          return this.filterPriceTo == "" || order.amount <= this.filterPriceTo;
        })
        .filter((order) => {  //Поиск по полям id, имя, курьер
          return (
            this.searchText == "" ||
            order.id.toString().indexOf(this.searchText) > -1 ||
            order.user
              .toString()
              .toLowerCase()
              .search(this.searchText.toLowerCase()) > -1 ||
            order.courier_name
              .toString()
              .toLowerCase()
              .search(this.searchText.toLowerCase()) > -1
          );
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
.orders-heading {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 0 20px 0;
}
.main-title {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #2c2c2c;
  margin-right: 47px;
}
.search {
  width: 225px;
  height: 32px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #bdcbd6;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0 10px;
  margin-left: auto;
  img {
    width: 24px;
    height: 24px;
  }
  input {
    flex-grow: 1;
    padding: 0;
    max-width: 90%;
    border: none;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
  }
}
.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
