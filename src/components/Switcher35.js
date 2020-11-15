import React from "react";
import ground from '../img/ground.jpg';
import nvrl from '../img/nvrl.jpg';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const Switcher35 = (props) => {
    let {x, y, turnedOn, id, type, showMenu, table} = props;
    let side = table.canvasWidth / 60;
    let coordX = table.stepWidth * x - table.stepWidth / 2 - side / 2;
    let coordY = table.stepHeight * y - table.stepHeight / 2 - side / 2;
    let cx = coordX + side / 2;
    let cy = coordY + side / 2;
    let line = side * 0.6;
    let cursor = {
        cursor: 'pointer'
    };

    let lineStartX = turnedOn ? cx : cx - line / 2;
    let lineEndX = turnedOn ? cx : cx + line / 2;
    let lineStartY = turnedOn ? cy - line / 2 : cy;
    let lineEndY = turnedOn ? cy + line / 2 : cy;
    let color = props.operational? turnedOn ? 'red' : 'green' : 'gray';

    let menuCoordX = coordX;
    let menuCoordY = coordY + side;

    return (

        <svg>
            {props.posterPower &&
            <image href={nvrl} x={coordX + side * 1.5} y={coordY} width={side * 2}/>
            }
            {props.posterGround &&
            <image href={ground} x={coordX + side * 1.8} y={coordY + side / 2} width={side * 2}/>
            }
            <circle cx={coordX+side/2} cy={cy-side} r={side * 0.35} stroke='black' fillOpacity={0}/>
            <rect x={coordX} y={coordY} width={side} height={side} rx="3" stroke='black' fill={color}/>
            <line x1={lineStartX} y1={lineStartY} x2={lineEndX} y2={lineEndY} stroke="black"/>
            <circle cx={coordX+side/2} cy={cy} r={side*0.4} stroke='black' fillOpacity={0}/>

            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{id}</div>
                        <div className='text-left'>Положение: {props.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                        <div className='text-left'>ШУ: {props.operational ? 'Включено' : 'Отключено'}</div>
                    </div>
                </Tooltip>}
            >
            <rect x={coordX} y={coordY} width={side} height={side} rx="3" stroke='black' fill='rgba(255, 255, 255, 0)'
                  onClick={() => showMenu(type, id, menuCoordX, menuCoordY)} style={cursor}
            />
            </OverlayTrigger>


        </svg>
    )
};

export default Switcher35;
