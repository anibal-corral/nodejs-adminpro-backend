const getFrontEndMenu =(role='USER_ROLE')=>{
  console.log('getting front menu');

    const menu= [
        {
          title:'Dashboard',
          icon:'mdi mdi-gauge',
          submenu:[
            { title: 'Main', url:'/'},
            { title: 'ProgressBar', url:'progress'},
            { title: 'Graphics', url:'graphic1'},
            { title: 'Promises', url:'promises'},
            { title: 'Rxjs', url:'rxjs'},
          ]
        },
        {
          title:'Admin',
          icon:'mdi mdi-folder-lock-open',
          submenu:[
            // { title: 'Users', url:'users'},
            { title: 'Doctors', url:'doctors'},
            { title: 'Hospitals', url:'hospitals'},
            
          ]
        }
      ];

      if(role==='ADMIN_ROLE'){
        menu[1].submenu.unshift({title:'Users', url:'users'})
      }
      return menu;
}


module.exports = {
  getFrontEndMenu,
}