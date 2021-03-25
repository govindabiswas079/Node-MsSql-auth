import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Context from "./shared/context";
import Index from "./routes/index";
import Login from "./routes/authentication/login";
import Panel from "./routes/panel";
import Loading from "./shared/loading";
import Pages from "./routes/panel/pages";
import IdleTimer from "react-idle-timer";
class App extends React.Component {
  constructor(props) {
    if (localStorage.getItem("token") == null) {
      localStorage.setItem("token", null);
    }
    super(props);
    this.state = {
      isAuthorized: false,
      token: localStorage.getItem("token"),
      isInactive: false,
      data: null,
      anyError: false,
      isReady: false
    };

    this.idleTimer = null
  }
  componentDidMount() {
    axios.get("http://192.168.0.109/system/frontend_data").then(result => {
      this.setState({
        data: result.data.data
      })
    }).catch(err => {
      console.log(err);
    });
    this.checkAuthorizationStatus();
  }
  authorize = (data) => {
    axios.post("http://192.168.0.109/login", data).then(result => {
      console.log(result.data)
      localStorage.setItem("token", result.data.data.token);
      this.setState({ isAuthorized: result.data.success, token: localStorage.getItem("token"), isInactive: false });
    }).catch(err => {
      console.log(err);
    });
  }
  unAuthorize = () => {
    localStorage.clear();
    this.setState({
      isAuthorized: false,
      token: null,
      isInactive: false
    })
  }
  checkAuthorizationStatus = () => {
    axios.post("http://192.168.0.109/check_status", null, { headers: { authorization: "bearer " + this.state.token } }).then(result => {
      if (result.data.success) {
        this.setState({
          isAuthorized: result.data.success,
          isInactive: false,
          isReady: true
        })
      }
      else {
        localStorage.clear();
        this.setState({
          isAuthorized: result.data.success,
          isInactive: false,//!result.data.success,
          token: null,
          isReady: true
        })
      }
    }).catch(err => {
      console.log(err);
    });
  }

  handleOnAction = event => {
    //  console.log('user did something', event)
    // this.setState({
    //   isInactive:false
    // })
  }

  handleOnActive = event => {
    // console.log('user is active', event)
    this.checkAuthorizationStatus();
    // console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  handleOnIdle = event => {
    //console.log('user is idle', event)
    this.setState({
      isInactive: true
    });
  }
  handleClose = () => {
    this.setState({
      isInactive: !this.state.isInactive
    })
  }
  render() {
    return (
      <Context.Provider value={{
        isReady: this.state.isReady, anyError: this.state.anyError, isAuthorized: this.state.isAuthorized, authorize: this.authorize, unAuthorize: this.unAuthorize, checkAuthorizationStatus: this.checkAuthorizationStatus, data: this.state.data,
        showInactivity: this.state.isInactive, closeInactivityModal: this.handleClose
      }}>
        {this.state.isReady ?
          <>
            {this.state.isAuthorized ?
              <IdleTimer
                ref={ref => { this.idleTimer = ref }}
                timeout={1000 * 60 * 10}
                onActive={this.handleOnActive}
                onIdle={this.handleOnIdle}
                // onAction={this.handleOnAction}
                debounce={250}
              />
              : null}
            <Switch>
              <Route path="/" exact render={() => <Index {...this.props} />} />
              <Route path="/login" exact render={() => <Login {...this.props} />} />
              <Route path="/panel" exact render={() => <Panel {...this.props} />} />
              <Route path="/panel/pages" exact render={() => <Pages {...this.props} />} />
              <Route path="*" render={() => <Index {...this.props} />} />
            </Switch>
          </>
          : <Loading />
        }
      </Context.Provider>
    );
  }
}

export default App;
