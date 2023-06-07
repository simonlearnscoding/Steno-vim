import fs from 'fs'
import { dictmanipulator } from './main.js'
import { denom, symbols } from './symbols.js'

function createSpelledAlphabet() {
  const spelled = dictmanipulator.giveDenominator(denom.SpellingDenom, symbols.spellings)
  const capitalizedSpelled = dictmanipulator.capitalizeAndGiveDenominator(denom.SpellCapitalizeDenom, spelled)
  return { ...spelled, ...capitalizedSpelled }
}
function createLetterL() {
  const L = dictmanipulator.capitalizeAndGiveDenominator(denom.ShiftDenom, symbols.justL)
  const l = dictmanipulator.mergeTwoDicts(symbols.numbersLeft, symbols.justL)
  const CapliterallyJustL = {
    ...L,
    ...dictmanipulator.mergeTwoDicts(symbols.numbersLeft, symbols.justL),
    ...l,
    ...symbols.justL
  }
  return CapliterallyJustL
}
const problemForLater = {
  ...createLetterL(),
  ...createSpelledAlphabet()
}

const allMotions = createBasicMotions()
const commands = createMainCommands()
// console.log(commands)
const { undoCommand } = symbols

function getNumbers() {
  const bigNumbers = dictmanipulator.giveDenominator(denom.numbersDenom, symbols.numbers1_1000)
  // let numPad = symbols.numbersOnehand;
  return { ...bigNumbers }
}

