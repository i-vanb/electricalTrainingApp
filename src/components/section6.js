import React from "react";

const Section6 = ({table, switchers6, switchers35, tn, settings}) => {
    let side = table.canvasWidth / 70;
    let line = side * 0.7;
    let x = table.stepWidth;
    let y = table.stepHeight;
    let cy = y * 8 - y / 3;

    let side35 = table.canvasWidth / 60;
    let tx1 = x * switchers35[5].x - x / 2;
    let tx2 = x * switchers35[4].x - x / 2;
    let ty1 = y * switchers35[5].y - y / 2 + side35 / 2 + side35;
    let ty2 = y * switchers35[4].y - y / 2 + side35 / 2 + side35;
    let strokeWidth = side * 0.5;

    let colorOnT1 = settings.color? switchers6[0].contacts.poweredOn?  'red' : 'rgb(15,106,15)' : 'black';
    let colorOnT2 = settings.color? switchers6[1].contacts.poweredOn?  'red' : 'rgb(15,106,15)' : 'black';


    // let colorOnT1 = switchers6[0].contacts.poweredOn?  'red' : 'rgb(15,106,15)';
    // let colorOnT2 = switchers6[1].contacts.poweredOn?  'red' : 'rgb(15,106,15)';

    return (
        <svg>
            <line x1={x - x / 3} y1={cy} x2={x * 5 - x / 2 - side * 2 - line} y2={cy} stroke='black'
                  strokeWidth={strokeWidth}/>
            <line x1={x * 5} y1={cy} x2={x * 9 - x / 2} y2={cy} stroke='black' strokeWidth={strokeWidth}/>
            <line x1={x * 4} x2={x * 5 + side} y1={table.canvasHeight - side} y2={table.canvasHeight - side}
                  stroke='black'
                  strokeWidth={strokeWidth}/>
            {switchers6.map(item =>
                <circle key={item.id} cx={table.stepWidth / 3 * item.x + side / 2} cy={cy} r={side * 0.2} fill='white'/>
            )}
            {tn.map(item =>
                <circle key={item.id} cx={table.stepWidth / 3 * item.x + side / 2} cy={cy} r={side * 0.2} fill='white'/>
            )}
            <circle cx={x * 4 + side / 2} cy={table.canvasHeight - side} r={side * 0.2} fill='white'/>
            <circle cx={x * 5 + side / 2} cy={table.canvasHeight - side} r={side * 0.2} fill='white'/>

            {/*transformer-1*/}
            <line x1={tx1} y1={ty1 + side} x2={tx1} y2={table.stepHeight * 5 - table.stepHeight / 2 + table.canvasWidth / 60 / 2}
                  stroke={colorOnT1}/>
            <circle cx={tx1} cy={ty1 + side * 2} r={side} fill='none' stroke='black'/>
            <circle cx={tx1} cy={ty1 + side * 3.5} r={side} fill='none' stroke='black'/>

            <line x1={tx1} y1={ty1 + side * 2} x2={tx1-side/3} y2={ty1 + side * 2-side/3}
                  stroke={colorOnT1}/>
            <line x1={tx1} y1={ty1 + side * 2} x2={tx1+side/3} y2={ty1 + side * 2-side/3}
                  stroke={colorOnT1}/>
            <line x1={tx1} y1={ty1 + side * 2} x2={tx1} y2={ty1 + side * 2+side/3}
                  stroke={colorOnT1}/>
            <line x1={tx1} y1={ty1 + side * 2} x2={tx1+side/3} y2={ty1 + side * 2+side/5}
                  stroke={colorOnT1}/>
            <circle cx={tx1+side/3} cy={ty1 + side * 2+side/5} r={side/10} fill='white' stroke={colorOnT1}/>

            <line x1={tx1} y1={ty1 + side * 3.5 - line / 2} x2={tx1 + line / 2} y2={ty1 + side * 3.5 + line / 3}
                  stroke={colorOnT1}/>
            <line x1={tx1 + line / 2} y1={ty1 + side * 3.5 + line / 3} x2={tx1 - line / 2}
                  y2={ty1 + side * 3.5 + line / 3} stroke={colorOnT1}/>
            <line x1={tx1 - line / 2} y1={ty1 + side * 3.5 + line / 3} x2={tx1} y2={ty1 + side * 3.5 - line / 2}
                  stroke={colorOnT1}/>

            <line x1={tx1} y1={ty1 + side * 4.5} x2={tx1} y2={cy - side * 2} stroke={colorOnT1}/>
            <line x1={tx1} y1={cy - side * 2} x2={tx1 + (table.canvasWidth - tx1) - side} y2={cy - side * 2}
                  stroke={colorOnT1}/>
            <line x1={tx1 + (table.canvasWidth - tx1) - side} y1={cy - side * 2}
                  x2={tx1 + (table.canvasWidth - tx1) - side} y2={table.canvasHeight - side} stroke={colorOnT1}/>
            <line x1={tx1 + (table.canvasWidth - tx1) - side} y1={table.canvasHeight - side}
                  x2={table.stepWidth / 3 * switchers6[0].x + side / 2} y2={table.canvasHeight - side} stroke={colorOnT1}/>
            {/*<circle cx={table.stepWidth / 3 * switchers6[0].x + side / 2} cy={table.canvasHeight - side}*/}
            {/*        r={side * 0.2}/>*/}


            {/*transformer-2*/}
            <line x1={tx2} y1={ty2+side} x2={tx2} y2={table.stepHeight * 5 - table.stepHeight / 2 + table.canvasWidth / 60 / 2} stroke='black'/>
            <circle cx={tx2} cy={ty2 + side * 2} r={side} fill='none' stroke='black'/>
            <circle cx={tx2} cy={ty2 + side * 3.5} r={side} fill='none' stroke='black'/>

            <line x1={tx2} y1={ty2 + side * 2} x2={tx2-side/3} y2={ty2 + side * 2-side/3}
                  stroke={colorOnT2}/>
            <line x1={tx2} y1={ty2 + side * 2} x2={tx2+side/3} y2={ty2 + side * 2-side/3}
                  stroke={colorOnT2}/>
            <line x1={tx2} y1={ty2 + side * 2} x2={tx2} y2={ty2 + side * 2+side/3}
                  stroke={colorOnT2}/>
            <line x1={tx2} y1={ty2 + side * 2} x2={tx2+side/3} y2={ty2 + side * 2+side/5}
                  stroke={colorOnT2}/>
            <circle cx={tx2+side/3} cy={ty2 + side * 2+side/5} r={side/10} fill='white' stroke={colorOnT2}/>

            <line x1={tx2} y1={ty2 + side * 3.5 - line / 2} x2={tx2 + line / 2} y2={ty2 + side * 3.5 + line / 3}
                  stroke={colorOnT2}/>
            <line x1={tx2 + line / 2} y1={ty2 + side * 3.5 + line / 3} x2={tx2 - line / 2}
                  y2={ty2 + side * 3.5 + line / 3} stroke={colorOnT2}/>
            <line x1={tx2 - line / 2} y1={ty2 + side * 3.5 + line / 3} x2={tx2} y2={ty2 + side * 3.5 - line / 2}
                  stroke={colorOnT2}/>

            <line x1={tx2} y1={ty2 + side * 4.5} x2={tx2} y2={cy - side * 2} stroke={colorOnT2}/>
            <line x1={tx2} y1={cy - side * 2} x2={side * 2} y2={cy - side * 2} stroke={colorOnT2}/>

            <line x1={side * 2} y1={cy - side * 2} x2={side * 2} y2={table.canvasHeight - side} stroke={colorOnT2}/>
            <line x1={side * 2} y1={table.canvasHeight - side} x2={table.stepWidth / 3 * switchers6[1].x + side / 2}
                  y2={table.canvasHeight - side} stroke={colorOnT2}/>
            {/*<circle cx={table.stepWidth / 3 * switchers6[1].x + side / 2} cy={table.canvasHeight - side}*/}
            {/*        r={side * 0.2}/>*/}
        </svg>
    )


};

export default Section6;
