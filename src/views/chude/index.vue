<template>
  <v-container>
    <v-row justify="space-around">
      <v-img
        v-if="chuDe.anh_dai_dien"
        :src="chuDe.anh_dai_dien"
        aspect-ratio="1.7"
        style="max-height: 400px"
      ></v-img>
      <v-img v-else src="../../assets/bgchude.jpg" aspect-ratio="1.7" style="max-height: 400px"></v-img>
    </v-row>
    <v-card>
      <v-card-title>Chủ đề: {{chuDe.ten}}</v-card-title>
      <v-card-subtitle>
        <div>Tạo bởi: {{chuDe.user.name}}</div>
        <div>Mô tả:</div>
        <div>{{chuDe.mo_ta}}</div>
        <div>Hiện có: {{chuDe.so_bai_viet}} Bài viết, {{chuDe.so_cau_hoi}} Câu hỏi</div>
      </v-card-subtitle>
    </v-card>
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
            <router-link :to="'/baiviet/'+ hoi.id">
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
            <router-link :to="'/baiviet/'+ bv.id">
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
  </v-container>
</template>
<script>
import md from "marked";

export default {
  data() {
    return {
      chuDe: {
        user: { name: "" }
      },
      baiViet: [],
      hoiDap: []
    };
  },
  created() {
    this.getChuDe();
    this.getBaiViet();
    this.getCauHoi();
  },
  methods: {
    async getChuDe() {
      let data = await axios.get("/chude/" + this.$route.params.id);
      this.chuDe = data.data;
    },
    async getBaiViet() {
      try {
        let data = await axios.get(`baivietchude/${this.$route.params.id}`);
        this.baiViet = data.data.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCauHoi() {
      try {
        let data = await axios.get(`cauhoichude/${this.$route.params.id}`);
        this.hoiDap = data.data.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    parseText(text) {
      if (text) {
        return md.parse(text);
      } else return null;
    }
  }
};
</script>
<style scoped>
</style>