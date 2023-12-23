import { ReactElement } from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ISortableItem {
  id: string,
  children: ReactElement
}

const SortableItem = (props:ISortableItem) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style}>
      <button {...listeners} {...attributes} className="border-t-2 w-full"/>
      { props.children }
    </div>
  );
}

export default SortableItem;