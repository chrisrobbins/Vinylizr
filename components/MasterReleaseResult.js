import React, { Component } from "react";
import { Text, View, Image, AsyncStorage } from "react-native";
import _ from "lodash";

import { CardSection } from "../components/common/CardSection";
import axios from "axios";
import VersionsBadge from "./VersionsBadge";

class MasterReleaseResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      page: 1
    };
  }

  componentWillMount() {
    this.getMasterReleases();
  }

  getMasterReleases = () => {
    const { userData, item } = this.props;
    const { page } = this.state;
    value = AsyncStorage.multiGet(["oauth_token", "oauth_secret"]).then(
      values => {
        const user_token = values[0][1];
        const user_secret = values[1][1];
        const master_id = item.id;

        axios({
          method: "GET",
          url: `https://api.discogs.com/masters/${master_id}/versions?format=vinyl&sort=year&sort_order=asc&page=${page}&per_page=30`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
            "User-Agent":
              "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
          }
        })
          .then(response => {
            console.log(response, " MASTER RESPONSE");
            this.setState({ records: response.data.versions });
          })

          .catch(error => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      }
    );
  };

  render() {
    const { item } = this.props;

    const { records } = this.state;

    let discogsRecord = item.thumb;
    let discogsString = item.title.split("-");
    const title = discogsString[1];
    const artist = discogsString[0];
    const label = item.label;

    const {
      imageView,
      textView,
      imageStyle,
      titleTextStyle,
      artistTextStyle,
      container,
      collectionSavedTextStyle,
      wantlistSavedTextStyle
    } = styles;

    return (
      <View style={container}>
        <CardSection>
          <View style={imageView}>
            {!discogsRecord ? (
              <Image
                style={imageStyle}
                source={require("../assets/images/n-a.png")}
              />
            ) : (
              <Image style={imageStyle} source={{ uri: discogsRecord }} />
            )}
          </View>

          <View style={textView}>
            <Text
              ellipsizeMode={"tail"}
              numberOfLines={1}
              style={titleTextStyle}
            >
              {title}
            </Text>
            <Text
              ellipsizeMode={"tail"}
              numberOfLines={1}
              style={artistTextStyle}
            >
              {artist}
            </Text>
            <View style={styles.badgeContainer}>
              <VersionsBadge style={styles.VersBad}>
                {records.length} VERSIONS
              </VersionsBadge>
            </View>
          </View>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(217,217,217,.6)"
  },
  badgeContainer: {
    width: 90,
    marginLeft: 10
  },
  textView: {
    justifyContent: "center"
  },
  titleTextStyle: {
    fontSize: 18,
    color: "#DADADA",
    marginLeft: 5,
    fontFamily: "Lato-Regular"
  },
  artistTextStyle: {
    fontSize: 14,
    color: "rgba(217,217,217,.6)",
    marginLeft: 10,
    marginTop: 1,
    marginBottom: 10,
    fontFamily: "Lato-Regular"
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20
  },
  // collectionSavedTextStyle: {
  //   color: '#0967EE',
  //   marginLeft: 12,
  //   marginTop: 9,
  //   fontSize: 10
  // },
  // wantlistSavedTextStyle: {
  //   color: '#D400FF',
  //   marginLeft: 12,
  //   marginTop: 9,
  //   fontSize: 10
  // },
  imageStyle: {
    height: 85,
    width: 85
  },
  rightSwipeItem: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20
  },
  contentText: {
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    color: "#fff"
  },
  searchModal: {
    justifyContent: "center",
    height: 90,
    width: 90
  }
};

export default MasterReleaseResult;
