import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    userRole: 'ADMIN' | 'USER' | null;
}

const storedToken = localStorage.getItem('token');
const storedRole = localStorage.getItem('role') as 'ADMIN' | 'USER' | null;

const initialState: AuthState = {
    token: storedToken,
    isAuthenticated: !!storedToken,
    userRole: storedRole ?? null,
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
            localStorage.setItem('role', action.payload.role);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.userRole = null;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        },
        setUserRole: (state, action: PayloadAction<'ADMIN' | 'USER'>) => {
            state.userRole = action.payload;
            localStorage.setItem('role', action.payload);
        }
    },
});

export const { loginSuccess, logout, setUserRole } = authSlice.actions;
export default authSlice.reducer;