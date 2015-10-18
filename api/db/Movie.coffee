
module.exports = (sequelize, DataTypes) ->
  Movie = sequelize.define('Movie', {
    name: DataTypes.STRING
    description: DataTypes.STRING
    time: DataTypes.DATEONLY
    detail: DataTypes.TEXT
    poster: DataTypes.STRING
    video: DataTypes.STRING
    url: DataTypes.STRING
    imdbUrl: DataTypes.STRING
    photos:
      type: DataTypes.TEXT
      get: () ->
        value = this.getDataValue('photo');

        if value
          return JSON.parse(value)
        return []

      set: (value) ->
        return this.setDataValue('photos', JSON.stringify(value))
  })
  return Movie
