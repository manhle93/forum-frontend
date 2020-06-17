<template>
  <v-container style="background-color: white">
    <div style="font-size: 20px; font-weight: bold">Kết quả tìm kiếm cho từ khóa: {{search}}</div>
    <br />
    <div style="font-size: 20px; color: #2980B9; font-weight: bold">Người dùng</div>
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
            <div class="mb-2" style="font-size: 14px; color: #1B2631; width: 100%">
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
    <br />
    <div style="font-size: 20px; color: #2980B9; font-weight: bold">Sản phẩm</div>
    <v-row>
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
          </div>
          <v-layout class="pr-3">
            <v-btn color="orange" text>Xem</v-btn>
            <v-spacer />
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
    <br />
    <div style="font-size: 20px; color: #2980B9; font-weight: bold">Bài viết</div>
    <v-container class="mt-6">
      <div style="display: flex;" v-for="bv in baiViets" :key="bv.id">
        <div style=" height: 200px">
          <img
            v-if="bv.anh_dai_dien"
            :src="endPointImage + bv.anh_dai_dien"
            style="width: 250px; max-height: 170px"
          />

          <img v-else src="../../assets/baiviet.png" style="width: 250px; max-height: 200px" />
        </div>
        <div style="height: auto; padding-left: 30px; width: 100%">
          <div style="display: flex;  align-items: flex-end">
            <div style="flex-grow: 1; height: 40px">
              <v-list-item-avatar style="max-width: 100%; max-height: 100%">
                <v-img v-if="bv.user.anh_dai_dien" :src="endPointImage + bv.user.anh_dai_dien"></v-img>
                <v-img v-else src="../../assets/avatar.jpg"></v-img>
              </v-list-item-avatar>
            </div>
            <div style="flex-grow: 50;">
              <strong style="font-size: 18px">{{bv.user.name}}</strong>
              {{bv.created_at}}
            </div>
          </div>
          <br />
          <v-layout>
            <router-link :to="'/baiviet/'+ bv.id">
              <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px">{{bv.tieu_de}}</div>
            </router-link>
            <v-spacer />
          </v-layout>
          <div style="margin-bottom: 15px" v-html="parseText(bv.noi_dung)"></div>
        </div>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import md from "marked";

export default {
  data() {
    return {
      users: [],
      baiViets: [],
      sanPhams: [],
      search: "",
      endPointImage: ""
    };
  },
  watch: {
    search(val) {
      this.users = [];
      this.baiViets = [];
      this.sanPhams = [];
      this.getData(val);
    }
  },
  created() {
    this.search = this.$route.params.key;
    this.endPointImage = ImageUrl + "/";
    this.getData(this.search);
  },
  methods: {
    async getData(key) {
      let data = await axios.get("/timkiem?search=" + key);
      this.users = data.data.user;
      this.sanPhams = data.data.san_pham;
      this.baiViets = data.data.bai_viet;
      console.log(this.baiViets);
    },
    xemSanPham(id) {
      this.$router.push("/sanpham/" + id);
    },
    parseText(text) {
      if (text) {
        return md.parse(text);
      } else return null;
    }
  }
};
</script>

<style>
</style>