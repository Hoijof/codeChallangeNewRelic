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