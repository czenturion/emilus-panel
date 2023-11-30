import { 
  DashboardOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [
  {
    key: 'general',
    path: `${APP_PREFIX_PATH}/pages`,
    title: 'sidenav.components.general',
    icon: '',
    breadcrumb: false,
    submenu: [
      {
        key: 'home',
        path: `${APP_PREFIX_PATH}/pages/home`,
        title: 'home',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'clients',
        path: `${APP_PREFIX_PATH}/pages`,
        title: 'sidenav.pages',
        icon: TeamOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'clients-child2',
            path: `${APP_PREFIX_PATH}/pages/user-list`,
            title: 'sidenav.pages.userlist',
            icon: '',
            breadcrumb: false,
            submenu: []
          }
        ]
      },
    ]
  }
]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
