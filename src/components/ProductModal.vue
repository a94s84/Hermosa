<template>
  <!-- Modal -->
  <div class="modal fade" id="productModal" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <Form v-slot="{ errors }">
      <div class="modal-content border-0">
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title fs-6 lh-1">
            <span>產品</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-6">
              <div class="mb-3">
                <label for="title" class="form-label">*產品名稱</label>
                <Field type="text" class="form-control" id="title" name="產品名稱" placeholder="輸入產品名稱" rules="required" :class="{ 'is-invalid': errors['產品名稱'] }" v-model="innerTempProduct.title"/>
                <ErrorMessage name="產品名稱" class="invalid-feedback" />
              </div>
              <div class="row gx-2">
                <label for="category" class="form-label">*產品分類</label>
                <div class="mb-3 col-md-6">
                  <Field class="form-select" id="category" name="產品分類"  as="select" rules="required" :class="{ 'is-invalid': errors['產品分類'] }" v-model="innerTempProduct.category">
                    <option :disabled="productCategory">請選擇</option>
                    <option v-for="category in productCategory" :value="category" :key="category">{{ category }}</option>
                  </Field>
                  <ErrorMessage name="產品分類" class="invalid-feedback" />
                </div>
                <div class="mb-3 col-md-6">
                  <div v-if="isEdit" class="d-flex">
                    <input type="text" v-model.trim="newCategory" class="form-control" placeholder="新增分類">
                    <button type="button" class="btn btn-secondary flex-shrink-0 ms-2" @click.prevent="editCategory">新增</button>
                  </div>
                  <button type="button" v-else class="btn btn-secondary" @click="this.isEdit = true">新增產品分類</button>
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">*單位</label>
                  <Field type="text" class="form-control" id="unit" name="單位" placeholder="請輸入單位" rules="required" :class="{ 'is-invalid': errors['單位'] }" v-model="innerTempProduct.unit"/>
                  <ErrorMessage name="單位" class="invalid-feedback" />
                </div>
                <div class="mb-3 col-md-6">
                  <p class="form-label">是否上架</p>
                  <div class="form-check pt-2">
                    <input class="form-check-input mt-0" type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            id="is_enabled"  v-model="innerTempProduct.is_enabled">
                    <label class="form-check-label lh-base" for="is_enabled">
                      上架
                    </label>
                 </div>
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">*原價</label>
                  <Field type="number" class="form-control" id="origin_price" name="原價" rules="required" :class="{ 'is-invalid': errors['原價'] }" v-model.number="innerTempProduct.origin_price" placeholder="請輸入原價"/>
                  <ErrorMessage name="原價" class="invalid-feedback" />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">*售價</label>
                  <Field type="number" class="form-control" id="price" name="售價" rules="required" :class="{ 'is-invalid': errors['售價'] }" v-model.number="innerTempProduct.price" placeholder="請輸入售價"/>
                  <ErrorMessage name="售價" class="invalid-feedback" />
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
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <div class="row gx-2">
                  <div class="col-md-4 mb-2">
                    <label for="image" class="form-label">*上傳主圖</label>
                    <input type="url" class="form-control" id="image"
                    v-model="innerTempProduct.imageUrl" placeholder="請輸入圖片連結">
                    <label for="customFile" class="uploadImg">
                      <input type="file" id="customFile" class="d-none" @change="uploadFile('main', $event)">
                      <img v-if="innerTempProduct.imageUrl" class="img-fluid" :src="innerTempProduct.imageUrl">
                      <div v-else-if="isUpload" class="py-5">
                        <div class="spinner-border mb-2" role="status" >
                            <span class="visually-hidden">上傳中...</span>
                        </div>
                        <p>上傳中</p>
                      </div>
                      <div v-else class="py-5"><i class="bi bi-cloud-upload"></i><p>上傳圖片</p><p>檔案必須小於 1MB</p></div>
                    </label>
                  </div>
                  <template v-if="innerTempProduct.images">
                    <div class="col-md-4 mb-4" v-for="(image, key) in innerTempProduct.images" :key="key">
                      <label :for="'multiImg' + key" class="form-label d-flex justify-content-between">
                        <span>上傳輪播圖片</span><span @click="innerTempProduct.images.splice(key, 1)"><i class="bi bi-trash3-fill"></i></span>
                      </label>
                      <input type="url" class="form-control form-control" :id="'multiImg' + key" v-model="innerTempProduct.images[key]" placeholder="請輸入連結">
                      <label :for="'multiFile' + key" class="uploadImg">
                        <input type="file" :id="'multiFile' + key" class="d-none" @change="uploadFile(key, $event)">
                        <img v-if="innerTempProduct.images[key]" class="img-fluid" :src="innerTempProduct.images[key]">
                        <div v-else-if="isUploads[key]" class="py-5">
                        <div class="spinner-border mb-2" role="status" >
                            <span class="visually-hidden">上傳中...</span>
                        </div>
                        <p>上傳中</p>
                      </div>
                        <div v-else class="py-5"><i class="bi bi-cloud-upload"></i><p>上傳圖片</p><p>檔案必須小於 1MB</p></div>
                      </label>
                    </div>
                  </template>
                </div>
              </div>
              <!-- 延伸技巧，多圖 -->
              <div class="mt-2" v-if="innerTempProduct.images">
                <div v-if="innerTempProduct.images[innerTempProduct.images.length - 1] || !innerTempProduct.images.length">
                  <button type="button"
                    class="btn btn-secondary btn-sm d-block w-100"
                    @click="innerTempProduct.images.push('')" >新增輪播</button>
                </div>
             </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
          <button type="submit" class="btn btn-primary" @click.prevent="$emit('update-product',innerTempProduct)">確認</button>
        </div>
      </div>
      </Form>
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
  data () {
    return {
      productCategory: [],
      innerTempProduct: {},
      newCategory: '',
      isEdit: false,
      isUpload: false,
      isUploads: []
    }
  },
  mixins: [modalMixin],
  watch: {
    modalProduct () {
      this.innerTempProduct = this.modalProduct
      if (!this.innerTempProduct.images) {
        this.innerTempProduct.images = []
      }
    }
  },
  methods: {
    CreateCategory () {
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`).then((res) => {
        if (res.data.success) {
          res.data.products.forEach((item) => {
            if (!this.productCategory.includes(item.category)) {
              this.productCategory.push(item.category)
            }
          })
        }
      })
    },
    editCategory () {
      if (this.newCategory) {
        this.productCategory.push(this.newCategory)
        this.newCategory = ''
        this.isEdit = false
        alert('新增分類成功')
      } else {
        alert('請輸入分類')
      }
    },
    uploadFile (key, e) {
      const uploadedFile = e.target.files[0]
      const formDate = new FormData()
      formDate.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      if (key === 'main') {
        this.isUpload = true
      } else {
        this.isUploads[key] = true
      }
      this.$http.post(url, formDate).then((res) => {
        if (res.data.success) {
          if (key === 'main') {
            this.innerTempProduct.imageUrl = res.data.imageUrl
            this.isUpload = false
          } else {
            this.innerTempProduct.images[key] = res.data.imageUrl
            this.isUploads[key] = false
          }
        } else {
          alert('上傳檔案失敗', res.data.message.message)
        }
      })
    }
  },
  created () {
    this.CreateCategory()
  }
}
</script>
