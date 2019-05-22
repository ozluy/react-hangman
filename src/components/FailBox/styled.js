import styled from 'styled-components'

export const Wrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 500px;
`
export const Title = styled.h1`
  text-transform: uppercase;
  color: var(--color-darkgrey);
`
export const List = styled.div`
  width: 100%;
  height: 70px;
`
export const ListItem = styled.div`
  text-align: center;
  color: var(--color-blue);
  float: left;
  font-size: var(--font-size-large);
  height: 70px;
  margin: 10px;
  text-transform: uppercase;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`
