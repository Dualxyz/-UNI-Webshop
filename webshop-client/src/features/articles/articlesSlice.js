import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import articlesService from "./articlesService";
import { articleResponseDto } from "../../models/articleDto";
import { deleteResponseDto } from "../../models/deleteDto";

const initialState = {
  articles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getArticles = createAsyncThunk(
  "articles/get",
  async (sellerId, thunkAPI) => {
    try {
      return await articlesService.getArticles(sellerId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addArticle = createAsyncThunk(
  "articles/add",
  async (articleData, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.accessToken;
      return await articlesService.addArticle(accessToken, articleData);
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

export const deleteArticle = createAsyncThunk(
  "articles/delete",
  async (articleId, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.accessToken;
      return await articlesService.deleteArticle(accessToken, articleId);
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

export const editArticle = createAsyncThunk(
  "articles/edit",
  async (thunkData, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.accessToken;
      const { articleId, articleData } = thunkData;
      return await articlesService.editArticle(
        accessToken,
        articleId,
        articleData
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

export const articlesSlice = createSlice({
  name: "articles",
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
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.articles = action.payload.map((data) => articleResponseDto(data));
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Article successfully added!";

        const responseDto = articleResponseDto(action.payload);
        state.articles.push(responseDto);
      })
      .addCase(addArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Article successfully deleted!";

        const responseDto = deleteResponseDto(action.payload);
        state.articles = state.articles.filter(
          (article) => article.id !== responseDto.id
        );
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Article successfully edited!";

        const responseDto = articleResponseDto(action.payload);
        state.articles = state.articles.map((article) => {
          if (article.id === responseDto.id) {
            return responseDto;
          }
          return article;
        });
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetState } = articlesSlice.actions;
export default articlesSlice.reducer;
