export interface ImageInfoInterface {
  total: number;
  total_pages: number;
  results: [ImageInterface];
}

export interface UnsplashInterface {
  images: ImageInterface[];
  response: string;
  isLoading: boolean;
  error: string;
  fetchData: (url: string) => Promise<void>;
}

export interface UrlsType {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UserType {
  following_count: number;
  followers_count: number;
  accepted_tos: boolean;
  bio: string;
  id: string;
  username: string;
  name: string;
  first_name: string;
  for_hire: boolean;
  last_name: string;
  instagram_username: string;
  twitter_username: string;
  portfolio_url: string;
  profile_image: ProfileImgType;
  links?: LinksUserType;
  location: string;
  social?: {};
  total_collections: number;
  total_likes: number;
  total_photos: number;
  updated_at: string;
}

export interface ProfileImgType {
  small: string;
  medium: string;
  large: string;
}

export interface LinksUserType {
  self: string;
  html: string;
  photos: string;
  likes: string;
}

export interface LinksImageType {
  self: string;
  html: string;
  download: string;
}

export interface ImageInterface {
  alt_description: string;
  id: number;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user?: UserType;
  current_user_collections: [];
  urls: UrlsType;
  links?: LinksImageType;
  promoted_at: string;
  sponsorship: boolean;
  tags: [];
  topic_submissions?: {};
  views: number;
}

export interface CollectionInterface {
  id: string;
  title: string;
  total_photos: number;
}

export interface UpdateUserInterface {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  url: string;
  bio: string;
}
