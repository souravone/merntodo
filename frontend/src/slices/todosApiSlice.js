import { apiSlice } from "./apiSlice";

const TODOS_URL = "/api/todos/";

// export const todosApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getTodos: builder.mutation({
//       query: (data) => ({
//         url: `${TODOS_URL}/todos`,
//         method: "GET",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const { useGetTodosMutation } = todosApiSlice;
export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch Todos
    getTodos: builder.query({
      query: () => "/api/todos",
      providesTags: (result = [], error, arg) => [
        "Todo",
        ...result.map(({ id }) => ({ type: "Todo", id })),
      ],
    }),

    // Add Todo
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/api/todos",
        method: "POST",
        body: todo,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      invalidatesTags: ["Todo"],
    }),

    // Edit Todo
    editTodo: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/api/todos/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Todo", id }],
    }),

    // Delete Todo
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/api/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = todoApiSlice;
