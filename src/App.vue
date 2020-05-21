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
        <v-btn color="red">Đăng ký</v-btn></router-link>
      </v-toolbar-title>
      <router-link to="/login">
      <v-btn v-if="!loggedIn" color="green">Đăng nhập</v-btn></router-link>
      <v-btn icon v-if="loggedIn">
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-menu bottom origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon large v-if="loggedIn" v-on="on">
            <v-avatar size="40px" item>
              <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="trangCaNhan">
            <v-list-item-title><v-icon>mdi-account</v-icon> Trang cá nhân</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title><v-icon>mdi-backup-restore</v-icon> Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-if="loggedIn" class="ma-2" tile outlined color="white" height="30px">{{name}}</v-btn>
    </v-app-bar>
    <v-content style="background: #80808030">
      <router-view />
      <img src="../src/assets/footer.png" style="width: 100%; margin-top: 150px">
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
    name: ""
  }),
  methods: {
    trangCaNhan(){

    },
    logout(){
      User.logout()
    }
  },
  created() {
    this.loggedIn = User.loggedIn();
    this.name = User.name();
  }
};
</script>
