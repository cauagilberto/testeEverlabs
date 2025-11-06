import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    userRole: 'ADMIN' | 'USER' | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    userRole: null, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string, role: 'ADMIN' | 'USER' }>) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.userRole = action.payload.role;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.userRole = null;
            localStorage.removeItem('token');
        },
        setUserRole: (state, action: PayloadAction<'ADMIN' | 'USER'>) => {
            state.userRole = action.payload;
        }
    },
});

export const { loginSuccess, logout, setUserRole } = authSlice.actions;
export default authSlice.reducer;