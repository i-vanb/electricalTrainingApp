import React from 'react';
import './App.css';

import CanvasKTPB from "./components/canvasKTPB";


function App(props) {
    return (
        <div className="App">
            <header className="App-header">
                <div className='container row col-12 p-0 m-0'>
                    <div className='col-2'></div>
                    <div className='col-8'>Тренажер переключений в электроустановках</div>
                    <div className='col-2'></div>
                    {/*<div className='col-1 small container bg-info'><button className='btn-link setBtn' onClick={props.showSettingsUp}></button></div>*/}
                </div>
                <button className='setBtn' onClick={props.showSettingsUp}></button>
            </header>

            <div className='App-left list-group menu-left'>
                <button className='list-group-item'>Вернуться в меню</button>
                <button className='list-group-item' onClick={props.restart}>Начать сначала</button>
                <button className='list-group-item'>Закончить переключение</button>
                <button className='list-group-item' onClick={props.showTaskMenu}>Получить новое задание</button>
                <button className='list-group-item' onClick={props.showReportUp}>Отчет</button>
                <button className='list-group-item'>Выйти</button>
            </div>

                <CanvasKTPB
                    state={props.state}
                    showMenu={props.showMenu}
                    turnOn={props.turnOn}
                    turnOff={props.turnOff}
                    turnAvr={props.turnAvr}
                    turnAvTn={props.turnAvTn}
                    turnSN={props.turnSN}
                    table={props.state.table}
                    changePosterHandle={props.changePosterHandle}
                    changePositioning={props.changePositioning}
                    turnOperational={props.turnOperational}
                    checkPosition={props.checkPosition}
                    checkCondition={props.checkCondition}
                    checkVoltage={props.checkVoltage}
                    checkWork={props.checkWork}
                    showReportUp={props.showReportUp}
                    showSettingsUp={props.showSettingsUp}
                    changeSettings={props.changeSettings}
                    chooseTask={props.chooseTask}
                    showTaskMenu={props.showTaskMenu}
                    restart={props.restart}

                />

            <div className='App-right'></div>

            <div className='App-bottom container m-0 p-0 col-12'>
                <div className='row p-0 m-0 small'>
                    <div className="col-2 text-right">Последняя операция:</div>
                    <div
                        className="col-5">{props.state.actions.length >= 1 && props.state.actions[props.state.actions.length - 1].text}</div>
                    {/*<div className="col-1 text-left text-secondary p-0 m-0" onClick={()=>console.dir(props.state.fails.map(item=>item.fail))}>Ошибки: </div>*/}
                    <div
                        className="col-5 text-warning p-0 m-0">{props.state.fails.length >= 1 && props.state.fails[props.state.fails.length - 1].text}</div>

                </div>
                <div className='row p-0 m-0 small'>
                    <div className="col-2 text-right text-secondary">Предыдущая операция:</div>
                    <div
                        className="col-5 text-secondary">{props.state.actions.length >= 2 && props.state.actions[props.state.actions.length - 2].text}</div>
                    {/*<div className="col-1 text-right p-0 m-0"></div>*/}
                    <div
                        className="col-5 text-warning p-0 m-0">{props.state.fails.length >= 2 && props.state.fails[props.state.fails.length - 2].text}</div>
                </div>
            </div>

            {/*<Report />*/}

        </div>
    );
}

export default App;
