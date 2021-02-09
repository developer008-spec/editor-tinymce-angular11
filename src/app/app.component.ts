import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// https://www.tiny.cloud/docs/integrations/angular/#tinymceangularintegrationquickstartguide
export class AppComponent {
  title = 'tinymce-angular-demo';
  labels = ['order.account.firstName', 'user-number', 'user-email', 'user-address', 'user-phone'];
  labelsOrder = ['order.deliveryNumber', 'order-date', 'order-quantity', 'order-tank', 'order-address'];
  lab = this.labels.join(' ');
  labOrder = this.labelsOrder.join(' ');
  ckeditorContent: any;
  htmlContent: any;

  config: any = {
    branding: false,
    menubar: 'view file edit user order',
    height: 300,
    base_url: '/tinymce',
    suffix: '.min',
    inline: false,
    valid_elements: '*[*]',
    valid_children: '*[*]',
    menu:
      {
        user: {title: 'User labels', items: 'undo redo ' + this.lab},
        order: {title: 'Order labels', items: 'undo redo ' + this.labOrder}
      },
    plugins: 'preview code',
    toolbar: [this.lab],
    setup: () => {
    }
  };

  public myForm = new FormGroup({
    body: new FormControl('', Validators.required)
  });

  constructor() {
    const component = this;
    this.config.setup = function setup(editor: any): void {

      for (const label of component.labels) {

        editor.ui.registry.addButton(label, {
          icon: 'template',
          tooltip: 'Insert ' + label,
          text: label,
          onAction: (_) => {
            editor.insertContent('${ ' + label + ' }');
            component.handleEditorText();
          }
        });

        editor.ui.registry.addMenuItem(label, {
          icon: 'user',
          tooltip: 'Insert ' + label,
          text: label,
          onAction: (_) => {
            editor.insertContent('${ ' + label + ' }');
            component.handleEditorText();
          }
        });
      }

      for (const labelo of component.labelsOrder) {
        editor.ui.registry.addMenuItem(labelo, {
          icon: 'template',
          tooltip: 'Insert ' + labelo,
          text: labelo,
          onAction: (_) => {
            editor.insertContent('${ ' + labelo + ' }');
            component.handleEditorText();
          }
        });
      }
    };
    this.config.toolbar
      .push(' | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | preview | code |');
  }

  handleEditorText(): void {
    console.log(this.myForm.get('body').value);
    this.htmlContent = this.myForm.get('body').value.replaceAll('${ order.account.firstName }', ' John Doe ')
      .replaceAll('${ order.deliveryNumber }', ' WP-deliveryNumber-123 ');
  }

}
