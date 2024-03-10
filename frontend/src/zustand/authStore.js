import {create} from 'zustand';

const useAuthStore = create((set) => ({
    isAuth: false,
    authdata: {},
    isLoadingCookie: false,
    setIsAuth: (isAuth) => set({isAuth}),
    setAuthData : (id , username , token) => set({authdata: {id, username, token}}),
    setIsLoadingCookie: (isLoading) => set({isLoading})
}));

export default useAuthStore;