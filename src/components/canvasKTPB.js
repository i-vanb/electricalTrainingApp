import React from "react";
import Switcher35 from "./Switcher35";
import Switcher6 from "./Switcher6";
import DropMenu from "./dropMenu";
import Disconnectors35 from "./disconnectors35";
import Section35 from "./Section35";
import Section6 from "./section6";
import Tsn from "./tsn";
import TN from "./tn6";
import Report from "./report";
import Settings from "./settings";
import TaskMenu from "./tasks-menu";
import Warning from "./warnings";


const CanvasKTPB = (props) => {
    const {state, showMenu, turnOn, turnOff, table} = props;
    const classNameForCanvas = state.tasks.warning || state.tasks.currentTask === '' || state.tasks.taskMenu ? 'App-canvas filterRect' : 'App-canvas'

    return (
        <div className='content-wrap'>
            <Report showReport={state._showReport} show={props.showReportUp} report={state.report} table={table}
                    score={state.score}/>
            <TaskMenu state={state.tasks} table={table} chooseTask={props.chooseTask} showTaskMenu={props.showTaskMenu}/>
            <Warning state={state.tasks} table={table} showTaskMenu={props.showTaskMenu} showWarning={props.showWarning}
                     restart={props.restart} showReport={props.showReportUp}
            />
            <Settings showSettings={state._showSettings} show={props.showSettingsUp} table={table}
                      state={props.state.settings} changeSettings={props.changeSettings}
            />

            <svg className={classNameForCanvas} id='App-canvas'
                 viewBox={`0 0 ${table.canvasWidth} ${table.canvasHeight}`}
                 xmlns="http://www.w3.org/2000/svg">
                <Section35 showMenu={showMenu} state={state.section35} table={table} settings={props.state.settings}/>
                {state.disconnectors35.map(item =>
                    <Disconnectors35 key={item.id} id={item.id} x={item.x} y={item.y} turnedOn={item.turnedOn}
                                     showMenu={showMenu} type={item.type} table={table} contacts={item.contacts}
                                     groundIn={item.groundIn} groundOut={item.groundOut} posterPower={item.posterPower}
                                     posterGround={item.posterGround}
                                     checkedPosition={item.checkedPosition} checkedCondition={item.checkedCondition}
                                     checkedGroundIn={item.groundIn.checkedPosition}
                                     checkedGroundOut={item.groundOut.checkedPosition}
                                     settings={props.state.settings}
                    />
                )}

                {state.switchers35.map(item =>
                    <Switcher35 key={item.id} id={item.id} x={item.x} y={item.y} turnedOn={item.turnedOn}
                                showMenu={showMenu} type={item.type} table={table} posterPower={item.posterPower}
                                posterGround={item.posterGround} operational={item.operational}
                                checkedPosition={item.checkedPosition} settings={props.state.settings}
                    />
                )}
                {state.switchers6.map(item =>
                    <Switcher6 key={item.id} id={item.id} x={item.x} y={item.y} turnedOn={item.turnedOn}
                               showMenu={showMenu} type={item.type} table={table} groundOn={item.ground.turnedOn}
                               groundId={item.ground.id} posterPower={item.posterPower} posterGround={item.posterGround}
                               positioning={item.positioning} operational={item.operational} contacts={item.contacts}
                               checkedPosition={item.checkedPosition} checkedCurrent={item.checkedCurrent}
                               settings={props.state.settings}
                    />
                )}
                {state.tn.map(item =>
                    <TN key={item.id} id={item.id} x={item.x} y={item.y} turnedOn={item.turnedOn} showMenu={showMenu}
                        type={item.type} table={table} groundOn={item.ground.turnedOn} groundId={item.ground.id}
                        posterPower={item.posterPower} posterGround={item.posterGround}
                        settings={props.state.settings} checkedVoltage={item.checkedVoltage} avTn={item.avTn}
                    />
                )}
                <Section6 table={table} switchers6={state.switchers6} tn={state.tn} switchers35={state.switchers35}
                          settings={props.state.settings}/>

                {state.tsn.map(item =>
                    <Tsn key={item.id} table={table} turnedOn={item.turnedOn} x={item.x} showMenu={showMenu}
                         type={item.type} id={item.id} posterPower={item.posterPower} posterGround={item.posterGround}
                         sn={item.sn} checkedPosition={item.checkedPosition} checkedCondition={item.checkedCondition}
                         poweredOn={item.poweredOn} sectionPoweredOn={item.sectionPoweredOn}
                         settings={props.state.settings}
                    />
                )}
                {state.tasks.warning || state.tasks.currentTask === '' || state.tasks.taskMenu ?
                    <rect x='0' y='0' width={table.canvasWidth} height={table.canvasHeight} stroke='none'
                          fill='rgba(25, 25, 25, 0)'/>
                    : null
                }
            </svg>


            <DropMenu state={state} table={table} turnOn={turnOn} turnOff={turnOff}
                      changePosterHandle={props.changePosterHandle}
                      changePositioning={props.changePositioning}
                      turnOperational={props.turnOperational}
                      checkPosition={props.checkPosition}
                      checkCondition={props.checkCondition}
                      checkVoltage={props.checkVoltage}
                      turnAvr={props.turnAvr}
                      turnAvTn={props.turnAvTn}
                      turnSN={props.turnSN}
                      checkWork={props.checkWork}
            />


        </div>
    )
};

export default CanvasKTPB;

