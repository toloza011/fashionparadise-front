import { AES, enc } from "crypto-js";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      login: (token, user) => {
        const userEncrypt = AES.encrypt(
          JSON.stringify(user),
          process.env.REACT_APP_SECRET_KEY
        ).toString();
        set({ token: token, user: userEncrypt });
      },
      getUser: () => {
        try {
            // obtener el usuario del estado
          if (get().user) {
            let bytes = AES.decrypt(
                get().user,
              process.env.REACT_APP_SECRET_KEY
            );
            const decrypted = bytes.toString(enc.Utf8);
            return JSON.parse(decrypted);
          }
        return null;
        } catch (error) {
          return null;
        }
      },
      logout: () => {
        // Aquí iría la lógica para hacer el logout
        set({ token: null, user: null });
      },
    }),
    {
      name: "store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useUserStore;
