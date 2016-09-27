import PreLoginRoute from 'resources/middleware/pre-login-route';
import AuthorizeStep from 'resources/middleware/authorize-step';
import environment from './environment';
import routes from 'resources/routes';

export class App {
    configureRouter(config, router) {
        this.router = router;
        config.title = environment.title;
        config.addPipelineStep('authorize', PreLoginRoute);
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map(routes);
        config.options.pushState = true;
    }
}
