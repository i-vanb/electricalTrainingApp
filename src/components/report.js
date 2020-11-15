import React from "react";
import {Toast} from "react-bootstrap";

const Report = (props) => {
    const style = {
        width: props.table.canvasWidth,
    };
    let count = 0;

    return (
        props.showReport &&
        <div className='report-wrap'>
            <Toast className='report' style={style} onClose={props.show}>
                <Toast.Header>
                    <strong className="mr-auto">Отчет о переключениях</strong>
                    <small>Баллы {props.score}</small>
                </Toast.Header>
                <Toast.Body>
                    {props.report.map(item =>
                        <div className='container row' key={count}>
                            <div className='col-1'>{count = count + 1}.</div>
                            {item.type === 'action' && <div className='col-11'>{item.text}</div>}
                            {item.type === 'fail' && <div className='col-11 text-danger'>{item.text}</div>}
                        </div>
                    )}
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default Report;

