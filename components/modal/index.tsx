import { type FC, useRef, useEffect } from 'react';
import { Modal, View, Pressable, Animated, StyleSheet } from 'react-native';

interface ModalCompProps {
 open: boolean;
 close: () => void;
 children: JSX.Element;
}


const ModalComp: FC<ModalCompProps> = ({ open, close, children }) => {
  
  const anim = useRef(new Animated.Value(0)).current

  const grow = () => {
    Animated.spring(anim, {
      toValue: 500,
      speed: 5,
      bounciness: 0,
      useNativeDriver: false,
    }).start()
  }

  const shrink = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(({ finished }) => { finished && close() })
  }

  useEffect(() => {
    if (open) grow()
  }, [open])

 return (
  <Modal
   transparent
   animated
   animationType="fade"
   visible={open}
   onRequestClose={() => {
    shrink()
   }}
  >
   <Pressable
    onPress={() => {
     shrink();
    }}
    style={style.overlay}
   >
    <Animated.View 
      style={{ height: anim }}
    >
      {children}
    </Animated.View>
   </Pressable>
  </Modal>
 );
};

const style = StyleSheet.create({
 overlay: {
  backgroundColor: 'rgba(0, 0, 0, 0.2)',

  flex: 1,
  justifyContent: 'flex-end',
 },

 container: {
  borderTopRightRadius: 12,
  borderTopLeftRadius: 12,
  paddingTop: 12,
 },
});

export default ModalComp;
