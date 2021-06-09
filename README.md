<h1 align="center">
    <img alt="dev maps" title="Graphic design is my passion" src=".github/logo.png" width="250px" />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/badge/languages-2-informational">
  
  <a href="https://github.com/luanrios/engenharia-software-2/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/badge/last%20commit-june%202021-inactive">
  </a>

  <a href="https://github.com/luanrios/engenharia-software-2/issues">
    <img alt="Repository issues" src="https://img.shields.io/badge/issues-0%20open-orange">
  </a>

  <a href="https://github.com/luanrios/engenharia-software-2/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  </a>
</p>

<p align="center">
  <a href="#rocket-built-with">Built with</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project-structure">Project structure</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<br>

<p align="center">
  <img alt="Frontend" src=".github/bookbook.png" width="100%">
</p>

## :rocket: Built with

This project was made using:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [Firebase](https://firebase.google.com/)

## 💻 About the project

bookbook is a facebook-like web application that emulates an open-source based library, in which users can register books to be leaned and borrow books registered by other users. It was developed for the "Engenharia de Software 2" (software engineering 2) course, taught at the Federal University of Bahia (UFBA) by professor Ivan Machado.

A hosted version can be found at [Heroku](http://bookbookdelta.herokuapp.com/).

## 🤔 How to contribute

- Fork this repository;
- Create a branch with your feature: `git checkout -b my-feature`;
- Commit your changes: `git commit -m 'feat: My new feature'`;
- Push to your branch: `git push origin my-feature`.

See the `Dockerfile` for a more detailed explanation, using docker.

After your pull request has been merged, you can delete your branch.

## 📚 Project structure

web `Web application`
- package.json `Contains high-level project specifications, like dependencies and such`
- yarn.lock `Contains low-level specification of the project dependency tree`
- .env.local `Contains environment variables used to open a connection to the project's backend`
- public `Contains public accessibility resources like images and robots.txt`
- src `Contains project source code`
  - firebase.js `Provides connection to the firebase backend service using local variables supplied by .env.local`
  - index.js `Instantiates and renders the react application`
  - contexts `Maintains project contexts`
    - AuthContext.js `Provides authentication and session context for the App using firebase`
  - components `Maintains project components`
    - App.js `Application component (instantiated in ../index.js) where project routes are located`
    - Login.js `Login view`
    - Signup.js `User creation view`
    - ForgotPassword.js `Password recovery view`
    - Dashboard.js `Home of authenticated users (redirection endpoint for exceptions found)`
    - UpdateProfile.js `User information editing view (e.g. password change)`
    - PrivateRoute.js `Wrapper for routes that require authentication (redirects to login if not authenticated)`
    - CreateBook.js `View for creating books`
    - EditBook.js `View for editing books`
    - DetailBook.js `View for viewing books`

## :memo: License

This project is under the MIT license. See [LICENSE](LICENSE) for more details.