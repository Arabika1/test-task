import CONFIG from '@application-config';
import { LoggerModule } from 'nestjs-pino';

const configuration = {
  pinoHttp: {
    level: CONFIG.LOG_LEVEL,
  },
};

export default LoggerModule.forRoot(configuration);
