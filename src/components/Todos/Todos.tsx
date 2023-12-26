import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import uniqid from 'uniqid';
import TodoItem from './TodoItem';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './Todos.css';

type Todo = {
  id: string,
  title: string,
  completed: boolean
}

const Todos = () => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("todos") || `[]`));
  const [filter, setFilter] = useState(localStorage.getItem("filter") || `All`);
  
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(items));
    localStorage.setItem("filter", filter);
  }, [items, filter])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeItem = items.find((item:Todo) => item.id === active.id)
    const overItem = items.find((item:Todo) => item.id === over.id)

    if (!activeItem || !overItem) {
      return
    }

    const activeIndex = items.findIndex((item:Todo) => item.id === active.id)
    const overIndex = items.findIndex((item:Todo) => item.id === over.id)

    if (activeIndex !== overIndex) {
      setItems((items:Todo[]) => arrayMove<Todo>(items, activeIndex, overIndex))
    }
  }

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();   
    
    if (inputRef.current.value) {
      addItem(inputRef.current.value);
      inputRef.current.value = "";
    }   
  }

  const addItem = (value:string) => {
    const newTodo:Todo = {
      id: uniqid(),
      title: value,
      completed: false
    };    
    setItems((items:Todo[]) => [...items, newTodo]);
  }

  const removeItem = (id:string) => {
    const newItems = items.filter((item:Todo)=> {
      return id !== item.id
    })
    setItems(newItems)
  }

  const toggleCompleted = (id:string) => {
    const newItems = items.map((item:Todo)=> {
      if(item.id == id) {
        item.completed = !item.completed
      }
      return item;
    })
    setItems(newItems)
  }

  const clearCompleted = () => {
    const newItems = items.filter((item:Todo)=> {
      return !item.completed
    })
    setItems(newItems)
  }

  const itemsLeft = useMemo(() => {
    return items.reduce((total:number, item:Todo)=>{
      if(!item.completed) total++;
      return total;
    }, 0)
  }, [items]);

  return (
    <div className="todos w-[800px] max-w-full mx-auto">
      {/* Title */}
      <div className="flex w-full items-center justify-between mb-5">
        <h1 className="text-4xl tracking-widest font-bold uppercase text-white">Todo</h1>
        <ThemeSwitcher/>
      </div>
      
      {/* Form */}
      <div className="mb-5">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="px-4 py-3 w-full"
            type="text"
            placeholder="Create a new todo..."
          />
        </form>
      </div>

      {/* List */}
      <div className="todos-list">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={items}
            strategy={verticalListSortingStrategy}
          >
            { items.map((item:Todo, index:number) => {
              if (filter == "Active" && item.completed) return false;
              if (filter == "Completed" && !item.completed) return false;
              return (
                <TodoItem 
                  key={index}
                  id={item.id}
                  title={item.title}
                  completed={item.completed}
                  toggleCompleted={toggleCompleted}
                  removeItem={removeItem} />
              )
            })}
          </SortableContext>
        </DndContext>
      </div>

      {/* Menu */}
      <div className="flex w-full justify-between items-center px-2 py-4">
        <div className="">
          {`${itemsLeft} item${itemsLeft == 1 ? "" : "s"} left`}
        </div>
        <div className="flex gap-4">
          <button className={`${filter == "All" ? "font-bold" : ""}`} onClick={()=>{ setFilter('All'); }}>
            All
          </button>
          <button className={`${filter == "Active" ? "font-bold" : ""}`} onClick={()=>{ setFilter('Active'); }}>
            Active
          </button>
          <button className={`${filter == "Completed" ? "font-bold" : ""}`} onClick={()=>{ setFilter('Completed'); }}>
            Completed
          </button>
        </div>
        <button className="" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>

      {/* Info */}
      <div className="text-sm text-center">
        Drag and drop to reorder list
      </div>
    </div>
  );
}

export default memo(Todos);
