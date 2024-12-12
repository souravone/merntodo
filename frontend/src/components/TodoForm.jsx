import { useState } from "react";

import { useAddTodoMutation } from "./../slices/todosApiSlice";

function TodoForm() {
  const [addTodo] = useAddTodoMutation();

  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const handleFormSublit = async (e) => {
    e.preventDefault();
    if (!todoTitle.trim() || !todoDescription.trim()) {
      alert("Please fill out both fields");
      return;
    }

    try {
      await addTodo({
        title: todoTitle,
        description: todoDescription,
      }).unwrap();
      setTodoTitle("");
      setTodoDescription("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  // const handleAddTodo = async () => {
  //   // await addTodo({ title: "New Todo", description: "Description of todo" });
  //   await addTodo({ title: todoTitle, description: todoDescription });
  // };

  return (
    <div className="flex items-center justify-center mt-8 mb-12">
      <form
        className="w-1/2 border rounded bg-white p-8"
        onSubmit={handleFormSublit}
      >
        <div className="">
          <h3 className="text-2xl text-violet-900 font-bold">Add todos</h3>
          <div className="flex items-center ">
            <div className="w-full flex gap-4">
              <input
                className="flex-none text-sm bg-transparent border px-5 py-3 rounded my-4 outline-none"
                type="text"
                placeholder="Title..."
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
              />
              <input
                className="grow text-sm bg-transparent border px-5 py-3 rounded my-4 outline-none"
                type="text"
                placeholder="Add description..."
                value={todoDescription}
                onChange={(e) => setTodoDescription(e.target.value)}
              />
            </div>
            <button
              className="text-sm ml-6 bg-violet-700 text-white p-3 rounded hover:bg-violet-600 transition-all duration-300"
              type="submit"
              // onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
