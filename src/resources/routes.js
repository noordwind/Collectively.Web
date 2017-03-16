const modulePrefix = 'resources/features';

export default [
  {
    route: '',
    moduleId: `${modulePrefix}/home/start`,
    name: 'start',
    title: 'Start',
    settings: {
      hideNavbar: true,
      translationKey: 'route.start'
    }
  },
  {
    route: 'sign-in',
    moduleId: `${modulePrefix}/account/sign-in`,
    name: 'sign-in',
    title: 'Sign in',
    settings: {
      hideNavbar: true,
      translationKey: 'route.sign_in'
    }
  },
  {
    route: 'reset-password',
    moduleId: `${modulePrefix}/account/reset-password`,
    name: 'reset-password',
    title: 'Reset password',
    settings: {
      hideNavbar: true,
      translationKey: 'route.reset_password'
    }
  },
  {
    route: 'set-new-password',
    moduleId: `${modulePrefix}/account/set-new-password`,
    name: 'set-new-password',
    title: 'Set new password',
    settings: {
      hideNavbar: true,
      translationKey: 'route.set_new_password'
    }
  },
  {
    route: 'sign-up',
    moduleId: `${modulePrefix}/account/sign-up`,
    name: 'sign-up',
    title: 'Sign up',
    settings: {
      hideNavbar: true,
      translationKey: 'route.sign_up'
    }
  },
  {
    route: 'location',
    moduleId: `${modulePrefix}/home/location`,
    name: 'location',
    title: 'location',
    settings: {
      reqLogin: true,
      translationKey: 'route.location'
    }
  },
  {
    route: 'remarks',
    moduleId: `${modulePrefix}/remarks/remarks`,
    name: 'remarks',
    title: 'Remarks',
    nav: true,
    settings: {
      reqLogin: true,
      icon: 'view_list',
      hideNavbar: true,
      translationKey: 'route.map'
    }
  },
  {
    route: 'statistics',
    moduleId: `${modulePrefix}/statistics/statistics`,
    name: 'statistics',
    title: 'Statistics',
    nav: true,
    settings: {
      reqLogin: true,
      icon: 'show_chart',
      translationKey: 'statistics.statistics'
    }
  },
  {
    route: 'remarks/:id/display',
    moduleId: `${modulePrefix}/remarks/remarks`,
    name: 'display-remark',
    title: 'Display remark',
    nav: false,
    settings: {
      hideNavbar: true,
      translationKey: 'route.remark_display'
    }
  },
  {
    route: 'remarks/:id',
    moduleId: `${modulePrefix}/remarks/remark`,
    name: 'remark',
    title: 'Remark',
    nav: false,
    settings: {
      translationKey: 'route.remark'
    }
  },
  {
    route: 'remarks/:category/create',
    moduleId: `${modulePrefix}/remarks/create-remark`,
    name: 'create-remark',
    title: 'Create remark',
    nav: false,
    settings: {
      reqLogin: true,
      translationKey: 'route.create_remark'
    }
  },
  {
    route: 'remarks/:id/success',
    moduleId: `${modulePrefix}/remarks/remark-added`,
    name: 'remark-added',
    title: 'Remark successfully added',
    nav: false,
    settings: {
      reqLogin: true,
      hideNavbar: true,
      translationKey: 'route.create_remark'
    }
  },
  {
    route: 'filters',
    moduleId: `${modulePrefix}/remarks/filter-remarks`,
    name: 'filter-remarks',
    title: 'Filter remarks',
    nav: false,
    settings: {
      reqLogin: true,
      translationKey: 'route.filter_remarks'
    }
  },
  {
    route: 'profile/:name?',
    moduleId: `${modulePrefix}/account/profile`,
    name: 'profile',
    title: 'My account',
    nav: 'true',
    href: '/profile',
    settings: {
      reqLogin: true,
      icon: 'account_box',
      translationKey: 'route.profile'
    }
  },
  {
    route: 'profile/username',
    moduleId: `${modulePrefix}/account/set-username`,
    name: 'username',
    title: 'Set username',
    nav: false,
    settings: {
      reqLogin: true,
      translationKey: 'route.set_username'
    }
  },
  {
    route: 'profile/password',
    moduleId: `${modulePrefix}/account/change-password`,
    name: 'change-password',
    title: 'Change password',
    nav: false,
    settings: {
      reqLogin: true,
      translationKey: 'route.change_password'
    }
  },
  {
    route: 'users/:username/remarks',
    moduleId: `${modulePrefix}/remarks/remark-list-page`,
    name: 'user-remarks',
    title: 'Remarks',
    nav: false,
    settings: {
      translationKey: 'route.user_remarks'
    }
  },
  {
    route: 'users/:resolver/remarks/resolved',
    moduleId: `${modulePrefix}/remarks/remark-list-page`,
    name: 'user-resolved-remarks',
    title: 'Remarks',
    nav: false,
    settings: {
      translationKey: 'route.user_resolved_remarks'
    }
  },
  {
    route: 'category/:category/remarks',
    moduleId: `${modulePrefix}/remarks/remark-list-page`,
    name: 'category-remarks',
    title: 'Remarks',
    nav: false,
    settings: {
      translationKey: 'route.user_remarks'
    }
  },
  {
    route: 'tag/:tag/remarks',
    moduleId: `${modulePrefix}/remarks/remark-list-page`,
    name: 'tag-remarks',
    title: 'Remarks',
    nav: false,
    settings: {
      translationKey: 'route.user_remarks'
    }
  }
];
