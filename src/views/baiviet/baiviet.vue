<template>
  <v-container>
    <div>Chủ đề: {{baiViet.chu_de.ten}}</div>
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
      <img
        src="https://photo2.tinhte.vn/data/attachment-files/2020/05/5026090_cover_chrome.jpg"
        style="width: 100%; border-radius: 20px"
      />
      <v-card-text>
        <div>{{baiViet.noi_dung}}</div>
      </v-card-text>
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
      let data = await axios.get(url + "/baiviet/" + this.$route.params.id);
      this.baiViet = data.data;
      console.log(this.baiViet);
    }
  },
  created() {
    this.getData();
  }
};
</script>