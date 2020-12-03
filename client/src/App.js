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
import ListDataKeluarga from './PagesAdmin/ListDataKeluarga';
import DetailKeluarga from './PagesAdmin/DetailKeluarga';
import ListPosts from './PagesAdmin/ListPosts';
import Login from './PagesAdmin/Login';
import ProfileScreen from './PagesAdmin/Profile';
import DetailWarga from './PagesAdmin/DetailWarga';
import ListDataPengguna from './PagesAdmin/ListDataPengguna';
import EditPengguna from './PagesAdmin/EditPengguna';
import CreateWarga from './PagesAdmin/CreateWarga';
import EditWarga from './PagesAdmin/EditWarga';
import CreateKeluarga from './PagesAdmin/CreateKeluarga';
import EditKeluarga from './PagesAdmin/EditKeluarga';
import CreatePost from './PagesAdmin/CreatePost';
import EditPost from './PagesAdmin/EditPost';

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
        <Route path="/admin/listkeluarga" exact component={ListDataKeluarga} />
        <Route
          path="/admin/detailkeluarga/:id"
          exact
          component={DetailKeluarga}
        />
        <Route path="/admin/detailwarga/:id" exact component={DetailWarga} />
        <Route path="/admin/listposts" exact component={ListPosts} />
        <Route path="/admin/listpengguna" exact component={ListDataPengguna} />
        <Route path="/admin/create/warga" exact component={CreateWarga} />
        <Route path="/admin/create/post" exact component={CreatePost} />
        <Route path="/admin/create/keluarga" exact component={CreateKeluarga} />
        <Route path="/admin/:id/edit" exact component={EditWarga} />
        <Route path="/admin/:id/editkeluarga" exact component={EditKeluarga} />
        <Route path="/admin/:id/editpost" exact component={EditPost} />
        <Route path="/admin/user/:id/edit" component={EditPengguna} />
        <Route path="/admin/login" exact component={Login} />
        <Route path="/admin/profile" exact component={ProfileScreen} />
      </Switch>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
