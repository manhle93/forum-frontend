<template>
  <v-container>
    <v-snackbar top color="success" v-model="snackbar">{{thanhCong}}</v-snackbar>
    <v-row justify="space-around">
      <v-img
        v-if="chuDe.anh_dai_dien"
        :src="endPointImage + chuDe.anh_dai_dien"
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
              :src="endPointImage + hoi.anh_dai_dien"
              style="width: 250px; max-height: 170px"
            />

            <img v-else src="../../assets/baiviet.png" style="width: 250px; max-height: 200px" />
          </div>
          <div style="height: auto; padding-left: 30px">
            <v-layout>
              <router-link :to="'/baiviet/'+ hoi.id">
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
            <div style="margin-bottom: 15px">{{hoi.noi_dung}}</div>
            <div style="display: flex;  align-items: flex-end">
              <div style="flex-grow: 1; height: 40px">
                <v-list-item-avatar v-if="hoi.user" style="max-width: 100%; max-height: 100%">
                  <v-img v-if="hoi.user.anh_dai_dien" :src="endPointImage + hoi.user.anh_dai_dien"></v-img>
                  <v-img v-else src="../../assets/avatar.jpg"></v-img>
                </v-list-item-avatar>
              </div>
              <div style="flex-grow: 50;" v-if="hoi.user">{{hoi.user.name}} {{hoi.created_at}}</div>
            </div>
          </div>
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
              :src="endPointImage + bv.anh_dai_dien"
              style="width: 250px; max-height: 170px"
            />

            <img v-else src="../../assets/baiviet.png" style="width: 250px; max-height: 200px" />
          </div>
          <div style="height: auto; padding-left: 30px; width: 100%">
            <v-layout>
              <router-link :to="'/baiviet/'+ bv.id">
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
      </v-card>
    </v-container>
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
      hoiDap: [],
      endPointImage: "",
      quyen_id: null,
      xoa: false,
      bai_viet_id: null,
      tieuDeXoa: "",
      noiDungXoa: "",
      thanhCong: "",
      snackbar: false
    };
  },
  created() {
    this.quyen_id = User.quyenId();
    this.getChuDe();
    this.getBaiViet();
    this.getCauHoi();
    this.endPointImage = ImageUrl + "/";
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
    },
    cuaToi(id) {
      return User.own(id);
    },
    editBaiViet(id) {
      this.$router.push("/suabaiviet/" + id);
    },
    async xoaNoiDung(data) {
      try {
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
    confirmXoaBaiViet(id) {
      this.bai_viet_id = id;
      this.xoa = true;
      this.noidungxoa = "bai_viet";
      this.tieuDeXoa = "Xóa bài viết";
      this.noiDungXoa = "Bạn có chắc chắn muốn xóa bài viết này ?";
    }
  }
};
</script>
<style scoped>
</style>