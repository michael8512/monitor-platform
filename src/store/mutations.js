export default {
  ['UPDATE_FONT_SIZE'](state, payload){
    state.fontSize = payload;
  },
  ['UPDATE_RATIO_X'](state, payload){
    state.ratioX = payload;
  },
  ['UPDATE_REALNAME_TOTAL'](state, payload){
    state.realNameTotal = payload;
  },
  ['UPDATE_BASEURL'](state, payload){
    state.baseUrl = payload;
  },
  ['UPDATE_IFRAME_DATA'](state, payload){
    console.log(payload)
    state.iframeData = payload;
  },
};
