import {
  CollectionInterface,
  ImageInterface,
  ProfileImgType,
  UrlsType,
  UserType
} from '../interface/Interfaces';

export const urlsInitState: UrlsType = {
  small: '',
  raw: '',
  full: '',
  regular: '',
  thumb: ''
};

export const imgInitState: ImageInterface = {
  alt_description: '',
  id: 0,
  created_at: '',
  updated_at: '',
  width: 0,
  height: 0,
  color: '',
  blur_hash: '',
  likes: 0,
  liked_by_user: false,
  description: '',
  user: undefined,
  current_user_collections: [],
  links: undefined,
  promoted_at: '',
  sponsorship: false,
  tags: [],
  urls: urlsInitState,
  views: 0
};

export const initProfileImg: ProfileImgType = {
  small: '',
  medium: '',
  large: ''
};

export const initUserData: UserType = {
  accepted_tos: false,
  bio: '',
  id: '',
  username: '',
  name: '',
  first_name: '',
  for_hire: false,
  last_name: '',
  instagram_username: '',
  twitter_username: '',
  portfolio_url: '',
  location: '',
  total_collections: 0,
  total_likes: 0,
  total_photos: 0,
  updated_at: '',
  followers_count: 0,
  following_count: 0,
  profile_image: initProfileImg
};

export const initCollectionData: CollectionInterface = {
  id: '',
  title: '',
  total_photos: 0
};
