<template>
  <v-container>
    <v-snackbar top color="success" v-model="snackbar">{{thanhCong}}</v-snackbar>
    <!-- <div>Chủ đề: {{baiViet.chu_de.ten}}</div> -->
    <v-btn
      large
      color="deep-purple darken-4"
      style="color: white"
      class="mb-6 mt-4"
    >Chủ đề: {{baiViet.chu_de.ten}}</v-btn>
    <v-card>
      <v-card-title>
        <div style="font-size: 24px">{{baiViet.tieu_de}}</div>
        <v-spacer />
        <v-btn class="mx-2" fab dark small color="cyan" v-if="own" @click="edit">
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-if="own" class="mx-2" fab dark small color="pink" @click="xoaBaiViet">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-list-item>
        <v-list-item>
          <div>
            <v-list-item-avatar>
              <v-img v-if="baiViet.user.anh_dai_dien" :src="baiViet.user.anh_dai_dien"></v-img>
              <v-img v-else src="../../assets/avatar.jpg"></v-img>
            </v-list-item-avatar>
          </div>
          <v-list-item-content>
            <v-list-item-title v-text="baiViet.user.name"></v-list-item-title>
            <v-list-item-title v-text="baiViet.created_at"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item>
      <img :src="baiViet.anh_dai_dien" style="width: 100%; border-radius: 20px" />
      <v-card-text v-html="baiViet.noi_dung" class="pb-12 pb-8"></v-card-text>
      <v-layout>
        <v-btn class="mb-5 ml-5" fab dark small color="indigo">
          <v-icon dark>mdi-heart</v-icon>
        </v-btn>
        <span class="ml-3" style="font-size: 20px">12 người khác</span>
      </v-layout>
    </v-card>
    <v-card class="mt-8">
      <v-row>
        <v-col cols="1">
          <v-list-item-avatar class="ml-8">
            <v-img v-if="baiViet.user.anh_dai_dien" :src="baiViet.user.anh_dai_dien"></v-img>
            <v-img v-else src="../../assets/avatar.jpg"></v-img>
          </v-list-item-avatar>
        </v-col>
        <v-col cols="10">
          <form ref="form">
            <v-textarea
              outlined
              label="Viết bình luận đi bạn ơi !"
              style="border-radius: 20px"
              v-model="form.noi_dung"
            ></v-textarea>
            <v-btn :disabled="dangBL" color="indigo" style="color: white" @click="vietBinhLuan">
              <v-icon left>mdi-pen</v-icon>Đăng
            </v-btn>
          </form>
        </v-col>
      </v-row>
      <v-btn dark class="mb-5 ml-10">
        <v-icon left>mdi-message</v-icon>20 bình luận
      </v-btn>
    </v-card>

    <v-card class="mt-1">
      <v-row v-for="binhluan in binhLuans" :key="binhluan.id">
        <v-col cols="1">
          <v-list-item-avatar class="ml-8">
            <v-img v-if="binhluan.user.anh_dai_dien" :src="binhluan.user.anh_dai_dien"></v-img>
            <v-img v-else src="../../assets/avatar.jpg"></v-img>
          </v-list-item-avatar>
        </v-col>
        <v-col cols="10">
          <div
            style="width: 100%; border-radius: 25px; min-height: 100px; background-color: #80808036"
          >
            <v-layout class="ml-3">
              <span
                class="mt-2"
                style="color: #1F618D; font-size: 18px; font-weight: bold"
              >{{binhluan.user.name}}</span>
              <span class="ml-6 mt-2">{{binhluan.created_at}}</span>
              <v-spacer />
              <v-btn
                class="mb-5 mt-2 mr-6"
                fab
                dark
                x-small
                color="pink"
                v-if="binhLuanCuaToi(binhluan.user_id)"
                @click="xoaBinhLuan(binhluan.id)"
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </v-layout>
            <v-card-text>{{binhluan.noi_dung}}</v-card-text>
          </div>
          <v-btn class="mb-5 mt-2" fab dark x-small color="pink">
            <v-icon dark>mdi-heart</v-icon>
          </v-btn>
          <!-- <v-btn class="mb-5 ml-5" fab dark small color="indigo">
          <v-icon dark>mdi-heart</v-icon>
          </v-btn>-->
          <span class="ml-3" style="font-size: 20px">12 người khác</span>
        </v-col>
      </v-row>

      <!-- <v-btn class="mb-5 ml-12" fab dark small color="indigo">
        <v-icon dark>mdi-heart</v-icon>
      </v-btn>-->
    </v-card>
  </v-container>
</template>
<script>
import md from "marked";
export default {
  data: () => ({
    baiViet: {
      chu_de: {
        ten: ""
      },
      user: {
        name: ""
      }
    },
    thanhCong: "",
    form: {
      noi_dung: "",
      bai_viet_id: null
    },
    dangBL: true,
    binhLuans: [],
    own: false,
    snackbar: false,
  }),
  watch: {
    "form.noi_dung": function() {
      if (this.form.noi_dung.length >= 5) {
        this.dangBL = false;
      } else {
        this.dangBL = true;
      }
    }
  },
  methods: {
    async getData() {
      let data = await axios.get("/baiviet/" + this.$route.params.id);
      this.baiViet = data.data;
      this.baiViet.noi_dung = md.parse(this.baiViet.noi_dung);
      this.own = User.own(this.baiViet.user_id);
    },
    binhLuanCuaToi(id) {
      return User.own(id);
    },
    async getBinhLuan() {
      let data = await axios.get("/binhluan/" + this.$route.params.id);
      this.binhLuans = data.data;
    },
    async vietBinhLuan() {
      try {
        this.form.bai_viet_id = this.$route.params.id;
        await axios.post("/binhluan", this.form);
        this.thanhCong = "Đã đăng bình luận";
        this.snackbar = true;
        this.form = {
          noi_dung: "",
          bai_viet_id: this.$route.params.id
        };
        this.getBinhLuan();
      } catch (error) {
        console.log(error);
      }
    },
    async xoaBaiViet() {
      if (this.form.noi_dung.length > 5) {
        try {
          await axios.delete("/baiviet/" + this.$route.params.id);
          this.thanhCong = "Xóa bài viết thành công";
          this.snackbar = true;
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        } catch (error) {}
      }
    },
    edit() {
      this.$router.push(`/suabaiviet/${this.$route.params.id}`);
    },
    async xoaBinhLuan($id){
      try {
        let data = await axios.delete('/binhluan/' + $id);
        this.thanhCong = "Xóa bình luận thành công"
        this.snackbar = true
        this.getBinhLuan()
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.getData();
    this.getBinhLuan();
  }
};
</script>