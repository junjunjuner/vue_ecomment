import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld'
import Layouts from '@/common/Layouts';
import EcommerceParameter from '@/common/Body/Page1';
import Forum from '@/common/Body/Page2';
import EcommerceComment from '@/common/Body/Page3_4';
import Tender from '@/common/Body/Page4';
import NumberAttribution from '@/common/Body/Page5';
// import Aside from '@/common/layout/Aside';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Layouts',
      component: Layouts,
      children: [
        {
          path: '/common/Body/Page1',
          name: 'EcommerceParameter',
          component: EcommerceParameter
        },
        {
          path: '/common/Body/Page2',
          name: 'Forum',
          component: Forum
        },
        {
          path: '/common/Body/Page3_4',
          name: 'EcommerceComment',
          component: EcommerceComment
        },
        {
          path: '/common/Body/Page4',
          name: 'Tender',
          component: Tender
        },
        {
          path: '/common/Body/Page5',
          name: 'NumberAttribution',
          component: NumberAttribution
        }
      ]
    }
  ]
});
