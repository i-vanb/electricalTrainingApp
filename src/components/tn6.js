import React from "react";
import ground from '../img/ground.jpg';
import nvrl from '../img/nvrl.jpg';
import {OverlayTrigger, Tooltip} from "react-bootstrap";


const TN = (props) => {
    let {x, y, turnedOn, id, type, showMenu, table, groundOn, groundId} = props;
    let side = table.canvasWidth / 70;
    let cx = table.stepWidth / 3 * x + side / 2;
    let cy = table.stepHeight * y - table.stepHeight / 3;
    let line = side * 0.7;

    let cursor = {
        cursor: 'pointer'
    };

    return (

        <svg>
            {props.posterPower &&
            <image href={nvrl} x={cx + side * 1.3} y={cy + side * 6} width={side * 2}/>
            }
            {props.posterGround &&
            <image href={ground} x={cx + side * 1.6} y={cy + side * 6 + side / 2} width={side * 2}/>
            }
            <line x1={cx} y1={cy} x2={cx} y2={cy + side * 1.5}
                  stroke='black'/>
            <line x1={cx} y1={cy + side * 1.5} x2={cx - side / 2} y2={cy + side * 1.5 + side / 2}
                  stroke='black'/>
            <line x1={cx} y1={cy + side * 1.5} x2={cx + side / 2} y2={cy + side * 1.5 + side / 2}
                  stroke='black'/>

            {turnedOn ?
                <svg>
                    <line x1={cx} y1={cy + side * 1.5 + line / 2} x2={cx - side / 2}
                          y2={cy + side * 1.5 + side / 2 + line / 2} stroke='black'/>
                    <line x1={cx} y1={cy + side * 1.5 + line / 2} x2={cx + side / 2}
                          y2={cy + side * 1.5 + side / 2 + line / 2} stroke='black'/>
                    <line x1={cx} y1={cy + side * 1.5 + line / 2} x2={cx} y2={cy + side * 3} stroke='black'/>
                </svg>
                : null

            }
            <line x1={cx} y1={cy + side * 3} x2={cx} y2={cy + side * 5} stroke='black'/>
            <rect x={cx - side / 3} y={cy + side * 3} width={side / 3 * 2} height={side * 1.5} stroke='black'
                  fill='none'/>

            <circle cx={cx} cy={cy + side * 5 + side * 0.6} r={side * 0.6} fill='none' stroke='black'/>
            <circle cx={cx - side * 0.5} cy={cy + side * 5 + side * 1.4} r={side * 0.6} fill='none' stroke='black'/>
            <circle cx={cx + side * 0.5} cy={cy + side * 5 + side * 1.4} r={side * 0.6} fill='none' stroke='black'/>

            <line x1={cx} y1={cy + side * 5 + side * 0.6} x2={cx - side / 4} y2={cy + side * 5 + side * 0.6 - side / 4}
                  stroke='black'/>
            <line x1={cx} y1={cy + side * 5 + side * 0.6} x2={cx + side / 4} y2={cy + side * 5 + side * 0.6 - side / 4}
                  stroke='black'/>
            <line x1={cx} y1={cy + side * 5 + side * 0.6} x2={cx} y2={cy + side * 5 + side * 0.6 + side / 4}
                  stroke='black'/>

            <line x1={cx - side * 0.5} y1={cy + side * 5 + side * 1.4} x2={cx - side * 0.5 - side / 4}
                  y2={cy + side * 5 + side * 1.4 - side / 4} stroke='black'/>
            <line x1={cx - side * 0.5} y1={cy + side * 5 + side * 1.4} x2={cx - side * 0.5 + side / 4}
                  y2={cy + side * 5 + side * 1.4 - side / 4} stroke='black'/>
            <line x1={cx - side * 0.5} y1={cy + side * 5 + side * 1.4} x2={cx - side * 0.5}
                  y2={cy + side * 5 + side * 1.4 + side / 4} stroke='black'/>

            <line x1={cx + side * 0.5 - side / 4} y1={cy + side * 5 + side * 1.4 + side / 4} x2={cx + side * 0.5}
                  y2={cy + side * 5 + side * 1.4 - side / 4} stroke='black'/>
            <line x1={cx + side * 0.5} y1={cy + side * 5 + side * 1.4 - side / 4} x2={cx + side * 0.5 + side / 4}
                  y2={cy + side * 5 + side * 1.4 + side / 8} stroke='black'/>
            <line x1={cx + side * 0.5 - side / 4} y1={cy + side * 5 + side * 1.4 + side / 4}
                  x2={cx + side * 0.5 + side / 8} y2={cy + side * 5 + side * 1.4 + side / 4} stroke='black'/>


            <OverlayTrigger
                placement='auto'
                overlay={
                    <Tooltip id='tooltip-top'>
                        <div className='list-group small'>
                            <div>{id}</div>
                            <div className='text-left'>АВ 100В: {props.avTn ? 'Включен' : 'Отключен'}</div>
                            <div className='text-left'>Проверено
                                U: {props.checkedVoltage ? 'Проверено' : 'Не проверено'}</div>
                        </div>
                    </Tooltip>}
            >


                <rect style={cursor}
                      onClick={() => showMenu(type, id, cx - side, cy + side * 5)}
                      x={cx - side} y={cy + side * 5} width={side * 2} height={side * 2} rx="2"
                      fill='rgba(25, 25, 25, 0)'/>
            </OverlayTrigger>

            {/*ground*/}
            <circle cx={cx} cy={cy + side} r={side * 0.15} fill='black'/>
            <line x1={cx} y1={cy + side} x2={cx + side * 2} y2={cy + side} stroke='black'/>
            <line x1={cx + side * 2} y1={cy + side} x2={cx + side * 2} y2={cy + side * 3} stroke='black'/>
            <line x1={cx + side * 2 - line / 3} y1={cy + side * 3} x2={cx + side * 2 + line / 3} y2={cy + side * 3}
                  stroke='black'/>

            {groundOn ?
                <line x1={cx + side * 2} y1={cy + side * 4} x2={cx + side * 2}
                      y2={cy + side * 3 + line / 4} stroke='black'/>
                :
                <line x1={cx + side * 2} y1={cy + side * 4} x2={cx + side * 2 + side / 2}
                      y2={cy + side * 3 + line / 4} stroke='black'/>
            }
            <circle cx={cx + side * 2} cy={cy + side * 4} r={side * 0.15} fill='black'/>
            <line x1={cx + side * 2} y1={cy + side * 4} x2={cx + side * 2}
                  y2={cy + side * 5} stroke='black'/>

            <line x1={cx + side * 2 - side / 2} y1={cy + side * 5} x2={cx + side * 2 + side / 2} y2={cy + side * 5}
                  stroke='black'/>
            <line x1={cx + side * 2 - side / 3} y1={cy + side * 5 + 3}
                  x2={cx + side * 2 + side / 3} y2={cy + side * 5 + 3} stroke='black'/>
            <line x1={cx + side * 2 - side / 5} y1={cy + side * 5 + 6}
                  x2={cx + side * 2 + side / 5} y2={cy + side * 5 + 6} stroke='black'/>
            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>{groundId}</Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('groundTn6', groundId, cx + side * 1.5, cy + side * 3)}
                      x={cx + side * 1.5} y={cy + side * 3} width={side} height={side} rx="3"
                      fill='rgba(25, 25, 25, 0)'/>
            </OverlayTrigger>
        </svg>
    )
};

export default TN;
