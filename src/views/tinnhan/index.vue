<template>
  <v-container>
    <v-row no-gutters>
      <v-col :cols="3">
        <v-card class="mx-auto" height="600">
          <v-list three-line height="100%" style="overflow-y: auto">
            <v-list-item v-for="(us, index) in users" :key="us.title" @click="chonNguoiDung(us)">
              <v-list-item-avatar>
                <v-img v-if="us.anh_dai_dien" :src="endPointImage + us.anh_dai_dien"></v-img>
                <v-img v-else src="../../assets/avatar.jpg"></v-img>
              </v-list-item-avatar>
              <v-list-item-content style="border-bottom: 1px solid #b9b0b05e">
                <v-list-item-title v-html="us.name"></v-list-item-title>
                <v-list-item-subtitle>{{us.email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col :cols="9">
        <div style="width: 100%; height: 100%">
          <div
            style="width: 100%; height: 80px; background: #85C1E9; display: flex; align-items: center"
            class="pl-5"
          >
            <v-avatar>
              <v-img v-if="userNhan.anh_dai_dien" :src="endPointImage + userNhan.anh_dai_dien"></v-img>
              <v-img v-else src="../../assets/avatar.jpg"></v-img>
            </v-avatar>
            <h2 class="ml-5">{{userNhan.name}}</h2>
          </div>
          <div
            style="width: 100%; height: 460px; background: white; overflow-y: auto;"
            class="pa-3"
          >
            <div v-for="item in tinNhan" :key="item.id">
              <div
                style="width: 100%; word-wrap: break-word; float: left"
                class="mt-3"
                v-if="!tinToiGui(item.user_gui_id)"
              >
                <div style="float: left; height: 35px;width: 35px;">
                  <!-- <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                    style="width: 100%; border-radius: 50%"
                  />-->

                  <v-img
                    v-if="userNhan.anh_dai_dien"
                    :src="endPointImage + userNhan.anh_dai_dien"
                    style="width:100%; border-radius: 50%"
                  ></v-img>
                  <v-img
                    v-else
                    src="../../assets/avatar.jpg"
                    style="width: 100%; border-radius: 50%"
                  ></v-img>
                </div>
                <div
                  style="max-width: 75%; border-radius: 8px; background-color: #F9E79F; word-wrap: break-word; float: left; color: black"
                  class="pa-2 ml-2"
                >{{item.noi_dung}}</div>
              </div>
              <div style="width: 100%; word-wrap: break-word; float: right" class="mt-3" v-else>
                <div
                  style="max-width: 75%; border-radius: 10px; background-color: #21618C; word-wrap: break-word; float: right; color: white"
                  class="pa-2 ml-2"
                >{{item.noi_dung}}</div>
              </div>
            </div>
          </div>
          <v-layout style="width: 100%; height: 60px; background: #21618C" class="pl-3 pr-3 pt-1">
            <v-textarea
              v-on:keyup.enter="guiTinNhan"
              v-model="form.noi_dung"
              solo
              rows="1"
              no-resize
              label="message"
            ></v-textarea>
            <v-btn :disabled="sendDisable" fab small class="mt-1 ml-2" @click="guiTinNhan()">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-layout>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    users: [],
    endPointImage: "",
    items: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ],
    userNhan: {
      anh_dai_dien: null,
      name: ""
    },
    sendDisable: true,
    form: {
      noi_dung: "",
      user_nhan_id: null
    },
    tinNhan: []
  }),
  created() {
    this.getUser();
    this.endPointImage = ImageUrl + "/";
    this.getTinNhan();
    this.getUserInfo();
    this.listening();
    this.me();
  },
  watch: {
    "form.noi_dung": function(val) {
      if (val.length > 0) {
        this.sendDisable = false;
      } else {
        this.sendDisable = true;
      }
    }
  },
  methods: {
    chonNguoiDung(data) {
      this.tinNhan = [];
      this.$router.push("/tinnhan/" + data.id);
      this.userNhan = data;
      this.getTinNhan();
      this.listening();
    },
    async me() {
      try {
        let data = await axios.get("/userinfo");
        if (data.data && data.data.id == this.$route.params.id) {
          this.$router.push("/");
        }
      } catch (error) {
        console.log("chuadangnhap");
      }
    },
    async getUser() {
      try {
        let data = await axios.get("alluser");
        this.users = data.data;
      } catch (error) {
        console.log("getalluser", error);
      }
    },
    async getTinNhan() {
      try {
        let data = await axios.get("gettinnhan/" + this.$route.params.id);
        this.tinNhan = data.data;
      } catch (error) {
        console.log("getTinNhan", error);
      }
    },
    tinToiGui(id) {
      return User.own(id);
    },
    async guiTinNhan() {
      try {
        this.form.user_nhan_id = this.$route.params.id;
        await axios.post("guitin", this.form);
        this.form = {
          noi_dung: "",
          user_nhan_id: null
        };
        this.getTinNhan();
      } catch (error) {
        console.log("guiTin", error);
      }
    },
    async getUserInfo() {
      try {
        let data = await axios.get("userinfo/" + this.$route.params.id);
        this.userNhan.anh_dai_dien = data.data.anh_dai_dien;
        this.userNhan.name = data.data.name;
      } catch (error) {
        console.log("getUserInfo", error);
      }
    },
    listening() {
      Echo.channel("tinnhan").listen("TinNhanEvent", e => {
        if (
          e.user_nhan_id == User.id() &&
          e.user_gui_id == this.$route.params.id
        ) {
          this.getTinNhan();
        }
      });
    }
  }
};
</script>
