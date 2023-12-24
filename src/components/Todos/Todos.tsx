import { useState, useCallback, useMemo } from 'react';
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
  title: string,
  completed: boolean
}

const Todos = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("todos") || `[]`));
  const [filter, setFilter] = useState(localStorage.getItem("filter") || `All`);    

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
    
    updateItems([{
       id: uniqid(),
       title: value,
       completed: false
    }, ...items]);

    setValue('');
  }

  const removeItem = (id:string) => {
    const newItems = items.filter((item)=> {
      return id !== item.id
    })
    updateItems(newItems)
  }  

  const updateFilter = (filter:string) => {
    setFilter(filter);
    localStorage.setItem("filter", filter);
  }

  const toggleCompleted = (id:string) => {
    const newItems = items.map((item)=> {
      if(item.id == id) {
        item.completed = !item.completed
      }
      return item;
    })
    updateItems(newItems)
  }

  const clearCompleted = () => {
    const newItems = items.filter((item)=> {
      return !item.completed
    })
    updateItems(newItems)
  }

  const getNumberitemsLeft = () => {
    return items.reduce((total:number, item:ITodo)=>{
      if(!item.completed) total++;
      return total;
    }, 0)
  }

  const itemsLeft = useMemo(() => {
    return getNumberitemsLeft();
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
            { items.map((item:ITodo, index:number) => {
              if (filter == "Active" && item.completed) return false;
              if (filter == "Completed" && !item.completed) return false;
              return (
                <SortableItem key={index} id={item.id}>
                  <div className="todos-item flex w-full items-center justify-between px-2">
                    <div className="flex gap-4">
                      <button onClick={()=>{ toggleCompleted(item.id); }} className="border-2 border-gray-400 rounded-full w-6 h-6 flex items-center justify-center">
                        { item.completed && <img src={checkUrl} alt="check"/> }
                      </button>
                      <div className={`${item.completed ? "line-through" : ""}`}>
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
      <div className="flex w-full justify-between items-center px-2 py-4">
        <div className="">
          {`${itemsLeft} item${itemsLeft == 1 ? "" : "s"} left`}
        </div>
        <div className="flex gap-4">
          <button className={`${filter == "All" ? "font-bold" : ""}`} onClick={()=>{ updateFilter('All'); }}>
            All
          </button>
          <button className={`${filter == "Active" ? "font-bold" : ""}`} onClick={()=>{ updateFilter('Active'); }}>
            Active
          </button>
          <button className={`${filter == "Completed" ? "font-bold" : ""}`} onClick={()=>{ updateFilter('Completed'); }}>
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

export default Todos;
