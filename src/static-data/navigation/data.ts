export interface DrawerListType {
  name: string;
  iconName: string;
  iconColor?: string;
  iconSize?: number;
  screenName?:string;
}

export const drawerList: DrawerListType[] = [
  {
    name: 'Opcion 1',
    iconName:'user',
    iconColor:'#606060',
    iconSize:16,
    screenName:''
  }
];



