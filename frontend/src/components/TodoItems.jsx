import { MdCreate, MdDelete } from "react-icons/md";

function TodoItems({ title, description, date, onEdit, onDelete }) {
  return (
    <div className=" bg-white rounded-sm py-4 px-6 border hover:shadow-xl transition-all duration-500">
      <div className=" ">
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
      </div>

      <p className="text-sm text-slate-600 mt-2 mb-3">
        {description?.slice(0, 50)}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoItems;
