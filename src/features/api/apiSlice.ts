
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({baseUrl:'https://melabus.herokuapp.com/',
                                credentials:'include',
                                }),
    tagTypes:['Users','Busses','Routes','Schedules'],

    endpoints: (builder) => ({
        getUsersByRole: builder.query({
         query: (role:string) => `getuserbyrole?role=${role}`,
         providesTags:['Users'],
        }),
        addNewUser: builder.mutation({
            query:newUser=>({
                url: "registerorganizationuser",
                method:'POST',
                body:newUser,
            }),
            invalidatesTags:['Users'],
        }),
        getActiveBusses: builder.query<any,void>({
            query: () => '/getorganizationactivebus',
            providesTags:['Busses']
        }),
        addNewBus: builder.mutation({
            query: newBus => ({
                url:"registerbus",
                method:"POST",
                body:newBus,
            }),
            invalidatesTags:['Busses']
        }),
        getRoutes: builder.query <any,void> ({
            query: ()=> 'getorganizationroute',
            providesTags:['Routes']
        }),
        addNewRoute: builder.mutation({
            query: newRoute => ({
                url:'addroute',
                method:'POST',
                body:newRoute,
            }),
            invalidatesTags:['Routes'],
        }),
        getSchedules: builder.query <any,void> ({
            query: () => 'getallschedule',
            providesTags:['Schedules']
        }),
        addNewSchedule: builder.mutation({
            query:newSchedule => ({
                url:'addschedule',
                method:'POST',
                body:newSchedule
            }),
            invalidatesTags:['Schedules'],
        })
    })
})

export const {
    useGetUsersByRoleQuery,
    useAddNewUserMutation,
    useGetActiveBussesQuery,
    useAddNewBusMutation,
    useGetRoutesQuery,
    useAddNewRouteMutation,
    useGetSchedulesQuery,
    useAddNewScheduleMutation,
} = apiSlice