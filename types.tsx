export type RootStackParamList = {
  Root: undefined;
  NewTweet: undefined;
  EditProfile: undefined;
  UserProfile:undefined;
  NotFound: undefined;
  MyProfile: undefined;
  ViewListOfFollowers:undefined
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Messages: undefined;
};

export type HomeNavigatorParamList = {
  HomeScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
export type MyProfileParamList = {
  MyProfileScreen: undefined;
};
export type SearchParamList = {
  SearchScreen: undefined;
};



export type UserType ={
  id:string,
  name:string,
  username:string,
  image?:string,
}
export type TweetType = {
  id: string,

  user: UserType,
  createdAt:string,
  content:string,
  image?:string,
  numberOfComments?:number,
  numberOfRetweets?:number,
  numberOfLikes?:number,

  //likes?: [String]
}
