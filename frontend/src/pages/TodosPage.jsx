import TodoForm from "../components/TodoForm";
import TodoItems from "../components/TodoItems";

import {
  useGetTodosQuery,
  useDeleteTodoMutation,
} from "./../slices/todosApiSlice";

function TodosPage() {
  const { data: todos, isLoading, isError } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id).unwrap();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading todos.</div>;

  return (
    <div>
      <TodoForm />
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4 mt-6">
          {todos?.map((todo) => (
            <TodoItems
              key={todo.id}
              title={todo.title}
              date={todo.date}
              description={todo.description}
              onEdit={() => console.log(`Edit ${todo.id}`)} // Placeholder
              onDelete={() => handleDeleteTodo(todo.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodosPage;
