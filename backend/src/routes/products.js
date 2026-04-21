import express from 'express'
import db from '../db/database.js'

const router = express.Router()

// 获取所有商品
router.get('/', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY createdAt DESC').all()
    const parsed = products.map(p => ({
      ...p,
      defects: p.defects ? JSON.parse(p.defects) : [],
      images: p.images ? JSON.parse(p.images) : [],
      isCleaned: Boolean(p.isCleaned),
      isVerified: Boolean(p.isVerified)
    }))
    res.json(parsed)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 获取单个商品
router.get('/:id', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
    if (!product) {
      return res.status(404).json({ error: '商品不存在' })
    }
    res.json({
      ...product,
      defects: product.defects ? JSON.parse(product.defects) : [],
      images: product.images ? JSON.parse(product.images) : [],
      isCleaned: Boolean(product.isCleaned),
      isVerified: Boolean(product.isVerified)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 创建商品
router.post('/', (req, res) => {
  try {
    const { id, name, brand, model, size, grade, price, status, verifyCode, description, defects, isCleaned, isVerified, images } = req.body

    if (!name || !brand || !size || !grade || !price) {
      return res.status(400).json({ error: '缺少必填字段' })
    }

    // 生成唯一ID
    const productId = id || Date.now().toString()
    // 生成验真编号
    const code = verifyCode || `JZC-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

    const stmt = db.prepare(`
      INSERT INTO products (id, name, brand, model, size, grade, price, status, verifyCode, description, defects, isCleaned, isVerified, images)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      productId,
      name,
      brand,
      model || '',
      size,
      grade,
      price,
      status || '展示中',
      code,
      description || '',
      JSON.stringify(defects || []),
      isCleaned ? 1 : 0,
      isVerified ? 1 : 0,
      JSON.stringify(images || [])
    )

    const newProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(productId)
    res.status(201).json({
      ...newProduct,
      defects: JSON.parse(newProduct.defects || '[]'),
      images: JSON.parse(newProduct.images || '[]'),
      isCleaned: Boolean(newProduct.isCleaned),
      isVerified: Boolean(newProduct.isVerified)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 更新商品
router.put('/:id', (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
    if (!existing) {
      return res.status(404).json({ error: '商品不存在' })
    }

    const {
      name, brand, model, size, grade, price, status,
      verifyCode, description, defects, isCleaned, isVerified, images
    } = req.body

    const stmt = db.prepare(`
      UPDATE products SET
        name = ?, brand = ?, model = ?, size = ?, grade = ?, price = ?,
        status = ?, verifyCode = ?, description = ?, defects = ?, isCleaned = ?, isVerified = ?, images = ?,
        updatedAt = datetime('now')
      WHERE id = ?
    `)

    stmt.run(
      name || existing.name,
      brand || existing.brand,
      model ?? existing.model,
      size || existing.size,
      grade || existing.grade,
      price ?? existing.price,
      status || existing.status,
      verifyCode || existing.verifyCode,
      description ?? existing.description,
      defects ? JSON.stringify(defects) : existing.defects,
      isCleaned !== undefined ? (isCleaned ? 1 : 0) : existing.isCleaned,
      isVerified !== undefined ? (isVerified ? 1 : 0) : existing.isVerified,
      images ? JSON.stringify(images) : existing.images,
      req.params.id
    )

    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
    res.json({
      ...updated,
      defects: JSON.parse(updated.defects || '[]'),
      images: JSON.parse(updated.images || '[]'),
      isCleaned: Boolean(updated.isCleaned),
      isVerified: Boolean(updated.isVerified)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 删除商品
router.delete('/:id', (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
    if (!existing) {
      return res.status(404).json({ error: '商品不存在' })
    }

    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id)
    res.json({ message: '删除成功' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
