import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUsersFromAPI } from "../services/api"

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await fetchUsersFromAPI()
})

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.list.unshift(action.payload)
    },
    updateUser: (state, action) => {
      const index = state.list.findIndex((user) => user.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { addUser, updateUser, deleteUser } = usersSlice.actions
export default usersSlice.reducer
