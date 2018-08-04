const blessed = require('blessed')
const contrib = require('blessed-contrib')

class Model {
  constructor() {
    this.screen = blessed.screen()
    this.data = []
    this.bar = undefined
  }

  _createTitles(data) {
    return data.map(item => item[0])
  }

  _createData(data) {
    return data.map(item => item[1])
  }

  _render() {
    this.screen.append(this.bar)

    this.bar.setData({
      titles: this._createTitles(this.data),
      data: this._createData(this.data)
    })

    this.screen.key(['escape', 'q', 'C-c'], (ch, key) => { 
      return process.exit(0)
    })
      
    this.screen.render()
  }

  createBarChart(data) {
    if (data) {
      this.data = data
    } else {
      throw new Error('No data given')
    }  

    this.bar = contrib.bar({ 
      label: 'Top Search History', 
      barWidth: 10, 
      barSpacing: 10, 
      xOffset: 0, 
      maxHeight: 9
    })

    this._render()
  }
}

module.exports = Model
