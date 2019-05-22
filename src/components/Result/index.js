import React from 'react'
import { Wrapper, Content, Title, Button } from './styled'

export default ({ buttonAction, disabled, title, buttonLabel }) => (
  <Wrapper disabled={disabled}>
    <Content>
      <Title> {title}</Title>
      <Button onClick={buttonAction}>{buttonLabel}</Button>
    </Content>
  </Wrapper>
)
