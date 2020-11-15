import React from "react";
import {Toast} from "react-bootstrap";

const Settings = (props) =>
        props.showSettings &&
        <div className='settings-wrap'>
            <Toast className='settings' onClose={props.show}>
                <Toast.Header>
                    <strong className="mr-auto">Настройки</strong>
                </Toast.Header>
                <Toast.Body>
                    <div className='container row'>
                        <div className='col-9'>Цветовое обозначение:</div>
                        {props.state.color?
                            <div className='col-3'><button className='badge badge-success btn' onClick={()=>props.changeSettings('color', false)}> включено</button></div>
                            :
                            <div className='col-3'><button className='badge badge-danger btn' onClick={()=>props.changeSettings('color', true)}>отключено</button></div>
                        }
                        <svg><line x1='5%' x2='100%' y1={10} y2={10} stroke='gray'/></svg>
                    </div>
                </Toast.Body>
            </Toast>
        </div>


export default Settings;

