import { create } from "zustand";

type IUseLoginStateType = {
  isLogin: boolean;
  user: any;
  setLogin: (value: any) => void;
  setUser: (state: any) => void;
};

export const useLoginState = create<IUseLoginStateType>((set) => ({
  isLogin: false,
  user: null,
  setLogin: (value) => set((state: any) => ({ isLogin: value })),
  setUser: (data) =>
    set((state: any) => ({
      user: data,
    })),
}));