// let insertModeCommands = createInsertMode()
let dict = {
  ...allMotions,
  ...getNumbers(),
  ...commands,
  ...undoCommand,
  ...createInsertMode(),
  ...problemForLater,
  ...getSearchCommands(),
  ...commandWithSearch(),
  ...createInsideAndAround()

}
dict = dictmanipulator.removeHyphen(dict)
dict = dictmanipulator.giveFunnyHat(dict)
function createInsideAndAround() {
  const InsideAround = {
    P: 'i',
    H: 'a'
  }
  let mainCommands = { ...symbols.commands.dButton, ...symbols.commands.yButton, ...symbols.commands.vButton }
  let cCommand = symbols.commands.cButton
  // mainCommands = dictmanipulator.giveDenominator(denominators.commandDenom, mainCommands)
  // mainCommands = dictmanipulator.giveDenominator(denominators.commandDenom, mainCommands)
  // cCommand = dictmanipulator.giveDenominator(denominators.commandDenom, cCommand)
  mainCommands = dictmanipulator.mergeTwoDicts(mainCommands, InsideAround)
  cCommand = dictmanipulator.mergeTwoDicts(cCommand, InsideAround)

  const CommandThenSpell = commandThenSpell()

  const alphabetCapitalized = dictmanipulator.capitalizeAndGiveDenominator(denom.commandAndSomethingCapDenom, symbols.spellingsRightSide)
  const alphabet = { ...symbols.spellingsRightSide, ...alphabetCapitalized }

  const commandsWithAlph = dictmanipulator.mergeTwoDicts(mainCommands, alphabet)
  let CcommandWithAlph = dictmanipulator.mergeTwoDicts(cCommand, alphabet)

  const emilySym = dictmanipulator.giveDenominator(denom.commandsEmilyDenom, symbols.emilyRightSide)
  CcommandWithAlph = dictmanipulator.exitDictionary(CcommandWithAlph)
  function pasteCommand() {
    const PCommand = {
      '#P': 'v'
    }
    let P = dictmanipulator.mergeTwoDicts(PCommand, InsideAround)
    const PwithAlphabet = dictmanipulator.mergeTwoDicts(P, symbols.spellingsRightSide)
    const PwithSymbols = dictmanipulator.mergeTwoDicts(P, emilySym)
    P = { ...PwithAlphabet, ...PwithSymbols }
    const addition = { P: 'p' }
    P = dictmanipulator.mergeTwoDicts(P, addition)
    return P

    // TODO: with number denominator
  }

  // "I want to put this text inside the parentheses" test filler words go here (I need to get rid of this text)

  const commandsAndSymbols = dictmanipulator.mergeTwoDicts(mainCommands, emilySym)
  const commandsAndSymbolsC = dictmanipulator.mergeTwoDicts(cCommand, emilySym)

  return {
    ...commandsWithAlph,
    ...CcommandWithAlph,
    ...CommandThenSpell,
    ...commandsAndSymbols,
    ...commandsAndSymbolsC,
    ...pasteCommand(),
    ...SearchAndCommandMode(),
    ...newR(),
    ...symbols.commands.simpleNoShift
  }
  function SearchAndCommandMode() {
    let searchAndCommand = {
      '-RBGS': '\/',
      ERBGS: ':'
    }
    searchAndCommand = dictmanipulator.exitDictionary(searchAndCommand)
    searchAndCommand = dictmanipulator.toggleExitDict(searchAndCommand)
    return searchAndCommand
  }
  function commandThenSpell() {
    // TODO Create sole thing with fingerspelling here
    const mainThenSpell = dictmanipulator.toggleFingerSpell(mainCommands)
    let cThenSpell = dictmanipulator.toggleFingerSpell(cCommand)
    cThenSpell = dictmanipulator.exitDictionary(cThenSpell)
    const CommandThenSpell = { ...mainThenSpell, ...cThenSpell }
    return CommandThenSpell
  }
}
function createInsertMode() {
  const insertCommandsShift = dictmanipulator.capitalizeAndGiveDenominator(denom.ShiftDenom, symbols.insertModes)
  const normalCommands = symbols.insertModes
  let commands = { ...insertCommandsShift, ...normalCommands }

  function commandsAndMotions() {
    const commandsMotion = dictmanipulator.mergeTwoDicts(symbols.motionsWithNumber, normalCommands)

    const MotionNumber = dictmanipulator.mergeTwoDicts(symbols.numbersLeft, symbols.motionsWithNumber)
    let MotionShift = dictmanipulator.capitalizeAndGiveDenominator(denom.ShiftDenom, symbols.motionsShift)
    const commandsShiftedMotion = dictmanipulator.mergeTwoDicts(MotionShift, normalCommands)
    MotionShift = dictmanipulator.mergeTwoDicts(symbols.numbersLeft, MotionShift)
    MotionShift = dictmanipulator.mergeTwoDicts(MotionShift, normalCommands)
    const commandMotionNumber = dictmanipulator.mergeTwoDicts(MotionNumber, normalCommands)
    return {
      ...commandsMotion, ...commandMotionNumber, ...MotionShift, ...commandsShiftedMotion
    }
  }

  const commandsMotion = commandsAndMotions()

  function commandsWithO() {
    let o = symbols.oInsert
    const O = dictmanipulator.capitalizeAndGiveDenominator(denom.ShiftDenom, symbols.oInsert)

    o = { ...o, ...O }
    o = dictmanipulator.mergeTwoDicts(symbols.numbersLeft, o)
    const str = '{#Escape}'
    for (const [key, value] of Object.entries(o)) {
      o[key] = value + str
    }
    console.log(o)
    return o
  }
  commands = { ...commands, ...commandsMotion }
  commands = dictmanipulator.exitDictionary(commands)
  const OCommands = commandsWithO()
  commands = { ...commands, ...OCommands }
  commands = dictmanipulator.giveFunnyHat(commands)
  return commands
}

function getMotionsAndNumbers() {
  const motions = { ...symbols.motionsWithNumber, ...{ '-S': 'l' } }
  const numPad = dictmanipulator.mergeTwoDicts(symbols.numpadRight, motions)
  const oneHand = dictmanipulator.mergeTwoDicts(symbols.numbersLeft, motions)
  return dictmanipulator.giveDenominator(denom.numberMotionDenom, { ...numPad, ...oneHand })
}

function getCapitalizedMotionsWithNumbers(object) {
  let obj = dictmanipulator.mergeTwoDicts(symbols.numbersLeft, object)
  obj = dictmanipulator.giveDenominator(denom.numberMotionDenom, obj)
  return obj
}

