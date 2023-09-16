import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService";
import { userResponseDto } from "../../models/userDto";
import { verificationResponseDto } from "../../models/verificationDto";

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUsers = createAsyncThunk("users/get", async (_, thunkAPI) => {
  try {
    return await usersService.getUsers();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const verifyUser = createAsyncThunk(
  "users/verify",
  async (thunkData, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.accessToken;
      const { userId, verificationDto } = thunkData;
      return await usersService.verifyUser(
        accessToken,
        userId,
        verificationDto
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.map((data) => userResponseDto(data));
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User successfully verified!";

        const responseDto = verificationResponseDto(action.payload);
        state.users = state.users.map((user) => {
          if (user.id === responseDto.id) {
            return {
              ...user,
              verificationStatus: responseDto.verificationStatus,
            };
          }

          return user;
        });
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetState } = usersSlice.actions;
export default usersSlice.reducer;
