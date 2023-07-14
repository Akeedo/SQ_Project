import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  buttonHtml: string = `<button onClick="window.print();window.close()" class="printButton">Print</button>`;

  constructor() { }

  print(printId?: string, viewOnly: boolean = false, params: any = {}) {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const wt = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const ht = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = wt / window.screen.availWidth;
    const left = (wt) / 4 / systemZoom + dualScreenLeft;
    const top = (ht) / 2 / systemZoom + dualScreenTop;

    printId = printId ? printId : 'printId';
    const printContent = document.getElementById(printId).innerHTML;
    const width = params.width ? params.width : (params.landscape ? 1500 : 900);
    const height = params.height ? params.height : (params.landscape ? 700 : 900);
    const WindowPrt = window.open('', '', `left=${left},top=${top},width=${width},height=${height},toolbar=0,scrollbars=0,status=0`);

    const fontFamily = params.fontFamily ? params.fontFamily : 'Times new roman';
    const thStyle = params.thStyle ? params.thStyle : '';
    const tdStyle = params.tdStyle ? params.tdStyle : '';
    const style = params.style ? params.style : '';
    WindowPrt.document.open();
    WindowPrt.document.write(`
        <html>
         <style>
            body{
                font-family: ${fontFamily}
            }
            table, th, td {
              border: 1px solid black;
              border-collapse: collapse;
              padding: 5px;width:100%;
            }
            th {${thStyle}}
            td {${tdStyle}}
            .printButton{
              background-color: #009688;
              color: #ffffff;
              border: none;
              width: 80px;
              height: 40px;
              float:right;
            }
            @media print {
              .printButton{
              display:none;
              }
            }
            ${style}
         </style> 
             </head>
      <body><div style="margin-bottom:'1rem'"> ${!viewOnly ? this.buttonHtml : ''}  </div>
        <div style="margin:'1rem'">
            ${printContent}
        </div>
      </body>
        </html>`
    );
    WindowPrt.print();
    WindowPrt.document.close();
    WindowPrt.focus();
  }
}