function getNormalMotions() {
  return {
    ...symbols.motionsWithNumber, ...symbols.motionsNoNumber, ...symbols.motionsNumberNoCAP, ...symbols.motionsWithNumber, ...symbols.motionsShift
  }
}
function newR() {
  const newR = { '*-R': 'r' }
  let spelling = symbols.spellings
  const spellingCap = dictmanipulator.capitalizeAndGiveDenominator(denom.SpellCapitalizeDenom, spelling)
  spelling = { ...spelling, ...spellingCap }
  const rWithSpelling = dictmanipulator.mergeTwoDicts(newR, spelling)
  const allSymbols = dictmanipulator.giveDenominator(denom.commandsEmilyDenom, symbols.emilyLeftSide)
  const rWithSymbols = dictmanipulator.mergeTwoDicts(newR, allSymbols)
  const numDenom = '-PL'
  const numbers = dictmanipulator.giveDenominator(numDenom, symbols.numbersLeft)
  const rWithNumbers = dictmanipulator.mergeTwoDicts(newR, numbers)
  return { ...rWithNumbers, ...rWithSymbols, ...rWithSpelling }
}
function getMotionsWithNumbersNoCap() {
  let obj = dictmanipulator.mergeTwoDicts(symbols.numbersLeft, symbols.motionsNumberNoCAP)
  obj = dictmanipulator.giveDenominator(denom.numberMotionDenom, obj)
  return obj
}

function createBasicMotions() {
  // TODO: create basic motions
  const obj = {}
  obj.repeatCommand = symbols.repeatCommand
  obj.normalMotions = getNormalMotions()
  obj.capitalizedMotions = getShiftMotions()
  obj.motionsAndNumbers = Object.assign(getMotionsAndNumbers(), symbols.motionsNumberNoCAP, getMotionsWithNumbersNoCap())
  function getShiftMotions() {
    const shiftDifferent = dictmanipulator.giveDenominator(denom.ShiftDenom, symbols.ShiftDifferent)
    return Object.assign(getCapitalizeMotions(), getCapitalizedMotionsWithNumbers(getCapitalizeMotions()), shiftDifferent)
  }
  return (dictMerger(obj))
}
function getCapitalizeMotions() {
  return dictmanipulator.capitalizeAndGiveDenominator(denom.ShiftDenom, symbols.motionsShift)
}

function getSearchCommands() {
  let searchCommandsRight = dictmanipulator.giveDenominator(denom.SpellingDenom, symbols.searchCommandsRight)
  let obj = dictmanipulator.mergeTwoDicts(searchCommandsRight, symbols.spellings)
  const spellCap = dictmanipulator.capitalizeAndGiveDenominator(denom.SpellCapitalizeDenom, symbols.spellings)
  const Cap = dictmanipulator.mergeTwoDicts(searchCommandsRight, spellCap)
  const emilySearchDenom = '-L'
  let Emily = dictmanipulator.giveDenominator(emilySearchDenom, searchCommandsRight)
  let oneFurther = { '-F': ';' }
  const oneDownAndUp = {
    '-B': 'j',
    '-G': 'k'
  }
  const justTheFCommands = dictmanipulator.toggleFingerSpell(searchCommandsRight)
  Emily = dictmanipulator.mergeTwoDicts(Emily, symbols.emilyLeftSide)

  obj = { ...obj, ...Cap, ...Emily }

  oneFurther = dictmanipulator.mergeTwoDicts(obj, oneFurther)
  const justMove = dictmanipulator.mergeTwoDicts(oneDownAndUp, obj)
  const moveAndFurther = dictmanipulator.mergeTwoDicts(oneDownAndUp, oneFurther)
  const numDenom = '-PL'
  const numPad = dictmanipulator.giveDenominator(numDenom, symbols.numbersLeft)
  const withNumbers = dictmanipulator.mergeTwoDicts(searchCommandsRight, numPad)
  obj = {
    ...obj, ...Cap, ...Emily, ...justMove, ...oneFurther, ...moveAndFurther, ...justTheFCommands, ...withNumbers
  }
  return obj
}

