import React from "react";
import ground from '../img/ground.jpg';
import nvrl from '../img/nvrl.jpg';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const Section35 = (props) => {
    let {showMenu, table, settings} = props;
    let {sectionDisconnector1, sectionDisconnector2, sectionSwitcher35} = props.state;

    let cursor = {
        cursor: 'pointer'
    };

    let side = table.canvasWidth / 60;
    let line = side * 0.6;

    let x = table.stepWidth;
    let y = table.stepHeight;

    let cx1 = table.stepWidth * 5 + table.stepWidth / 2 - side / 2;
    let cx2 = table.stepWidth * 3 + table.stepWidth / 2 + side / 2;
    let cxM = table.stepWidth * 4 + table.stepWidth / 2;
    let cy = table.stepHeight * 2.5;

    let color = 'rgba(25, 25, 25, 0)';
    let colS1 = settings.color? sectionDisconnector1.contacts.in.poweredOn? 'red' : 'rgb(15,106,15)' : 'black';
    let colS2 = settings.color? sectionDisconnector2.contacts.in.poweredOn? 'red' : 'rgb(15,106,15)' : 'black';
    let colMS1 = settings.color? sectionDisconnector1.contacts.out.poweredOn? 'red' : 'rgb(15,106,15)' : 'black';
    let colMS2 = settings.color? sectionDisconnector2.contacts.out.poweredOn? 'red' : 'rgb(15,106,15)' : 'black';


    return (
        <svg>
            <line x1={x + x / 2} y1={cy} x2={x * 3 + x / 2} y2={cy} stroke={colS2}/>
            <line x1={x * 7 + x / 2} y1={cy} x2={x * 6 - x / 2} y2={cy} stroke={colS1}/>
            <line x1={x * 3 + x / 2 + side} y1={cy} x2={cxM} y2={cy} stroke={colMS2}/>
            <line x1={cxM} y1={cy} x2={x * 6 - x / 2 - side} y2={cy} stroke={colMS1}/>
            <circle cx={x + x / 2} cy={cy} r={side * 0.1} fill={colS2}/>
            <circle cx={x * 2 + x / 2} cy={cy} r={side * 0.1} fill={colS2}/>
            <circle cx={x * 6 + x / 2} cy={cy} r={side * 0.1} fill={colS1}/>
            <circle cx={x * 7 + x / 2} cy={cy} r={side * 0.1} fill={colS1}/>
            <circle cx={cxM + side} cy={cy} r={side * 0.35} stroke='black' fillOpacity={0}/>

            <line x1={x + x / 2} y1={cy} x2={x + x / 2} y2={cy - y / 2} stroke={colS2}/>
            <line x1={x * 2 + x / 2} y1={cy} x2={x * 2 + x / 2} y2={cy - y / 2} stroke={colS2}/>
            <line x1={x * 6 + x / 2} y1={cy} x2={x * 6 + x / 2} y2={cy - y / 2} stroke={colS1}/>
            <line x1={x * 7 + x / 2} y1={cy} x2={x * 7 + x / 2} y2={cy - y / 2} stroke={colS1}/>

            <line x1={x * 2 + x / 2} y1={cy} x2={x * 2 + x / 2} y2={y*4-y/2-side*2} stroke={colS2}/>
            <line x1={x * 6 + x / 2} y1={cy} x2={x * 6 + x / 2} y2={y*4-y/2-side*2} stroke={colS1}/>


            {/*switcher35*/}
            {sectionSwitcher35.posterPower &&
            <image href={nvrl} x={cxM - side} y={cy + side} width={side * 2}/>
            }
            {sectionSwitcher35.posterGround &&
            <image href={ground} x={cxM - side * 0.7} y={cy + side * 1.5} width={side * 2}/>
            }
            <rect style={cursor}
                  x={cxM - side / 2} y={cy - side / 2} width={side} height={side} rx="3" stroke='black'
                  fill={sectionSwitcher35.operational ? sectionSwitcher35.turnedOn ? 'red' : 'green' : 'gray'}/>
            <circle cx={cxM} cy={cy} r={side * 0.4} stroke='black' fillOpacity={0}/>

            {sectionSwitcher35.turnedOn ?
                <line x1={cxM - line / 2} y1={cy} x2={cxM + line / 2} y2={cy} stroke='black'/>
                :
                <line x1={cxM} y1={cy - line / 2} x2={cxM} y2={cy + line / 2} stroke='black'/>
            }
            <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{sectionSwitcher35.id}</div>
                        <div className='text-left'>Положение: {sectionSwitcher35.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                    </div>
                </Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('sectionSwitcher35', sectionSwitcher35.id, cxM - side / 2, cy + side / 2)}
                      x={cxM - side / 2} y={cy - side / 2} width={side} height={side} rx="3" stroke='black'
                      fill='rgba(255, 255, 255, 0)'/>
            </OverlayTrigger>

            {/* dc1 */}
            {sectionDisconnector1.posterPower &&
            <image href={nvrl} x={cx1 + side * 0.2} y={cy - side * 2} width={side * 2}/>
            }
            {sectionDisconnector1.posterGround &&
            <image href={ground} x={cx1 + side / 2} y={cy - side * 1.5} width={side * 2}/>
            }

            <line x1={cx1 - side / 2} y1={cy} x2={cx1 + line / 2}
                  y2={sectionDisconnector1.turnedOn ? cy : cy - side / 2} stroke='black'/>
            <line x1={cx1 + side / 2} y1={cy - line / 4} x2={cx1 + side / 2} y2={cy + line / 4} stroke='black'/>
            <circle cx={cx1 - side / 2} cy={cy} r={side * 0.2} stroke='black' fill='white'/>
            <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{sectionDisconnector1.id}</div>
                        <div className='text-left'>Положение: {sectionDisconnector1.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                        <div className='text-left'>Состояние: {sectionDisconnector1.checkedCondition ? 'Проверено' : 'Не проверено'}</div>
                    </div>
                </Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('sectionDisconnector35', sectionDisconnector1.id, cx1 - side / 2, cy + side / 2)}
                      x={cx1 - side / 2} y={cy - side / 2} width={side} height={side} rx="3"
                      fill={color}/>
            </OverlayTrigger>

            {/* dc2 */}
            {sectionDisconnector2.posterPower &&
            <image href={nvrl} x={cx2 + side * 0.2} y={cy - side * 2} width={side * 2}/>
            }
            {sectionDisconnector2.posterGround &&
            <image href={ground} x={cx2 + side / 2} y={cy - side * 1.5} width={side * 2}/>
            }
            <line x1={cx2 + side / 2} y1={cy} x2={cx2 - line / 2}
                  y2={sectionDisconnector2.turnedOn ? cy : cy - side / 2} stroke='black'/>
            <line x1={cx2 - side / 2} y1={cy - line / 4} x2={cx2 - side / 2} y2={cy + line / 4} stroke='black'/>
            <circle cx={cx2 + side / 2} cy={cy} r={side * 0.2} stroke='black' fill='white'/>
            <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{sectionDisconnector2.id}</div>
                        <div className='text-left'>Положение: {sectionDisconnector2.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                        <div className='text-left'>Состояние: {sectionDisconnector2.checkedCondition ? 'Проверено' : 'Не проверено'}</div>
                    </div>
                </Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('sectionDisconnector35', sectionDisconnector2.id, cx2 - side / 2, cy + side / 2)}
                      x={cx2 - side / 2} y={cy - side / 2} width={side} height={side} rx="3"
                      fill={color}/>
            </OverlayTrigger>
            {/*GROUND dc1*/}
            {/*out*/}
            <circle cx={cx1 - side} cy={cy} r={side * 0.1} fill='black'/>
            <line x1={cx1 - side} y1={cy} x2={cx1 - side} y2={cy + line * 2} stroke='black'/>
            <line x1={cx1 - side - line / 4} y1={cy + line * 2} x2={cx1 - side + line / 4} y2={cy + line * 2}
                  stroke='black'/>
            {sectionDisconnector1.groundOut.turnedOn ?
                <line x1={cx1 - side} y1={cy + line * 2 + side}
                      x2={cx1 - side} y2={cy + line * 2 + side / 2 - line / 2} stroke='black'/>
                :
                <line x1={cx1 - side} y1={cy + line * 2 + side}
                      x2={cx1 - side - side / 2} y2={cy + line * 2 + side / 2 - line / 2} stroke='black'/>
            }
            <circle cx={cx1 - side} cy={cy + line * 2 + side} r={side * 0.1} stroke='black' fill='black'/>
            <line x1={cx1 - side} y1={cy + line * 2 + side}
                  x2={cx1 - side} y2={cy + line * 2 + side + line} stroke='black'/>
            <line x1={cx1 - side - line / 2} y1={cy + line * 2 + side + line}
                  x2={cx1 - side + line / 2} y2={cy + line * 2 + side + line} stroke='black'/>
            <line x1={cx1 - side - line / 3} y1={cy + line * 2 + side + line + 3}
                  x2={cx1 - side + line / 3} y2={cy + line * 2 + side + line + 3} stroke='black'/>
            <line x1={cx1 - side - line / 4} y1={cy + line * 2 + side + line + 6}
                  x2={cx1 - side + line / 4} y2={cy + line * 2 + side + line + 6} stroke='black'/>
            <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{sectionDisconnector1.groundOut.id}</div>
                        <div className='text-left'>Положение: {sectionDisconnector1.groundOut.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                    </div>
                </Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('groundSectionDisconnector35', sectionDisconnector1.groundOut.id, cx1 - side - side / 2, cy + line * 2 + side)}
                      x={cx1 - side - side / 2} y={cy + line * 2} width={side} height={side} rx="3"
                      fill={color}/>
            </OverlayTrigger>

            {/*in*/}
            <circle cx={cx1 + side} cy={cy} r={side * 0.1} fill='black'/>
            <line x1={cx1 + side} y1={cy} x2={cx1 + side} y2={cy + line * 2}
                  stroke='black'/>
            <line x1={cx1 + side - line / 4} y1={cy + line * 2}
                  x2={cx1 + side + line / 4} y2={cy + line * 2} stroke='black'/>
            {sectionDisconnector1.groundIn.turnedOn ?
                <line x1={cx1 + side} y1={cy + line * 2 + side}
                      x2={cx1 + side} y2={cy + line * 2 + side / 2 - line / 2} stroke='black'/>
                :
                <line x1={cx1 + side} y1={cy + line * 2 + side}
                      x2={cx1 + side / 2} y2={cy + line * 2 + side / 2 - line / 2} stroke='black'/>
            }
            <circle cx={cx1 + side} cy={cy + line * 2 + side} r={side * 0.1} stroke='black' fill='black'/>
            <line x1={cx1 + side} y1={cy + line * 2 + side}
                  x2={cx1 + side} y2={cy + line * 2 + side + line} stroke='black'/>
            <line x1={cx1 + side - line / 2} y1={cy + line * 2 + side + line}
                  x2={cx1 + side + line / 2} y2={cy + line * 2 + side + line} stroke='black'/>
            <line x1={cx1 + side - line / 3} y1={cy + line * 2 + side + line + 3}
                  x2={cx1 + side + line / 3} y2={cy + line * 2 + side + line + 3} stroke='black'/>
            <line x1={cx1 + side - line / 4} y1={cy + line * 2 + side + line + 6}
                  x2={cx1 + side + line / 4} y2={cy + line * 2 + side + line + 6} stroke='black'/>
            <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{sectionDisconnector1.groundIn.id}</div>
                        <div className='text-left'>Положение: {sectionDisconnector1.groundIn.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                    </div>
                </Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('groundSectionDisconnector35', sectionDisconnector1.groundIn.id, cx1 + side / 2, cy + line * 2 + side)}
                      x={cx1 + side / 2} y={cy + line * 2} width={side} height={side} rx="3"
                      fill={color}/>
            </OverlayTrigger>

            {/* contacts */}
            <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='tooltip-top'>{sectionDisconnector1.contacts.out.id}</Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('contacts', sectionDisconnector1.contacts.out.id, cx2 + side / 2, cy + side)}
                      x={cx1 + side / 2} y={cy - side / 3} width={side} height={side * 1.5} rx="3"
                      fill={color}/>
            </OverlayTrigger>
            <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='tooltip-top'>{sectionDisconnector1.contacts.in.id}</Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('contacts', sectionDisconnector1.contacts.in.id, cx2 - side - side / 2, cy + side)}
                      x={cx1 - side - side / 2} y={cy - side / 3} width={side} height={side * 1.5} rx="3"
                      fill={color}/>
            </OverlayTrigger>



            {/* GROUND 2*/}
            {/*in*/}
            <circle cx={cx2 - side} cy={cy} r={side * 0.1} fill='black'/>
            <line x1={cx2 - side} y1={cy} x2={cx2 - side}
                  y2={cy + line * 2} stroke='black'/>
            <line x1={cx2 - side - line / 4} y1={cy + line * 2}
                  x2={cx2 - side + line / 4} y2={cy + line * 2} stroke='black'/>
            {sectionDisconnector2.groundIn.turnedOn ?
                <line x1={cx2 - side} y1={cy + line * 2 + side}
                      x2={cx2 - side} y2={cy + line * 2 + side / 2 - line / 2} stroke='black'/>
                :
                <line x1={cx2 - side} y1={cy + line * 2 + side}
                      x2={cx2 - side - side / 2} y2={cy + line * 2 + side / 2 - line / 2} stroke='black'/>
            }
            <circle cx={cx2 - side} cy={cy + line * 2 + side} r={side * 0.1} stroke='black' fill='black'/>
            <line x1={cx2 - side} y1={cy + line * 2 + side}
                  x2={cx2 - side} y2={cy + line * 2 + side + line} stroke='black'/>
            <line x1={cx2 - side - line / 2} y1={cy + line * 2 + side + line}
                  x2={cx2 - side + line / 2} y2={cy + line * 2 + side + line} stroke='black'/>
            <line x1={cx2 - side - line / 3} y1={cy + line * 2 + side + line + 3}
                  x2={cx2 - side + line / 3} y2={cy + line * 2 + side + line + 3} stroke='black'/>
            <line x1={cx2 - side - line / 4} y1={cy + line * 2 + side + line + 6}
                  x2={cx2 - side + line / 4} y2={cy + line * 2 + side + line + 6} stroke='black'/>
            <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{sectionDisconnector2.groundIn.id}</div>
                        <div className='text-left'>Положение: {sectionDisconnector2.groundIn.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                    </div>
                </Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('groundSectionDisconnector35', sectionDisconnector2.groundIn.id, cx2 - side - side / 2, cy + line * 2 + side)}
                      x={cx2 - side - side / 2} y={cy + line * 2} width={side} height={side} rx="3"
                      fill={color}/>
            </OverlayTrigger>
            {/*out*/}
            <circle cx={cx2 + side} cy={cy} r={side * 0.1} fill='black'/>
            <line x1={cx2 + side} y1={cy} x2={cx2 + side}
                  y2={cy + line * 2} stroke='black'/>
            <line x1={cx2 + side - line / 4} y1={cy + line * 2}
                  x2={cx2 + side + line / 4} y2={cy + line * 2} stroke='black'/>
            {sectionDisconnector2.groundOut.turnedOn ?
                <line x1={cx2 + side} y1={cy + line * 2 + side}
                      x2={cx2 + side} y2={cy + line * 2 + side / 2 - line / 2} stroke='black'/>
                :
                <line x1={cx2 + side} y1={cy + line * 2 + side}
                      x2={cx2 + side / 2} y2={cy + line * 2 + side / 2 - line / 2} stroke='black'/>
            }
            <circle cx={cx2 + side} cy={cy + line * 2 + side} r={side * 0.1} stroke='black' fill='black'/>
            <line x1={cx2 + side} y1={cy + line * 2 + side}
                  x2={cx2 + side} y2={cy + line * 2 + side + line} stroke='black'/>
            <line x1={cx2 + side - line / 2} y1={cy + line * 2 + side + line}
                  x2={cx2 + side + line / 2} y2={cy + line * 2 + side + line} stroke='black'/>
            <line x1={cx2 + side - line / 3} y1={cy + line * 2 + side + line + 3}
                  x2={cx2 + side + line / 3} y2={cy + line * 2 + side + line + 3} stroke='black'/>
            <line x1={cx2 + side - line / 4} y1={cy + line * 2 + side + line + 6}
                  x2={cx2 + side + line / 4} y2={cy + line * 2 + side + line + 6} stroke='black'/>
            <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{sectionDisconnector2.groundOut.id}</div>
                        <div className='text-left'>Положение: {sectionDisconnector2.groundOut.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                    </div>
                </Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('groundSectionDisconnector35', sectionDisconnector2.groundOut.id, cx2 + side / 2, cy + line * 2 + side)}
                      x={cx2 + side / 2} y={cy + line * 2} width={side} height={side} rx="3"
                      fill={color}/>
            </OverlayTrigger>
            {/* contacts */}
            <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='tooltip-top'>{sectionDisconnector2.contacts.out.id}</Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('contacts', sectionDisconnector2.contacts.out.id, cx2 + side / 2, cy + side)}
                      x={cx2 + side / 2} y={cy - side / 3} width={side} height={side * 1.5} rx="3"
                      fill={color}/>
            </OverlayTrigger>
            <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='tooltip-top'>{sectionDisconnector2.contacts.in.id}</Tooltip>}
            >
                <rect style={cursor}
                      onClick={() => showMenu('contacts', sectionDisconnector2.contacts.in.id, cx2 - side - side / 2, cy + side)}
                      x={cx2 - side - side / 2} y={cy - side / 3} width={side} height={side * 1.5} rx="3"
                      fill={color}/>
            </OverlayTrigger>

        </svg>
    )
};

export default Section35;
