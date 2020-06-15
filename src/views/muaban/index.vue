<template>
  <v-container>
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="require('../../assets/' + item.src)"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row class="fill-height" align="center" justify="center">
          <!-- <div class="display-3" style="color: white">Sản phẩm hàng hóa</div> -->
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <br />
    <div style="text-align: center; font-size: 30px; color: #2980B9; font-weight: bold">Danh sách sản phẩm</div>
    <v-row>
      <v-col xl="2" lg="3" md="4" sm="6" v-for="sanpham in sanPhams" :key="sanpham.id">
        <v-card
          class="mx-auto"
          max-width="250"
          style="border-radius: 15px;"
          @click="xemSanPham(sanpham.id)"
        >
          <v-img
            class="white--text align-end"
            height="250px"
            v-if="sanpham.anh_dai_dien"
            :src="endPointImage + sanpham.anh_dai_dien"
          ></v-img>
          <v-img
            v-else
            class="white--text align-end"
            height="250px"
            src="https://salt.tikicdn.com/cache/280x280/ts/product/bc/23/09/76d09086ceaa3d0d9905fe56644e9e9e.jpg"
          ></v-img>
          <v-card-text class="pb-0">{{sanpham.ten_san_pham}}</v-card-text>
          <v-card-title class="pt-0">{{sanpham.gia_ban}} đ</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      sanPhams: [],
      endPointImage: '',
      items: [
        {
          src: "bn3.jpg"
        },
        {
          src: "bn2.png"
        },
        {
          src: "bn1.jpg"
        }
      ]
    };
  },
  created() {
    this.getSanPham();
    this.endPointImage = ImageUrl + "/";
  },
  methods: {
    async getSanPham() {
      let data = await axios.get("danhsachsanpham");
      this.sanPhams = data.data.data.data;
      console.log(data);
    },
    xemSanPham(id){
        this.$router.push('/sanpham/' + id)
    }
  }
};
</script>