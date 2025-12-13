import { baseApi } from "../../baseApi/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    getAllCategories: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: `/categories?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Categories"]
    }),
    createCategory: builder.mutation({
      query: (formDataToSend) => ({
        url: `/categories/create`,
        method: "POST",
        body: formDataToSend,
      }),
      invalidatesTags: ["Categories"]
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/admin/category/${id}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"]
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"]
    }),
    // sub categorys api endpoints start


  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoryApi;
