<template>
  <Loading :active="isLoading"></Loading>
      <main class="main">
        <div class="bg-white w-100 border-bottom sticky-top d-flex">
          <a href="#" class="d-inline-block py-3 px-4 border-end" id="toggle-btn">
            <i class="bi bi-arrows-angle-expand"></i>
          </a>
              <p class="py-3 px-4">Hermosa-後台管理</p>
        </div>
        <div class="p-4">
          <!-- 在此新增老師的樣板 -->
        </div>
      </main>
</template>

<script>
// import DelModal from '@/components/DelModal.vue'
// import OrderModal from '@/components/orderModal.vue'
// import Pagination from '@/components/Pagination.vue'
// export default {
//   data() {
//     return {
//       orders: {},
//       isNew: false,
//       pagination: {},
//       isLoading: false,
//       tempOrder: {},
//       currentPage: 1,
//     };
//   },
//   components: {
//     Pagination,
//     DelModal,
//     OrderModal,
//   },
//   methods: {
//     getOrders(currentPage = 1) {
//       this.currentPage = currentPage;
//       const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`;
//       this.isLoading = true;
//       this.$http.get(url, this.tempProduct).then((response) => {
//         this.orders = response.data.orders;
//         this.pagination = response.data.pagination;
//         this.isLoading = false;
//         console.log(response);
//       });
//     },
//     openModal(isNew, item) {
//       this.tempOrder = { ...item };
//       this.isNew = false;
//       const orderComponent = this.$refs.orderModal;
//       orderComponent.showModal();
//     },
//     openDelOrderModal(item) {
//       this.tempOrder = { ...item };
//       const delComponent = this.$refs.delModal;
//       delComponent.showModal();
//     },
//     updatePaid(item) {
//       this.isLoading = true;
//       const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
//       const paid = {
//         is_paid: item.is_paid,
//       };
//       this.$http.put(api, { data: paid }).then((response) => {
//         this.isLoading = false;
//         this.getOrders(this.currentPage);
//         this.$httpMessageState(response, '更新付款狀態');
//       });
//     },
//     delOrder() {
//       const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
//       this.isLoading = true;
//       this.$http.delete(url).then((response) => {
//         console.log(response);
//         const delComponent = this.$refs.delModal;
//         delComponent.hideModal();
//         this.getOrders(this.currentPage);
//       });
//     },
//   },
//   created() {
//     this.getOrders();
//     console.log(process.env.VUE_APP_API);
//   },
// };
</script>
