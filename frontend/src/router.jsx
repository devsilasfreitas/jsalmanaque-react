import React from 'react';
import { Route, Routes } from 'react-router';
import RootLayout from './layouts/RootLayout';
import Search from './pages/Search';
import Home from './pages/Home';
import Login from './pages/Login/';
import AdminLayout from './layouts/AdminLayout';
import Admin from './pages/Admin';
import AdminContentLayout from './layouts/AdminContentLayout.jsx';
import ContentLayout from './layouts/ContentLayout';
import AllContents from './pages/Admin/AllContents/index.jsx';
import ShowContent from './pages/Admin/AllContents/ShowContent/index.jsx';
import NewContent from './pages/Admin/AllContents/NewContent/index.jsx';
import UpdateContent from './pages/Admin/AllContents/ShowContent/UpdateContent/index.jsx';
import Content from './pages/Contents/index.jsx';
import Sobre from './pages/Sobre/index.jsx';
import { useAuth } from './contexts/UserContext.jsx';
import { Link } from 'react-router-dom';

export const Router = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route>
        {isAuthenticated ? (
          <>
            <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin" element={<AdminContentLayout />}>
                    <Route path="/admin/conteudos" element={<AllContents />} />
                    <Route path="/admin/conteudos/novo-conteudo" element={<NewContent />} />
                    <Route path="/admin/conteudos/:id" element={<ShowContent />} />
                    <Route path="/admin/conteudos/:id/atualizar-conteudo" element={<UpdateContent />} />
                </Route>
            </Route>
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route element={<RootLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/sobre" element={<Sobre />} />
        </Route>
        <Route path="/conteudos" element={<ContentLayout />}>
            <Route path="/conteudos/:language/:module/:title" element={<Content />} />
        </Route>
        <Route path='*' element={
            <>
                <div>404 not found</div>
                <Link to="/">Voltar para a Home</Link>
            </>
            } />
      </Route>
    </Routes>
  );
};