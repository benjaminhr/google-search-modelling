const Searches = require('./searches')
const mySearcHistory = new Searches('./data/')
const { log } = console

const firstThree = mySearcHistory.get(3) 
const all = mySearcHistory.get()

log(
  all, 
  firstThree
)
