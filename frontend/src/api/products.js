import { supabase } from './supabase'

function formatProduct(p) {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    model: p.model || '',
    size: p.size,
    grade: p.grade,
    price: p.price,
    status: p.status || '展示中',
    verifyCode: p.verify_code,
    description: p.description || '',
    defects: p.defects || [],
    isCleaned: p.is_cleaned || false,
    isVerified: p.is_verified || false,
    images: p.images || [],
    createdAt: p.created_at
  }
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data.map(formatProduct)
}

export async function getProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return formatProduct(data)
}

export async function addProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single()

  if (error) throw error
  return formatProduct(data)
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return formatProduct(data)
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}
