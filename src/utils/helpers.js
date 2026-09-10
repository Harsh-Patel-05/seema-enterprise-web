export const cn = (...classes) => classes.filter(Boolean).join(' ')

export const filterProducts = (list, { query = '', category = '', brand = '' } = {}) => {
  const q = query.trim().toLowerCase()
  return list.filter((product) => {
    const matchesQuery =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.shortSpec?.toLowerCase().includes(q)

    const matchesCategory = !category || product.categoryId === category
    const matchesBrand = !brand || product.brandId === brand

    return matchesQuery && matchesCategory && matchesBrand
  })
}

export const sortProducts = (list, sortBy = 'featured') => {
  const next = [...list]
  if (sortBy === 'a-z') return next.sort((a, b) => a.name.localeCompare(b.name))
  return next.sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name))
}

export const searchSuggestions = (list, query, limit = 6) => {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return list
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
    .slice(0, limit)
}

export const getRelatedProducts = (list, product, limit = 4) =>
  list
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.categoryId === product.categoryId || p.brandId === product.brandId)
    )
    .slice(0, limit)
