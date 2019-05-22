import React from 'react'
import {
  Man,
  Head,
  Ear,
  Hair,
  Eye,
  Nose,
  Mouth,
  Neck,
  Arm,
  Hand,
  Corpus,
  Leg,
  Chest,
  Foot,
} from './styled'

const VisibilitySetter = ({ visible, component: Component, ...rest }) =>
  visible ? <Component {...rest} /> : null

export default ({ failedLetterCount }) => (
  <Man>
    <VisibilitySetter visible={failedLetterCount >= 1} component={Head}>
      <Hair />
      <Eye />
      <Eye right />
      <Ear />
      <Ear right />
      <Nose />
      <Mouth sad={failedLetterCount >= 11} />
    </VisibilitySetter>
    <VisibilitySetter visible={failedLetterCount >= 2} component={Neck} />
    <VisibilitySetter visible={failedLetterCount >= 3} component={Corpus}>
      <VisibilitySetter visible={failedLetterCount >= 3} component={Chest}>
        <VisibilitySetter visible={failedLetterCount >= 4} component={Arm}>
          <VisibilitySetter visible={failedLetterCount >= 6} component={Hand} />
        </VisibilitySetter>
        <VisibilitySetter visible={failedLetterCount >= 8} component={Leg}>
          <VisibilitySetter
            visible={failedLetterCount >= 10}
            component={Foot}
          />
        </VisibilitySetter>
      </VisibilitySetter>
      <VisibilitySetter
        visible={failedLetterCount >= 3}
        component={Chest}
        right
      >
        <VisibilitySetter
          visible={failedLetterCount >= 5}
          component={Arm}
          right
        >
          <VisibilitySetter visible={failedLetterCount >= 7} component={Hand} />
        </VisibilitySetter>
        <VisibilitySetter
          visible={failedLetterCount >= 9}
          component={Leg}
          right
        >
          <VisibilitySetter
            visible={failedLetterCount >= 11}
            component={Foot}
            right
          />
        </VisibilitySetter>
      </VisibilitySetter>
    </VisibilitySetter>
  </Man>
)
