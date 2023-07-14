import { Component, Input } from '@angular/core';

@Component({
    selector : 'loading-image',
    template: `<div class="loading" [ngClass]="{loaderDisplayBlock: isLoading, loaderDisplayNone: !isLoading}">Loading</div>
               <div class="message" [ngClass]="{loaderDisplayBlock: isLoading, loaderDisplayNone: !isLoading}">Please wait...</div>`,
    styles: [`
                      .loaderDisplayBlock{
                           visibility: visible;
                      }
                      .loaderDisplayNone{
                          visibility: hidden;
                      }
                     /* Absolute Center Spinner */
                      .message {
                        position: fixed;
                        z-index: 2000;
                        height: 2em;
                        width: 100%;
                        overflow: show;
                        margin: auto;
                        padding-top: 4em;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        text-align: center;
                        color: white;
                      }
                      .loading {
                        position: fixed;
                        z-index: 2000;
                        overflow: show;
                        margin: auto;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        width: 50px;
                        height: 50px;
                      }
                      /* Transparent Overlay */
                      .loading:before {
                        content: '';
                        display: block;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.3);
                      }
                      /* :not(:required) hides these rules from IE9 and below */
                      .loading:not(:required) {
                        /* hide "Loading" text */
                        font: 0/0 a;
                        color: transparent;
                        text-shadow: none;
                        background-color: transparent;
                        border: 0;
                      }
                      .loading:not(:required):after {
                        content: '';
                        display: block;
                        font-size: 10px;
                        width: 50px;
                        height: 50px;
                        margin-top: -0.5em;
                        border: 5px solid white;
                        border-radius: 100%;
                        border-bottom-color: transparent;
                        -webkit-animation: spinner 1s linear 0s infinite;
                        animation: spinner 1s linear 0s infinite;
                      }
                      /* Animation */
                      @-webkit-keyframes spinner {
                        0% {
                          -webkit-transform: rotate(0deg);
                          -moz-transform: rotate(0deg);
                          -ms-transform: rotate(0deg);
                          -o-transform: rotate(0deg);
                          transform: rotate(0deg);
                        }
                        100% {
                          -webkit-transform: rotate(360deg);
                          -moz-transform: rotate(360deg);
                          -ms-transform: rotate(360deg);
                          -o-transform: rotate(360deg);
                          transform: rotate(360deg);
                        }
                      }
                      @-moz-keyframes spinner {
                        0% {
                          -webkit-transform: rotate(0deg);
                          -moz-transform: rotate(0deg);
                          -ms-transform: rotate(0deg);
                          -o-transform: rotate(0deg);
                          transform: rotate(0deg);
                        }
                        100% {
                          -webkit-transform: rotate(360deg);
                          -moz-transform: rotate(360deg);
                          -ms-transform: rotate(360deg);
                          -o-transform: rotate(360deg);
                          transform: rotate(360deg);
                        }
                      }
                      @-o-keyframes spinner {
                        0% {
                          -webkit-transform: rotate(0deg);
                          -moz-transform: rotate(0deg);
                          -ms-transform: rotate(0deg);
                          -o-transform: rotate(0deg);
                          transform: rotate(0deg);
                        }
                        100% {
                          -webkit-transform: rotate(360deg);
                          -moz-transform: rotate(360deg);
                          -ms-transform: rotate(360deg);
                          -o-transform: rotate(360deg);
                          transform: rotate(360deg);
                        }
                      }
                      @keyframes spinner {
                        0% {
                          -webkit-transform: rotate(0deg);
                          -moz-transform: rotate(0deg);
                          -ms-transform: rotate(0deg);
                          -o-transform: rotate(0deg);
                          transform: rotate(0deg);
                        }
                        100% {
                          -webkit-transform: rotate(360deg);
                          -moz-transform: rotate(360deg);
                          -ms-transform: rotate(360deg);
                          -o-transform: rotate(360deg);
                          transform: rotate(360deg);
                        }
                      }
            `]
})

export class LoadingImageComponent
{
    @Input('is-loading') isLoading: boolean = false;
}
