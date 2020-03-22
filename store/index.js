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
  selectStationIdx: undefined
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
  updateSelectStationIdx(state, selectStationIdx) {
    state.selectStationIdx = selectStationIdx
  }
}
