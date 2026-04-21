import express from 'express'
import cors from 'cors'
import productsRouter from './routes/products.js'

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(express.json())

// 路由
app.use('/api/products', productsRouter)

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 鉴真仓后端服务已启动: http://localhost:${PORT}`)
  console.log(`📦 API端点: http://localhost:${PORT}/api/products`)
})
