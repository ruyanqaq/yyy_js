//App.js
// 增加引入代码
import { Data } from './application/Singers/data';

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <GlobalStyle></GlobalStyle>
                <IconStyle></IconStyle>
                <Data>
                    {renderRoutes(routes)}
                </Data>
            </HashRouter>
        </Provider>
    )
}