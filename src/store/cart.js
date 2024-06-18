import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      count: () => {
        const { cart } = get();
        if (cart.length)
          return cart
            .map((item) => item.quantity)
            .reduce((prev, curr) => prev + curr);
        return 0;
      },
      add: (product) => {
        const { cart } = get();
        const updatedCart = updateCart(product, cart);
        set({ cart: updatedCart });
        toast.success("Producto añadido al carrito", {
          duration: 2000,
          icon: "🛒",
          position: "top-right",
        });
      },
      remove: (idProduct) => {
        const { cart } = get();
        const updatedCart = removeCart(idProduct, cart);
        set({ cart: updatedCart });
      },
      removeAll: () => set({ cart: [] }),
      totalAmount: () => {
        const { cart } = get();
        if (cart.length)
          return cart
            .map((item) => {
              const price =
                item.promotion_price && item.promotion_price > 0
                  ? item.promotion_price
                  : item.price;
              return price * item.quantity;
            })
            .reduce((prev, curr) => prev + curr);
        return 0;
      },
    }),
    {
      name: "cart",
      getStorage: () => localStorage,
    }
  )
);

function updateCart(product, cart) {
  const cartItem = { ...product, quantity: product.quantity };

  const productOnCart = cart.map((item) => item.id).includes(product.id);

  if (!productOnCart) cart.push(cartItem);
  else {
    return cart.map((item) => {
      if (item.id === product.id)
        return { ...item, quantity: item.quantity + product.quantity };
      return item;
    });
  }

  return cart;
}

function removeCart(idProduct, cart) {
  return cart
    .map((item) => {
      if (item.id === idProduct) return { ...item, quantity: 0 };
      return item;
    })
    .filter((item) => {
      return item.quantity;
    });
}

export default useCartStore;
