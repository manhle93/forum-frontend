<template>
  <v-container>
    <v-snackbar top color="success" v-model="snackbar">{{thanhCong}}</v-snackbar>
    <div style="font-size: 20px; color: #2980B9; font-weight: bold">Danh sách đơn đặt hàng</div>
    <br />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Người mua hàng</th>
            <th class="text-left">Sô điện thoại</th>
            <th class="text-left">Địa chỉ giao hàng</th>
            <th class="text-left">Sản phẩm</th>
            <th class="text-left">Số lượng</th>
            <th class="text-left">Đơn giá bán</th>
            <th class="text-left">Tổng tiền</th>
            <th class="text-left">Trạng thái</th>
            <th class="text-left">Xử lý</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in donHangs" :key="item.id">
            <td>{{ item.ten_nguoi_mua }}</td>
            <td>{{ item.so_dien_thoai }}</td>
            <td>{{ item.dia_chi }}</td>
            <td>{{ item.san_pham.ten_san_pham }}</td>
            <td>{{ item.so_luong }}</td>
            <td>{{ item.san_pham.gia_ban }}</td>
            <td>{{ item.tong_tien }}</td>

            <td>
              <span style="color: #2980B9" v-if="item.trang_thai == 'moi_tao'">Mới tạo</span>
              <span style="color: red" v-if="item.trang_thai == 'khach_huy'">Khách hủy đơn</span>
              <span style="color: red" v-if="item.trang_thai == 'huy_bo'">Hủy đơn</span>
              <span style="color: #DC7633" v-if="item.trang_thai == 'nhan_don'">Nhân đơn, giao hàng</span>
              <span style="color: green" v-if="item.trang_thai == 'hoan_thanh'">Hoàn thành</span>
            </td>
            <td>
              <v-btn
                color="pink"
                fab
                x-small
                dark
                v-if="item.trang_thai == 'moi_tao' || item.trang_thai == 'nhan_don'"
                @click="huyDon(item.id)"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-btn
                class="ml-2"
                color="primary"
                fab
                x-small
                dark
                v-if="item.trang_thai == 'moi_tao'"
                @click="nhanDon(item.id)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                class="ml-2"
                color="success"
                fab
                x-small
                dark
                v-if="item.trang_thai == 'nhan_don'"
                @click="hoanThanh(item.id)"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      donHangs: [],
      snackbar: false,
      thanhCong: ""
    };
  },
  created() {
    this.getDonHang();
  },
  methods: {
    async getDonHang() {
      let data = await axios.get("banhangcanhan");
      this.donHangs = data.data;
    },
    async huyDon(id) {
      await axios.put("huydonhang/" + id);
      this.getDonHang();
      this.thanhCong = "Đã hủy đơn hàng";
      this.snackbar = true;
    },
    async nhanDon(id) {
      await axios.put("nhandonhang/" + id);
      this.getDonHang();
      this.thanhCong = "Đã nhận đơn hàng";
      this.snackbar = true;
    },
    async hoanThanh(id) {
      await axios.put("hoanthanhdonhang/" + id);
      this.getDonHang();
      this.thanhCong = "Đã hoàn thành đơn hàng";
      this.snackbar = true;
    }
  }
};
</script>
<style scoped>
</style>