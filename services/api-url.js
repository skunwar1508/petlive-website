let ROOT_URL = "";
let IMAGE_URL = "";
let SOCKET_URL = "";

if (process.env.REACT_APP_SERVER?.trim() == "production") {
    ROOT_URL = 'http://13.236.202.246:3000/api/v1'
    SOCKET_URL = 'http://13.236.202.246:3000'
} else if (process.env.REACT_APP_SERVER?.trim() == "staging") {
  ROOT_URL = "http://staging.alphonic.net.in:5656/api/v1";
  SOCKET_URL = "http://staging.alphonic.net.in:5656";
} else {
  ROOT_URL = "http://localhost:5656/api/v1";
  SOCKET_URL = "http://localhost:5656";
}
  // ROOT_URL = "http://staging.alphonic.net.in:5656/api/v1";
  // SOCKET_URL = "http://staging.alphonic.net.in:5656";

export { IMAGE_URL, SOCKET_URL };
export default ROOT_URL;
