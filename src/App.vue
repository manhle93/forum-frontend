<template>
  <v-app>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <router-link to="/">
          <span class="hidden-sm-and-down" style="color:white">Diễn đàn</span>
        </router-link>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Tìm kiếm"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-title style="width: 150px" class="ml-0 pl-1">
        <v-btn color="#F57F17">
          <v-icon left dark>mdi-shopping</v-icon>Mua sắm
        </v-btn>
      </v-toolbar-title>
      <v-toolbar-title style="width: 130px" class="ml-0 pl-1" v-if="!loggedIn">
        <router-link to="/dangky">
          <v-btn color="red">Đăng ký</v-btn>
        </router-link>
      </v-toolbar-title>
      <router-link to="/login">
        <v-btn v-if="!loggedIn" color="green">Đăng nhập</v-btn>
      </router-link>
      <v-menu offset-y transition="scale-transition" bottom origin="center center">
        <template v-slot:activator="{ on }">
          <v-btn icon v-if="loggedIn" v-on="on">
            <v-badge :content="thongBaoMoi" color="pink" overlap>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item) in thongBaoChuaDoc" :key="item.id" @click="docThongBao(item)">
            <v-list-item-avatar>
              <v-img
                v-if="item.data.nguoi_binh_luan.anh_dai_dien"
                :src="item.data.nguoi_binh_luan.anh_dai_dien"
              ></v-img>
              <v-img v-else src="./assets/avatar.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <strong>{{item.data.nguoi_binh_luan.name}}</strong> Đã bình luận về bài viết của bạn
              </v-list-item-title>
              <v-list-item-subtitle v-html="item.data.bai_viet"></v-list-item-subtitle>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="(item) in thongBaoDaDoc" :key="item.id">
            <router-link>
              <v-list-item-avatar>
                <v-img
                  v-if="item.data.nguoi_binh_luan.anh_dai_dien"
                  :src="item.data.nguoi_binh_luan.anh_dai_dien"
                ></v-img>
                <v-img v-else src="./assets/avatar.jpg"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <strong>{{item.data.nguoi_binh_luan.name}}</strong> Đã bình luận về bài viết của bạn
                </v-list-item-title>
                <v-list-item-subtitle v-html="item.data.bai_viet"></v-list-item-subtitle>
                <v-divider></v-divider>
              </v-list-item-content>
            </router-link>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu bottom origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon large v-if="loggedIn" v-on="on">
            <v-avatar size="40px" item v-if="user.anh_dai_dien">
              <v-img :src="user.anh_dai_dien" alt="Vuetify"></v-img>
            </v-avatar>
            <v-avatar size="40px" item v-else>
              <v-img src="./assets/avatar.jpg" alt="Vuetify"></v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="trangCaNhan">
            <v-list-item-title>
              <v-icon>mdi-account</v-icon>Trang cá nhân
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>
              <v-icon>mdi-backup-restore</v-icon>Đăng xuất
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-if="loggedIn" class="ma-2" tile outlined color="white" height="30px">{{name}}</v-btn>
    </v-app-bar>
    <v-content style="background: #80808030">
      <router-view />
      <img src="../src/assets/footer.png" style="width: 100%; margin-top: 150px" />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    loggedIn: false,
    name: "",
    anh_dai_dien: null,
    user: {},
    thongBaoDaDoc: [],
    thongBaoChuaDoc: [],
    thongBaoMoi: 0
  }),
  methods: {
    trangCaNhan() {},
    async me() {
      let data = await axios.post("/auth/me");
      this.user = data.data;
    },
    logout() {
      User.logout();
    },
    async getThongBao() {
      let data = await axios.get("/thongbao");
      this.thongBaoDaDoc = data.data.daDoc.data;
      this.thongBaoChuaDoc = data.data.chuaDoc;
      this.thongBaoMoi = this.thongBaoChuaDoc.length;
    },
    docThongBao(data){
      this.$router.push('/baiviet/'+ data.data.bai_viet_id)
    }
  },
  created() {
    this.loggedIn = User.loggedIn();
    this.name = User.name();
    this.getThongBao();
    if (User.loggedIn()) {
      this.me();
    }
  }
};
</script>
