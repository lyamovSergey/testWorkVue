<template>
  <div class="container">
    <div class="orders-heading">
      <h1 class="main-title">База заказов</h1>
      <add-button>Добавить заказ</add-button>
      <label class="search">
        <img src="@/assets/img/svg/ic_search.svg" alt="" />
        <input type="text" placeholder="Поиск" />
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
            <input type="text" placeholder="От" />
            <input type="text" placeholder="До" />
          </div>
        </div>
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
        <div class="filter__couriers">
          <p>Курьер</p>
          <select-custom />
        </div>
      </aside>
      <orders-list
        :couriers="couriersList"
        :orders="ordersList"
      ></orders-list>
    </div>
  </div>
</template>

<script>
import OrdersList from "@/components/OrdersList.vue";
export default {
  components: {
    OrdersList,
  },
  data: () => {
    return {
      filterDelivery: {
        inTime: [],
        late: [],
      },
      couriersList: [],
      ordersList: []
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
              });
            });
        });
    },
    getCourier(id) {
      return this.couriersList.find((courier) => courier.id == id).name;
    },
  },
  mounted(){
    this.getData()
  }
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
