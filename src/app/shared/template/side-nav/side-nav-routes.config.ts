import { SideNavInterface } from '../../interfaces/side-nav.type';
export const ROUTES: SideNavInterface[] = [
  {
    path: '',
    title: 'Rol',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'idcard',
    submenu: [
      {
        path: '/page/rol',
        title: 'Listar',
        iconType: 'nzIcon',
        icon: 'unordered-list',
        iconTheme: 'outline',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Usuario',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'user',
    submenu: [
      {
        path: '/page/usuario',
        title: 'Usuario',
        iconType: 'nzIcon',
        icon: 'unordered-list',
        iconTheme: 'outline',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Categoria',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore',
    submenu: [
      {
        path: '/page/categoria',
        title: 'Listar',
        iconType: 'nzIcon',
        icon: 'unordered-list',
        iconTheme: 'outline',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Proveedor',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'solution',
    submenu: [
      {
        path: '/page/proveedor',
        title: 'Listar',
        iconType: 'nzIcon',
        icon: 'unordered-list',
        iconTheme: 'outline',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Almacén',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'inbox',
    submenu: [
      {
        path: '/page/almacen',
        title: 'Listar',
        iconType: 'nzIcon',
        icon: 'unordered-list',
        iconTheme: 'outline',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Estantería',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'hdd',
    submenu: [
      {
        path: '/page/estante',
        title: 'Listar',
        iconType: 'nzIcon',
        icon: 'unordered-list',
        iconTheme: 'outline',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Producto',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dropbox',
    submenu: [
      {
        path: '/page/producto',
        title: 'Listar',
        iconType: 'nzIcon',
        icon: 'unordered-list',
        iconTheme: 'outline',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Transacción',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dropbox',
    submenu: [
      {
        path: '/page/transaccion',
        title: 'Listar',
        iconType: 'nzIcon',
        icon: 'unordered-list',
        iconTheme: 'outline',
        submenu: [],
      },
    ],
  }
];
