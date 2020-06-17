<template>
  <v-container>
    <v-snackbar v-model="snackbar">{{ noidung }}</v-snackbar>
    <v-snackbar top color="success" v-model="snackbarSP">{{ thanhCong }}</v-snackbar>
    <v-snackbar top color="warning" v-model="uploadLoi">{{loiUpload}}</v-snackbar>
    <v-row justify="space-around">
      <!-- <v-img
        v-if="chuDe.anh_dai_dien"
        :src="chuDe.anh_dai_dien"
        aspect-ratio="1.7"
        style="max-height: 400px"
      ></v-img>-->
      <v-img src="../../assets/bgchude.jpg" aspect-ratio="1.7" style="max-height: 400px"></v-img>
    </v-row>
    <v-card>
      <v-card-text>
        <v-layout class="mt-8">
          <v-layout column style="max-width: 200px; align-items: center">
            <img
              v-if="avatar_url && avatar_url !== ''"
              :src="avatar_url"
              width="200px"
              style="border: 1px solid grey"
            />
            <img v-else src="../../assets/avatar.jpg" height="200px" style="border: 1px solid grey" />
            <input
              ref="upload-image"
              class="upload-image"
              type="file"
              @change="handleChange($event)"
            />
            <v-btn @click="uploadAnh" class="mx-2 mt-4 mb-4" fab dark small color="primary">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
          </v-layout>
          <v-layout column class="ml-6">
            <span
              style="font-size: 34px; color: #1F618D; font-color: bold"
              class="mb-6"
            >{{user.name}}</span>
            <span style="font-size: 18px; color: #1B2631" class="mb-3">
              <v-icon>mdi-email</v-icon>
              Email: {{user.email}}
            </span>
            <span style="font-size: 18px; color: #1B2631" class="mb-3">
              <v-icon>mdi-check</v-icon>
              Quyền: {{user.quyen.mo_ta}}
            </span>
            <span style="font-size: 18px; color: #1B2631" class="mb-3">
              <v-icon>mdi-book-open</v-icon>
              Bài viết: {{user.so_bai_viet}}
            </span>
          </v-layout>
          <v-spacer />
          <!-- <v-layout>
            <v-btn small fab style="position: absolute; top 20px; right: 20px">
              <v-icon>mdi-message</v-icon>
            </v-btn>
          </v-layout> -->
        </v-layout>
        <div>
          <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab key="tab-1">Bài viết</v-tab>
            <v-tab key="tab-2">Thành viên</v-tab>
            <v-tab key="tab-3">Gian hàng</v-tab>
            <v-tab key="tab-4">Bán hàng</v-tab>
            <v-tab key="tab-5">Mua hàng</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item key="tab-1">
              <v-container class="mt-6">
                <div style="font-size: 20px; color: #2980B9; font-weight: bold">Bài viết</div>
                <br />
                <div style="display: flex;" v-for="bv in baiViets" :key="bv.id">
                  <div style=" height: 200px">
                    <img
                      v-if="bv.anh_dai_dien"
                      :src="endPointImage + bv.anh_dai_dien"
                      style="width: 250px; max-height: 170px"
                    />

                    <img
                      v-else
                      src="../../assets/baiviet.png"
                      style="width: 250px; max-height: 200px"
                    />
                  </div>
                  <div style="height: auto; padding-left: 30px; width: 100%">
                    <div style="display: flex;  align-items: flex-end">
                      <div style="flex-grow: 1; height: 40px">
                        <v-list-item-avatar style="max-width: 100%; max-height: 100%">
                          <v-img v-if="avatar_url" :src="avatar_url"></v-img>
                          <v-img v-else src="../../assets/avatar.jpg"></v-img>
                        </v-list-item-avatar>
                      </div>
                      <div style="flex-grow: 50;">
                        <strong style="font-size: 18px">{{user.name}}</strong>
                        {{bv.created_at}}
                      </div>
                    </div>
                    <br />
                    <v-layout>
                      <router-link :to="'/baiviet/'+ bv.id">
                        <div
                          style="font-size: 18px; font-weight: bold; margin-bottom: 15px"
                        >{{bv.tieu_de}}</div>
                      </router-link>
                      <v-spacer />
                      <v-btn x-small class="mx-2" fab dark color="cyan" @click="editBaiViet(bv.id)">
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        x-small
                        class="mx-2"
                        fab
                        dark
                        color="pink"
                        @click="confirmXoaBaiViet(bv.id)"
                      >
                        <v-icon dark>mdi-delete</v-icon>
                      </v-btn>
                    </v-layout>
                    <div style="margin-bottom: 15px" v-html="parseText(bv.noi_dung)"></div>
                  </div>
                </div>
              </v-container>
            </v-tab-item>
            <v-tab-item key="tab-2">
              <v-row :gutters="20">
                <v-col cols="6" v-for="us in users" :key="us.id">
                  <v-row no-gutters>
                    <v-col cols="5">
                      <router-link :to="'/canhan/' + us.id">
                      <img
                        v-if="us.anh_dai_dien"
                        :src="endPointImage + us.anh_dai_dien"
                        style="border: 1px solid grey; height: auto; width: 90%; border-radius: 10px"
                      />
                      <img
                        v-else
                        src="../../assets/avatar.jpg"
                        style="border: 1px solid grey; height: auto; width: 90%; border-radius: 10px"
                      />
                      </router-link>
                    </v-col>
                    <v-col cols="7">
                       <router-link :to="'/canhan/' + us.id">
                      <div
                        class="mb-3"
                        style="font-size: 18px; color: #1F618D; font-weight: bold"
                      >{{us.name}}</div>
                       </router-link>
                      <div class="mb-2" style="font-size: 14px; color: #1B2631; width: 100%">
                        <v-icon small>mdi-email</v-icon>
                        <span class="ml-1">Email: {{us.email}}</span>
                      </div>
                      <div
                        class="mb-2"
                        style="font-size: 14px; color: #1B2631"
                        v-if="user.quyen_id == 2"
                      >
                        <v-select
                          prepend-icon="mdi-check"
                          style="width: 80%;"
                          v-model="us.quyen.id"
                          dense
                          :items="quyens"
                          label="Chọn quyền"
                          item-text="mo_ta"
                          item-value="id"
                          solo
                          @change="doiQuyen(us.id, us.quyen.id)"
                        ></v-select>
                      </div>
                      <div v-else class="mb-2" style="font-size: 14px; color: #1B2631; width: 100%">
                        <v-icon small>mdi-check</v-icon>
                        <span class="ml-1">Quyền: {{us.quyen.mo_ta}}</span>
                      </div>
                      <router-link :to="'/tinnhan/' + us.id">
                        <v-btn class="mx-2" fab dark small color="primary">
                          <v-icon dark>mdi-message</v-icon>
                        </v-btn>
                      </router-link>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item key="tab-3">
              <v-row>
                <v-col xl="2" lg="3" md="4" sm="6">
                  <v-card
                    height="auto"
                    class="mx-auto"
                    max-width="250"
                    style="border-radius: 15px;"
                    @click="showFormAddChuDe"
                  >
                    <v-card-text style="text-align: center" class="pt-2 pb-2">
                      <v-icon style="font-size: 150px">mdi-plus</v-icon>
                    </v-card-text>
                    <v-card-subtitle class="pt-0 pb-0">Thêm sản phẩm</v-card-subtitle>
                    <v-btn color="blue" text>Thêm sản phẩm</v-btn>
                  </v-card>
                </v-col>
                <v-col xl="2" lg="3" md="4" sm="6" v-for="sanpham in sanPhams" :key="sanpham.id">
                  <v-card class="mx-auto" max-width="250" style="border-radius: 15px;">
                    <div @click="xemSanPham(sanpham.id)">
                      <v-img
                        class="white--text align-end"
                        height="250px"
                        v-if="sanpham.anh_dai_dien"
                        :src="endPointImage + sanpham.anh_dai_dien"
                      ></v-img>
                      <v-img
                        v-else
                        class="white--text align-end"
                        height="250px"
                        src="../../assets/sanpham.jpg"
                      ></v-img>
                      <v-card-text class="pb-0">{{sanpham.ten_san_pham}}</v-card-text>
                      <v-card-title class="pt-0">{{sanpham.gia_ban}} đ</v-card-title>
                      <v-card-subtitle>Giá nhập: {{sanpham.gia_nhap}} đ</v-card-subtitle>
                    </div>
                    <v-layout class="pr-3">
                      <v-btn color="orange" text>Xem</v-btn>
                      <v-spacer />

                      <v-btn small icon color="indigo" @click="showFormEditChuDe(sanpham)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn small icon color="pink" @click="confirmXoaSanPham(sanpham.id)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-card>
                </v-col>
              </v-row>

              <v-dialog v-model="showFormSanPham" width="500">
                <v-card>
                  <form ref="form">
                    <v-card-title
                      v-if="editSanPham"
                      class="headline grey lighten-2"
                      primary-title
                    >Cập nhật sản phẩm</v-card-title>
                    <v-card-title v-else class="headline grey lighten-2" primary-title>Thêm sản phẩm</v-card-title>
                    <v-card-text class="mt-6">
                      <span>Tên sản phẩm</span>
                      <v-text-field
                        class="mt-3"
                        v-model="formSanPham.ten_san_pham"
                        placeholder="Nhập tên sản phẩm"
                        solo
                        :rules="tenSanPhamRules"
                      ></v-text-field>
                      <v-row>
                        <v-col cols="6">
                          <span>Giá nhập</span>
                          <v-text-field
                            type="number"
                            class="mt-3"
                            v-model="formSanPham.gia_nhap"
                            placeholder="Nhập vốn nhập sản phẩm"
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <span>Giá bán sản phẩm</span>
                          <v-text-field
                            type="number"
                            class="mt-3"
                            v-model="formSanPham.gia_ban"
                            placeholder="Nhập giá bán sản phẩm"
                            solo
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-layout class="mb-6">
                        <v-btn small @click="uploadAnhSanPham">
                          <input
                            ref="upload-image-chu-de"
                            class="upload-image"
                            type="file"
                            @change="handleChangeAnhSanPham($event)"
                          />
                          <v-icon left dark>mdi-image-area</v-icon>Upload Ảnh đại diện
                        </v-btn>
                        <img
                          v-if="anhSanPham"
                          :src="anhSanPham"
                          style="width: 100px; height: 100px; border: 1px solid grey; border-radius: 7px"
                          class="ml-6"
                        />
                      </v-layout>
                      <span>Mô tả</span>
                      <v-textarea
                        class="mt-3"
                        v-model="formSanPham.mo_ta"
                        placeholder="Nhập mô tả sản phẩm"
                        solo
                      ></v-textarea>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        v-if="editSanPham"
                        color="primary"
                        text
                        @click="capNhatSanPham"
                      >Cập nhật</v-btn>
                      <v-btn v-else color="primary" text @click="themSanPham">Thêm sản phẩm</v-btn>
                    </v-card-actions>
                  </form>
                </v-card>
              </v-dialog>
            </v-tab-item>
            <v-tab-item key="tab-4"><ban-hang></ban-hang></v-tab-item>
            <v-tab-item key="tab-5"><mua-hang></mua-hang></v-tab-item>
          </v-tabs-items>
        </div>
      </v-card-text>
    </v-card>
    <v-dialog v-model="xoa" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{tieuDeXoa}}</v-card-title>
        <v-card-text style="font-size: 18px;">{{noiDungXoa}}</v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="xoa = false">Hủy</v-btn>
          <v-btn color="primary" text @click="xoaNoiDung(doiTuongXoa)">Đồng ý</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import md from "marked";
