export const byTextAscending =
  (getTextProperty) =>
    (objectA, objectB) => {
      const upperA = getTextProperty(objectA).toUpperCase()
      const upperB = getTextProperty(objectB).toUpperCase()
      if (upperA < upperB) {
        return -1
      }
      if (upperA > upperB) {
        return 1
      }
      return 0
    }

export const byTextDescending =
  (getTextProperty) =>
    (objectA, objectB) => {
      const upperA = getTextProperty(objectA).toUpperCase()
      const upperB = getTextProperty(objectB).toUpperCase()
      if (upperA > upperB) {
        return -1
      }
      if (upperA < upperB) {
        return 1
      }
      return 0
    }
