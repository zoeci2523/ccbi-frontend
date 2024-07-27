export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: 'login', path: '/user/login', component: './User/Login' }],
  },
  { path: '/', redirect: '/add_chart' },
  { path: '/add_chart', name: 'Add Chart', icon: 'barChart', component: './AddChart' },
  // { path: '/add_chart_sync',name: 'Add Chart Sync', icon: 'barChart', component: './AddChartSync'},
  { path: '/my_chart', name: 'My Chart', icon: 'pieChart', component: './MyChart' },
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     { path: '/admin', redirect: '/admin/sub-page' },
  //     { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
  //   ],
  // },
  { path: '*', layout: false, component: './404' },
];
