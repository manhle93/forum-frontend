<template>
  <div>
    <v-snackbar top color="success" v-model="snackbar">{{thanhCong}}</v-snackbar>
    <v-snackbar top color="warning" v-model="uploadLoi">{{loiUpload}}</v-snackbar>
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3" style="color: white">Slide</div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <br />
    <div style="text-align: center; font-size: 30px; color: #2980B9; font-weight: bold">Chủ đề</div>
    <br />
    <v-container>
      <v-card
        style="border-radius: 20px; padding: 40px; background-color: #154360"
        min-height="600px"
      >
        <v-row>
          <v-col v-for="chuDe in dataChuDe" :key="chuDe.id" xl="2" lg="3" md="4" sm="6">
            <v-card class="mx-auto" max-width="250" style="border-radius: 15px;">
              <v-img
                class="white--text align-end"
                height="150px"
                v-if="chuDe.anh_dai_dien"
                :src="chuDe.anh_dai_dien"
              >
                <v-card-title>{{chuDe.ten}}</v-card-title>
              </v-img>
              <v-img
                class="white--text align-end"
                height="150px"
                v-else
                src="../../assets/chuDe.jpg"
              >
                <v-card-title>{{chuDe.ten}}</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0">{{chuDe.so_bai_viet}} Bài viết</v-card-subtitle>
              <v-layout class="pr-3">
                <v-btn color="orange" text>Xem</v-btn>
                <v-spacer />
                <v-btn small icon color="indigo" @click="showFormEditChuDe(chuDe.id)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn small icon color="pink" @click="confirmXoaChuDe(chuDe.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-layout>
            </v-card>
          </v-col>
          <v-col xl="2" lg="3" md="4" sm="6">
            <v-card
              class="mx-auto"
              max-width="250"
              style="border-radius: 15px;"
              @click="showFormAddChuDe"
            >
              <v-card-text style="text-align: center" class="pt-2 pb-2">
                <v-icon style="font-size: 150px">mdi-plus</v-icon>
              </v-card-text>
              <v-card-subtitle class="pt-0 pb-0">Tạo chủ đề mới</v-card-subtitle>
              <v-btn color="blue" text>Thêm chủ đề</v-btn>
            </v-card>
          </v-col>
        </v-row>
        <div
          class="text-center"
          style="position: absolute; bottom: 20px; width: 100%; align-content: center"
        >
          <v-pagination v-model="pageChuDe" :length="totalPageChuDe" circle @input="PaginateChuDe"></v-pagination>
        </div>
      </v-card>
    </v-container>
    <v-container>
      <v-card style="border-radius: 20px">
        <v-card-title style="background-color: #1F618D; color: white">
          Viết bài mới
          <input
            ref="upload-image"
            class="upload-image"
            type="file"
            @change="handleChange($event)"
          />
          <v-btn class="ml-3" @click="uploadAnh">
            <v-icon left dark>mdi-image-area</v-icon>Hình ảnh
          </v-btn>
          <div style="width: 70px; height: 50px" class="ml-10 mb-4" v-if="form.anh_dai_dien">
            <v-img :src="form.anh_dai_dien" width="100%"></v-img>
          </div>
        </v-card-title>
        <v-card-text class="pt-3">
          <v-text-field v-model="form.tieu_de" label="Tiêu đề" single-line :rules="tieuDeRules"></v-text-field>
          <v-textarea
            v-model="form.noi_dung"
            solo
            flat
            no-resize
            label="Nội dung"
            :rules="noiDungRules"
          ></v-textarea>
        </v-card-text>
        <v-card-text></v-card-text>
        <v-card-actions>
          <div>
            <v-layout class="pl-3">
              <v-select
                v-model="form.chu_de_id"
                dense
                :items="chuDes"
                label="Chọn chủ đề"
                item-text="ten"
                item-value="id"
                solo
                :rules="chuDeRules"
              ></v-select>
              <v-radio-group v-model="form.loai" row dense class="ml-12 mt-2">
                <v-radio label="Bài viết" value="bai_viet"></v-radio>
                <v-radio label="Hỏi đáp" value="hoi_dap"></v-radio>
              </v-radio-group>
            </v-layout>
          </div>
          <v-spacer />
          <v-layout class="pb-3 pr-3">
            <v-spacer />
            <router-link to="/vietbai">
              <v-btn style="color: white" color="purple" class="mr-2">
                <v-icon left dark>mdi-pencil</v-icon>Viết bài dài
              </v-btn>
            </router-link>
            <v-btn color="primary" @click="dangBai">
              <v-icon left dark>mdi-plus</v-icon>Đăng
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-container>
    <br />
    <br />
    <v-container>
      <div style="font-size: 20px; color: #2980B9; font-weight: bold">Câu hỏi cần bạn giúp</div>
      <br />
      <v-card style="border-radius: 20px; padding: 40px">
        <div style="display: flex;" v-for="hoi in hoiDap" :key="hoi.id">
          <div style=" height: 200px">
            <img
              v-if="hoi.anh_dai_dien"
              :src="hoi.anh_dai_dien"
              style="width: 250px; max-height: 170px"
            />

            <img v-else src="../../assets/baiviet.png" style="width: 250px; max-height: 200px" />
          </div>
          <div style="height: auto; padding-left: 30px">
            <router-link :to="'baiviet/'+ hoi.id">
              <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px">{{hoi.tieu_de}}</div>
            </router-link>
            <div style="margin-bottom: 15px">{{hoi.noi_dung}}</div>
            <div style="display: flex;  align-items: flex-end">
              <div style="flex-grow: 1; height: 40px">
                <v-list-item-avatar v-if="hoi.user" style="max-width: 100%; max-height: 100%">
                  <v-img v-if="hoi.user.anh_dai_dien" :src="hoi.user.anh_dai_dien"></v-img>
                  <v-img v-else src="../../assets/avatar.jpg"></v-img>
                </v-list-item-avatar>
              </div>
              <div style="flex-grow: 50;" v-if="hoi.user">{{hoi.user.name}} {{hoi.created_at}}</div>
            </div>
          </div>
        </div>
        <div style="text-align: center">
          <v-btn color="primary">Xem thêm</v-btn>
        </div>
      </v-card>
    </v-container>
    <v-container class="mt-6">
      <div style="font-size: 20px; color: #2980B9; font-weight: bold">Bài viết mới cập nhật</div>
      <br />
      <v-card style="border-radius: 20px; padding: 40px">
        <div style="display: flex;" v-for="bv in baiViet" :key="bv.id">
          <div style=" height: 200px">
            <img
              v-if="bv.anh_dai_dien"
              :src="bv.anh_dai_dien"
              style="width: 250px; max-height: 170px"
            />

            <img v-else src="../../assets/baiviet.png" style="width: 250px; max-height: 200px" />
          </div>
          <div style="height: auto; padding-left: 30px">
            <router-link :to="'baiviet/'+ bv.id">
              <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px">{{bv.tieu_de}}</div>
            </router-link>
            <div style="margin-bottom: 15px" v-html="parseText(bv.noi_dung)"></div>
            <div style="display: flex;  align-items: flex-end">
              <div style="flex-grow: 1; height: 40px">
                <v-list-item-avatar v-if="bv.user" style="max-width: 100%; max-height: 100%">
                  <v-img v-if="bv.user.anh_dai_dien" :src="bv.user.anh_dai_dien"></v-img>
                  <v-img v-else src="../../assets/avatar.jpg"></v-img>
                </v-list-item-avatar>
              </div>
              <div style="flex-grow: 50;" v-if="bv.user">{{bv.user.name}} {{bv.created_at}}</div>
            </div>
          </div>
        </div>
        <div style="text-align: center">
          <v-btn color="primary">Xem thêm</v-btn>
        </div>
      </v-card>
    </v-container>
    <v-dialog v-model="showFormChuDe" width="500">
      <v-card>
        <v-card-title v-if="editChuDe" class="headline grey lighten-2" primary-title>Cập nhật chủ đề</v-card-title>
        <v-card-title v-else class="headline grey lighten-2" primary-title>Thêm chủ đề</v-card-title>
        <v-card-text class="mt-6">
          <form>
            <span>Tên chủ đề</span>
            <v-text-field
              class="mt-3"
              v-model="formChuDe.ten"
              placeholder="Nhập tiêu đề bài viết"
              solo
              :rules="tenChuDeRules"
            ></v-text-field>
            <v-layout class="mb-6">
              <v-btn small @click="uploadAnhChuDe">
                <input
                  ref="upload-image-chu-de"
                  class="upload-image"
                  type="file"
                  @change="handleChangeAnhChuDe($event)"
                />
                <v-icon left dark>mdi-image-area</v-icon>Upload Ảnh đại diện
              </v-btn>
              <img
                v-if="formChuDe.anh_dai_dien"
                :src="formChuDe.anh_dai_dien"
                style="width: 100px; height: 100px; border: 1px solid grey; border-radius: 7px"
                class="ml-6"
              />
            </v-layout>
            <span>Mô tả</span>
            <v-textarea
              class="mt-3"
              v-model="formChuDe.mo_ta"
              placeholder="Nhập tiêu đề bài viết"
              solo
            ></v-textarea>
          </form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="editChuDe" color="primary" text @click="capNhatChuDe">Cập nhật</v-btn>
          <v-btn v-else color="primary" text @click="themChuDe">Thêm chủ đề</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="xoa" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{tieuDeXoa}}</v-card-title>
        <v-card-text style="font-size: 18px;">{{noiDungXoa}}</v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="xoa = false">Hủy</v-btn>
          <v-btn color="primary" text @click="xoaChuDe">Đồng ý</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import md from "marked";

