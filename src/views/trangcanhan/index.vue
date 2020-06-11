<template>
  <v-container>
    <v-snackbar v-model="snackbar">{{ noidung }}</v-snackbar>
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
              <v-icon>mdi-message</v-icon>
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
              <v-container class="mt-6">
                <div style="font-size: 20px; color: #2980B9; font-weight: bold">Bài viết</div>
                <br />
                <div style="display: flex;" v-for="bv in baiViets" :key="bv.id">
                  <div style=" height: 200px">
                    <img
                      v-if="bv.anh_dai_dien"
                      :src="bv.anh_dai_dien"
                      style="width: 250px; max-height: 170px"
                    />

                    <img
                      v-else
                      src="../../assets/baiviet.png"
                      style="width: 250px; max-height: 200px"
                    />
                  </div>
                  <div style="height: auto; padding-left: 30px">
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
                    <router-link :to="'/baiviet/'+ bv.id">
                      <div
                        style="font-size: 18px; font-weight: bold; margin-bottom: 15px"
                      >{{bv.tieu_de}}</div>
                    </router-link>
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
                    </v-col>
                    <v-col cols="7">
                      <div
                        class="mb-3"
                        style="font-size: 18px; color: #1F618D; font-weight: bold"
                      >{{us.name}}</div>
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
                      <router-link :to="'tinnhan/' + us.id">
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
              <v-card flat>
                <v-card-text>Nội dung tab 3</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-card-text>
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
      },
      snackbar: false,
      noidung: "",
      baiViets: [],
      users: [],
      endPointImage: "",
      quyens: [],
      quyen_id: null
    };
  },
  created() {
    this.me();
    this.getBaiViet();
    this.getUser();
    this.endPointImage = ImageUrl + "/";
    this.getQuyen();
  },
  methods: {
    async me() {
      try {
        let data = await axios.get("/userinfo");
        this.user = data.data;
        if (data.data.anh_dai_dien) {
          this.avatar_url = ImageUrl + "/" + data.data.anh_dai_dien;
        }
      } catch (error) {
        Exception.hanle(error);
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