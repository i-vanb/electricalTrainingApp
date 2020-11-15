import React from "react";
import ground from '../img/ground.jpg';
import nvrl from '../img/nvrl.jpg';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const Disconnectors35 = (props) => {
    let {x, y, turnedOn, id, type, showMenu, table, groundIn, groundOut, contacts} = props;
    let side = table.canvasWidth / 60;
    let coordX = table.stepWidth * x - table.stepWidth / 2 - side / 2;
    let coordY = table.stepHeight * y - table.stepHeight / 2 - side / 2;
    let cx = coordX + side / 2;
    let cy = coordY + side / 2;
    let line = side * 0.7;

    let lineStartX = turnedOn ? cx : cx;
    let lineEndX = turnedOn ? cx : cx + side / 2;
    let lineStartY = cy + side / 2;
    let lineEndY = turnedOn ? cy - line / 2 : cy - line / 2;
    let color = 'rgba(25, 25, 25, 0)';
    let coloredInOn = props.settings.color? contacts.in.poweredOn? 'red' : 'rgb(15,106,15)' : 'black';
    let coloredOutOn = props.settings.color? contacts.out.poweredOn? 'red' : 'rgb(15,106,15)' : 'black';



    let cursor = {
        cursor: 'pointer'
    };

    let menuCoordX = cx;
    let menuCoordY = coordY + side;

    return (
        <svg>
            {props.posterPower &&
            <image href={nvrl} x={coordX + side * 1.2} y={coordY} width={side * 2}/>
            }
            {props.posterGround &&
            <image href={ground} x={coordX + side * 1.5} y={coordY + side / 2} width={side * 2}/>
            }
            <line x1={cx - line / 4} y1={cy - side / 2} x2={cx + line / 4} y2={cy - side / 2} stroke='black'/>
            <line x1={cx} y1={cy - side / 2} x2={cx} y2={cy - side*2} stroke={coloredInOn}/>

            <circle cx={cx} cy={cy - side} r={side * 0.1} fill='black'/>
            <circle cx={cx} cy={cy + side} r={side * 0.1} fill='black'/>
            <line x1={cx} y1={cy + side / 2} x2={cx} y2={cy + side / 2 + table.stepHeight * 0.8} stroke={coloredOutOn}/>
            <line x1={lineStartX} y1={lineStartY} x2={lineEndX} y2={lineEndY} stroke="black"/>
            <circle cx={cx} cy={cy + side / 2} r={side * 0.2} stroke='black' fill='white'/>
            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{id}</div>
                        <div className='text-left'>Состояние: {props.checkedCondition ? 'Проверено' : 'Не проверено'}</div>
                        <div className='text-left'>Положение: {props.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                    </div>
                </Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu(type, id, menuCoordX, menuCoordY)} x={coordX} y={coordY} width={side}
                      height={side} rx="3" fill={color}/>
            </OverlayTrigger>

            {/* GROUND 1*/}
            <line x1={cx} y1={cy - side} x2={cx - line * 2} y2={cy - side} stroke='black'/>
            <line x1={cx - line * 2} y1={cy - side - line / 4} x2={cx - line * 2} y2={cy - side + line / 4}
                  stroke='black'/>
            <circle cx={cx - line * 2 - side} cy={cy - side} r={side * 0.1} stroke='black' fill='black'/>
            <line x1={cx - line * 2 - side} y1={cy - side} x2={cx - line * 2 - side - line} y2={cy - side}
                  stroke='black'/>
            <line x1={cx - line * 2 - side - line} y1={cy - side - line / 2} x2={cx - line * 2 - side - line}
                  y2={cy - side + line / 2} stroke='black'/>
            <line x1={cx - line * 2 - side - line - 3} y1={cy - side - line / 3} x2={cx - line * 2 - side - line - 3}
                  y2={cy - side + line / 3} stroke='black'/>
            <line x1={cx - line * 2 - side - line - 6} y1={cy - side - line / 4} x2={cx - line * 2 - side - line - 6}
                  y2={cy - side + line / 4} stroke='black'/>

            <line x1={cx - line * 2 - side} y1={cy - side} x2={cx - line * 2 - side / 2 + line / 2}
                  y2={groundIn.turnedOn ? cy - side : cy - side - side / 2} stroke='black'/>

            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{groundIn.id}</div>
                        <div className='text-left'>Положение: {props.groundIn.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                    </div>
                </Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('groundDisconnector35', groundIn.id, cx - line * 2 - side, cy - side / 2)}
                      x={cx - line * 2 - side} y={cy - side - side / 2} width={side} height={side} rx="3" fill={color}/>

            </OverlayTrigger>

            {/* GROUND 2*/}
            <line x1={cx} y1={cy + side} x2={cx - line * 2} y2={cy + side} stroke='black'/>
            <line x1={cx - line * 2} y1={cy + side - line / 4} x2={cx - line * 2} y2={cy + side + line / 4}
                  stroke='black'/>
            <circle cx={cx - line * 2 - side} cy={cy + side} r={side * 0.1} stroke='black' fill='black'/>
            <line x1={cx - line * 2 - side} y1={cy + side} x2={cx - line * 2 - side - line} y2={cy + side}
                  stroke='black'/>
            <line x1={cx - line * 2 - side - line} y1={cy + side - line / 2} x2={cx - line * 2 - side - line}
                  y2={cy + side + line / 2} stroke='black'/>
            <line x1={cx - line * 2 - side - line - 3} y1={cy + side - line / 3} x2={cx - line * 2 - side - line - 3}
                  y2={cy + side + line / 3} stroke='black'/>
            <line x1={cx - line * 2 - side - line - 6} y1={cy + side - line / 4} x2={cx - line * 2 - side - line - 6}
                  y2={cy + side + line / 4} stroke='black'/>
            <line x1={cx - line * 2 - side} y1={cy + side} x2={cx - line * 2 - side / 2 + line / 2}
                  y2={groundOut.turnedOn ? cy + side : cy + side - side / 2} stroke='black'/>

            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{groundOut.id}</div>
                        <div className='text-left'>Положение: {props.groundOut.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                    </div>
                </Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('groundDisconnector35', groundOut.id, cx - line * 2 - side, cy + side / 2 + side)}
                      x={cx - line * 2 - side} y={cy + side - side / 2} width={side} height={side} rx="3" fill={color}/>
            </OverlayTrigger>

            {/*Contacts*/}
            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>Контакты {contacts.in.id}</Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('contacts', contacts.in.id, cx - line * 2, cy - side / 2)}
                      x={cx - line * 2} y={cy - side - side / 2} width={side * 1.7} height={side} rx="3" fill={color}/>
            </OverlayTrigger>

            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>Контакты {contacts.out.id}</Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('contacts', contacts.out.id, cx - line * 2, cy + side / 2 + side)}
                      x={cx - line * 2} y={cy + side - side / 2} width={side * 1.7} height={side} rx="3" fill={color}/>
            </OverlayTrigger>

        </svg>
    )
};

export default Disconnectors35;
