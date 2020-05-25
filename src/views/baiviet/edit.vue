<template>
  <v-container>
    <v-snackbar top color="success" v-model="snackbar">Đăng bài thành công</v-snackbar>
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
            <v-btn small>
              <v-icon left dark>mdi-image-area</v-icon>Upload Ảnh đại diện
            </v-btn>
            <div
              style="width: 100px; height: 100px; border: 1px solid grey; border-radius: 7px"
              class="ml-6"
            ></div>
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
      noi_dung: ""
    },
    snackbar: false,
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
    async getBaiViet() {
      let data = await axios.get("/baiviet/" + this.$route.params.id);
      if(!User.own(data.data.user_id)){
        this.$router.push('/')
        return
      }
      this.form.tieu_de = data.data.tieu_de;
      this.form.noi_dung = data.data.noi_dung;
      this.form.chu_de_id = data.data.chu_de_id;
      this.form.loai = data.data.loai;
    },
    async dangBai() {
      if (this.$refs.form.validate()) {
        try {
          await axios.put(`/baiviet/${this.$route.params.id}`, this.form);
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
        noi_dung: ""
      };
    }
  },
  created() {
    this.getBaiViet();
    this.getChuDeBaiViet();
  }
};
</script>
<style scoped>
@import "~simplemde/dist/simplemde.min.css";
@import "~github-markdown-css";
</style>