import type { ParamListBase } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ComponentType } from 'react'
import type { GoBackGesture } from 'react-native-reanimated'

export type TypeRootStackParameterListType = {
  Book: { id: string };
  Featured: undefined;
  BookImpression: { id: string };
  Genre: { id: string; name: string };
  Library: undefined;
  Author: { id: string };
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Reactions: { id: string };
  Welcome: undefined;
  Reader: { id: string, startFromScratch?: boolean };
  UpdateRecommendation: undefined;
  Search: undefined;
  Settings: undefined;
  Logout: undefined;
};

export type RouteProperties = {
  navigation?: NativeStackNavigationProp<TypeRootStackParameterListType>;
};

export interface IRouteType {
  component: ComponentType<RouteProperties>;
  name: keyof TypeRootStackParameterListType;
  options?: {
    header?: ({
      navigation,
    }: {
      navigation: NativeStackNavigationProp<ParamListBase>;
    }) => JSX.Element;
    goBackGesture?: GoBackGesture | undefined;
    statusBarHidden?: boolean;
  };
}
