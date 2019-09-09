import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  z-index: 10;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 400ms ease-in-out;

  ${({ disabled }) =>
    disabled &&
    css`
      visibility: 0;
      opacity: 0;
      z-index: -1;
    `}
`
export const Content = styled.div`
  top: calc(50% - 75px);
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  margin: 0 auto;
  width: 300px;
  height: 150px;
  text-align: center;
`
export const Title = styled.h1`
  text-transform: uppercase;
  color: var(--color-white);
  font-size: var(--color-large);
`
export const Button = styled.button`
  text-transform: uppercase;
  border: dashed 2px var(--color-yellow);
  border-radius: 25px;
  background-color: transparent;
  color: var(--color-yellow);
  padding: 15px 40px;
  font-size: var(--color-default);
  font-weight: var(--color-bold);
  outline: none;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  ${({ pause }) =>
    pause &&
    css`
      position: absolute;
      right: 16px;
      top: 16px;
    `}
`
