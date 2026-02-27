import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface UserState {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
    userInfo:null,
    isLoggedIn:false,
}

export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>)=>{
      state.userInfo=action.payload;
      state.isLoggedIn=true;
    },
    logout:(state)=>{
      state.userInfo=null;
      state.isLoggedIn=false;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;