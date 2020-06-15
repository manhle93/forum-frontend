<template>
  <v-container>
    <v-snackbar top color="success" v-model="snackbar">{{thanhCong}}</v-snackbar>
    <v-card class="mt-6">
      <v-row>
        <v-col cols="5">
          <div style="background-color: white; width: 100%" class="pt-4 pl-6">
            <img :src="endPoint + sanPham.anh_dai_dien" style="max-height: 300px; max-width: 250px" />
          </div>
        </v-col>
        <v-col cols="7">
          <div style="width: 100%;" class="pt-4 pr-4">
            <h2>{{sanPham.ten_san_pham}}</h2>
            <br />
            <h2>{{sanPham.gia_ban}} đ</h2>
            <div class="mt-2 mb-4">{{sanPham.mo_ta}}</div>
            <v-btn>Đặt hàng</v-btn>
            <div style="display: flex;  align-items: flex-end" class="mt-6 mb-6">
              <div style="flex-grow: 1; height: 40px">
                <v-list-item-avatar style="max-width: 100%; max-height: 100%">
                  <v-img
                    v-if="sanPham.user.anh_dai_dien"
                    :src="endPoint + sanPham.user.anh_dai_dien"
                  ></v-img>
                  <v-img v-else src="../../assets/avatar.jpg"></v-img>
                </v-list-item-avatar>
              </div>
              <div style="flex-grow: 50;">
                <strong style="font-size: 18px">{{sanPham.user.name}}</strong>
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
    quyen_id: null
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
    }
  }
};
</script>
<style scoped>
</style>