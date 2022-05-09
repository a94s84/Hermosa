<template>
    <div class="contentWrap">
    <Form v-slot="{ errors }" @submit="createOrder">
        <div class="wrap cartWrap d-sp">
                <ul class="cart_menu">
                        <li>購物清單</li>
                        <li class="active">填寫資料</li>
                        <li>確認訂單</li>
                        <li>完成購物</li>
                    </ul>
                <div class="shopWrap">
                    <h2>填寫資料</h2>
                    <!-- 商品資訊 -->
                    <h3 class="shopTitle">商品資訊</h3>
                    <div class="shop_orderlist">
                        <div class="shopItem" v-for="item in carts.carts" :key="item.id">
                            <div class="shopItem_img">
                              <img :src="`${item.product.imageUrl}`">
                            </div>
                            <div class="shopItem_name">
                                <p>{{item.product.title}}</p>
                            </div>
                            <div class="shopItem_size">
                                <p>尺寸</p>
                                <span>F</span>
                            </div>
                            <div class="shopItem_qty">
                                <p>數量</p>
                                <span>{{item.qty}}</span>
                            </div>
                            <div class="shopItem_price" v-if="item.product.origin_price !== item.product.price">
                                <p>單價</p>
                                <span class="pdbox_price-origin">NT$ {{ $filters.currency(item.product.origin_price) }}</span>
                                <span class="pdbox_price-sale">NT$ {{ $filters.currency(item.product.price) }}</span>
                            </div>
                            <div class="shopItem_price" v-else>
                                <p>單價</p>
                                <span>NT$ {{ $filters.currency(item.product.price)}}</span>
                            </div>
                            <div class="shopItem_total">
                                <p>小計</p>
                                <span>NT$ {{ $filters.currency(item.final_total) }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 折扣碼 -->
                    <div class="shop_cost">
                        <h3>折扣碼/購物總金額</h3>
                        <div class="shop_costbox">
                            <div class="shop_discountbox">
                                <div class="shop_discount_code">
                                    <p>請輸入折扣碼：</p>
                                    <input type="text" v-model="couponCode">
                                    <a type="button" class="btn_black" @click.prevent="useCoupon()">套用</a>
                                    <div class="shop_note">
                                        <p>單筆訂單限抵一張折價券。</p>
                                    </div>
                                </div>
                            </div>
                            <div class="shop_count">
                                <div>
                                    <p>小計</p><span>NT$ {{ $filters.currency(carts.total)}}</span>
                                </div>
                                <div>
                                    <p>折扣折抵</p><span class="shop_minus">NT$ {{ $filters.currency(carts.total - carts.final_total)}}</span>
                                </div>
                                <div>
                                    <p>運費</p><span>NT$80</span>
                                </div>
                                <div class="shop_total">
                                    <p>總計</p>
                                    <span>NT$ {{ $filters.currency(carts.final_total)}}</span>
                                    <span class="text-success" v-if="carts.total !== carts.final_total">(已套用優惠券)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 收件人資料 -->
                    <h3 class="shopTitle ">填寫運送資料</h3>
                    <div class="shop_sendinfo">
                        <div class="recipientBox">
                            <div class="shopinfoBox d-sp">
                                <div class="shopinfoBox_name">
                                    <p>收件人姓名<sup>*</sup></p>
                                    <Field name="姓名" type="text" :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入收件者姓名" rules="required" v-model="form.user.name"></Field>
                                    <error-message name="姓名" class="invalid-feedback" />
                                </div>
                                <div class="shopinfoBox_tel">
                                    <p>收件人電話<sup>*</sup></p>
                                    <Field name="聯絡電話" type="tel" :class="{ 'is-invalid': errors['聯絡電話'] }" placeholder="請輸入聯絡電話" :rules="isPhoneNumber" v-model="form.user.tel"></Field>
                                    <error-message name="聯絡電話" class="invalid-feedback" />
                                </div>
                            </div>
                            <!-- email -->
                            <div class="shopinfoBox">
                                <p class="font-N">E-mail<sup>*</sup></p>
                                <Field name="email" type="email" :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入Email"  rules="required|email" v-model="form.user.email"></Field>
                                <error-message name="email" class="invalid-feedback" />
                            </div>
                            <!-- 地址 -->
                            <div class="shopinfoBox">
                                <p>地址<sup>*</sup></p>
                                <Field name="地址" type="text" :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required" v-model="form.user.address"></Field>
                                <error-message name="地址" class="invalid-feedback" />
                            </div>
                            <div class="shopinfoBox">
                                <p>備註</p>
                                <div>
                                <textarea rows="2" v-model="form.message"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 注意事項 -->
                    <h3 class="shopTitle ">購物須知</h3>
                    <div class="cart_note">
                        <p>※ 商品加入購物車但未完成結帳前並無保留商品庫存功能，商品庫存分配將以結帳順序為依據。</p>
                        <p>※ 選擇門市取貨付款，包裹送達後隔日下午會簡訊通知領取。</p>
                        <p>※ 當包裹出貨完成未被領取或拒收退回(出貨後7日計算)，該訂購帳號若達三次將無法使用此配送方式。</p>
                        <p>※ 國內配送時間約2-3個工作天，若您遲遲未收到商品，請盡速與客服連絡。</p>
                        <p>※ 提醒您，若您無故或惡意違反制定訂購與退貨相關規則，本公司有權暫停您的帳號並拒絕您使用本服務，同時列為交易黑名單，請您留意。</p>
                        <div class="form-check">
                            <Field  id="formCheck" name="check" type="checkbox" :class="{ 'is-invalid': errors['check'] }" value="checked" :rules="isChecked"></Field>
                            <label class="form-check-label ml-6" for="formCheck"> 我已閱讀並同意網站的 條款與條件 <sup>*</sup></label>
                            <ErrorMessage name="check" class="invalid-feedback" />
                        </div>
                    </div>
                </div>
        </div>
        <!-- footerfixed結帳金額 -->
        <div class="footer_fixed">
            <div class="wrap d-sp">
                <router-link to="/cart" class="btn_pre_white">
                    <input type="button" value="上一步" />
                </router-link>
                <div>
                    <h3>總計: <span>NT$ {{ $filters.currency(carts.final_total)}}</span> </h3>
                </div>
                <div class="btn_next_white">
                    <input type="submit" value="下一步" />
                </div>
            </div>
        </div>
    </Form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      carts: [],
      tempProduct: {},
      isLoading: false,
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  inject: ['emitter'],
  methods: {
    getCartList () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.carts = res.data.data
        }
      })
    },
    useCoupon () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.couponCode
      }
      this.$http.post(url, { data: coupon }).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.couponCode = ''
          this.getCartList()
          this.$httpMessageState(res, res.data.message)
        } else {
          this.couponCode = ''
          this.$httpMessageState(res, res.data.message)
        }
      })
    },
    isPhoneNumber (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
    },
    isChecked (value) {
      if (value && value.length) {
        return true
      }
      return '請勾選同意網站的條款與條件'
    },
    createOrder () {
      this.isLoading = true
      const order = this.form
      this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`, { data: order })
        .then((res) => {
          this.isLoading = false
          console.log(res.data)
          if (res.data.success) {
            this.$httpMessageState(res, res.data.message)
            // this.$refs.form.resetForm()
            this.$router.push({ name: 'checkout', params: { orderId: res.data.orderId } })
          } else {
            this.$httpMessageState(res, res.data.message)
          }
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            type: 'danger',
            message: '發生錯誤，請重新整理頁面'
          })
        })
    }
  },
  created () {
    this.getCartList()
  }
}
</script>
