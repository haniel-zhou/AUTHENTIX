<template>
  <div class="product-form">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ isEdit ? '编辑商品' : '新增商品' }}</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>
      <el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="如：Nike Air Force 1 Low" />
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-select v-model="form.brand" placeholder="选择品牌" style="width: 100%">
            <el-option label="Nike" value="Nike" />
            <el-option label="Adidas" value="Adidas" />
            <el-option label="New Balance" value="New Balance" />
            <el-option label="Asics" value="Asics" />
            <el-option label="Salomon" value="Salomon" />
            <el-option label="On" value="On" />
            <el-option label="Puma" value="Puma" />
            <el-option label="Converse" value="Converse" />
            <el-option label="Vans" value="Vans" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="form.model" placeholder="如：Air Force 1 Low" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="尺码" prop="size">
              <el-input v-model="form.size" placeholder="如：42" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成色" prop="grade">
              <el-select v-model="form.grade" placeholder="选择成色" style="width: 100%">
                <el-option label="S级（几乎全新）" value="S级" />
                <el-option label="A级（轻微使用）" value="A级" />
                <el-option label="B级（正常使用）" value="B级" />
                <el-option label="C级（明显磨损）" value="C级" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="form.price" :min="0" :step="1" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio value="展示中">展示中</el-radio>
            <el-radio value="已下架">已下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="验真编号">
          <el-input v-model="form.verifyCode" placeholder="留空自动生成" />
        </el-form-item>
        <el-form-item label="商品图片">
          <el-input v-model="form.imageUrl" placeholder="输入图片URL">
            <template #append>
              <el-button @click="addImage">添加</el-button>
            </template>
          </el-input>
          <div class="image-list" v-if="form.images.length">
            <div class="image-item" v-for="(img, idx) in form.images" :key="idx">
              <img :src="img" />
              <el-button type="danger" circle size="small" @click="removeImage(idx)">×</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.description" type="textarea" :rows="3" placeholder="商品描述" />
        </el-form-item>
        <el-form-item label="瑕疵说明">
          <el-input v-model="form.defectInput" placeholder="输入瑕疵后回车添加">
            <template #append>
              <el-button @click="addDefect">添加</el-button>
            </template>
          </el-input>
          <el-tag
            v-for="(defect, idx) in form.defects"
            :key="idx"
            closable
            @close="removeDefect(idx)"
            style="margin-top: 8px; margin-right: 8px;"
          >
            {{ defect }}
          </el-tag>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.isCleaned">已清洗</el-checkbox>
          <el-checkbox v-model="form.isVerified" style="margin-left: 24px;">已验真</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="saving" @click="handleSubmit">
            {{ isEdit ? '保存修改' : '创建商品' }}
          </el-button>
          <el-button @click="goBack" style="margin-left: 12px;">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getProduct, createProduct, updateProduct } from '../api/products'

const router = useRouter()
const route = useRoute()
const formRef = ref(null)
const saving = ref(false)

const isEdit = computed(() => !!route.params.id)

const form = reactive({
  name: '',
  brand: '',
  model: '',
  size: '',
  grade: '',
  price: 0,
  status: '展示中',
  verifyCode: '',
  images: [],
  imageUrl: '',
  description: '',
  defects: [],
  defectInput: '',
  isCleaned: true,
  isVerified: true
})

const rules = {
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  brand: [{ required: true, message: '请选择品牌', trigger: 'change' }],
  size: [{ required: true, message: '请输入尺码', trigger: 'blur' }],
  grade: [{ required: true, message: '请选择成色', trigger: 'change' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }]
}

onMounted(() => {
  if (isEdit.value) {
    fetchProduct()
  }
})

async function fetchProduct() {
  try {
    const res = await getProduct(route.params.id)
    const p = res.data
    form.name = p.name
    form.brand = p.brand
    form.model = p.model || ''
    form.size = p.size
    form.grade = p.grade
    form.price = p.price
    form.status = p.status
    form.verifyCode = p.verifyCode || ''
    form.images = p.images || []
    form.description = p.description || ''
    form.defects = p.defects || []
    form.isCleaned = p.isCleaned
    form.isVerified = p.isVerified
  } catch (error) {
    ElMessage.error('获取商品信息失败')
  }
}

function addImage() {
  if (form.imageUrl && !form.images.includes(form.imageUrl)) {
    form.images.push(form.imageUrl)
    form.imageUrl = ''
  }
}

function removeImage(idx) {
  form.images.splice(idx, 1)
}

function addDefect() {
  if (form.defectInput && !form.defects.includes(form.defectInput)) {
    form.defects.push(form.defectInput)
    form.defectInput = ''
  }
}

function removeDefect(idx) {
  form.defects.splice(idx, 1)
}

function goBack() {
  router.push('/')
}

async function handleSubmit() {
  try {
    await formRef.value.validate()
    saving.value = true

    const data = {
      name: form.name,
      brand: form.brand,
      model: form.model,
      size: form.size,
      grade: form.grade,
      price: form.price,
      status: form.status,
      verifyCode: form.verifyCode || undefined,
      images: form.images,
      description: form.description,
      defects: form.defects,
      isCleaned: form.isCleaned,
      isVerified: form.isVerified
    }

    if (isEdit.value) {
      await updateProduct(route.params.id, data)
      ElMessage.success('保存成功')
    } else {
      await createProduct(data)
      ElMessage.success('创建成功')
    }
    router.push('/')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(isEdit.value ? '保存失败' : '创建失败')
    }
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.product-form {
  max-width: 800px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.image-item {
  position: relative;
}

.image-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.image-item .el-button {
  position: absolute;
  top: -8px;
  right: -8px;
}
</style>
