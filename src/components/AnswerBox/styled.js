import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  z-index: 3;
  position: absolute;
  bottom: 40px;
  width: calc(100% - 50px);
  height: 70px;
  margin: 0 auto;
  text-align: center;
  left: 0;
  right: 0;
`

export const Item = styled.div`
  float: left;
  background-color: var(--color-darkgrey);
  width: 65px;
  height: 70px;
  margin: 0 3px;
  border-radius: 5px;
  text-align: center;
  line-height: 70px;
  text-transform: uppercase;
  font-size: var(--font-size-large);
  color: var(--color-white);

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: var(--color-lightgrey);
    `};

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`
