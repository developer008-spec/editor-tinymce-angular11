import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// https://www.tiny.cloud/docs/integrations/angular/#tinymceangularintegrationquickstartguide
export class AppComponent {
  title = 'tinymce-angular-demo';
  labels = ['lab1', 'lab2', 'lab3', 'lab4', 'lab5'];
  lab = this.labels.join(' ');
  config: any = {
    branding: false,
    height: 300,
    base_url: '/tinymce',
    suffix: '.min',
    inline: false,
    toolbar: [this.lab],
    setup: () => {
    }
  };

  constructor() {
    const component = this;
    this.config.setup = function setup(editor: any): void {

      for (const label of component.labels) {

        editor.ui.registry.addButton(label, {
          icon: 'template',
          tooltip: 'Browse Document Repository',
          text: 'Custom-' + label,
          onAction: (_) => {
            editor.insertContent('{{ custom-' + label + ' }}');
          }
        });
      }
    };
    this.config.toolbar
      .push(' | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | ');
  }

  myfunction(): void {
    console.log('lálálá');
  }
}
