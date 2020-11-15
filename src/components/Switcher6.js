import React from "react";
import ground from '../img/ground.jpg';
import nvrl from '../img/nvrl.jpg';
import {OverlayTrigger, Tooltip} from "react-bootstrap";


const Switcher6 = (props) => {
    let {x, y, turnedOn, id, type, showMenu, table, groundOn, groundId, settings} = props;
    let side = table.canvasWidth / 70;
    let coordX = table.stepWidth / 3 * x;
    let coordY = table.stepHeight * y - table.stepHeight / 2 - side / 2;
    let cx = coordX + side / 2;
    let cy = coordY + side / 2;
    let line = side * 0.6;

    let lineStartX = turnedOn ? cx : cx - line / 2;
    let lineEndX = turnedOn ? cx : cx + line / 2;
    let lineStartY = turnedOn ? cy - line / 2 : cy;
    let lineEndY = turnedOn ? cy + line / 2 : cy;

    let color = props.positioning==='remove' ?'gray':turnedOn ? 'red' : 'green';
    let colorOn = settings.color? props.contacts.poweredOn ?  'red' : 'rgb(15,106,15)' : 'black';



    let menuCoordX = coordX;
    let menuCoordY = coordY + side;
    let menuGroundX = cx + line;
    let cursor = {
        cursor: 'pointer'
    };

    return (

        <svg>
            {/*{contacts(props.positioning)}*/}
            {props.posterPower &&
            <image href={nvrl} x={coordX + side * 1.5} y={coordY} width={side * 2}/>
            }
            {props.posterGround &&
            <image href={ground} x={coordX + side * 1.8} y={coordY + side / 2} width={side * 2}/>
            }
            <rect x={coordX} y={coordY} width={side} height={side} rx="2" stroke='black'
                  fill={props.operational ? color : 'gray'}/>
            <line x1={lineStartX} y1={lineStartY} x2={lineEndX} y2={lineEndY} stroke="black"/>
            <circle cx={cx} cy={cy} r={side*0.4} stroke='black' fillOpacity={0}/>

            {props.positioning === 'working'?
                <svg>
                    <line x1={cx} y1={cy - side / 2} x2={cx} y2={cy - side / 2 - side} stroke='black'/>
                    <line x1={cx} y1={cy - side / 2 - side} x2={cx - side / 2} y2={cy - side} stroke='black'/>
                    <line x1={cx} y1={cy - side / 2 - side} x2={cx + side / 2} y2={cy - side} stroke='black'/>
                    <line x1={cx} y1={cy + side / 2} x2={cx} y2={cy + side / 2 + side} stroke='black'/>
                    <line x1={cx} y1={cy + side / 2 + side} x2={cx - side / 2} y2={cy + side} stroke='black'/>
                    <line x1={cx} y1={cy + side / 2 + side} x2={cx + side / 2} y2={cy + side} stroke='black'/>
                </svg>:null}


            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{id}</div>
                        <div className='text-left'>Положение: {props.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                        <div className='text-left'>ШУ: {props.operational ? 'Включено' : 'Отключено'}</div>
                        <div className='text-left'>Ток: {props.checkedCurrent ? 'Проверен' : 'Не проверен'}</div>
                    </div>
                </Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu(type, id, menuCoordX, menuCoordY)}
                      x={coordX} y={coordY - side} width={side} height={3 * side} rx="2" fill='rgba(25, 25, 25, 0)'/>

            </OverlayTrigger>

            {/*section*/}
            <line x1={cx} y1={cy - side / 2 - side - line / 2} x2={cx - side / 2} y2={cy - side - line / 2}
                  stroke='black'/>
            <line x1={cx} y1={cy - side / 2 - side - line / 2} x2={cx + side / 2} y2={cy - side - line / 2}
                  stroke='black'/>
            <line x1={cx} y1={cy - side - side / 2 - line / 2} x2={cx} y2={table.stepHeight * 8 - table.stepHeight / 3}
                  stroke='black'/>
            {/*<circle cx={cx} cy={cy - side - side / 2 - line/2 - side} r={side * 0.2} fill='white'/>*/}


            {/*out and ground*/}
            <line x1={cx} y1={cy + side / 2 + side + line / 2} x2={cx - side / 2} y2={cy + side + line / 2}
                  stroke='black'/>
            <line x1={cx} y1={cy + side / 2 + side + line / 2} x2={cx + side / 2} y2={cy + side + line / 2}
                  stroke='black'/>
            <line x1={cx} y1={cy + side / 2 + side + line / 2} x2={cx} y2={table.canvasHeight - side}
                  stroke={colorOn}/>
            <circle cx={cx} cy={cy + side / 2 + side + line / 2 + line} r={side * 0.15} fill='black'/>
            <line x1={cx} y1={cy + side / 2 + side + line / 2 + line} x2={cx + line}
                  y2={cy + side / 2 + side + line / 2 + line}
                  stroke='black'/>
            <line x1={cx + line} y1={cy + side / 2 + side + line / 2 + line / 1.5} x2={cx + line}
                  y2={cy + side / 2 + side + line / 2 + line + line / 3} stroke='black'/>
            {groundOn ?
                <line x1={cx + line + side} y1={cy + side / 2 + side + line / 2 + line} x2={cx + line + side / 5}
                      y2={cy + side / 2 + side + line / 2 + line} stroke='black'/>
                :
                < line x1={cx + line + side} y1={cy + side / 2 + side + line / 2 + line} x2={cx + line + side / 5}
                       y2={cy + side / 2 + side / 2 + line / 2 + line} stroke='black'/>
            }


            <circle cx={cx + line + side} cy={cy + side / 2 + side + line / 2 + line} r={side * 0.15} fill='black'/>
            <line x1={cx + line + side} y1={cy + side / 2 + side + line / 2 + line} x2={cx + line * 2 + side}
                  y2={cy + side / 2 + side + line / 2 + line} stroke='black'/>
            <line x1={cx + line * 2 + side} y1={cy + side / 2 + side + line / 2 + line / 2} x2={cx + line * 2 + side}
                  y2={cy + side / 2 + side + line / 2 + line + line / 2} stroke='black'/>
            <line x1={cx + line * 2 + side + 3} y1={cy + side / 2 + side + line / 2 + line - line / 3}
                  x2={cx + line * 2 + side + 3} y2={cy + side / 2 + side + line / 2 + line + line / 3} stroke='black'/>
            <line x1={cx + line * 2 + side + 6} y1={cy + side / 2 + side + line / 2 + line - line / 4}
                  x2={cx + line * 2 + side + 6} y2={cy + side / 2 + side + line / 2 + line + line / 4} stroke='black'/>
            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>{groundId}</Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('groundSwitchers6', groundId, menuGroundX, cy + line / 2 + line)}
                      x={cx + line} y={cy + side + line / 2 + line} width={side} height={side} rx="3"
                      fill='rgba(25, 25, 25, 0)'/>
            </OverlayTrigger>

            {/* contacts */}
            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>{props.contacts.id}</Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('contacts', props.contacts.id, cx-side/2, cy + side*2)}
                      x={cx-side/2} y={cy + side + line} width={side} height={side*1.5} rx="3"
                      fill='rgba(25, 25, 25, 0)'/>
            </OverlayTrigger>
        </svg>
    )
};

export default Switcher6;
