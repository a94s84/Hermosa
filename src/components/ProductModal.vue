<template>
  <!-- Modal -->
  <div class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
    >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title fs-6" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" id="image"
                  v-model="innerTempProduct.imageUrl" placeholder="請輸入圖片連結">
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input type="file" id="customFile" class="form-control"  ref="fileInput" @change="uploadFile">
              </div>
              <img class="img-fluid" :src="innerTempProduct.imageUrl" alt="">
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5" v-if="innerTempProduct.imagesUrl">
                <div v-for="(image, key) in innerTempProduct.imagesUrl" class="mb-3 input-group" :key="key">
                  <input type="url" class="form-control form-control" v-model="innerTempProduct.imagesUrl[key]" placeholder="請輸入連結">
                  <button type="button" class="btn btn-outline-secondary" @click="innerTempProduct.imagesUrl.splice(key, 1)">>
                    移除
                  </button>
                </div>
                <div v-if="innerTempProduct.imagesUrl[innerTempProduct.imagesUrl.length - 1] || !innerTempProduct.imagesUrl.length">
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="innerTempProduct.imagesUrl.push('')" >新增圖片</button>
                </div>
             </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">*標題</label>
                <input type="text" class="form-control" id="title" v-model="innerTempProduct.title" required
                        placeholder="請輸入標題">
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">*分類</label>
                  <input type="text" class="form-control" id="category" v-model="innerTempProduct.category" required
                          placeholder="請輸入分類">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">*單位</label>
                  <input type="text" class="form-control" id="unit" required
                    v-model="innerTempProduct.unit"  placeholder="請輸入單位">
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">*原價</label>
                  <input type="number" class="form-control" id="origin_price" required
                   v-model="innerTempProduct.origin_price" placeholder="請輸入原價">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">*售價</label>
                  <input type="number" class="form-control" id="price" required
                    v-model="innerTempProduct.price" placeholder="請輸入售價">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" class="form-control" id="description"
                 v-model="innerTempProduct.description" placeholder="請輸入產品描述"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" class="form-control" id="content"
                 v-model="innerTempProduct.content" placeholder="請輸入產品說明內容" rows="5"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input mt-0" type="checkbox"
                          :true-value="1"
                          :false-value="0"
                          id="is_enabled"  v-model="innerTempProduct.is_enabled">
                  <label class="form-check-label lh-base" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-product',innerTempProduct)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: {
    modalProduct: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    modalProduct () {
      this.innerTempProduct = this.modalProduct
    }
  },
  data () {
    return {
      modal: {},
      innerTempProduct: {}
    }
  },
  mixins: [modalMixin],
  methods: {
    uploadFile () {
      const uploadedFile = this.$refs.fileInput.files[0]
      const formDate = new FormData()
      formDate.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(url, formDate).then((res) => {
        if (res.data.success) {
          this.innerTempProduct.imageUrl = res.data.imageUrl
        } else {
          alert('請填寫所有必填欄位')
          this.getProducts()
          console.log(res)
        }
      })
    }
  }
}
</script>
