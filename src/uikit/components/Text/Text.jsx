import styled from 'styled-components'
import { space, typography, layout } from 'styled-system'
import getThemeValue from '../../util/getThemeValue'

const getColor = ({ color, theme }) => {
  return getThemeValue(`colors.${color}`, color)(theme)
}

const getFontSize = ({ fontSize, small }) => {
  return small ? '14px' : fontSize || '16px'
}

const Text = styled.div`
  color: ${getColor};
  font-size: ${getFontSize};
  font-weight: 600;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${space}
  ${typography}
  ${layout}
`

Text.defaultProps = {
  color: 'text',
  small: false,
}

export default Text
