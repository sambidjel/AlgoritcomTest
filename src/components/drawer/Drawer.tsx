import React from 'react';
import { 
  Pressable, 
  StyleSheet, 
  View, 
  Platform, 
  Image, 
  Text } from 'react-native';
import Animated, { 
  SharedValue,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Extrapolation, } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {drawerList} from '../../static-data/navigation/data';
import DrawerItem from './DrawerItem';
type Props = {
    active:SharedValue<boolean>;
    translateX:SharedValue<number>;
    drawerWidth:SharedValue<number>;
}
function Drawer({active, translateX, drawerWidth}:Props) {
    const insets = useSafeAreaInsets();
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: translateX.value}],
      };
    });

    useAnimatedReaction(
      () => active.value,
      currentState => {
        if (currentState) {
          translateX.value = withTiming(0);
        } else {
          translateX.value = withTiming(-drawerWidth.value);
        }
      },
    );
    
    useAnimatedReaction(
      () => drawerWidth.value,
      () => {
        if (active.value) {
          active.value = false;
        }
      },
    );
    
    const backDropStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        translateX.value,
        [-drawerWidth.value, 0],
        [0, 0.7],
        Extrapolation.CLAMP,
      );
      return {
        opacity: opacity,
        zIndex: translateX.value === -drawerWidth.value ? 0 : 1,
      };
    });
    
    const pan = Gesture.Pan()
      .onChange(event => {
        if (event.translationX < 0) {
          translateX.value = withSpring(event.translationX, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          translateX.value = withSpring(0, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(event => {
        if (event.velocityX < -1000) {
          translateX.value = withTiming(-drawerWidth.value, undefined, () => {
            active.value = false;
          });
        }
        if (event.translationX < -drawerWidth.value / 2) {
          translateX.value = withTiming(-drawerWidth.value, undefined, () => {
            active.value = false;
          });
        } else {
          translateX.value = withTiming(0);
        }
      });
    return (
        <>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              animatedStyle,
              {paddingTop: Platform.OS === 'ios' ? insets.top : 20},
            ]}
            onLayout={e => {
              drawerWidth.value = e.nativeEvent.layout.width;
              translateX.value = -e.nativeEvent.layout.width;
            }}>
            <View style={styles.containerProfile}>
              <Image source={require('../../assets/images/common/algoritcom.png')} />
            </View>
            <View style={styles.containerItem}>
              {drawerList.map((item, index) => {
                return <DrawerItem item={item} key={index} />;
              })}
            </View>
          </Animated.View>
        </GestureDetector>
        <AnimatedPressable
          style={[styles.backDrop, backDropStyle]}
          onPress={() => {
            active.value = false;
          }}
        />
      </>
    );
}
const styles = StyleSheet.create({
    container: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  containerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 30,
    paddingVertical: 40,
    opacity: 0.5,
  },
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  containerItem: {
    marginHorizontal: 30,
    marginTop: 10,
  },
});
export default Drawer;