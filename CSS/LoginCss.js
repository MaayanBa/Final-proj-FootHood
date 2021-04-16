import { StyleSheet,Dimensions } from 'react-native';


const { height } = Dimensions.get("screen");
const height_logo = height * 0.4;

export default styles = StyleSheet.create({
  headerPart: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
},
footer: {
    flex: 1.5,
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 30,
    width: "90%",
    alignSelf: 'center',
},
logo: {
    top: 50,
    width: height_logo,
    height: height_logo,
},
text: {
    color: 'grey',
    marginTop: 5
},
buttonSignIn: {
    marginTop: 10,
    backgroundColor: "#08d4c4",
    width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
},
login_field: {
    flexDirection: 'row-reverse',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginBottom: 20,
    padding: 5,
},
login_error: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
},
textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingRight: 10,
    color: '#05375a',
},
forgot_remember: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
},
textSign: {
    color: 'white',
    fontWeight: 'bold'
},
check: {
    flexDirection: "row-reverse",
    justifyContent: 'center',
},
rememberMe: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    color: '#009387'
},
loginBtns: {
    top: 20
},
});