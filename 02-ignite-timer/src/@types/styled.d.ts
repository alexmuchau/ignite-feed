// um arquivo d.ts é unicamente exclusivo para definição de tipos, só pode ser usada sintaxe exclusiva do TypeScript

import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
