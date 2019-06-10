'use strict';

var BLOCKS = [
    { code: '<table style="position: relative; opacity: 1; top: 0px; left: 0px;" border="0" width="100%" cellspacing="0" cellpadding="0" align="center" data-module="section title"><tbody><tr><td align="center" valign="top" width="100%"><table class="wrapper" style="background-color: #eadf43;" border="0" width="640" cellspacing="0" cellpadding="0" bgcolor="#fff" data-bgcolor="sectiontitle"><tbody><tr><td align="center"><table class="container" border="0" width="640" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-size: 10px; line-height: 10px;" height="20">&nbsp;</td></tr><tr><td class="mobile title-edit" style="font-family: arial, sans-serif; font-size: 30px; line-height: 34px; font-weight: bold; color: #fff;" align="center"><span class="section-title">Section Title</span></td></tr><tr><td style="font-size: 10px; line-height: 10px;" height="20">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>' },
  { code: '<table border="0" cellpadding="0" cellspacing="0" class="mobile-button-container" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important;" width="100%"><tbody><tr><td align="center" class="padding-copy" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding: 0;"><table border="0" cellpadding="0" cellspacing="0" class="responsive-table" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important;"><tbody><tr><td align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"><a class="mobile-button" href="#" style="font-size: 15px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; display: inline-block; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background: #68161C; border-color: #68161c; border-style: solid; border-width: 10px 20px;" target="_blank">button text</a></td></tr></tbody></table></td></tr></tbody></table>' },
    { code: '<table class="row" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; display: block; padding: 0px;"><tbody><tr align="left" style="vertical-align: top; text-align: left; padding: 0;"><td align="left" class="wrapper last" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; position: relative; color: #222222; font-family: "Helvetica", Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 14px; margin: 0; padding: 10px 0px 0px;" valign="top"><table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 600px; margin: 0 auto; padding: 0;"><tbody><tr align="left" style="vertical-align: top; text-align: left; padding: 0;"><td align="left" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #222222; font-family: "Helvetica", Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 0px 10px;" valign="top"> <img align="left" height="175" src="http://placehold.it/600x175" style="margin-bottom: 15px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; width: auto; max-width: 100%; float: left; clear: both; display: block;" width="600" /></td><td align="left" class="expander" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; visibility: hidden; width: 0px; color: #222222; font-family: "Helvetica", Arial, sans-serif; font-weight: normal; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" valign="top">&nbsp;</td></tr></tbody></table></td></tr></tbody></table>' }
];

// CKEDITOR.disableAutoInline = true;

// Implements a simple widget that represents contact details (see http://microformats.org/wiki/h-card).
CKEDITOR.plugins.add('hcard', {
    requires: 'widget',

    init: function(editor) {
        editor.widgets.add('hcard', {
            allowedContent: 'table tbody tr td a img [*]{*}(*); span(*)',
            requiredContent: 'div(h-card)',
            pathName: 'hcard',
            editables: {
              sectiontitle: {
                selector: 'span.section-title',
                allowedContent: '*'
              }
            },
            upcast: function(el) {
                return el.name == 'div' && el.hasClass('h-card');
            }
        });

        // This feature does not have a button, so it needs to be registered manually.
        editor.addFeature(editor.widgets.registered.hcard);

        // Handle dropping a contact by transforming the contact object into HTML.
        // Note: All pasted and dropped content is handled in one event - editor#paste.
        editor.on('paste', function(evt) {
            var block = evt.data.dataTransfer.getData('block');
            if (!block) {
                return;
            }
            evt.data.dataValue = '<div class="h-card edit-content">' + block.code + '</div>';

        });
    }
});

CKEDITOR.plugins.add('simplebox', {
    requires: 'widget',

    icons: 'simplebox',

    init: function(editor) {
        editor.widgets.add('simplebox', {

            button: 'Create a simple box',

            template: '<div class="simplebox">' +
                '<h2 class="simplebox-title">Title</h2>' +
                '<div class="simplebox-content"><p>Content...</p></div>' +
                '</div>',

            editables: {
                title: {
                    selector: '.simplebox-title',
                    allowedContent: 'br strong em'
                },
                content: {
                    selector: '.simplebox-content',
                    allowedContent: 'p br ul ol li strong em'
                }
            },

            allowedContent: 'div(!simplebox); div(!simplebox-content); h2(!simplebox-title)',

            requiredContent: 'div(simplebox)',

            upcast: function(element) {
                return element.name == 'div' && element.hasClass('simplebox');
            }
        });
    }
});

CKEDITOR.on('instanceReady', function() {
    // When an item in the contact list is dragged, copy its data into the drag and drop data transfer.
    // This data is later read by the editor#paste listener in the hcard plugin defined above.
    CKEDITOR.document.getById('contactList').on('dragstart', function(evt) {
        // The target may be some element inside the draggable div (e.g. the image), so get the div.h-card.
        var target = evt.data.getTarget().getAscendant('div', true);

        // Initialization of the CKEditor data transfer facade is a necessary step to extend and unify native
        // browser capabilities. For instance, Internet Explorer does not support any other data type than 'text' and 'URL'.
        // Note: evt is an instance of CKEDITOR.dom.event, not a native event.
        CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);

        var dataTransfer = evt.data.dataTransfer;

        // Pass an object with contact details. Based on it, the editor#paste listener in the hcard plugin
        // will create the HTML code to be inserted into the editor. You could set 'text/html' here as well, but:
        // * It is a more elegant and logical solution that this logic is kept in the hcard plugin.
        // * You do not know now where the content will be dropped and the HTML to be inserted
        // might vary depending on the drop target.
        dataTransfer.setData('block', BLOCKS[target.data('block')]);

        // You need to set some normal data types to backup values for two reasons:
        // * In some browsers this is necessary to enable drag and drop into text in the editor.
        // * The content may be dropped in another place than the editor.
        dataTransfer.setData('text/html', target.getText());

        // You can still access and use the native dataTransfer - e.g. to set the drag image.
        // Note: IEs do not support this method... :(.
        if (dataTransfer.$.setDragImage) {
            dataTransfer.$.setDragImage(target.findOne('img').$, 0, 0);
        }
    });
});

// Initialize the editor with the hcard plugin.
CKEDITOR.replace('editor1', {
    extraPlugins: 'hcard,sourcedialog,justify,simplebox'
});
