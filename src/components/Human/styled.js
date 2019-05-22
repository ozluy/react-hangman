import styled, { css } from 'styled-components'

export const Man = styled.div`
  position: relative;
  margin: 70px 0 0 77.5px;
  width: 100px;
`
export const Head = styled.div`
  position: absolute;
  z-index: 2;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  width: 96px;
  height: 106px;
  background-image: url('https://raw.githubusercontent.com/ozluy/ozluy.github.io/master/source/head.png');
  background-size: 96px 106px;
  background-repeat: no-repeat;
  background-position: center center;
`
export const Neck = styled.div`
  position: absolute;
  margin: 0 auto;
  top: 100px;
  left: 0;
  right: 0;
  width: 20px;
  height: 40px;
  background-color: var(--color-humanbody);
`
export const Corpus = styled.div`
  position: absolute;
  margin: 0 auto;
  top: 112.5px;
  left: 0;
  right: 0;
  width: 60px;
  height: 95px;
  border-radius: 5px;
  background-color: var(--color-bodybg);
`
export const Chest = styled.div`
  display: inline-block;
  width: 30px;
  height: 70px;
  background-color: var(--color-shirtLeft);
  border-radius: 5px 0 0 0;
  ${({ right }) =>
    right &&
    css`
      background-color: var(--color-shirtRight);
      border-radius: 0 5px 0 0;
    `}
`
export const Arm = styled.div`
  position: relative;
  transform: rotate(45deg);
  margin-left: -27px;
  margin-top: -5px;
  width: 22px;
  height: 80px;
  background-color: var(--color-shirtLeft);
  border-radius: 5px;
  ${({ right }) =>
    right &&
    css`
      transform: rotate(-45deg);
      margin-left: 35px;
      background-color: var(--color-shirtRight);
    `}
`
export const Hand = styled.div`
  position: absolute;
  bottom: -14px;
  border-radius: 0 0 50% 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 15px;
  height: 15px;
  background-color: var(--color-humanbody);
`
export const Leg = styled.div`
  background-color: var(--color-bodybg);

  height: 70px;
  width: 25px;
  margin-top: 10px;
  margin-left: -10px;
  transform: rotate(15deg);
  ${({ right }) =>
    right &&
    css`
      transform: rotate(-15deg);
      margin-left: 15px;
    `}
`
export const Foot = styled.div`
  position: absolute;
  bottom: -14px;
  border-radius: 0 0 50% 50%;
  left: -15px;
  right: 0;
  margin: 0 auto;
  width: 40px;
  height: 15px;
  background-color: var(--color-humanbody);
  ${({ right }) =>
    right &&
    css`
      left: 0;
    `}
`
