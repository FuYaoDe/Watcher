
module.exports = (sequelize, DataTypes) ->
  MovieUrl = sequelize.define('MovieUrl', {
    url: DataTypes.STRING
    isCrawl:
      type: DataTypes.BOOLEAN
      defaultValue: false
  })
  return MovieUrl
