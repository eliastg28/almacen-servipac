import { SideNavInterface } from '../../interfaces/side-nav.type';
export const ROUTES: SideNavInterface[] = [
    {
        path: '',
        title: 'Usuario',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'user',
        submenu: [
            {
                path: '/usuario/listar',
                title: 'Listar',
                iconType: 'nzIcon',
                icon: 'unordered-list',
                iconTheme: 'outline',
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: 'Rol',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'solution',
        submenu: [
            {
                path: '/rol/listar',
                title: 'Listar',
                iconType: 'nzIcon',
                icon: 'unordered-list',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/rol/crear',
                title: 'Crear',
                iconType: 'nzIcon',
                icon: 'file-add',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/rol/editar',
                title: 'Editar',
                iconType: 'nzIcon',
                icon: 'edit',
                iconTheme: 'outline',
                submenu: []
            },
            {
                path: '/rol/eliminar',
                title: 'Eliminar',
                iconType: 'nzIcon',
                icon: 'delete',
                iconTheme: 'outline',
                submenu: []
            }
        ]
    }
]    