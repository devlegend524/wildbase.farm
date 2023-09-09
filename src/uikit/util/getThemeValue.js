import get from 'lodash/get'

const getThemeValue =
  (path, fallback) =>
    (theme) =>
      get(theme, path, fallback)

export default getThemeValue
