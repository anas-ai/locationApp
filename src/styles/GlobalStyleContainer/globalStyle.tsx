import {StyleSheet} from 'react-native';
import { colors } from '../colors';

export const globalStyles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  globalStylesMainStack:{
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor:colors.mainStackColor,
    paddingVertical: 18,
  },
  flex: {
    flex: 1,
  },
  itemCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemEvenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  Hmargin: {
    marginHorizontal: 20,
  },
  Vmargin: {
    marginVertical: 18,
  },
  VHmargin: {
    marginHorizontal: 20,
    marginVertical: 12,
  },
  Hpadding: {
  },
  Vpadding: {
    paddingVertical: 12,
  },
  VHpadding: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  errorMessage: {
    fontSize: 14,
    fontFamily: "Gilroy-Regular",
    color: colors.red,
  },
});
