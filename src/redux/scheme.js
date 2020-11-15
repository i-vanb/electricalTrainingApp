const canvasWidth = document.body.offsetWidth - 200 - 2 - 2;
const canvasHeight = document.documentElement.clientHeight - 100 - 2 - 2;
const stepWidth = canvasWidth / 9;
const stepHeight = canvasHeight / 10;

const working = 'working';
const control = 'control';

let state = {
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
            normal_t1: 'нормальная - Т1 в ремонт',
            normal_t2: 'нормальная - Т2 в ремонт',
            t1_normal: 'Т1 ремонт - нормальная',
            t2_normal: 'Т2 ремонт - нормальная',
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
    }


export default state




