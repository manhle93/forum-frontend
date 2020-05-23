<template>
  <div>
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3" style="color: white">Slide</div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <br />
    <div style="text-align: center; font-size: 30px; color: #2980B9; font-weight: bold">Chủ đề</div>
    <br />
    <v-container>
      <v-card
        style="border-radius: 20px; padding: 40px; background-color: #154360"
        min-height="600px"
      >
        <v-row>
          <v-col v-for="chuDe in dataChuDe" :key="chuDe.id" xl="2" lg="3" md="4" sm="6">
            <v-card class="mx-auto" max-width="250" style="border-radius: 15px;">
              <v-img
                class="white--text align-end"
                height="150px"
                v-if="chuDe.anh_dai_dien"
                :src="chuDe.anh_dai_dien"
              >
                <v-card-title>{{chuDe.ten}}</v-card-title>
              </v-img>
              <v-img
                class="white--text align-end"
                height="150px"
                v-else
                src="../../assets/chuDe.jpg"
              >
                <v-card-title>{{chuDe.ten}}</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0">{{chuDe.so_bai_viet}} Bài viết</v-card-subtitle>
              <v-btn color="orange" text>Xem</v-btn>
            </v-card>
          </v-col>
        </v-row>
        <div
          class="text-center"
          style="position: absolute; bottom: 20px; width: 100%; align-content: center"
        >
          <v-pagination v-model="pageChuDe" :length="totalPageChuDe" circle @input="PaginateChuDe"></v-pagination>
        </div>
      </v-card>
    </v-container>
    <v-container>
      <v-card style="border-radius: 20px">
        <v-card-title style="background-color: #1F618D; color: white">
          Viết bài mới
          <v-btn class="ml-3">
            <v-icon left dark>mdi-image-area</v-icon>Hình ảnh
          </v-btn>
        </v-card-title>
        <v-card-text class="pt-3">
          <v-text-field v-model="form.tieu_de" label="Tiêu đề" single-line></v-text-field>
          <v-textarea v-model="form.noi_dung" solo flat no-resize label="Nội dung"></v-textarea>
        </v-card-text>
        <v-card-text></v-card-text>
        <v-card-actions>
          <div>
            <v-layout class="pl-3">
              <v-select
                v-model="form.chu_de_id"
                dense
                :items="chuDes"
                label="Chọn chủ đề"
                item-text="ten"
                item-value="id"
                solo
              ></v-select>
              <v-radio-group v-model="form.loai" row dense class="ml-12 mt-2">
                <v-radio label="Bài viết" value="bai_viet"></v-radio>
                <v-radio label="Hỏi đáp" value="hoi_dap"></v-radio>
              </v-radio-group>
            </v-layout>
          </div>
          <v-spacer />
          <v-layout class="pb-3 pr-3">
            <v-spacer />
            <v-btn style="color: white" color="purple" class="mr-2">
              <v-icon left dark>mdi-pencil</v-icon>Viết bài dài
            </v-btn>
            <v-btn color="primary" @click="dangBai">
              <v-icon left dark>mdi-plus</v-icon>Đăng
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-container>
    <br />
    <br />
    <v-container>
      <div style="font-size: 20px; color: #2980B9; font-weight: bold">Câu hỏi cần bạn giúp</div>
      <br />
      <v-card style="border-radius: 20px; padding: 40px">
        <div style="display: flex;" v-for="hoi in hoiDap" :key="hoi.id">
          <div style=" height: 200px">
            <img
              src="https://cafebiz.cafebizcdn.vn/thumb_w/600/2019/10/7/photo-1-157041437488834633779-crop-1570415010946781773486.png"
              style="width: 250px; max-height: 200px"
            />
          </div>
          <div style="height: auto; padding-left: 30px">
            <router-link :to="'baiviet/'+ hoi.id">
              <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px">{{hoi.tieu_de}}</div>
            </router-link>
            <div style="margin-bottom: 15px">{{hoi.noi_dung}}</div>
            <div style="display: flex;  align-items: flex-end">
              <div style="flex-grow: 1; height: 40px">
                <v-list-item-avatar v-if="hoi.user" style="max-width: 100%; max-height: 100%">
                  <v-img v-if="hoi.user.anh_dai_dien" :src="hoi.user.anh_dai_dien"></v-img>
                  <v-img v-else src="../../assets/avatar.jpg"></v-img>
                </v-list-item-avatar>
              </div>
              <div style="flex-grow: 50;" v-if="hoi.user">{{hoi.user.name}} {{hoi.created_at}}</div>
            </div>
          </div>
        </div>
        <div style="text-align: center">
          <v-btn color="primary">Xem thêm</v-btn>
        </div>
      </v-card>
    </v-container>
    <v-container class="mt-6">
      <div style="font-size: 20px; color: #2980B9; font-weight: bold">Bài viết mới cập nhật</div>
      <br />
      <v-card style="border-radius: 20px; padding: 40px">
        <div style="display: flex;" v-for="bv in baiViet" :key="bv.id">
          <div style=" height: 200px">
            <img
              src="https://cafebiz.cafebizcdn.vn/thumb_w/600/2019/10/7/photo-1-157041437488834633779-crop-1570415010946781773486.png"
              style="width: 250px; max-height: 200px"
            />
          </div>
          <div style="height: auto; padding-left: 30px">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px">{{bv.tieu_de}}</div>
            <div style="margin-bottom: 15px">{{bv.noi_dung}}</div>
            <div style="display: flex;  align-items: flex-end">
              <div style="flex-grow: 1; height: 40px">
                <v-list-item-avatar v-if="bv.user" style="max-width: 100%; max-height: 100%">
                  <v-img v-if="bv.user.anh_dai_dien" :src="bv.user.anh_dai_dien"></v-img>
                  <v-img v-else src="../../assets/avatar.jpg"></v-img>
                </v-list-item-avatar>
              </div>
              <div style="flex-grow: 50;" v-if="bv.user">{{bv.user.name}} {{bv.created_at}}</div>
            </div>
          </div>
        </div>
        <div style="text-align: center">
          <v-btn color="primary">Xem thêm</v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageChuDe: 1,
      totalPageChuDe: 1,
      dataChuDe: [],
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      hoiDap: [],
      baiViet: [],
      form: {
        tieu_de: "",
        noi_dung: "",
        chu_de_id: null,
        loai: "bai_viet"
      },
      chuDes: []
    };
  },
  created() {
    this.getChuDe();
    this.getBaiViet();
    this.getChuDeBaiViet();
  },
  methods: {
    async PaginateChuDe() {
      try {
        let data = await axios.get(url + "/chude?page=" + this.pageChuDe);
        this.dataChuDe = data.data.data.data;
        this.pageChuDe = data.data.data.current_page;
        this.totalPageChuDe = data.data.data.last_page;
      } catch (error) {
        console.log(error);
      }
    },
    async getChuDe() {
      try {
        let data = await axios.get(url + "/chude");
        this.dataChuDe = data.data.data.data;
        this.pageChuDe = data.data.data.current_page;
        this.totalPageChuDe = data.data.data.last_page;
      } catch (error) {
        console.log(error);
      }
    },
    async getBaiViet() {
      let data = await axios.get(url + "/baiviettrangchu");
      this.hoiDap = data.data.hoiDap;
      this.baiViet = data.data.baiViet;
    },
    async getChuDeBaiViet() {
      try {
        let data = await axios.get(url + "/chude?Perpage=999");
        this.chuDes = data.data.data.data;
        console.log(this.chuDes);
      } catch (error) {
        console.log(error);
      }
    },
    async dangBai() {
      try {
        let data =  axios.get(url+ '/test')
      } catch (error) {
        console.log(222, error);
      }
    },
    resetBaiViet() {
      this.form = {
        tieu_de: "",
        noi_dung: "",
        chu_de_id: null,
        loai: "bai_viet"
      };
    }
  }
};
</script>