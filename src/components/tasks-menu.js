import React from "react";
import {Toast} from "react-bootstrap";

const TaskMenu = (props) => {
    const style = {
        width: props.table.canvasWidth/2,
        left: props.table.canvasWidth/4,
        top: props.table.canvasHeight/8,

    };


    return (
        props.state.taskMenu &&
        <div className='task-menu container position-absolute' style={style}>
            <Toast onClose={props.showTaskMenu}>
                <Toast.Header>
                    <strong className="mr-auto">Выберите задание</strong>
                </Toast.Header>
                <Toast.Body className='list-group task-menu-items'>
                    <button className='list-group-item p-2' onClick={()=>props.chooseTask(props.state.normal_t1)}>{props.state.normal_t1}</button>
                    <button className='list-group-item p-2' onClick={()=>props.chooseTask(props.state.normal_t2)}>{props.state.normal_t2}</button>
                    <button className='list-group-item p-2' onClick={()=>props.chooseTask(props.state.t1_normal)}>{props.state.t1_normal}</button>
                    <button className='list-group-item p-2' onClick={()=>props.chooseTask(props.state.t2_normal)}>{props.state.t2_normal}</button>
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default TaskMenu;

