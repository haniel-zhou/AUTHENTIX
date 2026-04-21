import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'products/new',
        name: 'ProductNew',
        component: () => import('../views/ProductForm.vue')
      },
      {
        path: 'products/:id/edit',
        name: 'ProductEdit',
        component: () => import('../views/ProductForm.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
