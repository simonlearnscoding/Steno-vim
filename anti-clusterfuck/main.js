import fs from 'fs'
import pipe from 'lodash/fp/flow.js'
import {MotionCombiner} from "../strokemerge.js";
import{denom, symbols} from "./symbols.js";
import {dictCreator} from "../dictcreator.js";


function getDictionary(name) {
    const output = JSON.parse(fs.readFileSync(`${name}.json`, 'utf8'));
    return output;
}
console.log(getDictionary('./../lol'))
class stringManipulation {
    static removeTheHyphen(str) {
        const vocals = ["A", "O" ,"E", "U", "*"]
        for(let i of vocals) {
            if(str.includes(i)) {
                let replaced = str.replace("-", "")
                replaced = '' + replaced
                return `${replaced}`
            }
        }
        return str
    }
    static mergeStrokeStrings = MotionCombiner.mainSortStroke
    static appendDictToggle(str, dictLeave) {
        let dictsToLeave = ''
        for (let dict of dictLeave) {
            dictsToLeave += `!${dict}, `
        }
        dictsToLeave = dictsToLeave.slice(0, -2);
        const toggleString = `{PLOVER:TOGGLE_DICT:${dictsToLeave}}`
        return `${str}${toggleString}`
        return
    }
    static appendDictLeave(str) {
        // const dictLeave = ['vim','lapwing-base', 'python', 'user', 'main' ]

        const dictLeave = ['vim.json']

        return stringManipulation.appendDictToggle(str, dictLeave)
    }
    static appendEnterToExit(str) {
        const EnterToExit = ["EnterToExit.json"]
        return stringManipulation.appendDictToggle(str, EnterToExit)
    }
    static appendToggleSpelling(str) {
        const dictLeave = ["search-fingerspell.json"]
        return stringManipulation.appendDictToggle(str, dictLeave)
    }
    static addFunnyHat(str) {
        return `{^}${str}{^}`
    }
    static shiftToUpper(stroke) {
        const charNum = getChar(stroke)
        const strBefore = stroke.substring(0, charNum)
        const toUpper = stroke.charAt(charNum).toUpperCase()
       const strAfter =   stroke.substring(charNum + 1)
        return strBefore + toUpper + strAfter
        function getChar(string) {
            for (let i= 0; i < string.length; i++)
                {
                    if (isALetter(string.charCodeAt(i))) {
                        return i
                    }
                }
        function isALetter(i) {
                if (i<65) {
                    return false
                    }
                if(i>122) {
                    return false
                }
                if(i<65) {
                    return false
                }
                return true
        }
        }
    }
}





const changeStrokeKey = (fn, dict) => {
    const arr = []
    for(const i of dict) {
        let obj = {...i}
        const oldKey = Object.keys(obj)[0]
        let newKey = fn(oldKey)
        if (oldKey !== newKey)
        {
            Object.defineProperty(obj, newKey,
                Object.getOwnPropertyDescriptor(obj, oldKey));
            delete obj[oldKey];
        }
        arr.push(obj)
    }
    return arr
}
const changeStrokeValue = (fn, dict) => {
    const arr = []
    for(const i of dict) {
        let obj = {}
        const key = Object.keys(i)[0]
        let oldVal = Object.values(i)[0]
        let value = fn(oldVal)
        obj[key] = value
        arr.push(obj)
    }
    return arr
}

function changeVal(fn, dict) {
    const change = (dict) => changeStrokeValue(fn, dict)
    const fn2 = manipulateDict(change)
    return fn2(dict)
}
function changeStroke (fn, dict) {
    const change = (dict) => changeStrokeValue(fn, dict)
    const fn2 = manipulateDict(change)
    return fn2(dict)
}


const manipulateDict = (fn) => pipe(
    getAsArr,
    fn,
    returnIntoObject
)
export class dictmanipulator {

    static giveDenominator(denom, dict) {
        const den = denom
        function fn(string) {
            return stringManipulation.mergeStrokeStrings(string, den)
        }
        const funct2 = (dict) => changeStrokeKey(fn, dict)
        return manipulateDict(funct2)(dict)
    }

    static removeHyphen(dict) {
        function fn(string) {
            return stringManipulation.removeTheHyphen(string).toString()
        }
        const funct2 = (dict) => changeStrokeKey(fn, dict)
        return manipulateDict(funct2)(dict)
    }
    static capitalize(dict) {
        return changeVal(stringManipulation.shiftToUpper, dict)
    }
    static capitalizeAndGiveDenominator(denom, dict) {
        let shift = (dictmanipulator.giveDenominator(denom, dict))
        return changeVal(stringManipulation.shiftToUpper, shift)
    }
    static exitDictionary(dict) {
        return changeVal(stringManipulation.appendDictLeave, dict)
    }
    static toggleFingerSpell(dict) {
        return changeVal(stringManipulation.appendToggleSpelling, dict)
    }
    static toggleExitDict(dict) {
        return changeVal(stringManipulation.appendEnterToExit, dict)
    }
    static giveFunnyHat(dict) {
        return changeVal(stringManipulation.addFunnyHat, dict)
    }
    static mergeTwoDicts(dict1, dict2) {
        const dictionary1 = getAsArr(dict1)
        const dictionary2 = getAsArr(dict2)
        const newArr = []
        for (const stroke1 of dictionary1) {
            for (const stroke2 of dictionary2) {
                const obj = {}
                const stroke1str = Object.keys(stroke1)[0]
                const stroke2str = Object.keys(stroke2)[0]
                const newKey = stringManipulation.mergeStrokeStrings(stroke1str, stroke2str)
                const val = Object.values(stroke1)[0] + Object.values(stroke2)[0]
                obj[newKey] = val
                newArr.push(obj)
            }
        }
        return returnIntoObject(newArr)
    }
}





const merger = (denom) => stringManipulation.mergeStrokeStrings(denom, stroke)
const fn = (dict) => changeStrokeKey(merger, dict)



function getAsArr(dict) {
    // const dict = this.getDictionary(name)
    let keys = Object.keys(dict)
    let values = Object.values(dict)
    const arr = []
    for (const i in keys) {
        arr.push(arraytoObj(keys[i], values[i]))
    }
    return arr
}
function returnIntoObject(dict) {
    const obj = {}
    for (let i of dict) {
        const newObj = i
        const key = Object.keys(newObj)[0]
        const val = Object.values(newObj)[0]
        obj[key] = val
    }
    return obj;
}
function arraytoObj(key, val) {
    // let k = "\"" + key.toString()+"\""
    const obj = {}
    obj[key] = val.toString()
    return obj}





