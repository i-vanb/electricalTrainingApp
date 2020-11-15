import React from "react";
import {Toast} from "react-bootstrap";

const Warning = (props) => {
    const style = {
        width: props.table.canvasWidth/2,
        left: props.table.canvasWidth/4,
        top: props.table.canvasHeight/8,

    };


    return (
        props.state.warning &&
        <div className='warning container position-absolute' style={style}>
            <Toast onClose={props.showWarning}>
                <Toast.Header>
                    <strong className="mr-auto">Переключение закончено</strong>
                </Toast.Header>
                <Toast.Body className=''>
                    <div className='warning-header bg-danger text-center pt-5 pb-5 text-light'>
                        {props.state.warningText.map(item=>
                            <div key={item}>{item}</div>
                        )}
                    </div>
                    <div className='warning-options'>
                        <button onClick={props.restart}>Начать сначала</button>
                        <button onClick={props.showTaskMenu}>Выбрать новое задание</button>
                        <button onClick={props.showReport}>Посмотреть отчет</button>
                        <button onClick={()=>console.dir(document)}>Выйти</button>
                    </div>
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default Warning;

