import {MotionCombiner} from "./strokemerge"

import pipe from 'lodash/fp/flow'
const num = {"KR": "13"}
const motion = {"-B": "j"}
const numMotion = {'KR-B' : "{^}13j{^}"}

const string1 = "abc"
const string2 = "def"
const number = {"SPW-LGD": "{^}956{^}"}
test('check getValue', () => {expect(MotionCombiner.getKey(motion)).toBe("-B")})
test('check getStroke', () => {expect(MotionCombiner.getStroke(motion)).toBe("j")})

test('check sort', () => {expect(MotionCombiner.splitter('SPW-LGD')).toStrictEqual(['SPW', 'LGD'])})
test('check sort before hyphen', () => {expect(MotionCombiner.splitter('KR')).toStrictEqual(['KR', ""])})
test('check sort after hyphen', () => {expect(MotionCombiner.splitter('-B')).toStrictEqual(["", "B"])})

test('merge array', () => {expect(MotionCombiner.merge(string1, string2)).toBe('abcdef')})
test('unite array', () => {expect(MotionCombiner.unitestrings(string1, string2)).toBe('abc-def')})

test('unite sortingFunction', () => {expect(MotionCombiner.sortfunction("H", MotionCombiner.orderArray)).toBe(6)})
test('unite sortingFunction2', () => {expect(MotionCombiner.sortfunction("B", MotionCombiner.orderArray2)).toBe(3)})

test('Turn array', () => {expect(MotionCombiner.turnIntoArray('abc')).toStrictEqual(['a','b','c'])})
test('turn string', () => {expect(MotionCombiner.turnIntoString(['a','b'])).toStrictEqual('ab')})
test('main stroke test', () => {expect(MotionCombiner.mainSortStroke("SPW-LGD", "KR")).toEqual("SKPWR-LGD")})
test('main translation test', () => {expect(MotionCombiner.mergeTranslation(num, motion)).toEqual(numMotion)})


class fn {

    subtractThree(a) {
        return a - 3
    }
    addTwo(a) {
        return a + 2
    }
    duplicate(a) {
        return a * 2
    }
}