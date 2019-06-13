import React, { createContext } from 'react';

const UserContext = createContext({ foo: 'bar' });

const { Provider: UserProvider, Consumer: UserConsumer } = UserContext;

const withUser = Component => {
  return class UserEnhancer extends React.Component {
    static navigationOptions = {
      header: null,
    };
    static contextType = UserContext;
    static displayName = `withUser(${Component.displayName ||
      Component.name ||
      'Unknown'})`;

    render() {
      return <Component {...this.props} user={this.context} />;
    }
  };
};

export { UserConsumer, UserProvider, UserContext, withUser };
