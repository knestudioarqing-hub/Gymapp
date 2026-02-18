/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Program from './pages/Program';
import LogSession from './pages/LogSession';
import Progress from './pages/Progress';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="program" element={<Program />} />
            <Route path="log" element={<LogSession />} />
            <Route path="progress" element={<Progress />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

