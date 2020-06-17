<template>
  <v-app>
    <v-snackbar top color="cyan darken-2" v-model="snackbar">
      <div class="mr-2">{{noidung}}</div>
      <strong>Từ: {{userBinhLuan}}</strong>
    </v-snackbar>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <img
        src="data:image/png;base64,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"
        height="55px"
      />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <router-link to="/">
          <span class="hidden-sm-and-down" style="color:white">Diễn đàn</span>
        </router-link>
      </v-toolbar-title>
      <v-text-field
        v-model="timkiem"
        v-on:keyup.enter="timKiem()"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Tìm kiếm"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-title style="width: 150px" class="ml-0 pl-1">
        <v-btn color="#F57F17" @click="chuyenTrang">
          <v-icon left dark>mdi-shopping</v-icon>
          {{tenButton}}
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
          <v-list-item
            v-for="(item) in thongBaoChuaDoc"
            :key="item.id"
            @click="docThongBao(item)"
            style="background-color: #D5F5E3"
          >
            <v-list-item-avatar>
              <v-img
                v-if="item.user_tuong_tac.anh_dai_dien"
                :src="endPoint + item.user_tuong_tac.anh_dai_dien"
              ></v-img>
              <v-img v-else src="./assets/avatar.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <strong>{{item.user_tuong_tac.name}}</strong>
                <span class="pl-2">{{item.noi_dung}}</span>
              </v-list-item-title>
              <v-list-item-subtitle class="mt-1">{{item.created_at}}</v-list-item-subtitle>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="(item) in thongBaoDaDoc" :key="item.id" @click="thongBaoCu(item)">
            <v-list-item-avatar>
              <v-img
                v-if="item.user_tuong_tac.anh_dai_dien"
                :src="endPoint + item.user_tuong_tac.anh_dai_dien"
              ></v-img>
              <v-img v-else src="./assets/avatar.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <strong>{{item.user_tuong_tac.name}}</strong>
                <span class="pl-2">{{item.noi_dung}}</span>
              </v-list-item-title>
              <v-list-item-subtitle class="mt-1">{{item.created_at}}</v-list-item-subtitle>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu bottom origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon large v-if="loggedIn" v-on="on">
            <v-avatar size="40px" item v-if="user.anh_dai_dien">
              <v-img :src="endPoint+ user.anh_dai_dien" alt="Vuetify"></v-img>
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
    timkiem: "",
    loggedIn: false,
    name: "",
    anh_dai_dien: null,
    user: {},
    tenButton: "Mua sắm",
    thongBaoDaDoc: [],
    thongBaoChuaDoc: [],
    thongBaoMoi: 0,
    snackbar: false,
    userBinhLuan: "",
    noidung: "",
    endPoint: ""
  }),
  methods: {
    timKiem() {
      this.timkiem = this.timkiem.trim();
      if (this.timkiem && this.timkiem != "") {
        if (this.$route.fullPath.indexOf("timkiem") == -1) {
          this.$router.push("/timkiem/" + this.timkiem);
        } else {
          window.location.reload();
        }
      }
    },
    trangCaNhan() {
      this.$router.push("/trangcanhan");
    },
    async me() {
      try {
        let data = await axios.post("/auth/me");
        this.user = data.data;
      } catch (error) {
        Exception.hanle(error);
      }
    },
    logout() {
      User.logout();
    },
    async getThongBao() {
      try {
        let data = await axios.get("/thongbao");
        this.thongBaoDaDoc = data.data.daDoc;
        this.thongBaoChuaDoc = data.data.chuaDoc;
        this.thongBaoMoi = this.thongBaoChuaDoc.length;
      } catch (error) {
        Exception.hanle(error);
      }
    },
    thongBaoCu(data) {
      if (data.type == "bai_viet") {
        this.$router.push("/baiviet/" + data.reference_id);
      }
      if (data.type == "san_pham") {
        this.$router.push("/sanpham/" + data.reference_id);
      }
      if (data.type == "tin_nhan") {
        this.$router.push("/tinnhan/" + data.reference_id);
      }
    },
    async docThongBao(data) {
      try {
        await axios.post("/docthongbao", { thong_bao_id: data.id });
        if (data.type == "bai_viet") {
          this.$router.push("/baiviet/" + data.reference_id);
        }
        if (data.type == "san_pham") {
          this.$router.push("/sanpham/" + data.reference_id);
        }
        if (data.type == "tin_nhan") {
          this.$router.push("/tinnhan/" + data.reference_id);
        }
        this.getThongBao();
      } catch (error) {
        console.log(error);
      }
    },
    chuyenTrang() {
      if (this.tenButton == "Mua sắm") {
        this.$router.push("/muasam");
        this.tenButton = "Diễn đàn";
        return;
      }
      if (this.tenButton == "Diễn đàn") {
        this.$router.push("/");
        this.tenButton = "Mua sắm";
        return;
      }
    },
    listening() {
      Echo.channel("Notification").listen("NotifyEvent", e => {
        if (e.id == User.id()) {
          this.noidung = "Bạn có thông báo mới";
          this.userBinhLuan = e.user;
          this.snackbar = true;
          this.getThongBao();
        }
      });
    }
  },
  created() {
    this.loggedIn = User.loggedIn();
    this.name = User.name();
    this.getThongBao();
    if (User.loggedIn()) {
      this.me();
    }
    this.listening();
    this.endPoint = ImageUrl + "/";
  }
};
</script>
