<template>
  <v-container>
    <v-card>
      <v-card-title>Viết bài</v-card-title>
      <v-card-text>
        <span>Tiêu đề</span>
        <v-text-field class="mt-3" v-model="form.tieu_de" placeholder="Nhập tiêu đề bài viết" solo></v-text-field>
        <span>Chủ đề</span>
        <div style="width: 50%; display: flex">
            <v-select v-model="form.chu_de_id" placeholder="Chọn chủ đề" style="width: 300px">
            </v-select>
            <v-radio-group style="width: 300px" class="ml-6" v-model="form.loai" row>
                <v-radio label="Bài viết" value="bai_viet"></v-radio>
                <v-radio label="Hỏi đáp" value="hoi_dap"></v-radio>
            </v-radio-group>
        </div>
        <v-layout class="mb-6">
            <v-btn small >  <v-icon left dark>mdi-image-area</v-icon> Upload Ảnh đại diện</v-btn>
            <div style="width: 100px; height: 100px; border: 1px solid grey; border-radius: 7px" class="ml-6"></div>
        </v-layout>
        <vue-simplemde v-model="form.noi_dung" />
      </v-card-text>
      <v-card-actions class="pa-4 pt-0">
          <v-btn><v-icon left>mdi-keyboard-backspace</v-icon>Trở về</v-btn>
          <v-spacer/>
          <v-btn><v-icon left>mdi-pencil</v-icon>Đăng bài</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
    data: () =>({
        form: {
            tieu_de: "",
            chu_de_id: null,
            loai: null,
            noi_dung: ""
        }
    })
};
</script>
<style scoped>
@import "~simplemde/dist/simplemde.min.css";
@import "~github-markdown-css";
</style>