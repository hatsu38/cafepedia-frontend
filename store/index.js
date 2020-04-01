export const state = () => ({
  searchQuery: {
    lat: undefined,
    lng: undefined,
    haveSocket: '',
    haveWifi: '',
    haveSmoking: '',
    stationName: ''
  },
  // 選択肢にある駅名のIndex。Topページで選択状態にするための変数
  selectStationIdx: undefined,
  cafes: [],
  mapCenterPosition: {
    lat: undefined,
    lng: undefined
  }
})

export const mutations = {
  // falseは、電源がないことを意味する
  // ''は、電源の有無を問わない検索条件になる
  socketFilter(state, facilityState) {
    state.searchQuery.haveSocket = facilityState === '' ? true : ''
  },
  wifiFilter(state, facilityState) {
    state.searchQuery.haveWifi = facilityState === '' ? true : ''
  },
  smokingFilter(state, facilityState) {
    state.searchQuery.haveSmoking = facilityState === '' ? true : ''
  },
  selectStation(state, stationName) {
    state.searchQuery.stationName = stationName
  },
  updatePosition(state, { lat, lng }) {
    state.searchQuery.lat = lat
    state.searchQuery.lng = lng
  },
  updateSelectStationIdx(state, selectStationIdx) {
    state.selectStationIdx = selectStationIdx
  },
  getCafeList(state, cafes) {
    state.cafes = cafes
  },
  pushCafeList(state, cafes) {
    state.cafes.push(...cafes)
  },
  getMapCenterPosition(state, cafe) {
    state.mapCenterPosition.lat = Number(cafe.lat)
    state.mapCenterPosition.lng = Number(cafe.lng)
  }
}
