const fs = require('fs')
const { log } = console

class Searches {
  constructor(path) {
    this.path = path
    this.jsonFileNames = []
    this.data = []
    this.sortedData = {}
  }

  _notInArray(value, array) {
    return array.indexOf(value) > -1 ? false : true 
  }

  _sortObject(obj) {
    const sorted = []
    for (let item in obj) {
      sorted.push([item, obj[item]])
    }
    
    return sorted.sort((a, b) => b[1] - a[1])
  }

  _handleError(err) {
    throw new Error(err)
  }

  getJsonFileNames() {
    const files = fs.readdirSync(this.path)

    if (files.length < 1) {
      this._handleError(`${this.path} was not found or no JSON files was found in directory: ${this.path}`)
    }
    files.forEach(file => {
      return this.jsonFileNames.push(file)
    })
  }

  getFileContents() {
    this.getJsonFileNames()
    this.jsonFileNames.forEach(filename => {
      const file = fs.readFileSync(this.path + filename, 'utf8')
      const parsedJSON = JSON.parse(file).event
  
      return this.data = [...this.data, ...parsedJSON]
    })
  }

  separateWords(parsedJSON) {
    parsedJSON.forEach((json) => {
      const queryText = json.query.query_text
      const seperatedWord = queryText.split(' ')

      seperatedWord.forEach((w) => {
        if (this._notInArray(w, ['to', 'in', 'is', 'of', 'what', 'the', 'a', 'for', 'and', 'on', 'does', 'with', ''])) {
          let word = w.toLowerCase()
          if (this.sortedData[word]) {
            this.sortedData[word]++
          } else {
            this.sortedData[word] = 1
          }
        }
      })
    })
  }

  get(n) {
    if (typeof n === "number" || n == undefined) {
      this.getFileContents()
      this.separateWords(this.data)
      this.sortedData = this._sortObject(this.sortedData)
      
      const cutArray = (arr, start, end) => arr.splice(start, end)
      const result = n ? cutArray(this.sortedData, 0, n) : this.sortedData
  
      return result
    } else {
      this._handleError(`.get() was given ${typeof n} but needs a number or undefined`)
    }
  }
} 

module.exports = Searches
