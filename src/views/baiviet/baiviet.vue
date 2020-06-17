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
        <v-btn
          v-if="own || quyen_id == 2"
          class="mx-2"
          fab
          dark
          small
          color="pink"
          @click="xoaBaiViet"
        >
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-list-item>
        <v-list-item>
          <div>
            <router-link :to="'/canhan/' +baiViet.user.id ">
              <v-list-item-avatar>
                <v-img v-if="baiViet.user.anh_dai_dien" :src="endPoint + baiViet.user.anh_dai_dien"></v-img>
                <v-img v-else src="../../assets/avatar.jpg"></v-img>
              </v-list-item-avatar>
            </router-link>
          </div>
          <v-list-item-content>
            <v-list-item-title v-text="baiViet.user.name"></v-list-item-title>
            <v-list-item-title v-text="baiViet.created_at"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item>
      <img v-if="baiViet.anh_dai_dien" :src="endPoint + baiViet.anh_dai_dien" style="width: 100%; border-radius: 20px" />
      <v-card-text v-html="baiViet.noi_dung" class="pb-12 pb-8"></v-card-text>
      <v-layout style="align-items: baseline">
        <v-btn
          v-if="!baiViet.liked"
          class="mb-5 ml-5"
          fab
          dark
          small
          color="indigo"
          @click="likeBaiViet(baiViet.id)"
        >
          <v-icon dark>mdi-heart</v-icon>
        </v-btn>
        <v-btn
          v-else
          class="mb-5 ml-5"
          fab
          dark
          small
          color="pink"
          @click="unLikeBaiViet(baiViet.id)"
        >
          <v-icon dark>mdi-heart</v-icon>
        </v-btn>
        <span class="ml-3" style="font-size: 20px">{{baiViet.like_count}}</span>
      </v-layout>

      <v-btn dark class="mb-3 ml-3">
        <v-icon left>mdi-message</v-icon>
        {{binhLuans.length}} bình luận
      </v-btn>
    </v-card>
    <v-card class="mt-2" v-if="loggedIn" style="border-radius: 20px">
      <v-row>
        <v-col cols="1">
          <router-link to="/trangcanhan">
            <v-list-item-avatar class="ml-8">
              <v-img v-if="user.anh_dai_dien" :src="endPoint + user.anh_dai_dien"></v-img>
              <v-img v-else src="../../assets/avatar.jpg"></v-img>
            </v-list-item-avatar>
          </router-link>
        </v-col>
        <v-col cols="10">
          <form ref="form" class="mt-3">
            <v-textarea
              rows="3"
              outlined
              label="Viết bình luận đi bạn ơi !"
              style="border-radius: 20px"
              v-model="form.noi_dung"
            ></v-textarea>
            <v-layout justify-end>
              <v-btn :disabled="dangBL" color="indigo" style="color: white" @click="vietBinhLuan">
                <v-icon left>mdi-pen</v-icon>Đăng
              </v-btn>
            </v-layout>
          </form>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-1" style="border-radius: 15px">
      <v-row v-for="binhluan in binhLuans" :key="binhluan.id">
        <v-col cols="1">
          <router-link
            :to="binhLuanCuaToi(binhluan.user.id)?'/trangcanhan': '/canhan/' + binhluan.user.id"
          >
            <v-list-item-avatar class="ml-8">
              <v-img v-if="binhluan.user.anh_dai_dien" :src="endPoint + binhluan.user.anh_dai_dien"></v-img>
              <v-img v-else src="../../assets/avatar.jpg"></v-img>
            </v-list-item-avatar>
          </router-link>
        </v-col>
        <v-col cols="10">
          <div
            style="width: 100%; border-radius: 25px; min-height: 100px; background-color: #80808036"
          >
            <v-layout class="ml-3">
              <router-link
                :to="binhLuanCuaToi(binhluan.user.id)?'/trangcanhan': '/canhan/' + binhluan.user.id"
              >
                <span
                  class="mt-2"
                  style="color: #1F618D; font-size: 18px; font-weight: bold"
                >{{binhluan.user.name}}</span>
              </router-link>
              <span class="ml-6 mt-2">{{binhluan.created_at}}</span>
              <v-spacer />
              <v-btn
                class="mb-5 mt-2 mr-6"
                fab
                dark
                x-small
                color="pink"
                v-if="binhLuanCuaToi(binhluan.user_id) || quyen_id == 2"
                @click="xoaBinhLuan(binhluan.id)"
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </v-layout>
            <v-card-text>{{binhluan.noi_dung}}</v-card-text>
          </div>
          <v-btn
            v-if="binhluan.liked"
            class="mb-5 mt-2"
            fab
            dark
            x-small
            color="pink"
            @click="unLikeBinhLuan(binhluan.id)"
          >
            <v-icon dark>mdi-heart</v-icon>
          </v-btn>
          <v-btn
            v-else
            class="mb-5 mt-2"
            fab
            dark
            x-small
            color="indigo"
            @click="likeBinhLuan(binhluan.id)"
          >
            <v-icon dark>mdi-heart</v-icon>
          </v-btn>
          <span class="ml-3" style="font-size: 20px">{{binhluan.like_count}}</span>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import md from "marked";
