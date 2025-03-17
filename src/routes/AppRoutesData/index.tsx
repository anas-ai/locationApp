import {ScreenName} from '../../constants/ScreenName';
import AddressFormScreen from '../../screens/AddressFormContainer/AddressFormScreen';
import AddressManagement from '../../screens/AddressManagementContainer/AddressManagement';
import HomeScreen from '../../screens/HomeContainer/HomeScreen';
import MapScreen from '../../screens/MapContainer/MapScreen';

export const StackData = [
  {name: ScreenName.HOME_SCREEN, component: HomeScreen},
  {name: ScreenName.MAP_SCREEN, component: MapScreen},
  {name: ScreenName.ADDRESS_MANAGEMENT_SCREEN, component: AddressManagement},
  {name: ScreenName.ADDRESS_FORM_SCREEN, component: AddressFormScreen},
];
