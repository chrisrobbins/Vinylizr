import _ from "lodash";
import { AsyncStorage } from "react-native";
import axios from "axios";

export function fetchUser() {
  return function(dispatch) {
    AsyncStorage.multiGet(["oauth_token", "oauth_secret"]).then(values => {
      const user_token = values[0][1];
      const user_secret = values[1][1];

      axios({
        method: "GET",
        url: `https://api.discogs.com/oauth/identity`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
          "User-Agent":
            "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
        }
      }).then(response => {
        console.log(response, "THUNK RESPONSE");
        dispatch({
          type: "FETCH_USER",
          payload: response.data
        });
      });
    });
  };
}
export function fetchCollection() {
  return function(dispatch) {
    const { userData } = this.state;
    AsyncStorage.multiGet(["oauth_token", "oauth_secret"]).then(values => {
      const user_token = values[0][1];
      const user_secret = values[1][1];
      const user_name = userData.username;

      axios({
        method: "GET",
        url: `https://api.discogs.com/users/${user_name}/collection/folders/0/releases`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
          "User-Agent":
            "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
        }
      })
        .then(response => {
          dispatch({
            records: response.data.releases
          });
        })

        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    });
  };
}

// export const saveCollectionItem = (item) => {
//   let userId = fire.auth().currentUser.uid
//   let albumRef = fire.database().ref(`users/${userId}/collection/albums`)
//       return dispatch => {
//           albumRef.push(item)
//           dispatch(fetchCollection())
//       }
//   }
//
// export const deleteCollectionItem = (key) => {
//   return dispatch => fire.database().child(key).remove()
//   //read database when child is removed from collection
//   fire.database().ref(`users/${userId}/collection/albums`).on('child_removed', snapshot => {
//     dispatch({
//       type: FETCH_COLLECTION,
//       payload: snapshot.val().album
//     })
// })
// }