function dictMerger(dict) {
  const obj = {}
  for (const key of Object.values(dict)) {
    Object.assign(obj, key)
  }
  return obj
}
function createMainCommands() {
  const criteria = {
    toShift: ['simpleShift', 'pasteCommand', 'cButton', 'mainCommands'], // TODO add search command
    withNumpad: ['cButton', 'mainCommands', 'simpleShift', 'pasteCommand']

  }

  let obj = { ...capitalizedCommands(), ...CommandsAndMotions() }
  // obj = dictmanipulator.giveDenominator(denominators.commandDenom, obj)
  obj = { ...obj, ...basicCommands() }
  return obj

  function basicCommands() {
    const commands = {
      ...symbols.commands.dButton,
      ...symbols.commands.yButton,
      ...symbols.commands.pasteCommand,
      ...symbols.commands.xButton
    }
    // TODO basic commands with numbers (unless f gets in the way??)
    // TODO basic commands with . as repeat
    // TODO basic commands with c button

    return commands
  }
  function capitalizedCommands() {
    return doSomethingWithSomeDicts(criteria.toShift, symbols.commands, dictmanipulator.capitalizeAndGiveDenominator, denom.ShiftDenom)
  }
  function CommandsAndMotions() {
    const mainCommands = { ...getMainCommands(), ...getSCommand(), ...getRCommand() }
    const commandsWithMotions = getAllCommandsAndMotions()
    const obj = { ...mainCommands, ...commandsWithMotions }

    return obj

    function getAllCommandsAndMotions() {
      const commandMotionsNoNumber = dictmanipulator.mergeTwoDicts(getMainCommands(), symbols.motionsNoNumber)
      const commandsCapitalizedMotions = dictmanipulator.mergeTwoDicts(getMainCommands(), getCapitalizeMotions())
      const cmdNumberMotion = commandsAndMotions()

      return { ...commandMotionsNoNumber, ...commandsCapitalizedMotions, ...cmdNumberMotion }

      function commandsAndMotions() {
        return commandsAndNumbersWithMotions()

        function commandsAndNumbers() {
          const uncapitalized = unCapitalizedCommandsWithNumbers()
          const capitalized = capitalizedCommandsWithNumbers()
          return { ...uncapitalized, ...capitalized }
        }
        function capitalizedCommandsWithNumbers() {
          let cButtons = dictmanipulator.capitalizeAndGiveDenominator(denom.ShiftDenom, symbols.commands.cButton)
          cButtons = dictmanipulator.mergeTwoDicts(symbols.numpadRight, cButtons)
          cButtons = dictmanipulator.exitDictionary(cButtons)

          let mainCommands = dictmanipulator.capitalizeAndGiveDenominator(denom.ShiftDenom, symbols.commands.mainCommands)
          mainCommands = dictmanipulator.mergeTwoDicts(symbols.numpadRight, mainCommands)
          const obj = { ...cButtons, ...mainCommands }
          return obj
        }
        function unCapitalizedCommandsWithNumbers() {
          // let CopyNumPad = dictmanipulator.giveDenominator(denominators.commandDenom, symbols.commands.mainCommandsCopy)
          let CopyNumPad = symbols.commands.mainCommandsCopy
          CopyNumPad = dictmanipulator.mergeTwoDicts(symbols.numpadRight, CopyNumPad)

          let oneCopyNumPad = symbols.commands.mainCommandsNoCopy
          oneCopyNumPad = dictmanipulator.mergeTwoDicts(symbols.numpadRight, oneCopyNumPad)

          // let exitNumPad = dictmanipulator.giveDenominator(denominators.commandDenom, symbols.commands.mainCommandsExit)

          let exitNumPad = symbols.commands.mainCommandsExit
          exitNumPad = dictmanipulator.mergeTwoDicts(symbols.numpadRight, exitNumPad)
          exitNumPad = dictmanipulator.exitDictionary(exitNumPad)
          const obj = { ...oneCopyNumPad, ...CopyNumPad, ...exitNumPad }
          return obj
        }
        function commandsAndNumbersWithMotions() {
          const cmdNumber = unCapitalizedCommandsWithNumbers()
          let motionsNumber = dictmanipulator.mergeTwoDicts(symbols.numpadRight, symbols.motionsWithNumber)
          const symbolsNumber = dictmanipulator.mergeTwoDicts(symbols.numpadRight, symbols.motionsNumberNoCAP)
          motionsNumber = { ...motionsNumber, ...symbolsNumber }
          let CommandNumberMotion = dictmanipulator.mergeTwoDicts(symbols.commands.mainCommands, motionsNumber)
          let temp = dictmanipulator.mergeTwoDicts(symbols.commands.cButton, motionsNumber)
          temp = dictmanipulator.exitDictionary(temp)

          let tempS = dictmanipulator.mergeTwoDicts(symbols.numpadRight, symbols.commands.sButton)
          tempS = dictmanipulator.exitDictionary(tempS)

          CommandNumberMotion = { ...CommandNumberMotion, ...temp, ...tempS }
          let commandMotionNoNumber = dictmanipulator.mergeTwoDicts(symbols.commands.mainCommands, getNormalMotions())

          const commanDMotionCapNumber = dictmanipulator.mergeTwoDicts(symbols.commands.mainCommands, getCapitalizeMotions())

          let tempry = dictmanipulator.mergeTwoDicts(symbols.commands.mainCommands, symbols.numpadRight)
          tempry = dictmanipulator.mergeTwoDicts(tempry, getCapitalizeMotions())

          commandMotionNoNumber = { ...commandMotionNoNumber, ...commanDMotionCapNumber, ...tempry }
          CommandNumberMotion = { ...CommandNumberMotion, ...commandMotionNoNumber, ...commandsAndNumbers() }
          return CommandNumberMotion
        }
      }
    }
  }
  function getMainCommands() {
    // let obj = dictmanipulator.giveDenominator(denominators.commandDenom, symbols.commands.mainCommands)
    let obj =  symbols.commands.mainCommands
    return obj
  }
  function getRCommand() {
    const R = dictmanipulator.exitDictionary(symbols.RCommand)
    return R
  }
  function getSCommand() {
    // let s = dictmanipulator.giveDenominator(denominators.commandDenom, symbols.commands.sButton)
    let s = symbols.commands.sButton
    s = dictmanipulator.exitDictionary(s)
    return s
  }
}
function commandWithSearch() {
  const mainCommands = { ...symbols.commands.dButton, ...symbols.commands.vButton, ...symbols.commands.yButton }

  // const basicCommands = dictmanipulator.giveDenominator(denominators.commandDenom, mainCommands)
  const basicCommands = mainCommands
  // const CCommand = dictmanipulator.giveDenominator(denominators.commandDenom, symbols.commands.cButton)
  const CCommand = symbols.commands.cButton

  const commandsAndSearch = dictmanipulator.mergeTwoDicts(basicCommands, symbols.searchCommandsLeft)
  const commandsAndSearchC = dictmanipulator.mergeTwoDicts(CCommand, symbols.searchCommandsLeft)

  const commandsAndGo = dictmanipulator.toggleFingerSpell(commandsAndSearch)
  const commandsAndGoC = dictmanipulator.exitDictionary(commandsAndSearchC)

  const spellingCap = dictmanipulator.capitalizeAndGiveDenominator(denom.commandAndSomethingCapDenom, symbols.spellingsRightSide)
  const spellings = { ...spellingCap, ...symbols.spellingsRightSide }
  const commandsAndLetter = dictmanipulator.mergeTwoDicts(commandsAndSearch, spellings)

  let commandsAndLetterC = dictmanipulator.mergeTwoDicts(commandsAndSearchC, spellings)
  commandsAndLetterC = dictmanipulator.exitDictionary(commandsAndLetterC)

  const emilySym = dictmanipulator.giveDenominator(denom.commandsEmilyDenom, symbols.emilyRightSide)

  const commandsAndSymbols = dictmanipulator.mergeTwoDicts(commandsAndSearch, emilySym)
  const commandsAndSymbolsC = dictmanipulator.mergeTwoDicts(commandsAndSearchC, emilySym)

  // TODO: with numpad and numDenom
  return {
    ...commandsAndGoC,
    ...commandsAndGo,
    ...commandsAndLetter,
    ...commandsAndLetterC,
    ...commandsAndSymbols,
    ...commandsAndSymbolsC
  }
}
function doSomethingWithSomeDicts(array, object, fn, toMod = null) {
  const obj = { ...object }
  let newObj = {}
  for (const key of array) {
    const modified = fn(toMod, obj[key])
    newObj[key] = modified
  }
  newObj = dictMerger(newObj)
  return newObj
}

function createDictionary(dictionary, name) {
  const dict = JSON.stringify(dictionary, null, '\t')
  fs.writeFile(`./${name}.json`, dict, (err, result) => {
    if (err) console.log('error', err)
  })
}
createDictionary(dict, 'vimDict')

