import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import uniqid from 'uniqid';
import SortableItem from './SortableItem';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './Todos.css';

interface ITodo {
  id: string,
  title: string
}

const Todos = () => {
  const todos:ITodo[] = JSON.parse(localStorage.getItem("todos") || `[]`);  
  
  const [items, setItems] = useState(todos);
  const [value, setValue] = useState("");  

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

    const activeItem = items.find((item) => item.id === active.id)
    const overItem = items.find((item) => item.id === over.id)

    if (!activeItem || !overItem) {
      return
    }

    const activeIndex = items.findIndex((item) => item.id === active.id)
    const overIndex = items.findIndex((item) => item.id === over.id)

    if (activeIndex !== overIndex) {
      updateItems(arrayMove<ITodo>(items, activeIndex, overIndex))
    }
  }

  const updateItems = (items:ITodo[]) => {
    setItems(items);
    localStorage.setItem("todos", JSON.stringify(items));
  }

  const addItem = () => {
    if (!value) return;
    updateItems([{ id: uniqid(), title: value }, ...items]);
    setValue('');
  }

  const removeItem = (id:string) => {
    const newItems = items.filter((item)=> {
      return id !== item.id
    })
    updateItems(newItems)
  }

  return (
    <div className="todos w-[800px] max-w-full mx-auto">
      {/* Title */}
      <div className="flex w-full items-center justify-between mb-5">
        <h1 className="text-4xl tracking-widest font-bold uppercase text-white">Todo</h1>
        <ThemeSwitcher/>
      </div>
      
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
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={items}
            strategy={verticalListSortingStrategy}
          >
            { items.map((item, index) => {
              return (
                <SortableItem key={index} id={item.id}>
                  <div className="todos-item flex w-full items-center justify-between">
                    <div className="">
                      {item.title}
                    </div>
                    <button className="" onClick={()=>{ removeItem(item.id); }}>
                      X
                    </button>
                  </div>
                </SortableItem>
              )
            })}
          </SortableContext>
        </DndContext>
      </div>

      {/* Info */}
      <div className="text-sm text-center">
        Drag and drop to reorder list
      </div>
    </div>
  );
}

export default Todos;
