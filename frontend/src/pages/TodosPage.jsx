import TodoForm from "../components/TodoForm";
import TodoItems from "../components/TodoItems";

function TodosPage() {
  return (
    <div>
      <TodoForm />
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4 mt-6">
          <TodoItems
            title="New todo"
            date="04th December, 2024"
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum accusantium voluptatem molestiae laboriosam iusto, possimus expedita repellat sint fugiat sit sed doloribus quisquam eius? Laboriosam adipisci veniam perspiciatis tenetur odit!"
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default TodosPage;