export default {
  data: () => ({
    loggedIn: false,
    user: {
      name: "",
      anh_dai_dien: null
    },
    baiViet: {
      anh_dai_dien: null,
      chu_de: {
        ten: ""
      },
      user: {
        name: "",
        anh_dai_dien: null
      }
    },
    like: {
      type: "",
      reference_id: ""
    },
    endPoint: "",
    thanhCong: "",
    form: {
      noi_dung: "",
      bai_viet_id: null
    },
    quyen_id: null,
    dangBL: true,
    binhLuans: [],
    own: false,
    snackbar: false
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
      try {
        await axios.delete("/baiviet/" + this.$route.params.id);
        this.thanhCong = "Xóa bài viết thành công";
        this.snackbar = true;
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } catch (error) {}
    },
    edit() {
      this.$router.push(`/suabaiviet/${this.$route.params.id}`);
    },
    async xoaBinhLuan($id) {
      try {
        let data = await axios.delete("/binhluan/" + $id);
        this.thanhCong = "Xóa bình luận thành công";
        this.snackbar = true;
        this.getBinhLuan();
      } catch (error) {
        console.log(error);
      }
    },
    async likeBaiViet(id) {
      this.like.reference_id = id;
      this.like.type = "bai_viet";
      await axios.post("/like", this.like);
      this.like.reference_id = "";
      this.like.type = "";
      this.getData();
    },
    async unLikeBaiViet(id) {
      this.like.reference_id = id;
      this.like.type = "bai_viet";
      await axios.post("/unlike", this.like);
      this.like.reference_id = "";
      this.like.type = "";
      this.getData();
    },

    async likeBinhLuan(id) {
      this.like.reference_id = id;
      this.like.type = "binh_luan";
      await axios.post("/like", this.like);
      this.like.reference_id = "";
      this.like.type = "";
      this.getBinhLuan();
    },
    async unLikeBinhLuan(id) {
      this.like.reference_id = id;
      this.like.type = "binh_luan";
      await axios.post("/unlike", this.like);
      this.like.reference_id = "";
      this.like.type = "";
      this.getBinhLuan();
    },
    async me() {
      try {
        let data = await axios.post("/auth/me");
        this.user = data.data;
      } catch (error) {
        Exception.hanle(error);
      }
    },
    listening() {
      Echo.channel("likeChannel").listen("LikeEvent", e => {
        if (e.type == "bai_viet") {
          this.getData();
        }
        if (e.type == "binh_luan") {
          this.getBinhLuan();
        }
      });
    }
  },
  created() {
    this.loggedIn = User.loggedIn();
    if (this.loggedIn) {
      this.me();
    }
    this.quyen_id = User.quyenId();
    this.getData();
    this.getBinhLuan();
    this.listening();
    this.endPoint = ImageUrl + "/";
  }
};
</script>