<template>
  <v-row align="center" justify="center" style="padding-top: 100px" >
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Đăng nhập</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <label class="labelForm">E-Mail</label>
            <v-text-field prepend-inner-icon="mdi-account" class="mt-3" name="login" outlined type="E-Mail" v-model="form.email" placeholder="Nhập địa chỉ emal" :rules="emailRules"></v-text-field>
            <label class="labelForm">Mật khẩu</label>
            <v-text-field prepend-inner-icon="mdi-lock" class="mt-3" id="password" outlined name="Mật khẩu" v-model="form.password" type="password" placeholder="Nhập mật khẩu" :rules="passwordRules"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions style="padding-bottom: 30px">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login">Đăng nhập</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    form: {
      email: "",
      password: ""
    },
    passwordRules: [
      v => !!v || "Mật khẩu không thể bỏ trống",
      v => (v && v.length >= 6) || "Mật khẩu tối thiểu 6 ký tự"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail Không thể bỏ trống",
      v => /.+@.+\..+/.test(v) || "E-mail Không hợp lệ"
    ]
  }),

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
    login() {
      if (this.$refs.form.validate()) {
        User.login(this.form);
      } else {
        return console.log("Lỗi validate ", this.$refs.form);
      }
    },
  }
};
</script>

<style>
.labelForm {
  font-size: 16px;
  font-weight: 600;
}
</style>