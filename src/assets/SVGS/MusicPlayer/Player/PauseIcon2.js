import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PauseIcon2(props) {
  return (
   <Svg
      width={25}
      height={25}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-3.5H9v-9H7.5v9z"
        fill="#64748B"
      />

      <Path d="M10.5 5.5H12v9h-1.5v-9z" fill="#64748B" />
    </Svg>
  )
}

export default PauseIcon2
