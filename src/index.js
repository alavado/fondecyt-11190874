import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import './reset.css'

import { Provider } from 'react-redux'
import store from './redux/store'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()


ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
