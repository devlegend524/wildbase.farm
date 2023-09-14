import styled from 'styled-components'
import { space, typography, layout } from 'styled-system'
import getThemeValue from '../../util/getThemeValue'

const getColor = ({ color, theme }) => {
  return getThemeValue(`colors.${color}`, color)(theme)
}

const Text = styled.div`
  color: ${getColor};
  font-size: '16px';
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
}

export default Text
