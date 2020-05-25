<template>
  <v-container>
    <v-snackbar top color="success" v-model="snackbar">Xóa bài viết thành công</v-snackbar>
    <div>Chủ đề: {{baiViet.chu_de.ten}}</div>
    <v-card>
      <v-card-title>
        <div>{{baiViet.tieu_de}}</div>
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
      <v-card-text v-html="baiViet.noi_dung" class="pb-12 pb-8">
      </v-card-text>
    </v-card>
    <v-card class="mt-8">
      <v-row>
        <v-col cols="1">
          <v-list-item-avatar class="ml-8">
            <!-- <v-img v-if="baiViet.user.anh_dai_dien" :src="baiViet.user.anh_dai_dien"></v-img> -->
            <v-img src="../../assets/avatar.jpg"></v-img>
          </v-list-item-avatar>
        </v-col>
        <v-col cols="10">
          <v-textarea outlined label="Viết bình luận đi bạn ơi !" style="border-radius: 20px"></v-textarea>
        </v-col>
      </v-row>
      <v-btn class="mb-5 ml-5" fab dark small color="pink">
        <v-icon dark>mdi-heart</v-icon>
      </v-btn>
      <v-btn class="mb-5 ml-5" fab dark small color="indigo">
        <v-icon dark>mdi-heart</v-icon>
      </v-btn>
      <span class="ml-3" style="font-size: 20px">12 người khác</span>
      <v-btn dark class="mb-5 ml-5">
        <v-icon left>mdi-message</v-icon>20 bình luận
      </v-btn>
    </v-card>
  </v-container>
</template>
<script>
import md from 'marked';
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
    own: false,
    snackbar: false
  }),
  methods: {
    async getData() {
      let data = await axios.get("/baiviet/" + this.$route.params.id);
      this.baiViet = data.data;
      this.baiViet.noi_dung = md.parse(this.baiViet.noi_dung)
      this.own = User.own(this.baiViet.user_id)
    },
    async xoaBaiViet() {
      try {
        await axios.delete("/baiviet/" + this.$route.params.id);
        this.snackbar = true;
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } catch (error) {}
    },
    edit(){
      this.$router.push(`/suabaiviet/${this.$route.params.id}`)
    }
  },
  created() {
    this.getData();
  }
};
</script>