// unique the results
Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
};

const helper = {
  host: {
    addApp: (app, host) => {
      app.id = parseInt(Math.random() * 1000);
      app.links = {};
      app.links[host.name] = {nextApp: null};

      host.addApp(app);

      return app;
    }
  }
};

export { helper };