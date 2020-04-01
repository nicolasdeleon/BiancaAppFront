
import { useState, useEffect } from 'react'
import { Animated } from 'react-native'

const useAnimation = ({ doAnimation, duration, easing, callback, delay }) => {
    const [animation, setAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.timing(animation, {
        toValue: doAnimation ? 1 : 0,
        duration,
        easing,
        delay,
        useNativeDrive: true
      }).start(() => {if(doAnimation)callback()}) ;
    }, [doAnimation]);

    return animation;
  }

export default useAnimation