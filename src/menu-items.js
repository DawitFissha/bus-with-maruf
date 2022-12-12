import {FaRoute,FaCity} from "react-icons/fa"
import {RiDashboardLine} from "react-icons/ri"
import {HiCreditCard} from "react-icons/hi"
import {GrSchedules,GrBus} from "react-icons/gr"
import {GiTakeMyMoney,GiReceiveMoney} from "react-icons/gi"
import {MdOutlinePersonAddAlt} from "react-icons/md"
import {BiBus} from "react-icons/bi"
import {AiOutlineSchedule} from "react-icons/ai"
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
                    icon: <RiDashboardLine size={30} color="#A0A8B6"/>
                },
            ]
        },
        {
            id: 'manage',
            title: 'Manage Trip',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'organization',
                    title: 'Manage Organization',
                    type: 'item',
                    url: '/manageorganization',
                    icon: <HiCreditCard size={30} color="#A0A8B6"/>
                },
                {
                    id: 'ticket',
                    title: 'Ticket Sale',
                    type: 'item',
                    url: '/ticketsale',
                    icon: <HiCreditCard size={30} color="#A0A8B6"/>
                },
                {
                    id: 'route',
                    title: 'Manage Route',
                    type: 'item',
                    url: '/route',
                    icon: <FaRoute size={30} color="#A0A8B6"/>
                },
                {
                    id: 'shedule',
                    title: 'Manage Schedule',
                    type: 'item',
                    url: '/schedule',
                    icon: <AiOutlineSchedule size={30} color="#A0A8B6"/>
                },
                {
                    id: 'user',
                    title: 'Manage User',
                    type: 'item',
                    url: '/user',
                    icon: <MdOutlinePersonAddAlt size={30} color="#A0A8B6"/>
                },
                {
                    id: 'agent',
                    title: 'Manage Agent',
                    type: 'item',
                    url: '/agent',
                    icon: <HiCreditCard size={30} color="#A0A8B6"/>
                },
                {
                    id: 'bus',
                    title: 'Manage Bus',
                    type: 'item',
                    url: '/bus',
                    icon: <BiBus size={30} color="#A0A8B6"/>
                },
                {
                    id: 'localcash',
                    title: 'Manage Local Cash',
                    type: 'item',
                    url: '/managelocalcash',
                    icon: <GiTakeMyMoney size={30} color="#A0A8B6"/>
                },
                {
                    id: 'agentcash',
                    title: 'Manage Agent Cash',
                    type: 'item',
                    url: '/manageagentcash',
                    icon: <GiReceiveMoney size={30} color="#A0A8B6"/>
                },
                {
                    id: 'city',
                    title: 'Manage City',
                    type: 'item',
                    url: '/city',
                    icon: <FaCity size={30} color="#A0A8B6"/>
                },
            ]
        }]};

export default menuItems;
