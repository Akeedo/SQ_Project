import { LocationStrategy } from '@angular/common';

export class BackButton {

    public static prevent(locationStrategy: LocationStrategy) {

        history.pushState(null, null, location.href);
        locationStrategy.onPopState(() => {
            history.pushState(null, null, location.href);
        })
    }
}
