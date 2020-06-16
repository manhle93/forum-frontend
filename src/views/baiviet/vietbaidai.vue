<template>
  <v-container>
    <v-snackbar top color="success" v-model="snackbar">Đăng bài thành công</v-snackbar>
    <v-snackbar top color="warning" v-model="uploadLoi">{{loiUpload}}</v-snackbar>
    <v-card>
      <v-card-title>Viết bài</v-card-title>
      <v-form ref="form">
        <v-card-text>
          <span>Tiêu đề</span>
          <v-text-field
            class="mt-3"
            v-model="form.tieu_de"
            placeholder="Nhập tiêu đề bài viết"
            solo
            :rules="tieuDeRules"
          ></v-text-field>
          <span>Chủ đề</span>
          <div style="width: 50%; display: flex">
            <v-select
              v-model="form.chu_de_id"
              placeholder="Chọn chủ đề"
              style="width: 300px"
              dense
              :items="chuDes"
              item-text="ten"
              item-value="id"
              solo
              :rules="chuDeRules"
            ></v-select>
            <v-radio-group style="width: 300px" class="ml-8" v-model="form.loai" row>
              <v-radio label="Bài viết" value="bai_viet"></v-radio>
              <v-radio label="Hỏi đáp" value="hoi_dap"></v-radio>
            </v-radio-group>
          </div>
          <v-layout class="mb-6">
            <v-btn small @click="uploadAnh">
              <input
                ref="upload-image"
                class="upload-image"
                type="file"
                @change="handleChange($event)"
              />
              <v-icon left dark>mdi-image-area</v-icon>Upload Ảnh đại diện
            </v-btn>
            <img
              v-if="form.anh_dai_dien"
              :src="anh"
              style="width: 100px; height: 100px; border: 1px solid grey; border-radius: 7px"
              class="ml-6"
            />
          </v-layout>
          <vue-simplemde v-model="form.noi_dung" :rules="noiDungRules" />
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-btn @click="troVe">
            <v-icon left>mdi-keyboard-backspace</v-icon>Trở về
          </v-btn>
          <v-spacer />
          <v-btn @click="dangBai">
            <v-icon left>mdi-pencil</v-icon>Đăng bài
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    form: {
      tieu_de: "",
      chu_de_id: null,
      loai: "bai_viet",
      noi_dung: "",
      anh_dai_dien: null
    },
    anh: null,
    snackbar: false,
    uploadLoi: false,
    loiUpload: "",
    chuDes: [],
    tieuDeRules: [
      v => !!v || "Tiêu đề không thể bỏ trống",
      v => (v && v.length >= 5) || "Tên tối thiểu 5 ký tự"
    ],
    chuDeRules: [v => !!v || "Chủ đề không thể bỏ trống"],
    noiDungRules: [
      v => !!v || "Nội dung không thể bỏ trống",
      v => (v && v.length >= 10) || "Nội dung tối thiểu 10 ký tự"
    ]
  }),
  methods: {
    troVe() {
      this.$router.push("/");
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
      if (this.$refs.form.validate()) {
        try {
          await axios.post("/baiviet", this.form);
          this.snackbar = true;
          this.resetForm();
        } catch (error) {
          console.log(error);
        }
      } else {
        return console.log("Lỗi validate ", this.$refs.form);
      }
    },
    resetForm() {
      this.form = {
        tieu_de: "",
        chu_de_id: null,
        loai: "bai_viet",
        noi_dung: "",
        anh_dai_dien: null
      };
    },
    handleChange(e) {
      let files = e.target.files;
      let data = new FormData();
      data.append("file", files[0]);

      var filePath = files[0].name.split(".").pop(); //lấy định dạng file
      var dinhDangChoPhep = ["jpg", "jpeg", "png", "gif", "tiff", "BMP", 'webp']; //các tập tin cho phép
      const isLt2M = files[0].size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.loiUpload = "Kích thước tập tin tối đa 20MB"
        this.uploadLoi = true
        return false;
      }
      if (!dinhDangChoPhep.find(el => el == filePath)) {
        this.loiUpload = "Định dạng file không hợp lệ, hãy upload file ảnh"
        this.uploadLoi = true
        return;
      } else {
        axios
          .post("/uploadanh", data)
          .then(res => {
            this.form.anh_dai_dien = res.data;
            this.anh =  ImageUrl + '/' + res.data;
            console.log(this.form.anh_dai_dien, res);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    uploadAnh() {
      this.$refs["upload-image"].click();
    }
  },
  created() {
    this.getChuDeBaiViet();
  }
};
</script>
<style scoped>
@import "~simplemde/dist/simplemde.min.css";
@import "~github-markdown-css";
.upload-image {
  display: none;
  z-index: -9999;
}
</style>