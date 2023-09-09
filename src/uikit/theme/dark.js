import { dark as darkModal } from '../widgets/Modal/theme'
import { dark as darkTooltip } from '../components/Tooltip/theme'
import { dark as darkRadio } from '../components/Radio/theme'

import base from './base'
import { darkColors } from './colors'

const darkTheme = {
  ...base,
  isDark: true,
  radio: darkRadio,
  colors: darkColors,
  modal: darkModal,
  tooltip: darkTooltip,
}

export default darkTheme
