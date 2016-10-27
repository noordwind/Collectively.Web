import PreLoginRoute from 'resources/middleware/pre-login-route';
import AuthorizeStep from 'resources/middleware/authorize-step';
import LoaderHandler from 'resources/middleware/loader-handler';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import environment from './environment';
import routes from 'resources/routes';

@inject(EventAggregator)
export class App {
    constructor(eventAggregator){
        this.eventAggregator = eventAggregator;
    }
    configureRouter(config, router) {
        this.router = router;
        config.title = environment.title;
        config.addPipelineStep('authorize', PreLoginRoute);
        config.addPipelineStep('authorize', AuthorizeStep);

        //TODO: Move to custom pipeline step.
        config.addPipelineStep('authorize', LoaderHandler);
        config.map(routes);
        config.options.pushState = true;
    }

    activate() {
        this.eventAggregator.subscribe('loader:display', response => {
            this.loaderActive = true;
        });
        this.eventAggregator.subscribe('loader:hide', response => {
            this.loaderActive = false;
        });
    }
}
