<template>
  <v-container>
    <div>Chủ đề: {{baiViet.chu_de.ten}}</div>
    <v-card>
      <v-card-title>
        <div>{{baiViet.tieu_de}}</div>
      </v-card-title>
      <v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-img v-if="baiViet.user.anh_dai_dien" :src="baiViet.user.anh_dai_dien"></v-img>
            <v-img v-else src="../../assets/avatar.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="baiViet.user.name"></v-list-item-title>
            <v-list-item-title v-text="baiViet.created_at"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item>
      <img :src="baiViet.anh_dai_dien" style="width: 100%; border-radius: 20px" />
      <v-card-text>
        <div>{{baiViet.noi_dung}}</div>
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
      <v-btn dark class="mb-5 ml-5">20 bình luận</v-btn>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    baiViet: {
      chu_de: {
        ten: ""
      },
      user: {
        name: ""
      }
    }
  }),
  methods: {
    async getData() {
      let data = await axios.get("/baiviet/" + this.$route.params.id);
      this.baiViet = data.data;
      console.log(this.baiViet);
    }
  },
  created() {
    this.getData();
  }
};
</script>