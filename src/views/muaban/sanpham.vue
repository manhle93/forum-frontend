<template>
  <v-container>
    <v-snackbar top color="success" v-model="snackbar">{{thanhCong}}</v-snackbar>
    <v-card class="mt-6">
      <v-row>
        <v-col cols="5">
          <div style="background-color: white; width: 100%; text-align: center" class="pt-4 pl-6">
            <img
              v-if="sanPham.anh_dai_dien"
              :src="endPoint + sanPham.anh_dai_dien"
              style="width: 100%"
            />
            <img v-else src="../../assets/sanpham.jpg" style="width: 100%" />
          </div>
        </v-col>
        <v-col cols="7">
          <div style="width: 100%;" class="pt-4 pr-4">
            <h2>{{sanPham.ten_san_pham}}</h2>
            <div style="float:right">
              <v-btn
                v-if="quyen_id == 2"
                class="mx-2"
                fab
                dark
                small
                color="pink"
                @click="confirmXoaSanPham"
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </div>
            <br />
            <h2>{{sanPham.gia_ban}} đ</h2>
            <div class="mt-2 mb-4">{{sanPham.mo_ta}}</div>
            <v-btn
              :disabled="!loggedIn || binhLuanCuaToi(sanPham.user_id)"
              @click="showDatHang"
            >Đặt hàng</v-btn>
            <div style="display: flex;  align-items: flex-end" class="mt-6 mb-6">
              <div style="flex-grow: 1; height: 40px">
                <router-link :to="'/canhan/' + sanPham.user.id">
                  <v-list-item-avatar style="max-width: 100%; max-height: 100%">
                    <v-img
                      v-if="sanPham.user.anh_dai_dien"
                      :src="endPoint + sanPham.user.anh_dai_dien"
                    ></v-img>
                    <v-img v-else src="../../assets/avatar.jpg"></v-img>
                  </v-list-item-avatar>
                </router-link>
              </div>
              <div style="flex-grow: 50;">
                <router-link :to="'/canhan/' + sanPham.user.id">
                  <strong style="font-size: 18px">{{sanPham.user.name}}</strong>
                </router-link>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-2" v-if="loggedIn" style="border-radius: 20px">
      <v-row>
        <v-col cols="1">
          <v-list-item-avatar class="ml-8">
            <v-img v-if="user.anh_dai_dien" :src="endPoint + user.anh_dai_dien"></v-img>
            <v-img v-else src="../../assets/avatar.jpg"></v-img>
          </v-list-item-avatar>
        </v-col>
        <v-col cols="10">
          <form ref="form" class="mt-3">
            <v-textarea
              rows="3"
              outlined
              label="Viết bình luận đi bạn ơi !"
              style="border-radius: 20px"
              v-model="form.noi_dung"
            ></v-textarea>
            <v-layout justify-end>
              <v-btn :disabled="dangBL" color="indigo" style="color: white" @click="vietBinhLuan">
                <v-icon left>mdi-pen</v-icon>Đăng
              </v-btn>
            </v-layout>
          </form>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-1" style="border-radius: 15px">
      <div class="pt-4 ml-8" style="font-size: 18px; color: #2980B9; font-weight: bold">Bình luận</div>
      <v-row v-for="binhluan in binhLuans" :key="binhluan.id">
        <v-col cols="1">
          <v-list-item-avatar class="ml-8">
            <v-img v-if="binhluan.user.anh_dai_dien" :src="endPoint + binhluan.user.anh_dai_dien"></v-img>
            <v-img v-else src="../../assets/avatar.jpg"></v-img>
          </v-list-item-avatar>
        </v-col>
        <v-col cols="10">
          <div
            style="width: 100%; border-radius: 25px; min-height: 100px; background-color: #80808036"
          >
            <v-layout class="ml-3">
              <span
                class="mt-2"
                style="color: #1F618D; font-size: 18px; font-weight: bold"
              >{{binhluan.user.name}}</span>
              <span class="ml-6 mt-2">{{binhluan.created_at}}</span>
              <v-spacer />
              <v-btn
                class="mb-5 mt-2 mr-6"
                fab
                dark
                x-small
                color="pink"
                v-if="binhLuanCuaToi(binhluan.user_id) || quyen_id == 2"
                @click="xoaBinhLuan(binhluan.id)"
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </v-layout>
            <v-card-text>{{binhluan.noi_dung}}</v-card-text>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog v-model="showFormDatHang" width="500">
      <v-card>
        <form ref="form">
          <v-card-title class="headline grey lighten-2" primary-title>Cập nhật sản phẩm</v-card-title>
          <v-card-text class="mt-6">
            <span>Tên người mua hàng</span>
            <v-text-field
              class="mt-3"
              v-model="formDatHang.ten_nguoi_mua"
              placeholder="Họ và tên người mua hàng"
              solo
              :rules="tenSanPhamRules"
            ></v-text-field>
            <v-row>
              <v-col cols="6">
                <span>Số điện thoại</span>
                <v-text-field
                  class="mt-3"
                  v-model="formDatHang.so_dien_thoai"
                  placeholder="Số điện thoại liên hệ"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <span>Số lượng mua</span>
                <v-text-field
                  type="number"
                  class="mt-3"
                  v-model="formDatHang.so_luong"
                  placeholder="Số lượng mua"
                  solo
                  :min="1"
                ></v-text-field>
                <span
                  style="font-size: 18px"
                >Tổng tiền: {{sanPham.gia_ban * formDatHang.so_luong}} đ</span>
              </v-col>
            </v-row>
            <span>Địa chỉ nhận hàng</span>
            <v-textarea
              class="mt-3"
              v-model="formDatHang.dia_chi"
              placeholder="Nhập chi tiết địa chỉ nhận hàng"
              solo
              :rules="diaChiRules"
            ></v-textarea>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="datHang">Đặt hàng</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="xoa" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Xóa sản phẩm</v-card-title>
        <v-card-text style="font-size: 18px;">Bạn có chắc chắn múa xóa sản phẩm này</v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="xoa = false">Hủy</v-btn>
          <v-btn color="primary" text @click="xoaSanPham()">Đồng ý</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    loggedIn: false,
    dangBL: true,
    thanhCong: "",
    user: {
      name: "",
      anh_dai_dien: null
    },
    form: {
      noi_dung: "",
      san_pham_id: null
    },
    endPoint: "",
    binhLuans: [],
    snackbar: false,
    sanPham: {
      user: {
        anh_dai_dien: ""
      }
    },
    xoa: false,
    quyen_id: null,
    showFormDatHang: false,
    formDatHang: {
      san_pham_id: null,
      ten_nguoi_mua: "",
      so_dien_thoai: "",
      so_luong: 1,
      dia_chi: ""
    },
    tenSanPhamRules: [
      v => !!v || "Tên người mua không thể bỏ trống",
      v => (v && v.length >= 3) || "Tên sản phẩm tối thiểu 3 ký tự"
    ],
    diaChiRules: [
      v => !!v || "Địa chỉ không thể bỏ trống",
      v => (v && v.length >= 5) || "Địa chỉ tối thiểu 3 ký tự"
    ]
  }),
  watch: {
    "form.noi_dung": function() {
      if (this.form.noi_dung.length >= 5) {
        this.dangBL = false;
      } else {
        this.dangBL = true;
      }
    }
  },
  created() {
    this.loggedIn = User.loggedIn();
    if (this.loggedIn) {
      this.me();
    }
    this.endPoint = ImageUrl + "/";
    this.getBinhLuan();
    this.getSanPham();
    this.quyen_id = User.quyenId();
  },
  methods: {
    async me() {
      try {
        let data = await axios.post("/auth/me");
        this.user = data.data;
      } catch (error) {
        // Exception.hanle(error);
      }
    },
    async getSanPham() {
      try {
        let data = await axios.get("sanpham/" + this.$route.params.id);
        this.sanPham = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getBinhLuan() {
      let data = await axios.get("/binhluansanpham/" + this.$route.params.id);
      this.binhLuans = data.data;
    },
    binhLuanCuaToi(id) {
      return User.own(id);
    },
    async vietBinhLuan() {
      try {
        this.form.san_pham_id = this.$route.params.id;
        await axios.post("/binhluansanpham", this.form);
        this.thanhCong = "Đã đăng bình luận";
        this.snackbar = true;
        this.form = {
          noi_dung: "",
          san_pham_id: this.$route.params.id
        };
        this.getBinhLuan();
      } catch (error) {
        console.log(error);
      }
    },
    async xoaBinhLuan($id) {
      try {
        let data = await axios.delete("/binhluansanpham/" + $id);
        this.thanhCong = "Xóa bình luận thành công";
        this.snackbar = true;
        this.getBinhLuan();
      } catch (error) {
        console.log(error);
      }
    },
    async datHang() {
      try {
        this.formDatHang.tong_tien =
          this.sanPham.gia_ban * this.formDatHang.so_luong;
        let data = await axios.post("dathang", this.formDatHang);
        this.showFormDatHang = false;
        this.thanhCong = "Đặt hàng thành công";
        this.snackbar = true;
      } catch (error) {}
    },
    showDatHang() {
      this.showFormDatHang = true;
      this.formDatHang = {
        san_pham_id: null,
        ten_nguoi_mua: "",
        so_dien_thoai: "",
        so_luong: 1,
        dia_chi: "",
        tong_tien: null
      };
      this.formDatHang.san_pham_id = this.$route.params.id;
    },
    confirmXoaSanPham(){
      this.xoa = true
    },
   async xoaSanPham(){
     await axios.delete('sanpham/'+ this.$route.params.id);
     this.xoa = false;
     this.thanhCong = "Xóa sản phẩm thành công"
     this.snackbar = true
     setTimeout(()=> {
       this.$router.push('/muasam')
     }, 1000)
    }
  }
};
</script>
<style scoped>
</style>