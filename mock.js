module.exports = () => {
  const faker = require('faker/locale/zh_CN')
  const _ = require('lodash')

  return {
    people: _.times(10, (n) => {
      return {
        id: n,
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        avatar: faker.internet.avatar()
      }
    }),
    charts: _.times(10, (n) => {
      return {
        id: n,
        time: faker.date.month(),
        value: faker.finance.amount()
      }
    })
  }
}
