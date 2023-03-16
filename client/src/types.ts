// 📂 PROPS INTERFACE

// Community
export interface CommunityPostProps {
  key: number;
  post: PostData;
}

export interface SearchBarProps {
  search: (searchType: string, searchContent: string) => void;
}

export interface SortModalProps {
  setSorting: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// CommunityDetail
export interface CommunityCommentProps {
  getData(): void;
  postId?: string;
  postDetail: PostDetail;
  userData: UserData;
}

export interface CommentProps {
  comment: Comment;
  getData(): void;
  editingCommentId: number;
  setEditingCommentId: React.Dispatch<React.SetStateAction<number>>;
}

// Modal
export interface ModalProps {
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  id: number;
}

export interface ModalReviewProps {
  review: Review;
  editActivate: number;
  setEditActivate: React.Dispatch<React.SetStateAction<number>>;
  reviewActivateHandler(commentId: number): void;
  getData(): void;
}

export interface ModalReviewWriteProps {
  getData(): void;
  id: number;
}

// MyPage
export interface ProfileProps {
  petInfo?: PetInfo;
}

export interface MyPagePostProps {
  key: number;
  post: MyPagePost;
}

// Nav
export interface NavProps {
  type: string;
}

// HomeMap
export interface MapFilterProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

// Address Modal
export interface AddressModalProps {
  address: number | null;
  setAddress: React.Dispatch<React.SetStateAction<number | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// 📂 INTERFACE

// Community
export interface PostList {
  friends: Friend[] | null;
  posts: PostData[] | null;
  pageInfo: PageInfo;
}

export interface PostData {
  id: number;
  petName: string;
  petId: number;
  title: string;
  content: string;
  createdAt: string;
  likesCnt: number;
  commentCnt: number;
}

interface Friend {
  petId: number;
  profileImageUrl: string;
  petName: string;
  petAge: number;
  gender: 'Male' | 'Female';
  addressName: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// CommunityDetail
export interface PostDetail {
  post: Post;
  comments: Comment[] | null;
}

interface Post {
  authorId: number;
  content: string;
  createdAt: string;
  imageUrl: string | null;
  likeActive: boolean;
  likesCnt: number;
  petName: string;
  petStatus: string;
  postId: number;
  title: string;
}

export interface Comment {
  commentId: number;
  petId: number;
  petName: string;
  content: string;
  profileImageUrl: string | undefined;
  createdAt: string;
}

export interface UserData {
  myPosts: UserData[] | null;
  pageInfo: PageInfo;
  petInfo: PetInfo;
}

interface PetInfo {
  age: number;
  code: number;
  gender: 'MALE' | 'FEMALE';
  petId: number;
  petName: string;
  profileImage: string;
  species: 'CAT' | 'DOG';
}

// PostWrite
export interface PostWriteData {
  petId: string | null;
  title: string;
  content: string;
}

// HomeMap
export interface Place {
  id: number;
  category: string;
  name: string;
  latitude: number;
  longitude: number;
  code: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CurrentLocation {
  lat: number;
  lng: number;
}

// Modal
export interface BookmarkReqData {
  petId: number;
  infoMapId: number;
}

export interface MapData {
  details: Detail;
  reviews: Review[];
  pageInfo: PageInfo;
}

interface Detail {
  infoUrl: string;
  name: string;
  mapAddress: string;
  category: string;
  operationTime: string;
  tel: string;
  homepage: string;
  myPick: boolean;
}

export interface Review {
  petId: number;
  commentId: number;
  profileImage: string;
  petName: string;
  contents: string;
  createdAt: string;
}

export interface ModalResData {
  petInfo: ModalUserInfo;
}

export interface ModalUserInfo {
  petName: string | null;
  profileImage: File | null;
}

// AddMarker
export interface MarkerInfo {
  name: string;
  code: number;
  category: string;
  homepage: string;
  mapAddress: string;
  latitude: number;
  longitude: number;
  operationTime: string;
  tel: string;
}

export interface PlaceImageFormData {
  placeImage: Blob | null;
}

// MyPage
export interface MyPageData {
  myPosts: MyPagePost[] | null;
  pageInfo: PageInfo;
  petInfo: PetInfo;
}

export interface MyPagePost {
  contents: string;
  createdAt: string;
  likesCnt: number;
  commentCnt: number;
  petName: string;
  postId: number;
  title: string;
}

// Login
export interface Roles {
  0: string;
  1: string;
}

export interface TokenInfo {
  petName: string;
  petNameSpan: string;
  petId: number;
  exp: number;
  code: number;
  roles: Roles[] | null;
}

// UserInfo
export interface UserInfo {
  petName: string;
  isMale: 'MALE' | 'FEMALE';
  isCat: 'CAT' | 'DOG';
  age: number;
}

export interface ProfileImageFormData {
  profileImage: Blob | null;
}

// 📂 ETC
export interface ButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface InputProps {
  type: string;
  readOnly?: boolean;
  placeholder: string;
  paddingRight?: string;
  marginBottom?: string;
  width?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openAddressModal?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
