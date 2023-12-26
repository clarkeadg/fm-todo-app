import { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import checkUrl from '../../assets/images/icon-check.svg';
import crossUrl from '../../assets/images/icon-cross.svg';

type TodoItemProps = {
  id: string,
  title: string,
  completed: boolean,
  toggleCompleted: Function,
  removeItem: Function,
}

const TodoItem = ({ id, title, completed, toggleCompleted, removeItem }:TodoItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style}>
      <div className="todos-item flex w-full items-center justify-between px-2">
        <div className="flex grow gap-4">
          <button onClick={()=>{ toggleCompleted(id); }} className="border-2 border-gray-400 rounded-full w-6 h-6 flex items-center justify-center">
            { completed && <img src={checkUrl} alt="check"/> }
          </button>
          <button {...listeners} {...attributes} className={`${completed ? "line-through" : ""} flex grow`}>
            {title}
          </button>
        </div>
        <button className="" onClick={()=>{ removeItem(id); }}>
          <img src={crossUrl} alt="cross"/>
        </button>
      </div>
    </div>
  );
}

export default memo(TodoItem);