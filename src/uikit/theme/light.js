import { light as lightTooltip } from '../components/Tooltip/theme'
import { light as lightModal } from '../widgets/Modal/theme'
import { light as lightRadio } from '../components/Radio/theme'

import base from './base'
import { lightColors } from './colors'

const lightTheme = {
  ...base,
  isDark: false,
  colors: lightColors,
  radio: lightRadio,
  modal: lightModal,
  tooltip: lightTooltip,
}

export default lightTheme
