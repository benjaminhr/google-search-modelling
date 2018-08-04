const Searches = require('./searches')
const myHistory = new Searches('./data/')

describe('get search history', () => {
  it('returns correct json', () => {
    const data = myHistory.get()
    expect(data).toHaveLength(29226)
  })

  it('throws error when given wrong type param', () => {
    expect(() => {
      myHistory.get('lol')
    }).toThrow(Error)
  })

  it('throws error when no json files in directoy', () => {
    const badDirectory = new Searches('./data1/')
    expect(() => {
      badDirectory.getJsonFileNames()
    }).toThrow(Error)
  })
})

