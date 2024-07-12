import * as React from 'react';
import { ActivityIndicator, MD2Colors, } from 'react-native-paper';

const Loading = () => (
   <ActivityIndicator  style={{flex: 1}} animating={true} color={MD2Colors.red900}/>
);

export default Loading;

