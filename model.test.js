const Searches = require('./searches')
const myHistory = new Searches('./data/')

const Model = require('./model')
const SearchModel = new Model()

describe('creating graph', () => {
  it('throws error when no data given in param', () => {
    expect(() => {
      Model.createBarChart()
    }).toThrow(Error)
  })
})