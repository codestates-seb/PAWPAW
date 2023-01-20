import _ from 'lodash';
import axios from 'axios';
import headers from '../util/headers';
import { IProps } from '../Map/HomeMap';

const url = process.env.REACT_APP_API_ROOT;

// 1️⃣ 전체 데이터 + 나의 장소 불러오기
export async function getAll(address: string) {
  // 전체 데이터 불러오기
  const res = await axios.get(`${url}/maps/${address}`, { headers });
  const resData = addBookmark(res.data, false);

  // 나의 장소 데이터 불러오기
  const resMyPick = await axios.get(`${url}/maps/mypick`, { headers });
  const resMyPickData = addBookmark(resMyPick.data, true);

  return filterByAddress(merge(resData, resMyPickData), address);
}

// 2️⃣ 나의 장소만 불러오기
export async function getMyPick() {
  const resMyPick = await axios.get(`${url}/maps/mypick`, { headers });
  const resMyPickData = addBookmark(resMyPick.data, true);
  return resMyPickData;
}

// 3️⃣ 선택한 필터만 불러오기
export async function getFilter(address: string, selected: string) {
  const res = await axios.get(`${url}/maps/${address}/?filter=${selected.toUpperCase()}`, {
    headers,
  });
  const resData = addBookmark(res.data, false);

  // 나의 장소 데이터 불러오기
  const resMyPick = await axios.get(`${url}/maps/mypick`, { headers });
  const resMyPickData = addBookmark(resMyPick.data, true);

  return filterByAddress(filterBySelected(merge(resData, resMyPickData), selected), address);
}

// 두 데이터를 합쳐주는 함수
function merge(arr1: IProps[], arr2: IProps[]) {
  const mergedArr = [...arr2, ...arr1]; // 중복되는 데이터는 arr2의 데이터가 남는다.
  const dedupedArr = _.uniqBy(mergedArr, 'id'); // id를 기준으로 중복 데이터 삭제
  return dedupedArr;
}

// 선택한 필터에 해당하는 마커만 남겨주는 함수
function filterBySelected(arr: IProps[], selected: string) {
  return arr.filter((el) => el.category === selectedToCategory(selected));
}

// 해당 지역 마커만 남겨주는 함수
function filterByAddress(arr: IProps[], address: string) {
  return arr.filter((el) => el.code === Number(address));
}

// 모든 마커에 bookmark 속성을 추가해주는 함수
function addBookmark(arr: IProps[], value: boolean) {
  return arr.map((el: IProps) => {
    return { ...el, bookmark: value };
  });
}

const selectedToCategory = (selected: string) => {
  switch (selected) {
    case 'park':
      return '공원';
    case 'cafe':
      return '카페';
    case 'restaurant':
      return '음식점';
    case 'camping':
      return '캠핑';
    case 'pool':
      return '수영장';
    case 'hospital':
      return '병원';
  }
};
