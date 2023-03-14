import axios from 'axios';
import _ from 'lodash';
import { Data } from '../Map/HomeMap';
import headers from '../util/headers';

const url = process.env.REACT_APP_API_ROOT;

export async function getCenter(address: string) {
  const res = await axios.get(`${url}/maps/${address}`, { headers });
  const center = res.data.center;
  return { lat: center.centerLatitude, lng: center.centerLongitude };
}

export async function getAll(address: string) {
  const res = await axios.get(`${url}/maps/${address}`, { headers });
  const resData = addBookmark(res.data.maps, false);
  const resMyPick = await axios.get(`${url}/maps/mypick`, { headers });
  const resMyPickData = addBookmark(resMyPick.data, true);
  return filterByAddress(merge(resData, resMyPickData), address);
}

export async function getMyPick() {
  const resMyPick = await axios.get(`${url}/maps/mypick`, { headers });
  const resMyPickData = addBookmark(resMyPick.data, true);
  return resMyPickData;
}

export async function getFilter(address: string, selected: string) {
  const res = await axios.get(`${url}/maps/${address}/?filter=${selected.toUpperCase()}`, {
    headers,
  });
  const resData = addBookmark(res.data, false);
  const resMyPick = await axios.get(`${url}/maps/mypick`, { headers });
  const resMyPickData = addBookmark(resMyPick.data, true);
  return filterByAddress(filterBySelected(merge(resData, resMyPickData), selected), address);
}

function merge(arr1: Data[], arr2: Data[]) {
  const mergedArr = [...arr2, ...arr1];
  const dedupedArr = _.uniqBy(mergedArr, 'id');
  return dedupedArr;
}

function filterBySelected(arr: Data[], selected: string) {
  return arr.filter((el) => el.category === selectedToCategory(selected));
}

function filterByAddress(arr: Data[], address: string) {
  return arr.filter((el) => el.code === Number(address));
}

function addBookmark(arr: Data[], value: boolean) {
  return arr.map((el: Data) => {
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
