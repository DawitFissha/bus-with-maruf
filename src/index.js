import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';
import { PersistGate } from 'redux-persist/integration/react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, persister } from './store';
import {ApolloClient,InMemoryCache,ApolloProvider,HttpLink} from '@apollo/client'
import {theme} from './theme/theme'
import {ThemeProvider} from '@mui/material/styles'

const client=new ApolloClient({
    cache:new InMemoryCache,
    link:new HttpLink({
        uri:"https://melabus.herokuapp.com/graphql",
        credentials: "include",
        
    })
})
ReactDOM.render(
 <ThemeProvider theme = {theme}>
       <ApolloProvider client={client}>
    <Provider store={store}>
        <ConfigProvider>
            <PersistGate loading={null} persistor={persister}>
                <App />
            </PersistGate>
        </ConfigProvider>
    </Provider>
    </ApolloProvider>
 </ThemeProvider>
    ,
    document.getElementById('root')
);
reportWebVitals();
