import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PlaydatesCreateForm from "./pages/posts/PlaydatesCreateForm";
import PlaydatePage from "./pages/posts/PlaydatePage";
import PlaydatesPage from "./pages/posts/PlaydatesPage";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/playdate/create" render={() => <PlaydatesCreateForm />} />
          <Route exact path="/playdate/:id" render={() => <PlaydatePage />} />
          <Route exact path="/playdate" render={() => <PlaydatesPage message="No results found"/>} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;