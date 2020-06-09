<template>
  <v-container>
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
          <v-layout>
            <v-btn small fab style="position: absolute; top 20px; right: 20px">
              <v-icon>mdi-email</v-icon>
            </v-btn>
          </v-layout>
        </v-layout>
        <div>
          <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab key="tab-1">Bài viết</v-tab>
            <v-tab key="tab-2">Thành viên</v-tab>
            <v-tab key="tab-3">Gian hàng</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item key="tab-1">
              <v-card flat>
                <v-card-text>Nội dung tab 1</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item key="tab-2">
              <v-card flat>
                <v-card-text>Nội dung tab 2</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item key="tab-3">
              <v-card flat>
                <v-card-text>Nội dung tab 3</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-card-text>
      <!-- <v-row>
        <v-col cols="6">
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="../../assets/avatar.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>dasdsa</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col>
        </v-col>
      </v-row>-->
    </v-card>
  </v-container>
</template>
<script>
import md from "marked";

export default {
  data() {
    return {
      tab: "tab-1",
      avatar_url: "",
      user: {
        quyen: {
          ten: "",
          mo_ta: ""
        }
      }
    };
  },
  created() {
    this.me();
  },
  methods: {
    async me() {
      try {
        let data = await axios.get("/userinfo");
        this.user = data.data;
        if (data.data.anh_dai_dien) {
          this.avatar_url = ImageUrl + "/" + data.data.anh_dai_dien;
        }

        console.log(this.user);
      } catch (error) {
        Exception.hanle(error);
      }
    },
    uploadAnh() {
      this.$refs["upload-image"].click();
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
          .post("/uploadavatar", data)
          .then(res => {
            this.avatar_url = ImageUrl + "/" + res.data;
          })
          .catch(error => {
            console.log(error);
          });
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