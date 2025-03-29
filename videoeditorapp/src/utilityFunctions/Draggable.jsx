import { useDrag } from 'react-dnd';


const Draggable = ({Item}) => {

    console.log('items', Item)

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
     
        }),
            
    }));
    console.log("Dragging state:", isDragging);
  return (
<div
    ref={drag}
    // style={{
    //     opacity: isDragging ? 0.5 : 1,
    //     cursor: 'move',
    //     border: '1px solid #ccc',
    //     padding: '10px',
    //     borderRadius: '5px',
    //     margin: '5px',
    //     backgroundColor: 'lightblue',
    // }}
    >
        <img src={Item?.props?.src}
           style={{ width: "50px", height: "50px", objectFit: "cover" }} 
        />,
</div>
  )
}

export default Draggable
