import app from './app';
import config from './config/index';

app.listen(config.port, ()=> {
    console.log(`Server is runnig port ${config.port}....`)
})