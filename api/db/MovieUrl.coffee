
module.exports = (sequelize, DataTypes) ->
  MovieUrl = sequelize.define('MovieUrl', {
    url: DataTypes.STRING
    isCrawl:
      type: DataTypes.BOOLEAN
      defaultValue: false
    tryTime:
      type: DataTypes.INTEGER
      defaultValue: 0
  })
  return MovieUrl
