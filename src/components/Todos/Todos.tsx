import { useState } from 'react';
import './Todos.css';

interface ITodo {
  title: string
}

const Todos = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState(Array<ITodo>);

  const addItem = () => {
    if (!value) return;
    setItems([{ title: value }, ...items]);
    setValue('');
  }

  const removeItem = (id:number) => {
    const newItems = items.filter((item, index)=> {
      return id !== index
    })
    setItems(newItems)
  }

  return (
    <div className="todos w-[800px] max-w-full mx-auto">
      {/* Title */}
      <h1 className="text-4xl tracking-widest font-bold uppercase mb-5">Todo</h1>
      
      {/* Form */}
      <div className="mb-5">
        <form onSubmit={(e)=>{ e.preventDefault(); addItem(); }}>
          <input
            className="px-4 py-3 w-full"
            type="text"
            onChange={(e)=>{ setValue(e.target.value)}}
            value={value}
            placeholder="Create a new todo..."
          />
        </form>
      </div>

      {/* Todos List */}
      <div className="todos-list">
        <ul>
          { items.map((item, index) => {
            return (
              <li key={index}>
                <div className="todos-item flex w-full items-center justify-between">
                  <div className="">
                    {item.title}
                  </div>
                  <button className="" onClick={()=>{ removeItem(index); }}>
                    X
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Info */}
      <div className="text-sm text-center">
        Drag and drop to reorder list
      </div>
    </div>
  );
}

export default Todos;
