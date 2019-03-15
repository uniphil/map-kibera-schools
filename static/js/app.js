(function(app) {

  // get serious
  window.app = app;

  // module attachment points
  app.models = {};
  app.views = {};
  app.filterWidgets = {};
  app.mixins = {};

  // misc config and constants
  app.config = {
    map: {
      tiles: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      centre: [-1.293, 36.817],
      zoom: 13,
      localZoom: 17
    },
    Mathare: {
      centre: [-1.262, 36.858],
      zoom: 16
    },
    Kibera: {
      centre: [-1.313, 36.788],
      zoom: 15
    },
    Kangemi: {
      centre: [-1.2573, 36.7757],
      zoom: 14
    },
    marker: {
      radius: 5
    },
    throttle: 85  // ms
  };

  // set up the views depending on the page
  app.pages = {};

  app.pages.home = function home() {
    var schools = new app.models.Schools();

    var mapAllSchools = new app.views.MapAllSchools({
      el: $('#map .map'),
      collection: schools
    });
    var mapfilters = this.mapfilters = new app.views.MapFilters({
      el: $('#map .controls'),
      schools: schools,
      map: mapAllSchools.map
    });
    var schoolsStats = new app.views.SchoolsStats({
      el: $('#stats .stats-container'),
      collection: schools
    });

    mapfilters.render();
    mapAllSchools.render();
    schoolsStats.render();

    u.eachNode(document.querySelectorAll('.action-school-search'), function(s) {
      s.addEventListener('click', function() {
        mapfilters.quickSearchWidget.model.set('expanded', true);
      });
    });
  };

  app.pages.schoolProfile = function schoolProfile() {
    var schoolModel = new app.models.School(school); // from global scope
    window.v = new app.views.MapOneSchool({
      el: $('#school-map-display'),
      model: schoolModel
    }).render();
    new app.views.ProfileData({
      el: $('#school-blurbs'),
      model: schoolModel
    });
  };

})(new (function App() {})());
