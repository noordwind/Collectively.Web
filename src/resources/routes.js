const modulePrefix = 'resources/features';

export default [
  {
    route: '',
    moduleId: `${modulePrefix}/home/start`,
    name: 'start',
    title: 'Start',
    settings: {
      navbar: {
        hide: true,
        bgColor: 'blue-bg'
      },
      translationKey: 'route.start'
    }
  },
  {
    route: 'sign-in',
    moduleId: `${modulePrefix}/account/sign-in`,
    name: 'sign-in',
    title: 'Sign in',
    settings: {
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'start'
      },
      translationKey: 'route.sign_in'
    }
  },
  {
    route: 'reset-password',
    moduleId: `${modulePrefix}/account/reset-password`,
    name: 'reset-password',
    title: 'Reset password',
    settings: {
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'start'
      },
      translationKey: 'route.reset_password'
    }
  },
  {
    route: 'set-new-password',
    moduleId: `${modulePrefix}/account/set-new-password`,
    name: 'set-new-password',
    title: 'Set new password',
    settings: {
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'start'
      },
      translationKey: 'route.set_new_password'
    }
  },
  {
    route: 'sign-up',
    moduleId: `${modulePrefix}/account/sign-up`,
    name: 'sign-up',
    title: 'Sign up',
    settings: {
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'start'
      },
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
      navbar: {
        hide: false,
        bgColor: 'white-bg'
      },
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
      navbar: {
        hide: true,
        bgColor: 'blue-bg'
      },
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
      navbar: {
        hide: false,
        bgColor: 'blue-bg',
        backRoute: 'remarks'
      },
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
      navbar: {
        hide: true,
        bgColor: 'white-bg'
      },
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
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'remarks'
      },
      translationKey: 'route.remark'
    }
  },
  {
    route: 'remarks/:id/comments',
    moduleId: `${modulePrefix}/remarks/remark-comments`,
    name: 'remark-comments',
    title: 'Remark comments',
    nav: false,
    settings: {
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'remarks'
      },
      translationKey: 'route.remark_comments'
    }
  },
  {
    route: 'remarks/:id/participants',
    moduleId: `${modulePrefix}/remarks/remark-participants`,
    name: 'remark-participants',
    title: 'Remark participants',
    nav: false,
    settings: {
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'remarks'
      },
      translationKey: 'route.remark_participants'
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
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'remarks'
      },
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
      navbar: {
        hide: true,
        bgColor: 'white-bg'
      },
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
      navbar: {
        hide: false,
        bgColor: 'blue-bg',
        backRoute: 'remarks'
      },
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
      navbar: {
        hide: false,
        bgColor: 'blue-bg',
        backRoute: 'remarks'
      },
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
      navbar: {
        hide: false,
        bgColor: 'white-bg'
      },
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
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'profile'
      },
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
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'previous'
      },
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
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'previous'
      },
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
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'statistics'
      },
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
      navbar: {
        hide: false,
        bgColor: 'white-bg',
        backRoute: 'statistics'
      },
      translationKey: 'route.user_remarks'
    }
  }
];
