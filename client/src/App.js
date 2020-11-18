import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './Pages/HomeScreen';
import Action from './Pages/Action';
import PostDetail from './components/PostDetail';
import Profil from './Pages/Profil';
import Pemerintahan from './Pages/Pemerintahan';
import DataPendidikan from './Pages/DataPendidikan';
import DataPekerjaan from './Pages/DataPekerjaan';
import DataJenisK from './Pages/DataJenisK';
import DataKelompokUmur from './Pages/DataKelompokUmur';
import DataPerkawinan from './Pages/DataPerkawinan';
import ListDataWarga from './PagesAdmin/ListDataWarga';
import ListPosts from './PagesAdmin/ListPosts';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/action" exact component={Action} />
        <Route path="/artikel/:id" exact component={PostDetail} />
        <Route path="/profil/data/:id" exact component={Profil} />
        <Route path="/profil/pemerintahan/:id" exact component={Pemerintahan} />
        <Route path="/data/datapendidikan" exact component={DataPendidikan} />
        <Route path="/data/datapekerjaan" exact component={DataPekerjaan} />
        <Route path="/data/datajenisk" exact component={DataJenisK} />
        <Route
          path="/data/datakelompokumur"
          exact
          component={DataKelompokUmur}
        />
        <Route path="/data/dataperkawinan" exact component={DataPerkawinan} />
        <Route path="/admin/listwarga" exact component={ListDataWarga} />
        <Route path="/admin/listposts" exact component={ListPosts} />
      </Switch>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
