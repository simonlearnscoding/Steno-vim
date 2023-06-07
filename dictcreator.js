import {MotionCombiner} from "./strokemerge.js";
import fs from 'fs'
import {turnArrayToDict} from "./anti-clusterfuck/symbols.js"
class dictCreatorBasics {
    static getAsArray(dict) {
        // const dict = this.getDictionary(name)
        let keys = Object.keys(dict)
        let values = Object.values(dict)
        const arr = []
        for (const i in keys) {
            arr.push(this.arraytoObj(keys[i], values[i]))
        }
        return turnArrayToDict(arr)


    }

    static arraytoObj(key, val) {
        // let k = "\"" + key.toString()+"\""
        const obj = {}
        obj[key] = val.toString()
        return obj
    }
    static getDictionary(name) {
        const output = JSON.parse(fs.readFileSync(`${name}.json`, 'utf8'));
        return output;
    }
}

export class dictCreator extends dictCreatorBasics {
    constructor(name) {
        super();
        this.dict = {}
        this.name = name
     }
    static mergeTwoDicts(dict1, dict2) {
        const arr = []
        const dictionary1 = dictCreator.getAsArray(dict1)
        const dictionary2 = dictCreator.getAsArray(dict2)
        for (let i of dictionary1) {
            for (let j of dictionary2) {
               console.log(i, j)
               arr.push(MotionCombiner.mergeTheTwoStrokes(i, j))

            }
        }

        return arr
    }
    async createDictionary() {
       const dict = JSON.stringify(this.dict, null, "\t")
       fs.writeFile(`./dicts/${this.name}.json`, dict, function(err, result) {
           if(err) console.log('error', err);
       });
   }
   addStroke(stroke, translation) {
        this.dict[stroke] = translation
   }
}
const dic = new dictCreator('seas')

dic.addStroke("-S", "k")
dic.addStroke("-R", "o")
dic.addStroke("-Y", "O")

await dic.createDictionary()





