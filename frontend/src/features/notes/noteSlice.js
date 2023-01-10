import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import ticketSlice from '../tickets/ticketSlice';
import noteService from './noteService'


const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// get Ticket notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(ticketData, token)
    } catch (error) {
      console.log('check if here..')
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)






export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getNotes.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getNotes.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.notes = action.payload
        })
        .addCase(getNotes.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
  },
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer
