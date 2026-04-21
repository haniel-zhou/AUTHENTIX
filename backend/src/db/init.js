import db from './database.js'

// 创建商品表
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT,
    size TEXT NOT NULL,
    grade TEXT NOT NULL,
    price INTEGER NOT NULL,
    status TEXT DEFAULT '展示中',
    verifyCode TEXT UNIQUE,
    description TEXT,
    defects TEXT,
    isCleaned INTEGER DEFAULT 0,
    isVerified INTEGER DEFAULT 0,
    images TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  )
`)

// 插入示例数据
const existingCount = db.prepare('SELECT COUNT(*) as count FROM products').get()
if (existingCount.count === 0) {
  const sampleProducts = [
    {
      id: '1',
      name: 'Nike Air Force 1 Low',
      brand: 'Nike',
      model: 'Air Force 1 Low',
      size: '42',
      grade: 'A级',
      price: 399,
      status: '展示中',
      verifyCode: 'JZC-2026-000001',
      description: '经典黑白配色，AF1系列入门款，成色良好，穿着痕迹轻微。',
      defects: JSON.stringify(['左脚鞋舌有轻微折痕']),
      isCleaned: 1,
      isVerified: 1,
      images: JSON.stringify(['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'])
    },
    {
      id: '2',
      name: 'Adidas Samba OG',
      brand: 'Adidas',
      model: 'Samba OG',
      size: '41',
      grade: 'S级',
      price: 529,
      status: '展示中',
      verifyCode: 'JZC-2026-000002',
      description: 'Samba系列经典款式，近乎全新，鞋底无明显磨损，鞋面无折痕。',
      defects: JSON.stringify([]),
      isCleaned: 1,
      isVerified: 1,
      images: JSON.stringify(['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600'])
    },
    {
      id: '3',
      name: 'New Balance 2002R',
      brand: 'New Balance',
      model: '2002R',
      size: '43',
      grade: 'B级',
      price: 459,
      status: '展示中',
      verifyCode: 'JZC-2026-000003',
      description: '复古跑鞋风格，鞋底有正常使用痕迹，鞋面状况良好。',
      defects: JSON.stringify(['右脚鞋底轻微磨损']),
      isCleaned: 1,
      isVerified: 1,
      images: JSON.stringify(['https://images.unsplash.com/photo-1539185441755-769473a23570?w=600'])
    },
    {
      id: '4',
      name: 'Asics Gel-Kayano 14',
      brand: 'Asics',
      model: 'Gel-Kayano 14',
      size: '42.5',
      grade: 'A级',
      price: 699,
      status: '展示中',
      verifyCode: 'JZC-2026-000004',
      description: '复古慢跑鞋，近全新状态，仅试穿过一次，保存完好。',
      defects: JSON.stringify([]),
      isCleaned: 1,
      isVerified: 1,
      images: JSON.stringify(['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600'])
    },
    {
      id: '5',
      name: 'Salomon XT-6',
      brand: 'Salomon',
      model: 'XT-6',
      size: '41',
      grade: 'A级',
      price: 899,
      status: '展示中',
      verifyCode: 'JZC-2026-000005',
      description: '户外越野跑鞋，时尚与功能结合，成色很好，轻微使用痕迹。',
      defects: JSON.stringify(['鞋带略有磨损']),
      isCleaned: 1,
      isVerified: 1,
      images: JSON.stringify(['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600'])
    },
    {
      id: '6',
      name: 'On Cloud 5',
      brand: 'On',
      model: 'Cloud 5',
      size: '40',
      grade: 'B级',
      price: 369,
      status: '展示中',
      verifyCode: 'JZC-2026-000006',
      description: '瑞士品牌缓震跑鞋，穿着舒适，鞋底有可见磨损，但不影响穿着。',
      defects: JSON.stringify(['两脚鞋底均有可见磨损']),
      isCleaned: 1,
      isVerified: 1,
      images: JSON.stringify(['https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600'])
    }
  ]

  const insert = db.prepare(`
    INSERT INTO products (id, name, brand, model, size, grade, price, status, verifyCode, description, defects, isCleaned, isVerified, images)
    VALUES (@id, @name, @brand, @model, @size, @grade, @price, @status, @verifyCode, @description, @defects, @isCleaned, @isVerified, @images)
  `)

  const insertMany = db.transaction((products) => {
    for (const product of products) {
      insert.run(product)
    }
  })

  insertMany(sampleProducts)
  console.log('✅ 示例数据已插入')
}

console.log('✅ 数据库初始化完成')
