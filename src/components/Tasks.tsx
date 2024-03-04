import { useState, FC } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  addTask,
  toggleTask,
  setFilter,
  selectTasks,
  selectFilter,
} from "../store/taskSlice"

const Tasks: FC = () => {
  const [inputValue, setInputValue] = useState("")
  const tasks = useSelector(selectTasks)
  const filter = useSelector(selectFilter)
  const dispatch = useDispatch()

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "current") return !task.completed
    return true
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addTask(inputValue))
    setInputValue("")
  }

  return (
    <div className="max-w-xl mx-auto my-10">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border rounded shadow"
          placeholder="Enter a new task"
        />
        <button
          type="submit"
          disabled={!inputValue}
          className="px-4 py-2 bg-blue-500 disabled:bg-gray-400 text-white rounded shadow"
        >
          Add Task
        </button>
      </form>
      <div>
        {filteredTasks.map((task) => 
          <div
            key={task.id}
            onClick={() => dispatch(toggleTask(task.id))}
            className={`p-2 mb-2 cursor-pointer rounded shadow ${
              task.completed ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {task.name} - {task.completed ? "Completed" : "Not completed"}
          </div>
        )}
      </div>
      <div className="mb-4">
        <span className="mr-2">Filter:</span>
        <button
          onClick={() => dispatch(setFilter("all"))}
          className="mr-2 px-2 py-1 bg-gray-300 rounded shadow"
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className="mr-2 px-2 py-1 bg-green-300 rounded shadow"
        >
          Completed
        </button>
        <button
          onClick={() => dispatch(setFilter("current"))}
          className="px-2 py-1 bg-yellow-300 rounded shadow"
        >
          Current
        </button>
      </div>
      <div className="text-sm">
        Completed: {tasks.filter((task) => task.completed).length} / Not
        Completed: {tasks.filter((task) => !task.completed).length}
      </div>
    </div>
  )
}

export default Tasks
