import styled from 'styled-components'

export const AppWrapper = styled.main`
  position: relative;
  overflow: hidden;
  height: 500px;
  width: 900px;
  background-color: var(--color-appbg);
  border-radius: 5px;
`

export const GameInstruction = styled.p`
  position: absolute;
  top: 16px;
  left: 16px;
  margin: 0;
`

export const Gallow = styled.div`
  position: relative;
  width: 150px;
  height: 15px;
  background-color: var(--color-darkgrey);
  top: 50px;
  border-radius: 0 5px 5px 0;
`

export const DownPipe = styled.div`
  position: absolute;
  left: 120px;
  width: 15px;
  height: 40px;
  background-color: var(--color-darkgrey);
  border-radius: 5px;
`

export const RightBlueTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  right: 0;
  bottom: 0;
  border-style: solid;
  border-width: 0 0 250px 250px;
  border-color: transparent transparent var(--color-blue) transparent;
`
export const Input = styled.input`
  position: absolute;
  opacity: 0;
`
