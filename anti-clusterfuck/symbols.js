import fs from 'fs'
import { MotionCombiner, Strokemanipulation } from '../strokemerge.js'
// import {dictCreator} from "./dictcreator.js";
export class commands {

}

function getDictionary(name) {
    const output = JSON.parse(fs.readFileSync(`${name}.json`, 'utf8'))
    return output
}

export const denom = {
    commandsEmilyDenom: '-D',
    numbersDenom: 'S',
    numberMotionDenom: '#',
    ShiftDenom:
        'U',
    rightSideCapDenom: 'P',
    commandAndSomethingCapDenom: '-T',
    commandAndSomethingNumDenom: '-TD',
    SpellCapitalizeDenom: '-P',
    SpellingDenom: '*',
    EmilyDenom: 'SKWH',
    EmilyMod1: 'E',
    EmilyMod2: 'U',
    EmilyMod3: 'EU'
}

export const symbols = {
    emilyRightSide: {
        'E-FPL': '[',
        'E-RBG': ']',
        'EU-FPL': '\\{',
        'EU-RBG': '\\}',
        'U-FPL': '<',
        'U-RBG': '>',
        '-FR': '!',
        '-FP': '"',
        '-FRTS': '#',
        '-RPBL': '$',
        '-FRPB': '%',
        '-FBG': '&',
        '-F': "'",
        '-FPL': '(',
        '-RBG': ')',
        '-L': '*',
        '-G': '+',
        '-B': ',',
        '-PL': '-',
        '-R': '.',
        '-RP': '/',
        '-LG': ':',
        '-RB': ';',
        '-PBLG': '=',
        '-FPB': '?',
        '-FRPBLG': '@',
        '-FB': '\\',
        '-RPG': '^',
        '-BG': '_',
        '-P': '`',
        '-PB': '|',
        '-FPBG': '~'
    },
    emilyLeftSide: {

        TK: '!',
        TP: '"',
        TKHR: '#',
        KPWH: '$',
        TKPW: '%',
        TWR: '&',
        T: "'",
        TPH: '(',
        KWR: ')',
        H: '*',
        R: '+',
        W: ',',
        PH: '-',
        K: '.',
        KP: '/',
        HR: ':',
        KW: ';',
        PWHR: '=',
        TPW: '?',
        TKPWHR: '@',
        TW: '\\',
        KPR: '^',
        WR: '_',
        P: '`',
        PW: '|',
        TPWR: '~',
        TPHEU: '\\{',
        KWREU: '\\}'

    },

    repeatCommand: {
        '#': '.'
    },
    motionsShift: {
        '-F': 'b',
        '-P': 'w',
        '-L': 'e'
    },
    numbersLeft: getDictionary('./../numbers_onehand'),
    numbers1_1000: getDictionary('./../numbers_1_1000'),
    ShiftDifferent: {
        '-DZ': 'U',
        '-FR': 'H',
        TKPW: 'G',
        '-PB': 'M',
        '-LG': 'L',
        '-Z': ',',
        '-R': '{#Control_L(o)}',
        '-B': '{#Control_L(d)}',
        '-G': '{#Control_L(u)}',
        '-S': '{#Control_L(i)}',
        '-FPL': '\\{',
        '-RBG': '\\}'
    },
    shiftDifferentWithCommands: {
        UFPL: '\\{',
        URBG: '\\}',
        '-FPL': '<',
        '-RBG': '>'
    },
    spellingsRightSide: {
        '-S': 's',
        '-R': 'k',
        '-F': 't',
        '-FR': 'd',
        '-P': 'p',
        '-PB': 'b',
        '-B': 'w',
        '-L': 'h',
        '-LG': 'l',
        '-G': 'r',
        '-FP': 'f',
        '-PL': 'm',
        '-FPL': 'n',
        '-RP': 'x',
        '-PBLGS': 'z',
        '-FRPB': 'g',
        '-RBGS': 'j',
        '-RBG': 'y',
        '-RS': 'v',
        A: 'a',
        O: 'o',
        E: 'e',
        U: 'u',
        EU: 'i',
        '-RB': 'q'

    },

    spellings: {
        S: 's',
        K: 'k',
        T: 't',
        TK: 'd',
        P: 'p',
        PW: 'b',
        W: 'w',
        H: 'h',
        HR: 'l',
        R: 'r',
        TP: 'f',
        PH: 'm',
        TPH: 'n',
        KP: 'x',
        STKPW: 'z',
        TKPW: 'g',
        SKWR: 'j',
        KWR: 'y',
        SR: 'v',
        A: 'a',
        O: 'o',
        E: 'e',
        U: 'u',
        EU: 'i',
        KW: 'q'
    },
    searchCommandsLeft: {
        T: 't',
        TP: 'f',
        TH: 'T',
        TPH: 'F'

    },
    RCommand: {
        R: 'R'
    },
    searchCommandsRight: {

        '-RS': 'F',
        '-S': 'f',
        '-T': 't',
        '-RT': 'T'
    },
    motionsWithNumber: {
        '-R': 'h',
        '-B': 'j',
        '-G': 'k',
        '-F': 'b',
        '-P': 'w',
        '-L': 'e'

    },

    justL: {
        '-S': 'l'
    },
    motionsNumberNoCAP: {
        '-LG': '$',
        '-FRPB': '%',
        '-FPL': '(',
        '-RBG': ')'
    },
    insertModes: {
        A: 'i',
        O: 'a',
        AO: 'o'
    },
    oInsert: {
        AO: 'o'
    },
    commands: {
        cButton: {
            KR: 'c'
        },
        rButton: {
            R: 'r'
        },
        sButton: {
            S: 's'
        },
        dButton:
            { K: 'd' },
        yButton: {
            KWR: 'y'
        },
        xButton: {
            W: 'x'
        },
        vButton: {
            SR: 'v'
        },
        mainCommands: {
            K: 'd',
            W: 'x',
            KWR: 'y',
            SR: 'v',
            R: 'r'

        },
        mainCommandsExit: {

            S: 's',
            KR: 'cc'
        },
        mainCommandsCopy: {

            K: 'dd',
            KWR: 'yy'
        },
        mainCommandsNoCopy: {
            W: 'x',
            SR: 'v'
        },
        simpleShift: {
            TPH: 'n',
            R: 'r'
        },
        simpleNoShift: {
            TPH: 'n',
            '#P': 'p',
            '#PE': 'P',
            TKPW: 'gg',
            '#TKPW': 'gd',
            '#U': '{#Escape}',
            '-Z': ';',
            TKUPT: '{PLOVER:ADD_TRANSLATION}',
            '#HR': '~',
            '-DZ': '{#Control_L(r)}'
        },
        pasteCommand: {
            P: 'p'
        }
    },
    registers: {

        '-LT':
            '"'

    },
    undoCommand: {
        '*': 'u'
    },
    motionsNoNumber: {
        '-PB': '^',
        '-FR': '0'
    },
    singleCommands: {
        PH: 'm',
        HR: '~'
    },
    numpadRight: {
        '-S': '1',
        '-SZ': '2',
        '-Z': '3',
        '-TS': '4',
        '-TSZD': '5',
        '-DZ': '6',
        '-T': '7',
        '-TD': '8',
        '-D': '9'
    }
}
// console.log(MotionCombiner.mergeDictWithDenominator(commands.commands, commands.denominator))

function shiftToUpper(stroke) {
    // let stroke = dictCreator.arraytoObj(strke[0], strke[1])
    // let string = MotionCombiner.getKey(stroke)

    return stroke.substring(0, 3) + stroke[3].toUpperCase() + stroke.substring(4)
}

export function ArrayToUpper(dict) {
    const obj = {}
    for (const i of dict) {
        const newObj = (Strokemanipulation.manipulateValue(i, shiftToUpper))
        const key = Object.keys(newObj)[0]
        const val = Object.values(newObj)[0]
        obj[key] = val
    }
    return obj
}
export function turnArrayToDict(dict) {
    const obj = {}
    for (const i of dict) {
        const newObj = (Strokemanipulation.manipulateValue(i, shiftToUpper))
        const key = Object.keys(newObj)[0]
        const val = Object.values(newObj)[0]
        obj[key] = val
    }
    return obj
}
