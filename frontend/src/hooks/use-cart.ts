import { useEffect, useState } from 'react'

export function useCart() {
  const [cart, setCart] = useState<{ productId: number; quantity: number }[]>(
    [],
  )

  useEffect(() => {
    const cartStorage = localStorage.getItem('cart')

    if (cartStorage) {
      setCart(
        JSON.parse(cartStorage) as { productId: number; quantity: number }[],
      )
    }
  }, [])

  function clearCart() {
    setCart([])
    localStorage.removeItem('cart')
  }

  function handleAddToCart(productId: number) {
    const productExists = cart.find((item) => item.productId === productId)

    if (productExists) {
      const newCart = cart.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        } else {
          return item
        }
      })
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    } else {
      const newCart = [...cart, { productId, quantity: 1 }]
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  function handleRemoveFromCart(productId: number) {
    const newCart = cart.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: item.quantity - 1,
        }
      } else {
        return item
      }
    })

    const correctCart = newCart.filter((item) => item.quantity !== 0)

    setCart(correctCart)
    localStorage.setItem('cart', JSON.stringify(correctCart))
  }

  return {
    cart,
    clearCart,
    handleAddToCart,
    handleRemoveFromCart,
  }
}
