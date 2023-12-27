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
      <div className={`todos-item ${completed ? "completed" : ""} flex w-full items-center justify-between px-4 py-[16px] md:px-5 md:py-4 border-b`}>
        <div className="flex grow items-center gap-4 md:gap-6">
          <span>
            <button onClick={()=>{ toggleCompleted(id); }} className="toggle-completed border-2 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
              { completed && <img src={checkUrl} alt="check"/> }
            </button>
          </span>
          <button {...listeners} {...attributes} className={`${completed ? "line-through" : ""} flex leading-none w-full text-sm md:text-[18px] text-left mt-[2px]`}>
            {title}
          </button>
        </div>
        <button className="w-3 md:w-4" onClick={()=>{ removeItem(id); }}>
          <img src={crossUrl} alt="cross"/>
        </button>
      </div>
    </div>
  );
}

export default memo(TodoItem);