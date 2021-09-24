import styled, { css } from 'styled-components'

interface StackProps {
  alignment?: 'start' | 'middle' | 'end'
  direction?: 'column' | 'row'
  space?: string
}

const columnStackStyles = ({
  space,
}: StackProps): ReturnType<typeof css> => css`
  width: 100%;
  > * {
    margin-bottom: 0;
    margin-top: 0;
  }
  > * + * {
    margin-top: ${space};
  }
  > .bbui-stack-expand {
    margin-bottom: auto;
  }
`

const rowStackStyles = ({ space }: StackProps): ReturnType<typeof css> => css`
  height: 100%;
  > * {
    margin-left: 0;
    margin-right: 0;
  }
  > * + * {
    margin-left: ${space};
  }
  > .bbui-stack-expand {
    margin-right: auto;
  }
`

const alignmentMap = {
  start: 'flex-start',
  middle: 'center',
  end: 'flex-end',
}

export const stackStyles = ({
  alignment = 'start',
  direction = 'column',
  space = '1rem',
}: StackProps = {}): ReturnType<typeof css> => css`
  align-items: ${alignmentMap[alignment]};
  display: flex;
  flex-direction: ${direction};
  ${{ column: columnStackStyles, row: rowStackStyles }[direction]?.({
    alignment,
    direction,
    space,
  })}
`

const Stack = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['alignment', 'direction', 'space'].includes(prop),
})<StackProps>`
  ${(props) => stackStyles(props)}
`

export default Stack
