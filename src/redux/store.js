const canvasWidth = document.body.offsetWidth - 200 - 2 - 2;
const canvasHeight = document.documentElement.clientHeight - 100 - 2 - 2;
const stepWidth = canvasWidth / 9;
const stepHeight = canvasHeight / 10;

const working = 'working';
const control = 'control';


let store = {
    _state: {
        strings: {
            power: '"НЕ ВКЛЮЧАТЬ РАБОТАЮТ ЛЮДИ"',
            ground: '"ЗАЗЕМЛЕНО"',
            current: 'current',
            voltage: 'voltage'
        },
        _showSettings: false,

        settings:
            {
                color: false,
            },
        tasks: {
            currentTask: '',
            warning: false, // false
            warningText: [],
            taskMenu: true, // true
            normal_t1: 'Вывод Т-1 в ремонт из нормальной схемы',
            normal_t2: 'Вывод Т-2 в ремонт из нормальной схемы',
            t1_normal: 'Восстановление нормальной схемы после ремонта Т-1',
            t2_normal: 'Восстановление нормальной схемы после ремонта Т-2',
        },
        _showReport: false,
        report: [],
        score: 100,
        actions: [],
        fails: [],
        waitList: [],
        table: {
            canvasWidth, canvasHeight, stepWidth, stepHeight
        },
        checkedUVN: false,
        elementsMenu: {
            type: undefined,
            id: undefined,
            x: undefined,
            y: undefined,
        },
        tn: [
            {
                type: 'tn',
                id: 'ТН-6кВ №1 яч.2',
                turnedOn: true,
                checkedVoltage: false,
                x: 23,
                y: 8,
                ground: {
                    id: 'ЗН-6кВ СШ-6кВ №1 яч.2',
                    turnedOn: false,
                },
                posterPower: false,
                posterGround: false,
                avTn: true,
                contacts: {
                    id: 'СШ-6кВ №1',
                    poweredOn: false
                },
                // poweredOn: undefined
            },
            {
                type: 'tn',
                id: 'ТН-6кВ №2 яч.11',
                turnedOn: true,
                checkedVoltage: false,
                x: 4,
                y: 8,
                ground: {
                    id: 'ЗН-6кВ СШ-6кВ №2 яч.11',
                    turnedOn: false,
                },
                posterPower: false,
                posterGround: false,
                avTn: true,
                contacts: {
                    id: 'СШ-6кВ №2',
                    poweredOn: false
                },
                // poweredOn: undefined
            }
        ],
        tsn: [
            {
                type: 'tsn',
                id: 'ТСН-6/0,4кВ №1',
                turnedOn: true,
                checkedPosition: false,
                checkedCondition: false,
                x: 25,
                posterPower: false,
                posterGround: false,
                poweredOn: false,
                sectionPoweredOn: false,
                sn: {
                    id: 'СН-0,4кВ №1',
                    turnedOn: true,
                    poweredOn: false,
                    posterPower: false,
                    posterGround: false,
                }
            },
            {
                type: 'tsn',
                id: 'ТСН-6/0,4кВ №2',
                turnedOn: true,
                checkedPosition: false,
                checkedCondition: false,
                x: 2,
                posterPower: false,
                posterGround: false,
                poweredOn: false,
                sectionPoweredOn: false,
                sn: {
                    id: 'СН-0,4кВ №2',
                    turnedOn: true,
                    poweredOn: false,
                    posterPower: false,
                    posterGround: false,
                }
            },
        ],
        section35: {
            sectionDisconnector1: {
                id: 'СР-35кВ №1',
                turnedOn: false,
                checkedPosition: false,
                checkedCondition: false,
                groundIn: {
                    id: 'ЗН-35кВ на СР-35кВ №1 в сторону СШ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                groundOut: {
                    id: 'ЗН-35кВ на СР-35кВ №1 в сторону СВВ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                contacts: {
                    in: {
                        id: 'СР-35кВ №1 в сторону СШ-35кВ',
                        poweredOn: false,
                    },
                    out: {
                        id: 'СР-35кВ №1 в сторону СВВ-35кВ',
                        poweredOn: false,
                    }
                },
            },
            sectionSwitcher35: {
                id: 'СВВ-35кВ',
                turnedOn: false,
                posterPower: false,
                posterGround: false,
                operational: true,
                checkedPosition: false,
            },
            sectionDisconnector2: {
                id: 'СР-35кВ №2',
                turnedOn: true,
                checkedPosition: false,
                checkedCondition: false,
                groundIn: {
                    id: 'ЗН-35кВ на СР-35кВ №2 в сторону СШ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                groundOut: {
                    id: 'ЗН-35кВ на СР-35кВ №2 в сторону СВВ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                contacts: {
                    in: {
                        id: 'СР-35кВ №2 в сторону СШ-35кВ',
                        poweredOn: false,
                    },
                    out: {
                        id: 'СР-35кВ №2 в сторону СВВ-35кВ',
                        poweredOn: false,
                    }
                },
            }
        },
        disconnectors35: [
            {
                id: 'ЛР-35кВ №4',
                type: 'disconnector35',
                turnedOn: false,
                checkedPosition: false,
                checkedCondition: false,
                dependency: 'ВВ-35кВ №4',
                x: 2,
                y: 1.5,
                groundIn: {
                    id: 'ЗН-35кВ на ЛР-35кВ №4 в сторону ВЛ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                groundOut: {
                    id: 'ЗН-35кВ на ЛР-35кВ №4 в сторону ВВ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                contacts: {
                    in: {
                        id: 'ЛР-35кВ №4 в сторону ВЛ-35кВ',
                        poweredOn: true,
                    },
                    out: {
                        id: 'ЛР-35кВ №4 в сторону ВВ-35кВ',
                        poweredOn: false,
                    }
                },
            },
            {
                id: 'ЛР-35кВ №3',
                type: 'disconnector35',
                turnedOn: true,
                checkedPosition: false,
                checkedCondition: false,
                dependency: 'ВВ-35кВ №3',
                x: 3,
                y: 1.5,
                groundIn: {
                    id: 'ЗН-35кВ на ЛР-35кВ №3 в сторону ВЛ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                groundOut: {
                    id: 'ЗН-35кВ на ЛР-35кВ №3 в сторону ВВ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                contacts: {
                    in: {
                        id: 'ЛР-35кВ №3 в сторону ВЛ-35кВ',
                        poweredOn: true,
                    },
                    out: {
                        id: 'ЛР-35кВ №3 в сторону ВВ-35кВ',
                        poweredOn: false,
                    }
                },
            },
            {
                id: 'ЛР-35кВ №2',
                type: 'disconnector35',
                turnedOn: true,
                checkedPosition: false,
                checkedCondition: false,
                dependency: 'ВВ-35кВ №2',
                x: 7,
                y: 1.5,
                groundIn: {
                    id: 'ЗН-35кВ на ЛР-35кВ №2 в сторону ВЛ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                groundOut: {
                    id: 'ЗН-35кВ на ЛР-35кВ №2 в сторону ВВ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                contacts: {
                    in: {
                        id: 'ЛР-35кВ №2 в сторону ВЛ-35кВ',
                        poweredOn: true,
                    },
                    out: {
                        id: 'ЛР-35кВ №2 в сторону ВВ-35кВ',
                        poweredOn: false,
                    }
                },
            },
            {
                id: 'ЛР-35кВ №1',
                type: 'disconnector35',
                turnedOn: false,
                checkedPosition: false,
                checkedCondition: false,
                dependency: 'ВВ-35кВ №1',
                x: 8,
                y: 1.5,
                groundIn: {
                    id: 'ЗН-35кВ на ЛР-35кВ №1 в сторону ВЛ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                groundOut: {
                    id: 'ЗН-35кВ на ЛР-35кВ №1 в сторону ВВ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                contacts: {
                    in: {
                        id: 'ЛР-35кВ №1 в сторону ВЛ-35кВ',
                        poweredOn: true,
                    },
                    out: {
                        id: 'ЛР-35кВ №1 в сторону ВВ-35кВ',
                        poweredOn: false,
                    }
                },
            },
            {
                id: 'ТР-35кВ №2',
                type: 'disconnector35',
                turnedOn: true,
                checkedPosition: false,
                checkedCondition: false,
                dependency: 'ВВ-35кВ Т-2',
                x: 3,
                y: 4,
                groundIn: {
                    id: 'ЗН-35кВ на ТР-35кВ №2 в сторону СШ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                groundOut: {
                    id: 'ЗН-35кВ на ТР-35кВ №2 в сторону Т-2',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                contacts: {
                    in: {
                        id: 'ТР-35кВ №2 в сторону СШ-35кВ',
                        poweredOn: false,
                    },
                    out: {
                        id: 'ТР-35кВ №2 в сторону Т-2',
                        poweredOn: false,
                    }
                },
            },
            {
                id: 'ТР-35кВ №1',
                type: 'disconnector35',
                turnedOn: true,
                checkedPosition: false,
                checkedCondition: false,
                dependency: 'ВВ-35кВ Т-1',
                x: 7,
                y: 4,
                groundIn: {
                    id: 'ЗН-35кВ на ТР-35кВ №1 в сторону СШ-35кВ',
                    turnedOn: false,
                    checkedPosition: false,
                },
                groundOut: {
                    id: 'ЗН-35кВ на ТР-35кВ №1 в сторону Т-1',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                contacts: {
                    in: {
                        id: 'ТР-35кВ №1 в сторону СШ-35кВ',
                        poweredOn: false,
                    },
                    out: {
                        id: 'ТР-35кВ №1 в сторону Т-1',
                        poweredOn: false,
                    }
                },
            },
        ],
        switchers35: [
            {
                id: 'ВВ-35кВ №4',
                type: 'switcher35',
                turnedOn: false,
                checkedPosition: false,
                x: 2,
                y: 2.5,
                posterPower: false,
                posterGround: false,
                operational: true,
            },
            {
                id: 'ВВ-35кВ №3',
                type: 'switcher35',
                turnedOn: true,
                checkedPosition: false,
                x: 3,
                y: 2.5,
                posterPower: false,
                posterGround: false,
                operational: true,
            },
            {
                id: 'ВВ-35кВ №2',
                type: 'switcher35',
                turnedOn: true,
                checkedPosition: false,
                x: 7,
                y: 2.5,
                posterPower: false,
                posterGround: false,
                operational: true,
            },
            {
                id: 'ВВ-35кВ №1',
                type: 'switcher35',
                turnedOn: false,
                checkedPosition: false,
                x: 8,
                y: 2.5,
                posterPower: false,
                posterGround: false,
                operational: true,
            },
            {
                id: 'ВВ-35кВ Т-2',
                type: 'switcher35',
                turnedOn: true,
                checkedPosition: false,
                x: 3,
                y: 5,
                posterPower: false,
                posterGround: false,
                operational: true,
            },
            {
                id: 'ВВ-35кВ Т-1',
                type: 'switcher35',
                turnedOn: true,
                checkedPosition: false,
                x: 7,
                y: 5,
                posterPower: false,
                posterGround: false,
                operational: true,
            },
        ],
        switchers6: [
            {
                id: 'ВВ-6кВ яч.1 Ввод-1',
                type: 'switcher6',
                turnedOn: true,
                checkedPosition: false,
                checkedCurrent: false,
                x: 25,
                y: 9,
                ground: {
                    id: 'ЗН-6кВ Т-1 яч.1',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                operational: true,
                positioning: working,
                contacts: {
                    id: 'яч.№1',
                    poweredOn: false,
                }
            },
            {
                id: 'ВВ-6кВ яч.12 Ввод-2',
                type: 'switcher6',
                turnedOn: true,
                checkedPosition: false,
                checkedCurrent: false,
                x: 2,
                y: 9,
                ground: {
                    id: 'ЗН-6кВ Т-2 яч.12',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                operational: true,
                positioning: working,
                contacts: {
                    id: 'яч.№12',
                    poweredOn: false,
                }
            },
            {
                id: 'ВВ-6кВ яч.3',
                type: 'switcher6',
                turnedOn: true,
                checkedPosition: false,
                checkedCurrent: false,
                x: 21,
                y: 9,
                ground: {
                    id: 'ЗН-6кВ яч.3',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                operational: true,
                positioning: working,
                contacts: {
                    id: 'яч.№3',
                    poweredOn: false,
                }
            },
            {
                id: 'ВВ-6кВ яч.4',
                type: 'switcher6',
                turnedOn: true,
                checkedPosition: false,
                checkedCurrent: false,
                x: 19,
                y: 9,
                ground: {
                    id: 'ЗН-6кВ яч.4',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                operational: true,
                positioning: working,
                contacts: {
                    id: 'яч.№4',
                    poweredOn: false,
                }
            },
            {
                id: 'ВВ-6кВ яч.5',
                type: 'switcher6',
                turnedOn: true,
                checkedPosition: false,
                checkedCurrent: false,
                x: 17,
                y: 9,
                ground: {
                    id: 'ЗН-6кВ яч.5',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                operational: true,
                positioning: working,
                contacts: {
                    id: 'яч.№5',
                    poweredOn: false,
                }
            },
            {
                id: 'СВВ-6кВ яч.6',
                type: 'switcher6',
                turnedOn: false,
                checkedPosition: false,
                checkedCurrent: false,
                x: 15,
                y: 9,
                ground: {
                    id: 'ЗН-6кВ СП-6кВ яч.6',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                operational: true,
                positioning: working,
                contacts: {
                    id: 'яч.№6',
                    poweredOn: false,
                },
                avr: true,
            },
            {
                id: 'СР-6кВ яч.7',
                type: 'switcher6',
                turnedOn: true,
                checkedPosition: false,
                checkedCurrent: false,
                x: 12,
                y: 9,
                ground: {
                    id: 'ЗН-6кВ СП-6кВ яч.7',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                operational: true,
                positioning: working,
                contacts: {
                    id: 'яч.№7',
                    poweredOn: false,
                }
            },
            {
                id: 'ВВ-6кВ яч.8',
                type: 'switcher6',
                turnedOn: true,
                checkedPosition: false,
                checkedCurrent: false,
                x: 10,
                y: 9,
                ground: {
                    id: 'ЗН-6кВ яч.8',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                operational: true,
                positioning: working,
                contacts: {
                    id: 'яч.№8',
                    poweredOn: false,
                }
            },
            {
                id: 'ВВ-6кВ яч.9',
                type: 'switcher6',
                turnedOn: true,
                checkedPosition: false,
                checkedCurrent: false,
                x: 8,
                y: 9,
                ground: {
                    id: 'ЗН-6кВ яч.9',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                operational: true,
                positioning: working,
                contacts: {
                    id: 'яч.№9',
                    poweredOn: false,
                }
            },
            {
                id: 'ВВ-6кВ яч.10',
                type: 'switcher6',
                turnedOn: true,
                checkedPosition: false,
                checkedCurrent: false,
                x: 6,
                y: 9,
                ground: {
                    id: 'ЗН-6кВ яч.10',
                    turnedOn: false,
                    checkedPosition: false,
                },
                posterPower: false,
                posterGround: false,
                operational: true,
                positioning: working,
                contacts: {
                    id: 'яч.№10',
                    poweredOn: false,
                }
            },
        ],
    },


    getResult() {
        // if() {}



        this._state.tn.map(item => {
            if (this._state.tasks.currentTask === this._state.tasks.normal_t1
            && this._state.tasks.currentTask === this._state.tasks.normal_t2
            && this._state.tasks.currentTask === this._state.tasks.t1_normal
            && this._state.tasks.currentTask === this._state.tasks.t2_normal) {
                if(!item.turnedOn) { this.addFails(`Не включен ${item.id}`) }
                if(!item.checkedVoltage) { this.addFails(`Не проверен уровень напряжения на ${item.id}`) }
                if(!item.checkedVoltage) { this.addFails(`Не проверен уровень напряжения на ${item.id}`) }
                item.ground.turnedOn = false;
                item.posterPower = false;
                item.posterGround = false;
                item.avTn = true;
            }
        });
        this._state.tsn.map(item => {
            item.turnedOn = true;
            item.checkedPosition = false;
            item.checkedCondition = false;
            item.posterPower = false;
            item.posterGround = false;
            item.sn.posterPower = false;
            item.sn.posterGround = false;
            item.sn.turnedOn = true;
            if (item.id === 'ТСН-6/0,4кВ №1') {
                item.turnedOn = false;
                item.posterPower = true;
                item.posterGround = true;
                item.sn.posterPower = true;
                item.sn.posterGround = true;
                item.sn.turnedOn = false;
            }
        });
        this._state.section35.sectionDisconnector1.turnedOn = false;
        this._state.section35.sectionDisconnector1.checkedPosition = false;
        this._state.section35.sectionDisconnector1.checkedCondition = false;
        this._state.section35.sectionDisconnector1.groundIn.turnedOn = false;
        this._state.section35.sectionDisconnector1.groundIn.checkedPosition = false;
        this._state.section35.sectionDisconnector1.groundOut.turnedOn = false;
        this._state.section35.sectionDisconnector1.groundOut.checkedPosition = false;
        this._state.section35.sectionDisconnector1.posterPower = false;
        this._state.section35.sectionDisconnector1.posterGround = false;

        this._state.section35.sectionDisconnector2.turnedOn = false;
        this._state.section35.sectionDisconnector2.checkedPosition = false;
        this._state.section35.sectionDisconnector2.checkedCondition = false;
        this._state.section35.sectionDisconnector2.groundIn.turnedOn = false;
        this._state.section35.sectionDisconnector2.groundIn.checkedPosition = false;
        this._state.section35.sectionDisconnector2.groundOut.turnedOn = true;
        this._state.section35.sectionDisconnector2.groundOut.checkedPosition = false;
        this._state.section35.sectionDisconnector2.posterPower = true;
        this._state.section35.sectionDisconnector2.posterGround = true;

        this._state.section35.sectionSwitcher35.turnedOn = false;
        this._state.section35.sectionSwitcher35.checkedPosition = false;
        this._state.section35.sectionSwitcher35.operational = true;
        this._state.section35.sectionSwitcher35.posterPower = false;
        this._state.section35.sectionSwitcher35.posterGround = false;
        this._state.disconnectors35.map(item => {
            item.turnedOn = true;
            item.checkedPosition = false;
            item.checkedCondition = false;
            item.posterPower = false;
            item.posterGround = false;
            item.groundIn.turnedOn = false;
            item.groundIn.checkedPosition = false;
            item.groundOut.turnedOn = false;
            item.groundOut.checkedPosition = false;
            if (item.id === 'ЛР-35кВ №1' || item.id === 'ЛР-35кВ №2') {
                item.turnedOn = false;
                item.posterPower = true;
                item.posterGround = true;
                item.groundOut.turnedOn = true;
            }
        });
        this._state.switchers35.map(item => {
            item.turnedOn = true;
            item.checkedPosition = false;
            item.posterGround = false;
            item.posterPower = false;
            item.operational = true;
            if (item.id === 'ВВ-35кВ №1' || item.id === 'ВВ-35кВ №2') {
                item.turnedOn = false;
                item.operational = false;
            }
        });
        this._state.switchers6.map(item => {
            item.turnedOn = true;
            item.checkedPosition = false;
            item.posterGround = false;
            item.posterPower = false;
            item.operational = true;
            item.ground.turnedOn = false;
            item.ground.checkedPosition = false;
            item.positioning = working;
            if (item.id === 'СВВ-6кВ яч.6') {
                item.avr = false;
                item.turnedOn = true;
            }
            if (item.id === 'ВВ-6кВ яч.1 Ввод-1') {
                item.checkedCurrent = false;
                item.turnedOn = false;
                item.operational = false;
                item.ground.turnedOn = true;
                item.posterGround = true;
                item.posterPower = true;
                item.positioning = 'remove';
            }
            if (item.id === 'ВВ-6кВ яч.12 Ввод-2') {
                item.checkedCurrent = false;
            }
        });


        // this._state.tasks.currentTask = task;
        // this._state.tasks.taskMenu = false;
        // this._state.tasks.warningText = [];
        // this._state.tasks.warning = false;
        // this._state.report = [];
        // this._state.fails = [];
        // this._state.score = 100;
        // this._state.actions = [];
        // this._state.waitList = [];
        // this._state.checkedUVN = false;

        switch (this._state.tasks.currentTask) {
            case this._state.tasks.normal_t1:
                this._state.tn.map(item => {
                    item.turnedOn = true;
                    item.checkedVoltage = false;
                    item.ground.turnedOn = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.avTn = true;
                });
                this._state.tsn.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.sn.posterPower = false;
                    item.sn.posterGround = false;
                    item.sn.turnedOn = true;
                    if (item.id === 'ТСН-6/0,4кВ №1') {
                        item.turnedOn = false;
                        item.posterPower = true;
                        item.posterGround = true;
                        item.sn.posterPower = true;
                        item.sn.posterGround = true;
                        item.sn.turnedOn = false;
                    }
                });
                this._state.section35.sectionDisconnector1.turnedOn = false;
                this._state.section35.sectionDisconnector1.checkedPosition = false;
                this._state.section35.sectionDisconnector1.checkedCondition = false;
                this._state.section35.sectionDisconnector1.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector1.groundOut.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector1.posterPower = false;
                this._state.section35.sectionDisconnector1.posterGround = false;

                this._state.section35.sectionDisconnector2.turnedOn = false;
                this._state.section35.sectionDisconnector2.checkedPosition = false;
                this._state.section35.sectionDisconnector2.checkedCondition = false;
                this._state.section35.sectionDisconnector2.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector2.groundOut.turnedOn = true;
                this._state.section35.sectionDisconnector2.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector2.posterPower = true;
                this._state.section35.sectionDisconnector2.posterGround = true;

                this._state.section35.sectionSwitcher35.turnedOn = false;
                this._state.section35.sectionSwitcher35.checkedPosition = false;
                this._state.section35.sectionSwitcher35.operational = true;
                this._state.section35.sectionSwitcher35.posterPower = false;
                this._state.section35.sectionSwitcher35.posterGround = false;
                this._state.disconnectors35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.groundIn.turnedOn = false;
                    item.groundIn.checkedPosition = false;
                    item.groundOut.turnedOn = false;
                    item.groundOut.checkedPosition = false;
                    if (item.id === 'ЛР-35кВ №1' || item.id === 'ЛР-35кВ №2') {
                        item.turnedOn = false;
                        item.posterPower = true;
                        item.posterGround = true;
                        item.groundOut.turnedOn = true;
                    }
                });
                this._state.switchers35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    if (item.id === 'ВВ-35кВ №1' || item.id === 'ВВ-35кВ №2') {
                        item.turnedOn = false;
                        item.operational = false;
                    }
                });
                this._state.switchers6.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    item.ground.turnedOn = false;
                    item.ground.checkedPosition = false;
                    item.positioning = working;
                    if (item.id === 'СВВ-6кВ яч.6') {
                        item.avr = false;
                        item.turnedOn = true;
                    }
                    if (item.id === 'ВВ-6кВ яч.1 Ввод-1') {
                        item.checkedCurrent = false;
                        item.turnedOn = false;
                        item.operational = false;
                        item.ground.turnedOn = true;
                        item.posterGround = true;
                        item.posterPower = true;
                        item.positioning = 'remove';
                    }
                    if (item.id === 'ВВ-6кВ яч.12 Ввод-2') {
                        item.checkedCurrent = false;
                    }
                });
                break;

            case this._state.tasks.normal_t2:
                this._state.tn.map(item => {
                    item.turnedOn = true;
                    item.checkedVoltage = false;
                    item.ground.turnedOn = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.avTn = true;
                });
                this._state.tsn.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.sn.posterPower = false;
                    item.sn.posterGround = false;
                    item.sn.turnedOn = false;
                });
                this._state.section35.sectionDisconnector1.turnedOn = false;
                this._state.section35.sectionDisconnector1.checkedPosition = false;
                this._state.section35.sectionDisconnector1.checkedCondition = false;
                this._state.section35.sectionDisconnector1.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector1.groundOut.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector1.posterPower = false;
                this._state.section35.sectionDisconnector1.posterGround = false;
                this._state.section35.sectionDisconnector2.turnedOn = true;
                this._state.section35.sectionDisconnector2.checkedPosition = false;
                this._state.section35.sectionDisconnector2.checkedCondition = false;
                this._state.section35.sectionDisconnector2.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector2.groundOut.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector2.posterPower = false;
                this._state.section35.sectionDisconnector2.posterGround = false;
                this._state.section35.sectionSwitcher35.turnedOn = false;
                this._state.section35.sectionSwitcher35.checkedPosition = false;
                this._state.section35.sectionSwitcher35.operational = true;
                this._state.section35.sectionSwitcher35.posterPower = false;
                this._state.section35.sectionSwitcher35.posterGround = false;
                this._state.disconnectors35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.groundIn.turnedOn = false;
                    item.groundIn.checkedPosition = false;
                    item.groundOut.turnedOn = false;
                    item.groundOut.checkedPosition = false;
                    if (item.id === 'ЛР-35кВ №4' || item.id === 'ЛР-35кВ №2') {
                        item.turnedOn = false;
                    }
                });
                this._state.switchers35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    if (item.id === 'ВВ-35кВ №4' || item.id === 'ВВ-35кВ №2') {
                        item.turnedOn = false;
                    }
                });
                this._state.switchers6.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    item.ground.turnedOn = false;
                    item.ground.checkedPosition = false;
                    item.positioning = working;
                    if (item.id === 'СВВ-6кВ яч.6') {
                        item.avr = true;
                        item.turnedOn = false;
                    }
                    if (item.id === 'ВВ-6кВ яч.1 Ввод-1' || item.id === 'ВВ-6кВ яч.12 Ввод-2') {
                        item.checkedCurrent = false;
                    }
                });
                break;

            case this._state.tasks.t1_normal:
                this._state.tn.map(item => {
                    item.turnedOn = true;
                    item.checkedVoltage = false;
                    item.ground.turnedOn = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.avTn = true;
                });
                this._state.tsn.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.sn.posterPower = false;
                    item.sn.posterGround = false;
                    item.sn.turnedOn = true;
                    if (item.id === 'ТСН-6/0,4кВ №1') {
                        item.turnedOn = false;
                        item.posterPower = true;
                        item.posterGround = true;
                        item.sn.posterPower = true;
                        item.sn.posterGround = true;
                        item.sn.turnedOn = false;
                    }
                });
                this._state.section35.sectionDisconnector1.turnedOn = false;
                this._state.section35.sectionDisconnector1.checkedPosition = false;
                this._state.section35.sectionDisconnector1.checkedCondition = false;
                this._state.section35.sectionDisconnector1.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector1.groundOut.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector1.posterPower = false;
                this._state.section35.sectionDisconnector1.posterGround = false;

                this._state.section35.sectionDisconnector2.turnedOn = false;
                this._state.section35.sectionDisconnector2.checkedPosition = false;
                this._state.section35.sectionDisconnector2.checkedCondition = false;
                this._state.section35.sectionDisconnector2.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector2.groundOut.turnedOn = true;
                this._state.section35.sectionDisconnector2.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector2.posterPower = true;
                this._state.section35.sectionDisconnector2.posterGround = true;

                this._state.section35.sectionSwitcher35.turnedOn = false;
                this._state.section35.sectionSwitcher35.checkedPosition = false;
                this._state.section35.sectionSwitcher35.operational = true;
                this._state.section35.sectionSwitcher35.posterPower = false;
                this._state.section35.sectionSwitcher35.posterGround = false;
                this._state.disconnectors35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.groundIn.turnedOn = false;
                    item.groundIn.checkedPosition = false;
                    item.groundOut.turnedOn = false;
                    item.groundOut.checkedPosition = false;
                    if (item.id === 'ЛР-35кВ №1' || item.id === 'ЛР-35кВ №2') {
                        item.turnedOn = false;
                        item.posterPower = true;
                        item.posterGround = true;
                        item.groundOut.turnedOn = true;
                    }
                });
                this._state.switchers35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    if (item.id === 'ВВ-35кВ №1' || item.id === 'ВВ-35кВ №2') {
                        item.turnedOn = false;
                        item.operational = false;
                    }
                });
                this._state.switchers6.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    item.ground.turnedOn = false;
                    item.ground.checkedPosition = false;
                    item.positioning = working;
                    if (item.id === 'СВВ-6кВ яч.6') {
                        item.avr = false;
                        item.turnedOn = true;
                    }
                    if (item.id === 'ВВ-6кВ яч.1 Ввод-1') {
                        item.checkedCurrent = false;
                        item.turnedOn = false;
                        item.operational = false;
                        item.ground.turnedOn = true;
                        item.posterGround = true;
                        item.posterPower = true;
                        item.positioning = 'remove';
                    }
                    if (item.id === 'ВВ-6кВ яч.12 Ввод-2') {
                        item.checkedCurrent = false;
                    }
                });
                break;

            case this._state.tasks.t2_normal:
                this._state.tn.map(item => {
                    item.turnedOn = true;
                    item.checkedVoltage = false;
                    item.ground.turnedOn = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.avTn = true;
                });
                this._state.tsn.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.sn.posterPower = false;
                    item.sn.posterGround = false;
                    item.sn.turnedOn = true;
                    if (item.id === 'ТСН-6/0,4кВ №2') {
                        item.turnedOn = false;
                        item.posterPower = true;
                        item.posterGround = true;
                        item.sn.posterPower = true;
                        item.sn.posterGround = true;
                        item.sn.turnedOn = false;
                    }
                });
                this._state.section35.sectionDisconnector2.turnedOn = false;
                this._state.section35.sectionDisconnector2.checkedPosition = false;
                this._state.section35.sectionDisconnector2.checkedCondition = false;
                this._state.section35.sectionDisconnector2.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector2.groundOut.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector2.posterPower = false;
                this._state.section35.sectionDisconnector2.posterGround = false;

                this._state.section35.sectionDisconnector1.turnedOn = false;
                this._state.section35.sectionDisconnector1.checkedPosition = false;
                this._state.section35.sectionDisconnector1.checkedCondition = false;
                this._state.section35.sectionDisconnector1.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector1.groundOut.turnedOn = true;
                this._state.section35.sectionDisconnector1.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector1.posterPower = true;
                this._state.section35.sectionDisconnector1.posterGround = true;

                this._state.section35.sectionSwitcher35.turnedOn = false;
                this._state.section35.sectionSwitcher35.checkedPosition = false;
                this._state.section35.sectionSwitcher35.operational = true;
                this._state.section35.sectionSwitcher35.posterPower = false;
                this._state.section35.sectionSwitcher35.posterGround = false;
                this._state.disconnectors35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.groundIn.turnedOn = false;
                    item.groundIn.checkedPosition = false;
                    item.groundOut.turnedOn = false;
                    item.groundOut.checkedPosition = false;
                    if (item.id === 'ЛР-35кВ №3' || item.id === 'ЛР-35кВ №4') {
                        item.turnedOn = false;
                        item.posterPower = true;
                        item.posterGround = true;
                        item.groundOut.turnedOn = true;
                    }
                });
                this._state.switchers35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    if (item.id === 'ВВ-35кВ №3' || item.id === 'ВВ-35кВ №4') {
                        item.turnedOn = false;
                        item.operational = false;
                    }
                });
                this._state.switchers6.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    item.ground.turnedOn = false;
                    item.ground.checkedPosition = false;
                    item.positioning = working;
                    if (item.id === 'СВВ-6кВ яч.6') {
                        item.avr = false;
                        item.turnedOn = true;
                    }
                    if (item.id === 'ВВ-6кВ яч.12 Ввод-2') {
                        item.checkedCurrent = false;
                        item.turnedOn = false;
                        item.operational = false;
                        item.ground.turnedOn = true;
                        item.posterGround = true;
                        item.posterPower = true;
                        item.positioning = 'remove';
                    }
                    if (item.id === 'ВВ-6кВ яч.1 Ввод-1') {
                        item.checkedCurrent = false;
                    }
                });
                break;
            default:
                console.log('Unexpected type');

        }
        this._callSubscriber();
        this.poweredOn(this._state);
    },


    showWarning() {
        this._state.tasks.warning = !this._state.tasks.warning;
        this._callSubscriber();
    },

    showTaskMenu() {
        this._state.tasks.taskMenu = !this._state.tasks.taskMenu;
        this._callSubscriber();
    },

    changeSettings(settings, onOff) {
        switch (settings) {
            case 'color':
                this._state.settings.color = onOff;
                break;
            default:
                console.log('Unexpected type')
        }
        this._callSubscriber();
    },

    _checkLeftGround(state) {
        state.tn.map(item => {
            if (item.ground.turnedOn && item.contacts.poweredOn) {
                this.addFails(`Не отключены ${item.ground.id}!`, 50)
                this.addWarning(`Вы подали напряжение на включенные ${item.ground.id}`)
            }
            return null
        });
        state.switchers6.map(item => {
            if (item.ground.turnedOn && item.contacts.poweredOn) {
                this.addFails(`Не отключены ${item.ground.id}!`, 50)
                this.addWarning(`Вы подали напряжение на включенные ${item.ground.id}`)
            }
            return null
        });
        state.disconnectors35.map(item => {
            if (item.groundIn.turnedOn && item.contacts.in.poweredOn) {
                this.addFails(`Не отключены ${item.groundIn.id}!`, 50)
                this.addWarning(`Вы подали напряжение на включенные ${item.groundIn.id}`)
            }
            if (item.groundOut.turnedOn && item.contacts.out.poweredOn) {
                this.addFails(`Не отключены ${item.groundOut.id}!`, 50)
                this.addWarning(`Вы подали напряжение на включенные ${item.groundOut.id}`)
            }
            return null
        });
        if (state.section35.sectionDisconnector1.groundIn.turnedOn && state.section35.sectionDisconnector1.contacts.in.poweredOn) {
            this.addFails(`Не отключены ${state.section35.sectionDisconnector1.groundIn.id}!`, 50)
            this.addWarning(`Вы подали напряжение на включенные ${state.section35.sectionDisconnector1.groundIn.id}`)
        }
        if (state.section35.sectionDisconnector1.groundOut.turnedOn && state.section35.sectionDisconnector1.contacts.out.poweredOn) {
            this.addFails(`Не отключены ${state.section35.sectionDisconnector1.groundOut.id}!`, 50)
            this.addWarning(`Вы подали напряжение на включенные ${state.section35.sectionDisconnector1.groundOut.id}`)

        }
        if (state.section35.sectionDisconnector2.groundIn.turnedOn && state.section35.sectionDisconnector2.contacts.in.poweredOn) {
            this.addFails(`Не отключены ${state.section35.sectionDisconnector2.groundIn.id}!`, 50)
            this.addWarning(`Вы подали напряжение на включенные ${state.section35.sectionDisconnector2.groundIn.id}`)

        }
        if (state.section35.sectionDisconnector2.groundOut.turnedOn && state.section35.sectionDisconnector2.contacts.out.poweredOn) {
            this.addFails(`Не отключены ${state.section35.sectionDisconnector2.groundOut.id}!`, 50)
            this.addWarning(`Вы подали напряжение на включенные ${state.section35.sectionDisconnector2.groundOut.id}`)
        }
    },

    addWarning(warning) {
        this._state.tasks.warningText.push(warning);
        this._state.tasks.warning = true;
        this._state.score = 0;
    },

    restart() {
        this.chooseTask(this._state.tasks.currentTask);
        // this._callSubscriber();
    },

    checkResult() {

    },

    checkLeftPowered() {
        if (!this._state.tn[0].contacts.poweredOn) {
            this.addFails(`Пропало напряжение на ${this._state.tn[0].contacts.id}!`, 50);
            this.addWarning(`Вы погасили ${this._state.tn[0].contacts.id}!`)
        }
        if (!this._state.tn[1].contacts.poweredOn) {
            this.addFails(`Пропало напряжение на ${this._state.tn[1].contacts.id}!`, 50);
            this.addWarning(`Вы погасили ${this._state.tn[1].contacts.id}!`)
        }
    },

    chooseTask(task) {
        this._state.tasks.currentTask = task;
        this._state.tasks.taskMenu = false;
        this._state.tasks.warningText = [];
        this._state.tasks.warning = false;
        this._state.report = [];
        this._state.fails = [];
        this._state.score = 100;
        this._state.actions = [];
        this._state.waitList = [];
        this._state.checkedUVN = false;

        switch (task) {
            case this._state.tasks.normal_t1:
                this._state.tn.map(item => {
                    item.turnedOn = true;
                    item.checkedVoltage = false;
                    item.ground.turnedOn = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.avTn = true;
                });
                this._state.tsn.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.sn.posterPower = false;
                    item.sn.posterGround = false;
                    item.sn.turnedOn = false;
                });
                this._state.section35.sectionDisconnector1.turnedOn = false;
                this._state.section35.sectionDisconnector1.checkedPosition = false;
                this._state.section35.sectionDisconnector1.checkedCondition = false;
                this._state.section35.sectionDisconnector1.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector1.groundOut.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector1.posterPower = false;
                this._state.section35.sectionDisconnector1.posterGround = false;
                this._state.section35.sectionDisconnector2.turnedOn = true;
                this._state.section35.sectionDisconnector2.checkedPosition = false;
                this._state.section35.sectionDisconnector2.checkedCondition = false;
                this._state.section35.sectionDisconnector2.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector2.groundOut.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector2.posterPower = false;
                this._state.section35.sectionDisconnector2.posterGround = false;
                this._state.section35.sectionSwitcher35.turnedOn = false;
                this._state.section35.sectionSwitcher35.checkedPosition = false;
                this._state.section35.sectionSwitcher35.operational = true;
                this._state.section35.sectionSwitcher35.posterPower = false;
                this._state.section35.sectionSwitcher35.posterGround = false;
                this._state.disconnectors35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.groundIn.turnedOn = false;
                    item.groundIn.checkedPosition = false;
                    item.groundOut.turnedOn = false;
                    item.groundOut.checkedPosition = false;
                    if (item.id === 'ЛР-35кВ №4' || item.id === 'ЛР-35кВ №2') {
                        item.turnedOn = false;
                    }
                });
                this._state.switchers35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    if (item.id === 'ВВ-35кВ №4' || item.id === 'ВВ-35кВ №2') {
                        item.turnedOn = false;
                    }
                });
                this._state.switchers6.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    item.ground.turnedOn = false;
                    item.ground.checkedPosition = false;
                    item.positioning = working;
                    if (item.id === 'СВВ-6кВ яч.6') {
                        item.avr = true;
                        item.turnedOn = false;
                    }
                    if (item.id === 'ВВ-6кВ яч.1 Ввод-1' || item.id === 'ВВ-6кВ яч.12 Ввод-2') {
                        item.checkedCurrent = false;
                    }
                });
                break;

            case this._state.tasks.normal_t2:
                this._state.tn.map(item => {
                    item.turnedOn = true;
                    item.checkedVoltage = false;
                    item.ground.turnedOn = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.avTn = true;
                });
                this._state.tsn.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.sn.posterPower = false;
                    item.sn.posterGround = false;
                    item.sn.turnedOn = false;
                });
                this._state.section35.sectionDisconnector1.turnedOn = false;
                this._state.section35.sectionDisconnector1.checkedPosition = false;
                this._state.section35.sectionDisconnector1.checkedCondition = false;
                this._state.section35.sectionDisconnector1.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector1.groundOut.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector1.posterPower = false;
                this._state.section35.sectionDisconnector1.posterGround = false;
                this._state.section35.sectionDisconnector2.turnedOn = true;
                this._state.section35.sectionDisconnector2.checkedPosition = false;
                this._state.section35.sectionDisconnector2.checkedCondition = false;
                this._state.section35.sectionDisconnector2.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector2.groundOut.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector2.posterPower = false;
                this._state.section35.sectionDisconnector2.posterGround = false;
                this._state.section35.sectionSwitcher35.turnedOn = false;
                this._state.section35.sectionSwitcher35.checkedPosition = false;
                this._state.section35.sectionSwitcher35.operational = true;
                this._state.section35.sectionSwitcher35.posterPower = false;
                this._state.section35.sectionSwitcher35.posterGround = false;
                this._state.disconnectors35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.groundIn.turnedOn = false;
                    item.groundIn.checkedPosition = false;
                    item.groundOut.turnedOn = false;
                    item.groundOut.checkedPosition = false;
                    if (item.id === 'ЛР-35кВ №4' || item.id === 'ЛР-35кВ №2') {
                        item.turnedOn = false;
                    }
                });
                this._state.switchers35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    if (item.id === 'ВВ-35кВ №4' || item.id === 'ВВ-35кВ №2') {
                        item.turnedOn = false;
                    }
                });
                this._state.switchers6.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    item.ground.turnedOn = false;
                    item.ground.checkedPosition = false;
                    item.positioning = working;
                    if (item.id === 'СВВ-6кВ яч.6') {
                        item.avr = true;
                        item.turnedOn = false;
                    }
                    if (item.id === 'ВВ-6кВ яч.1 Ввод-1' || item.id === 'ВВ-6кВ яч.12 Ввод-2') {
                        item.checkedCurrent = false;
                    }
                });
                break;

            case this._state.tasks.t1_normal:
                this._state.tn.map(item => {
                    item.turnedOn = true;
                    item.checkedVoltage = false;
                    item.ground.turnedOn = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.avTn = true;
                });
                this._state.tsn.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.sn.posterPower = false;
                    item.sn.posterGround = false;
                    item.sn.turnedOn = true;
                    if (item.id === 'ТСН-6/0,4кВ №1') {
                        item.turnedOn = false;
                        item.posterPower = true;
                        item.posterGround = true;
                        item.sn.posterPower = true;
                        item.sn.posterGround = true;
                        item.sn.turnedOn = false;
                    }
                });
                this._state.section35.sectionDisconnector1.turnedOn = false;
                this._state.section35.sectionDisconnector1.checkedPosition = false;
                this._state.section35.sectionDisconnector1.checkedCondition = false;
                this._state.section35.sectionDisconnector1.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector1.groundOut.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector1.posterPower = false;
                this._state.section35.sectionDisconnector1.posterGround = false;

                this._state.section35.sectionDisconnector2.turnedOn = false;
                this._state.section35.sectionDisconnector2.checkedPosition = false;
                this._state.section35.sectionDisconnector2.checkedCondition = false;
                this._state.section35.sectionDisconnector2.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector2.groundOut.turnedOn = true;
                this._state.section35.sectionDisconnector2.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector2.posterPower = true;
                this._state.section35.sectionDisconnector2.posterGround = true;

                this._state.section35.sectionSwitcher35.turnedOn = false;
                this._state.section35.sectionSwitcher35.checkedPosition = false;
                this._state.section35.sectionSwitcher35.operational = true;
                this._state.section35.sectionSwitcher35.posterPower = false;
                this._state.section35.sectionSwitcher35.posterGround = false;
                this._state.disconnectors35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.groundIn.turnedOn = false;
                    item.groundIn.checkedPosition = false;
                    item.groundOut.turnedOn = false;
                    item.groundOut.checkedPosition = false;
                    if (item.id === 'ЛР-35кВ №1' || item.id === 'ЛР-35кВ №2') {
                        item.turnedOn = false;
                        item.posterPower = true;
                        item.posterGround = true;
                        item.groundOut.turnedOn = true;
                    }
                });
                this._state.switchers35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    if (item.id === 'ВВ-35кВ №1' || item.id === 'ВВ-35кВ №2') {
                        item.turnedOn = false;
                        item.operational = false;
                    }
                });
                this._state.switchers6.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    item.ground.turnedOn = false;
                    item.ground.checkedPosition = false;
                    item.positioning = working;
                    if (item.id === 'СВВ-6кВ яч.6') {
                        item.avr = false;
                        item.turnedOn = true;
                    }
                    if (item.id === 'ВВ-6кВ яч.1 Ввод-1') {
                        item.checkedCurrent = false;
                        item.turnedOn = false;
                        item.operational = false;
                        item.ground.turnedOn = true;
                        item.posterGround = true;
                        item.posterPower = true;
                        item.positioning = 'remove';
                    }
                    if (item.id === 'ВВ-6кВ яч.12 Ввод-2') {
                        item.checkedCurrent = false;
                    }
                });
                break;

            case this._state.tasks.t2_normal:
                this._state.tn.map(item => {
                    item.turnedOn = true;
                    item.checkedVoltage = false;
                    item.ground.turnedOn = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.avTn = true;
                });
                this._state.tsn.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.sn.posterPower = false;
                    item.sn.posterGround = false;
                    item.sn.turnedOn = true;
                    if (item.id === 'ТСН-6/0,4кВ №2') {
                        item.turnedOn = false;
                        item.posterPower = true;
                        item.posterGround = true;
                        item.sn.posterPower = true;
                        item.sn.posterGround = true;
                        item.sn.turnedOn = false;
                    }
                });
                this._state.section35.sectionDisconnector2.turnedOn = false;
                this._state.section35.sectionDisconnector2.checkedPosition = false;
                this._state.section35.sectionDisconnector2.checkedCondition = false;
                this._state.section35.sectionDisconnector2.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector2.groundOut.turnedOn = false;
                this._state.section35.sectionDisconnector2.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector2.posterPower = false;
                this._state.section35.sectionDisconnector2.posterGround = false;

                this._state.section35.sectionDisconnector1.turnedOn = false;
                this._state.section35.sectionDisconnector1.checkedPosition = false;
                this._state.section35.sectionDisconnector1.checkedCondition = false;
                this._state.section35.sectionDisconnector1.groundIn.turnedOn = false;
                this._state.section35.sectionDisconnector1.groundIn.checkedPosition = false;
                this._state.section35.sectionDisconnector1.groundOut.turnedOn = true;
                this._state.section35.sectionDisconnector1.groundOut.checkedPosition = false;
                this._state.section35.sectionDisconnector1.posterPower = true;
                this._state.section35.sectionDisconnector1.posterGround = true;

                this._state.section35.sectionSwitcher35.turnedOn = false;
                this._state.section35.sectionSwitcher35.checkedPosition = false;
                this._state.section35.sectionSwitcher35.operational = true;
                this._state.section35.sectionSwitcher35.posterPower = false;
                this._state.section35.sectionSwitcher35.posterGround = false;
                this._state.disconnectors35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.checkedCondition = false;
                    item.posterPower = false;
                    item.posterGround = false;
                    item.groundIn.turnedOn = false;
                    item.groundIn.checkedPosition = false;
                    item.groundOut.turnedOn = false;
                    item.groundOut.checkedPosition = false;
                    if (item.id === 'ЛР-35кВ №3' || item.id === 'ЛР-35кВ №4') {
                        item.turnedOn = false;
                        item.posterPower = true;
                        item.posterGround = true;
                        item.groundOut.turnedOn = true;
                    }
                });
                this._state.switchers35.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    if (item.id === 'ВВ-35кВ №3' || item.id === 'ВВ-35кВ №4') {
                        item.turnedOn = false;
                        item.operational = false;
                    }
                });
                this._state.switchers6.map(item => {
                    item.turnedOn = true;
                    item.checkedPosition = false;
                    item.posterGround = false;
                    item.posterPower = false;
                    item.operational = true;
                    item.ground.turnedOn = false;
                    item.ground.checkedPosition = false;
                    item.positioning = working;
                    if (item.id === 'СВВ-6кВ яч.6') {
                        item.avr = false;
                        item.turnedOn = true;
                    }
                    if (item.id === 'ВВ-6кВ яч.12 Ввод-2') {
                        item.checkedCurrent = false;
                        item.turnedOn = false;
                        item.operational = false;
                        item.ground.turnedOn = true;
                        item.posterGround = true;
                        item.posterPower = true;
                        item.positioning = 'remove';
                    }
                    if (item.id === 'ВВ-6кВ яч.1 Ввод-1') {
                        item.checkedCurrent = false;
                    }
                });
                break;
            default:
                console.log('Unexpected type');

        }
        this._callSubscriber();
        this.poweredOn(this._state);
    },

    poweredOn(state) {
        let vl1 = state.disconnectors35[3].contacts.in.poweredOn;
        let vl2 = state.disconnectors35[2].contacts.in.poweredOn;
        let vl3 = state.disconnectors35[1].contacts.in.poweredOn;
        let vl4 = state.disconnectors35[0].contacts.in.poweredOn;

        let sr1 = state.section35.sectionDisconnector1.turnedOn;
        let sr2 = state.section35.sectionDisconnector2.turnedOn;
        let svv35 = state.section35.sectionSwitcher35.turnedOn;

        let lr4 = state.disconnectors35[0].turnedOn;
        let lr3 = state.disconnectors35[1].turnedOn;
        let lr2 = state.disconnectors35[2].turnedOn;
        let lr1 = state.disconnectors35[3].turnedOn;
        let tr2 = state.disconnectors35[4].turnedOn;
        let tr1 = state.disconnectors35[5].turnedOn;

        let vv4 = state.switchers35[0].turnedOn;
        let vv3 = state.switchers35[1].turnedOn;
        let vv2 = state.switchers35[2].turnedOn;
        let vv1 = state.switchers35[3].turnedOn;
        let vvt2 = state.switchers35[4].turnedOn;
        let vvt1 = state.switchers35[5].turnedOn;


        let enter1 = state.switchers6[0].positioning === working && state.switchers6[0].turnedOn;
        let enter2 = state.switchers6[1].positioning === working && state.switchers6[1].turnedOn;
        let svv6 = state.switchers6[5].positioning === working && state.switchers6[5].turnedOn;
        let sr6 = state.switchers6[6].positioning === working && state.switchers6[6].turnedOn;

        let f3 = state.switchers6[2].positioning === working && state.switchers6[2].turnedOn;
        let f4 = state.switchers6[3].positioning === working && state.switchers6[3].turnedOn;
        let f5 = state.switchers6[4].positioning === working && state.switchers6[4].turnedOn;
        let f8 = state.switchers6[7].positioning === working && state.switchers6[7].turnedOn;
        let f9 = state.switchers6[8].positioning === working && state.switchers6[8].turnedOn;
        let f10 = state.switchers6[9].positioning === working && state.switchers6[9].turnedOn;

        let dcSn1 = state.tsn[0].turnedOn;
        let dcSn2 = state.tsn[1].turnedOn;

        // СП-6
        state.switchers6[5].contacts.poweredOn = false;
        state.switchers6[6].contacts.poweredOn = false;

// СШ-6 1
        if (vl1 && lr1 && vv1 && tr1 && vvt1 && enter1) {
            state.tn[0].contacts.poweredOn = true;
            state.switchers6[2].contacts.poweredOn = f3;
            state.switchers6[3].contacts.poweredOn = f4;
            state.switchers6[4].contacts.poweredOn = f5;
            if (svv6) {
                state.switchers6[5].contacts.poweredOn = true;
                state.switchers6[6].contacts.poweredOn = true;
            }
        } else if (vl2 && lr2 && vv2 && tr1 && vvt1 && enter1) {
            state.tn[0].contacts.poweredOn = true;
            state.switchers6[2].contacts.poweredOn = f3;
            state.switchers6[3].contacts.poweredOn = f4;
            state.switchers6[4].contacts.poweredOn = f5;
            if (svv6) {
                state.switchers6[5].contacts.poweredOn = true;
                state.switchers6[6].contacts.poweredOn = true;
            }
        } else if (vl1 && lr1 && vv1 && sr1 && svv35 && sr2 && tr2 && vvt2 && enter2 && svv6 && sr6) {
            state.tn[0].contacts.poweredOn = true;
            state.switchers6[2].contacts.poweredOn = f3;
            state.switchers6[3].contacts.poweredOn = f4;
            state.switchers6[4].contacts.poweredOn = f5;
            state.switchers6[5].contacts.poweredOn = true;
            state.switchers6[6].contacts.poweredOn = true;
        } else if (vl2 && lr2 && vv2 && sr1 && svv35 && sr2 && tr2 && vvt2 && enter2 && svv6 && sr6) {
            state.tn[0].contacts.poweredOn = true;
            state.switchers6[2].contacts.poweredOn = f3;
            state.switchers6[3].contacts.poweredOn = f4;
            state.switchers6[4].contacts.poweredOn = f5;
            state.switchers6[5].contacts.poweredOn = true;
            state.switchers6[6].contacts.poweredOn = true;

        } else if (vl3 && lr3 && vv3 && tr2 && vvt2 && enter2 && svv6 && sr6) {
            state.tn[0].contacts.poweredOn = true;
            state.switchers6[2].contacts.poweredOn = f3;
            state.switchers6[3].contacts.poweredOn = f4;
            state.switchers6[4].contacts.poweredOn = f5;
            state.switchers6[5].contacts.poweredOn = true;
            state.switchers6[6].contacts.poweredOn = true;


        } else if (vl4 && lr4 && vv4 && tr2 && vvt2 && enter2 && svv6 && sr6) {
            state.tn[0].contacts.poweredOn = true;
            state.switchers6[2].contacts.poweredOn = f3;
            state.switchers6[3].contacts.poweredOn = f4;
            state.switchers6[4].contacts.poweredOn = f5;
            state.switchers6[5].contacts.poweredOn = true;
            state.switchers6[6].contacts.poweredOn = true;


        } else if (vl3 && lr3 && vv3 && sr2 && svv35 && sr1 && tr1 && vvt1 && enter1) {

            state.tn[0].contacts.poweredOn = true;
            state.switchers6[2].contacts.poweredOn = f3;
            state.switchers6[3].contacts.poweredOn = f4;
            state.switchers6[4].contacts.poweredOn = f5;
            if (svv6) {
                state.switchers6[5].contacts.poweredOn = true;
                state.switchers6[6].contacts.poweredOn = true;
            }
        } else if (vl4 && lr4 && vv4 && sr2 && svv35 && sr1 && tr1 && vvt1 && enter1) {

            state.tn[0].contacts.poweredOn = true;
            state.switchers6[2].contacts.poweredOn = f3;
            state.switchers6[3].contacts.poweredOn = f4;
            state.switchers6[4].contacts.poweredOn = f5;
            if (svv6) {
                state.switchers6[5].contacts.poweredOn = true;
                state.switchers6[6].contacts.poweredOn = true;
            }
        } else {

            state.tn[0].contacts.poweredOn = false;
            state.switchers6[2].contacts.poweredOn = false;
            state.switchers6[3].contacts.poweredOn = false;
            state.switchers6[4].contacts.poweredOn = false;
        }

        // СШ-6 2
        if (vl3 && lr3 && vv3 && tr2 && vvt2 && enter2) {
            state.tn[1].contacts.poweredOn = true;
            state.switchers6[7].contacts.poweredOn = f8;
            state.switchers6[8].contacts.poweredOn = f9;
            state.switchers6[9].contacts.poweredOn = f10;
            if (sr6) {
                state.switchers6[5].contacts.poweredOn = true;
                state.switchers6[6].contacts.poweredOn = true;
            }
        } else if (vl4 && lr4 && vv4 && tr2 && vvt2 && enter2) {
            state.tn[1].contacts.poweredOn = true;
            state.switchers6[7].contacts.poweredOn = f8;
            state.switchers6[8].contacts.poweredOn = f9;
            state.switchers6[9].contacts.poweredOn = f10;
            if (sr6) {
                state.switchers6[5].contacts.poweredOn = true;
                state.switchers6[6].contacts.poweredOn = true;
            }
        } else if (vl3 && lr3 && vv3 && sr1 && svv35 && sr2 && tr1 && vvt1 && enter1 && svv6 && sr6) {
            state.tn[1].contacts.poweredOn = true;
            state.switchers6[7].contacts.poweredOn = f8;
            state.switchers6[8].contacts.poweredOn = f9;
            state.switchers6[9].contacts.poweredOn = f10;
            state.switchers6[5].contacts.poweredOn = true;
            state.switchers6[6].contacts.poweredOn = true;
        } else if (vl4 && lr4 && vv4 && sr1 && svv35 && sr2 && tr1 && vvt1 && enter1 && svv6 && sr6) {
            state.tn[1].contacts.poweredOn = true;
            state.switchers6[7].contacts.poweredOn = f8;
            state.switchers6[8].contacts.poweredOn = f9;
            state.switchers6[9].contacts.poweredOn = f10;
            state.switchers6[5].contacts.poweredOn = true;
            state.switchers6[6].contacts.poweredOn = true;
        } else if (vl1 && lr1 && vv1 && tr1 && vvt1 && enter1 && svv6 && sr6) {
            state.tn[1].contacts.poweredOn = true;
            state.switchers6[7].contacts.poweredOn = f8;
            state.switchers6[8].contacts.poweredOn = f9;
            state.switchers6[9].contacts.poweredOn = f10;
            state.switchers6[5].contacts.poweredOn = true;
            state.switchers6[6].contacts.poweredOn = true;
        } else if (vl2 && lr2 && vv2 && tr1 && vvt1 && enter1 && svv6 && sr6) {
            state.tn[1].contacts.poweredOn = true;
            state.switchers6[7].contacts.poweredOn = f8;
            state.switchers6[8].contacts.poweredOn = f9;
            state.switchers6[9].contacts.poweredOn = f10;
            state.switchers6[5].contacts.poweredOn = true;
            state.switchers6[6].contacts.poweredOn = true;
        } else if (vl1 && lr1 && vv1 && sr2 && svv35 && sr1 && tr2 && vvt2 && enter2) {
            state.tn[1].contacts.poweredOn = true;
            state.switchers6[7].contacts.poweredOn = f8;
            state.switchers6[8].contacts.poweredOn = f9;
            state.switchers6[9].contacts.poweredOn = f10;
            if (sr6) {
                state.switchers6[5].contacts.poweredOn = true;
                state.switchers6[6].contacts.poweredOn = true;
            }
        } else if (vl2 && lr2 && vv2 && sr2 && svv35 && sr1 && tr2 && vvt2 && enter2) {
            state.tn[1].contacts.poweredOn = true;
            state.switchers6[7].contacts.poweredOn = f8;
            state.switchers6[8].contacts.poweredOn = f9;
            state.switchers6[9].contacts.poweredOn = f10;
            if (sr6) {
                state.switchers6[5].contacts.poweredOn = true;
                state.switchers6[6].contacts.poweredOn = true;
            }
        } else {
            state.tn[1].contacts.poweredOn = false;
            state.switchers6[7].contacts.poweredOn = false;
            state.switchers6[8].contacts.poweredOn = false;
            state.switchers6[9].contacts.poweredOn = false;
        }

        // СШ-35кВ №1
        if (vl1 && lr1 && vv1) {
            state.section35.sectionDisconnector1.contacts.in.poweredOn = true;
            state.disconnectors35[5].contacts.in.poweredOn = true
        } else if (vl2 && lr2 && vv2) {
            state.section35.sectionDisconnector1.contacts.in.poweredOn = true;
            state.disconnectors35[5].contacts.in.poweredOn = true
        } else if (vl3 && lr3 && vv3 && sr1 && sr2 && svv35) {
            state.section35.sectionDisconnector1.contacts.in.poweredOn = true;
            state.disconnectors35[5].contacts.in.poweredOn = true
        } else if (vl4 && lr4 && vv4 && sr1 && sr2 && svv35) {
            state.section35.sectionDisconnector1.contacts.in.poweredOn = true;
            state.disconnectors35[5].contacts.in.poweredOn = true
        } else if (vl3 && lr3 && vv3 && vvt2 && tr2 && enter1 && sr6 && svv6 && enter2 && vvt1 && tr1) {
            state.section35.sectionDisconnector1.contacts.in.poweredOn = true;
            state.disconnectors35[5].contacts.in.poweredOn = true
        } else if (vl4 && lr4 && vv4 && vvt2 && tr2 && enter1 && sr6 && svv6 && enter2 && vvt1 && tr1) {
            state.section35.sectionDisconnector1.contacts.in.poweredOn = true;
            state.disconnectors35[5].contacts.in.poweredOn = true
        } else {
            state.section35.sectionDisconnector1.contacts.in.poweredOn = false;
            state.disconnectors35[5].contacts.in.poweredOn = false
        }

        // СШ-35кВ №2
        if (vl3 && lr3 && vv3) {
            state.section35.sectionDisconnector2.contacts.in.poweredOn = true;
            state.disconnectors35[4].contacts.in.poweredOn = true
        } else if (vl4 && lr4 && vv4) {
            state.section35.sectionDisconnector2.contacts.in.poweredOn = true;
            state.disconnectors35[4].contacts.in.poweredOn = true
        } else if (vl1 && lr1 && vv1 && sr1 && sr2 && svv35) {
            state.section35.sectionDisconnector2.contacts.in.poweredOn = true;
            state.disconnectors35[5].contacts.in.poweredOn = true
        } else if (vl2 && lr2 && vv2 && sr1 && sr2 && svv35) {
            state.section35.sectionDisconnector2.contacts.in.poweredOn = true;
            state.disconnectors35[5].contacts.in.poweredOn = true
        } else if (vl1 && lr1 && vv1 && vvt2 && tr2 && enter1 && sr6 && svv6 && enter2 && vvt1 && tr1) {
            state.section35.sectionDisconnector2.contacts.in.poweredOn = true;
            state.disconnectors35[5].contacts.in.poweredOn = true
        } else if (vl2 && lr2 && vv2 && vvt2 && tr2 && enter1 && sr6 && svv6 && enter2 && vvt1 && tr1) {
            state.section35.sectionDisconnector2.contacts.in.poweredOn = true;
            state.disconnectors35[5].contacts.in.poweredOn = true
        } else {
            state.section35.sectionDisconnector2.contacts.in.poweredOn = false;
            state.disconnectors35[4].contacts.in.poweredOn = false
        }

        // СР-35-1 в сторону СВВ
        if (vl1 && lr1 && vv1 && sr1) {
            state.section35.sectionDisconnector1.contacts.out.poweredOn = true;
        } else if (vl2 && lr2 && vv2 && sr1) {
            state.section35.sectionDisconnector1.contacts.out.poweredOn = true;
        } else if (vl3 && lr3 && vv3 && sr2 && svv35) {
            state.section35.sectionDisconnector1.contacts.out.poweredOn = true;
        } else if (vl4 && lr4 && vv4 && sr2 && svv35) {
            state.section35.sectionDisconnector1.contacts.out.poweredOn = true;
        } else if (vl3 && lr3 && vv3 && tr2 && vvt2 && enter2 && sr6 && svv6 && enter1 && vvt1 && tr1 && sr1) {
            state.section35.sectionDisconnector1.contacts.out.poweredOn = true;
        } else if (vl4 && lr4 && vv4 && tr2 && vvt2 && enter2 && sr6 && svv6 && enter1 && vvt1 && tr1 && sr1) {
            state.section35.sectionDisconnector1.contacts.out.poweredOn = true;
        } else if (vl1 && lr1 && vv1 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt1 && tr1 && sr2 && svv35) {
            state.section35.sectionDisconnector1.contacts.out.poweredOn = true;
        } else if (vl2 && lr2 && vv2 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt1 && tr1 && sr2 && svv35) {
            state.section35.sectionDisconnector1.contacts.out.poweredOn = true;
        } else {
            state.section35.sectionDisconnector1.contacts.out.poweredOn = false;
        }

        // СР-35-2 в сторону СВВ
        if (vl3 && lr3 && vv3 && sr2) {
            state.section35.sectionDisconnector2.contacts.out.poweredOn = true;
        } else if (vl4 && lr4 && vv4 && sr2) {
            state.section35.sectionDisconnector2.contacts.out.poweredOn = true;
        } else if (vl1 && lr1 && vv1 && sr1 && svv35) {
            state.section35.sectionDisconnector2.contacts.out.poweredOn = true;
        } else if (vl2 && lr2 && vv2 && sr1 && svv35) {
            state.section35.sectionDisconnector2.contacts.out.poweredOn = true;
        } else if (vl1 && lr1 && vv1 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt2 && tr2 && sr2) {
            state.section35.sectionDisconnector2.contacts.out.poweredOn = true;
        } else if (vl2 && lr2 && vv2 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt2 && tr2 && sr2) {
            state.section35.sectionDisconnector2.contacts.out.poweredOn = true;
        } else if (vl3 && lr3 && vv3 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt1 && tr1 && sr1 && svv35) {
            state.section35.sectionDisconnector2.contacts.out.poweredOn = true;
        } else if (vl4 && lr4 && vv4 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt1 && tr1 && sr1 && svv35) {
            state.section35.sectionDisconnector2.contacts.out.poweredOn = true;
        } else {
            state.section35.sectionDisconnector2.contacts.out.poweredOn = false;
        }

        // ТР-35-1 в сторону ВВ
        if (vl1 && lr1 && vv1 && tr1) {
            state.disconnectors35[5].contacts.out.poweredOn = true
        } else if (vl2 && lr2 && vv2 && tr1) {
            state.disconnectors35[5].contacts.out.poweredOn = true
        } else if (vl3 && lr3 && vv3 && sr1 && svv35 && sr2 && tr1) {
            state.disconnectors35[5].contacts.out.poweredOn = true
        } else if (vl4 && lr4 && vv4 && sr1 && svv35 && sr2 && tr1) {
            state.disconnectors35[5].contacts.out.poweredOn = true
        } else if (vl3 && lr3 && vv3 && tr2 && vvt2 && enter1 && sr6 && svv6 && enter2 && vvt1) {
            state.disconnectors35[5].contacts.out.poweredOn = true
        } else if (vl4 && lr4 && vv4 && tr2 && vvt2 && enter1 && sr6 && svv6 && enter2 && vvt1) {
            state.disconnectors35[5].contacts.out.poweredOn = true
        } else if (vl1 && lr1 && vv1 && sr1 && svv35 && sr2 && tr2 && vvt2 && enter1 && sr6 && svv6 && enter2 && vvt1) {
            state.disconnectors35[5].contacts.out.poweredOn = true
        } else if (vl2 && lr2 && vv2 && sr1 && svv35 && sr2 && tr2 && vvt2 && enter1 && sr6 && svv6 && enter2 && vvt1) {
            state.disconnectors35[5].contacts.out.poweredOn = true
        } else {
            state.disconnectors35[5].contacts.out.poweredOn = false
        }

        // ТР-35-2 в сторону ВВ
        if (vl3 && lr3 && vv3 && tr2) {
            state.disconnectors35[4].contacts.out.poweredOn = true
        } else if (vl4 && lr4 && vv4 && tr2) {
            state.disconnectors35[4].contacts.out.poweredOn = true
        } else if (vl1 && lr1 && vv1 && sr1 && svv35 && sr2 && tr2) {
            state.disconnectors35[4].contacts.out.poweredOn = true
        } else if (vl2 && lr2 && vv2 && sr1 && svv35 && sr2 && tr2) {
            state.disconnectors35[4].contacts.out.poweredOn = true
        } else if (vl1 && lr1 && vv1 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt2) {
            state.disconnectors35[4].contacts.out.poweredOn = true
        } else if (vl2 && lr2 && vv2 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt2) {
            state.disconnectors35[4].contacts.out.poweredOn = true
        } else if (vl3 && lr3 && vv3 && sr1 && svv35 && sr2 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt2) {
            state.disconnectors35[4].contacts.out.poweredOn = true
        } else if (vl4 && lr4 && vv4 && sr1 && svv35 && sr2 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt2) {
            state.disconnectors35[4].contacts.out.poweredOn = true
        } else {
            state.disconnectors35[4].contacts.out.poweredOn = false
        }

        // Т-1
        if (vl1 && lr1 && vv1 && tr1 && vvt1) {
            state.switchers6[0].contacts.poweredOn = true;
            state.tsn[0].sectionPoweredOn = true;
            state.tsn[0].poweredOn = dcSn1;
        } else if (vl2 && lr2 && vv2 && tr1 && vvt1) {
            state.switchers6[0].contacts.poweredOn = true;
            state.tsn[0].sectionPoweredOn = true;
            state.tsn[0].poweredOn = dcSn1;
        } else if (vl3 && lr3 && vv3 && sr1 && svv35 && sr2 && tr1 && vvt1) {
            state.switchers6[0].contacts.poweredOn = true;
            state.tsn[0].sectionPoweredOn = true;
            state.tsn[0].poweredOn = dcSn1;
        } else if (vl4 && lr4 && vv4 && sr1 && svv35 && sr2 && tr1 && vvt1) {
            state.switchers6[0].contacts.poweredOn = true;
            state.tsn[0].sectionPoweredOn = true;
            state.tsn[0].poweredOn = dcSn1;
        } else if (vl4 && lr4 && vv4 && sr1 && svv35 && sr2 && tr1 && vvt1) {
            state.switchers6[0].contacts.poweredOn = true;
            state.tsn[0].sectionPoweredOn = true;
            state.tsn[0].poweredOn = dcSn1;
        } else if (vl1 && lr1 && vv1 && sr1 && svv35 && sr2 && tr2 && vvt2 && enter1 && sr6 && svv6 && enter2) {
            state.switchers6[0].contacts.poweredOn = true;
            state.tsn[0].sectionPoweredOn = true;
            state.tsn[0].poweredOn = dcSn1;
        } else if (vl2 && lr2 && vv2 && sr1 && svv35 && sr2 && tr2 && vvt2 && enter1 && sr6 && svv6 && enter2) {
            state.switchers6[0].contacts.poweredOn = true;
            state.tsn[0].sectionPoweredOn = true;
            state.tsn[0].poweredOn = dcSn1;
        } else if (vl3 && lr3 && vv3 && tr2 && vvt2 && enter1 && sr6 && svv6 && enter2) {
            state.switchers6[0].contacts.poweredOn = true;
            state.tsn[0].sectionPoweredOn = true;
            state.tsn[0].poweredOn = dcSn1;
        } else if (vl4 && lr4 && vv4 && tr2 && vvt2 && enter1 && sr6 && svv6 && enter2) {
            state.switchers6[0].contacts.poweredOn = true;
            state.tsn[0].sectionPoweredOn = true;
            state.tsn[0].poweredOn = dcSn1;
        } else {
            state.switchers6[0].contacts.poweredOn = false;
            state.tsn[0].sectionPoweredOn = false;
            state.tsn[0].poweredOn = false
        }

        // Т-2
        if (vl3 && lr3 && vv3 && tr2 && vvt2) {
            state.switchers6[1].contacts.poweredOn = true;
            state.tsn[1].sectionPoweredOn = true;
            state.tsn[1].poweredOn = dcSn2;
        } else if (vl4 && lr4 && vv4 && tr2 && vvt2) {
            state.switchers6[1].contacts.poweredOn = true;
            state.tsn[1].sectionPoweredOn = true;
            state.tsn[1].poweredOn = dcSn2;
        } else if (vl1 && lr1 && vv1 && sr1 && svv35 && sr2 && tr2 && vvt2) {
            state.switchers6[1].contacts.poweredOn = true;
            state.tsn[1].sectionPoweredOn = true;
            state.tsn[1].poweredOn = dcSn2;
        } else if (vl2 && lr2 && vv2 && sr1 && svv35 && sr2 && tr2 && vvt2) {
            state.switchers6[1].contacts.poweredOn = true;
            state.tsn[1].sectionPoweredOn = true;
            state.tsn[1].poweredOn = dcSn2;
        } else if (vl3 && lr3 && vv3 && sr1 && svv35 && sr2 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2) {
            state.switchers6[1].contacts.poweredOn = true;
            state.tsn[1].sectionPoweredOn = true;
            state.tsn[1].poweredOn = dcSn2;
        } else if (vl4 && lr4 && vv4 && sr1 && svv35 && sr2 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2) {
            state.switchers6[1].contacts.poweredOn = true;
            state.tsn[1].sectionPoweredOn = true;
            state.tsn[1].poweredOn = dcSn2;
        } else if (vl1 && lr1 && vv1 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2) {
            state.switchers6[1].contacts.poweredOn = true;
            state.tsn[1].sectionPoweredOn = true;
            state.tsn[1].poweredOn = dcSn2;
        } else if (vl2 && lr2 && vv2 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2) {
            state.switchers6[1].contacts.poweredOn = true;
            state.tsn[1].sectionPoweredOn = true;
            state.tsn[1].poweredOn = dcSn2;
        } else {
            state.switchers6[1].contacts.poweredOn = false;
            state.tsn[1].sectionPoweredOn = false;
            state.tsn[1].poweredOn = false
        }


        // ЛР-35-1 в сторону ВВ
        if (vl1 && lr1) {
            state.disconnectors35[3].contacts.out.poweredOn = true
        } else if (vl2 && lr2 && vv2 && vv1) {
            state.disconnectors35[3].contacts.out.poweredOn = true
        } else if (vl3 && lr3 && vv3 && sr1 && svv35 && sr2 && vv1) {
            state.disconnectors35[3].contacts.out.poweredOn = true
        } else if (vl4 && lr4 && vv4 && sr1 && svv35 && sr2 && vv1) {
            state.disconnectors35[3].contacts.out.poweredOn = true
        } else if (vl3 && lr3 && vv3 && tr2 && vvt2 && enter2 && sr6 && svv6 && enter1 && vvt1 && tr1 && vv1) {
            state.disconnectors35[3].contacts.out.poweredOn = true
        } else if (vl4 && lr4 && vv4 && tr2 && vvt2 && enter2 && sr6 && svv6 && enter1 && vvt1 && tr1 && vv1) {
            state.disconnectors35[3].contacts.out.poweredOn = true
        } else {
            state.disconnectors35[3].contacts.out.poweredOn = false
        }

        // ЛР-35-2 в сторону ВВ
        if (vl2 && lr2) {
            state.disconnectors35[2].contacts.out.poweredOn = true
        } else if (vl1 && lr1 && vv1 && vv2) {
            state.disconnectors35[2].contacts.out.poweredOn = true
        } else if (vl3 && lr3 && vv3 && sr1 && svv35 && sr2 && vv2) {
            state.disconnectors35[2].contacts.out.poweredOn = true
        } else if (vl4 && lr4 && vv4 && sr1 && svv35 && sr2 && vv2) {
            state.disconnectors35[2].contacts.out.poweredOn = true
        } else if (vl3 && lr3 && vv3 && tr2 && vvt2 && enter2 && sr6 && svv6 && enter1 && vvt1 && tr1 && vv2) {
            state.disconnectors35[2].contacts.out.poweredOn = true
        } else if (vl4 && lr4 && vv4 && tr2 && vvt2 && enter2 && sr6 && svv6 && enter1 && vvt1 && tr1 && vv2) {
            state.disconnectors35[2].contacts.out.poweredOn = true
        } else {
            state.disconnectors35[2].contacts.out.poweredOn = false
        }

        // ЛР-35-3 в сторону ВВ
        if (vl3 && lr3) {
            state.disconnectors35[1].contacts.out.poweredOn = true
        } else if (vl4 && lr4 && vv4 && vv3) {
            state.disconnectors35[1].contacts.out.poweredOn = true
        } else if (vl1 && lr1 && vv1 && sr1 && svv35 && sr2 && vv3) {
            state.disconnectors35[1].contacts.out.poweredOn = true
        } else if (vl2 && lr2 && vv2 && sr1 && svv35 && sr2 && vv3) {
            state.disconnectors35[1].contacts.out.poweredOn = true
        } else if (vl1 && lr1 && vv1 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt2 && tr2 && vv3) {
            state.disconnectors35[1].contacts.out.poweredOn = true
        } else if (vl2 && lr2 && vv2 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt2 && tr2 && vv3) {
            state.disconnectors35[1].contacts.out.poweredOn = true
        } else {
            state.disconnectors35[1].contacts.out.poweredOn = false
        }

        // ЛР-35-4 в сторону ВВ
        if (vl4 && lr4) {
            state.disconnectors35[0].contacts.out.poweredOn = true
        } else if (vl3 && lr3 && vv3 && vv4) {
            state.disconnectors35[0].contacts.out.poweredOn = true
        } else if (vl1 && lr1 && vv1 && sr1 && svv35 && sr2 && vv4) {
            state.disconnectors35[0].contacts.out.poweredOn = true
        } else if (vl2 && lr2 && vv2 && sr1 && svv35 && sr2 && vv4) {
            state.disconnectors35[0].contacts.out.poweredOn = true
        } else if (vl1 && lr1 && vv1 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt2 && tr2 && vv4) {
            state.disconnectors35[0].contacts.out.poweredOn = true
        } else if (vl2 && lr2 && vv2 && tr1 && vvt1 && enter1 && sr6 && svv6 && enter2 && vvt2 && tr2 && vv4) {
            state.disconnectors35[0].contacts.out.poweredOn = true
        } else {
            state.disconnectors35[0].contacts.out.poweredOn = false
        }

        // console.log(state.switchers6[5].contacts.poweredOn)
        // console.log(state.switchers6[6].contacts.poweredOn)
    },

    showReport() {
        this._state._showReport = !this._state._showReport;
        this._callSubscriber();
    },

    showSettings() {
        this._state._showSettings = !this._state._showSettings;
        this._callSubscriber();
    },


    checkWork(property) {
        switch (property) {
            case this._state.strings.current:
                this._state.switchers6.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        item.checkedCurrent = true;
                        this.addAction(`Проверен уровень тока в ${item.id.split(' ')[1]}`)
                    }
                    return this._state;
                });
                break;
            case this._state.strings.voltage:
                this._state.tn.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        item.checkedVoltage = true;
                        this.addAction(`Проверен уровень напряжения в ${item.id.split(' ')[2]}`)
                    }
                    return this._state;
                });
                break;
            default:
                console.log('Unexpected type')
        }
    },

    checkVoltage(voltage) {
        if (voltage) {
            this._state.checkedUVN = true;
            let text = `Проверено наличие U на ${this._state.elementsMenu.id}. U присутствует`;
            this.addAction(text)
        } else {
            if (!this._state.checkedUVN) {
                this.addFails('Не проверена работоспособность УВН', 5)
            }
            let text = `Проверено отсутствие U на ${this._state.elementsMenu.id}. U присутствует`;
            this.addAction(text)
        }
    },


    checkPoweredOnAll() {
        this._state.disconnectors35.map(item => {
            if (item.contacts.id) {
            }
            return this._state;
        })
    },

    checkCondition() {
        switch (this._state.elementsMenu.type) {
            case 'tsn':
                this._state.tsn.map(item => {
                    let id = `ШР-6кВ ${item.id}`;
                    if (id === this._state.elementsMenu.id) {
                        item.checkedCondition = true;
                        let text = `Проверено состояние изоляции ${id}`;
                        this.addAction(text);
                    }
                    return this._state;
                });
                break;
            case 'sectionDisconnector35':
                if (this._state.section35.sectionDisconnector1.id === this._state.elementsMenu.id) {
                    this._state.section35.sectionDisconnector1.checkedCondition = true;
                    let text = `Проверено состояние изоляции ${this._state.elementsMenu.id}`
                    this.addAction(text);
                }
                if (this._state.section35.sectionDisconnector2.id === this._state.elementsMenu.id) {
                    this._state.section35.sectionDisconnector2.checkedCondition = true;
                    let text = `Проверено состояние изоляции ${this._state.elementsMenu.id}`
                    this.addAction(text);
                }
                break;
            case 'disconnector35':
                this._state.disconnectors35.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        item.checkedCondition = true;
                        let text = `Проверено состояние изоляции ${this._state.elementsMenu.id}`
                        this.addAction(text);
                    }
                    return this._state;
                });
                break;
            default:
                console.log('Unexpected type')
        }
        this._callSubscriber();

    },

    turnSN(position) {
        this._state.tsn.map(item => {
            if (item.id === this._state.elementsMenu.id) {
                item.sn.turnedOn = position;
                let text = position ?
                    `Включен АВ-0,4кВ ${this._state.elementsMenu.id}`
                    :
                    `Отключен АВ-0,4кВ ${this._state.elementsMenu.id}`;
                this.addAction(text);
            }
            return this._state;
        })
        this.poweredOn(this._state);
    },

    turnAvr(position) {
        this._state.switchers6[5].avr = position;
        let text = position ? 'Введен АВР-6кВ' : 'Выведен АВР-6кВ';
        this.addAction(text)
    },
    turnAvTn(position) {
        this._state.tn.map(item => {
            if (item.id === this._state.elementsMenu.id) {
                item.avTn = position;
                let text = position ? `Включен АВ-100В ${this._state.elementsMenu.id}` : `Отключен АВ-100В ${this._state.elementsMenu.id}`;
                this.addAction(text);
            }
            return this._state;
        });
        this.poweredOn(this._state);
    },

    closeMenu() {
        store._state.elementsMenu.type = undefined;
        store._state.elementsMenu.id = undefined;
        store._state.elementsMenu.x = undefined;
        store._state.elementsMenu.y = undefined;
        document.removeEventListener('click', store.closeMenu);
        store._callSubscriber();
    },

    checkPosition(position) {
        switch (this._state.elementsMenu.type) {

            case 'groundTn6':
                this._state.tn.map(item => {
                    if (item.ground.id === this._state.elementsMenu.id) {
                        item.ground.checkedPosition = true;
                        if (item.ground.turnedOn === position) {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.ground.id} ${position ? 'включены' : 'отключены'}.`;
                            this.addAction(text);
                        } else {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.ground.id} не ${position ? 'включены' : 'отключены'}.`;
                            this.addAction(text);
                        }
                    }
                    return this._state;
                });
                break;

            case 'tsn':
                this._state.tsn.map(item => {
                    let id = `ШР-6кВ ${item.id}`;
                    if (id === this._state.elementsMenu.id) {
                        item.checkedPosition = true;
                        if (item.turnedOn === position) {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${id} ${position ? 'включен' : 'отключен'}.`;
                            this.addAction(text);
                        } else {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${id} не ${position ? 'включен' : 'отключен'}.`
                            this.addAction(text);
                        }
                    }
                    return this._state;
                });
                break;

            case 'groundSwitchers6':
                this._state.switchers6.map(item => {
                    if (item.ground.id === this._state.elementsMenu.id) {
                        item.ground.checkedPosition = true;
                        if (item.ground.turnedOn === position) {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.ground.id} ${position ? 'включены' : 'отключены'}.`;
                            this.addAction(text);
                        } else {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.ground.id} не ${position ? 'включены' : 'отключены'}.`
                            this.addAction(text);
                        }
                    }
                    return this._state;
                });
                break;

            case 'groundSectionDisconnector35':
                if (this._state.section35.sectionDisconnector1.groundIn.id === this._state.elementsMenu.id) {
                    this._state.section35.sectionDisconnector1.groundIn.checkedPosition = true;
                    if (this._state.section35.sectionDisconnector1.groundIn.turnedOn === position) {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector1.groundIn.id} ${position ? 'включены' : 'отключены'}.`;
                        this.addAction(text);
                    } else {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector1.groundIn.id} не ${position ? 'включены' : 'отключены'}.`
                        this.addAction(text);
                    }
                }
                if (this._state.section35.sectionDisconnector1.groundOut.id === this._state.elementsMenu.id) {
                    this._state.section35.sectionDisconnector1.groundOut.checkedPosition = true;
                    if (this._state.section35.sectionDisconnector1.groundOut.turnedOn === position) {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector1.groundOut.id} ${position ? 'включены' : 'отключены'}.`;
                        this.addAction(text);
                    } else {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector1.groundOut.id} не ${position ? 'включены' : 'отключены'}.`
                        this.addAction(text);
                    }
                }
                if (this._state.section35.sectionDisconnector2.groundIn.id === this._state.elementsMenu.id) {
                    this._state.section35.sectionDisconnector2.groundIn.checkedPosition = true;
                    if (this._state.section35.sectionDisconnector2.groundIn.turnedOn === position) {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector2.groundIn.id} ${position ? 'включены' : 'отключены'}.`;
                        this.addAction(text);
                    } else {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector2.groundIn.id} не ${position ? 'включены' : 'отключены'}.`
                        this.addAction(text);
                    }
                }
                if (this._state.section35.sectionDisconnector2.groundOut.id === this._state.elementsMenu.id) {
                    this._state.section35.sectionDisconnector2.groundOut.checkedPosition = true;
                    if (this._state.section35.sectionDisconnector2.groundOut.turnedOn === position) {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector2.groundOut.id} ${position ? 'включены' : 'отключены'}.`;
                        this.addAction(text);
                    } else {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector2.groundOut.id} не ${position ? 'включены' : 'отключены'}.`
                        this.addAction(text);
                    }
                }
                break;
            case 'sectionDisconnector35':
                if (this._state.section35.sectionDisconnector1.id === this._state.elementsMenu.id) {
                    this._state.section35.sectionDisconnector1.checkedPosition = true;
                    if (this._state.section35.sectionDisconnector1.turnedOn === position) {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector1.id} ${position ? 'включен' : 'отключен'}.`;
                        this.addAction(text);
                    } else {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector2.id} не ${position ? 'включен' : 'отключен'}.`
                        this.addAction(text);
                    }

                }
                if (this._state.section35.sectionDisconnector2.id === this._state.elementsMenu.id) {
                    this._state.section35.sectionDisconnector2.checkedPosition = true;
                    if (this._state.section35.sectionDisconnector2.turnedOn === position) {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector2.id} ${position ? 'включен' : 'отключен'}.`;
                        this.addAction(text);
                    } else {
                        let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionDisconnector2.id} не ${position ? 'включен' : 'отключен'}.`
                        this.addAction(text);
                    }
                }
                break;
            case 'sectionSwitcher35':
                this._state.section35.sectionSwitcher35.checkedPosition = true;
                if (this._state.section35.sectionSwitcher35.turnedOn === position) {
                    let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionSwitcher35.id} ${position ? 'включен' : 'отключен'}.`;
                    this.addAction(text);
                } else {
                    let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${this._state.section35.sectionSwitcher35.id} не ${position ? 'включен' : 'отключен'}.`
                    this.addAction(text);
                }
                break;
            case 'switcher6':
                this._state.switchers6.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        item.checkedPosition = true;
                        if (item.turnedOn === position) {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.id} ${position ? 'включен' : 'отключен'}.`;
                            this.addAction(text);
                        } else {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.id} не ${position ? 'включен' : 'отключен'}.`
                            this.addAction(text);
                        }
                    }
                    return this._state;
                });
                break;
            case 'switcher35':
                this._state.switchers35.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        item.checkedPosition = true;
                        if (item.turnedOn === position) {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.id} ${position ? 'включен' : 'отключен'}.`;
                            this.addAction(text);
                        } else {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.id} не ${position ? 'включен' : 'отключен'}.`
                            this.addAction(text);
                        }
                    }
                    return this._state;
                });
                break;
            case 'disconnector35':
                this._state.disconnectors35.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        item.checkedPosition = true;
                        if (item.turnedOn === position) {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.id} ${position ? 'включен' : 'отключен'}.`;
                            this.addAction(text);
                        } else {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.id} не ${position ? 'включен' : 'отключен'}.`
                            this.addAction(text);
                        }
                    }
                    return this._state;
                });
                break;
            case 'groundDisconnector35':
                this._state.disconnectors35.map(item => {
                    if (item.groundIn.id === this._state.elementsMenu.id) {
                        item.groundIn.checkedPosition = true;
                        if (item.groundIn.turnedOn === position) {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.groundIn.id} ${position ? 'включены' : 'отключены'}.`;
                            this.addAction(text);
                        } else {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.groundIn.id} не ${position ? 'включены' : 'отключены'}.`
                            this.addAction(text);
                        }
                    }
                    if (item.groundOut.id === this._state.elementsMenu.id) {
                        item.checkedPosition = true;
                        if (item.groundOut.turnedOn === position) {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.groundOut.id} ${position ? 'включены' : 'отключены'}.`;
                            this.addAction(text);
                        } else {
                            let text = `Проверено ${position ? 'включенное' : 'отключенное'} положение. ${item.groundOut.id} не ${position ? 'включены' : 'отключены'}.`
                            this.addAction(text);
                        }
                    }
                    return this._state;
                });
                break;
            default:
                console.log('Unexpected type')
        }
        this._callSubscriber();

    },

    turnOperational(operational) {
        if (this._state.elementsMenu.type === 'switcher6') {
            this._state.switchers6.map(item => {
                if (item.id === this._state.elementsMenu.id) {
                    item.operational = operational;
                }
                return this._state
            })
        }
        if (this._state.elementsMenu.type === 'switcher35') {
            this._state.switchers35.map(item => {
                if (item.id === this._state.elementsMenu.id) {
                    item.operational = operational;
                }
                return this._state
            })
        }
        if (this._state.elementsMenu.type === 'sectionSwitcher35') {
            this._state.section35.sectionSwitcher35.operational = operational;
        }
        this.addAction(`${operational ? 'Включен ' : 'Отключен '} автомат цепей управления ${this._state.elementsMenu.id}`)
        this._callSubscriber();
    },

    changePositioning(positioning) {
        let posAct = positioning === working ? 'Вкачен' : 'Выкачен';
        this._state.switchers6.map(item => {
            if (item.id === this._state.elementsMenu.id) {
                item.positioning = positioning;
                let text = positioning === working ? 'рабочее' :
                    positioning === control ? 'контрольное' : 'ремонтное';
                this.addAction(`Установлен в ${text} положение ${this._state.elementsMenu.id}`);
                if (!item.checkedPosition) this.addFails(`Не проверено отключенное положение ${this._state.elementsMenu.id}`, 5);
                if (item.operational) this.addFails(`Не отключены цепи управления ${this._state.elementsMenu.id}`, 5);
                if (item.turnedOn) this.addFails(`${posAct} во включенном положении ${this._state.elementsMenu.id}`, 5);
                item.checkedPosition = false;
                if (positioning === control || positioning === 'remove') {
                    if (!item.posterPower) {
                        this.waitAction(`Вывешен плакат "НЕ ВКЛЮЧАТЬ РАБОТАЮТ ЛЮДИ" на ${item.id}`, `Не вывешен плакат "НЕ ВКЛЮЧАТЬ РАБОТАЮТ ЛЮДИ" на ${item.id}`, 1)
                    }
                }
            }
            return this._state;
        });
        this.poweredOn(this._state);
        this.checkLeftPowered();
    },


    turnOn() {
        switch (this._state.elementsMenu.type) {
            case 'tn':
                this._state.tn.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (!item.turnedOn) {
                            item.turnedOn = true;
                            this.addAction(`Вкачен в рабочее положение ${item.id}`)
                        }
                    } else {
                        this.addAction(`${item.id} уже вкачен в рабочее положение`)
                    }
                    return this._state;
                });
                break;
            case 'tsn':
                this._state.tsn.map(item => {
                    let id = `ШР-6кВ ${item.id}`;
                    if (id === this._state.elementsMenu.id) {
                        if (!item.turnedOn) {
                            item.turnedOn = true;
                            this.addAction(`Включен ${id}`);
                            // check condition of Disconnectors
                            if (!item.checkedCondition) {
                                let text = `Не проверено состояние изоляции ${id}`;
                                this.addFails(text, 5);
                            }
                            item.checkedCondition = false;
                            // end
                            // check turneOn SN
                            if (item.sn.turnedOn) {
                                let text = `ШР-6кВ ${item.id} включен под нагрузкой`;
                                this.addFails(text, 5);
                            }
                            // end
                            item.checkedPosition = false;
                            this.waitAction(`Проверено включенное положение. ${id} включен.`, `Не проверено включенное положение ${id}`, 1)
                        } else {
                            this.addAction(`${id} уже включен`);
                        }
                    }
                    return this._state;
                });
                break;
            case 'groundTn6':
                this._state.tn.map(item => {
                    if (item.ground.id === this._state.elementsMenu.id) {
                        if (!item.ground.turnedOn) {
                            item.ground.turnedOn = true;
                            this.addAction(`Включены ${item.ground.id}`);
                            item.ground.checkedPosition = false;
                            if (item.contacts.poweredOn) {
                                this.addFails('Включение ЗН-6кВ под напряжением!!!', 50)
                                this.addWarning(`Вы включили ЗН-6кВ под напряжением!`)
                            }
                            this.waitAction(`Проверено включенное положение. ЗН-6кВ СШ-6кВ №1 яч.2 включены.`, `Не проверено включенное положение ${item.ground.id}`, 1)
                        } else {
                            this.addAction(`${item.ground.id} уже включены`);
                        }
                    }
                    return this._state;
                });
                break;
            case 'groundSwitchers6':
                this._state.switchers6.map(item => {
                    if (item.ground.id === this._state.elementsMenu.id) {
                        if (!item.ground.turnedOn) {
                            item.ground.turnedOn = true
                            this.addAction(`Включены ${item.ground.id}`);
                            item.ground.checkedPosition = false;
                            if (item.contacts.poweredOn) {
                                this.addFails('Включение ЗН-6кВ под напряжением!!!', 50)
                                this.addWarning(`Вы включили ЗН-6кВ под напряжением!`)
                            }
                            this.waitAction(`Проверено включенное положение. ЗН-6кВ яч.8 включены.`, `Не проверено включенное положение ${item.ground.id}`, 1)
                        } else {
                            this.addAction(`${item.ground.id} уже включены`);
                        }
                    }
                    return this._state;
                });
                break;
            case 'groundSectionDisconnector35':
                if (this._state.section35.sectionDisconnector1.groundIn.id === this._state.elementsMenu.id) {
                    if (!this._state.section35.sectionDisconnector1.groundIn.turnedOn) {
                        this._state.section35.sectionDisconnector1.groundIn.turnedOn = true;
                        this.addAction('Включены ЗН-35кВ на СР-35кВ №1 в сторону СШ-35кВ');
                        if (this._state.section35.sectionDisconnector1.contacts.in.poweredOn) {
                            this.addFails('Включение ЗН-6кВ под напряжением!!!', 50)
                            this.addWarning(`Вы включили ЗН-6кВ под напряжением!`)
                        }
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector1.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector1.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector1.checkedCondition = false;
                        // end
                        this._state.section35.sectionDisconnector1.groundIn.checkedPosition = false;
                        this.waitAction(`Проверено включенное положение. ${this._state.section35.sectionDisconnector1.groundIn.id} включены.`, `Не проверено включенное положение ${this._state.section35.sectionDisconnector1.groundIn.id}`, 1)
                    } else {
                        this.addAction('ЗН-35кВ на СР-35кВ №1 в сторону СШ-35кВ уже включены');
                    }
                }
                if (this._state.section35.sectionDisconnector1.groundOut.id === this._state.elementsMenu.id) {
                    if (!this._state.section35.sectionDisconnector1.groundOut.turnedOn) {
                        this._state.section35.sectionDisconnector1.groundOut.turnedOn = true;
                        this.addAction('Включены ЗН-35кВ на СР-35кВ №1 в сторону СВВ-35кВ');
                        if (this._state.section35.sectionDisconnector1.contacts.out.poweredOn) {
                            this.addFails('Включение ЗН-6кВ под напряжением!!!', 50)
                            this.addWarning(`Вы включили ЗН-6кВ под напряжением!`)
                        }
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector1.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector1.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector1.checkedCondition = false;
                        // end
                        this._state.section35.sectionDisconnector1.groundOut.checkedPosition = false;
                        this.waitAction(`Проверено включенное положение. ${this._state.section35.sectionDisconnector1.groundOut.id} включены.`, `Не проверено включенное положение ${this._state.section35.sectionDisconnector1.groundOut.id}`, 1)
                    } else {
                        this.addAction('ЗН-35кВ на СР-35кВ №1 в сторону СВВ-35кВ уже включены');
                    }
                }
                if (this._state.section35.sectionDisconnector2.groundIn.id === this._state.elementsMenu.id) {
                    if (!this._state.section35.sectionDisconnector2.groundIn.turnedOn) {
                        this._state.section35.sectionDisconnector2.groundIn.turnedOn = true;
                        this.addAction('Включены ЗН-35кВ на СР-35кВ №2 в сторону СШ-35кВ');
                        if (this._state.section35.sectionDisconnector2.contacts.in.poweredOn) {
                            this.addFails('Включение ЗН-6кВ под напряжением!!!', 50)
                            this.addWarning(`Вы включили ЗН-6кВ под напряжением!`)
                        }
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector2.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector2.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector2.checkedCondition = false;
                        // end
                        this._state.section35.sectionDisconnector2.groundIn.checkedPosition = false;
                        this.waitAction(`Проверено включенное положение. ${this._state.section35.sectionDisconnector2.groundIn.id} включены.`, `Не проверено включенное положение ${this._state.section35.sectionDisconnector2.groundIn.id}`, 1)
                    } else {
                        this.addAction('ЗН-35кВ на СР-35кВ №2 в сторону СШ-35кВ уже включены');
                    }
                }
                if (this._state.section35.sectionDisconnector2.groundOut.id === this._state.elementsMenu.id) {
                    if (!this._state.section35.sectionDisconnector2.groundOut.turnedOn) {
                        this._state.section35.sectionDisconnector2.groundOut.turnedOn = true;
                        this.addAction('Включены ЗН-35кВ на СР-35кВ №2 в сторону СВВ-35кВ');
                        if (this._state.section35.sectionDisconnector2.contacts.out.poweredOn) {
                            this.addFails('Включение ЗН-6кВ под напряжением!!!', 50)
                            this.addWarning(`Вы включили ЗН-6кВ под напряжением!`)
                        }
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector2.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector2.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector2.checkedCondition = false;
                        // end
                        this._state.section35.sectionDisconnector2.groundOut.checkedPosition = false;
                        this.waitAction(`Проверено включенное положение. ${this._state.section35.sectionDisconnector2.groundOut.id} включены.`, `Не проверено включенное положение ${this._state.section35.sectionDisconnector2.groundOut.id}`, 1)
                    } else {
                        this.addAction('ЗН-35кВ на СР-35кВ №1 в сторону СШ-35кВ уже включены');
                    }
                }
                break;
            case 'sectionDisconnector35':
                if (this._state.section35.sectionDisconnector1.id === this._state.elementsMenu.id) {
                    if (!this._state.section35.sectionDisconnector1.turnedOn) {
                        this._state.section35.sectionDisconnector1.turnedOn = true;
                        this.addAction('Включен СР-35кВ №1');
                        this._checkLeftGround(this._state);
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector1.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector1.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector1.checkedCondition = false;
                        // end
                        // check position and checkedPosition of sectionSwitcher35
                        if (!this._state.section35.sectionSwitcher35.checkedPosition) {
                            let text = `Не проверено отключенное положение ${this._state.section35.sectionSwitcher35.id}`;
                            this.addFails(text, 5);
                        }
                        if (this._state.section35.sectionSwitcher35.turnedOn) {
                            let text = `Не отключен ${this._state.section35.sectionSwitcher35.id}`;
                            this.addFails(text, 5);
                        }
                        // end
                        this._state.section35.sectionDisconnector1.checkedPosition = false;
                        this.waitAction(`Проверено включенное положение. ${this._state.section35.sectionDisconnector1.id} включен.`, `Не проверено включенное положение ${this._state.section35.sectionDisconnector1.id}`, 1)
                    } else {
                        this.addAction(`${this._state.section35.sectionDisconnector1.id} уже включен`);
                    }
                }
                if (this._state.section35.sectionDisconnector2.id === this._state.elementsMenu.id) {
                    if (!this._state.section35.sectionDisconnector2.turnedOn) {
                        this._state.section35.sectionDisconnector2.turnedOn = true;
                        this.addAction('Включен СР-35кВ №2');
                        this._checkLeftGround(this._state);
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector2.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector2.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector2.checkedCondition = false;
                        // end
                        this._state.section35.sectionDisconnector2.checkedPosition = false;
                        this.waitAction(`Проверено включенное положение. ${this._state.section35.sectionDisconnector2.id} включен.`, `Не проверено включенное положение ${this._state.section35.sectionDisconnector2.id}`, 1)
                    } else {
                        this.addAction(`${this._state.section35.sectionDisconnector2.id} уже включен`);
                    }
                }
                break;
            case 'sectionSwitcher35':
                if (this._state.section35.sectionSwitcher35.operational) {
                    if (!this._state.section35.sectionSwitcher35.turnedOn) {
                        this._state.section35.sectionSwitcher35.turnedOn = true;
                        this.addAction('Включен СВВ-35кВ');
                        this._checkLeftGround(this._state);
                        if (!this._state.section35.sectionDisconnector1.checkedPosition)
                            this.addFails(`Не проверено включенное положение ${this._state.section35.sectionDisconnector1.id}`, 5);
                        if (!this._state.section35.sectionDisconnector2.checkedPosition)
                            this.addFails(`Не проверено включенное положение ${this._state.section35.sectionDisconnector2.id}`, 5);
                        if (!this._state.section35.sectionDisconnector1.turnedOn)
                            this.addFails(`${this._state.section35.sectionDisconnector1.id} не включен`, 5);
                        if (!this._state.section35.sectionDisconnector2.turnedOn)
                            this.addFails(`${this._state.section35.sectionDisconnector2.id} не включен`, 5);
                        if (this._state.section35.sectionSwitcher35.posterPower)
                            this.addFails(`Не снят плакат "НЕ ВКЛЮЧАТЬ РАБОТАЮТ ЛЮДИ" с привода ${this._state.section35.sectionSwitcher35.id}`, 5);
                        if (this._state.section35.sectionSwitcher35.posterGround)
                            this.addFails(`Не снят плакат "ЗАЗЕМЛЕНО" с привода ${this._state.section35.sectionSwitcher35.id}`, 5);
                        this.waitAction(`Проверено включенное положение. ${this._state.section35.sectionSwitcher35.id} включен.`, `Не проверено включенное положение ${this._state.section35.sectionSwitcher35.id}`, 1)
                        this._state.section35.sectionSwitcher35.checkedPosition = false;
                    } else {
                        this.addAction(`${this._state.section35.sectionSwitcher35.id} уже включен`);
                    }
                } else {
                    this.addAction('Неисправность цепей управления');
                }
                break;
            case 'switcher6':
                this._state.switchers6.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (item.operational) {
                            if (!item.turnedOn) {
                                item.turnedOn = true;
                                this.addAction(`Включен ${item.id}`);
                                this._checkLeftGround(this._state);
                                if (item.id === 'СВВ-6кВ яч.6') {
                                    if (item.avr) this.addFails(`Не выведен АВР-6кВ`, 5);
                                    if (!this._state.switchers6[0].checkedCurrent && !this._state.switchers6[1].checkedCurrent)
                                        this.addFails(`Не проверены уровни токов на Вводах-6кВ`, 5);
                                    if (!this._state.tn[0].checkedVoltage && !this._state.tn[1].checkedVoltage)
                                        this.addFails(`Не проверены уровни напряжений в ячейках ТН-6кВ`, 5);
                                    // this._state.switchers6[0].checkedCurrent = false;
                                    // this._state.switchers6[1].checkedCurrent = false;
                                    // this._state.tn[0].checkedVoltage = false;
                                    // this._state.tn[1].checkedVoltage = false;
                                }
                                this.waitAction(`Проверено включенное положение. ${item.id} включен.`, `Не проверено включенное положение ${item.id}`, 1)
                                item.checkedPosition = false;
                                item.checkedCurrent = false;
                            } else {
                                this.addAction(`${item.id} уже включен`);
                            }
                        } else {
                            this.addAction('Неисправность цепей управления');
                        }
                    }
                    return this._state;
                });
                break;
            case 'switcher35':
                this._state.switchers35.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (item.operational) {
                            if (!item.turnedOn) {
                                item.turnedOn = true;
                                this.addAction(`Включен ${item.id}`);
                                this._checkLeftGround(this._state);
                                this.waitAction(`Проверено включенное положение. ${item.id} включен.`, `Не проверено включенное положение ${item.id}`, 1)
                                item.checkedPosition = false;
                            } else {
                                this.addAction(`${item.id} уже включен`);
                            }
                        } else {
                            this.addAction('Неисправность цепей управления');
                        }
                    }
                    return this._state;
                });
                break;
            case 'disconnector35':
                this._state.disconnectors35.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (!item.turnedOn) {
                            item.turnedOn = true;
                            this.addAction(`Включен ${item.id}`);
                            this._checkLeftGround(this._state);
                            // check condition of Disconnectors
                            if (!item.checkedCondition) {
                                let text = `Не проверено состояние изоляции ${item.id}`;
                                this.addFails(text, 5);
                            }
                            item.checkedCondition = false;
                            // end
                            this.waitAction(`Проверено включенное положение. ${item.id} включен.`, `Не проверено включенное положение ${item.id}`, 1)
                            item.checkedPosition = false;
                        } else {
                            this.addAction(`${item.id} уже включен`);
                        }
                    }
                    return this._state;
                });
                break;
            case 'groundDisconnector35':
                this._state.disconnectors35.map(item => {
                    if (item.groundIn.id === this._state.elementsMenu.id) {
                        if (!item.groundIn.turnedOn) {
                            item.groundIn.turnedOn = true;
                            this.addAction(`Включены ${item.groundIn.id}`);
                            if (item.contacts.in.poweredOn) {
                                this.addFails('Включение ЗН-6кВ под напряжением!!!', 50)
                                this.addWarning(`Вы включили ЗН-6кВ под напряжением!`)
                            }
                            // check condition of Disconnectors
                            if (!item.checkedCondition) {
                                let text = `Не проверено состояние изоляции ${item.id}`;
                                this.addFails(text, 5);
                            }
                            item.checkedCondition = false;
                            // end
                            item.groundIn.checkedPosition = false;
                            this.waitAction(`Проверено включенное положение. ${item.groundIn.id} включен.`, `Не проверено включенное положение ${item.groundIn.id}`, 1)
                        } else {
                            this.addAction(`${item.groundIn.id} уже включен`);
                        }
                    }
                    if (item.groundOut.id === this._state.elementsMenu.id) {
                        if (!item.groundOut.turnedOn) {
                            item.groundOut.turnedOn = true;
                            this.addAction(`Включены ${item.groundOut.id}`);
                            if (item.contacts.out.poweredOn) {
                                this.addFails('Включение ЗН-6кВ под напряжением!!!', 50)
                                this.addWarning(`Вы включили ЗН-6кВ под напряжением!`)
                            }
                            // check condition of Disconnectors
                            if (!item.checkedCondition) {
                                let text = `Не проверено состояние изоляции ${item.id}`;
                                this.addFails(text, 5);
                            }
                            item.checkedCondition = false;
                            // end
                            item.groundOut.checkedPosition = false;
                            this.waitAction(`Проверено включенное положение. ${item.groundOut.id} включен.`, `Не проверено включенное положение ${item.groundOut.id}`, 1)
                        } else {
                            this.addAction(`${item.groundOut.id} уже включен`);
                        }
                    }
                    return this._state;
                });
                break;
            default:
                console.log('Unexpected type')
        }
        this.poweredOn(this._state);
        // this._callSubscriber();
    },

    turnOff() {
        switch (this._state.elementsMenu.type) {
            case 'tn':
                this._state.tn.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (item.turnedOn) {
                            item.turnedOn = false;
                            this.addAction(`Выкачен в ремонтное положение ${item.id}`);
                            item.checkedVoltage = false;
                            item.checkedPosition = false;
                        } else {
                            this.addAction(`${item.id} уже выкачен`);
                        }
                    }
                    return this._state;
                });
                break;
            case 'tsn':
                this._state.tsn.map(item => {
                    let id = `ШР-6кВ ${item.id}`;
                    if (id === this._state.elementsMenu.id) {
                        if (item.turnedOn) {
                            item.turnedOn = false;
                            this.addAction(`Отключен ШР-6кВ ${item.id}`);
                            // check condition of Disconnectors
                            if (!item.checkedCondition) {
                                let text = `Не проверено состояние изоляции ${id}`;
                                this.addFails(text, 5);
                            }
                            item.checkedCondition = false;
                            // check turneOn SN
                            if (item.sn.turnedOn) {
                                let text = `ШР-6кВ ${item.id} отключен под нагрузкой`;
                                this.addFails(text, 5);
                            }
                            // end
                            item.checkedPosition = false;
                            this.waitAction(`Проверено отключенное положение. ${id} отключен.`, `Не проверено отключенное положение ${id}`, 1);
                        } else {
                            this.addAction(`${item.id} уже отключен`);
                        }
                    }
                    return this._state;
                });
                break;
            case 'groundTn6':
                this._state.tn.map(item => {
                    if (item.ground.id === this._state.elementsMenu.id) {
                        if (item.ground.turnedOn) {
                            item.ground.turnedOn = false;
                            this.addAction(`Отключены ${item.ground.id}`);
                            this.waitAction(`Проверено отключенное положение. ${item.ground.id} отключены.`, `Не проверено отключенное положение ${item.ground.id}`, 1);
                            item.ground.checkedPosition = false;
                        } else {
                            this.addAction(`${item.ground.id} уже отключены`);
                        }
                    }
                    return this._state;
                });
                break;
            case 'groundSwitchers6':
                this._state.switchers6.map(item => {
                    if (item.ground.id === this._state.elementsMenu.id) {
                        if (item.ground.turnedOn) {
                            item.ground.turnedOn = false;
                            this.addAction(`Отключены ${item.ground.id}`);
                            this.waitAction(`Проверено отключенное положение. ${item.ground.id} отключены.`, `Не проверено отключенное положение ${item.ground.id}`, 1);
                            item.ground.checkedPosition = false;
                        } else {
                            this.addAction(`${item.ground.id} уже отключены`);
                        }
                    }
                    return this._state;
                });
                break;
            case 'groundSectionDisconnector35':
                if (this._state.section35.sectionDisconnector1.groundIn.id === this._state.elementsMenu.id) {
                    if (this._state.section35.sectionDisconnector1.groundIn.turnedOn) {
                        this._state.section35.sectionDisconnector1.groundIn.turnedOn = false;
                        this.addAction('Отключены ЗН-35кВ на СР-35кВ №1 в сторону СШ-35кВ');
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector1.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector1.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector1.checkedCondition = false;
                        // end
                        this.waitAction(`Проверено отключенное положение. ${this._state.section35.sectionDisconnector1.groundIn.id} отключены.`, `Не проверено отключенное положение ${this._state.section35.sectionDisconnector1.groundIn.id}`, 1);
                        this._state.section35.sectionDisconnector1.checkedPosition = false;
                    } else {
                        this.addAction(`${this._state.section35.sectionDisconnector1.groundIn.id} уже отключены`);
                    }
                }
                if (this._state.section35.sectionDisconnector1.groundOut.id === this._state.elementsMenu.id) {
                    if (this._state.section35.sectionDisconnector1.groundOut.turnedOn) {
                        this._state.section35.sectionDisconnector1.groundOut.turnedOn = false;
                        this.addAction('Отключены ЗН-35кВ на СР-35кВ №1 в сторону СВВ-35кВ');
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector1.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector1.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector1.checkedCondition = false;
                        // end
                        this.waitAction(`Проверено отключенное положение. ${this._state.section35.sectionDisconnector1.groundOut.id} отключены.`, `Не проверено отключенное положение ${this._state.section35.sectionDisconnector1.groundOut.id}`, 1);
                        this._state.section35.sectionDisconnector1.checkedPosition = false;
                    } else {
                        this.addAction(`${this._state.section35.sectionDisconnector1.groundOut.id} уже отключены`);
                    }
                }
                if (this._state.section35.sectionDisconnector2.groundIn.id === this._state.elementsMenu.id) {
                    if (this._state.section35.sectionDisconnector2.groundIn.turnedOn) {
                        this._state.section35.sectionDisconnector2.groundIn.turnedOn = false;
                        this.addAction('Отключены ЗН-35кВ на СР-35кВ №2 в сторону СШ-35кВ');
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector2.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector2.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector2.checkedCondition = false;
                        // end
                        this.waitAction(`Проверено отключенное положение. ${this._state.section35.sectionDisconnector2.groundIn.id} отключены.`, `Не проверено отключенное положение ${this._state.section35.sectionDisconnector2.groundIn.id}`, 1);
                        this._state.section35.sectionDisconnector2.checkedPosition = false;
                    } else {
                        this.addAction(`${this._state.section35.sectionDisconnector2.groundIn.id} уже отключены`);
                    }
                }
                if (this._state.section35.sectionDisconnector2.groundOut.id === this._state.elementsMenu.id) {
                    if (this._state.section35.sectionDisconnector2.groundOut.turnedOn) {
                        this._state.section35.sectionDisconnector2.groundOut.turnedOn = false;
                        this.addAction('Отключены ЗН-35кВ на СР-35кВ №2 в сторону СВВ-35кВ');
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector2.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector2.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector2.checkedCondition = false;
                        // end
                        this.waitAction(`Проверено отключенное положение. ${this._state.section35.sectionDisconnector2.groundOut.id} отключены.`, `Не проверено отключенное положение ${this._state.section35.sectionDisconnector2.groundOut.id}`, 1);
                        this._state.section35.sectionDisconnector2.checkedPosition = false;
                    } else {
                        this.addAction(`${this._state.section35.sectionDisconnector2.groundOut.id} уже отключены`);
                    }
                }
                break;
            case 'sectionDisconnector35':
                if (this._state.section35.sectionDisconnector1.id === this._state.elementsMenu.id) {
                    if (this._state.section35.sectionDisconnector1.turnedOn) {
                        this._state.section35.sectionDisconnector1.turnedOn = false;
                        this.addAction('Отключен СР-35кВ №1');
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector1.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector1.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector1.checkedCondition = false;
                        // end
                        this.waitAction(`Проверено отключенное положение. ${this._state.section35.sectionDisconnector1.id} отключен.`, `Не проверено отключенное положение ${this._state.section35.sectionDisconnector1.id}`, 1);
                        this.waitAction(`Вывешен плакат "НЕ ВКЛЮЧАТЬ РАБОТАЮТ ЛЮДИ" на привод ${this._state.section35.sectionDisconnector1.id}`, `Не вывешен плакат "НЕ ВКЛЮЧАТЬ РАБОТАЮТ ЛЮДИ" на привод ${this._state.section35.sectionDisconnector1.id}`, 2);
                        this._state.section35.sectionDisconnector1.checkedPosition = false;
                    } else {
                        this.addAction(`${this._state.section35.sectionDisconnector1.id} уже отключен`);
                    }
                }
                if (this._state.section35.sectionDisconnector2.id === this._state.elementsMenu.id) {
                    if (this._state.section35.sectionDisconnector2.turnedOn) {
                        this._state.section35.sectionDisconnector2.turnedOn = false;
                        this.addAction('Отключен СР-35кВ №2');
                        // check condition of Disconnectors
                        if (!this._state.section35.sectionDisconnector2.checkedCondition) {
                            let text = `Не проверено состояние изоляции ${this._state.section35.sectionDisconnector2.id}`;
                            this.addFails(text, 5);
                        }
                        this._state.section35.sectionDisconnector1.checkedCondition = false;
                        // end
                        this.waitAction(`Проверено отключенное положение. ${this._state.section35.sectionDisconnector2.id} отключен.`, `Не проверено отключенное положение ${this._state.section35.sectionDisconnector2.id}`, 1);
                        this.waitAction(`Вывешен плакат "НЕ ВКЛЮЧАТЬ РАБОТАЮТ ЛЮДИ" на привод ${this._state.section35.sectionDisconnector2.id}`, `Не вывешен плакат "НЕ ВКЛЮЧАТЬ РАБОТАЮТ ЛЮДИ" на привод ${this._state.section35.sectionDisconnector2.id}`, 2);
                        this._state.section35.sectionDisconnector1.checkedPosition = false;
                    } else {
                        this.addAction(`${this._state.section35.sectionDisconnector2.id} уже отключен`);
                    }
                }
                break;
            case 'sectionSwitcher35':
                if (this._state.section35.sectionSwitcher35.operational) {
                    if (this._state.section35.sectionSwitcher35.turnedOn) {
                        this._state.section35.sectionSwitcher35.turnedOn = false;
                        this.addAction('Отключен СВВ-35кВ');
                        this.waitAction('Проверено отключенное положение. СВВ-35кВ отключен.', 'Не проверено отключенное положение СВВ-6кВ', 1);
                        this._state.section35.sectionSwitcher35.checkedPosition = false;
                    } else {
                        this.addAction(`${this._state.section35.sectionSwitcher35.id} уже отключен`);
                    }
                } else {
                    this.addAction('Неисправность цепей управления');
                }
                break;
            case 'switcher6':
                this._state.switchers6.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (item.operational) {
                            if (item.turnedOn) {
                                item.turnedOn = false;
                                this.addAction(`Отключен ${item.id}`);
                                if (item.id === 'ВВ-6кВ яч.1 Ввод-1') {
                                    if (!this._state.switchers6[5].turnedOn) {
                                        this.addFails(`Не включен ${this._state.switchers6[5].id}`, 5)
                                    }
                                    if (!this._state.switchers6[6].turnedOn) {
                                        this.addFails(`Не включен ${this._state.switchers6[6].id}`, 5)
                                    }
                                    if (!this._state.switchers6[5].checkedPosition) {
                                        this.addFails(`Не проверено включенное положение ${this._state.switchers6[5].id}`, 5)
                                    }
                                    if (!this._state.switchers6[6].checkedPosition) {
                                        this.addFails(`Не проверено включенное положение ${this._state.switchers6[6].id}`, 5)
                                    }
                                    if (!this._state.tn[0].checkedVoltage) {
                                        this.addFails(`Не проверен уровень напряжения в ${this._state.tn[0].id.split(' ')[2]}`, 5)
                                    }
                                    if (!this._state.tn[1].checkedVoltage) {
                                        this.addFails(`Не проверен уровень напряжения в ${this._state.tn[1].id.split(' ')[2]}`, 5)
                                    }
                                    this.waitAction('Проверен уровень напряжения в яч.2', 'Не проверен уровень напряжения в яч.2 ТН-1', 3);
                                    this.waitAction('Проверен уровень напряжения в яч.12', 'Не проверен уровень напряжения в яч.12 ТН-2', 3);
                                }
                                if (item.id === 'СВВ-6кВ яч.6') {
                                    if (this._state.switchers6[0].checkedPosition) {
                                        this.addFails(`Не проверено включенное положение ${this._state.switchers6[0].id}`, 5)
                                    }
                                    if (this._state.switchers6[1].checkedPosition) {
                                        this.addFails(`Не проверено включенное положение ${this._state.switchers6[1].id}`, 5)
                                    }
                                    this.waitAction('Проверен уровень напряжения в яч.2', 'Не проверен уровень напряжения в яч.2 ТН-1', 3);
                                    this.waitAction('Проверен уровень напряжения в яч.12', 'Не проверен уровень напряжения в яч.12 ТН-2', 3);
                                }
                                if (item.id === 'ВВ-6кВ яч.12 Ввод-2') {
                                    if (!this._state.switchers6[5].turnedOn) {
                                        this.addFails(`Не включен ${this._state.switchers6[5].id}`, 5)
                                    }
                                    if (!this._state.switchers6[6].turnedOn) {
                                        this.addFails(`Не включен ${this._state.switchers6[6].id}`, 5)
                                    }
                                    if (!this._state.switchers6[5].checkedPosition) {
                                        this.addFails(`Не проверено включенное положение ${this._state.switchers6[5].id}`, 5)
                                    }
                                    if (!this._state.switchers6[6].checkedPosition) {
                                        this.addFails(`Не проверено включенное положение ${this._state.switchers6[6].id}`, 5)
                                    }
                                    this.waitAction('Проверен уровень напряжения в яч.2', 'Не проверен уровень напряжения в яч.2 ТН-1', 3);
                                    this.waitAction('Проверен уровень напряжения в яч.12', 'Не проверен уровень напряжения в яч.12 ТН-2', 3);
                                }
                                this.waitAction(`Проверено отключенное положение. ${item.id} отключен.`, `Не проверено отключенное положение ${item.id}`, 1);
                                item.checkedPosition = false;
                                this._state.switchers6[0].checkedCurrent = false;
                                this._state.switchers6[1].checkedCurrent = false;
                                this._state.tn[0].checkedVoltage = false;
                                this._state.tn[1].checkedVoltage = false;
                            } else {
                                this.addAction(`${item.id} уже отключен`);
                            }
                        } else {
                            this.addAction('Неисправность цепей управления');
                        }
                    }

                    return this._state;
                });
                break;
            case 'switcher35':
                this._state.switchers35.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (item.operational) {
                            if (item.turnedOn) {
                                item.turnedOn = false;
                                this.addAction(`Отключен ${item.id}`);
                                this.waitAction(`Проверено отключенное положение. ${item.id} отключен.`, `Не проверено отключенное положение ${item.id}`, 1);
                                item.checkedPosition = false;
                            } else {
                                this.addAction(`${item.id} уже отключен`);
                            }
                        } else {
                            this.addAction('Неисправность цепей управления');
                        }
                    }
                    return this._state;
                });
                break;
            case 'disconnector35':
                this._state.disconnectors35.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (item.turnedOn) {
                            item.turnedOn = false;
                            this.addAction(`Отключен ${item.id}`);
                            // check condition of Disconnectors
                            if (!item.checkedCondition) {
                                let text = `Не проверено состояние изоляции ${item.id}`;
                                this.addFails(text, 5);
                            }
                            item.checkedCondition = false;
                            // end
                            // check position and turnedOn of switcher35
                            let switcher35 = this._state.switchers35.filter(switcher => switcher.id === item.dependency);
                            if (!switcher35[0].checkedPosition) {
                                this.addFails(`Не проверено отключенное положение ${switcher35[0].id}`, 5)
                            }
                            if (switcher35[0].turnedOn) {
                                this.addFails(`Не отключен ${switcher35[0].id}`, 5)
                            }
                            // end
                            this.waitAction(`Проверено отключенное положение. ${item.id} отключен.`, `Не проверено отключенное положение ${item.id}`, 1);
                            item.checkedPosition = false;
                        } else {
                            this.addAction(`${item.id} уже отключен`);
                        }
                    }
                    return this._state;
                });
                break;
            case 'groundDisconnector35':
                this._state.disconnectors35.map(item => {
                    if (item.groundIn.id === this._state.elementsMenu.id) {
                        if (item.groundIn.turnedOn) {
                            item.groundIn.turnedOn = false;
                            this.addAction(`Отключены ${item.groundIn.id}`);
                            // check condition of Disconnectors
                            if (!item.checkedCondition) {
                                let text = `Не проверено состояние изоляции ${item.id}`;
                                this.addFails(text, 5);
                            }
                            item.checkedCondition = false;
                            // end
                            this.waitAction(`Проверено отключенное положение. ${item.groundIn.id} отключены.`, `Не проверено отключенное положение ${item.groundIn.id}`, 1);
                            item.groundIn.checkedPosition = false;
                        } else {
                            this.addAction(`${item.groundIn.id} уже отключены`);
                        }
                    }
                    if (item.groundOut.id === this._state.elementsMenu.id) {
                        if (item.groundOut.turnedOn) {
                            item.groundOut.turnedOn = false;
                            this.addAction(`Отключены ${item.groundOut.id}`);
                            // check condition of Disconnectors
                            if (!item.checkedCondition) {
                                let text = `Не проверено состояние изоляции ${item.id}`;
                                this.addFails(text, 5);
                            }
                            item.checkedCondition = false;
                            // end
                            this.waitAction(`Проверено отключенное положение. ${item.groundOut.id} отключен.`, `Не проверено отключенное положение ${item.groundOut.id}`, 1);
                            item.groundOut.checkedPosition = false;
                        } else {
                            this.addAction(`${item.groundOut.id} уже отключены`);
                        }
                    }
                    return this._state;
                });
                break;
            default:
                console.log('Unexpected type')
        }

        this.poweredOn(this._state);
        this.checkLeftPowered();
        this._callSubscriber();
    },


    changePosterHandle(poster, action) {
        switch (this._state.elementsMenu.type) {
            case 'tn':
                this._state.tn.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (action) this.addAction(`Вывешен плакат ${poster} на тележку ${item.id}`);
                        if (!action) this.addAction(`Снят плакат ${poster} с ${item.id}`);
                        if (poster === this._state.strings.ground) item.posterGround = action;
                        if (poster === this._state.strings.power) item.posterPower = action;
                    }
                    return this._state;
                });
                break;
            case 'tsn':
                this._state.tsn.map(item => {
                    let id = `ШР-6кВ ${item.id}`;
                    if (id === this._state.elementsMenu.id) {
                        if (poster === this._state.strings.ground) item.posterGround = action;
                        if (poster === this._state.strings.power) item.posterPower = action;
                        if (action) this.addAction(`Вывешен плакат ${poster} на привод ШР-6кВ ${item.id}`);
                        if (!action) this.addAction(`Снят плакат ${poster} с привода ШР-6кВ ${item.id}`);
                    }
                    return this._state;
                });
                break;
            case 'sn':
                this._state.tsn.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (poster === this._state.strings.ground) item.sn.posterGround = action;
                        if (poster === this._state.strings.power) item.sn.posterPower = action;
                        if (action) this.addAction(`Вывешен плакат ${poster} на АВ-0,4кВ ${item.id}`);
                        if (!action) this.addAction(`Снят плакат ${poster} с АВ-0,4кВ ${item.id}`);
                    }
                    return this._state;
                });
                break;
            case 'sectionDisconnector35':
                if (this._state.section35.sectionDisconnector1.id === this._state.elementsMenu.id) {
                    if (poster === this._state.strings.ground) this._state.section35.sectionDisconnector1.posterGround = action;
                    if (poster === this._state.strings.power) this._state.section35.sectionDisconnector1.posterPower = action;
                    if (action) this.addAction(`Вывешен плакат ${poster} на привод ${this._state.elementsMenu.id}`);
                    if (!action) this.addAction(`Снят плакат ${poster} с привода ${this._state.elementsMenu.id}`);
                }
                if (this._state.section35.sectionDisconnector2.id === this._state.elementsMenu.id) {
                    if (poster === this._state.strings.ground) this._state.section35.sectionDisconnector2.posterGround = action;
                    if (poster === this._state.strings.power) this._state.section35.sectionDisconnector2.posterPower = action;
                    if (action) this.addAction(`Вывешен плакат ${poster} на привод ${this._state.elementsMenu.id}`);
                    if (!action) this.addAction(`Снят плакат ${poster} с привода ${this._state.elementsMenu.id}`);
                }
                break;
            case 'sectionSwitcher35':
                if (poster === this._state.strings.ground) this._state.section35.sectionSwitcher35.posterGround = action;
                if (poster === this._state.strings.power) this._state.section35.sectionSwitcher35.posterPower = action;
                if (action) this.addAction(`Вывешен плакат ${poster} на ${this._state.elementsMenu.id}`);
                if (!action) this.addAction(`Снят плакат ${poster} с ${this._state.elementsMenu.id}`);
                break;
            case 'switcher6':
                this._state.switchers6.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (poster === this._state.strings.ground) item.posterGround = action;
                        if (poster === this._state.strings.power) item.posterPower = action;
                        if (action) this.addAction(`Вывешен плакат ${poster} на ${item.id}`);
                        if (!action) this.addAction(`Снят плакат ${poster} с ${item.id}`);
                    }
                    return this._state;
                });
                break;
            case 'switcher35':
                this._state.switchers35.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (poster === this._state.strings.ground) item.posterGround = action;
                        if (poster === this._state.strings.power) item.posterPower = action;
                        if (action) this.addAction(`Вывешен плакат ${poster} на ${item.id}`);
                        if (!action) this.addAction(`Снят плакат ${poster} с ${item.id}`);
                    }
                    return this._state;
                });
                break;
            case 'disconnector35':
                this._state.disconnectors35.map(item => {
                    if (item.id === this._state.elementsMenu.id) {
                        if (poster === this._state.strings.ground) item.posterGround = action;
                        if (poster === this._state.strings.power) item.posterPower = action;
                        if (action) this.addAction(`Вывешен плакат ${poster} на привод ${item.id}`);
                        if (!action) this.addAction(`Снят плакат ${poster} с привода ${item.id}`);
                    }
                    return this._state;
                });
                break;
            default:
                console.log('Unexpected type')
        }
    },

    addAction(text) {
        this._state.actions.push({text: text, id: this._state.elementsMenu.id, type: 'action'});
        this._addReport(this._state.actions[this._state.actions.length - 1], 0);
        if (this._state.waitList.length > 0) {
            this._state.waitList.map(item => {
                if (item.count > 0) {
                    if (item.text === this._state.actions[this._state.actions.length - 1].text) {
                        item.count = 0;
                    } else {
                        if (item.count === 1) this.addFails(item.failText, 5);
                        item.count = item.count - 1;
                    }
                }
                const newArray = this._state.waitList.filter(item => item.count > 0);
                this._state.waitList = newArray;
                return this._state.waitList
            });
        }
        // console.dir(this._state.waitList)
    },

    waitAction(text, failText, count) {
        this._state.waitList.push({
            text, failText, count
        })
    },

    addFails(text, score) {
        // console.dir(text, score);
        // if (this._state.fails.length===0 || text !== this._state.fails[this._state.fails.length - 1].text) {
        this._state.fails.push({text: text, id: this._state.elementsMenu.id, type: 'fail'});
        this._addReport(this._state.fails[this._state.fails.length - 1], score)
        // }
    },

    _addReport(obj, score) {
        if (this._state.report.length === 0 || obj.text !== this._state.report[this._state.report.length - 1].text) {
            this._state.report.push(obj);
            this._state.score -= score;
        }
    },

    showMenu(type, id, x, y) {
        document.removeEventListener('click', store.closeMenu);
        this._state.elementsMenu = {id, type, x, y};
        this._callSubscriber();
        document.addEventListener('click', store.closeMenu);
    },

    _callSubscriber() {
    },

    subscribe(observer) {
        this._callSubscriber = observer
    },

    getState() {
        return this._state
    },
};

export default store




