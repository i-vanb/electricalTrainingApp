import React from "react";
import ground from '../img/ground.jpg';
import nvrl from '../img/nvrl.jpg';
import {OverlayTrigger, Tooltip} from "react-bootstrap";


const Tsn = (props) => {
    let {x, turnedOn, table, showMenu, type, id, settings} = props;
    let side = table.canvasWidth / 70;
    let coordX = table.stepWidth / 3 * x;
    let cx = coordX + side / 2;
    let y = table.stepHeight*8 - table.stepHeight/3 - side*2;
    let line = side * 0.7;
    let xEnd = turnedOn?cx:cx-side/2;
    let cursor = {
        cursor: 'pointer'
    };
    let colorOnBefore = settings.color? props.sectionPoweredOn?  'red' : 'rgb(15,106,15)' : 'black';
    let colorOn = settings.color? props.poweredOn?  'red' : 'rgb(15,106,15)' : 'black';

    // let colorOnTsn1 = props.switchers6[0].contacts.poweredOn?  'red' : 'rgb(15,106,15)';
    // let colorOnTsn2 = props.switchers6[1].contacts.poweredOn?  'red' : 'rgb(15,106,15)';

    return (

        <svg>
            {props.posterPower &&
            <image href={nvrl} x={coordX+side} y={y-side*2} width={side*2}/>
            }
            {props.posterGround &&
                <image href={ground} x={coordX+side*1.3} y={y+side/2-side*2} width={side*2}/>
}
            {props.sn.posterPower &&
            <image href={nvrl} x={coordX+side*2} y={y-side*6} width={side*2}/>
            }
            {props.sn.posterGround &&
            <image href={ground} x={coordX+side*2.3} y={y+side/2-side*6} width={side*2}/>
            }

            <circle cx={cx} cy={y} r={side * 0.15} fill={colorOnBefore}/>
            <line x1={cx} y1={y} x2={cx} y2={y-side} stroke={colorOnBefore} />
            <line x1={cx-line/4} y1={y-side} x2={cx+line/4} y2={y-side} stroke='black' />
            <line x1={cx} y1={y-side*2} x2={cx} y2={y-side*5} stroke={colorOn} />
            <line x1={cx} y1={y-side*2} x2={xEnd} y2={y-side*2+side/2+line/2} stroke='black' />
            <rect x={cx-side/4} y={y-side*4} height={side*1.5} width={side/4*2} stroke='black' fillOpacity='0'/>
            <circle cx={cx} cy={y-side*2} r={side * 0.15} stroke='black' fill='white'/>
            <circle cx={cx} cy={y-side*5} r={side/1.3} stroke='black' fill='white'/>
            <circle cx={cx} cy={y-side*6} r={side/1.3} stroke='black' fill='none'/>

            <line x1={cx} y1={y-side*5+side/4} x2={cx-side/4} y2={y-side*5} stroke={colorOn} />
            <line x1={cx} y1={y-side*5+side/4} x2={cx+side/4} y2={y-side*5} stroke={colorOn} />
            <line x1={cx} y1={y-side*5+side/4} x2={cx} y2={y-side*5+side/2} stroke={colorOn} />

            <line x1={cx} y1={y-side*6-side/4} x2={cx-side/4} y2={y-side*6-side/2} stroke={colorOn} />
            <line x1={cx} y1={y-side*6-side/4} x2={cx+side/4} y2={y-side*6-side/2} stroke={colorOn} />
            <line x1={cx} y1={y-side*6-side/4} x2={cx} y2={y-side*6} stroke={colorOn} />

            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{`ШР-6кВ ${id}`}</div>
                        <div className='text-left'>Положение: {props.checkedPosition ? 'Проверено' : 'Не проверено'}</div>
                        <div className='text-left'>Состояние: {props.checkedCondition ? 'Проверено' : 'Не проверено'}</div>
                    </div>
                    </Tooltip>}
            >
            <rect style={cursor}
                onClick={() => showMenu(type, `ШР-6кВ ${id}`, cx-side/2, y-side)}
                x={cx-side/2} y={y-side*2} width={side} height={side} fill='rgba(25, 25, 25, 0)'/>
            </OverlayTrigger>

            <OverlayTrigger
                placement='auto'
                overlay={<Tooltip id='tooltip-top'>
                    <div className='list-group small'>
                        <div>{id}</div>
                        <div className='text-left'>Положение АВ: {props.sn.turnedOn ? 'Включен' : 'Отключен'}</div>
                    </div>
                </Tooltip>}
            >
                <svg style={cursor} onClick={() => showMenu('sn', id, cx, y-side*4)}>
                    <circle cx={cx} cy={y-side*5} r={side/1.3} stroke='none' fill='rgba(25, 25, 25, 0)'/>
                    <circle cx={cx} cy={y-side*6} r={side/1.3} stroke='none' fill='rgba(25, 25, 25, 0)'/>
                </svg>
            </OverlayTrigger>
        </svg>

    )
};

export default Tsn;
