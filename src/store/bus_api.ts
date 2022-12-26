import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const busApi = createApi({
    reducerPath:'busApi',
    baseQuery: fetchBaseQuery({baseUrl:'https://bus-ticket-booking.onrender.com/',
                                credentials:'include',
                                }),
    tagTypes:['Users','Busses','Routes','Schedules',
    "Branches","Agent","Organization","City","AgentCash","Cash","Routes"],

    endpoints: (builder) => ({
        getUsersByRole: builder.query({
         query: (role:string) => `getuserbyrole?role=${role}`,
         providesTags:['Users'],
        }),
        getUserById: builder.query({
            query:(id:string) => `getuserbyid?id=${id}`
        }),
        getAllUsers: builder.query<any,void>({
            query: ()=> `getallorganizationuser`,
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
        }),
        addNewAgent: builder.mutation({
            query:newAgent =>({
                url:'addagent',
                method:'POST',
                body:newAgent,
            }),
            invalidatesTags:['Agent'],
        }),
        getCities: builder.query<any,void>({
            query: ()=>'getallorganizationcity'
        }),
        getCityName: builder.query<any,void>({
            query: () => 'getcityonly'
        }),
        getRouteById: builder.query({
            query: (id:string)=>`getorganizationroutebyid/${id}`
        }),
        getOrganizationByCode: builder.query({
            query: (orgCode:string) =>`getorganizationbycode/${orgCode}`,
            providesTags:["Users","Busses"],
        }),
        getLoggedInOrganization: builder.query<any,void>({
            query: () => `getmyorganization`,
            providesTags:["Branches"]
        }),
        updateOrganization: builder.mutation({
            query: ({loggedInOrganizationId,...data}) => ({
                    method:'PUT',
                    url:`updateorganization/${loggedInOrganizationId}`,
                    body:data,
            }),
            invalidatesTags:["Branches"]
        }),
        getAllAgents: builder.query({
            query: ()=> 'getallagent',
            providesTags:["Agent"]
        }),
        updateAgent: builder.mutation({
            query: ({id,...data}) => ({
                    method:'PUT',
                    url:`updateagent/${id}`,
                    body:data,
            }),
            invalidatesTags:['Agent'],
        }),
        getAgentsWithNoAccount: builder.query<any,void>({
            query: ()=> 'getagentwithnoaccount',
            providesTags:["Agent"]
        }),
        loginUser:builder.mutation<any,any>({
            query:user=>({
                url:'/loginorganizationuser',
                method:"POST",
                body:user,
            }),
            invalidatesTags:["Users"]
        }),
        changePassword:builder.mutation<any,any>({
            query:password=>({
                url:'/changepassword',
                method:"PUT",
                body:password,
            }),
            invalidatesTags:["Users"]
        }),
        checkSession:builder.query<any,any>({
            query:()=>'/checkauth',
            providesTags:["Users"]
        }),
        getOrganizationBranch:builder.query<any,any>({
            query:()=>`/getorganizationbranch`,
            providesTags:["Users"]
        }),
        getUser:builder.query<any,any>({
            query:()=>'/getallorganizationuser',
            providesTags:["Users","Busses"]
        }),
        getUserByRole:builder.query<any,any>({
            query:role=>`/getuserbyrole?role=${role}`,
            providesTags:["Users"]
        }),
        getAssignedUserByRole:builder.query<any,any>({
            query:role=>`/getassigneduserbyrole?role=${role}`,
            providesTags:["Users","Busses"]
        }),
        getAssignedUserByRoleWithedit:builder.query<any,any>({
            query:data=>`/getuserwithedit?role=${data.role}&current=${data.current}`,
            providesTags:["Users"]
        }),
        updateUser:builder.mutation<any,any>({
            query:user=>({
                url:`/updateorganizationuser/${user.id}`,
                method:"PUT",
                body:user,
            }),
            invalidatesTags:["Users"]
        }),
        resetPassword:builder.mutation<any,any>({
            query:data=>({
                url:`/resetpassword/${data.id}`,
                method:"PUT",
                body:data,
            }),
            invalidatesTags:["Users"]
        }),
        getCity:builder.query<any,any>({
            query:()=>'/getallorganizationcity',
            providesTags:["City"]
        }),
        getAllCity:builder.query<any,any>({
            query:()=>'/getcityonly',
            providesTags:["City"]
        }),
        getAllDepPlace: builder.query({
            query:(param:any) => { // Why is 'end' always undefined???
              return {
                url: '/getalldepartureplace',
                params:param,
              };
            },
            providesTags:["Busses"],
          }),
          addCity:builder.mutation<any,any>({
            query:city=>({
                url:`/registercity`,
                method:"POST",
                body:city,
            }),
            invalidatesTags:["City"]
        }),
        updateCity:builder.mutation<any,any>({
            query:data=>({
                url:`/updatecityinfo/${data.id}`,
                method:"PUT",
                body:data,
            }),
            invalidatesTags:["City"]
        }),
        lockSit:builder.mutation<any,any>({
            query:data=>({
                url:`/locksit/${data.id}`,
                method:"PUT",
                body:data,
            }),
            invalidatesTags:["Schedules"]
        }),
        bookTicket:builder.mutation<any,any>({
            query:data=>({
                url:`/bookticketfromschedule/${data.id}`,
                method:"PUT",
                body:data,
            }),
            invalidatesTags:["Schedules"]
        }),
        getBus:builder.query<any,any>({
            query:()=>'/getdetailorganizationbus',
            providesTags:["Busses","Users"]
        }),
        getBusById:builder.query<any,any>({
            query:id=>`/getbusbyid${id}`,
            providesTags:["Busses"]
        }),
        getActiveBus:builder.query<any,any>({
            query:()=>'/getorganizationactivebus',
            providesTags:["Busses"]
        }),
        getAllOrgBus:builder.query<any,any>({
            query:()=>'/getallorganizationbus',
            providesTags:["Busses"]
        }),
        getActiveBusInRoute: builder.query({
            query:(param:any)=> { // Why is 'end' always undefined???
              return {
                url: '/getorganizationfreebusbydateinroute',
                params:param,
              };
            },
            providesTags:["Busses"],
          }),
          updateBus:builder.mutation<any,any>({
            query:data=>({
                url:`/updatebusinfo/${data.id}`,
                method:"PUT",
                body:data,
            }),
            invalidatesTags:["Busses"]
        }),
        updateBusw:builder.mutation<any,any>({
            query:data=>({
                url:`/updatebusinfo/${data.id}`,
                method:"PUT",
                body:data,
            }),
            invalidatesTags:["Busses"]
        }),
        getRoute:builder.query<any,any>({
            query:()=>'/getorganizationdetailroute',
            providesTags:["Routes"]
        }),
        getRouteDepPlace: builder.query({
            query:(param:any)=> { // Why is 'end' always undefined???
                return {
                    url: '/getroutedepplace',
                    params:param,
                  };
                },
                providesTags:["Busses"],
              }),
           
            updateRoute:builder.mutation<any,any>({
                query:data=>({
                    url:`/updaterouteinfo/${data.id}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["Routes"]
            }),
            updateRouteBusAndPlace:builder.mutation<any,any>({
                query:data=>({
                    url:`/updateroutebusandplace/${data.id}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["Routes"]
            }),
            deleteRoute:builder.mutation<any,any>({
                query:data=>({
                    url:`/deleteroute/${data.id}`,
                    method:"DELETE",
                }),
                invalidatesTags:["Routes"]
            }),
            //schedule
            getSchedule:builder.query<any,any>({
                query:()=>'/getdetailschedule',
                providesTags:["Schedules"]
            }),
            getSalesSchedule:builder.query<any,any>({
                query:()=>'/getallfilterschedule',
                providesTags:["Schedules"]
            }),
            getOrgRule:builder.query<any,any>({
                query:()=>'/getmyorgrules',
                providesTags:["Schedules"]
            }),
            getOneSchedule:builder.query<any,any>({
                query:id=>`/getschedulebyid/${id}`,
                providesTags:["Schedules"]
            }),
            updateDepartureDateTime:builder.mutation<any,any>({
                query:data=>({
                    url:`updatedeparturedatetime/${data.id}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["Schedules"]
            }),
            updatePassInfo:builder.mutation<any,any>({
                query:data=>({
                    url:`updatepassinfo/${data.id}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["Schedules"]
            }),
            refundTicket:builder.mutation<any,any>({
                query:data=>({
                    url:`refundrequest/${data.id}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["Schedules","Cash"]
            }),
            updateScheduleBusAndPlace:builder.mutation<any,any>({
                query:data=>({
                    url:`assignbustoschedule/${data.id}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["Schedules"]
            }),
            cancelShcedule:builder.mutation<any,any>({
                query:data=>({
                    url:`cancelschedule/${data.id}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["Schedules"]
            }),
            undoShcedule:builder.mutation<any,any>({
                query:data=>({
                    url:`undocanceledschedule/${data.id}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["Schedules"]
             }),
             //managecash
             getCashInfo:builder.query<any,any>({
                query:()=>`/getcashinfo`,
                providesTags:["Cash"]
            }),
             giveToCasher:builder.mutation<any,any>({
                query:data=>({
                    url:`givetocasher/${data.id}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["Cash"]
            }),
             takeFromCasher:builder.mutation<any,any>({
                query:data=>({
                    url:`takefromcasher/${data.id}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["Cash"]
             }),
             getAgentCashInfo:builder.query<any,any>({
                query:()=>`/getagentcashinfo`,
                providesTags:["AgentCash"]
            }),
             takeFromAgent:builder.mutation<any,any>({
                query:data=>({
                    url:`takefromagent/${data.id}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["AgentCash"]
            }),
            //cash transaction
            getCashTransaction:builder.query<any,any>({
               query:()=>`/getcashtransaction`,
               providesTags:["Cash"]
           }),
           getAgentCashTransaction:builder.query<any,any>({
               query:()=>`/getagentcashtransaction`,
               providesTags:["AgentCash"]
           }),
           
   
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
       useGetAllUsersQuery,
       useGetCitiesQuery,
       useGetRouteByIdQuery,
       useGetCityNameQuery,
       useGetOrganizationByCodeQuery,
       useGetLoggedInOrganizationQuery,
       useGetUserByIdQuery,
       useUpdateOrganizationMutation,
       useAddNewAgentMutation,
       useGetAllAgentsQuery,
       useUpdateAgentMutation,
       useGetAgentsWithNoAccountQuery,
       useLoginUserMutation,
       useChangePasswordMutation,
       useCheckSessionQuery,
       //organization
       // useGetOrganizationByCodeQuery,
       useGetOrganizationBranchQuery,
       useLazyGetOrganizationByCodeQuery,
       //user
       useGetUserQuery,
       useUpdateUserMutation,
       useResetPasswordMutation,
       useGetAssignedUserByRoleQuery,
       useGetUserByRoleQuery,
       useGetAssignedUserByRoleWitheditQuery,
       useLazyGetAssignedUserByRoleWitheditQuery,
       //managecash
       useGetCashInfoQuery,
       useGiveToCasherMutation,
       useTakeFromCasherMutation,
       useGetAgentCashInfoQuery,
       useGetAgentCashTransactionQuery,
       useTakeFromAgentMutation,
       //transaction
       useGetCashTransactionQuery,
       //city
       useGetCityQuery,
       useGetAllCityQuery,
       useAddCityMutation,
       useUpdateCityMutation,
       useGetAllDepPlaceQuery,
       //bus
       useGetBusQuery,
       useGetBusByIdQuery,
       useUpdateBusMutation,
       useUpdateBuswMutation,
       useGetActiveBusInRouteQuery,
       useLazyGetActiveBusInRouteQuery,
       useGetActiveBusQuery,
       useGetAllOrgBusQuery,
       //route
       useDeleteRouteMutation,
       useGetRouteQuery,
       useGetRouteDepPlaceQuery,
       useUpdateRouteBusAndPlaceMutation,
       useUpdateRouteMutation,
       //schedule
       useCancelShceduleMutation,
       useUndoShceduleMutation,
       useGetOneScheduleQuery,
       useLazyGetOneScheduleQuery,
       useGetOrgRuleQuery,
       useGetSalesScheduleQuery,
       useGetScheduleQuery,
       useRefundTicketMutation,
       useUpdateDepartureDateTimeMutation,
       useUpdatePassInfoMutation,
       useUpdateScheduleBusAndPlaceMutation,
       useLockSitMutation,
       useBookTicketMutation,
   
   } = busApi
