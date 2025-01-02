import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import ToastMessage from './components/common/ToastMessage';
import ToastHandler from './services/toastHandler';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <ToastMessage ref={ToastHandler.setToastRef} />
          <RouterProvider router={router} />
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