export default {
  data() {
    return {
      pageChuDe: 1,
      totalPageChuDe: 1,
      dataChuDe: [],
      showFormChuDe: false,
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      hoiDap: [],
      baiViet: [],
      snackbar: false,
      form: {
        tieu_de: "",
        noi_dung: "",
        chu_de_id: null,
        loai: "bai_viet",
        anh_dai_dien: null
      },
      formChuDe: {
        ten: "",
        anh_dai_dien: null,
        mo_ta: null
      },
      xoa: false,
      tieuDeXoa: "",
      noiDungXoa: "",
      editChuDe: false,
      uploadLoi: false,
      loiUpload: "",
      thanhCong: "",
      chuDes: [],
      tenChuDeRules: [
        v => !!v || "Tên chủ đề không thể bỏ trống",
        v => (v && v.length >= 5) || "Tên chủ đề tối thiểu 5 ký tự"
      ],
      tieuDeRules: [
        v => !!v || "Tiêu đề không thể bỏ trống",
        v => (v && v.length >= 5) || "Tên tối thiểu 5 ký tự"
      ],
      chuDeRules: [v => !!v || "Chủ đề không thể bỏ trống"],
      noiDungRules: [
        v => !!v || "Nội dung không thể bỏ trống",
        v => (v && v.length >= 10) || "Nội dung tối thiểu 10 ký tự"
      ]
    };
  },
  created() {
    this.getChuDe();
    this.getBaiViet();
    this.getChuDeBaiViet();
  },
  methods: {
    async PaginateChuDe() {
      try {
        let data = await axios.get("/chude?page=" + this.pageChuDe);
        this.dataChuDe = data.data.data.data;
        this.pageChuDe = data.data.data.current_page;
        this.totalPageChuDe = data.data.data.last_page;
      } catch (error) {
        console.log(error);
      }
    },
    async getChuDe() {
      try {
        let data = await axios.get("/chude");
        this.dataChuDe = data.data.data.data;
        this.pageChuDe = data.data.data.current_page;
        this.totalPageChuDe = data.data.data.last_page;
      } catch (error) {
        console.log(error);
      }
    },
    async getBaiViet() {
      let data = await axios.get("/baiviettrangchu");
      this.hoiDap = data.data.hoiDap;
      this.baiViet = data.data.baiViet;
    },
    async getChuDeBaiViet() {
      try {
        let data = await axios.get("/chude?Perpage=999");
        this.chuDes = data.data.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async dangBai() {
      try {
        await axios.post("/baiviet", this.form);
        this.thanhCong = "Đăng bài thành công";
        this.snackbar = true;
        this.resetBaiViet();
        this.getBaiViet();
      } catch (error) {
        console.log(error);
      }
    },
    resetBaiViet() {
      this.form = {
        tieu_de: "",
        noi_dung: "",
        chu_de_id: null,
        loai: "bai_viet",
        anh_dai_dien: null
      };
    },
    parseText(text) {
      if (text) {
        return md.parse(text);
      } else return null;
    },
    handleChange(e) {
      let files = e.target.files;
      let data = new FormData();
      data.append("file", files[0]);

      var filePath = files[0].name.split(".").pop(); //lấy định dạng file
      var dinhDangChoPhep = ["jpg", "jpeg", "png", "gif", "tiff", "BMP"]; //các tập tin cho phép
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
            this.form.anh_dai_dien = ImageUrl + "/" + res.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleChangeAnhChuDe(e) {
      let files = e.target.files;
      let data = new FormData();
      data.append("file", files[0]);

      var filePath = files[0].name.split(".").pop(); //lấy định dạng file
      var dinhDangChoPhep = ["jpg", "jpeg", "png", "gif", "tiff", "BMP"]; //các tập tin cho phép
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
            this.formChuDe.anh_dai_dien = ImageUrl + "/" + res.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    showFormAddChuDe() {
      this.editChuDe = false;
      this.showFormChuDe = true;
      this.formChuDe = {
        ten: "",
        anh_dai_dien: null,
        mo_ta: null
      };
    },
    async themChuDe() {
      try {
        let data = await axios.post("chude", this.formChuDe);
        this.thanhCong = "Tạo chủ đề thành công";
        this.snackbar = true;
        this.getChuDe();
        this.showFormChuDe = false;
      } catch (error) {
        console.log(error);
      }
    },
    uploadAnh() {
      this.$refs["upload-image"].click();
    },
    uploadAnhChuDe() {
      this.$refs["upload-image-chu-de"].click();
    },
    async showFormEditChuDe(id) {
      this.editChuDe = true;
      this.showFormChuDe = true;
      try {
        let data = await axios.get(`/chude/${id}`);
        console.log(data);
        this.formChuDe.ten = data.data.ten;
        this.formChuDe.mo_ta = data.data.mo_ta;
        this.formChuDe.anh_dai_dien = data.data.anh_dai_dien;
        this.formChuDe.id = data.data.id;
      } catch (error) {
        console.log(error);
      }
    },
    async capNhatChuDe() {
      try {
        await axios.put("chude/" + this.formChuDe.id, this.formChuDe);
        this.thanhCong = "Cập nhật chủ đề thành công";
        this.snackbar = true;
        this.showFormChuDe = false;
        this.getChuDe();
      } catch (error) {
        console.log(error);
      }
    },
    confirmXoaChuDe(id) {
      this.xoa = true;
      this.formChuDe.id = id;
      this.tieuDeXoa = "Xóa chủ đề";
      this.noiDungXoa =
        "Bạn có chắc chắn muốn xóa chủ đề này cùng toàn bộ bài viết bên trong ?";
    },
    async xoaChuDe() {
      try {
        await axios.delete("chude/" + this.formChuDe.id);
        this.thanhCong = "Xóa chủ đề thành công";
        this.snackbar = true;
        this.xoa = false;
        this.getChuDe();
        this.getBaiViet();
      } catch (error) {
        console.log(error);
      }
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