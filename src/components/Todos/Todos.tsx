import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import uniqid from 'uniqid';
import SortableItem from './SortableItem';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import checkUrl from '../../assets/images/icon-check.svg';
import crossUrl from '../../assets/images/icon-cross.svg';
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
            { items.map((item, index) => {
              return (
                <SortableItem key={index} id={item.id}>
                  <div className="todos-item flex w-full items-center justify-between px-2">
                    <div className="flex gap-4">
                      <div className="border-2 border-gray-400 rounded-full w-6 h-6 flex items-center justify-center">
                        <img src={checkUrl} alt="check"/>
                      </div>
                      <div className="">
                        {item.title}
                      </div>
                    </div>
                    <button className="" onClick={()=>{ removeItem(item.id); }}>
                      <img src={crossUrl} alt="cross"/>
                    </button>
                  </div>
                </SortableItem>
              )
            })}
          </SortableContext>
        </DndContext>
      </div>

      {/* Menu */}
      <div className="flex w-full justify-between items-center">
        <div className="">
          items left 
        </div>
        <div className="flex gap-4">
          <div className="">
            All
          </div>
          <div className="">
            Active
          </div>
          <div className="">
            Completed
          </div>
        </div>
        <div className="">
          Clear Completed
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-center">
        Drag and drop to reorder list
      </div>
    </div>
  );
}

export default Todos;
