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
import PlaydatesEditForm from "./pages/posts/PlaydateEditForm";
import ContactForm from "./pages/cotact/contact";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import NotFound from "./components/NotFound";



function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => (<PlaydatesPage 
            message="No results found"
          />
          )} />
          <Route exact path="/myplaydate" render={() => (<PlaydatesPage 
            message="No results found, create a playdate"
            filter={`organizer=${currentUser?.pk}&`}
          />
          )} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/contact" render={() => <ContactForm />} />
          <Route exact path="/playdate/create" render={() => <PlaydatesCreateForm />} />
          <Route exact path="/playdate/:id" render={() => <PlaydatePage />} />
          <Route exact path="/playdate/:id/edit" render={() => <PlaydatesEditForm />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;