import BanHang from "./banhang";
import MuaHang from "./muahang";

export default {
  components: { BanHang, MuaHang },
  data() {
    return {
      xoa: false,
      tieuDeXoa: null,
      noiDungXoa: "",
      doiTuongXoa: "",
      loiUpload: null,
      uploadLoi: false,
      loggedIn: true,
      tab: "tab-1",
      showFormSanPham: false,
      anhSanPham: null,
      avatar_url: "",
      user: {
        quyen: {
          ten: "",
          mo_ta: ""
        }
      },
      editSanPham: false,
      formSanPham: {
        id: null,
        ten_san_pham: "",
        gia_ban: null,
        gia_nhap: null,
        anh_dai_dien: null,
        mo_ta: null
      },
      bai_viet_id: null,
      snackbar: false,
      noidung: "",
      baiViets: [],
      users: [],
      thanhCong: null,
      snackbar: false,
      endPointImage: "",
      sanPhams: [],
      quyens: [],
      quyen_id: null,
      snackbarSP: false,
      tenSanPhamRules: [
        v => !!v || "Tên sản phẩm không thể bỏ trống",
        v => (v && v.length >= 3) || "Tên sản phẩm tối thiểu 3 ký tự"
      ]
    };
  },
  created() {
    this.me();
    this.getBaiViet();
    this.getUser();
    this.endPointImage = ImageUrl + "/";
    this.getQuyen();
    this.getSanPham();
  },
  methods: {
    showFormAddChuDe() {
      this.editSanPham = false;
      this.showFormSanPham = true;
      this.formSanPham = {
        id: null,
        ten_san_pham: "",
        gia_ban: null,
        gia_nhap: null,
        anh_dai_dien: null,
        mo_ta: null
      };
    },
    async themSanPham() {
      try {
        let data = await axios.post("sanpham", this.formSanPham);
        this.thanhCong = "Tạo sản phẩm thành công";
        this.snackbarSP = true;
        this.getSanPham();
        this.showFormSanPham = false;
      } catch (error) {
        console.log(error);
      }
    },
    async showFormEditChuDe(data) {
      this.editSanPham = true;
      this.showFormSanPham = true;
      this.formSanPham.ten_san_pham = data.ten_san_pham;
      this.formSanPham.mo_ta = data.mo_ta;
      this.formSanPham.anh_dai_dien = data.anh_dai_dien;
      this.formSanPham.id = data.id;
      this.formSanPham.gia_ban = data.gia_ban;
      this.formSanPham.gia_nhap = data.gia_nhap;
      this.anhSanPham = this.endPointImage + data.anh_dai_dien;
    },
    async capNhatSanPham() {
      try {
        await axios.put("sanpham/" + this.formSanPham.id, this.formSanPham);
        this.thanhCong = "Cập nhật sản phẩm thành công";
        this.snackbarSP = true;
        this.showFormSanPham = false;
        this.getSanPham();
      } catch (error) {
        console.log(error);
      }
    },
    editBaiViet(id) {
      this.$router.push("/suabaiviet/" + id);
    },
    confirmXoaBaiViet(id) {
      this.xoa = true;
      this.doiTuongXoa = "bai_viet";
      this.bai_viet_id = id;
      this.tieuDeXoa = "Xóa bài viết";
      this.noiDungXoa = "Bạn có chắc chắn muốn xóa bài viết này?";
    },
    uploadAnhSanPham() {
      this.$refs["upload-image-chu-de"].click();
    },
    handleChangeAnhSanPham(e) {
      let files = e.target.files;
      let data = new FormData();
      data.append("file", files[0]);

      var filePath = files[0].name.split(".").pop(); //lấy định dạng file
      var dinhDangChoPhep = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "tiff",
        "BMP",
        "webp"
      ]; //các tập tin cho phép
      const isLt2M = files[0].size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.loiUpload = "Kích thước tập tin tối đa 20MB";
        this.uploadLoi = true;
        return false;
      }
      if (!dinhDangChoPhep.find(el => el == filePath)) {
        this.loiUpload = "Định dạng file không hợp lệ, hãy upload file ảnh";
        this.uploadLoi = true;
        return;
      } else {
        axios
          .post("/uploadanh", data)
          .then(res => {
            this.formSanPham.anh_dai_dien = res.data;
            this.anhSanPham = ImageUrl + "/" + res.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    async me() {
      try {
        let data = await axios.get("/userinfo");
        this.user = data.data;
        if (data.data.anh_dai_dien) {
          this.avatar_url = ImageUrl + "/" + data.data.anh_dai_dien;
        }
      } catch (error) {
        // Exception.hanle(error);
      }
    },
    async doiQuyen(id, quyen_id) {
      await axios.post("doiquyen/" + id, { quyen_id: quyen_id });
      this.noidung = "Đã thay đổi quyền người dùng";
      this.snackbar = true;
    },
    uploadAnh() {
      this.$refs["upload-image"].click();
    },
    handleChange(e) {
      let files = e.target.files;
      let data = new FormData();
      data.append("file", files[0]);

      var filePath = files[0].name.split(".").pop(); //lấy định dạng file
      var dinhDangChoPhep = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "tiff",
        "BMP",
        "webp"
      ]; //các tập tin cho phép
      const isLt2M = files[0].size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.loiUpload = "Kích thước tập tin tối đa 20MB";
        this.uploadLoi = true;
        return false;
      }
      if (!dinhDangChoPhep.find(el => el == filePath)) {
        this.loiUpload = "Định dạng file không hợp lệ, hãy upload file ảnh";
        this.uploadLoi = true;
        return;
      } else {
        axios
          .post("/uploadavatar", data)
          .then(res => {
            this.avatar_url = ImageUrl + "/" + res.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    async getBaiViet() {
      let data = await axios.get("baivietuser");
      this.baiViets = data.data;
    },
    parseText(text) {
      if (text) {
        return md.parse(text);
      } else return null;
    },
    async getUser() {
      let data = await axios.get("alluser");
      this.users = data.data;
    },
    async getQuyen() {
      let data = await axios.get("allquyen");
      this.quyens = data.data;
    },
    async getSanPham() {
      let data = await axios.get("sanpham");
      this.sanPhams = data.data;
    },
    async xoaNoiDung(data) {
      if (data == "bai_viet") {
        await axios.delete("/baiviet/" + this.bai_viet_id);
        this.snackbarSP = true;
        this.thanhCong = "Xóa bài viết thành công";
        this.getBaiViet();
      }
      if (data == "san_pham") {
        await axios.delete("sanpham/" + this.formSanPham.id);
        this.snackbarSP = true;
        this.thanhCong = "Xóa sản phẩm thành công";
        this.getSanPham();
      }
      this.xoa = false;
    },
    async confirmXoaSanPham(id) {
      this.xoa = true;
      this.doiTuongXoa = "san_pham";
      this.formSanPham.id = id;
      this.tieuDeXoa = "Xóa sản phẩm";
      this.noiDungXoa = "Bạn có chắc chắn muốn xóa sản phẩm này?";
    },
    xemSanPham(id) {
      this.$router.push("/sanpham/" + id);
    }
  }
};
</script>
<style scoped>
.upload-image {
  display: none;
  z-index: -9999;
}
</style>