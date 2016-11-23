const modulePrefix = 'resources/features';

export default [
  // {
  //   route:    '',
  //   moduleId: `${modulePrefix}/home/home`,
  //   name:     'home',
  //   title:    'Home',
  //   nav:      true,
  //   settings: {
  //       reqLogin: true,
  //       icon:     "dashboard"
  //   }
  // },
  {
    route:      '',
    moduleId:   `${modulePrefix}/home/start`,
    name:       'start',
    title:      'Start',
    settings: {
      hideNavbar: true
    }
  },
  {
    route:      'sign-in',
    moduleId:   `${modulePrefix}/account/sign-in`,
    name:       'sign-in',
    title:      'Sign in',
    settings: {
      hideNavbar: true
    }
  },
  {
    route:      'sign-up',
    moduleId:   `${modulePrefix}/account/sign-up`,
    name:       'sign-up',
    title:      'Sign up',
    settings: {
      hideNavbar: true
    }
  },
  {
    route:      'location',
    moduleId:   `${modulePrefix}/home/location`,
    name:       'location',
    title:      'location',
    settings: {
      reqLogin: true
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
    route:    'remarks/:id/display',
    moduleId: `${modulePrefix}/remarks/remarks`,
    name:     'display-remark',
    title:    'Display remark',
    nav:      false,
    settings: {
        reqLogin: true
    }
  },
  {
    route:    'remarks/:id',
    moduleId: `${modulePrefix}/remarks/remark`,
    name:     'remark',
    title:    'Remark',
    nav:      false,
    settings: {
        reqLogin: true
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
  },
  {
    route:    'filters',
    moduleId: `${modulePrefix}/remarks/filter-remarks`,
    name:     'filter-remarks',
    title:    'Filter remarks',
    nav:      false,
    settings: {
        reqLogin: true
    }
  },
  {
    route:    'profile',
    moduleId: `${modulePrefix}/account/profile`,
    name:     'profile',
    title:    'My account',
    nav:      'true',
    settings: {
        reqLogin: true,
        icon: "account_box"
    }
  },
  {
    route:    'profile/username',
    moduleId: `${modulePrefix}/account/set-username`,
    name:     'username',
    title:    'Set username',
    nav:      false,
    settings: {
        reqLogin: true
    }
  },
  {
    route:    'profile/password',
    moduleId: `${modulePrefix}/account/change-password`,
    name:     'change-password',
    title:    'Change password',
    nav:      false,
    settings: {
        reqLogin: true
    }
  },
  {
    route:    'users/:name/remarks',
    moduleId: `${modulePrefix}/remarks/user-remarks`,
    name:     'user-remarks',
    title:    'Remarks',
    nav:      false,
    settings: {
        reqLogin: true
    }
  }
]
