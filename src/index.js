import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';


let renderApp = (state) => {
    // debugger
    ReactDOM.render(
        <App
            state={state}
            showMenu={store.showMenu.bind(store)}
            turnOn={store.turnOn.bind(store)}
            turnOff={store.turnOff.bind(store)}
            changePosterHandle={store.changePosterHandle.bind(store)}
            changePositioning={store.changePositioning.bind(store)}
            turnOperational={store.turnOperational.bind(store)}
            checkPosition={store.checkPosition.bind(store)}
            checkCondition={store.checkCondition.bind(store)}
            checkVoltage={store.checkVoltage.bind(store)}
            turnAvr={store.turnAvr.bind(store)}
            turnAvTn={store.turnAvTn.bind(store)}
            turnSN={store.turnSN.bind(store)}
            checkWork={store.checkWork.bind(store)}
            showSettingsUp={store.showSettings.bind(store)}
            showReportUp={store.showReport.bind(store)}
            changeSettings={store.changeSettings.bind(store)}
            restart={store.restart.bind(store)}
            chooseTask={store.chooseTask.bind(store)}
            checkLeftPowered={store.checkLeftPowered.bind(store)}
            showTaskMenu={store.showTaskMenu.bind(store)}
            showWarning={store.showWarning.bind(store)}
        />
        , document.getElementById('root'));
};


store.poweredOn(store.getState());

renderApp(store.getState());

store.subscribe(()=>{
    let state = store.getState();
    renderApp(state);
    }
);



const updateSize = () => {
    let canvasWidth = document.body.offsetWidth - 200-2-2;
    let canvasHeight = document.documentElement.clientHeight - 100-2-2;
    let stepHeight = canvasHeight/10;
    let stepWidth = canvasWidth/9;
    store._state.table = {
        canvasWidth,canvasHeight,stepHeight,stepWidth
    };
    store._callSubscriber()
};

window.addEventListener('resize', updateSize);


export default renderApp

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
