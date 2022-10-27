import { SideNavInterface } from '../../interfaces/side-nav.type';
export const ROUTES: SideNavInterface[] = [
    {
        path: '',
        title: 'Rol',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'solution',
        submenu: [
            {
                path: '/usuario/rol',
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
    }
    
]    