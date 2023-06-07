import pipe from 'lodash/fp/flow.js'
// import {dictCreator} from "./dictcreator.js";

export class Strokemanipulation {
    static mergeTheTwoStrokes(trans1, trans2) {
        const obj = MotionCombiner.mergeTranslation(trans1, trans2)
        return obj
    }

    static manipulateStroke(stroke, new_key) {
        const obj = {...stroke}
        const key = MotionCombiner.getKey(obj)
        if (key !== new_key) {
            Object.defineProperty(obj, new_key,
                Object.getOwnPropertyDescriptor(obj, key));
            delete obj[key];
            return obj
        }
    }

    static mergeDictWithDenominator(dict, denom) {
        const arr = []
        let diction = dictCreator.getAsArray(dict)
        for (const stroke of diction) {
            arr.push(this.mergeStrokeWithDenominator(stroke, denom))
        }
        return arr
    }

    static mergeStrokeWithDenominator(stroke, str) {
        const new_key = this.stringAddDenominator(stroke, str)
        return this.manipulateStroke(stroke, new_key)
    }

    static manipulateValue(stroke, fn) {
        const obj = {...stroke}
        const key = Object.keys(stroke)[0]
        const val = Object.values(stroke)[0]
        obj[key] = fn(val)
        return obj
    }

    static AddFnhat(stroke) {
        return this.manipulateValue(stroke, this.addFunnyHat)
    }


    static stringAddDenominator(stroke, str) {
        return MotionCombiner.mainSortStroke(MotionCombiner.getKey(stroke), str)
    }

    static addFunnyHat(str) {
        return `{^}${str}{^}`
    }

    static getStroke(stroke) {
        return Object.values(stroke)[0]
    }
}

export class MotionCombiner extends Strokemanipulation {

    static mergeTranslation(trans1, trans2) {
        let stroke = this.mainSortStroke(this.getKey(trans1), this.getKey(trans2))
        let translation = this.getStroke(trans2) + this.getStroke(trans1)
        const obj = {
            [stroke] : translation
        }
        return obj }

        static orderArray = ['#', 'S', 'T', 'K', 'P', 'W', 'H', 'R',
        'A', 'O','*', 'E', 'U'
    ]



    static orderArray2 = ['F', 'R', 'P', 'B', 'L', 'G', 'T', 'S', 'D', 'Z'
    ]
    // static sort2 = this.sorting(this.sortArray2)


    // static sort1 = this.sorting(this.sortArray1)

    static mainSortStroke(stroke1, stroke2) {

        const str1 = MotionCombiner.splitter(stroke1)
        const str2 = MotionCombiner.splitter(stroke2)
        const merged1 = MotionCombiner.merge(str1[0], str2[0])

        const merged2 = MotionCombiner.merge(str1[1], str2[1])
        let sorted1 = MotionCombiner.sort1(merged1)
        let sorted2 = MotionCombiner.sort2(merged2)
        return MotionCombiner.unitestrings(sorted1, sorted2)
    }


    static removeDuplicates(arr) {
        return arr.filter((item,
                           index) => arr.indexOf(item) === index);
    }

    static sortg = (fn) => pipe(
        this.turnIntoArray,
        this.removeDuplicates,
        fn,
        this.turnIntoString
    )
    static sort1= this.sortg(MotionCombiner.sortArray)

    static sort2 = this.sortg(MotionCombiner.sortArray2)

    static sortfunction(char, sortArray=this.orderArray2) {
            let i = 0
            while (true) {
                if(char == sortArray[i]) {
                    return i
                }

               i++
            }
    }
    static turnIntoArray(string) {
            return Array.from(string);
    }

    static turnIntoString(array) {
            return array.join('')
    }
    static compareFn(a, b, sortArray) {
        const A = MotionCombiner.sortfunction(a, sortArray)
        const B = MotionCombiner.sortfunction(b, sortArray)
        if (A < B) {
            return -1;
        }
        if (B < A) {
            return 1;
        }
        // a must be equal to b
        return 0;
    }

    static sortArray(array) {
            return array.sort((a, b) => this.compareFn(a, b, this.orderArray))
    }

    static sortArray2(array) {
        return array.sort((a, b) => MotionCombiner.compareFn(a, b, this.orderArray2))
    }
    static splitter(str) {
        if(!(str.includes('-'))) {
            return [str, '']
        }
       return str.split('-')
    }
    static getKey(stroke) {
        return Object.keys(stroke)[0]
    }
    static merge(array1, array2) {
            return array1 + array2
    }
    static unitestrings(array1, array2) {
            if(array2=='') {
                return array1
            }
            return `${array1}-${array2}`
    }

    // expected result {}
}