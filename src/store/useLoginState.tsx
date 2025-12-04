import { create } from "zustand";

type IUseLoginStateType = {
  isLogin: boolean;
  user: any;
  setLogin: () => void;
  setUser: (state: any) =>void;
};

export const useLoginState = create<IUseLoginStateType>((set) => ({
  isLogin: false,
  user: null,
  setLogin: () => set((state: any) => ({ isLogin: true })),
  setUser: () => set((state: any) => ({ user: state.user })),
}));
