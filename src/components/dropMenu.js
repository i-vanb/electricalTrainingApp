import React from "react";

const DropMenu = (props) => {
    const {table, state, turnOn, turnOff} = props;
    const {power, ground} = props.state.strings;


    const menuTypes = (type) => {
        switch (type) {
            case 'disconnector35':
                return [
                    {text: 'Включить ЛР-35кВ', method: turnOn},
                    {text: 'Отключить ЛР-35кВ', method: turnOff},
                    {text: 'Проверить отключенное положение ЛР-35кВ', method: ()=>{props.checkPosition(false)}},
                    {text: 'Проверить включенное положение ЛР-35кВ', method: ()=>{props.checkPosition(true)}},
                    {text: 'Проверить опорную изоляцию ЛР-35кВ', method: props.checkCondition},
                    {text: 'Вывесить плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, true)},
                    {text: 'Снять плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, false)},
                    {text: 'Вывесить плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, true)},
                    {text: 'Снять плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, false)},
                ]
            case 'tn':
                return [
                    {text: 'Проверить уровень напряжения', method: ()=>props.checkWork(state.strings.voltage)},
                    {text: 'Вкатить в рабочее положение ТН-6кВ', method: turnOn},
                    {text: 'Выкатить в контрольное положение ТН-6кВ', method: turnOff},
                    {text: 'Выкатить в ремонтное положение ТН-6кВ', method: turnOff},
                    {text: 'Включить АВ 100В', method: ()=>props.turnAvTn(true)},
                    {text: 'Отключить АВ 100В', method: ()=>props.turnAvTn(false)},
                    {text: 'Вывесить плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, true)},
                    {text: 'Снять плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, false)},
                    {text: 'Вывесить плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, true)},
                    {text: 'Снять плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, false)},
                ]
            case 'groundDisconnector35':
                return [
                    {text: 'Включить ЗН-35кВ', method: turnOn},
                    {text: 'Отключить ЗН-35кВ', method: turnOff},
                    {text: 'Проверить включенное положение ЗН-35кВ', method: ()=>{props.checkPosition(true)}},
                    {text: 'Проверить отлюченное положение ЗН-35кВ', method: ()=>{props.checkPosition(false)}},

                ]
            case 'sectionDisconnector35':
                return [
                    {text: 'Включить СР-35кВ', method: turnOn},
                    {text: 'Отключить СР-35кВ', method: turnOff},
                    {text: 'Проверить отключенное положение СР-35кВ', method: ()=>{props.checkPosition(false)}},
                    {text: 'Проверить включенное положение СР-35кВ', method: ()=>{props.checkPosition(true)}},
                    {text: 'Проверить опорную изоляцию СР-35кВ', method: props.checkCondition},
                    {text: 'Вывесить плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, true)},
                    {text: 'Снять плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, false)},
                    {text: 'Вывесить плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, true)},
                    {text: 'Снять плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, false)},
                ]
            case 'groundSectionDisconnector35':
                return [
                    {text: 'Включить ЗН-35кВ', method: turnOn},
                    {text: 'Отключить ЗН-35кВ', method: turnOff},
                    {text: 'Проверить включенное положение ЗН-35кВ', method: ()=>{props.checkPosition(true)}},
                    {text: 'Проверить отлюченное положение ЗН-35кВ', method: ()=>{props.checkPosition(false)}},

                ]
            case 'switcher35':
                return [
                    {text: 'Включить ВВ-35кВ', method: turnOn},
                    {text: 'Отключить ВВ-35кВ', method: turnOff},
                    {text: 'Проверить отключенное положение ВВ-35кВ', method: ()=>{props.checkPosition(false)}},
                    {text: 'Проверить включенное положение ВВ-35кВ', method: ()=>{props.checkPosition(true)}},
                    {text: 'Включить АВ ШУ ВВ-35кВ', method: ()=>{props.turnOperational(true)}},
                    {text: 'Отключить АВ ШУ ВВ-35кВ', method: ()=>{props.turnOperational(false)}},
                    {text: 'Вывесить плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, true)},
                    {text: 'Снять плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, false)},
                    {text: 'Вывесить плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, true)},
                    {text: 'Снять плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, false)},
                ]
            case 'sectionSwitcher35':
                return [
                    {text: 'Включить СВВ-35кВ', method: turnOn},
                    {text: 'Отключить СВВ-35кВ', method: turnOff},
                    {text: 'Проверить отключенное положение СВВ-35кВ', method: ()=>{props.checkPosition(false)}},
                    {text: 'Проверить включенное положение СВВ-35кВ', method: ()=>{props.checkPosition(true)}},
                    {text: 'Включить АВ ШУ СВВ-35кВ', method: ()=>{props.turnOperational(true)}},
                    {text: 'Отключить АВ ШУ СВВ-35кВ', method: ()=>{props.turnOperational(false)}},
                    {text: 'Вывесить плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, true)},
                    {text: 'Снять плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, false)},
                    {text: 'Вывесить плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, true)},
                    {text: 'Снять плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, false)},
                ]
            case 'tsn':
                return [
                    {text: 'Включить ШР-6кВ', method: turnOn},
                    {text: 'Отключить ШР-6кВ', method: turnOff},
                    {text: 'Проверить отключенное положение ШР-6кВ', method: ()=>{props.checkPosition(false)}},
                    {text: 'Проверить включенное положение ШР-6кВ', method: ()=>{props.checkPosition(true)}},
                    {text: 'Проверить состояние изоляции ШР-6кВ', method: props.checkCondition},
                    {text: 'Вывесить плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, true)},
                    {text: 'Снять плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, false)},
                    {text: 'Вывесить плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, true)},
                    {text: 'Снять плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, false)},
                ]

            case 'sn':
                return [
                    {text: 'Включить АВ-0,4кВ', method: ()=>props.turnSN(true)},
                    {text: 'Отключить АВ-0,4кВ', method: ()=>props.turnSN(false)},
                    {text: 'Установить ПЗЗ на выводах-0,4кВ ТСН', method: undefined},
                    {text: 'Проверить отсутствие U на выводах-0,4кВ ТСН', method: ()=>props.checkVoltage(false)},
                    {text: 'Вывесить плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, true)},
                    {text: 'Снять плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, false)},
                    {text: 'Вывесить плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, true)},
                    {text: 'Снять плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, false)},
                ]
            case 'switcher6':
                if(state.elementsMenu.id === 'СВВ-6кВ яч.6') {
                    return [
                        {text: 'Проверить уровень тока', method: ()=>props.checkWork(state.strings.current)},
                        {text: 'Включить ВВ-6кВ', method: turnOn},
                        {text: 'Отключить ВВ-6кВ', method: turnOff},
                        {text: 'Выкатить в контрольное положение ВВ-6кВ', method: ()=>props.changePositioning('control')},
                        {text: 'Выкатить в ремонтное положение ВВ-6кВ', method: ()=>props.changePositioning('remove')},
                        {text: 'Вкатить в рабочее положение ВВ-6кВ', method: ()=>props.changePositioning('working')},
                        {text: 'Вывести АВР-6кВ', method: ()=>props.turnAvr(false)},
                        {text: 'Ввести АВР-6кВ', method: ()=>props.turnAvr(true)},
                        {text: 'Проверить отключенное положение ВВ-6кВ', method: ()=>{props.checkPosition(false)}},
                        {text: 'Проверить включенное положение ВВ-6кВ', method: ()=>{props.checkPosition(true)}},
                        {text: 'Включить АВ ШУ ВВ-6кВ', method: ()=>{props.turnOperational(true)}},
                        {text: 'Отключить АВ ШУ ВВ-6кВ', method: ()=>{props.turnOperational(false)}},
                        {text: 'Вывесить плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, true)},
                        {text: 'Снять плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, false)},
                        {text: 'Вывесить плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, true)},
                        {text: 'Снять плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, false)},
                    ]
                } else {
                    return [
                        {text: 'Проверить уровень тока', method: ()=>props.checkWork(state.strings.current)},
                        {text: 'Включить ВВ-6кВ', method: turnOn},
                        {text: 'Отключить ВВ-6кВ', method: turnOff},
                        {text: 'Выкатить в контрольное положение ВВ-6кВ', method: ()=>props.changePositioning('control')},
                        {text: 'Выкатить в ремонтное положение ВВ-6кВ', method: ()=>props.changePositioning('remove')},
                        {text: 'Вкатить в рабочее положение ВВ-6кВ', method: ()=>props.changePositioning('working')},
                        {text: 'Проверить отключенное положение ВВ-6кВ', method: ()=>{props.checkPosition(false)}},
                        {text: 'Проверить включенное положение ВВ-6кВ', method: ()=>{props.checkPosition(true)}},
                        {text: 'Включить АВ ШУ ВВ-6кВ', method: ()=>{props.turnOperational(true)}},
                        {text: 'Отключить АВ ШУ ВВ-6кВ', method: ()=>{props.turnOperational(false)}},
                        {text: 'Вывесить плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, true)},
                        {text: 'Снять плакат "Не включать работают люди"', method: ()=>props.changePosterHandle(power, false)},
                        {text: 'Вывесить плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, true)},
                        {text: 'Снять плакат "Заземлено"', method: ()=>props.changePosterHandle(ground, false)},
                    ]
                }
            case 'groundTn6':
                return [
                    {text: 'Включить ЗН-6кВ', method: turnOn},
                    {text: 'Отключить ЗН-6кВ', method: turnOff},
                    {text: 'Проверить включенное положение ЗН-6кВ', method: ()=>{props.checkPosition(true)}},
                    {text: 'Проверить отлюченное положение ЗН-6кВ', method: ()=>{props.checkPosition(false)}},
                ]

            case 'groundSwitchers6':
                return [
                    {text: 'Включить ЗН-6кВ', method: turnOn},
                    {text: 'Отключить ЗН-6кВ', method: turnOff},
                    {text: 'Проверить включенное положение ЗН-6кВ', method: ()=>{props.checkPosition(true)}},
                    {text: 'Проверить отлюченное положение ЗН-6кВ', method: ()=>{props.checkPosition(false)}},
                ]

            case 'contacts':
                return [
                    {text: 'Проверить отсутствие напряжения', method: ()=>{props.checkVoltage(false)}},
                    {text: 'Проверить наличие напряжения', method: ()=>{props.checkVoltage(true)}},
                    {text: 'Установить ПЗЗ-35кВ', method: undefined},
                    {text: 'Снять ПЗЗ-35кВ', method: undefined},
                ]
            default: console.log('Unexpected type')
        }
    };
    const layout = {
        top: state.elementsMenu.type && table.canvasHeight - state.elementsMenu.y < menuTypes(state.elementsMenu.type).length*30 ?
            state.elementsMenu.y - menuTypes(state.elementsMenu.type).length*30 - table.canvasWidth / 70 <0 ?
                0 :state.elementsMenu.y - menuTypes(state.elementsMenu.type).length*30 - table.canvasWidth / 70
            : state.elementsMenu.y,
        left: state.elementsMenu.type && table.canvasHeight - state.elementsMenu.y < menuTypes(state.elementsMenu.type).length*30?
            table.canvasWidth - state.elementsMenu.x < 200 ? state.elementsMenu.x - 200 : state.elementsMenu.x+table.canvasWidth / 60
            :table.canvasWidth - state.elementsMenu.x < 200 ? state.elementsMenu.x - 200 : state.elementsMenu.x,
    };

    if (state.elementsMenu.id) {
        return (
            <div className='list-group position-absolute' style={layout}>
                <button type='button'
                        className="list-group-item list-group-item-action p-1 bg-dark text-center text-light disabled">
                    {state.elementsMenu.id}</button>
                {menuTypes(state.elementsMenu.type).map(
                    item =>
                        <button key={item.text} type="button" className="list-group-item list-group-item-action p-1"
                                onClick={item.method}>{item.text}
                        </button>
                )}
                </div>
        )
    } else return null
};

export default DropMenu;

