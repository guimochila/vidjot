// Handlebars helpers
const hbsConfig = {
  helpers: {
    dump(obj) {
      return JSON.stringify(obj, null, 2);
    },
    or(a, b, id) {
      return a ? `/ideas/${id}${a}` : b;
    },
    showFlashes(flash) {
      if (Object.keys(flash).length === 0) return null;

      let html = '';
      const category = Object.keys(flash);

      flash[category].forEach(message => {
        html += `<div class="alert alert-${category}"> ${message} </div>`;
      });

      return html;
    },
  },
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: 'views/layouts',
};

module.exports = hbsConfig;
