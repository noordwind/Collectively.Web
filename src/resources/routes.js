const modulePrefix = 'resources/features';

export default [
  {
    route:    '',
    moduleId: `${modulePrefix}/home/home`,
    name:     'home',
    title:    'Home',
    nav:      true,
    settings: {
        reqLogin: true,
        icon:     "dashboard"
    }
  },
  {
    route:      'login',
    moduleId:   `${modulePrefix}/account/login`,
    name:       'login',
    title:      'Login',
    settings: {
      hideNavbar: true
    }
  },
  {
    route:    'remarks',
    moduleId: `${modulePrefix}/remarks/remarks`,
    name:     'remarks',
    title:    'Remarks',
    nav:      true,
    settings: {
        reqLogin: true,
        icon: "view_list"
    }
  },
  {
    route:    'remarks/create',
    moduleId: `${modulePrefix}/remarks/create-remark`,
    name:     'create-remark',
    title:    'Create remark',
    nav:      false,
    settings: {
        reqLogin: true
    }
  }
]
