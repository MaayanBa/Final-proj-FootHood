import { StyleSheet, StatusBar } from 'react-native';


export default styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight
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
  txtBtnTouch: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
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
});