<template>
  <v-container>
    <v-row justify="space-around">
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
            <router-link :to="'/tinnhan/' + user.id">
              <v-btn color="warning" small fab style="position: absolute; top 20px; right: 20px">
                <v-icon>mdi-message</v-icon>
              </v-btn>
            </router-link>
          </v-layout>
        </v-layout>
        <div class="mt-6">
          <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab key="tab-1">Bài viết</v-tab>
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
                    </v-layout>
                    <div style="margin-bottom: 15px" v-html="parseText(bv.noi_dung)"></div>
                  </div>
                </div>
              </v-container>
            </v-tab-item>
            <v-tab-item key="tab-3">
              <v-row>
                <v-col xl="2" lg="3" md="4" sm="6" v-for="sanpham in sanPhams" :key="sanpham.id">
                  <v-card
                    class="mx-auto"
                    max-width="250"
                    style="border-radius: 15px;"
                    @click="xemSanPham(sanpham.id)"
                  >
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
                    <v-layout class="pr-3">
                      <v-btn color="orange" text>Xem</v-btn>
                      <v-spacer />
                    </v-layout>
                  </v-card>
                </v-col>
              </v-row>
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
      baiViets: [],
      endPointImage: "",
      sanPhams: []
    };
  },
  created() {
    this.me()
    this.getBaiViet();
    this.getUser();
    this.endPointImage = ImageUrl + "/";
    this.getSanPham();
  },
  methods: {
    async me() {
      try {
        let data = await axios.get("/userinfo");
        if (data.data && data.data.id == this.$route.params.id) {
          this.$router.push("/trangcanhan");
        }
      } catch (error) {
        console.log('chuadangnhap')
      }
    },
    async getBaiViet() {
      let data = await axios.get("baivietcanhan/" + this.$route.params.id);
      this.baiViets = data.data;
    },
    parseText(text) {
      if (text) {
        return md.parse(text);
      } else return null;
    },
    async getUser() {
      let data = await axios.get("userinfo/" + this.$route.params.id);
      this.user = data.data;
    },
    async getSanPham() {
      let data = await axios.get("sanphamcanhan/" + +this.$route.params.id);
      this.sanPhams = data.data;
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