<template>
  <div>
    <v-text-field color="success" v-if="load" loading disabled></v-text-field>
    <v-snackbar top color="success" v-model="snackbar">Đăng ký thành công</v-snackbar>
    <v-row align="center" justify="center" style="padding-top: 10px">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Đăng ký tài khoản</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <label class="labelForm">Họ tên</label>
              <v-text-field
                prepend-inner-icon="mdi-account"
                class="mt-3"
                name="name"
                outlined
                dense
                type="E-Mail"
                v-model="form.name"
                placeholder="Nhập họ và tên người dùng"
                :rules="nameRules"
              ></v-text-field>
              <label class="labelForm">E-Mail</label>
              <v-text-field
                prepend-inner-icon="mdi-email"
                class="mt-3"
                name="login"
                outlined
                dense
                type="E-Mail"
                v-model="form.email"
                placeholder="Nhập địa chỉ emal"
                :rules="emailRules"
              ></v-text-field>
              <label class="labelForm">Mật khẩu</label>
              <v-text-field
                prepend-inner-icon="mdi-lock"
                ref="password"
                class="mt-3"
                id="password"
                outlined
                dense
                name="Mật khẩu"
                v-model="form.password"
                type="password"
                placeholder="Nhập mật khẩu"
                :rules="passwordRules"
              ></v-text-field>
              <label class="labelForm">Xác nhận mật khẩu</label>
              <v-text-field
                prepend-inner-icon="mdi-lock"
                class="mt-3"
                id="password"
                outlined
                dense
                name="Mật khẩu"
                v-model="form.passwordConfirm"
                type="password"
                placeholder="Nhập lại mật khẩu"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions style="padding-bottom: 30px; text-align:center">
            <v-btn color="primary" style="width: 100%; border-radius: 50px;" @click="dangKy">Đăng ký</v-btn>
          </v-card-actions>
          <div style="text-align: center; padding-bottom: 20px">
            <div style="font-size: 16px; padding-bottom: 10px">Bạn đã có tài khoản ?</div>
            <router-link to="/login">
              <div style="font-size: 18px; font-weight: bold">Đăng nhập</div>
            </router-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    form: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""
    },
    load: false,
    snackbar: false,
    passwordRules: [
      v => !!v || "Mật khẩu không thể bỏ trống",
      v => (v && v.length >= 6) || "Mật khẩu tối thiểu 6 ký tự"
    ],
    nameRules: [
      v => !!v || "Tên không thể bỏ trống",
      v => (v && v.length >= 2) || "Tên tối thiểu 2 ký tự"
    ],
    emailRules: [
      v => !!v || "E-mail Không thể bỏ trống",
      v => /.+@.+\..+/.test(v) || "E-mail Không hợp lệ"
    ]
  }),
  created() {
    if (User.loggedIn()) {
      this.$router.push("/");
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async dangKy() {
      if (this.$refs.form.validate()) {
        try {
          this.load = true;
          let data = await axios.post(url + "/auth/dangky", this.form);
          this.load = false;
          this.snackbar = true;
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        } catch (error) {
          this.load = false;
          console.log(error);
        }
      } else {
        return console.log("Lỗi validate ", this.$refs.form);
      }
    }
  }
};
</script>

<style>
.labelForm {
  font-size: 16px;
  font-weight: 600;
}
</style>