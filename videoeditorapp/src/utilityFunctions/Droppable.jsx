import { useDrop } from 'react-dnd';



const Droppable = ({onDrop} ) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

  return (
    <div>
       Drop Below
    </div>
  )
}

export default Droppable
