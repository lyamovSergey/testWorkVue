<template>
  <header>
    <div class="container">
      <a href="/">
        <img src="@/assets/img/png/Logo.png" alt="" />
      </a>
      <div class="user">
        <p class="user__name">Менеджер Олег</p>
        <div class="user__image">
          <img src="@/assets/img/png/User.png" alt="" />
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="scss" scoped>
header {
  width: 100%;
  height: 57px;
  background: #f57c00;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
}
.user {
  display: flex;
  align-items: center;
}
.user__image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
}
.user__name {
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  color: #ffffff;
  padding-right: 8px;
}
</style>