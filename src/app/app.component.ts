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
  labels = ['user-name', 'user-number', 'user-email', 'user-address', 'user-phone'];
  labelsOrder = ['order-name', 'order-date', 'order-quantity', 'order-tank', 'order-address'];
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
    valid_elements: '@[id|class|style|title|dir<ltr?rtl|lang|xml::lang],'
      + 'a[rel|rev|charset|hreflang|tabindex|accesskey|type|'
      + 'name|href|target|title|class],strong/b,em/i,strike,u,'
      + '#p[style],-ol[type|compact],-ul[type|compact],-li,br,img[longdesc|usemap|'
      + 'src|border|alt=|title|hspace|vspace|width|height|align],-sub,-sup,'
      + '-blockquote,-table[border=0|cellspacing|cellpadding|width|frame|rules|'
      + 'height|align|summary|bgcolor|background|bordercolor],-tr[rowspan|width|'
      + 'height|align|valign|bgcolor|background|bordercolor],tbody,thead,tfoot,'
      + '#td[colspan|rowspan|width|height|align|valign|bgcolor|background|bordercolor'
      + '|scope],#th[colspan|rowspan|width|height|align|valign|scope],caption,-div,'
      + '-span,-code,-pre,address,-h1,-h2,-h3,-h4,-h5,-h6,hr[size|noshade],-font[face'
      + '|size|color],dd,dl,dt,cite,abbr,acronym,del[datetime|cite],ins[datetime|cite],'
      + 'object[classid|width|height|codebase|*],param[name|value|_value],embed[type|width'
      + '|height|src|*],map[name],area[shape|coords|href|alt|target],bdo,'
      + 'button,col[align|char|charoff|span|valign|width],colgroup[align|char|charoff|span|'
      + 'valign|width],dfn,fieldset,form[action|accept|accept-charset|enctype|method],'
      + 'input[accept|alt|checked|disabled|maxlength|name|readonly|size|src|type|value],'
      + 'kbd,label[for],legend,noscript,optgroup[label|disabled],option[disabled|label|selected|value],'
      + 'q[cite],samp,select[disabled|multiple|name|size],small,'
      + 'textarea[cols|rows|disabled|name|readonly],tt,var,big',
    valid_children: '+body[style]',
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
          text: 'Custom-' + label,
          onAction: (_) => {
            editor.insertContent('{{ ' + label + ' }}');
            component.handleEditorText();
          }
        });

        editor.ui.registry.addMenuItem(label, {
          icon: 'user',
          tooltip: 'Insert ' + label,
          text: 'My ' + label,
          onAction: (_) => {
            editor.insertContent('{{ ' + label + ' }}');
            component.handleEditorText();
          }
        });
      }

      for (const labelo of component.labelsOrder) {
        editor.ui.registry.addMenuItem(labelo, {
          icon: 'user',
          tooltip: 'Insert ' + labelo,
          text: 'My ' + labelo,
          onAction: (_) => {
            editor.insertContent('{{ ' + labelo + ' }}');
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
    this.htmlContent = this.myForm.get('body').value.replaceAll('{{ user-name }}', ' John Doe ');
  }

}
