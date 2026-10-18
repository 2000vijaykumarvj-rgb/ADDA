/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { PlacementsPage } from './pages/PlacementsPage';
import { CampusLifePage } from './pages/CampusLifePage';
import { FacultyPage } from './pages/FacultyPage';
import { ResearchPage } from './pages/ResearchPage';
import { NewsEventsPage } from './pages/NewsEventsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/academics/:slug" element={<ProgramDetailPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/placements" element={<PlacementsPage />} />
          <Route path="/campus-life" element={<CampusLifePage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
