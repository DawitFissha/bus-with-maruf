const menuItems = {
    items: [
        {
            id: 'navigation',
            title: 'Home',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home'
                },
            ]
        },
        {
            id: 'managebus',
            title: 'Manage Trip',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'ticket',
                    title: 'Ticket Sale',
                    type: 'item',
                    url: '/ticketsale',
                    icon: 'feather icon-command'
                },
                {
                    id: 'route',
                    title: 'Add Route',
                    type: 'item',
                    url: '/addroute',
                    icon: 'feather icon-command'
                },
                {
                    id: 'shedule',
                    title: 'Add Schedule',
                    type: 'item',
                    url: '/schedule',
                    icon: 'feather icon-command'
                },
                {
                    id: 'user',
                    title: 'Manage User',
                    type: 'item',
                    url: '/user',
                    icon: 'feather icon-command'
                },
                {
                    id: 'bus',
                    title: 'Manage Bus',
                    type: 'item',
                    url: '/addbus',
                    icon: 'feather icon-user'
                },
            ]
        }]};

export default menuItems;
