import React from 'react';
import { Route, Routes } from 'react-router';
import RootLayout from './layouts/RootLayout';
import Search from './pages/Search';
import { Home } from './pages/Home';
import Login from './pages/Login/';
import AdminLayout from './layouts/AdminLayout';
import Admin from './pages/Admin';
import AdminContentLayout from './layouts/AdminContentLayout';
import Content from './pages/Content';
import AllContents from './pages/Admin/AllContents/index.jsx';
import ShowContent from './pages/Admin/AllContents/ShowContent/index.jsx';
import NewContent from './pages/Admin/AllContents/NewContent/index.jsx';
import UpdateContent from './pages/Admin/AllContents/ShowContent/UpdateContent/index.jsx';
import Sobre from './pages/Sobre/index.jsx';
import { useAuth } from './contexts/UserContext.jsx';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Router = () => {
  const {  user } = useAuth();

  return (
    <Routes>
      <Route>
        {user ? (
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
        <Route path="/conteudos/:language/:module/:title" element={<Content />} />
        <Route path='*' element={
          user === undefined ? (
            <Spin
                indicator={
                <LoadingOutlined
                    style={{
                    fontSize: 24,
                    }}
                    spin
                />
                }
                fullscreen
                tip="Carregando..."
            />
          ) : (
            <>
                <div>404 not found</div>
                <Link to="/">Voltar para a Home</Link>
            </>
          )
            } />
      </Route>
    </Routes>
  );
};