<template>
  <div>
    <v-snackbar top color="success" v-model="snackbar">{{thanhCong}}</v-snackbar>
    <v-snackbar top color="warning" v-model="uploadLoi">{{loiUpload}}</v-snackbar>
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="require('../../assets/' + item.src)"
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
                :src="endPointImage + chuDe.anh_dai_dien"
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
              <v-card-subtitle class="pb-0">{{chuDe.so_bai_viet}} Bài đăng</v-card-subtitle>
              <v-layout class="pr-3">
                <router-link :to="`chude/${chuDe.id}`">
                  <v-btn color="orange" text>Xem</v-btn>
                </router-link>
                <v-spacer />
                <v-btn
                  small
                  icon
                  color="indigo"
                  @click="showFormEditChuDe(chuDe.id)"
                  v-if="loggedIn && quyen_id == 2"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  small
                  icon
                  color="pink"
                  @click="confirmXoaChuDe(chuDe.id)"
                  v-if="loggedIn && quyen_id == 2"
                >
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
    <v-container v-if="loggedIn">
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
          <div style="width: 70px; height: 50px" class="ml-10 mb-4" v-if="anhBaiViet">
            <v-img :src="anhBaiViet" width="100%"></v-img>
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
        <div style="display: flex; margin-bottom: 50px;" v-for="hoi in hoiDap" :key="hoi.id">
          <div style=" height: 200px">
            <img
              v-if="hoi.anh_dai_dien"
              :src="endPointImage + hoi.anh_dai_dien"
              style="width: 250px; max-height: 170px"
            />

            <img v-else src="../../assets/baiviet.png" style="width: 250px; max-height: 200px" />
          </div>
          <div style="height: auto; padding-left: 30px; width: 100%">
            <v-layout>
              <router-link :to="'baiviet/'+ hoi.id">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px">{{hoi.tieu_de}}</div>
              </router-link>
              <v-spacer />
              <v-btn
                x-small
                class="mx-2"
                fab
                dark
                color="cyan"
                @click="editBaiViet(hoi.id)"
                v-if="cuaToi(hoi.user_id)"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                x-small
                class="mx-2"
                fab
                dark
                color="pink"
                @click="confirmXoaBaiViet(hoi.id)"
                v-if="cuaToi(hoi.user_id) || quyen_id == 2"
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </v-layout>
            <div style="margin-bottom: 15px">{{parseText(hoi.noi_dung)}}</div>
            <div style="display: flex;  align-items: flex-end" @click="xemtrangCaNhan(hoi.user.id)">
              <div style="flex-grow: 1; height: 40px">
                <router-link :to="cuaToi(hoi.user.id) ? '/trangcanhan':'/canhan/' + hoi.user.id">
                  <v-list-item-avatar v-if="hoi.user" style="max-width: 100%; max-height: 100%">
                    <v-img v-if="hoi.user.anh_dai_dien" :src="endPointImage + hoi.user.anh_dai_dien"></v-img>
                    <v-img v-else src="../../assets/avatar.jpg"></v-img>
                  </v-list-item-avatar>
                </router-link>
              </div>
              <div style="flex-grow: 50;" v-if="hoi.user">{{hoi.user.name}} {{hoi.created_at}}</div>
            </div>
          </div>
        </div>
        <div
          class="text-center"
          style="position: absolute; bottom: 20px; width: 100%; align-content: center"
        >
          <v-pagination
            v-model="pageCauHoi"
            :length="totalPageCauHoi"
            circle
            @input="PaginateCauHoi"
          ></v-pagination>
        </div>
      </v-card>
    </v-container>
    <v-container class="mt-6">
      <div style="font-size: 20px; color: #2980B9; font-weight: bold">Bài viết mới cập nhật</div>
      <br />
      <v-card style="border-radius: 20px; padding: 40px">
        <div style="display: flex; margin-bottom: 50px;" v-for="bv in baiViet" :key="bv.id">
          <div style=" height: 200px">
            <img
              v-if="bv.anh_dai_dien"
              :src="endPointImage + bv.anh_dai_dien"
              style="width: 250px; max-height: 170px"
            />

            <img v-else src="../../assets/baiviet.png" style="width: 250px; max-height: 200px" />
          </div>
          <div style="height: auto; padding-left: 30px; width: 100%">
            <v-layout>
              <router-link :to="'baiviet/'+ bv.id">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px">{{bv.tieu_de}}</div>
              </router-link>
              <v-spacer />
              <v-btn
                x-small
                class="mx-2"
                fab
                dark
                color="cyan"
                @click="editBaiViet(bv.id)"
                v-if="cuaToi(bv.user_id)"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                x-small
                class="mx-2"
                fab
                dark
                color="pink"
                @click="confirmXoaBaiViet(bv.id)"
                v-if="cuaToi(bv.user_id) || quyen_id == 2"
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </v-layout>
            <div style="margin-bottom: 15px" v-html="parseText(bv.noi_dung)"></div>
            <div style="display: flex;  align-items: flex-end" @click="xemtrangCaNhan(bv.user.id)">
              <div style="flex-grow: 1; height: 40px">
                <router-link :to="cuaToi(bv.user.id) ? '/trangcanhan':'/canhan/' + bv.user.id">
                  <v-list-item-avatar v-if="bv.user" style="max-width: 100%; max-height: 100%">
                    <v-img v-if="bv.user.anh_dai_dien" :src="endPointImage + bv.user.anh_dai_dien"></v-img>
                    <v-img v-else src="@/assets/avatar.jpg"></v-img>
                  </v-list-item-avatar>
                </router-link>
              </div>
              <div style="flex-grow: 50;" v-if="bv.user">{{bv.user.name}} {{bv.created_at}}</div>
            </div>
          </div>
        </div>
        <v-pagination
          v-model="pageBaiViet"
          :length="totalPageBaiViet"
          circle
          @input="PaginateBaiViet"
        ></v-pagination>
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
                v-if="anhChuDe"
                :src="anhChuDe"
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
          <v-btn color="primary" text @click="xoaNoiDung(noidungxoa)">Đồng ý</v-btn>
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
      loggedIn: false,
      pageCauHoi: 1,
      totalPageCauHoi: 1,
      pageBaiViet: 1,
      totalPageBaiViet: 1,
      pageChuDe: 1,
      totalPageChuDe: 1,
      dataChuDe: [],
      showFormChuDe: false,
      noidungxoa: "",
      items: [
        {
          src: "bn3.jpg"
        },
        {
          src: "bn2.png"
        },
        {
          src: "bn1.jpg"
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
      bai_viet_id: null,
      quyen_id: null,
      anhChuDe: null,
      anhBaiViet: null,
      xoa: false,
      tieuDeXoa: "",
      noiDungXoa: "",
      editChuDe: false,
      uploadLoi: false,
      loiUpload: "",
      thanhCong: "",
      chuDes: [],
      endPointImage: "",
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
    this.loggedIn = User.loggedIn();
    this.quyen_id = User.quyenId();
    this.getChuDe();
    this.getBaiViet();
    this.getChuDeBaiViet();
    this.getCauHoi();
    this.endPointImage = ImageUrl + "/";
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
    async PaginateCauHoi() {
      try {
        let data = await axios.get("/cauhoitrangchu?page=" + this.pageCauHoi);
        this.hoiDap = data.data.data.data;
        this.pageCauHoi = data.data.data.current_page;
        this.totalPageCauHoi = data.data.data.last_page;
      } catch (error) {
        console.log(error);
      }
    },
    async PaginateBaiViet() {
      try {
        let data = await axios.get("/baiviettrangchu?page=" + this.pageBaiViet);
        this.baiViet = data.data.data.data;
        this.pageBaiViet = data.data.data.current_page;
        this.totalPageBaiViet = data.data.data.last_page;
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
      this.baiViet = data.data.data.data;
      this.pageBaiViet = data.data.data.current_page;
      this.totalPageBaiViet = data.data.data.last_page;
    },
    async getCauHoi() {
      let data = await axios.get("/cauhoitrangchu");
      this.hoiDap = data.data.data.data;
      this.pageCauHoi = data.data.data.current_page;
      this.totalPageCauHoi = data.data.data.last_page;
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
        this.getCauHoi()
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
      this.anhBaiViet = null;
    },
    parseText(text) {
      let content = '';
      if(text && text.length > 300){
        content = text.substring(0, 300)
      }
      if (content) {
        return md.parse(content);
      } else return null;
    },
    handleChange(e) {
      let files = e.target.files;
      let data = new FormData();
      data.append("file", files[0]);

      var filePath = files[0].name.split(".").pop(); //lấy định dạng file
      var dinhDangChoPhep = ["jpg", "jpeg", "png", "gif", "tiff", "BMP", 'webp']; //các tập tin cho phép
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
            this.form.anh_dai_dien = res.data;
            this.anhBaiViet = ImageUrl + "/" + res.data;
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
      var dinhDangChoPhep = ["jpg", "jpeg", "png", "gif", "tiff", "BMP", 'webp']; //các tập tin cho phép
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
            this.formChuDe.anh_dai_dien = res.data;
            this.anhChuDe = ImageUrl + "/" + res.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    showFormAddChuDe() {
      this.editChuDe = false;
      this.showFormChuDe = true;
      this.anhChuDe = null;
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
        this.formChuDe.ten = data.data.ten;
        this.formChuDe.mo_ta = data.data.mo_ta;
        this.formChuDe.anh_dai_dien = data.data.anh_dai_dien;
        this.formChuDe.id = data.data.id;
        this.anhChuDe = ImageUrl + "/" + data.data.anh_dai_dien;
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
      this.noidungxoa = "chu_de";
      this.formChuDe.id = id;
      this.tieuDeXoa = "Xóa chủ đề";
      this.noiDungXoa =
        "Bạn có chắc chắn muốn xóa chủ đề này cùng toàn bộ bài viết bên trong ?";
    },
    async xoaNoiDung(data) {
      try {
        if (data == "chu_de") {
          await axios.delete("chude/" + this.formChuDe.id);
          this.thanhCong = "Xóa chủ đề thành công";
          this.snackbar = true;
          this.xoa = false;
          this.getChuDe();
        }
        if (data == "bai_viet") {
          await axios.delete("/baiviet/" + this.bai_viet_id);
          this.thanhCong = "Xóa bài viết thành công";
          this.snackbar = true;
          this.xoa = false;
        }
        this.getBaiViet();
        this.getCauHoi();
      } catch (error) {
        console.log(error);
      }
    },
    cuaToi(id) {
      return User.own(id);
    },
    editBaiViet(id) {
      this.$router.push("/suabaiviet/" + id);
    },
    confirmXoaBaiViet(id) {
      this.bai_viet_id = id;
      this.xoa = true;
      this.noidungxoa = "bai_viet";
      this.tieuDeXoa = "Xóa bài viết";
      this.noiDungXoa = "Bạn có chắc chắn muốn xóa bài viết này ?";
    },
    xemtrangCaNhan(id) {
      if(cuaToi(id)){
        this.$router.push("/trangcanhan");
      }
      this.$router.push("/canhan/" + id);
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