import { StyleSheet, Dimensions } from 'react-native';


export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackGround: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: "transparent"
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  space: {
    marginTop: 80,
  },
  inputLabel: {
    alignItems: "flex-start",
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  soccerPlayer_img: {
    margin: 5,
    height: 25,
    width: 25,
  },
  btnTouch: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 30,
    width: '40%',
    alignSelf: 'center',
    padding: 5,
    elevation: 10,
  },
  blue_btn: {
    borderRadius: 30,
    backgroundColor: '#0078D7',
    alignItems: 'center',
    paddingTop: 15,
    alignSelf: 'stretch'
  },
  grey_btn: {
    borderRadius: 30,
    backgroundColor: '#918d8d',
    alignItems: 'center',
    paddingTop: 15,
    alignSelf: 'stretch'
  },
  txtBtnTouch: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
  },
  sectionStyle: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  explanationText: {
    paddingBottom: 50,
    color: 'orange',
    fontSize: 30,
  },
  social_btn: {
    alignItems: 'center',
    padding: 30
    , paddingTop: 10
  },
  faceAndGmail_btn: {
    height: 85,
    width: 85
  },
  playerCardIcon_Btn: {
    width: 35,
    height: 35
  },
  ball_img: {
    margin: 50,
    height: 110,
    width: 100,
    alignSelf: 'center',
    top: 40
  },
  modal_View: {
    margin: 20,
    padding: 5,
    shadowColor: "#D9D9D9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '90%',
    width: '90%',
    borderRadius: 30
  },
  noResultsTxt: {
    paddingTop: 40,
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
    alignItems: 'center'
  },
  modal_Txt: {
    paddingTop: 20,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: 'black'
  },
  map_Container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'
  },
  mapView_container: {
    flex: 1,
    zIndex: 0,
    width: Dimensions.get('window').width - 60,
    height: '70%'
  },
  map_BtnClose: {
    backgroundColor: "#2196F3",
    marginTop: 40,
    borderRadius: 20,
    padding: 10,
    alignSelf: "center",
    marginBottom: 20
  },
  rates_View: {
    justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'row',
    marginTop: 15
  },
  rate: {
    backgroundColor: 'yellow',
    borderRadius: 40,
    height: 60,
    width: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  playerCardInList: {
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 10,
    margin: 5,
    paddingLeft:15,
    alignSelf: 'center'
  },
  inputBox: {
    height: 35,
    borderWidth: 1,
    alignSelf: 'center',
    width: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingRight: 10,
  },
  x_TouchIcon: {
    zIndex: 1,
    right: 80,
    bottom: 25
  },
  xIcon: {
    width: 22,
    height: 22,
  }
});