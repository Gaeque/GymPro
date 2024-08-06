import { ActivityIndicator } from 'react-native-paper';
import theme from '../theme';


const Loading = () => (
   <ActivityIndicator  style={{flex: 1}} animating={true} color={theme.colors.green700}/>
);

export default Loading;

