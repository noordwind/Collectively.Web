import PreLoginRoute from 'resources/middleware/pre-login-route';
import AuthorizeStep from 'resources/middleware/authorize-step';
import AppConfig from 'resources/app-config'
import routes from 'resources/routes';

export class App {
    configureRouter(config, router) {
        this.router = router;
        config.title = AppConfig.title;
        config.addPipelineStep('authorize', PreLoginRoute);
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map(routes);
        config.options.pushState = true;
    }
}
