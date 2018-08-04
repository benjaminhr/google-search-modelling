const { log } = console

const Searches = require('./searches')
const mySearchHistory = new Searches('./data/')
const firstThree = mySearchHistory.get(3)

const Model = require('./model')
const SearchModel = new Model()

log(
  SearchModel.createBarChart(firstThree)
)

