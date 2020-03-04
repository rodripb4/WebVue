// router/hooks.js

/*export default routes => {
    // Check if user is logged or authenticate  when need it
    routes.beforeEach((to, from, next) => {
      const REQUIRE_AUTH = to.matched.some(record => record.meta.requireAuth)
  
      if (REQUIRE_AUTH) {
        if (!localStorage.getItem('token')) {
          next({
            path: '/Login'
          })
        }
      }
  
      return next()
    })
  }*/